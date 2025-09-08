import { createContext } from 'react';
import { SchemaDescription } from 'yup';

export const FormLoadingContext = createContext<boolean | undefined>(false);
export const FormSchemaContext = createContext<Partial<SchemaDescription>>({});
