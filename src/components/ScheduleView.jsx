/**
 * ScheduleView Component
 *
 * Main component that orchestrates the schedule display.
 * This component composes smaller components together.
 */

import { useMemo } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { useAppointments } from '../hooks/useAppointments';

export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}) {
  // Calculate week start and end dates for week view
  const weekStart = useMemo(() => {
    return startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
  }, [selectedDate]);

  const weekEnd = useMemo(() => {
    const end = addDays(weekStart, 6);
    end.setHours(23, 59, 59, 999);
    return end;
  }, [weekStart]);

  // Use the useAppointments hook to fetch data
  const { appointments, doctor, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: view === 'day' ? selectedDate : null,
    startDate: view === 'week' ? weekStart : null,
    endDate: view === 'week' ? weekEnd : null,
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with doctor info and controls */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
            {doctor && (
              <p className="text-sm text-gray-600 mt-1">
                Dr. {doctor.name} - {doctor.specialty}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Doctor Selector */}
            <div className="w-full sm:w-64">
              <DoctorSelector
                selectedDoctorId={selectedDoctorId}
                onDoctorChange={onDoctorChange}
              />
            </div>

            {/* Date Picker */}
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => onDateChange(new Date(e.target.value))}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />

            {/* View Toggle Buttons */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                  view === 'day'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                  view === 'week'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => onViewChange('week')}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 font-semibold mb-2">
              Error loading appointments
            </div>
            <p className="text-gray-600 text-sm">{error.message}</p>
          </div>
        ) : view === 'day' ? (
          <DayView
            appointments={appointments}
            doctor={doctor}
            date={selectedDate}
          />
        ) : (
          <WeekView
            appointments={appointments}
            doctor={doctor}
            weekStartDate={weekStart}
          />
        )}
      </div>
    </div>
  );
}