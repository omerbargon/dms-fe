import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../src/theme';
import { HomeIcon, OrdersIcon, ShopIcon, SettingsIcon, CartIcon } from '../assets/icons';
import { FAQsScreen } from '../screens/Settings/FAQsScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { PrivacyPolicyScreen } from '../screens/Settings/PrivacyPolicyScreen';
import { TermsAndConditionsScreen } from '../screens/Settings/TermsAndConditionsScreen';
import { CartScreen } from '../screens/Cart/CartScreen';
import { RootBottomTabStackParamList, RootStackParamList } from './types';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { ShopScreen } from '../screens/Shop/ShopScreen';
import { OrdersScreen } from '../screens/Orders/OrdersScreen';

const Tab = createBottomTabNavigator<RootBottomTabStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.white,
        },
        headerTitleStyle: {
          color: theme.black,
        },
        headerTintColor: theme.black,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: 'Home' }} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.white,
        },
        headerTitleStyle: {
          color: theme.black,
        },
        headerTintColor: theme.black,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerTitle: 'Settings' }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerBackVisible: true, headerTitle: 'Privacy Policy', headerBackButtonDisplayMode: 'minimal' }} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} options={{ headerTitle: 'Terms & Conditions', headerBackButtonDisplayMode: 'minimal' }} />
      <Stack.Screen name="FAQs" component={FAQsScreen} options={{ headerTitle: 'FAQs', headerBackButtonDisplayMode: 'minimal' }} />
    </Stack.Navigator>
  );
};

export const MainNavigator = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarStyle: {
          height: 72,
          paddingTop: 5,
          backgroundColor: theme.white,
          borderColor: theme.borderColor,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingTop: 5,
        },
        tabBarPosition: 'bottom',
        tabBarActiveTintColor: theme.appSecondaryColor,
        tabBarInactiveTintColor: theme.black,

        tabBarButton: props => (
          <Pressable android_ripple={{ color: 'transparent' }} style={props.style} onPress={props.onPress}>
            {props.children}
          </Pressable>
        ),
      }}
    >
      <Tab.Screen name="HomeTab" options={{ title: 'Home', headerShown: false, tabBarIcon: ({ focused }) => <HomeIcon focused={focused} /> }} component={HomeStack} />
      <Tab.Screen name="OrdersTab" options={{ title: 'Orders', headerTitle: 'Orders', tabBarIcon: ({ focused }) => <OrdersIcon focused={focused} /> }} component={OrdersScreen} />
      <Tab.Screen name="ShopTab" options={{ title: 'Shop', headerTitle: 'Shop', tabBarIcon: ({ focused }) => <ShopIcon focused={focused} /> }} component={ShopScreen} />
      <Tab.Screen name="CartTab" options={{ title: 'Cart', headerTitle: 'Cart', tabBarIcon: ({ focused }) => <CartIcon focused={focused} /> }} component={CartScreen} />
      <Tab.Screen name="SettingsTab" options={{ title: 'Settings', headerShown: false, tabBarIcon: ({ focused }) => <SettingsIcon focused={focused} /> }} component={SettingsStack} />
    </Tab.Navigator>
  );
};
