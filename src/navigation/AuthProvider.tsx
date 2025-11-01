import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { IUser, users } from '../mocks/user.data';

interface AuthContextType {
  isLoggedIn: boolean | null;
  user: IUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  sendOTP: (phoneNumber: string, email?: string) => Promise<void>;
  verifyOTPAndLogin: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  user: null,
  login: async () => false,
  sendOTP: async () => {},
  verifyOTPAndLogin: async () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [pendingOTPData, setPendingOTPData] = useState<{
    phoneNumber: string;
    email?: string;
    otp: string;
    expiresAt: number;
  } | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const foundUser = users.find(authUser => authUser.accessToken === token);
        setIsLoggedIn(!!foundUser);
        if (foundUser) {
          setUser(foundUser);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to check login status:', error);
      setIsLoggedIn(false);
    }
  };

  const login = async (identifier: string, password: string) => {
    const foundUser = users.find(authUser => (authUser.email === identifier || authUser.phoneDialCode + authUser.phoneNumber === identifier) && authUser.password === password);

    if (foundUser && foundUser.accessToken) {
      await AsyncStorage.setItem('accessToken', foundUser.accessToken);
      setUser(foundUser);
      setIsLoggedIn(true);
      return true;
    } else {
      Alert.alert('Login Failed', 'Invalid email or phone number with password');
      return false;
    }
  };

  const sendOTP = async (phoneNumber: string, email?: string): Promise<void> => {
    try {
      // Check if user exists with this phone number
      const foundUser = users.find(authUser => authUser.phoneDialCode + authUser.phoneNumber === phoneNumber || (email && authUser.email === email));

      if (!foundUser) {
        Alert.alert('User Not Found', 'No account found with this phone number or email.');
        throw new Error('User not found');
      }

      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Set expiration time (5 minutes from now)
      const expiresAt = Date.now() + 5 * 60 * 1000;

      // Store OTP data temporarily
      setPendingOTPData({
        phoneNumber,
        email,
        otp,
        expiresAt,
      });

      // In a real app, you would send the OTP via SMS/email here
      // For demo purposes, we'll show it in an alert
      console.log(`OTP sent to ${phoneNumber}: ${otp}`);
      Alert.alert('OTP Sent', `A 6-digit code has been sent to ${phoneNumber}.\n\nFor demo purposes, your OTP is: ${otp}`, [{ text: 'OK' }]);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw error;
    }
  };

  const verifyOTPAndLogin = async (phoneNumber: string, otp: string): Promise<void> => {
    try {
      // Check if there's pending OTP data
      if (!pendingOTPData) {
        Alert.alert('Error', 'No OTP request found. Please request a new code.');
        throw new Error('No pending OTP');
      }

      // Check if OTP has expired
      if (Date.now() > pendingOTPData.expiresAt) {
        setPendingOTPData(null);
        Alert.alert('OTP Expired', 'The verification code has expired. Please request a new one.');
        throw new Error('OTP expired');
      }

      // Check if phone number matches
      if (pendingOTPData.phoneNumber !== phoneNumber) {
        Alert.alert('Error', 'Phone number mismatch.');
        throw new Error('Phone number mismatch');
      }

      // Verify OTP
      if (pendingOTPData.otp !== otp) {
        Alert.alert('Invalid OTP', 'The verification code you entered is incorrect.');
        throw new Error('Invalid OTP');
      }

      // Find user and log them in
      const foundUser = users.find(authUser => authUser.phoneDialCode + authUser.phoneNumber === phoneNumber || (pendingOTPData.email && authUser.email === pendingOTPData.email));

      if (!foundUser || !foundUser.accessToken) {
        Alert.alert('Error', 'User account not found.');
        throw new Error('User not found');
      }

      // Clear pending OTP data
      setPendingOTPData(null);

      // Log in the user
      await AsyncStorage.setItem('accessToken', foundUser.accessToken);
      setUser(foundUser);
      setIsLoggedIn(true);

      Alert.alert('Success', 'You have been successfully logged in!');
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      setUser(null);
      setPendingOTPData(null);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        sendOTP,
        verifyOTPAndLogin,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
