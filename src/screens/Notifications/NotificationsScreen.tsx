import { NotificationIcon, RightArrowIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, Platform } from 'react-native';
import { AppNotification, notifications } from '../../../src/mocks/notifications';

interface FilterTab {
  id: string;
  label: string;
  type: 'all' | 'order' | 'promotion' | 'account' | 'product';
}

const filterTabs: FilterTab[] = [
  { id: '1', label: 'All', type: 'all' },
  { id: '2', label: 'Orders', type: 'order' },
  { id: '3', label: 'Promotions', type: 'promotion' },
  { id: '4', label: 'Account', type: 'account' },
  { id: '5', label: 'Products', type: 'product' },
];

export const NotificationsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    return notification.type === selectedFilter;
  });

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'order':
        return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
      case 'promotion':
        return { backgroundColor: '#FCE7F3', color: '#BE185D' };
      case 'account':
        return { backgroundColor: '#E0E7FF', color: '#4338CA' };
      case 'product':
        return { backgroundColor: '#FEF3C7', color: '#D97706' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#6B7280' };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order':
        return 'Order';
      case 'promotion':
        return 'Promo';
      case 'account':
        return 'Account';
      case 'product':
        return 'Product';
      default:
        return 'Info';
    }
  };

  const renderFilterTab = ({ item }: { item: FilterTab }) => (
    <Pressable style={[styles.filterTab, selectedFilter === item.type && styles.filterTabActive]} onPress={() => setSelectedFilter(item.type)}>
      <Text style={[styles.filterTabText, selectedFilter === item.type && styles.filterTabTextActive]}>{item.label}</Text>
    </Pressable>
  );

  const renderNotification = ({ item }: { item: AppNotification }) => {
    const badgeStyle = getTypeBadgeStyle(item.type);

    return (
      <Pressable style={[styles.notificationCard, !item.isRead && styles.notificationCardUnread]}>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <View style={[styles.typeBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
              <Text style={[styles.typeBadgeText, { color: badgeStyle.color }]}>{getTypeLabel(item.type)}</Text>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notificationTitle}>{item.description}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <RightArrowIcon />
      </Pressable>
    );
  };

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount} new</Text>
            </View>
          )}
          <Pressable style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </Pressable>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterSection}>
        <FlatList data={filterTabs} renderItem={renderFilterTab} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList} />
      </View>

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.notificationsList}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => {
            const isLast = index === filteredNotifications.length - 1;
            const bottomSpace = Platform.OS === 'ios' ? 16 : 36;

            return (
              <View key={notification.id} style={[styles.notificationWrapper, isLast && { marginBottom: bottomSpace }]}>
                {renderNotification({ item: notification })}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <NotificationIcon />
            </View>
            <Text style={styles.emptyStateTitle}>No notifications</Text>
            <Text style={styles.emptyStateMessage}>You don&apos;t have any {selectedFilter !== 'all' ? selectedFilter : ''} notifications yet.</Text>
          </View>
        )}
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
    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    unreadBadge: {
      backgroundColor: theme.danger,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    unreadBadgeText: {
      color: theme.white,
      fontSize: 12,
      fontWeight: '700',
    },
    markAllButton: {
      alignSelf: 'flex-start',
    },
    markAllText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.appSecondaryColor,
    },
    filterSection: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    filterList: {
      paddingHorizontal: 20,
    },
    filterTab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.inputColor,
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    filterTabActive: {
      backgroundColor: theme.appSecondaryColor,
      borderColor: theme.appSecondaryColor,
    },
    filterTabText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#6B7280',
    },
    filterTabTextActive: {
      color: theme.white,
    },
    notificationsList: {
      flex: 1,
      paddingVertical: 16,
    },
    notificationWrapper: {
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.white,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    notificationCardUnread: {
      backgroundColor: theme.selectedSecondaryColor,
      borderColor: theme.appSecondaryColor,
      borderWidth: 1,
    },
    notificationContent: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    typeBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
      marginRight: 8,
    },
    typeBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.danger,
    },
    notificationTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 3,
      lineHeight: 18,
    },
    notificationMessage: {
      fontSize: 12.5,
      color: '#6B7280',
      marginBottom: 4,
      lineHeight: 17,
    },
    notificationTime: {
      fontSize: 12,
      color: '#9CA3AF',
      fontWeight: '500',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      paddingHorizontal: 40,
    },
    emptyIconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 8,
    },
    emptyStateMessage: {
      fontSize: 14,
      color: '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
    },
  });
