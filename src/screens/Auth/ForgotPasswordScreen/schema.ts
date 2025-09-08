import { string, object } from 'yup';
import type { ObjectSchema } from 'yup';
import { IForgotPassword } from './types';

export const createSchema = (): ObjectSchema<IForgotPassword> => {
  return object({
    email: string().required('Email is required').email('Enter a valid email'),
  }).defined();
};
