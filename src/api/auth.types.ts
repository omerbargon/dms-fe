export type TStatus = 'idle' | 'loading' | 'success' | 'failed';
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

export interface IAuth {
  code: number;
  tokenType: 'Bearer';
  accessToken: string;
  userId: string;
  expiresIn: number;
  refreshToken: string;
}

export interface IAuthState {
  status: TStatus;
  task?: 'logout' | 'read';
  errors: [];
  isLoggedIn: boolean;
  auth?: Partial<IAuth>;
  user?: IUser;
}
