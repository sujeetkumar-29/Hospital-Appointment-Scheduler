/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 */

import { format, addDays, isSameDay } from 'date-fns';
import { APPOINTMENT_TYPE_CONFIG } from '../types';
import { appointmentService } from '../services/appointmentService';

/**
 * Compact AppointmentCard for week view
 */
function AppointmentCard({ appointment }) {
  const patient = appointmentService.getPatientById(appointment.patientId);
  const config = APPOINTMENT_TYPE_CONFIG[appointment.type];
  const startTime = new Date(appointment.startTime);

  return (
    <div
      className="rounded p-1.5 mb-1 text-xs border-l-2 cursor-pointer hover:opacity-80 transition-opacity"
      style={{
        backgroundColor: config.color + '20',
        borderLeftColor: config.color,
      }}
      title={`${patient?.name || 'Unknown'} - ${config.label}`}
    >
      <div className="font-semibold truncate" style={{ color: config.color }}>
        {patient?.name || 'Unknown'}
      </div>
      <div className="text-gray-600 text-xs">
        {format(startTime, 'h:mm a')}
      </div>
    </div>
  );
}

export function WeekView({ appointments, doctor, weekStartDate }) {
  /**
   * Generate array of 7 dates (Monday through Sunday)
   */
  function getWeekDays() {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStartDate, i));
    }
    return days;
  }

  /**
   * Generate time slots (same as DayView)
   */
  function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        // Create a generic time slot (not tied to specific date)
        const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayLabel = format(new Date(2000, 0, 1, hour, minute), 'h:mm a');
        slots.push({ hour, minute, label, displayLabel });
      }
    }
    return slots;
  }

  /**
   * Get appointments for a specific day
   */
  function getAppointmentsForDay(date) {
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      return isSameDay(aptStart, date);
    });
  }

  /**
   * Get appointments for a specific day and time slot
   */
  function getAppointmentsForDayAndSlot(day, slotHour, slotMinute) {
    // Create slot time boundaries for the specific day
    const slotStart = new Date(day);
    slotStart.setHours(slotHour, slotMinute, 0, 0);
    
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + 30);

    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);

      // Check if appointment is on the same day and overlaps with the slot
      return (
        isSameDay(aptStart, day) &&
        aptStart < slotEnd &&
        aptEnd > slotStart
      );
    });
  }

  const weekDays = getWeekDays();
  const timeSlots = generateTimeSlots();

  return (
    <div className="week-view">
      {/* Week header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Week grid - may need horizontal scroll on mobile */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-20 p-2 text-xs font-semibold text-gray-700 border-r border-gray-200 sticky left-0 bg-gray-50 z-10">
                Time
              </th>
              {weekDays.map((day, index) => (
                <th
                  key={index}
                  className="p-2 text-xs border-l border-gray-200 min-w-[120px]"
                >
                  <div className="font-semibold text-gray-900">
                    {format(day, 'EEE')}
                  </div>
                  <div className="text-gray-600 font-normal">
                    {format(day, 'MMM d')}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slotIndex} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-2 text-xs text-gray-600 font-medium border-r border-gray-200 bg-gray-50 sticky left-0 z-10">
                  {slot.displayLabel}
                </td>
                {weekDays.map((day, dayIndex) => {
                  const daySlotAppointments = getAppointmentsForDayAndSlot(
                    day,
                    slot.hour,
                    slot.minute
                  );

                  return (
                    <td
                      key={dayIndex}
                      className="p-1 border-l border-gray-100 align-top min-h-[60px] transition-colors"
                    >
                      {daySlotAppointments.map((apt) => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm py-8 bg-gray-50 rounded-lg">
          No appointments scheduled for this week
        </div>
      )}
    </div>
  );
}