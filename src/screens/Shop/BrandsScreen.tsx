import { CubeIcon, SearchIcon, LeftArrowIcon, RightArrowIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/navigation/types';
import { Brand, brands } from '../../../src/mocks/brand.data';

export const BrandsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getFilteredBrands = () => {
    if (!searchQuery) return brands;
    return brands.filter(brand => brand.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const filteredBrands = getFilteredBrands();

  const renderBrandCard = (brand: Brand) => (
    <Pressable
      key={brand.id}
      style={styles.brandCard}
      onPress={() => {
        // Navigate to brand products or handle selection
      }}
      android_ripple={{ color: '#f0f0f0' }}
    >
      <View style={styles.brandLogoContainer}>
        {brand.logo ? <Image source={{ uri: brand.logo }} style={styles.brandLogo} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.brandLogo, { borderRadius: 40 }]} resizeMode="cover" />}
      </View>
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{brand.name}</Text>
        <Text style={styles.brandCount}>{brand.productsCount}+ items</Text>
      </View>
      <RightArrowIcon />
    </Pressable>
  );

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTitleContainer}>
            <CubeIcon />
            <Text style={styles.headerTitle}>All Brands</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput style={styles.searchInput} placeholder="Search brands..." placeholderTextColor="#9CA3AF" value={searchQuery} onChangeText={setSearchQuery} />
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredBrands.length} {filteredBrands.length === 1 ? 'brand' : 'brands'} found
        </Text>
      </View>

      {/* Brands List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredBrands.length > 0 ? (
          <View style={styles.brandsList}>{filteredBrands.map(brand => renderBrandCard(brand))}</View>
        ) : (
          <View style={styles.emptyState}>
            <CubeIcon />
            <Text style={styles.emptyTitle}>No brands found</Text>
            <Text style={styles.emptyMessage}>Try adjusting your search to find what you're looking for</Text>
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
    brandsList: {
      paddingHorizontal: 20,
      paddingBottom: 12,
      gap: 4,
    },
    brandCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 14,
      marginBottom: 10,
    },
    brandLogoContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
      overflow: 'hidden',
    },
    brandLogo: {
      width: '100%',
      height: '100%',
    },
    brandInfo: {
      flex: 1,
    },
    brandName: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 4,
    },
    brandCount: {
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
  });
