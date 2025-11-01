import { EmptyIcon, FilterIcon, RefreshIcon, RightArrowIcon, SearchIcon } from '../../assets/icons';
import { Modalize } from 'react-native-modalize';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Order, orders, OrderStatus } from '../../../src/mocks/order.data';

interface OrdersScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OrdersScreen'>;
}

export const OrdersScreen = ({ navigation }: OrdersScreenProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const filterModalRef = useRef<Modalize>(null);

  const handleOpenFilterModal = () => filterModalRef.current?.open();
  const handleCloseFilterModal = () => filterModalRef.current?.close();

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return '#FEF3C7';
      case 'processing':
        return '#DBEAFE';
      case 'shipped':
        return '#E0E7FF';
      case 'delivered':
        return '#DCFCE7';
      case 'completed':
        return '#F3F4F6';
      case 'cancelled':
        return '#FEE2E2';
      default:
        return '#F3F4F6';
    }
  };

  const getStatusTextColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return '#D97706';
      case 'processing':
        return '#2563EB';
      case 'shipped':
        return '#4F46E5';
      case 'delivered':
        return '#16A34A';
      case 'completed':
        return '#6B7280';
      case 'cancelled':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const activeOrders = orders.filter(order => ['pending', 'processing', 'shipped', 'delivered'].includes(order.status));

  const pastOrders = orders.filter(order => ['completed', 'cancelled'].includes(order.status));

  const displayOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const filteredOrders = displayOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderOrderCard = (order: Order) => (
    <Pressable key={order.id} style={styles.orderCard} onPress={() => navigation.navigate('OrderItemScreen', { order })} android_ripple={{ color: '#ddd' }}>
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={[styles.statusText, { color: getStatusTextColor(order.status) }]}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {order.items.map((item, index) => (
          <View key={item.id || index} style={styles.orderItem}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={styles.itemImage} resizeMode="cover" />}
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>
        <Pressable style={styles.viewDetailsButton} onPress={() => navigation.navigate('OrderItemScreen', { order })}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <RightArrowIcon />
        </Pressable>
      </View>

      {activeTab === 'past' && (
        <Pressable style={styles.reorderButton}>
          <RefreshIcon />
          <Text style={styles.reorderText}>Reorder</Text>
        </Pressable>
      )}
    </Pressable>
  );

  const renderFilterModal = () => (
    <Modalize ref={filterModalRef} adjustToContentHeight modalStyle={styles.modal} overlayStyle={styles.modalOverlay} handleStyle={styles.modalHandle} handlePosition="inside" closeSnapPointStraightEnabled={false} withHandle={false}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeaderContainer}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Filter by Status</Text>
          <Text style={styles.modalSubtitle}>Select order status to filter results</Text>
        </View>

        <View style={styles.optionsContainer}>
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'].map(status => (
            <Pressable
              key={status}
              style={[styles.optionCard, filterStatus === status && styles.optionSelected]}
              onPress={() => {
                setFilterStatus(status as OrderStatus | 'all');
                handleCloseFilterModal();
              }}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionText, filterStatus === status && styles.selectedText]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
                </View>
              </View>
              {filterStatus === status && <View style={styles.selectedIndicator} />}
            </Pressable>
          ))}
        </View>
      </View>
    </Modalize>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput style={styles.searchInput} placeholder="Search orders or products..." placeholderTextColor="#9CA3AF" value={searchQuery} onChangeText={setSearchQuery} />
          </View>
          <Pressable style={styles.filterButton} onPress={handleOpenFilterModal}>
            <FilterIcon />
          </Pressable>
        </View>

        <View style={styles.tabContainer}>
          <Pressable style={[styles.tab, activeTab === 'active' && styles.activeTab]} onPress={() => setActiveTab('active')}>
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active Orders</Text>
            <View style={[styles.badge, activeTab === 'active' && styles.activeBadge]}>
              <Text style={[styles.badgeText, activeTab === 'active' && styles.activeBadgeText]}>{activeOrders.length}</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.tab, activeTab === 'past' && styles.activeTab]} onPress={() => setActiveTab('past')}>
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past Orders</Text>
            <View style={[styles.badge, activeTab === 'past' && styles.activeBadge]}>
              <Text style={[styles.badgeText, activeTab === 'past' && styles.activeBadgeText]}>{pastOrders.length}</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <EmptyIcon />
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptyText}>{searchQuery ? 'Try adjusting your search' : `You don't have any ${activeTab} orders yet`}</Text>
          </View>
        ) : (
          filteredOrders.map(order => renderOrderCard(order))
        )}
      </ScrollView>

      {renderFilterModal()}
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
      backgroundColor: theme.white,
      paddingHorizontal: 20,
      paddingTop: 6,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    searchFilterContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 12,
    },
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.inputColor,
      borderRadius: 12,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      paddingLeft: 12,
      paddingVertical: 12,
      color: '#111827',
    },
    filterButton: {
      width: 46,
      height: 46,
      borderRadius: 12,
      backgroundColor: theme.inputColor,
      borderWidth: 1,
      borderColor: theme.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
    },

    tabContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 12,
    },
    tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.borderColor,
      gap: 6,
    },
    activeTab: {
      backgroundColor: theme.appSecondaryColor,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.black,
    },
    activeTabText: {
      color: theme.white,
    },
    badge: {
      backgroundColor: theme.appMainColor,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
    },
    activeBadge: {
      backgroundColor: 'rgba(255,255,240,0.6)',
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '700',
      color: '#fff',
    },
    activeBadgeText: {
      color: theme.appSecondaryColor,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 0,
      paddingBottom: 24,
    },
    orderCard: {
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      marginTop: 16,
      marginBottom: 16,
      overflow: 'hidden',
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    orderHeaderLeft: {
      flex: 1,
    },
    orderNumber: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 4,
    },
    orderDate: {
      fontSize: 13,
      color: '#9CA3AF',
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '700',
    },
    orderItems: {
      padding: 16,
    },
    orderItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    itemImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#F3F4F6',
    },
    itemDetails: {
      flex: 1,
      marginLeft: 12,
    },
    itemName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.black,
      marginBottom: 4,
    },
    itemQuantity: {
      fontSize: 12,
      color: '#9CA3AF',
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.black,
    },
    orderFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.white,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    totalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },

    totalAmount: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    viewDetailsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    viewDetailsText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.appSecondaryColor,
    },
    reorderButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: 14,
      backgroundColor: theme.appSecondaryColor,
    },
    reorderText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#FFF',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.black,
      marginVertical: 8,
    },
    emptyText: {
      fontSize: 14,
      color: '#9CA3AF',
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.white,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    backButton: {
      padding: 4,
    },
    backIcon: {
      width: 24,
      height: 24,
      tintColor: theme.black,
    },
    modalTitle: {
      fontSize: 21,
      fontWeight: '800',
      color: theme.black,
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    downloadButton: {
      padding: 4,
    },
    downloadIcon: {
      width: 22,
      height: 22,
      tintColor: theme.appSecondaryColor,
    },
    modalContent: {
      flex: 1,
    },
    detailSection: {
      marginBottom: 24,
    },
    detailSectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 12,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    detailLabel: {
      fontSize: 14,
      color: '#6B7280',
    },
    detailValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.black,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    detailItemImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      backgroundColor: '#F3F4F6',
    },
    detailItemInfo: {
      flex: 1,
      marginLeft: 12,
    },
    detailItemName: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.black,
      marginBottom: 4,
    },
    detailItemQuantity: {
      fontSize: 13,
      color: '#9CA3AF',
    },
    detailItemPrice: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    summaryLabel: {
      fontSize: 14,
      color: '#6B7280',
    },
    summaryValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.black,
    },
    discountValue: {
      color: theme.appSecondaryColor,
    },
    totalRow: {
      paddingTop: 12,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    addressText: {
      fontSize: 14,
      lineHeight: 20,
      color: '#6B7280',
    },
    modalActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
      marginBottom: 20,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.white,
    },
    primaryActionButton: {
      backgroundColor: theme.appMainColor,
      borderColor: theme.appMainColor,
    },
    actionButtonIcon: {
      width: 18,
      height: 18,
      tintColor: theme.black,
    },
    actionButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.black,
    },
    modal: {
      backgroundColor: theme.white,
    },
    modalOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    },
    modalSubtitle: {
      fontSize: 13,
      color: theme.gray,
      opacity: 0.8,
      textAlign: 'center',
    },
    optionsContainer: {
      padding: 20,
      gap: 8,
    },
    optionCard: {
      borderRadius: 12,
      borderWidth: 1,
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
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.black,
    },
    selectedText: {
      color: theme.appSecondaryColor,
      fontWeight: '700',
    },
    selectedIndicator: {
      position: 'absolute',
      top: 18,
      right: 18,
      width: 10,
      height: 10,
      borderRadius: 12,
      backgroundColor: theme.appSecondaryColor,
    },
  });
