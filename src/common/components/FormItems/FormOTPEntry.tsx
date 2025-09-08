import React from 'react';
import { StyleSheet } from 'react-native';
import { Controller, get, useFormContext } from 'react-hook-form';
import { OtpInput } from 'react-native-otp-entry';
import { OtpInputProps } from 'react-native-otp-entry';
import { ITheme, useTheme } from '../../../../src/theme';
import { FormLabel } from './FormLabel';
import { FormSchemaError } from './FormSchemaError';

interface IOTPInputProps extends OtpInputProps {
  label?: string;
  name: string;
  required?: boolean;
}

export const FormOTPEntry = React.memo(({ name, required, label, ...rest }: IOTPInputProps) => {
  const { formState, control } = useFormContext() ?? {};
  const { errors = {} } = formState ?? {};
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const fieldError = get(errors, name);

  return (
    <>
      {label && <FormLabel label={label} required={required} />}
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, onBlur } }) => (
          <OtpInput
            focusColor={theme.selectedMainColor}
            numberOfDigits={6}
            onTextChange={onChange}
            onFilled={onBlur}
            theme={{ containerStyle: styles.containerStyle, pinCodeContainerStyle: styles.otpContainer, focusedPinCodeContainerStyle: styles.focusStyle, pinCodeTextStyle: styles.pinCodeTextStyle }}
            {...rest}
          />
        )}
        name={name}
      />
      {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}
    </>
  );
});

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    otpContainer: {
      backgroundColor: theme.white,
      width: 50,
      height: 50,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    focusStyle: {
      borderColor: theme.appMainColor,
    },
    containerStyle: {
      marginVertical: 8,
    },
    pinCodeTextStyle: {
      fontWeight: 'bold',
      color: theme.black,
    },
  });
