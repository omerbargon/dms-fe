import { CategoryIcon, SearchIcon, LeftArrowIcon, RightArrowIcon } from '../../assets/icons';
import { ITheme, useTheme } from '../../../src/theme';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { Category, categories } from '../../../src/mocks/category.data';

export const CategoriesScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredCategories = () => {
    if (!searchQuery) return categories;
    return categories.filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const filteredCategories = getFilteredCategories();

  const renderCategoryCard = (category: Category) => (
    <Pressable
      key={category.id}
      style={styles.categoryCard}
      onPress={() => {
        // Navigate to category products or handle selection
      }}
      android_ripple={{ color: '#f0f0f0' }}
    >
      <View style={styles.categoryIconContainer}>
        {category.icon ? <Image source={{ uri: category.icon }} style={styles.categoryIcon} resizeMode="contain" /> : <Image source={require('../../assets/images/dms-product.jpg')} style={[styles.categoryIcon, { borderRadius: 22 }]} resizeMode="cover" />}
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryCount}>{category.productsCount} items</Text>
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
            <CategoryIcon />
            <Text style={styles.headerTitle}>All Categories</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput style={styles.searchInput} placeholder="Search categories..." placeholderTextColor="#9CA3AF" value={searchQuery} onChangeText={setSearchQuery} />
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
        </Text>
      </View>

      {/* Categories List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredCategories.length > 0 ? (
          <View style={styles.categoriesList}>{filteredCategories.map(category => renderCategoryCard(category))}</View>
        ) : (
          <View style={styles.emptyState}>
            <CategoryIcon />
            <Text style={styles.emptyTitle}>No categories found</Text>
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
    categoriesList: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 10,
    },
    categoryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 14,
      marginBottom: 10,
    },
    categoryIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
      overflow: 'hidden',
    },
    categoryIcon: {
      width: 28,
      height: 28,
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
      marginBottom: 4,
    },
    categoryCount: {
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
