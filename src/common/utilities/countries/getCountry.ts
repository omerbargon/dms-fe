import { countries, IPhoneCountryInput } from './countries';

export const getCountryFlag = (countryCode: string): string => {
  const matchedCountry = countries.find((c: IPhoneCountryInput) => c.code === countryCode);
  return matchedCountry ? matchedCountry.flag : '';
};

export const getCountryName = (countryCode: string): string => {
  const matchedCountry = countries.find((c: IPhoneCountryInput) => c.code === countryCode);
  return matchedCountry ? matchedCountry.name : '';
};

export function getCountryOptions(): { label: string; value: string }[] {
  return countries.map((country: IPhoneCountryInput) => ({
    label: `${country.flag + ' '} ${country.name}`,
    value: country.name,
  }));
}

export const isPhoneNumberValid = (phone: string, countryCode: string): boolean => {
  const selectedCountry = countries.find((country: IPhoneCountryInput) => country.dialCode === countryCode);
  if (!selectedCountry) {
    return false;
  }
  const mobileLength = selectedCountry.mobileNumberLength;
  const formattedPhone = phone.replace(/\D/g, '');
  return formattedPhone.length === mobileLength;
};
