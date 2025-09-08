import { string, object } from 'yup';
import type { ObjectSchema } from 'yup';
import { IAuthPhoneStep1, IAuthPhoneStep2 } from './types';
import { countries } from '../../../../src/common/utilities/countries/countries';

export const createPhoneStep1Schema = (): ObjectSchema<IAuthPhoneStep1> =>
  object({
    phoneNumber: string()
      .required('Phone Number is required')
      .test('phone-length', function (value) {
        const { phoneCountry } = this.parent;
        const selectedCountry = countries.find(country => country.code === phoneCountry);

        if (!selectedCountry) {
          return this.createError({ message: 'Invalid country selected' });
        }

        if (!value) {
          return this.createError({ message: 'Phone Number is required' });
        }

        const cleanNumber = value.replace(/\D/g, '');

        if (cleanNumber.length !== selectedCountry.mobileNumberLength) {
          return this.createError({
            message: `Phone number must be exactly ${selectedCountry.mobileNumberLength} digits for ${selectedCountry.name}`,
          });
        }
        return true;
      })
      .matches(/^[0-9\s\-\+\(\)]+$/, 'Phone number can only contain numbers, spaces, hyphens, plus signs, and parentheses'),
    phoneDialCode: string().required('Country code is required'),
    phoneCountry: string().required('Country is required'),
    email: string().optional().email('Enter a valid email'),
  }).defined();

export const createPhoneStep2Schema = (): ObjectSchema<IAuthPhoneStep2> =>
  object({
    otp: string()
      .required('OTP is required')
      .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
  }).defined();
