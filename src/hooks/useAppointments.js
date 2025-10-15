/**
 * useAppointments Hook
 *
 * This is a custom hook that encapsulates the business logic for fetching
 * and managing appointments. This is the "headless" pattern - separating
 * logic from presentation.
 *
 * TODO for candidates:
 * 1. Implement the hook to fetch appointments based on filters
 * 2. Add loading and error states
 * 3. Consider memoization for performance
 * 4. Think about how to make this reusable for both day and week views
 */

import { useState, useEffect, useMemo } from 'react';
import { appointmentService } from '@/services/appointmentService';

/**
 * Hook parameters
 */
/**
 * @typedef {Object} UseAppointmentsParams
 * @property {string} doctorId
 * @property {Date} date
 * @property {Date} [startDate] - For week view, you might want to pass a date range instead
 * @property {Date} [endDate]
 */

/**
 * Hook return value
 */
/**
 * @typedef {Object} UseAppointmentsReturn
 * @property {Array} appointments
 * @property {Object|undefined} doctor
 * @property {boolean} loading
 * @property {Error|null} error
 * // Add any other useful data or functions
 */

/**
 * useAppointments Hook
 *
 * Fetches and manages appointment data for a given doctor and date/date range.
 *
 * TODO: Implement this hook
 *
 * Tips:
 * - Use useState for loading and error states
 * - Use useEffect to fetch data when params change
 * - Use useMemo to memoize expensive computations
 * - Consider how to handle both single date (day view) and date range (week view)
 * @param {UseAppointmentsParams} params
 * @returns {UseAppointmentsReturn}
 */
export function useAppointments(params) {
  const { doctorId, date, startDate, endDate } = params;

  // TODO: Add state for appointments, loading, error
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Fetch doctor data
  const doctor = useMemo(() => {
    // Implement: Get doctor by ID
    // return appointmentService.getDoctorById(doctorId);
    return undefined;
  }, [doctorId]);

  // TODO: Fetch appointments when dependencies change
  useEffect(() => {
    // Implement: Fetch appointments
    // Consider:
    // - If startDate and endDate are provided, use date range
    // - Otherwise, use single date
    // - Set loading state
    // - Handle errors
    // - Set appointments

    console.log('TODO: Fetch appointments for', { doctorId, date, startDate, endDate });

    // Placeholder - remove when implementing
    setLoading(false);
  }, [doctorId, date, startDate, endDate]);

  return {
    appointments,
    doctor,
    loading,
    error,
  };
}

/**
 * BONUS: Create additional hooks for specific use cases
 *
 * Examples:
 * - useDayViewAppointments(doctorId: string, date: Date)
 * - useWeekViewAppointments(doctorId: string, weekStartDate: Date)
 * - useDoctors() - hook to get all doctors
 */
