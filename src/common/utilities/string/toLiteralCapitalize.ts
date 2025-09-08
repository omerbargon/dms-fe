/**
 * Capitalizes the first letter of each word in a string and converts the rest of each word to lowercase.
 *
 * @param s The string to transform
 * @returns The transformed string
 */
export const toLiteralCapitalize = (s: string): string => {
  if (typeof s !== 'string') {
    return '';
  }
  return s
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
