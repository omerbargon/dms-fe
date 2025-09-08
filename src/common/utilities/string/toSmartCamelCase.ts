export const toSmartCamelCase = (str: string, useSpace: boolean = false): string => {
  const wordsToCapitalize = ['liban', 'c', 'usa', 'canada', 'japan', 'tripoli', 'beirut'];

  const cleanedWords = str
    .replace(/[_\s]+/g, ' ')
    .trim()
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (wordsToCapitalize.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    });

  return cleanedWords.join(useSpace ? ' ' : '');
};
