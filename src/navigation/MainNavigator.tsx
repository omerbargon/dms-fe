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
import { NotificationsScreen } from '../screens/Notifications/NotificationsScreen';
import { NotificationSettingsScreen } from '../screens/Notifications/NotificationSettingsScreen';
import { BrandsScreen } from '../screens/Shop/BrandsScreen';
import { CategoriesScreen } from '../screens/Shop/CategoriesScreen';
import { ProductsScreen } from '../screens/Shop/ProductsScreen';

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
        headerBackVisible: true,
        headerTintColor: theme.black,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerBackVisible: false,
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image source={require('../assets/images/dms-user.png')} style={{ width: 42, height: 42, borderRadius: 24, borderWidth: 1, borderColor: theme.borderColor }} />
              <Text style={{ fontSize: 16, fontWeight: '700', color: theme.black }}>Dr. Sarah Johnson</Text>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('NotificationsScreen')}>
              <NotificationIcon />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerTitle: 'Notifications' }} />
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
        headerBackButtonDisplayMode: 'minimal',
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
        headerBackVisible: true,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="ShopScreen" component={ShopScreen} options={{ headerTitle: 'Shop' }} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerTitle: 'Product Details' }} />
      <Stack.Screen name="BrandsScreen" component={BrandsScreen} options={{ headerTitle: 'Brands' }} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ headerTitle: 'Categories' }} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{ headerTitle: 'Products' }} />
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
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: theme.black,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerTitle: 'Settings' }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerBackVisible: true, headerTitle: 'Privacy Policy', headerBackButtonDisplayMode: 'minimal' }} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} options={{ headerTitle: 'Terms & Conditions', headerBackButtonDisplayMode: 'minimal' }} />
      <Stack.Screen name="FAQs" component={FAQsScreen} options={{ headerTitle: 'FAQs', headerBackButtonDisplayMode: 'minimal' }} />
      <Stack.Screen name="NotificationSettingsScreen" component={NotificationSettingsScreen} options={{ headerTitle: 'Notification Settings' }} />
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
          height: 78,
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
        headerBackButtonDisplayMode: 'minimal',
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
