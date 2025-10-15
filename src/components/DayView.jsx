/**
 * DayView Component
 *
 * Displays appointments for a single day in a timeline format.
 */

import { format } from 'date-fns';
import { APPOINTMENT_TYPE_CONFIG } from '../types';
import { appointmentService } from '../services/appointmentService';

/**
 * AppointmentCard Component
 * Displays a single appointment with appropriate styling
 */
function AppointmentCard({ appointment }) {
  const patient = appointmentService.getPatientById(appointment.patientId);
  const config = APPOINTMENT_TYPE_CONFIG[appointment.type];
  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);
  const duration = Math.round((endTime - startTime) / 60000); // duration in minutes

  return (
    <div
      className="rounded-lg p-3 mb-2 shadow-sm border-l-4 transition-all hover:shadow-md"
      style={{
        backgroundColor: config.color + '20',
        borderLeftColor: config.color,
      }}
    >
      <div className="font-semibold text-sm" style={{ color: config.color }}>
        {patient?.name || 'Unknown Patient'}
      </div>
      <div className="text-xs text-gray-600 mt-1">{config.label}</div>
      <div className="text-xs text-gray-500 mt-1">
        {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')} ({duration} min)
      </div>
    </div>
  );
}

export function DayView({ appointments, doctor, date }) {
  /**
   * Generate time slots from 8 AM to 6 PM with 30-minute intervals
   */
  function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);

        const label = format(start, 'h:mm a');
        slots.push({ start, end, label });
      }
    }
    return slots;
  }

  /**
   * Find appointments for a specific time slot
   */
  function getAppointmentsForSlot(slot) {
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      // Check if appointment overlaps with the slot
      return aptStart < slot.end && aptEnd > slot.start;
    });
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="day-view">
      {/* Day header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Timeline grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-100">
          {timeSlots.map((slot, index) => {
            const slotAppointments = getAppointmentsForSlot(slot);
            
            return (
              <div key={index} className="flex hover:bg-gray-50 transition-colors">
                <div className="w-24 p-3 text-sm text-gray-600 font-medium border-r border-gray-200 bg-gray-50">
                  {slot.label}
                </div>
                <div className="flex-1 p-2 min-h-[60px] relative">
                  {slotAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm py-8 bg-gray-50 rounded-lg">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}