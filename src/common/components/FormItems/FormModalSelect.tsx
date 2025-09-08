import React, { useCallback, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { Controller, get, useFormContext } from 'react-hook-form';
import { ITheme, useTheme } from '../../../theme';
import { FormSchemaError } from './FormSchemaError';
import { FormLabel } from './FormLabel';
import { CheckIcon } from '../../../assets/icons';
import { Button } from '../Button/Button';

interface Option {
  label: string;
  value: string;
}

interface FormSelectModalProps {
  label?: string;
  name: string;
  options: Option[];
  required?: boolean;
  placeholder?: string;
  multiSelect?: boolean;
  isSearchable?: boolean;
  isTwoColGrid?: boolean;
  description?: string;
  disabled?: boolean;
  onSearch?: (text: string) => void;
}

export const FormModalSelect: React.FC<FormSelectModalProps> = ({ label, disabled, onSearch, isSearchable = false, description, isTwoColGrid = false, name, options, required, placeholder = 'Select an option', multiSelect = false }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, name);
  const [modalVisible, setModalVisible] = useState(false);
  const finalPlaceholder = required ? `${placeholder} *` : placeholder;
  const [searchText, setSearchText] = useState<string>('');

  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchText.toLowerCase()));
  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSearchText('');
  }, []);

  return (
    <>
      {label && <FormLabel label={label} required={required} />}
      {description && <Text style={styles.textDescription}>{description}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field: { value, onChange } }) => {
          const currentValues: string[] = multiSelect ? value || [] : [value];

          const handleSelect = (selectedValue: string) => {
            if (multiSelect) {
              if (currentValues.includes(selectedValue)) {
                onChange(currentValues.filter(v => v !== selectedValue));
              } else {
                onChange([...currentValues, selectedValue]);
              }
            } else {
              onChange(selectedValue);
              closeModal();
            }
          };

          const renderSelectedLabels = () => {
            if (!value || (Array.isArray(value) && value.length === 0)) {
              return <Text style={styles.placeholder}>{finalPlaceholder}</Text>;
            }

            const selectedOptions = options.filter(opt => (multiSelect ? value.includes(opt.value) : opt.value === value));

            if (!multiSelect) {
              return <Text style={styles.text}>{selectedOptions[0]?.label}</Text>;
            }

            const maxVisibleTags = 2;
            const visibleTags = selectedOptions.slice(0, maxVisibleTags);
            const hiddenCount = selectedOptions.length - maxVisibleTags;

            return (
              <View style={styles.tagsContainer}>
                {visibleTags.map(opt => (
                  <View key={opt.value} style={styles.tag}>
                    <Text style={styles.tagText}>{opt.label}</Text>
                  </View>
                ))}
                {hiddenCount > 0 && (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>+{hiddenCount}</Text>
                  </View>
                )}
              </View>
            );
          };

          return (
            <>
              <Pressable
                disabled={disabled}
                style={[styles.selectBox, disabled && styles.selectBoxDisabled]}
                onPress={() => {
                  if (!disabled) {
                    setModalVisible(true);
                  }
                }}
              >
                {renderSelectedLabels()}
              </Pressable>

              <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={closeModal}>
                <TouchableWithoutFeedback onPress={closeModal}>
                  <View style={styles.backdrop} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Choose {label}</Text>
                  {description && <Text style={[styles.textDescription, styles.textDescriptionPadding]}>{description}</Text>}
                  {isSearchable && (
                    <View>
                      <TextInput
                        placeholder="Search"
                        placeholderTextColor={theme.placeholder}
                        value={searchText}
                        onChangeText={text => {
                          setSearchText(text);
                          if (onSearch) {
                            onSearch(text);
                          }
                        }}
                        style={styles.searchInput}
                      />
                    </View>
                  )}
                  <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {isTwoColGrid ? (
                      <View style={styles.optionsGrid}>
                        {filteredOptions.map(option => {
                          const selected = currentValues.includes(option.value);
                          return (
                            <Pressable key={option.value} style={[styles.gridOption, selected && styles.modeSelected]} onPress={() => handleSelect(option.value)}>
                              <View style={styles.optionRow}>
                                <Text style={styles.modeText}>{option.label}</Text>
                                {selected && <CheckIcon />}
                              </View>
                            </Pressable>
                          );
                        })}
                      </View>
                    ) : (
                      filteredOptions.map(option => {
                        const selected = currentValues.includes(option.value);
                        return (
                          <Pressable key={option.value} style={[styles.modeOption, selected && styles.modeSelected]} onPress={() => handleSelect(option.value)}>
                            <View style={styles.optionRow}>
                              <Text style={styles.modeText}>{option.label}</Text>
                              {selected && <CheckIcon />}
                            </View>
                          </Pressable>
                        );
                      })
                    )}
                  </ScrollView>

                  {multiSelect && <Button title="Done" onPress={() => closeModal} />}
                </View>
              </Modal>

              {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}
            </>
          );
        }}
      />
    </>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    selectBox: {
      borderColor: theme.borderColor,
      borderWidth: 1,
      backgroundColor: theme.white,
      borderRadius: 12,
      height: 54,
      paddingHorizontal: 12,
      justifyContent: 'center',
      marginVertical: 4,
    },
    text: {
      color: theme.black,
      fontSize: 16,
    },
    placeholder: {
      color: theme.placeholder,
      fontSize: 16,
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 16,
      maxHeight: '56%',
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.appMainColor,
      marginBottom: 12,
    },
    optionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    scrollContent: {
      paddingBottom: 20,
    },
    modeOption: {
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.appMainColor,
      marginBottom: 8,
    },
    modeSelected: {
      backgroundColor: theme.selectedSecondaryColor,
      borderColor: theme.appSecondaryColor,
    },
    modeText: {
      color: theme.black,
      fontSize: 16,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      gap: 6,
    },
    tag: {
      backgroundColor: theme.selectedSecondaryColor,
      borderRadius: 16,
      paddingHorizontal: 7,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: theme.appSecondaryColor,
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridOption: {
      width: '48%',
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.appMainColor,
      marginBottom: 12,
    },
    tagText: {
      color: theme.appSecondaryColor,
      fontSize: 13,
      fontWeight: '500',
    },
    searchInput: {
      height: 48,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 12,
      marginBottom: 12,
      paddingHorizontal: 10,
      color: theme.black,
      fontSize: 16,
    },
    textDescription: {
      color: theme.black,
    },
    textDescriptionPadding: {
      paddingBottom: 14,
    },
    selectBoxDisabled: {
      backgroundColor: '#f2f2f2',
      borderColor: theme.borderColor,
      opacity: 0.6,
    },
  });
