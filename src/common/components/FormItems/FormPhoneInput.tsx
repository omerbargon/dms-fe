import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, TextInput, View, Text, Modal, FlatList, Pressable } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { countries, IPhoneCountryInput } from '../../utilities/countries/countries';
import { FormSchemaError } from './FormSchemaError';
import { FormLabel } from './FormLabel';
import { ITheme, useTheme } from '../../../../src/theme';
import { ArrowDownIcon, CheckIcon } from '../../../assets/icons';

interface IPhoneInputProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  modalVisible?: boolean;
  readonly?: boolean;
  defaultCountry: string;
  phoneCountry: string;
  phoneDialCode: string;
}

export const FormPhoneInput = React.memo(({ label, name, required, disabled, readonly = false, defaultCountry = 'LB', modalVisible = false, placeholder, phoneCountry, phoneDialCode }: IPhoneInputProps) => {
  const { formState, control, setValue, getValues, watch, trigger } = useFormContext();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { errors } = formState;
  const fieldError = errors[name];
  const watchedCountryCode = watch(phoneCountry ? phoneCountry : 'phoneCountry');
  const watchedPhoneNumber = watch(name);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const selectedCountry = useMemo(() => countries.find(country => country.code === watchedCountryCode) || countries.find(c => c.code === defaultCountry), [watchedCountryCode, defaultCountry]);

  const lengthInfo = useMemo(() => {
    if (!selectedCountry || !watchedPhoneNumber) return null;

    const cleanNumber = watchedPhoneNumber.replace(/\D/g, '');
    const required = selectedCountry.mobileNumberLength;
    const current = cleanNumber.length;

    if (current === 0) return null;

    return {
      current,
      required,
      isValid: current === required,
      message: `${current}/${required} digits`,
    };
  }, [selectedCountry, watchedPhoneNumber]);

  const handleCountryChange = useCallback(
    (country: IPhoneCountryInput) => {
      setValue(phoneCountry ? phoneCountry : 'phoneCountry', country.code);
      setValue(phoneDialCode ? phoneDialCode : 'phoneDialCode', country.dialCode);
      setValue(name, '');
      setSearchText('');
      setIsModalVisible(false);
      setTimeout(() => trigger([name]), 100);
    },
    [name, phoneCountry, phoneDialCode, setValue, trigger],
  );

  const handlePhoneNumberChange = useCallback((value: string) => {
    const cleanValue = value.replace(/[^0-9\s\-\+\(\)]/g, '');
    return cleanValue;
  }, []);

  const toggleModal = () => setIsModalVisible(prev => !prev);
  const filterCountries = countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase()) || country.dialCode.includes(searchText));

  return (
    <>
      {label && <FormLabel label={label} required={required} />}

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name={phoneCountry ? phoneCountry : 'phoneCountry'}
          defaultValue={watchedCountryCode || selectedCountry?.code}
          render={({ field: { value } }) => (
            <Pressable style={styles.flagContainer} onPress={toggleModal}>
              <Text style={styles.flag}>{selectedCountry?.flag}</Text>
              <Text style={styles.countryCodeText}>{value}</Text>
              {modalVisible && <ArrowDownIcon />}
            </Pressable>
          )}
        />

        <View style={styles.verticalDivider} />

        <Controller control={control} name={phoneDialCode ? phoneDialCode : 'phoneDialCode'} defaultValue={selectedCountry?.dialCode || ''} render={({ field: { value } }) => <Text style={styles.dialCodeText}>{value}</Text>} />

        <Controller
          control={control}
          name={name}
          defaultValue={getValues(name) || ''}
          render={({ field: { onChange, value } }) => (
            <TextInput
              readOnly={readonly}
              style={styles.phoneInput}
              placeholderTextColor={theme.placeholder}
              value={value}
              onChangeText={text => {
                const cleanValue = handlePhoneNumberChange(text);
                onChange(cleanValue);
              }}
              placeholder={placeholder || `Enter ${selectedCountry?.mobileNumberLength || 8} digit number`}
              keyboardType="phone-pad"
              editable={!disabled}
              maxLength={selectedCountry?.mobileNumberLength ? selectedCountry.mobileNumberLength + 5 : 15}
            />
          )}
        />
      </View>

      {lengthInfo && !fieldError && (
        <View style={styles.lengthFeedback}>
          <Text style={[styles.lengthText, lengthInfo.isValid ? styles.lengthTextValid : styles.lengthTextInvalid]}>{lengthInfo.message}</Text>
        </View>
      )}

      {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}

      {modalVisible && (
        <Modal transparent animationType="fade" visible={isModalVisible} onRequestClose={toggleModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Pressable style={styles.closeIcon} onPress={toggleModal}>
                <Text style={styles.closeText}>ㄨ Close</Text>
              </Pressable>

              <TextInput placeholderTextColor={theme.placeholder} style={styles.searchInput} placeholder="Search country or dial code" value={searchText} onChangeText={setSearchText} />
              <FlatList
                data={filterCountries}
                keyExtractor={item => item.code}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable style={styles.modalItem} onPress={() => handleCountryChange(item)}>
                    <Text style={styles.flag}>{item.flag}</Text>
                    <Text style={styles.dialCodeText}>{item.dialCode}</Text>
                    <View style={styles.countryInfo}>
                      <Text style={styles.countryName}>{item.name}</Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
});

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 12,
      backgroundColor: theme.white,
      marginVertical: 4,
      paddingHorizontal: 16,
      height: 50,
    },
    flagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingRight: 0,
    },
    flag: {
      fontSize: 20,
    },
    countryCodeText: {
      fontSize: 15,
      color: theme.black,
      fontWeight: '600',
    },
    verticalDivider: {
      width: 1,
      height: '100%',
      marginHorizontal: 10,
      backgroundColor: theme.borderColor,
    },
    dialCodeText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
      marginRight: 6,
    },
    phoneInput: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 12,
      color: theme.black,
    },
    lengthFeedback: {
      paddingHorizontal: 4,
      marginTop: -4,
      marginBottom: 8,
    },
    lengthText: {
      fontSize: 12.5,
      fontWeight: '500',
    },
    lengthTextValid: {
      color: theme.success,
      fontWeight: 'bold',
    },
    lengthTextInvalid: {
      color: theme.danger,
      fontWeight: 'bold',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: theme.white,
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: '100%',
      maxHeight: '65%',
    },
    searchInput: {
      height: 48,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 12,
      fontSize: 16,
      paddingHorizontal: 12,
      marginBottom: 8,
    },
    modalItem: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
    },
    countryInfo: {
      flex: 1,
    },
    countryName: {
      color: theme.black,
      fontSize: 15,
      fontWeight: '500',
    },
    countryLength: {
      color: theme.gray,
      fontSize: 12,
      marginTop: 2,
    },
    countryCode: {
      color: theme.black,
      fontSize: 15,
    },
    closeIcon: {
      alignSelf: 'flex-end',
      padding: 4,
      marginBottom: 8,
    },
    closeText: {
      fontSize: 14,
      paddingBottom: 8,
      color: theme.appSecondaryColor,
      fontWeight: '600',
    },
  });
