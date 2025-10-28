import { AddToCartIcon, LikeIcon, UnlikeIcon, ShareIcon, StarIcon, ShadeIcon, QuantityIcon, SpecificationsIcon, AddFavoriteIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface ProductVariant {
  id: string;
  color: string;
  colorName: string;
  image: string;
  inStock: boolean;
}

interface ProductDetails {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  inStock: boolean;
  isFavorite: boolean;
  variants: ProductVariant[];
}

const mockProduct: ProductDetails = {
  id: '1',
  name: 'Filtek Supreme Ultra Universal Composite',
  brand: '3M ESPE',
  category: 'Restorative',
  price: 149.99,
  originalPrice: 199.99,
  discount: 25,
  rating: 4.9,
  reviews: 328,
  description: 'Filtek Supreme Ultra Universal Restorative is a nanofilled resin composite that provides excellent esthetics and polish retention. It offers superior strength and handling characteristics for both anterior and posterior restorations.',
  features: [
    'Excellent esthetics with natural fluorescence',
    'Superior polish retention for long-lasting shine',
    'Low polymerization shrinkage for better marginal integrity',
    'Wide shade range for precise color matching',
    'Easy to sculpt and shape',
    'Contains no Bis-GMA for reduced sensitivity',
  ],
  specifications: [
    { label: 'Type', value: 'Universal Composite' },
    { label: 'Shade System', value: 'VITA' },
    { label: 'Filler Content', value: '78.5% by weight' },
    { label: 'Particle Size', value: '20 nanometers' },
    { label: 'Curing Time', value: '20 seconds at 1000 mW/cm²' },
    { label: 'Package', value: '4g Syringe' },
  ],
  inStock: true,
  isFavorite: false,
  variants: [
    {
      id: 'v1',
      color: '#E8DCC8',
      colorName: 'A2',
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      id: 'v2',
      color: '#F5EDE0',
      colorName: 'A1',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      id: 'v3',
      color: '#DFC9A8',
      colorName: 'A3',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop',
      inStock: false,
    },
    {
      id: 'v4',
      color: '#C8B89A',
      colorName: 'B2',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      id: 'v5',
      color: '#f05757af',
      colorName: 'B3',
      image: '',
      inStock: false,
    },
    {
      id: 'v6',
      color: '#5ff057ae',
      colorName: 'C2',
      image: '',
      inStock: true,
    },
    {
      id: 'v7',
      color: '#7357f0a8',
      colorName: 'B3',
      image: '',
      inStock: true,
    },
  ],
};

export const ProductScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();
  const [product] = useState<ProductDetails>(mockProduct);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to cart`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    console.log('Share product');
  };

  const handleVariantSelect = (variant: ProductVariant) => {
    if (variant.inStock) {
      setSelectedVariant(variant);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerActions}>
          <Pressable onPress={handleToggleFavorite} style={styles.headerActionBtn}>
            {isFavorite ? <LikeIcon width={28} height={28} /> : <AddFavoriteIcon />}
          </Pressable>
          <Pressable onPress={handleShare} style={styles.headerActionBtn}>
            <ShareIcon />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, isFavorite, styles]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          {selectedVariant.image ? <Image source={{ uri: selectedVariant.image }} style={styles.productImage} resizeMode="cover" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={styles.productImage} resizeMode="cover" />}

          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}

          {/* Rating positioned on top right of image */}
          <View style={styles.imageRatingContainer}>
            <View style={styles.imageRatingInner}>
              <StarIcon />
              <Text style={styles.imageRatingText}>{product.rating}</Text>
            </View>
          </View>

          {/* Stock Status positioned on bottom left of image */}
          <View style={styles.imageStockContainer}>
            <View style={[styles.imageStockDot, !selectedVariant.inStock && styles.outOfStock]} />
            <Text style={[styles.imageStockText, !selectedVariant.inStock && styles.outOfStockText]}>{selectedVariant.inStock ? 'In Stock' : 'Out of Stock'}</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Brand & Category */}
          <View style={styles.metaRow}>
            <Text style={styles.brandText}>{product.brand}</Text>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* Product Name */}
          <Text style={styles.productName}>{product.name}</Text>

          {/* Color Variants */}
          <View style={styles.variantsSection}>
            <View style={styles.rowTitleIcon}>
              <ShadeIcon />
              <Text style={styles.sectionTitle}>
                Shade: <Text style={styles.variantName}>{selectedVariant.colorName}</Text>
              </Text>
            </View>

            <View style={styles.variantsContainer}>
              {product.variants.map(variant => (
                <Pressable key={variant.id} onPress={() => handleVariantSelect(variant)} style={[styles.variantCircle, selectedVariant.id === variant.id && styles.variantSelected, !variant.inStock && styles.variantDisabled]}>
                  <View style={[styles.variantColor, { backgroundColor: variant.color }]} />
                  {!variant.inStock && <View style={styles.variantStrikethrough} />}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <View style={styles.rowTitleIcon}>
              <QuantityIcon />
              <Text style={styles.sectionTitle}>Quantity</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Pressable onPress={decrementQuantity} style={[styles.quantityBtn, quantity === 1 && styles.quantityBtnDisabled]} disabled={quantity === 1}>
                <Text style={styles.quantityBtnText}>−</Text>
              </Pressable>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <Pressable onPress={incrementQuantity} style={styles.quantityBtn}>
                <Text style={styles.quantityBtnText}>+</Text>
              </Pressable>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <Pressable onPress={() => setActiveTab('description')} style={[styles.tab, activeTab === 'description' && styles.tabActive]}>
              <View style={styles.rowTitleIcon}>
                {activeTab === 'description' && <SpecificationsIcon />}
                <Text style={[styles.tabText, activeTab === 'description' && styles.tabTextActive]}>Description</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => setActiveTab('specifications')} style={[styles.tab, activeTab === 'specifications' && styles.tabActive]}>
              <View style={styles.rowTitleIcon}>
                {activeTab === 'specifications' && <SpecificationsIcon />}
                <Text style={[styles.tabText, activeTab === 'specifications' && styles.tabTextActive]}>Specifications</Text>
              </View>
            </Pressable>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'description' ? (
              <View>
                <Text style={styles.descriptionText}>{product.description}</Text>

                <Text style={styles.featuresTitle}>Key Features</Text>
                {product.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.featureBullet} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.specificationsContainer}>
                {product.specifications.map((spec, index) => (
                  <View key={index} style={[styles.specificationRow, index % 2 === 0 && styles.specificationRowAlt]}>
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Enhanced Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {/* Bottom Section - Price & Add to Cart */}
        <View style={styles.bottomMainSection}>
          {/* Price Info */}
          <View style={styles.bottomPriceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.bottomPrice}>${(product.price * quantity).toFixed(2)}</Text>
              {product.originalPrice && <Text style={styles.bottomOriginalPrice}>${(product.originalPrice * quantity).toFixed(2)}</Text>}
            </View>
            <View style={styles.priceDetailsRow}>
              <Text style={styles.bottomPriceLabel}>Total Price</Text>
              {product.discount && (
                <View style={styles.bottomSavingsBadge}>
                  <Text style={styles.bottomSavingsText}>Save ${((product.originalPrice! - product.price) * quantity).toFixed(2)}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Add to Cart Button */}
          <Pressable onPress={handleAddToCart} style={[styles.addToCartBtn, !selectedVariant.inStock && styles.addToCartBtnDisabled]} disabled={!selectedVariant.inStock}>
            {selectedVariant.inStock && <AddToCartIcon />}
            <Text style={[styles.addToCartText, !selectedVariant.inStock && styles.addToCartBtnDisabledText]}>{selectedVariant.inStock ? 'Add to Cart' : 'Out of Stock'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingHorizontal: 16,
      paddingTop: 60,
      paddingBottom: 12,
      backgroundColor: 'transparent',
    },
    headerActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
    },
    headerActionBtn: {
      width: 42,
      height: 42,
      borderRadius: 18,
      backgroundColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 80,
    },
    imageContainer: {
      width: '100%',
      height: width * 0.45,
      backgroundColor: '#F9FAFB',
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    discountBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: theme.danger,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
    },
    discountText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },
    imageRatingContainer: {
      position: 'absolute',
      top: 16,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
    },
    imageRatingInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    imageRatingText: {
      fontSize: 13,
      fontWeight: '700',
      color: '#92400E',
    },
    imageStockContainer: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    imageStockDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#10B981',
    },
    outOfStock: {
      backgroundColor: '#EF4444',
    },
    imageStockText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#059669',
    },
    outOfStockText: {
      color: '#DC2626',
    },
    contentContainer: {
      padding: 16,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
      marginTop: 4,
    },
    brandText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.appMainColor,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#9CA3AF',
      textTransform: 'uppercase',
    },
    productName: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.black,
      lineHeight: 28,
      marginBottom: 16,
    },
    variantsSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 12,
    },
    variantName: {
      color: theme.danger,
    },
    variantsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    variantCircle: {
      marginRight: 8,
      marginBottom: 8,
      width: 44,
      height: 44,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    variantSelected: {
      borderColor: theme.appMainColor,
    },
    variantDisabled: {
      opacity: 0.4,
    },
    variantColor: {
      width: 34,
      height: 34,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    variantStrikethrough: {
      position: 'absolute',
      width: 50,
      height: 2,
      backgroundColor: '#9CA3AF',
      transform: [{ rotate: '45deg' }],
    },
    quantitySection: {
      marginBottom: 24,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    quantityBtn: {
      flex: 1,
      height: 38,
      borderRadius: 12,
      backgroundColor: theme.appMainColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityBtnDisabled: {
      backgroundColor: theme.borderColor,
    },
    quantityBtnText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    quantityDisplay: {
      flex: 2,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
    },
    tabsContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      marginHorizontal: -16,
      borderBottomColor: theme.borderColor,
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabActive: {
      borderBottomColor: theme.appSecondaryColor,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#9CA3AF',
    },
    tabTextActive: {
      color: theme.appSecondaryColor,
      fontWeight: '700',
    },
    tabContent: {
      paddingTop: 4,
    },
    descriptionText: {
      fontSize: 14,
      lineHeight: 22,
      color: '#6B7280',
      marginBottom: 20,
    },
    featuresTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 12,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    featureBullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.appSecondaryColor,
      marginRight: 12,
      marginTop: 7,
    },
    featureText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
      color: '#6B7280',
    },
    specificationsContainer: {
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    specificationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    specificationRowAlt: {
      backgroundColor: theme.selectedSecondaryColor,
    },
    specLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: '#6B7280',
      flex: 1,
    },
    specValue: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.black,
      flex: 1,
      textAlign: 'right',
    },
    rowTitleIcon: {
      flexDirection: 'row',
      alignContent: 'center',
      gap: 5,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.white,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 12,
    },
    bottomMainSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    bottomPriceSection: {
      flex: 1,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 3,
    },
    bottomPrice: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    bottomOriginalPrice: {
      fontSize: 16,
      color: '#9CA3AF',
      textDecorationLine: 'line-through',
      fontWeight: '500',
    },
    priceDetailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    bottomPriceLabel: {
      fontSize: 11,
      color: '#6B7280',
      fontWeight: '600',
    },
    bottomSavingsBadge: {
      backgroundColor: '#ECFDF5',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 20,
    },
    bottomSavingsText: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.success,
    },
    addToCartBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.appSecondaryColor,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      gap: 8,
      minWidth: 140,
      justifyContent: 'center',
    },
    addToCartBtnDisabled: {
      backgroundColor: theme.danger + '33',
      borderWidth: 0,
    },
    addToCartText: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    addToCartBtnDisabledText: {
      color: theme.danger + 'AA',
    },
  });
