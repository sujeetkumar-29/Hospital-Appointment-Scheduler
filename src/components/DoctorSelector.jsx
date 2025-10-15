/**
 * DoctorSelector Component
 *
 * Dropdown to select which doctor's schedule to view.
 * For front desk staff (can see all doctors).
 */

import { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';

export function DoctorSelector({ selectedDoctorId, onDoctorChange }) {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors on component mount
  useEffect(() => {
    const allDoctors = appointmentService.getAllDoctors();
    setDoctors(allDoctors);
  }, []);

  // Find currently selected doctor for display
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <div className="doctor-selector">
      <select
        value={selectedDoctorId}
        onChange={(e) => onDoctorChange(e.target.value)}
        className="block w-full px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">Select a doctor...</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            Dr. {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>
    </div>
  );
}