/**
 * Schedule Page
 *
 * Main page for the appointment scheduler.
 */

import { useState } from 'react';
import { ScheduleView } from '../components/ScheduleView';

export default function SchedulePage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState('doc-1');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('day');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Appointment Schedule
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            View, organize, and manage doctor appointments efficiently.
          </p>
        </header>

        {/* Schedule View Component */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200 shadow-inner">
          <ScheduleView
            selectedDoctorId={selectedDoctorId}
            selectedDate={selectedDate}
            view={view}
            onDoctorChange={setSelectedDoctorId}
            onDateChange={setSelectedDate}
            onViewChange={setView}
          />
        </div>
      </div>
    </main>
  );
}
