import { Order } from '../mocks/order.data';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  FAQs: undefined;
  OrdersScreen: undefined;
  OrderItemScreen: { order: Order };
  ShopScreen: undefined;
  ProductScreen: { product: string };
  NotificationsScreen: undefined;
  NotificationSettingsScreen: undefined;
  CategoriesScreen: undefined;
  BrandsScreen: undefined;
  ProductsScreen: undefined;
};

export type RootBottomTabStackParamList = {
  //BOTTOM TABS
  HomeTab: {
    screen: keyof RootStackParamList;
    params?: any;
  };
  ShopTab: {
    screen: keyof RootStackParamList;
    params?: any;
  };
  OrdersTab: {
    screen: keyof RootStackParamList;
    params?: any;
  };
  CartTab: {
    screen: keyof RootStackParamList;
    params?: any;
  };
  SettingsTab: {
    screen: keyof RootStackParamList;
    params?: any;
  };
};

export type AuthRootStackParamList = {
  //AUTH STACK
  Onboard: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type AppNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList & AuthRootStackParamList>,
  BottomTabNavigationProp<RootBottomTabStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootStackParamList,
        AuthRootStackParamList,
        RootBottomTabStackParamList {}
  }
}
