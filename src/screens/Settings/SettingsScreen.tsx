import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, I18nManager, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FAQIcon, LanguageIcon, MoonIcon, NotificationIcon, PrivacyIcon, RightArrowIcon, SunIcon, TermsIcon } from '../../assets/icons';
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSwitchingTheme, setIsSwitchingTheme] = useState(false);
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false);

  const { currentLanguage, changeLanguage } = useLanguage();

  const languageName = useMemo(() => {
    return currentLanguage === 'ar' ? 'العربية' : 'English';
  }, [currentLanguage]);

  const agreements: MenuItem[] = useMemo(
    () => [
      { label: 'FAQ', route: 'FAQs', leadingIcon: <FAQIcon />, trailingIcon: <RightArrowIcon /> },
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
        {/* PREFERENCES */}
        <View style={styles.menuContainerWrapper}>
          <Text style={styles.sectionLabel}>Preferences</Text>

          {/* LANGUAGE */}
          <Pressable style={styles.item} onPress={handleOpenLanguageModal}>
            <View style={styles.rowLeft}>
              <LanguageIcon />
              <View style={styles.languageContainer}>
                <Text style={styles.itemTitle}>Change Language</Text>
                <Text style={styles.itemSubtitle}>{languageName}</Text>
              </View>
            </View>
            <RightArrowIcon />
          </Pressable>

          {/* MODE */}
          <Pressable style={styles.item} onPress={handleOpenModeModal}>
            <View style={styles.rowLeft}>
              <SunIcon />
              <View style={styles.languageContainer}>
                <Text style={styles.itemTitle}>Mode</Text>
                <Text style={styles.itemSubtitle}>{mode === 'light' ? 'Light' : 'Dark'}</Text>
              </View>
            </View>
            <RightArrowIcon />
          </Pressable>
        </View>

        {/* NOTIFICATIONS */}
        <View style={styles.menuContainerWrapper}>
          <Text style={styles.sectionLabel}>Notifications</Text>
          <View style={styles.item}>
            <View style={styles.rowLeft}>
              <NotificationIcon />
              <Text style={styles.itemTitle}>Allow Notifications</Text>
            </View>
            <Switch
              trackColor={{
                false: theme.borderColor,
                true: theme.appSecondaryColor,
              }}
              thumbColor={theme.appMainColor}
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        {/* AGREEMENTS */}
        <View style={styles.menuContainerWrapper}>
          <Text style={styles.sectionLabel}>Agreements</Text>
          {agreements.map(({ label, route, leadingIcon, trailingIcon }, index) => (
            <Pressable key={index} style={styles.item} onPress={handleNavigateMenuItem(route!)}>
              <View style={styles.rowLeft}>
                {leadingIcon}
                <Text style={styles.itemTitle}>{label}</Text>
              </View>
              {trailingIcon}
            </Pressable>
          ))}
        </View>

        <Button title="Logout" onPress={logout} />
      </ScrollViewContainer>

      {/* MODE MODAL */}
      <Modalize ref={modeModalRef} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Mode</Text>
          <Text style={styles.modalSubtitle}>Switch between light and dark themes to match your preference</Text>
          <Pressable style={[styles.modeOption, mode === 'light' && styles.modeSelected]} onPress={() => handleThemeChange('light')}>
            <SunIcon />
            <Text style={styles.modeText}>Light Mode</Text>
          </Pressable>
          <Pressable style={[styles.modeOption, mode === 'dark' && styles.modeSelected]} onPress={() => handleThemeChange('dark')}>
            <MoonIcon />
            <Text style={styles.modeText}>Dark Mode</Text>
          </Pressable>
        </View>
      </Modalize>

      {/* LANGUAGE MODAL */}
      <Modalize ref={languageModalRef} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Language</Text>
          <Text style={styles.modalSubtitle}>Switch between languages to match your preference</Text>
          <Pressable style={[styles.modeOption, currentLanguage === 'en' && styles.modeSelected]} onPress={() => handleLanguageChange('en')}>
            <Text style={styles.modeText}>English</Text>
          </Pressable>
          <Pressable style={[styles.modeOption, currentLanguage === 'ar' && styles.modeSelected]} onPress={() => handleLanguageChange('ar')}>
            <Text style={styles.modeText}>العربية</Text>
          </Pressable>
        </View>
      </Modalize>

      {/* LOADING OVERLAY */}
      {(isSwitchingTheme || isSwitchingLanguage) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.appSecondaryColor} />
        </View>
      )}
    </>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    menuContainerWrapper: {
      paddingBottom: 16,
    },
    sectionLabel: {
      color: theme.appMainColor,
      fontWeight: '600',
      marginBottom: 8,
      fontSize: 16,
    },
    languageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    item: {
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    itemTitle: {
      fontSize: 16,
      color: theme.black,
    },
    itemSubtitle: {
      fontSize: 12.5,
      fontWeight: 'bold',
      backgroundColor: theme.selectedSecondaryColor,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.appSecondaryColor,
      paddingHorizontal: 8,
      paddingVertical: 2,
      color: theme.appSecondaryColor,
    },
    modalContent: {
      padding: 16,
      backgroundColor: theme.white,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.appMainColor,
      marginBottom: 8,
    },
    modalSubtitle: {
      fontSize: 14,
      color: theme.gray,
      marginBottom: 16,
    },
    modeOption: {
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.appMainColor,
      marginBottom: 10,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    modeSelected: {
      backgroundColor: theme.selectedSecondaryColor,
      borderColor: theme.appSecondaryColor,
    },
    modeText: {
      color: theme.black,
      fontSize: 16,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.white + 'EE',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
  });
