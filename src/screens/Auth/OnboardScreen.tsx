import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '../../../src/common/components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../../src/navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITheme, useTheme } from '../../../src/theme';
import { LogoIcon } from '../../assets/icons';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Welcome to DMS',
    description: 'The easiest way to order dental supplies and manage your clinic.',
  },
  {
    id: '2',
    title: 'Shop Products',
    description: 'Browse top brands and order products in just a few taps.',
  },
  {
    id: '3',
    title: 'Manage Your Clinic',
    description: 'Track orders, manage clinics, and access exclusive offers.',
  },
  {
    id: '4',
    title: 'Premium Services',
    description: 'Upgrade your practice with premium features like bulk order & lists.',
  },
];

const BubbleOverlay = React.memo(({ styles }: { styles: any }) => {
  return (
    <View pointerEvents="none">
      <View style={[styles.bubble, { top: 80, left: -60, width: 180, height: 180 }]} />
      <View style={[styles.bubble, { top: 250, right: -40, width: 120, height: 120 }]} />
      <View style={[styles.bubble, { bottom: 100, left: -20, width: 120, height: 120 }]} />
      <View style={[styles.bubble, { bottom: -120, right: -80, width: 260, height: 260 }]} />
    </View>
  );
});

export const OnboardScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleGetStarted = useCallback(async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('SignIn');
  }, [navigation]);

  const handleNext = useCallback(() => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  }, [activeIndex]);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderSlide = ({ item }: { item: (typeof SLIDES)[0] }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.illustration}>
          <LogoIcon />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {SLIDES.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient colors={[theme.appSecondaryColor, theme.appMainColor]} style={styles.container}>
      {/* ✅ STATIC BACKGROUND */}
      <BubbleOverlay styles={styles} />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={item => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        removeClippedSubviews={false}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={2}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {renderPagination()}

      <View style={styles.footer}>
        {activeIndex === SLIDES.length - 1 ? <Button title="Get Started" onPress={handleGetStarted} style={styles.fullButton} color={theme.appSecondaryColor} /> : <Button title="Continue" onPress={handleNext} style={styles.fullButton} color={theme.appSecondaryColor} />}
      </View>
    </LinearGradient>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bubble: {
      position: 'absolute',
      borderRadius: 9999,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      zIndex: 0,
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      zIndex: 1,
    },
    illustration: {
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.white,
      textAlign: 'center',
      marginBottom: 12,
    },
    text: {
      fontSize: 16,
      color: 'rgba(255,255,255,0.85)',
      textAlign: 'center',
      lineHeight: 22,
      paddingHorizontal: 12,
    },
    pagination: {
      position: 'absolute',
      bottom: 110,
      flexDirection: 'row',
      alignSelf: 'center',
    },
    dot: {
      width: 20,
      height: 4,
      borderRadius: 2,
      marginHorizontal: 3,
      backgroundColor: 'rgba(255,255,255,0.3)',
    },
    activeDot: {
      backgroundColor: theme.white,
      width: 28,
      height: 4,
      borderRadius: 2,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      width: '100%',
      paddingHorizontal: 20,
    },
    fullButton: {
      borderRadius: 12,
    },
  });
