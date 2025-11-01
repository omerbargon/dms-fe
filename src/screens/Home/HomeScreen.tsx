import { CartIcon, CrownIcon, CubeIcon, DentistIcon, RightArrowIcon, SearchIcon, StarIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, FlatList, Image } from 'react-native';
import { categories, Category } from '../../../src/mocks/category.data';
import { Brand, brands } from '../../../src/mocks/brand.data';
import { Product, products } from '../../../src/mocks/product.data';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderBrand = ({ item, index }: { item: Brand; index: number }) => (
    <Pressable style={[styles.brandCard, index !== brands.length - 1 && { marginRight: 12 }]}>
      <View style={styles.brandLogoContainer}>
        {item.logo ? <Image source={{ uri: item.logo }} style={styles.brandLogo} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.productImage, { borderRadius: 30 }]} resizeMode="cover" />}
      </View>
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.brandProducts}>{item.productsCount}+</Text>
      </View>
    </Pressable>
  );

  const renderFeaturedProduct = ({ item, index }: { item: Product; index: number }) => (
    <Pressable style={[styles.featuredCard, index !== products.length - 1 && { marginRight: 12 }]} android_ripple={{ color: '#ddd' }}>
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
        <Text style={styles.productSubtitle}>{item.category}</Text>
        <Text style={styles.productTitle}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <Pressable style={styles.categoryCard}>
      <View style={styles.categoryLeft}>
        <View style={styles.categoryIconContainer}>
          {item.icon ? <Image source={{ uri: item.icon }} style={styles.categoryIcon} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.productImage, { borderRadius: 30 }]} resizeMode="cover" />}
        </View>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.productsCount}+</Text>
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
          <FlatList data={products} renderItem={renderFeaturedProduct} horizontal showsHorizontalScrollIndicator={false} />
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
