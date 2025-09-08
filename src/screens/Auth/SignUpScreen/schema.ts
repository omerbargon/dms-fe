import { object, string, mixed, array } from 'yup';
import type { ObjectSchema } from 'yup';
import type { Asset } from 'react-native-image-picker';
import { IAuthSignUp } from './types';
import { countries } from '../../../../src/common/utilities/countries/countries';

const assetItem = mixed<Asset>()
  .required('Image is required')
  .test('has-uri', 'Each image must be valid', (v): v is Asset => {
    return !!(v && typeof v === 'object' && (v as Asset).uri);
  });

export const createSchema = (): ObjectSchema<IAuthSignUp> =>
  object({
    phoneNumber: string()
      .required('Phone Number is required')
      .test('phone-length', function (value) {
        const { phoneCountry } = this.parent as { phoneCountry?: string };
        const selectedCountry = countries.find(c => c.code === phoneCountry);
        if (!selectedCountry) return this.createError({ message: 'Invalid country selected' });
        if (!value) return this.createError({ message: 'Phone Number is required' });

        const clean = value.replace(/\D/g, '');
        if (clean.length !== selectedCountry.mobileNumberLength) {
          return this.createError({ message: `Phone number must be exactly ${selectedCountry.mobileNumberLength} digits for ${selectedCountry.name}` });
        }
        return true;
      })
      .matches(/^[0-9\s\-\+\(\)]+$/, 'Phone number can only contain numbers, spaces, hyphens, plus signs, and parentheses'),
    phoneDialCode: string().optional(),
    phoneCountry: string().optional(),
    phoneOtp: string().required('OTP is required').length(6, 'OTP must be 6 digits'),
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().email('Please enter a valid email address').optional(),

    ldaCard: array()
      .of(assetItem)                      
      .transform((v: unknown): Asset[] => 
        Array.isArray(v) ? (v.filter(Boolean) as Asset[]) : []
      )
      .min(1, 'At least 1 LDA image is required')
      .max(3, 'You can upload up to 3 LDA images')
      .required('LDA card is required')
      .default([] as Asset[]),
  }).defined();
