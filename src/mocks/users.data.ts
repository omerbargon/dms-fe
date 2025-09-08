export type TGender = 'female' | 'male';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: TGender;
  dateOfBirth: string;
  phoneDialCode: string;
  phoneNumber: string;
  phoneCountry: string;
  country: string;
  city: string;
  area: string;
  building: string;
  street: string;
  otherInfo?: string;
  accessToken?: string;
  phoneOtp?: string;
  emailOtp?: string;
}

export const users: IUser[] = [
  {
    id: '1',
    firstName: 'Omar',
    lastName: 'Barghashoon',
    email: 'omerbargon@gmail.com',
    password: 'Password',
    gender: 'male',
    dateOfBirth: '1995-05-12',
    phoneDialCode: '+961',
    phoneNumber: '70123456',
    phoneCountry: 'LB',
    country: 'Lebanon',
    city: 'Beirut',
    area: 'Hamra',
    building: 'Al-Manara Tower',
    street: 'Main Street',
    otherInfo: 'Apartment 12B, near the café',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    phoneOtp: '123456',
    emailOtp: '654321',
  },
];
