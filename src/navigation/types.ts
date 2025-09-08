export type RootStackParamList = {
  // HOME STACK
  HomeScreen: undefined;
  // Settings STACK
  SettingsScreen: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  FAQs: undefined;
};

export type RootBottomTabStackParamList = {
  //BOTTOM TABS
  HomeTab: undefined;
  ShopTab: undefined;
  OrdersTab: undefined;
  CartTab: undefined;
  SettingsTab: undefined;
};

export type AuthRootStackParamList = {
  //AUTH STACK
  Onboard: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
