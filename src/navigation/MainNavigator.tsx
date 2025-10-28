import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTheme } from '../../src/theme';
import { HomeIcon, OrdersIcon, ShopIcon, SettingsIcon, CartIcon, NotificationIcon } from '../assets/icons';
import { FAQsScreen } from '../screens/Settings/FAQsScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { PrivacyPolicyScreen } from '../screens/Settings/PrivacyPolicyScreen';
import { TermsAndConditionsScreen } from '../screens/Settings/TermsAndConditionsScreen';
import { CartScreen } from '../screens/Cart/CartScreen';
import { RootBottomTabStackParamList, RootStackParamList } from './types';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { ShopScreen } from '../screens/Shop/ShopScreen';
import { OrdersScreen } from '../screens/Orders/OrdersScreen';
import { OrderItemScreen } from '../screens/Orders/OrderItemScreen';
import { ProductScreen } from '../screens/Shop/ProductScreen';

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
        headerTitle: '',
        headerShadowVisible: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image source={require('../assets/images/dms-user.png')} style={{ width: 42, height: 42, borderRadius: 24, borderWidth: 1, borderColor: theme.borderColor }} />
              <Text style={{ fontSize: 16, fontWeight: '700', color: theme.black }}>Dr. Sarah Johnson</Text>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={() => console.log('Notifications pressed')}>
              <NotificationIcon />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const OrdersStack = () => {
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
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ headerTitle: 'Orders' }} />
      <Stack.Screen name="OrderItemScreen" component={OrderItemScreen} options={{ headerTitle: 'Order Details' }} />
    </Stack.Navigator>
  );
};

const ShopStack = () => {
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
      <Stack.Screen name="ShopScreen" component={ShopScreen} options={{ headerTitle: 'Shop' }} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerTitle: 'Product Details' }} />
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
        headerStyle: {
          backgroundColor: theme.white,
        },
        headerTitleStyle: {
          color: theme.black,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingTop: 5,
        },
        headerShadowVisible: false,
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
      <Tab.Screen name="OrdersTab" options={{ title: 'Orders', headerShown: false, tabBarIcon: ({ focused }) => <OrdersIcon focused={focused} /> }} component={OrdersStack} />
      <Tab.Screen name="ShopTab" options={{ title: 'Shop', headerShown: false, tabBarIcon: ({ focused }) => <ShopIcon focused={focused} /> }} component={ShopStack} />
      <Tab.Screen name="CartTab" options={{ title: 'Cart', headerTitle: 'Cart', tabBarIcon: ({ focused }) => <CartIcon focused={focused} /> }} component={CartScreen} />
      <Tab.Screen name="SettingsTab" options={{ title: 'Settings', headerShown: false, tabBarIcon: ({ focused }) => <SettingsIcon focused={focused} /> }} component={SettingsStack} />
    </Tab.Navigator>
  );
};
