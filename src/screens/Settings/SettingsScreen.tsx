import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, I18nManager, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FAQIcon, LanguageIcon, LogoutIcon, MoonIcon, NotificationIcon, PrivacyIcon, RightArrowIcon, SunIcon, TermsIcon } from '../../assets/icons';
import { Button } from '../../../src/common/components/Button/Button';
import { ScrollViewContainer } from '../../../src/common/components/Container/ScrollViewContainer';
import { useLanguage } from '../../../src/locales/LanguageProvider';
import { AuthContext } from '../../../src/navigation/AuthProvider';
import { ITheme, useTheme } from '../../../src/theme';
import { RootStackParamList } from '../../navigation/types';

type MenuItem = {
  label: string;
  route?: keyof RootStackParamList;
  leadingIcon: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

export const SettingsScreen = () => {
  const { mode, theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const modeModalRef = useRef<Modalize>(null);
  const languageModalRef = useRef<Modalize>(null);
  const { logout } = useContext(AuthContext);
  const [isSwitchingTheme, setIsSwitchingTheme] = useState<boolean>(false);
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState<boolean>(false);

  const { currentLanguage, changeLanguage } = useLanguage();

  const agreements: MenuItem[] = useMemo(
    () => [
      { label: 'FAQs', route: 'FAQs', leadingIcon: <FAQIcon />, trailingIcon: <RightArrowIcon /> },
      { label: 'Privacy Policy', route: 'PrivacyPolicy', leadingIcon: <PrivacyIcon />, trailingIcon: <RightArrowIcon /> },
      { label: 'Terms & Conditions', route: 'TermsAndConditions', leadingIcon: <TermsIcon />, trailingIcon: <RightArrowIcon /> },
    ],
    [],
  );

  const handleNavigateMenuItem = useCallback(
    (route: keyof RootStackParamList) => () => {
      navigation.navigate(route as any);
    },
    [navigation],
  );

  const handleOpenModeModal = useCallback(() => {
    modeModalRef.current?.open();
  }, []);

  const handleOpenLanguageModal = useCallback(() => {
    languageModalRef.current?.open();
  }, []);

  const handleThemeChange = useCallback(
    (newMode: 'light' | 'dark') => {
      if (mode === newMode) {
        return;
      }
      modeModalRef.current?.close();
      setIsSwitchingTheme(true);
      setTimeout(() => {
        toggleTheme();
        setIsSwitchingTheme(false);
      }, 1000);
    },
    [mode, toggleTheme],
  );

  const handleLanguageChange = useCallback(
    async (lng: 'en' | 'ar') => {
      if (currentLanguage === lng) {
        languageModalRef.current?.close();
        return;
      }

      setIsSwitchingLanguage(true);
      changeLanguage(lng);

      if (lng === 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }

      setTimeout(() => {
        languageModalRef.current?.close();
        setIsSwitchingLanguage(false);
      }, 500);
    },
    [changeLanguage, currentLanguage],
  );

  return (
    <>
      <ScrollViewContainer>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.titleAccent} />
          </View>

          <Pressable style={styles.modernItem} onPress={handleOpenLanguageModal}>
            <View style={styles.itemIconContainer}>
              <LanguageIcon />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Language</Text>
              <Text style={styles.itemDescription}>App display language</Text>
            </View>
            <View style={styles.itemValueContainer}>
              <RightArrowIcon />
            </View>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.modernItem} onPress={handleOpenModeModal}>
            <View style={styles.itemIconContainer}>{mode === 'light' ? <SunIcon /> : <MoonIcon />}</View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Appearance</Text>
              <Text style={styles.itemDescription}>Light or dark theme</Text>
            </View>
            <View style={styles.itemValueContainer}>
              <RightArrowIcon />
            </View>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.titleAccent} />
          </View>

          <View style={styles.modernItem}>
            <View style={styles.itemIconContainer}>
              <NotificationIcon />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Notifications Settings</Text>
              <Text style={styles.itemDescription}>Receive app notifications</Text>
            </View>
            <View style={styles.itemValueContainer}>
              <RightArrowIcon />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Legal & Support</Text>
            <View style={styles.titleAccent} />
          </View>

          {agreements.map(({ label, route, leadingIcon, trailingIcon }, index) => (
            <React.Fragment key={index}>
              <Pressable style={styles.modernItem} onPress={handleNavigateMenuItem(route!)}>
                <View style={styles.itemIconContainer}>{leadingIcon}</View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{label}</Text>
                </View>
                <View style={styles.itemArrow}>{trailingIcon}</View>
              </Pressable>
              {index < agreements.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.logoutSection}>
          <Button title="Sign Out" prefix={<LogoutIcon />} variant="filled" color={theme.danger} onPress={logout} />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollViewContainer>

      <Modalize ref={modeModalRef} adjustToContentHeight modalStyle={styles.modal} overlayStyle={styles.modalOverlay} handleStyle={styles.modalHandle} handlePosition="inside" closeSnapPointStraightEnabled={false} withHandle={false}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Appearance</Text>
            <Text style={styles.modalSubtitle}>Select your preferred theme for the best experience</Text>
          </View>

          <View style={styles.optionsContainer}>
            <Pressable style={[styles.optionCard, mode === 'light' && styles.optionSelected]} onPress={() => handleThemeChange('light')}>
              <View style={styles.optionContent}>
                <View style={[styles.optionIconContainer, mode === 'light' && styles.selectedIconContainer]}>
                  <SunIcon />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionText, mode === 'light' && styles.selectedText]}>Light Mode</Text>
                  <Text style={styles.optionDescription}>Clean and bright interface</Text>
                </View>
              </View>
              {mode === 'light' && <View style={styles.selectedIndicator} />}
            </Pressable>

            <Pressable style={[styles.optionCard, mode === 'dark' && styles.optionSelected]} onPress={() => handleThemeChange('dark')}>
              <View style={styles.optionContent}>
                <View style={[styles.optionIconContainer, mode === 'dark' && styles.selectedIconContainer]}>
                  <MoonIcon />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionText, mode === 'dark' && styles.selectedText]}>Dark Mode</Text>
                  <Text style={styles.optionDescription}>Easy on the eyes</Text>
                </View>
              </View>
              {mode === 'dark' && <View style={styles.selectedIndicator} />}
            </Pressable>
          </View>
        </View>
      </Modalize>

      <Modalize ref={languageModalRef} adjustToContentHeight modalStyle={styles.modal} overlayStyle={styles.modalOverlay} handleStyle={styles.modalHandle} handlePosition="inside" closeSnapPointStraightEnabled={false} withHandle={false}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Language</Text>
            <Text style={styles.modalSubtitle}>Select your preferred language for the app</Text>
          </View>

          <View style={styles.optionsContainer}>
            <Pressable style={[styles.optionCard, currentLanguage === 'en' && styles.optionSelected]} onPress={() => handleLanguageChange('en')}>
              <View style={styles.optionContent}>
                <View style={styles.optionIconContainer}>
                  <LanguageIcon />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionText, currentLanguage === 'en' && styles.selectedText]}>English</Text>
                  <Text style={styles.optionDescription}>Default language</Text>
                </View>
              </View>
              {currentLanguage === 'en' && <View style={styles.selectedIndicator} />}
            </Pressable>

            <Pressable style={[styles.optionCard, currentLanguage === 'ar' && styles.optionSelected]} onPress={() => handleLanguageChange('ar')}>
              <View style={styles.optionContent}>
                <View style={styles.optionIconContainer}>
                  <LanguageIcon />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionText, currentLanguage === 'ar' && styles.selectedText]}>Arabic</Text>
                  <Text style={styles.optionDescription}>Arabic Language</Text>
                </View>
              </View>
              {currentLanguage === 'ar' && <View style={styles.selectedIndicator} />}
            </Pressable>
          </View>
        </View>
      </Modalize>

      {(isSwitchingTheme || isSwitchingLanguage) && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <View style={styles.loadingIconContainer}>
              <ActivityIndicator size="large" color={theme.appSecondaryColor} />
            </View>
            <Text style={styles.loadingText}>{isSwitchingTheme ? 'Switching theme...' : 'Changing language...'}</Text>
            <Text style={styles.loadingSubtext}>Please wait a moment</Text>
          </View>
        </View>
      )}
    </>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
      borderWidth: 1.25,
      paddingBottom: 8,
      borderColor: theme.appSecondaryColor,
      borderRadius: 12,
    },
    cardHeader: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 12,
      marginBottom: 8,
      position: 'relative',
      backgroundColor: theme.appSecondaryColor + '08',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.black,
      letterSpacing: 0.5,
    },
    titleAccent: {
      position: 'absolute',
      bottom: 0,
      left: 20,
      width: 56,
      height: 3,
      backgroundColor: theme.appSecondaryColor,
      borderRadius: 2,
    },
    modernItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 64,
    },
    itemIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: theme.appSecondaryColor + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    itemContent: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.black,
      marginBottom: 2,
      letterSpacing: 0.2,
    },
    itemDescription: {
      fontSize: 13,
      color: theme.gray,
      opacity: 0.8,
    },
    itemValueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    itemArrow: {
      marginLeft: 4,
    },
    divider: {
      height: 1,
      backgroundColor: theme.borderColor + '40',
      marginLeft: 74,
      marginRight: 20,
    },
    logoutSection: {
      marginBottom: 20,
    },
    bottomSpacer: {
      height: 30,
    },
    modal: {
      backgroundColor: 'transparent',
    },
    modalOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
      backgroundColor: theme.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingBottom: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 20,
    },
    modalHeaderContainer: {
      paddingTop: 20,
      paddingHorizontal: 24,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor + '30',
    },
    modalHandle: {
      width: 50,
      height: 5,
      backgroundColor: theme.borderColor,
      borderRadius: 3,
      alignSelf: 'center',
      marginBottom: 20,
      opacity: 0.6,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: theme.black,
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    modalSubtitle: {
      fontSize: 15,
      color: theme.gray,
      textAlign: 'center',
      opacity: 0.8,
      lineHeight: 20,
    },
    optionsContainer: {
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 8,
    },
    optionCard: {
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.borderColor + '40',
      backgroundColor: theme.white,
      position: 'relative',
      overflow: 'hidden',
    },
    optionSelected: {
      borderColor: theme.appSecondaryColor,
      backgroundColor: theme.appSecondaryColor + '22',
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    optionIconContainer: {
      marginRight: 16,
      opacity: 0.7,
    },
    selectedIconContainer: {
      opacity: 1,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.black,
      marginBottom: 4,
      letterSpacing: 0.3,
    },
    selectedText: {
      color: theme.appSecondaryColor,
      fontWeight: '700',
    },
    optionDescription: {
      fontSize: 14,
      color: theme.gray,
      opacity: 0.8,
    },
    selectedIndicator: {
      position: 'absolute',
      top: 14,
      right: 14,
      width: 10,
      height: 10,
      borderRadius: 12,
      backgroundColor: theme.appSecondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.appSecondaryColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    loadingCard: {
      backgroundColor: theme.white,
      padding: 36,
      borderRadius: 24,
      alignItems: 'center',
      marginHorizontal: 40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.4,
      shadowRadius: 25,
      elevation: 20,
      borderWidth: 1,
      borderColor: theme.appSecondaryColor + '20',
    },
    loadingIconContainer: {
      marginBottom: 16,
    },
    loadingText: {
      fontSize: 18,
      color: theme.black,
      fontWeight: '600',
      marginBottom: 6,
      textAlign: 'center',
      letterSpacing: 0.3,
    },
    loadingSubtext: {
      fontSize: 14,
      color: theme.gray,
      opacity: 0.8,
      textAlign: 'center',
    },
  });
