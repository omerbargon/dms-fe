import React, { useMemo } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme, ITheme } from '../../../theme';
import { FormLabel } from './FormLabel';
import { FormSchemaError } from './FormSchemaError';
import { CheckIcon } from '../../../assets/icons';

export interface IOptions {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface Props {
  name: string;
  labelTitle?: string;
  isLabelBold?: boolean;
  required?: boolean;
  options: IOptions[];
  multiSelect?: boolean;
}

export const FormOptionSelector = ({ name, labelTitle, isLabelBold = false, required = false, options, multiSelect = false }: Props) => {
  const { theme } = useTheme();
  const { formState, control } = useFormContext() ?? {};
  const { errors = {} } = formState ?? {};
  const styles = useMemo(() => createStyles(theme), [theme]);
  const fieldError = get(errors, name);

  return (
    <View style={styles.wrapper}>
      {labelTitle && <FormLabel label={labelTitle} required={required} />}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          const selectedValues: string[] = multiSelect ? (Array.isArray(value) ? value : []) : [value];

          const toggleValue = (val: string, disabled?: boolean) => {
            if (disabled) {
              return;
            }

            if (multiSelect) {
              if (selectedValues.includes(val)) {
                onChange(selectedValues.filter(v => v !== val));
              } else {
                onChange([...selectedValues, val]);
              }
            } else {
              onChange(val);
            }
          };

          return (
            <>
              <View style={styles.optionsContainer}>
                {options.map(({ label, value: optionValue, description, disabled }) => {
                  const isSelected = selectedValues.includes(optionValue);
                  return (
                    <Pressable
                      key={optionValue}
                      onPress={() => toggleValue(optionValue, disabled)}
                      disabled={disabled}
                      style={[
                        styles.optionButton,
                        isSelected && {
                          backgroundColor: theme.selectedSecondaryColor,
                          borderColor: theme.appSecondaryColor,
                        },
                        disabled && styles.disabledButton,
                      ]}
                    >
                      <View style={styles.optionContent}>
                        <View style={styles.optionTextContainer}>
                          <Text style={[styles.optionText, disabled && styles.disabledText, isLabelBold && styles.textBold]}>{label}</Text>
                          {description ? <Text style={[styles.optionDescription, disabled && styles.disabledText]}>{description}</Text> : null}
                        </View>
                        {isSelected && !disabled && <CheckIcon />}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
              {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}
            </>
          );
        }}
      />
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 8,
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 4,
      gap: 8,
    },
    optionButton: {
      padding: 16,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.appMainColor,
      borderRadius: 12,
      backgroundColor: theme.white,
    },
    optionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    checkIcon: {
      marginLeft: 8,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionDescription: {
      fontSize: 13,
      color: theme.gray,
      marginTop: 2,
    },
    optionText: {
      fontSize: 16,
      color: theme.black,
    },
    disabledButton: {
      backgroundColor: 'transparent',
      opacity: 0.75,
      borderColor: theme.borderColor,
    },
    disabledText: {
      color: theme.gray,
    },
    textBold: {
      fontWeight: '500',
    },
  });
