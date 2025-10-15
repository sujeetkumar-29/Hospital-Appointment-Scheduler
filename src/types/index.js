/**
 * Type Definitions for Hospital Appointment Scheduler
 *
 * These types define the core domain models for the scheduling system.
 * All these types are provided - you don't need to modify them.
 */

/**
 * Appointment types/categories
 */
export const APPOINTMENT_TYPES = ['checkup', 'consultation', 'follow-up', 'procedure'];

/**
 * Medical specialties
 */
export const SPECIALTIES = [
  'cardiology',
  'pediatrics',
  'general-practice',
  'orthopedics',
  'dermatology',
];

/**
 * Days of the week
 */
export const DAYS_OF_WEEK = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

/**
 * Doctor working hours for a specific day
 */
export function WorkingHours(start, end) {
  return { start, end }; // Format: "HH:MM"
}

/**
 * Doctor weekly schedule
 */
export function WeeklySchedule(schedule = {}) {
  // Partial record of DayOfWeek -> WorkingHours
  return schedule;
}

/**
 * Doctor entity
 */
export function Doctor(id, name, specialty, email, phone, workingHours) {
  return { id, name, specialty, email, phone, workingHours };
}

/**
 * Patient entity
 */
export function Patient(id, name, email, phone, dateOfBirth) {
  return { id, name, email, phone, dateOfBirth };
}

/**
 * Appointment entity
 */
export function Appointment(id, patientId, doctorId, type, startTime, endTime, status, notes) {
  return { id, patientId, doctorId, type, startTime, endTime, status, notes };
}

/**
 * Appointment status
 */
export const APPOINTMENT_STATUSES = ['scheduled','completed','cancelled','no-show'];

/**
 * View mode for the calendar
 */
export const CALENDAR_VIEWS = ['day','week'];

/**
 * Time slot for calendar rendering
 */
export function TimeSlot(start, end, label) {
  return { start, end, label };
}

/**
 * Appointment with populated patient and doctor data
 */
export function PopulatedAppointment(appointment, patient, doctor) {
  return { ...appointment, patient, doctor };
}

/**
 * Filter options for appointments
 */
export function AppointmentFilters(filters = {}) {
  return filters; // doctorId, date, startDate, endDate, type, status
}

/**
 * Calendar configuration
 */
export function CalendarConfig(startHour, endHour, slotDuration) {
  return { startHour, endHour, slotDuration };
}

/**
 * Default calendar configuration
 */
export const DEFAULT_CALENDAR_CONFIG = CalendarConfig(8, 18, 30);

/**
 * Appointment type metadata (for display)
 */
export function AppointmentTypeInfo(type, label, color, defaultDuration) {
  return { type, label, color, defaultDuration };
}

/**
 * Appointment type display configuration
 */
export const APPOINTMENT_TYPE_CONFIG = {
  checkup: AppointmentTypeInfo('checkup','General Checkup','#3b82f6',30),
  consultation: AppointmentTypeInfo('consultation','Consultation','#10b981',60),
  'follow-up': AppointmentTypeInfo('follow-up','Follow-up','#f59e0b',30),
  procedure: AppointmentTypeInfo('procedure','Procedure','#8b5cf6',90),
};
