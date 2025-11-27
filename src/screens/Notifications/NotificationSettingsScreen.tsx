import { NotificationIcon, RightArrowIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from 'react-native';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  type: 'toggle';
}

interface NotificationOption {
  id: string;
  title: string;
  description: string;
  type: 'navigation';
}

export const NotificationSettingsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Push Notifications',
      description: 'Receive notifications on your device',
      enabled: true,
      type: 'toggle',
    },
    {
      id: '2',
      title: 'Email Notifications',
      description: 'Get updates via email',
      enabled: true,
      type: 'toggle',
    },
    {
      id: '3',
      title: 'Order Updates',
      description: 'Notifications about order status changes',
      enabled: true,
      type: 'toggle',
    },
    {
      id: '4',
      title: 'Promotions & Offers',
      description: 'Special deals and discount alerts',
      enabled: true,
      type: 'toggle',
    },
    {
      id: '5',
      title: 'Product Updates',
      description: 'New products and restocks',
      enabled: false,
      type: 'toggle',
    },
    {
      id: '6',
      title: 'Account Activity',
      description: 'Security and account changes',
      enabled: true,
      type: 'toggle',
    },
    {
      id: '7',
      title: 'Newsletter',
      description: 'Weekly updates and tips',
      enabled: false,
      type: 'toggle',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prevSettings => prevSettings.map(setting => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)));
  };

  const renderToggleSetting = (item: NotificationSetting) => (
    <View key={item.id} style={styles.settingCard}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
      </View>
      <Switch value={item.enabled} onValueChange={() => toggleSetting(item.id)} trackColor={{ false: '#D1D5DB', true: theme.appMainColor }} thumbColor={item.enabled ? theme.white : '#F3F4F6'}  />
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconContainer}>
            <NotificationIcon />
          </View>
          <Text style={styles.infoText}>Manage how and when you receive notifications from our app</Text>
        </View>

        {/* Notification Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <View style={styles.settingsContainer}>{settings.map(setting => renderToggleSetting(setting))}</View>
        </View>

        {/* Clear All Button */}
        <View style={styles.section}>
          <Pressable style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All Notifications</Text>
          </Pressable>
          <Text style={styles.clearButtonHint}>This will permanently delete all your notifications</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.white,
    },
    infoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.selectedSecondaryColor,
      borderRadius: 12,
      padding: 14,
      marginHorizontal: 20,
      marginTop: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    infoIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.selectedSecondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      color: theme.black,
      lineHeight: 18,
    },
    section: {
      marginBottom: 24,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 12,
    },
    settingsContainer: {
      borderRadius: 12,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.borderColor,
      overflow: 'hidden',
    },
    settingCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    settingLeft: {
      flex: 1,
      marginRight: 12,
    },
    settingTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.black,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 12,
      color: '#6B7280',
      lineHeight: 16,
    },
    optionsContainer: {
      borderRadius: 12,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.borderColor,
      overflow: 'hidden',
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    optionLeft: {
      flex: 1,
      marginRight: 12,
    },
    optionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.black,
      marginBottom: 2,
    },
    optionDescription: {
      fontSize: 12,
      color: '#6B7280',
    },
    clearButton: {
      backgroundColor: '#FEE2E2',
      borderRadius: 12,
      padding: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FECACA',
    },
    clearButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#DC2626',
    },
    clearButtonHint: {
      fontSize: 12,
      color: '#9CA3AF',
      textAlign: 'center',
      marginTop: 8,
    },
  });
