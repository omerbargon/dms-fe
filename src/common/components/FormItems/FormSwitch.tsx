import React, { useMemo } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Controller, get, useFormContext } from 'react-hook-form';
import { ITheme, useTheme } from '../../../theme';
import { FormLabel } from './FormLabel';
import { FormSchemaError } from './FormSchemaError';

interface Props {
  name: string;
  label?: string;
  showSwitcher?: boolean;
  required?: boolean;
  onValueChangeCallback?: (val: boolean) => void;
  disabled?: boolean;
}

export const FormSwitch = ({ name, label, showSwitcher = false, required = false, onValueChangeCallback, disabled = false }: Props) => {
  const { theme } = useTheme();
  const { control, formState } = useFormContext();
  const { errors } = formState ?? {};
  const styles = useMemo(() => createStyles(theme), [theme]);
  const fieldError = get(errors, name);

  const disabledStyles = disabled ? { opacity: 0.75 } : {};

  return (
    <View style={styles.wrapper}>
      {label && <FormLabel label={label} required={required} />}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const isYes = value === true;
          const isNo = value === false;
          return (
            <View style={styles.row}>
              <View style={[styles.toggleBlockWrapper, disabledStyles]}>
                <Pressable
                  style={[styles.toggleBlock, isYes && styles.activeToggle, disabledStyles]}
                  onPress={() => {
                    if (!disabled && !isYes) {
                      onChange(true);
                      onValueChangeCallback?.(true);
                    }
                  }}
                >
                  <Text style={[styles.toggleText, disabled && { color: theme.gray }]}>Yes</Text>
                </Pressable>
                <View style={styles.separator} />
                <Pressable
                  style={[styles.toggleBlock, isNo && styles.activeToggle, disabledStyles]}
                  onPress={() => {
                    if (!disabled && !isNo) {
                      onChange(false);
                      onValueChangeCallback?.(false);
                    }
                  }}
                >
                  <Text style={[styles.toggleText, disabled && { color: theme.gray }]}>No</Text>
                </Pressable>
              </View>
              {value !== undefined && showSwitcher && (
                <Switch
                  value={value === true}
                  onValueChange={val => {
                    if (!disabled) {
                      onChange(val);
                      onValueChangeCallback?.(val);
                    }
                  }}
                  trackColor={{ false: theme.borderColor, true: theme.appSecondaryColor }}
                  thumbColor={value === true ? theme.appMainColor : theme.gray}
                  disabled={disabled}
                  style={[disabledStyles]}
                />
              )}
            </View>
          );
        }}
      />
      {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    toggleBlockWrapper: {
      flexDirection: 'row',
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.appSecondaryColor,
      marginRight: 12,
    },
    toggleBlock: {
      paddingVertical: 8,
      paddingHorizontal: 24,
      backgroundColor: theme.white,
    },
    separator: {
      width: 1,
      backgroundColor: theme.appSecondaryColor,
    },
    activeToggle: {
      backgroundColor: theme.selectedMainColor,
    },
    toggleText: {
      color: theme.black,
      fontWeight: '500',
    },
  });
