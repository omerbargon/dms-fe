import { differenceInYears, parse } from 'date-fns';

export const isOfLegalAgeDOB = (dob?: string): boolean => {
  if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return false;
  }

  const date = parse(dob, 'yyyy-MM-dd', new Date());
  const year = date.getFullYear();

  return differenceInYears(new Date(), date) >= 18 && year >= 1935;
};
