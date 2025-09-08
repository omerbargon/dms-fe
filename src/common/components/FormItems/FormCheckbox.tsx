import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Controller, get, useFormContext } from 'react-hook-form';
import { ITheme, useTheme } from '../../../../src/theme';
import { FormSchemaError } from './FormSchemaError';

interface FormCheckBoxProps {
  name: string;
  label: string;
  required?: boolean;
}

export const FormCheckBox: React.FC<FormCheckBoxProps> = ({ name, label, required }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, name);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { value, onChange } }) => (
        <>
          <View style={styles.container}>
            <Pressable onPress={() => onChange(!value)} style={styles.outerBox}>
              {value && <View style={styles.innerBox} />}
            </Pressable>
            <Pressable onPress={() => onChange(!value)}>
              <Text style={styles.label}>{label}</Text>
            </Pressable>
          </View>

          {fieldError && (
            <View>
              <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />
            </View>
          )}
        </>
      )}
    />
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: 8,
      alignItems: 'center',
    },
    outerBox: {
      width: 18,
      height: 18,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 6,
      marginRight: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.white,
    },
    innerBox: {
      width: 12.5,
      height: 12.5,
      borderRadius: 4,
      backgroundColor: theme.appSecondaryColor,
    },
    label: {
      fontSize: 15,
      marginTop: -2,
      color: theme.black,
    },
  });
