/**
 * Converts the entire string to uppercase letters.
 *
 * @param s The string to transform
 * @returns The transformed uppercase string
 */
export const toLiteralUpper = (s: string): string => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.toUpperCase();
};
