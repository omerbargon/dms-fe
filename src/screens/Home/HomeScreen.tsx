import { CartIcon, CrownIcon, CubeIcon, DentistIcon, RightArrowIcon, SearchIcon, StarIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, FlatList, Image } from 'react-native';

const featuredProducts = [
  {
    id: '1',
    title: 'Premium Composite Kit',
    subtitle: 'Restorative Materials',
    discount: '25',
    price: '$149.99',
    originalPrice: '$199.99',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop&crop=center',
  },
  {
    id: '',
    title: 'Orthodontic Starter Pack',
    subtitle: 'Orthodontics',
    discount: '30',
    price: '$199.99',
    originalPrice: '$285.99',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop&crop=center',
  },
  {
    id: '3',
    title: 'Digital Impression Scanner',
    subtitle: 'Prosthodontics',
    discount: '15',
    price: '$2,299.99',
    originalPrice: '$2,699.99',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=400&h=300&fit=crop&crop=center',
  },
];

const categories = [
  {
    id: '1',
    name: 'Restorative',
    count: '2.4k products',
    icon: 'https://img.icons8.com/fluency/96/tooth.png',
  },
  {
    id: '2',
    name: 'Endodontics',
    count: '1.8k products',
    icon: 'https://img.icons8.com/fluency/96/stethoscope.png',
  },
  {
    id: '3',
    name: 'Prosthodontics',
    count: '3.1k products',
    icon: '',
  },
  {
    id: '4',
    name: 'Orthodontics',
    count: '1.5k products',
    icon: '',
  },
  {
    id: '5',
    name: 'Surgery',
    count: '890 products',
    icon: '',
  },
  {
    id: '6',
    name: 'Preventive',
    count: '1.2k products',
    icon: 'https://img.icons8.com/fluency/96/shield.png',
  },
];

const brands = [
  {
    id: '1',
    name: '3M ESPE',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    products: '240+ products',
  },
  {
    id: '2',
    name: 'Dentsply Sirona',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop',
    products: '180+ products',
  },
  {
    id: '3',
    name: 'Ivoclar Vivadent',
    logo: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=200&h=200&fit=crop',
    products: '150+ products',
  },
  {
    id: '4',
    name: 'Colgate',
    logo: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop',
    products: '320+ products',
  },
  {
    id: '5',
    name: 'GC Corporation',
    logo: '',
    products: '95+ products',
  },
  {
    id: '6',
    name: 'Kerr Dental',
    logo: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=200&h=200&fit=crop',
    products: '110+ products',
  },
];

export const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderBrand = ({ item, index }: any) => (
    <Pressable style={[styles.brandCard, index !== brands.length - 1 && { marginRight: 12 }]}>
      <View style={[styles.brandLogoContainer, { backgroundColor: item.bgColor }]}>
        {item.logo ? <Image source={{ uri: item.logo }} style={styles.brandLogo} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.productImage, { borderRadius: 30 }]} resizeMode="cover" />}
      </View>
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.brandProducts}>{item.products}</Text>
      </View>
    </Pressable>
  );

  const renderFeaturedProduct = ({ item, index }: any) => (
    <Pressable style={[styles.featuredCard, index !== featuredProducts.length - 1 && { marginRight: 12 }]} android_ripple={{ color: '#ddd' }}>
      <View style={styles.cardImageContainer}>
        {item.image ? <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={styles.productImage} resizeMode="cover" />}
        <View style={styles.cardOverlay}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
          <View style={styles.ratingContainer}>
            <StarIcon />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.productSubtitle}>{item.subtitle}</Text>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderCategory = ({ item }: any) => (
    <Pressable style={styles.categoryCard}>
      <View style={styles.categoryLeft}>
        <View style={styles.categoryIconContainer}>
          {item.icon ? <Image source={{ uri: item.icon }} style={styles.categoryIcon} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.productImage, { borderRadius: 30 }]} resizeMode="cover" />}
        </View>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.count}</Text>
        </View>
      </View>
      <RightArrowIcon />
    </Pressable>
  );

  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput style={styles.searchInput} placeholder="Search supplies, brands, categories..." placeholderTextColor="#9CA3AF" />
          </View>
        </View>

        {/* Promo */}
        <Pressable style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <View style={styles.promoLeft}>
              <View style={styles.promoTag}>
                <Text style={styles.promoTagText}>LIMITED TIME</Text>
              </View>
              <Text style={styles.promoTitle}>Premium Membership</Text>
              <Text style={styles.promoDescription}>Unlock exclusive discounts, VIP support & free shipping.</Text>
              <View style={styles.promoAction}>
                <Text style={styles.promoActionText}>Learn more</Text>
                <RightArrowIcon />
              </View>
            </View>
            <CrownIcon />
          </View>
        </Pressable>

        {/* Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <CartIcon focused />

              <Text style={styles.sectionTitle}>Featured Products</Text>
            </View>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View all </Text>
              <RightArrowIcon />
            </Pressable>
          </View>
          <FlatList data={featuredProducts} renderItem={renderFeaturedProduct} horizontal showsHorizontalScrollIndicator={false} />
        </View>

        {/* Premium Brands */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.brandIconWrapper}>
                <CubeIcon />
              </View>
              <Text style={styles.sectionTitle}>Premium Brands</Text>
            </View>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View all </Text>
              <RightArrowIcon />
            </Pressable>
          </View>
          <FlatList data={brands} renderItem={renderBrand} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandsList} />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <DentistIcon />

              <Text style={styles.sectionTitle}>Browse Categories</Text>
            </View>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View all </Text>
              <RightArrowIcon />
            </Pressable>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((item, index) => (
              <View key={item.id} style={[styles.categoryCardWrapper, index < categories.length - 2 && { marginBottom: 12 }]}>
                {renderCategory({ item })}
              </View>
            ))}
          </View>
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
      paddingHorizontal: 20,
    },
    searchSection: {
      marginTop: 6,
      marginBottom: 12,
    },
    searchBar: {
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
    section: {
      marginBottom: 24,
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
    featuredCard: {
      width: 210,
      borderRadius: 12,
      backgroundColor: theme.white,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    cardImageContainer: {
      height: 140,
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    cardOverlay: {
      position: 'absolute',
      top: 10,
      left: 10,
      right: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    discountBadge: {
      backgroundColor: theme.danger,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 16,
    },
    discountText: {
      color: theme.white,
      fontWeight: '700',
      fontSize: 12,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 8,
      gap: 8,
      borderRadius: 12,
    },
    ratingText: {
      fontSize: 12,
      fontWeight: '600',
    },
    cardContent: {
      padding: 14,
    },
    productSubtitle: {
      fontSize: 12,
      color: '#9CA3AF',
    },
    productTitle: {
      fontSize: 15,
      fontWeight: '700',
      marginVertical: 6,
      color: theme.black,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.appSecondaryColor,
    },
    originalPrice: {
      fontSize: 13,
      color: '#9CA3AF',
      textDecorationLine: 'line-through',
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryCardWrapper: {
      width: '48%',
    },
    categoryCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 12,
      height: 60,
    },
    categoryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    categoryIconContainer: {
      width: 34,
      height: 34,
      borderRadius: 19,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    categoryIcon: {
      width: 20,
      height: 20,
    },
    categoryTextContainer: {
      flex: 1,
    },
    categoryName: {
      fontSize: 12.5,
      fontWeight: '600',
      color: theme.black,
    },
    categoryCount: {
      fontSize: 11.5,
      color: '#9CA3AF',
      marginTop: 2,
    },
    promoBanner: {
      marginBottom: 20,
      marginTop: 2,
      borderRadius: 12,
      backgroundColor: theme.appMainColor,
      overflow: 'hidden',
    },
    promoContent: {
      flexDirection: 'row',
      padding: 20,
    },
    promoLeft: {
      flex: 1,
    },
    promoTag: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      alignSelf: 'flex-start',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginBottom: 8,
    },
    promoTagText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: '700',
    },
    promoTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700',
    },
    promoDescription: {
      color: '#fff',
      fontSize: 13,
      marginVertical: 8,
      fontStyle: 'italic',
    },
    promoAction: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    promoActionText: {
      color: theme.appSecondaryColor,
      fontWeight: '600',
      textDecorationLine: 'underline',
      fontSize: 14.5,
    },
    actionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    actionCardWrapper: {
      width: '48%',
      marginBottom: 12,
    },
    actionCard: {
      borderRadius: 12,
      backgroundColor: theme.white,
      padding: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.borderColor,
      height: 130,
      justifyContent: 'center',
    },
    actionIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    actionIcon: {
      width: 24,
      height: 24,
    },
    actionLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.black,
      textAlign: 'center',
    },
    brandsList: {
      paddingRight: 20,
    },
    brandCard: {
      width: 140,
      borderRadius: 16,
      backgroundColor: theme.white,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.borderColor,
      alignItems: 'center',
    },
    brandLogoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      overflow: 'hidden',
    },
    brandLogo: {
      width: '100%',
      height: '100%',
    },
    brandInfo: {
      alignItems: 'center',
      marginBottom: 8,
    },
    brandName: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.black,
      textAlign: 'center',
      marginBottom: 4,
    },
    brandProducts: {
      fontSize: 11.5,
      color: '#9CA3AF',
      fontWeight: '500',
    },
    brandIconWrapper: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    brandSectionIcon: {
      width: 24,
      height: 24,
    },
  });
