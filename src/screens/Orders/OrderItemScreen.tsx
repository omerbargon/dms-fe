import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { DownloadIcon, RefreshIcon, SupportIcon } from '../../../src/assets/icons';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode?: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
}

type RootStackParamList = {
  OrderItemScreen: { order: Order };
  OrdersScreen: undefined;
};

type OrderItemScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OrderItemScreen'>;
type OrderItemScreenRouteProp = RouteProp<RootStackParamList, 'OrderItemScreen'>;

interface OrderItemScreenProps {
  navigation: OrderItemScreenNavigationProp;
  route: OrderItemScreenRouteProp;
}

export const OrderItemScreen = ({ navigation, route }: OrderItemScreenProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { order } = route.params;

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

  const handleDownloadInvoice = () => {
    // Implement download functionality here
    console.log('Downloading invoice for order:', order.orderNumber);
  };

  const handleGetSupport = () => {
    // Implement support functionality here
    console.log('Getting support for order:', order.orderNumber);
  };

  const handleReorder = () => {
    // Implement reorder functionality here
    console.log('Reordering:', order.orderNumber);
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Order Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Number</Text>
            <Text style={styles.detailValue}>{order.orderNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Date</Text>
            <Text style={styles.detailValue}>{order.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
              <Text style={[styles.statusText, { color: getStatusTextColor(order.status) }]}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text>
            </View>
          </View>
          {order.estimatedDelivery && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estimated Delivery</Text>
              <Text style={styles.detailValue}>{order.estimatedDelivery}</Text>
            </View>
          )}
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Items</Text>
          {order.items.map(item => (
            <View key={item.id} style={styles.detailItem}>
              <Image source={{ uri: item.image }} style={styles.detailItemImage} resizeMode="cover" />
              <View style={styles.detailItemInfo}>
                <Text style={styles.detailItemName}>{item.name}</Text>
                <Text style={styles.detailItemQuantity}>Quantity: {item.quantity}</Text>
              </View>
              <Text style={styles.detailItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${order.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</Text>
          </View>
          {order.discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount {order.promoCode && `(${order.promoCode})`}</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>-${order.discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>Delivery Address</Text>
          <Text style={styles.addressText}>{order.deliveryAddress}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={[styles.actionButton, styles.downloadButton]} onPress={handleDownloadInvoice}>
            <DownloadIcon />
            <Text style={[styles.actionButtonText, { color: '#fff' }]}>Download Invoice</Text>
          </Pressable>
          {['completed', 'cancelled'].includes(order.status) && (
            <Pressable style={[styles.actionButton, styles.primaryActionButton]} onPress={handleReorder}>
              <RefreshIcon />
              <Text style={[styles.actionButtonText, { color: '#fff' }]}>Reorder</Text>
            </Pressable>
          )}
          <Pressable style={styles.actionButton} onPress={handleGetSupport}>
            <SupportIcon />
            <Text style={styles.actionButtonText}>Get Support</Text>
          </Pressable>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
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
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.black,
    },
    downloadButton: {
      backgroundColor: theme.appSecondaryColor,
      borderColor: theme.appSecondaryColor,
    },

    downloadIcon: {
      width: 22,
      height: 22,
      tintColor: theme.appSecondaryColor,
    },
    content: {
      flex: 1,
      padding: 20,
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
      borderBottomColor: theme.borderColor,
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
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '700',
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
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
    actions: {
      marginTop: 8,
      marginBottom: 20,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.white,
      marginBottom: 12,
    },
    primaryActionButton: {
      backgroundColor: theme.appMainColor,
      borderColor: theme.appMainColor,
    },
    actionButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.black,
    },
  });
