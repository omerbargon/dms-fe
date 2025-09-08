import React, { ReactNode, useMemo } from 'react';
import { FieldValues, FormProvider as Provider, UseFormReturn } from 'react-hook-form';
import type { ObjectSchema } from 'yup';
import { FormLoadingContext, FormSchemaContext } from './context';

export type FormProviderProps<T extends FieldValues, S = ObjectSchema<T>> = {
  children: ReactNode;
  schema: S;
  formMethods: UseFormReturn<T>;
  errors?: any;
  loading?: boolean;
};

export const FormProvider = <TFieldValues extends FieldValues = FieldValues>({ children, formMethods, schema, loading }: FormProviderProps<TFieldValues>) => {
  const schemaDescription = useMemo(() => schema.describe(), [schema]);

  return (
    <FormLoadingContext.Provider value={loading}>
      <FormSchemaContext.Provider value={schemaDescription}>
        <Provider {...formMethods}>{children}</Provider>
      </FormSchemaContext.Provider>
    </FormLoadingContext.Provider>
  );
};
