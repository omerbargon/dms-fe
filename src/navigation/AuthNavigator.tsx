import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardScreen } from '../screens/Auth/OnboardScreen';
import { SignUpScreen } from '../screens/Auth/SignUpScreen/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen';
import { AuthRootStackParamList } from './types';
import { SignInScreen } from '../screens/Auth/SignInScreen/SignInScreen';

const AuthStack = createNativeStackNavigator<AuthRootStackParamList>();

export const AuthNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<null | 'Onboard' | 'SignIn'>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      setInitialRoute(seen === 'true' ? 'SignIn' : 'Onboard');
    };
    checkOnboarding();
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <AuthStack.Screen name="Onboard" component={OnboardScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};
