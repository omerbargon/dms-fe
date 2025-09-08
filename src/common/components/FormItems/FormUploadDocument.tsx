import React, { useState, useCallback, useMemo } from 'react';
import { Pressable, View, StyleSheet, Modal, Text } from 'react-native';
import { Controller, get, useFormContext } from 'react-hook-form';
import { ITheme, useTheme } from '../../../theme';
import type { Asset } from 'react-native-image-picker';
import { UploadIcon } from '../../../assets/icons';
import { requestMediaPermissions } from '../../utilities/permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { FormSchemaError } from './FormSchemaError';
import { FormLabel } from './FormLabel';
import { Button } from '../Button/Button';
import FastImage from 'react-native-fast-image';

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  multiple?: boolean;
  max?: number;
};

export const FormUploadDocument: React.FC<Props> = ({ name, label, placeholder = 'Upload Document', required, multiple = false, max = 4 }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { formState, control } = useFormContext() ?? {};
  const { errors = {} } = formState ?? {};
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const fieldError = get(errors, name);
  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => setModalVisible(false), []);

  const handleSelectFromLibrary = useCallback(
    async (onChange: (images: Asset[] | Asset | null) => void, currentValue: Asset[] | Asset | null) => {
      closeModal();
      const isGranted = await requestMediaPermissions();
      if (!isGranted) {
        return;
      }

      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8, selectionLimit: multiple ? max : 1 });
      if (result.assets?.length) {
        const newAssets = multiple ? [...((currentValue as Asset[]) || []), ...result.assets].slice(0, max) : result.assets[0];
        onChange(newAssets);
      }
    },
    [closeModal, multiple, max],
  );

  const handleTakePhoto = useCallback(
    async (onChange: (images: Asset[] | Asset | null) => void, currentValue: Asset[] | Asset | null) => {
      closeModal();
      const isGranted = await requestMediaPermissions();
      if (!isGranted) {
        return;
      }

      const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
      if (result.assets?.length) {
        const newAssets = multiple ? [...((currentValue as Asset[]) || []), ...result.assets].slice(0, max) : result.assets[0];
        onChange(newAssets);
      }
    },
    [closeModal, multiple, max],
  );

  const handleRemoveImage = useCallback(
    (onChange: (images: Asset[] | Asset | null) => void, currentValue: Asset[] | Asset | null, index?: number) => {
      if (multiple && Array.isArray(currentValue)) {
        const updated = currentValue.filter((_, i) => i !== index);
        onChange(updated.length > 0 ? updated : null);
      } else {
        onChange(null);
      }
    },
    [multiple],
  );

  return (
    <React.Fragment>
      {label && <FormLabel label={label} required={required} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <View style={styles.wrapper}>
            <Pressable onPress={openModal} style={styles.card}>
              {multiple ? (
                Array.isArray(value) && value.length > 0 ? (
                  <View style={styles.imageGrid}>
                    {value.map((img, index) => (
                      <View key={index} style={styles.gridImageWrapper}>
                        <FastImage source={{ uri: img.uri }} style={styles.gridImage} resizeMode={FastImage.resizeMode.cover} />
                        <Pressable onPress={() => handleRemoveImage(onChange, value, index)} style={[styles.removeIconContainer, styles.multipleRemove]}>
                          <Text style={styles.removeIcon}>×</Text>
                        </Pressable>
                      </View>
                    ))}
                    {value.length < max && (
                      <Pressable onPress={openModal} style={styles.gridAdd}>
                        <UploadIcon />
                      </Pressable>
                    )}
                  </View>
                ) : (
                  <View style={styles.placeholder}>
                    <UploadIcon />
                    <Text style={styles.placeholderText}>
                      {placeholder} {required && '*'}
                    </Text>
                  </View>
                )
              ) : value ? (
                <View style={styles.singleImageWrapper}>
                  <FastImage source={{ uri: (value as Asset).uri }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
                  <Pressable onPress={() => handleRemoveImage(onChange, value)} style={[styles.removeIconContainer, styles.singleRemove]}>
                    <Text style={styles.removeIcon}>×</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.placeholder}>
                  <UploadIcon />
                  <Text style={styles.placeholderText}>
                    {placeholder} {required && '*'}
                  </Text>
                </View>
              )}

              {multiple && Array.isArray(value) && (
                <Text style={styles.uploadCount}>
                  {value.length} of {max} uploaded
                </Text>
              )}
            </Pressable>

            {fieldError && <FormSchemaError errorMessage={fieldError.message as React.ReactNode} />}

            <Modal animationType="fade" transparent visible={isModalVisible} onRequestClose={closeModal}>
              <Pressable style={styles.modalBackdrop} onPressOut={closeModal}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalDescription}>Choose how you'd like to upload your document photo:</Text>
                  <Button title="Take a Photo" style={styles.modalButton} onPress={() => handleTakePhoto(onChange, value)} />
                  <Button title="Choose from Gallery" style={styles.modalButton} onPress={() => handleSelectFromLibrary(onChange, value)} />
                </View>
              </Pressable>
            </Modal>
          </View>
        )}
      />
    </React.Fragment>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    wrapper: {
      marginVertical: 6,
    },
    placeholderText: {
      fontSize: 14,
      textAlign: 'center',
      color: theme.gray,
    },
    card: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.white,
      minHeight: 100,
      justifyContent: 'center',
      marginBottom: 4,
      alignItems: 'center',
      padding: 10,
    },
    placeholder: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    singleImageWrapper: {
      position: 'relative',
      width: '100%',
      height: 100,
      borderRadius: 12,
      overflow: 'hidden',
    },
    imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    gridImageWrapper: {
      position: 'relative',
      marginRight: 8,
      marginBottom: 8,
    },
    gridImage: {
      width: 70,
      height: 70,
      borderRadius: 12,
    },
    removeIconContainer: {
      position: 'absolute',
      backgroundColor: theme.appSecondaryColor,
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    multipleRemove: {
      top: -6,
      right: -6,
    },
    singleRemove: {
      top: 6,
      right: 6,
    },
    removeIcon: {
      color: 'white',
      fontSize: 14,
      lineHeight: 18,
      fontWeight: 'bold',
    },
    gridAdd: {
      width: 80,
      height: 80,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadCount: {
      marginTop: 6,
      fontSize: 12,
      color: theme.gray,
    },
    modalBackdrop: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalButton: {
      marginBottom: 12,
    },
    modalDescription: {
      fontSize: 17,
      paddingBottom: 12,
      color: theme.black,
    },
  });
