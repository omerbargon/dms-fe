export interface IAuthPhoneStep1 {
  phoneNumber: string;
  phoneDialCode: string;
  phoneCountry: string;
  email?: string;
}

export interface IAuthPhoneStep2 {
  otp: string;
}
