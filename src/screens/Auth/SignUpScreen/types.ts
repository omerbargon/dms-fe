import type { Asset } from 'react-native-image-picker';

export interface IAuthSignUp {
  phoneCountry?: string;
  phoneDialCode?: string;
  phoneNumber: string;
  phoneOtp: string;
  firstName: string;
  lastName: string;
  email?: string;
ldaCard: Asset[];
}

export enum ESignUpStep {
  PHONE = 'phone',
  OTP_PHONE = 'otp-phone',
  FORM = 'form',
}
