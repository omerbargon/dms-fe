import React from 'react';
import { InputModeOptions, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { Controller, get, useFormContext } from 'react-hook-form';
import { FormLabel } from './FormLabel';
import { FormSchemaError } from './FormSchemaError';
import { ITheme, useTheme } from '../../../../src/theme';

interface ITextInputProps extends TextInputProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
  name: string;
  required?: boolean;
  type?: InputModeOptions;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  disabled?: boolean;
}

export const FormTextInput = React.memo(({ label, name, disabled = false, required, type = 'text', addonBefore, addonAfter, style, placeholder, ...rest }: ITextInputProps) => {
  const { formState, control } = useFormContext() ?? {};
  const { errors = {} } = formState ?? {};
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const inputStyles: StyleProp<TextStyle>[] = [styles.input];
  const fieldError = get(errors, name);

  if (addonBefore) {
    inputStyles.push(styles.inputWithAddon);
  }
  if (addonAfter) {
    inputStyles.push(styles.inputWithAddon);
  }
  return (
    <>
      {label && <FormLabel label={label} required={required} />}
      <Controller
        control={control}
        rules={{ required }}
        render={({ field: { onChange, onBlur, value } }) => {
          const finalPlaceholder = required && placeholder ? `${placeholder} *` : placeholder;
          return (
            <View style={[styles.inputWrapper, disabled && styles.disabledWrapper, style]}>
              {addonBefore && <View style={styles.addon}>{addonBefore}</View>}
              <TextInput
                style={inputStyles}
                readOnly={disabled}
                inputMode={type}
                cursorColor={theme.appSecondaryColor}
                placeholder={finalPlaceholder}
                placeholderTextColor={theme.placeholder}
                onBlur={onBlur}
                value={value !== undefined && value !== null ? String(value) : ''}
                onChangeText={text => {
                  if (type === 'numeric') {
                    const cleaned = text.replace(/[^0-9.]/g, '');
                    onChange(cleaned === '' ? '' : Number(cleaned));
                  } else {
                    onChange(text);
                  }
                }}
                {...rest}
              />
              {addonAfter && <View style={styles.addon}>{addonAfter}</View>}
            </View>
          );
        }}
        name={name}
      />
      {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}
    </>
  );
});

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 12,
      backgroundColor: theme.white,
      marginVertical: 4,
      paddingHorizontal: 10,
      height: 50,
    },
    disabledWrapper: {
      backgroundColor: theme.selectedSecondaryColor,
      borderColor: theme.appSecondaryColor,
    },
    input: {
      flex: 1,
      color: theme.black,
      fontSize: 16,
    },
    inputWithAddon: {
      paddingHorizontal: 8,
    },
    addon: {
      paddingHorizontal: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
