/**
 * Appointment Service
 *
 * This service provides an abstraction layer for accessing appointment data.
 * It's your data access layer - implement the methods to fetch and filter appointments.
 */

import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  getDoctorById as getMockDoctorById,
  getPatientById as getMockPatientById,
} from '../data/mockData';

/**
 * AppointmentService class
 *
 * Provides methods to access and manipulate appointment data.
 * This is where you abstract data access from your components.
 */
export class AppointmentService {
  /**
   * Get all appointments for a specific doctor
   */
  getAppointmentsByDoctor(doctorId) {
    return new Promise((resolve) => {
      const appointments = MOCK_APPOINTMENTS.filter(
        (apt) => apt.doctorId === doctorId
      );
      setTimeout(() => resolve(appointments), 250); // simulate latency
    });
  }

  /**
   * Get appointments for a specific doctor on a specific date
   */
  getAppointmentsByDoctorAndDate(doctorId, date) {
    return new Promise((resolve) => {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const appointments = MOCK_APPOINTMENTS.filter((apt) => {
        if (apt.doctorId !== doctorId) return false;
        const aptStart = new Date(apt.startTime);
        return aptStart >= startOfDay && aptStart <= endOfDay;
      });

      setTimeout(() => resolve(appointments), 250); // simulate latency
    });
  }

  /**
   * Get appointments for a specific doctor within a date range (for week view)
   */
  getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate) {
    return new Promise((resolve) => {
      const appointments = MOCK_APPOINTMENTS.filter((apt) => {
        if (apt.doctorId !== doctorId) return false;
        const aptStart = new Date(apt.startTime);
        return aptStart >= startDate && aptStart <= endDate;
      });

      setTimeout(() => resolve(appointments), 250); // simulate latency
    });
  }

  /**
   * Get a populated appointment (with patient and doctor objects)
   */
  getPopulatedAppointment(appointment) {
    const patient = getMockPatientById(appointment.patientId);
    const doctor = getMockDoctorById(appointment.doctorId);
    return {
      ...appointment,
      patient,
      doctor,
    };
  }

  /**
   * Get all doctors
   */
  getAllDoctors() {
    return MOCK_DOCTORS;
  }

  /**
   * Get doctor by ID
   */
  getDoctorById(id) {
    return getMockDoctorById(id);
  }

  /**
   * Get patient by ID
   */
  getPatientById(id) {
    return getMockPatientById(id);
  }

  /**
   * Sort appointments by start time
   */
  sortAppointmentsByTime(appointments) {
    return [...appointments].sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime);
    });
  }

  /**
   * Check if two appointments overlap
   */
  checkOverlap(apt1, apt2) {
    const start1 = new Date(apt1.startTime);
    const end1 = new Date(apt1.endTime);
    const start2 = new Date(apt2.startTime);
    const end2 = new Date(apt2.endTime);

    return start1 < end2 && start2 < end1;
  }

  /**
   * Get appointments by type
   */
  getAppointmentsByType(appointments, type) {
    return appointments.filter((apt) => apt.type === type);
  }
}

/**
 * Singleton instance
 */
export const appointmentService = new AppointmentService();