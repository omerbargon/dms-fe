/**
 * Converts a string to camel-case-like key by removing special characters,
 * spaces, and capitalizing words.
 *
 * @param str The original string, e.g., "PropertyInsurance(Home, Office, Or Clinic)"
 * @returns A string like "PropertyInsuranceHomeOfficeOrClinic"
 */
export const toCamelCaseKey = (str: string): string => {
  return str
    .replace(/[\(\),:]/g, '') // Remove (, ), commas, and colons
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};
