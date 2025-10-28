import { RightArrowIcon, CubeIcon, AddToCartIcon, FavoriteIcon, RecentlyViewedIcon, SearchIcon, FilterIcon, LeftArrowIcon, LikeIcon, UnlikeIcon, CategoryIcon, CheckedIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/navigation/types';

type ViewMode = 'brands' | 'categories' | 'products';

interface Brand {
  id: string;
  name: string;
  logo: string;
  productsCount: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  productsCount: number;
  brandId?: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  isFavorite: boolean;
  brandId: string;
  categoryId: string;
}

const brands: Brand[] = [
  {
    id: '1',
    name: '3M ESPE',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    productsCount: 240,
  },
  {
    id: '2',
    name: 'Dentsply Sirona',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop',
    productsCount: 180,
  },
  {
    id: '3',
    name: 'Ivoclar Vivadent',
    logo: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=200&h=200&fit=crop',
    productsCount: 150,
  },
  {
    id: '4',
    name: 'Colgate',
    logo: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop',
    productsCount: 320,
  },
  {
    id: '5',
    name: 'GC Corporation',
    logo: '',
    productsCount: 95,
  },
  {
    id: '6',
    name: 'Kerr Dental',
    logo: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=200&h=200&fit=crop',
    productsCount: 110,
  },
];

const categories: Category[] = [
  {
    id: '1',
    name: 'Restorative',
    icon: 'https://img.icons8.com/fluency/96/tooth.png',
    productsCount: 2400,
  },
  {
    id: '2',
    name: 'Endodontics',
    icon: 'https://img.icons8.com/fluency/96/stethoscope.png',
    productsCount: 1800,
  },
  {
    id: '3',
    name: 'Prosthodontics',
    icon: '',
    productsCount: 3100,
  },
  {
    id: '4',
    name: 'Orthodontics',
    icon: '',
    productsCount: 1500,
  },
  {
    id: '5',
    name: 'Surgery',
    icon: '',
    productsCount: 890,
  },
  {
    id: '6',
    name: 'Preventive',
    icon: 'https://img.icons8.com/fluency/96/shield.png',
    productsCount: 1200,
  },
];

const products: Product[] = [
  {
    id: '1',
    name: 'Filtek Supreme Ultra Universal Composite',
    brand: '3M ESPE',
    category: 'Restorative',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.9,
    reviews: 328,
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: true,
    brandId: '1',
    categoryId: '1',
  },
  {
    id: '2',
    name: 'ProTaper Universal Rotary Files',
    brand: 'Dentsply Sirona',
    category: 'Endodontics',
    price: 89.99,
    rating: 4.8,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: false,
    brandId: '2',
    categoryId: '2',
  },
  {
    id: '3',
    name: 'IPS e.max CAD Blocks',
    brand: 'Ivoclar Vivadent',
    category: 'Prosthodontics',
    price: 299.99,
    originalPrice: 349.99,
    discount: 14,
    rating: 4.9,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=400&h=400&fit=crop',
    inStock: false,
    isFavorite: true,
    brandId: '3',
    categoryId: '3',
  },
  {
    id: '4',
    name: 'Clarity Advanced Ceramic Brackets',
    brand: '3M ESPE',
    category: 'Orthodontics',
    price: 199.99,
    rating: 4.7,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: false,
    brandId: '1',
    categoryId: '4',
  },
  {
    id: '5',
    name: 'G-ænial Universal Injectable Composite',
    brand: 'GC Corporation',
    category: 'Restorative',
    price: 119.99,
    originalPrice: 139.99,
    discount: 14,
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: true,
    brandId: '5',
    categoryId: '1',
  },
  {
    id: '6',
    name: 'OptiBond FL Total-Etch Adhesive',
    brand: 'Kerr Dental',
    category: 'Restorative',
    price: 79.99,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: false,
    brandId: '6',
    categoryId: '1',
  },
];

export const ShopScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [viewMode, setViewMode] = useState<ViewMode>('brands');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const recentlyViewed: Product[] = products.slice(0, 3);
  const favorites = products.filter(p => p.isFavorite);

  const getBreadcrumb = () => {
    const crumbs = ['Shop'];
    if (selectedBrand) crumbs.push(selectedBrand.name);
    if (selectedCategory) crumbs.push(selectedCategory.name);
    return crumbs;
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setViewMode('categories');
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setViewMode('products');
  };

  const handleBack = () => {
    if (viewMode === 'products') {
      setSelectedCategory(null);
      setViewMode('categories');
    } else if (viewMode === 'categories') {
      setSelectedBrand(null);
      setViewMode('brands');
    }
  };

  const getFilteredProducts = () => {
    let filtered = products;

    if (selectedBrand) {
      filtered = filtered.filter(p => p.brandId === selectedBrand.id);
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory.id);
    }

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

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setFilterInStock(false);
    setFilterBrands([]);
    setFilterCategories([]);
  };

  const renderBrandCard = (brand: Brand) => (
    <Pressable key={brand.id} style={styles.brandCard} onPress={() => handleBrandSelect(brand)} android_ripple={{ color: '#f0f0f0' }}>
      <View style={[styles.brandLogoContainer]}>
        {brand.logo ? <Image source={{ uri: brand.logo }} style={styles.brandLogo} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.productImage, { borderRadius: 30 }]} resizeMode="cover" />}
      </View>
      <Text style={styles.brandName}>{brand.name}</Text>
      <Text style={styles.brandCount}>{brand.productsCount}+ items</Text>
    </Pressable>
  );

  const renderCategoryCard = (category: Category) => (
    <Pressable key={category.id} style={styles.categoryCard} onPress={() => handleCategorySelect(category)} android_ripple={{ color: '#f0f0f0' }}>
      <View style={styles.categoryIconContainer}>
        {category.icon ? <Image source={{ uri: category.icon }} style={styles.categoryIcon} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.productImage, { borderRadius: 30 }]} resizeMode="cover" />}
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryCount}>{category.productsCount} items</Text>
      </View>
      <RightArrowIcon />
    </Pressable>
  );

  const renderProductCard = (product: Product, isHorizontal = false) => (
    <Pressable onPress={() => navigation.navigate('ProductScreen', { product: product.id })} key={product.id} style={[styles.productCard, isHorizontal && styles.productCardHorizontal]} android_ripple={{ color: '#f0f0f0' }}>
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
              <Text style={styles.applyBtnText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <View style={[styles.headerTop, viewMode !== 'brands' && { marginBottom: 12 }]}>
          {viewMode !== 'brands' && (
            <Pressable onPress={handleBack} style={styles.backBtn}>
              <LeftArrowIcon />
            </Pressable>
          )}
          {viewMode !== 'brands' && (
            <View style={styles.breadcrumbNav}>
              {getBreadcrumb().map((crumb, idx) => (
                <View key={idx} style={styles.breadcrumbItem}>
                  <Text style={[styles.breadcrumbText, idx === getBreadcrumb().length - 1 && styles.breadcrumbActive]}>{crumb}</Text>
                  {idx < getBreadcrumb().length - 1 && <Text style={styles.separator}>/</Text>}
                </View>
              ))}
            </View>
          )}
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

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {viewMode === 'brands' && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <CubeIcon />

                  <Text style={styles.sectionTitle}>Browse Brands</Text>
                </View>
                <Pressable style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>View all </Text>
                  <RightArrowIcon />
                </Pressable>
              </View>
              <View style={styles.brandsGrid}>{brands.map(brand => renderBrandCard(brand))}</View>
            </View>
            {favorites.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <FavoriteIcon />
                    <Text style={styles.sectionTitle}>Favorite Products</Text>
                  </View>
                  <Pressable style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>View all </Text>
                    <RightArrowIcon />
                  </Pressable>
                </View>
                <FlatList data={favorites} renderItem={({ item }) => renderProductCard(item, true)} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList} scrollEventThrottle={16} />
              </View>
            )}

            {recentlyViewed.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <RecentlyViewedIcon />

                    <Text style={styles.sectionTitle}>Recently Viewed</Text>
                  </View>
                  <Pressable style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>View all </Text>
                    <RightArrowIcon />
                  </Pressable>
                </View>
                <FlatList data={recentlyViewed} renderItem={({ item }) => renderProductCard(item, true)} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList} scrollEventThrottle={16} />
              </View>
            )}
          </>
        )}

        {viewMode === 'categories' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <CategoryIcon />

                <Text style={styles.sectionTitle}>Select Category</Text>
              </View>
            </View>
            <View style={styles.categoryList}>{categories.map(category => renderCategoryCard(category))}</View>
          </View>
        )}

        {viewMode === 'products' && (
          <View style={styles.section}>
            <View style={styles.productsHeaderRow}>
              <Text style={styles.sectionTitle}>Products</Text>
              <Text style={styles.itemCount}>{getFilteredProducts().length} items</Text>
            </View>
            <View style={styles.productsGrid}>{getFilteredProducts().map(product => renderProductCard(product, false))}</View>
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
      marginTop: 6,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backBtn: {
      padding: 4,
      marginRight: 8,
    },
    breadcrumbNav: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    breadcrumbItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    breadcrumbText: {
      fontSize: 14,
      paddingHorizontal: 8,
      paddingVertical: 2,
      color: theme.appMainColor,
      borderRadius: 30,
      backgroundColor: theme.selectedMainColor,
      fontWeight: '700',
    },
    breadcrumbActive: {
      color: theme.appSecondaryColor,
      borderRadius: 30,
      backgroundColor: theme.selectedSecondaryColor,
      paddingHorizontal: 8,
      paddingVertical: 2,
      fontWeight: '700',
    },
    separator: {
      marginHorizontal: 6,
      color: '#D1D5DB',
    },
    searchFilterContainer: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 16,
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
    mainContent: {
      flex: 1,
    },
    section: {
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.black,
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    seeAllText: {
      fontSize: 15,
      fontWeight: '500',
      color: theme.appSecondaryColor,
    },
    horizontalList: {
      gap: 12,
    },
    brandsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    brandCard: {
      width: '30%',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandLogoContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    brandLogo: {
      width: '100%',
      borderRadius: 28,
      height: '100%',
    },
    brandName: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.black,
      textAlign: 'center',
      marginBottom: 3,
    },
    productNameWrapper: {
      minHeight: 40,
      marginBottom: 6,
      justifyContent: 'flex-start',
    },
    brandCount: {
      fontSize: 10,
      color: '#9CA3AF',
      textAlign: 'center',
    },
    categoryList: {
      gap: 10,
    },
    categoryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    categoryIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    categoryIcon: {
      width: 24,
      height: 24,
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 2,
    },
    categoryCount: {
      fontSize: 11,
      color: '#9CA3AF',
    },
    productsHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    itemCount: {
      fontSize: 13,
      color: '#9CA3AF',
      fontWeight: '500',
    },
    productsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
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
    productCardHorizontal: {
      width: 180,
      flexShrink: 1,
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
    productName: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.black,
      lineHeight: 16,
      marginBottom: 6,
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
    cartIcon: {
      width: 12.5,
      height: 12.5,
      tintColor: '#FFFFFF',
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
