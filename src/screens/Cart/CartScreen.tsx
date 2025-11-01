import React, { useMemo, useRef, useState } from 'react';
import { DoneIcon, EmptyIcon, FilterIcon, LeftArrowIcon, MasterCardIcon, MinusIcon, PayPalIcon, PlusIcon, SearchIcon, ShippingIcon, TrashIcon, VisaCardIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image, Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { addresses, CartItem, carts, CheckoutStep, DeliveryAddress, GroupBy, paymentMethods } from '../../../src/mocks/cart.data';

export const CartScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const groupModalRef = useRef<Modalize>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>(carts);

  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState<GroupBy>('category');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [selectedPayment, setSelectedPayment] = useState<string>('1');

  const handleOpenGroupModal = () => {
    groupModalRef.current?.open();
  };

  const handleCloseGroupModal = () => {
    groupModalRef.current?.close();
  };
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    return (calculateSubtotal() * appliedPromo.discount) / 100;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 500 ? 0 : 15.0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setCartItems(items => items.filter(item => item.id !== id)),
      },
    ]);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setAppliedPromo({ code: promoCode, discount: 20 });
      setPromoCode('');
      Alert.alert('Success', '20% discount applied!');
    } else if (promoCode.toLowerCase() === 'freeship') {
      setAppliedPromo({ code: promoCode, discount: 0 });
      setPromoCode('');
      Alert.alert('Success', 'Free shipping applied!');
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid promo code.');
    }
  };

  const getFilteredItems = () => {
    if (!searchQuery) return cartItems;
    return cartItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.brand.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getGroupedItems = () => {
    const filtered = getFilteredItems();
    if (groupBy === 'none') return { '': filtered };

    const grouped: { [key: string]: CartItem[] } = {};
    filtered.forEach(item => {
      const key = groupBy === 'category' ? item.category : item.brand;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    return grouped;
  };

  const handleCheckout = () => {
    const outOfStock = cartItems.filter(item => !item.inStock);
    if (outOfStock.length > 0) {
      Alert.alert('Out of Stock', 'Some items in your cart are out of stock. Please remove them to continue.');
      return;
    }
    setCheckoutStep('address');
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        {!item.inStock && <Text style={styles.outOfStockText}>Out of Stock</Text>}
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <Pressable style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
            <MinusIcon />
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
            <PlusIcon />
          </Pressable>
        </View>
        <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
        <Pressable style={styles.removeButton} onPress={() => removeItem(item.id)}>
          <TrashIcon />
          <Text style={{ color: theme.danger, fontWeight: '500' }}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderCartView = () => {
    const grouped = getGroupedItems();
    const isEmpty = Object.keys(grouped).length === 0 || Object.values(grouped).every(arr => arr.length === 0);

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isEmpty ? (
          <View style={styles.emptyCart}>
            <EmptyIcon />
            <Text style={styles.emptyTitle}>No result found</Text>
            <Text style={styles.emptyText}>Add some products to get started</Text>
          </View>
        ) : (
          <>
            {Object.entries(grouped).map(([group, items]) => (
              <View key={group} style={styles.cartGroup}>
                {groupBy !== 'none' && <Text style={styles.groupTitle}>{group}</Text>}
                {items.map(item => renderCartItem(item))}
              </View>
            ))}

            {/* Promo Code */}
            <View style={styles.promoSection}>
              <Text style={styles.promoTitle}>Have a promo code?</Text>
              <View style={styles.promoInputContainer}>
                <TextInput style={styles.promoInput} placeholder="Enter code" placeholderTextColor="#9CA3AF" value={promoCode} onChangeText={setPromoCode} autoCapitalize="characters" />
                <Pressable style={styles.applyButton} onPress={applyPromoCode}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </Pressable>
              </View>
              {appliedPromo && (
                <View style={styles.appliedPromo}>
                  <Text style={styles.appliedPromoText}>
                    ✓ {appliedPromo.code} applied ({appliedPromo.discount}% off)
                  </Text>
                  <Pressable onPress={() => setAppliedPromo(null)}>
                    <Text style={styles.removePromoText}>Remove</Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Order Summary */}
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</Text>
              </View>
              {appliedPromo && appliedPromo.discount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount ({appliedPromo.discount}%)</Text>
                  <Text style={[styles.summaryValue, styles.discountValue]}>-${calculateDiscount().toFixed(2)}</Text>
                </View>
              )}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={[styles.summaryValue, { color: theme.success }]}>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</Text>
              </View>
              {calculateSubtotal() < 500 && <Text style={styles.freeShippingNote}>Add ${(500 - calculateSubtotal()).toFixed(2)} more for free shipping</Text>}
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
              </View>
              <View style={styles.deliveryEstimate}>
                <ShippingIcon />
                <Text style={styles.deliveryText}>Estimated delivery: 3-5 business days</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    );
  };

  const renderAddressSelection = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.checkoutSection}>
        <Text style={styles.checkoutTitle}>Delivery Address</Text>
        {addresses.map(address => (
          <Pressable key={address.id} style={[styles.addressCard, selectedAddress === address.id && styles.selectedCard]} onPress={() => setSelectedAddress(address.id)}>
            <View style={styles.radioButton}>{selectedAddress === address.id && <View style={styles.radioButtonInner} />}</View>
            <View style={styles.addressInfo}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressName}>{address.name}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.addressText}>{address.address}</Text>
              <Text style={styles.addressPhone}>{address.phone}</Text>
            </View>
          </Pressable>
        ))}
        <Pressable style={styles.addNewButton}>
          <PlusIcon width={22} height={22} />
          <Text style={styles.addNewText}>Add New Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderPaymentSelection = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.checkoutSection}>
        <Text style={styles.checkoutTitle}>Payment Method</Text>
        {paymentMethods.map(method => (
          <Pressable key={method.id} style={[styles.paymentCard, selectedPayment === method.id && styles.selectedCard]} onPress={() => setSelectedPayment(method.id)}>
            <View style={styles.radioButton}>{selectedPayment === method.id && <View style={styles.radioButtonInner} />}</View>
            <View style={styles.paymentInfo}>
              <View style={styles.paymentHeader}>
                {method.type === 'visa-card' && <VisaCardIcon />}
                {method.type === 'master-card' && <MasterCardIcon />}
                {method.type === 'paypal' && <PayPalIcon />}
              </View>
            </View>
          </Pressable>
        ))}
        <Pressable style={styles.addNewButton}>
          <PlusIcon width={22} height={22} />
          <Text style={styles.addNewText}>Add New Payment Method</Text>
        </Pressable>
      </View>

      {/* Order Summary */}
      <View style={[styles.summarySection, { marginTop: 0 }]}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</Text>
        </View>
        {appliedPromo && appliedPromo.discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount ({appliedPromo.discount}%)</Text>
            <Text style={[styles.summaryValue, styles.discountValue]}>-${calculateDiscount().toFixed(2)}</Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={[styles.summaryValue, { color: theme.success }]}>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderConfirmation = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.confirmationContainer}>
        <DoneIcon />
        <Text style={styles.confirmationTitle}>Order Placed Successfully!</Text>
        <Text style={styles.confirmationText}>Your order #ORD-2024-{Math.floor(Math.random() * 9999)} has been confirmed</Text>

        <View style={styles.confirmationDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount</Text>
            <Text style={styles.detailValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={styles.detailValue}>3-5 business days</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Address</Text>
            <Text style={[styles.detailValue, { flex: 1, textAlign: 'right' }]} numberOfLines={2}>
              {addresses.find(a => a.id === selectedAddress)?.address}
            </Text>
          </View>
        </View>

        <Pressable style={styles.trackOrderButton}>
          <Text style={styles.trackOrderText}>Track Order</Text>
        </Pressable>

        <Pressable style={styles.continueshoppingButton} onPress={() => setCheckoutStep('cart')}>
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderGroupModal = () => (
    <Modalize ref={groupModalRef} adjustToContentHeight modalStyle={styles.modal} overlayStyle={styles.modalOverlay} handleStyle={styles.modalHandle} handlePosition="inside" closeSnapPointStraightEnabled={false} withHandle={false}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeaderContainer}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Group Items By</Text>
          <Text style={styles.modalSubtitle}>Select how you want to organize your cart items</Text>
        </View>

        <View style={styles.optionsContainer}>
          {(['none', 'category', 'brand'] as GroupBy[]).map(option => (
            <Pressable
              key={option}
              style={[styles.optionCard, groupBy === option && styles.optionSelected]}
              onPress={() => {
                setGroupBy(option);
                handleCloseGroupModal();
              }}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionIconContainer}>
                  <FilterIcon />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionText, groupBy === option && styles.selectedText]}>{option === 'none' ? 'No Grouping' : `By ${option.charAt(0).toUpperCase() + option.slice(1)}`}</Text>
                  <Text style={styles.optionDescription}>{option === 'none' ? 'Show all items together' : option === 'category' ? 'Group products by category' : 'Group products by brand'}</Text>
                </View>
              </View>
              {groupBy === option && <View style={styles.selectedIndicator} />}
            </Pressable>
          ))}
        </View>
      </View>
    </Modalize>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <View style={styles.searchFilterContainer}>
            <View style={styles.searchBar}>
              <SearchIcon />
              <TextInput style={styles.searchInput} placeholder="Search cart items..." placeholderTextColor="#9CA3AF" value={searchQuery} onChangeText={setSearchQuery} />
            </View>
            <Pressable style={styles.groupButton} onPress={handleOpenGroupModal}>
              <FilterIcon />
            </Pressable>
          </View>
        )}

        {/* Progress Steps */}
        {checkoutStep !== 'confirmation' && (
          <View style={styles.progressContainer}>
            {checkoutStep !== 'cart' && (
              <Pressable
                onPress={() => {
                  if (checkoutStep === 'payment') setCheckoutStep('address');
                  else if (checkoutStep === 'address') setCheckoutStep('cart');
                }}
                style={styles.backButton}
              >
                <LeftArrowIcon />
              </Pressable>
            )}
            <View style={styles.progressStep}>
              <View style={[styles.stepCircle, checkoutStep === 'cart' && styles.stepCircleActive]}>
                <Text style={[styles.stepNumber, checkoutStep === 'cart' && styles.stepNumberActive]}>1</Text>
              </View>
              <Text style={[styles.stepLabel, checkoutStep === 'cart' && styles.stepLabelActive]}>Cart</Text>
            </View>
            <View style={[styles.progressLine, ['address', 'payment'].includes(checkoutStep) && styles.progressLineActive]} />
            <View style={styles.progressStep}>
              <View style={[styles.stepCircle, checkoutStep === 'address' && styles.stepCircleActive]}>
                <Text style={[styles.stepNumber, checkoutStep === 'address' && styles.stepNumberActive]}>2</Text>
              </View>
              <Text style={[styles.stepLabel, checkoutStep === 'address' && styles.stepLabelActive]}>Address</Text>
            </View>
            <View style={[styles.progressLine, checkoutStep === 'payment' && styles.progressLineActive]} />
            <View style={styles.progressStep}>
              <View style={[styles.stepCircle, checkoutStep === 'payment' && styles.stepCircleActive]}>
                <Text style={[styles.stepNumber, checkoutStep === 'payment' && styles.stepNumberActive]}>3</Text>
              </View>
              <Text style={[styles.stepLabel, checkoutStep === 'payment' && styles.stepLabelActive]}>Payment</Text>
            </View>
          </View>
        )}
      </View>

      {/* Content */}
      {checkoutStep === 'cart' && renderCartView()}
      {checkoutStep === 'address' && renderAddressSelection()}
      {checkoutStep === 'payment' && renderPaymentSelection()}
      {checkoutStep === 'confirmation' && renderConfirmation()}

      {/* Footer Button */}
      {checkoutStep !== 'confirmation' && cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerTotal}>
            <View style={styles.rowTitle}>
              <Text style={styles.footerLabel}>Total </Text>

              {checkoutStep === 'cart' && cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              )}
            </View>

            <Text style={styles.footerValue}>${calculateTotal().toFixed(2)}</Text>
          </View>
          <Pressable
            style={styles.checkoutButton}
            onPress={() => {
              if (checkoutStep === 'cart') handleCheckout();
              else if (checkoutStep === 'address') setCheckoutStep('payment');
              else if (checkoutStep === 'payment') setCheckoutStep('confirmation');
            }}
          >
            <Text style={styles.checkoutButtonText}>{checkoutStep === 'cart' ? 'Proceed to Checkout' : checkoutStep === 'address' ? 'Continue to Payment' : 'Place Order'}</Text>
          </Pressable>
        </View>
      )}

      {renderGroupModal()}
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
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    cartBadge: {
      backgroundColor: theme.danger,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    cartBadgeText: {
      color: theme.white,
      fontSize: 12,
      fontWeight: '700',
    },
    searchFilterContainer: {
      flexDirection: 'row',
      gap: 10,
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
    groupButton: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.inputColor,
      borderWidth: 1,
      borderColor: theme.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: [{ translateY: -12 }],
      padding: 4,
      zIndex: 2,
    },
    progressStep: {
      alignItems: 'center',
    },
    stepCircle: {
      width: 42,
      height: 42,
      borderRadius: 16,
      backgroundColor: '#F3F4F6',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4,
    },
    stepCircleActive: {
      backgroundColor: theme.appSecondaryColor,
      borderColor: theme.appSecondaryColor,
    },
    stepNumber: {
      fontSize: 14,
      fontWeight: '700',
      color: '#9CA3AF',
    },
    stepNumberActive: {
      color: '#FFF',
    },
    stepLabel: {
      fontSize: 11,
      color: '#9CA3AF',
      fontWeight: '500',
    },
    stepLabelActive: {
      color: theme.appSecondaryColor,
      fontWeight: '700',
    },
    progressLine: {
      width: 40,
      height: 1.5,
      backgroundColor: '#E5E7EB',
      marginHorizontal: 8,
    },
    progressLineActive: {
      backgroundColor: theme.appSecondaryColor,
    },
    content: {
      flex: 1,
    },
    emptyCart: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 80,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.black,
      marginVertical: 8,
    },
    emptyText: {
      fontSize: 14,
      color: '#9CA3AF',
    },
    cartGroup: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    groupTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 12,
      paddingBottom: 8,
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 12,
      marginBottom: 12,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      backgroundColor: '#F3F4F6',
    },
    itemDetails: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'space-between',
    },
    itemBrand: {
      fontSize: 11,
      color: '#9CA3AF',
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    itemName: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.black,
      lineHeight: 18,
    },
    itemPrice: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.appSecondaryColor,
    },
    outOfStockText: {
      fontSize: 12,
      color: theme.danger,
      padding: 4,
      borderRadius: 20,
      textAlign: 'center',
      backgroundColor: theme.danger + '22',
      fontWeight: '600',
      marginTop: 4,
    },
    itemActions: {
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.appSecondaryColor + '11',
      borderRadius: 8,
      padding: 4,
    },
    quantityButton: {
      width: 28,
      height: 28,
      borderRadius: 6,
      backgroundColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityText: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.black,
      marginHorizontal: 8,
      minWidth: 20,
      textAlign: 'center',
    },
    itemTotal: {
      fontSize: 16,
      paddingTop: 12,
      fontWeight: '700',
      color: theme.success,
    },
    removeButton: {
      paddingHorizontal: 4,
      paddingVertical: 8,
      alignContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    removeIcon: {
      width: 18,
      height: 18,
      tintColor: theme.danger,
    },
    promoSection: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    promoTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 12,
    },
    promoInputContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    promoInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 14,
      color: theme.black,
      backgroundColor: theme.inputColor,
    },
    applyButton: {
      backgroundColor: theme.appMainColor,
      borderRadius: 10,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    applyButtonText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '700',
    },
    appliedPromo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      padding: 12,
      backgroundColor: '#DCFCE7',
      borderRadius: 8,
    },
    appliedPromoText: {
      fontSize: 13,
      color: '#16A34A',
      fontWeight: '600',
    },
    removePromoText: {
      fontSize: 13,
      color: theme.danger,
      fontWeight: '600',
    },
    summarySection: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
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
    freeShippingNote: {
      fontSize: 12,
      color: theme.appSecondaryColor,
      fontStyle: 'italic',
      marginBottom: 12,
    },
    totalRow: {
      paddingTop: 12,
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      marginBottom: 16,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
    },
    totalValue: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    deliveryEstimate: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.warning + '22',
      padding: 12,
      borderRadius: 8,
      gap: 8,
    },
    deliveryText: {
      fontSize: 13,
      color: theme.warning,
      fontWeight: '500',
    },
    checkoutSection: {
      padding: 20,
    },
    checkoutTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 16,
    },
    addressCard: {
      flexDirection: 'row',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 16,
      marginBottom: 12,
    },
    selectedCard: {
      borderColor: theme.appSecondaryColor,
      backgroundColor: theme.selectedSecondaryColor,
    },
    radioButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.appSecondaryColor,
    },
    addressInfo: {
      flex: 1,
    },
    addressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 8,
    },
    addressName: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
    },
    defaultBadge: {
      backgroundColor: theme.appSecondaryColor,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
    },
    cartTitleRow: {
      flexDirection: 'row',
      alignContent: 'center',
      gap: 6,
    },
    defaultText: {
      fontSize: 10,
      color: theme.white,
      fontWeight: '700',
    },
    addressText: {
      fontSize: 13,
      color: '#6B7280',
      lineHeight: 18,
      marginBottom: 6,
    },
    addressPhone: {
      fontSize: 13,
      color: '#9CA3AF',
    },
    paymentCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 12,
    },
    paymentInfo: {
      flex: 1,
    },
    paymentHeader: {
      flexDirection: 'row',
      gap: 12,
    },

    paymentName: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
    },
    rowTitle: {
      flexDirection: 'row',
      alignContent: 'center',
      gap: 6,
    },
    addNewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderStyle: 'dashed',
      padding: 16,
      gap: 8,
    },
    addIcon: {
      width: 20,
      height: 20,
      tintColor: theme.appSecondaryColor,
    },
    addNewText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.appSecondaryColor,
    },
    confirmationContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    confirmationTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.black,
      textAlign: 'center',
      marginVertical: 8,
    },
    confirmationText: {
      fontSize: 15,
      color: '#6B7280',
      textAlign: 'center',
      marginBottom: 32,
    },
    confirmationDetails: {
      width: '100%',
      backgroundColor: theme.white,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
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
      fontWeight: '500',
    },
    detailValue: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.black,
    },
    trackOrderButton: {
      width: '100%',
      backgroundColor: theme.appMainColor,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 12,
    },
    trackOrderText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
    },
    continueshoppingButton: {
      width: '100%',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      paddingVertical: 16,
      alignItems: 'center',
    },
    continueShoppingText: {
      color: theme.black,
      fontSize: 16,
      fontWeight: '600',
    },
    footer: {
      backgroundColor: theme.white,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    footerTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    footerLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#6B7280',
    },
    footerValue: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    checkoutButton: {
      flexDirection: 'row',
      backgroundColor: theme.appMainColor,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    checkoutButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
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
      shadowOffset: { width: 0, height: -10 },
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
      fontSize: 21,
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
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    optionIconContainer: {
      marginRight: 16,
      opacity: 0.7,
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
      fontSize: 13,
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
    },
  });
