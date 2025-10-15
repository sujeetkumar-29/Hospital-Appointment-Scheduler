/**
 * Home Page
 *
 * This is the landing page. Navigate users to the schedule page.
 */

import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 sm:p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 sm:p-12 m-4 sm:m-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Hospital Appointment Scheduler
        </h1>

        <p className="text-gray-600 mb-8 text-center text-base sm:text-lg leading-relaxed">
          Welcome to the appointment scheduling system. View and manage doctor schedules
          for our hospital with ease.
        </p>

        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/schedule')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-5 px-9 sm:py-6 sm:px-10 rounded-md text-sm transition-colors duration-200 cursor-pointer"
            >
              Go to Schedule
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Available Doctors:
            </h2>
            <ul className="text-sm sm:text-base text-gray-600 space-y-3 ml-2">
              <li>• Dr. Sarah Chen - Cardiology</li>
              <li>• Dr. Michael Rodriguez - Pediatrics</li>
              <li>• Dr. Emily Johnson - General Practice</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
