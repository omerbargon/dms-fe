import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef } from 'react';
import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { useForm as useReactHookForm } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';
import type { Lazy } from 'yup';

interface IProps<TFieldValues extends FieldValues = FieldValues> extends UseFormProps<TFieldValues> {
  schema: AnyObjectSchema | Lazy<any>;
}

export const useForm = <TFieldValues extends FieldValues = FieldValues>({ schema, defaultValues, ...rest }: IProps<TFieldValues>): UseFormReturn<TFieldValues> => {
  const form = useReactHookForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues,
    ...rest,
  });

  const {
    reset,
    formState: { isDirty },
  } = form;

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      if (!isDirty) {
        reset(defaultValues as Parameters<typeof reset>[0]);
      }
    } else {
      initialized.current = true;
    }
  }, [defaultValues, isDirty, reset]);

  return form;
};
