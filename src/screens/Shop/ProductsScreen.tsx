import { SearchIcon, LeftArrowIcon, FilterIcon, AddToCartIcon, LikeIcon, UnlikeIcon, CubeIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../../src/navigation/types';
import { Product, products } from '../../../src/mocks/product.data';
import { brands } from '../../../src/mocks/brand.data';
import { categories } from '../../../src/mocks/category.data';
import { CheckedIcon } from '../../assets/icons';

export const ProductsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
const navigation = useNavigation<AppNavigationProp>();

  const getFilteredProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (filterInStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    if (filterBrands.length > 0) {
      filtered = filtered.filter(p => filterBrands.includes(p.brandId));
    }

    if (filterCategories.length > 0) {
      filtered = filtered.filter(p => filterCategories.includes(p.categoryId));
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setFilterInStock(false);
    setFilterBrands([]);
    setFilterCategories([]);
  };

  const renderProductCard = (product: Product) => (
    <Pressable key={product.id} style={styles.productCard} onPress={() => navigation.navigate('ProductScreen', { product: product.id })} android_ripple={{ color: '#f0f0f0' }}>
      <View style={styles.productImageContainer}>
        {product.image ? <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={styles.productImage} resizeMode="cover" />}
        <Pressable style={styles.favoriteButton}>{product.isFavorite ? <LikeIcon /> : <UnlikeIcon />}</Pressable>
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}%</Text>
          </View>
        )}
      </View>
      <View style={styles.productContent}>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <View style={styles.productNameWrapper}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
        </View>
        <View style={styles.productPriceRow}>
          <View>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>}
          </View>
          <Pressable style={styles.cartBtn}>
            <AddToCartIcon />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  const renderFilterModal = () => (
    <Modal visible={showFilterModal} animationType="fade" transparent={true} onRequestClose={() => setShowFilterModal(false)}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={() => setShowFilterModal(false)} />
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Pressable onPress={() => setShowFilterModal(false)}>
              <Text style={styles.closeBtn}>✕</Text>
            </Pressable>
            <Text style={styles.filterTitle}>Filters</Text>
            <Pressable onPress={resetFilters}>
              <Text style={styles.resetBtn}>Reset</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.filterContent} showsVerticalScrollIndicator={false}>
            {/* Price Range */}
            <View style={styles.filterGroup}>
              <Text style={styles.groupTitle}>Price Range</Text>
              <View style={styles.priceDisplay}>
                <Text style={styles.priceValue}>${priceRange[0]}</Text>
                <Text style={styles.priceDash}>–</Text>
                <Text style={styles.priceValue}>${priceRange[1]}</Text>
              </View>
              <View style={styles.priceInputRow}>
                <TextInput style={styles.priceInputField} placeholder="Min" keyboardType="numeric" value={priceRange[0].toString()} onChangeText={text => setPriceRange([parseInt(text) || 0, priceRange[1]])} />
                <TextInput style={styles.priceInputField} placeholder="Max" keyboardType="numeric" value={priceRange[1].toString()} onChangeText={text => setPriceRange([priceRange[0], parseInt(text) || 5000])} />
              </View>
            </View>

            {/* Availability */}
            <View style={styles.filterGroup}>
              <Text style={styles.groupTitle}>Availability</Text>
              <Pressable style={styles.checkboxRow} onPress={() => setFilterInStock(!filterInStock)}>
                <View style={[styles.checkbox, filterInStock && styles.checkboxActive]}>
                  {filterInStock && (
                    <Text style={styles.checkmark}>
                      <CheckedIcon />
                    </Text>
                  )}
                </View>
                <Text style={styles.checkboxLabel}>In Stock Only</Text>
              </Pressable>
            </View>

            {/* Brands */}
            <View style={styles.filterGroup}>
              <Text style={styles.groupTitle}>Brands</Text>
              {brands.map(brand => (
                <Pressable
                  key={brand.id}
                  style={styles.checkboxRow}
                  onPress={() => {
                    if (filterBrands.includes(brand.id)) {
                      setFilterBrands(filterBrands.filter(b => b !== brand.id));
                    } else {
                      setFilterBrands([...filterBrands, brand.id]);
                    }
                  }}
                >
                  <View style={[styles.checkbox, filterBrands.includes(brand.id) && styles.checkboxActive]}>
                    {filterBrands.includes(brand.id) && (
                      <Text style={styles.checkmark}>
                        <CheckedIcon />
                      </Text>
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{brand.name}</Text>
                </Pressable>
              ))}
            </View>

            {/* Categories */}
            <View style={styles.filterGroup}>
              <Text style={styles.groupTitle}>Categories</Text>
              {categories.map(category => (
                <Pressable
                  key={category.id}
                  style={styles.checkboxRow}
                  onPress={() => {
                    if (filterCategories.includes(category.id)) {
                      setFilterCategories(filterCategories.filter(c => c !== category.id));
                    } else {
                      setFilterCategories([...filterCategories, category.id]);
                    }
                  }}
                >
                  <View style={[styles.checkbox, filterCategories.includes(category.id) && styles.checkboxActive]}>
                    {filterCategories.includes(category.id) && (
                      <Text style={styles.checkmark}>
                        <CheckedIcon />
                      </Text>
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{category.name}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View style={styles.filterFooter}>
            <Pressable style={styles.applyBtn} onPress={() => setShowFilterModal(false)}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTitleContainer}>
            <CubeIcon />
            <Text style={styles.headerTitle}>All Products</Text>
          </View>
        </View>

        <View style={styles.searchFilterContainer}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput style={styles.searchInput} placeholder="Search products..." placeholderTextColor="#9CA3AF" value={searchQuery} onChangeText={setSearchQuery} />
          </View>
          <Pressable style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
            <FilterIcon />
          </Pressable>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </Text>
      </View>

      {/* Products Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredProducts.length > 0 ? (
          <View style={styles.productsGrid}>{filteredProducts.map(product => renderProductCard(product))}</View>
        ) : (
          <View style={styles.emptyState}>
            <CubeIcon />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyMessage}>Try adjusting your search or filters to find what you're looking for</Text>
          </View>
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
      paddingTop: 8,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    headerTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.black,
    },
    searchFilterContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
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
    resultsHeader: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: theme.white,
    },
    resultsCount: {
      fontSize: 13,
      color: '#6B7280',
      fontWeight: '500',
    },
    content: {
      flex: 1,
    },
    productsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 12,
    },
    productCard: {
      width: '48%',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      overflow: 'hidden',
    },
    productImageContainer: {
      height: 140,
      position: 'relative',
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 30,
      height: 30,
      borderRadius: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    discountBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: theme.danger,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
      zIndex: 5,
    },
    discountText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '700',
    },
    productContent: {
      padding: 12,
    },
    productBrand: {
      fontSize: 10,
      color: '#9CA3AF',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: 3,
    },
    productNameWrapper: {
      minHeight: 40,
      marginBottom: 6,
      justifyContent: 'flex-start',
    },
    productName: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.black,
      lineHeight: 16,
    },
    productPriceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    productPrice: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.appSecondaryColor,
      marginBottom: 2,
    },
    originalPrice: {
      fontSize: 10.5,
      color: '#9CA3AF',
      textDecorationLine: 'line-through',
    },
    cartBtn: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.black,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyMessage: {
      fontSize: 14,
      color: '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBackdrop: {
      ...StyleSheet.absoluteFillObject,
    },
    filterContainer: {
      width: '90%',
      height: '80%',
      backgroundColor: 'white',
      borderRadius: 16,
      paddingVertical: 16,
    },
    filterHeader: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      paddingBottom: 16,
      marginBottom: 10,
    },
    closeBtn: {
      fontSize: 12,
      color: theme.placeholder,
      fontWeight: '900',
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.black,
    },
    resetBtn: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.appSecondaryColor,
    },
    filterContent: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    filterGroup: {
      marginBottom: 12,
    },
    groupTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 8,
    },
    priceDisplay: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      paddingVertical: 4,
    },
    priceValue: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    priceDash: {
      marginHorizontal: 6,
      fontSize: 14,
      color: '#D1D5DB',
    },
    priceInputRow: {
      flexDirection: 'row',
      gap: 8,
    },
    priceInputField: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 12,
      color: theme.black,
      backgroundColor: '#F9FAFB',
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    checkboxActive: {
      backgroundColor: theme.appMainColor,
      borderColor: theme.appMainColor,
    },
    checkmark: {
      fontSize: 11,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    checkboxLabel: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.black,
    },
    filterFooter: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    },
    applyBtn: {
      backgroundColor: theme.appMainColor,
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: 'center',
    },
    applyBtnText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
  });
