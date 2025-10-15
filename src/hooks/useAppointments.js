/**
 * useAppointments Hook
 *
 * This is a custom hook that encapsulates the business logic for fetching
 * and managing appointments. This is the "headless" pattern - separating
 * logic from presentation.
 */

import { useState, useEffect, useMemo } from 'react';
import { appointmentService } from '../services/appointmentService';

/**
 * useAppointments Hook
 *
 * Fetches and manages appointment data for a given doctor and date/date range.
 */
export function useAppointments(params) {
  const { doctorId, date, startDate, endDate } = params;

  // State for appointments, loading, error
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctor data
  const doctor = useMemo(() => {
    if (!doctorId) return undefined;
    return appointmentService.getDoctorById(doctorId);
  }, [doctorId]);

  // Fetch appointments when dependencies change
  useEffect(() => {
    let mounted = true;

    const fetchAppointments = async () => {
      if (!doctorId) {
        setAppointments([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let data;

        // If startDate and endDate are provided, use date range
        if (startDate && endDate) {
          data = await appointmentService.getAppointmentsByDoctorAndDateRange(
            doctorId,
            startDate,
            endDate
          );
        }
        // Otherwise, use single date
        else if (date) {
          data = await appointmentService.getAppointmentsByDoctorAndDate(
            doctorId,
            date
          );
        }
        // Fallback to all appointments for doctor
        else {
          data = await appointmentService.getAppointmentsByDoctor(doctorId);
        }

        if (mounted) {
          // Sort appointments by start time
          const sortedAppointments = appointmentService.sortAppointmentsByTime(data);
          setAppointments(sortedAppointments);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAppointments();

    return () => {
      mounted = false;
    };
  }, [doctorId, date, startDate, endDate]);

  return {
    appointments,
    doctor,
    loading,
    error,
  };
}

/**
 * BONUS: Hook specifically for day view
 */
export function useDayViewAppointments(doctorId, date) {
  return useAppointments({ doctorId, date });
}

/**
 * BONUS: Hook specifically for week view
 */
export function useWeekViewAppointments(doctorId, weekStartDate) {
  const weekEndDate = useMemo(() => {
    const endDate = new Date(weekStartDate);
    endDate.setDate(endDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
    return endDate;
  }, [weekStartDate]);

  return useAppointments({
    doctorId,
    startDate: weekStartDate,
    endDate: weekEndDate,
  });
}

/**
 * BONUS: Hook to get all doctors
 */
export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const allDoctors = appointmentService.getAllDoctors();
    setDoctors(allDoctors);
    setLoading(false);
  }, []);

  return { doctors, loading };
}