import { parseISO, isValid, differenceInYears } from 'date-fns';

/**
 * Calculate age based on a given date string
 * @param dateString - A date in ISO format (e.g., 'yyyy-MM-dd')
 * @returns The age in years, or null if the date is invalid
 */
export const getAgeFromDate = (dateString: string): number | null => {
  const parsedDate = parseISO(dateString);
  if (!isValid(parsedDate)) {
    return null;
  }

  return differenceInYears(new Date(), parsedDate);
};
