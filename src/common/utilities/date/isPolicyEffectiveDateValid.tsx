/**
 * Validates if the given date is:
 * - In a valid 'YYYY-MM-DD' format
 * - From today or later
 * - Within 30 days from today
 *
 * @param value - A date string in 'YYYY-MM-DD' format
 * @returns true if the date is valid, false otherwise
 */

import { parse, isValid, format } from 'date-fns';

export const isPolicyEffectiveDateValid = (value: string): boolean => {
  if (!value) {
    return false;
  }
  const date = parse(value, 'yyyy-MM-dd', new Date());
  if (!isValid(date) || format(date, 'yyyy-MM-dd') !== value) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 1);
  if (date < today) {
    return false;
  }
  if (date > maxDate) {
    return false;
  }
  return true;
};
