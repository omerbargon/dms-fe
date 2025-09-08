import { parse, isValid, addMonths, subMonths, startOfToday } from 'date-fns';

/**
 * Validates if the date is within ±6 months from today
 */
export const isFullValidDateWithinSixMonths = (value?: string): boolean => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = parse(value, 'yyyy-MM-dd', new Date());
  if (!isValid(date)) {
    return false;
  }

  const today = startOfToday();
  const sixMonthsBefore = subMonths(today, 6);
  const sixMonthsAfter = addMonths(today, 6);

  return date > sixMonthsBefore && date < sixMonthsAfter;
};
