import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Controller, get, useFormContext } from 'react-hook-form';
import { ITheme, useTheme } from '../../../../src/theme';
import { FormLabel } from './FormLabel';
import { FormSchemaError } from './FormSchemaError';

interface FormDateInputProps {
  name: string;
  label?: string;
  required?: boolean;
}

export const FormDateInput: React.FC<FormDateInputProps> = ({ name, label, required }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, name);

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year || 2000, month || 1, 0).getDate();
  };

  return (
    <>
      {label && <FormLabel label={label} required={required} />}
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field: { value = '', onChange, onBlur } }) => {
          let [year = '', month = '', day = ''] = value.split('-');
          const updateDate = (field: 'day' | 'month' | 'year', text: string) => {
            if (field === 'day') {
              day = text.replace(/[^0-9]/g, '');
              if (parseInt(day, 10) > 31) {
                day = '31';
              }
            } else if (field === 'month') {
              month = text.replace(/[^0-9]/g, '');
              if (parseInt(month, 10) > 12) {
                month = '12';
              }
            } else if (field === 'year') {
              year = text.replace(/[^0-9]/g, '');
              if (year && !/^[12]/.test(year)) {
                year = '';
              }
            }
            const maxDays = getDaysInMonth(parseInt(year, 10), parseInt(month, 10));
            if (parseInt(day, 10) > maxDays) {
              day = maxDays.toString();
            }
            onChange(`${year}-${month}-${day}`);
          };

          return (
            <View style={styles.dateInputContainer}>
              <TextInput style={styles.input} placeholderTextColor={theme.placeholder} maxLength={2} placeholder={required ? 'DD *' : 'DD'} keyboardType="numeric" value={day} onChangeText={text => updateDate('day', text)} onBlur={onBlur} />
              <TextInput style={styles.input} placeholderTextColor={theme.placeholder} maxLength={2} placeholder={required ? 'MM *' : 'MM'} keyboardType="numeric" value={month} onChangeText={text => updateDate('month', text)} onBlur={onBlur} />
              <TextInput style={styles.input} placeholderTextColor={theme.placeholder} maxLength={4} placeholder={required ? 'YYYY *' : 'YYYY'} keyboardType="numeric" value={year} onChangeText={text => updateDate('year', text)} onBlur={onBlur} />
            </View>
          );
        }}
      />
      {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}
    </>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    dateInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    input: {
      flex: 1,
      marginVertical: 8,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 12,
      backgroundColor: theme.white,
      color: theme.black,
      paddingHorizontal: 10,
      height: 50,
      fontSize: 16,
    },
  });
