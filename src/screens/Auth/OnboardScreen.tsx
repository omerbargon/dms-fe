import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '../../../src/common/components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthRootStackParamList } from '../../../src/navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITheme, useTheme } from '../../../src/theme';
import { LogoIcon } from '../../assets/icons';

export const OnboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRootStackParamList>>();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleGetStarted = useCallback(async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('SignIn');
  }, [navigation]);

  const handleNext = () => swiperRef.current?.scrollBy(1);

  const renderSlide = (title: string, description: string, Visual?: React.ReactNode) => (
    <View style={styles.slide}>
      <View style={styles.illustration}>{Visual || <LogoIcon />}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );

  const BubbleOverlay = () => {
    return (
      <>
        <View style={[styles.bubble, { top: 80, left: -60, width: 180, height: 180 }]} />
        <View style={[styles.bubble, { top: 250, right: -40, width: 120, height: 120 }]} />
        <View style={[styles.bubble, { bottom: 100, left: -20, width: 120, height: 120 }]} />
        <View style={[styles.bubble, { bottom: -120, right: -80, width: 260, height: 260 }]} />
      </>
    );
  };

  return (
    <LinearGradient colors={[theme.appSecondaryColor, theme.appMainColor]} style={styles.container}>
      {/* Bubble Overlay */}
      <BubbleOverlay />

      <Swiper ref={swiperRef} loop={false} showsPagination activeDotColor={theme.white} dotStyle={styles.dot} activeDotStyle={styles.activeDot} onIndexChanged={setActiveIndex} paginationStyle={styles.pagination}>
        {renderSlide('Welcome to DMS', 'The easiest way to order dental supplies and manage your clinic.')}
        {renderSlide('Shop Products', 'Browse top brands and order products in just a few taps.')}
        {renderSlide('Manage Your Clinic', 'Track orders, manage clinics, and access exclusive offers.')}
        {renderSlide('Premium Services', 'Upgrade your practice with premium features like bulk order & lists.')}
      </Swiper>

      <View style={styles.footer}>
        {activeIndex === 3 ? <Button title="Get Started" onPress={handleGetStarted} style={styles.fullButton} color={theme.appSecondaryColor} /> : <Button title="Continue" onPress={handleNext} style={styles.fullButton} color={theme.appSecondaryColor} />}
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
      bottom: 90,
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      gap: 12,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    fullButton: {
      borderRadius: 12,
    },
  });
