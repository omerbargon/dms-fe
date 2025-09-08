import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from '../../../../src/common/components/FormItems/context';
import { AuthContext } from '../../../../src/navigation/AuthProvider';
import { FormProvider } from '../../../../src/common/components/FormItems/FormProvider';
import { FormTextInput } from '../../../../src/common/components/FormItems/FormInput';
import { FormPhoneInput } from '../../../../src/common/components/FormItems/FormPhoneInput';
import { Button } from '../../../../src/common/components/Button/Button';
import { ScrollViewContainer } from '../../../../src/common/components/Container/ScrollViewContainer';
import { ITheme, useTheme } from '../../../../src/theme';
import { AuthRootStackParamList } from '../../../navigation/types';
import { EnvelopIcon, LogoIcon } from '../../../assets/icons';
import { UseFormReturn } from 'react-hook-form';
import { createPhoneStep1Schema, createPhoneStep2Schema } from './schema';
import { IAuthPhoneStep1, IAuthPhoneStep2 } from './types';
import { FormCheckBox } from '../../../../src/common/components/FormItems/FormCheckbox';
import { FormOTPEntry } from '../../../../src/common/components/FormItems/FormOTPEntry';

export const SignInScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<AuthRootStackParamList>>();
  const authContext = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState<'credentials' | 'otp'>('credentials');
  const [otpTimer, setOtpTimer] = useState<number>(60);
  const [otpResends, setOtpResends] = useState<number>(0);
  const [otpResendAvailable, setOtpResendAvailable] = useState<boolean>(false);

  const step1Schema = useMemo(() => createPhoneStep1Schema(), []);
  const step2Schema = useMemo(() => createPhoneStep2Schema(), []);

  const step1FormMethods = useForm<IAuthPhoneStep1>({
    schema: step1Schema,
    defaultValues: useMemo(
      () => ({
        phoneNumber: '',
        phoneDialCode: '+961',
        phoneCountry: 'LB',
        email: '',
      }),
      [],
    ),
  });

  const step2FormMethods = useForm<IAuthPhoneStep2>({
    schema: step2Schema,
    defaultValues: useMemo(
      () => ({
        otp: '',
      }),
      [],
    ),
  });

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const handleSendCode = async (data: IAuthPhoneStep1) => {
    try {
      const fullPhone = data.phoneDialCode + data.phoneNumber;
      await authContext.sendOTP(fullPhone, data.email);
      setCurrentStep('otp');
      setOtpTimer(60);
      setOtpResends(0);
      setOtpResendAvailable(false);
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOTP = async (data: IAuthPhoneStep2) => {
    try {
      const step1Data = step1FormMethods.getValues();
      const fullPhone = step1Data.phoneDialCode + step1Data.phoneNumber;
      await authContext.verifyOTPAndLogin(fullPhone, data.otp);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleResendCode = useCallback(async () => {
    if (otpResends >= 3 || !otpResendAvailable) return;
    try {
      const step1Data = step1FormMethods.getValues();
      const fullPhone = (step1Data.phoneDialCode || '') + (step1Data.phoneNumber || '');
      await authContext.sendOTP(fullPhone, step1Data.email);
      setOtpResends(r => r + 1);
      setOtpTimer(60);
      setOtpResendAvailable(false);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  }, [otpResends, otpResendAvailable, step1FormMethods, authContext]);

  const handleSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleBackToStep1 = useCallback(() => {
    setCurrentStep('credentials');
    step2FormMethods.reset();
    setOtpTimer(60);
    setOtpResends(0);
    setOtpResendAvailable(false);
  }, [step2FormMethods]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (currentStep === 'otp' && otpTimer > 0) {
      timerId = setTimeout(() => setOtpTimer(t => t - 1), 1000);
      setOtpResendAvailable(false);
    } else if (currentStep === 'otp' && otpTimer === 0 && otpResends < 3) {
      setOtpResendAvailable(true);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [currentStep, otpTimer, otpResends]);

  const renderStep1 = () => {
    const onSubmit = step1FormMethods.handleSubmit(handleSendCode);
    return (
      <FormProvider<IAuthPhoneStep1> formMethods={step1FormMethods as UseFormReturn<IAuthPhoneStep1>} schema={step1Schema}>
        <FormPhoneInput name="phoneNumber" phoneCountry="phoneCountry" phoneDialCode="phoneDialCode" modalVisible required defaultCountry="LB" placeholder="Phone number" />
        <FormTextInput addonBefore={<EnvelopIcon />} name="email" placeholder="Email" />

        <View style={styles.rowBetween}>
          <FormCheckBox name="rememberMe" label="Remember me" />
          <Pressable onPress={handleForgotPassword} hitSlop={10}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>
        </View>

        <Button title="Send Code" onPress={onSubmit} />
      </FormProvider>
    );
  };
  const onSubmit = step2FormMethods.handleSubmit(handleVerifyOTP);
  const step1Data = step1FormMethods.getValues();
  const maskedPhone = `${step1Data.phoneDialCode} ${step1Data.phoneNumber.replace(/(\d{3})\d{4}(\d{2})/, '$1****$2')}`;

  const renderStep2 = () => {
    return (
      <FormProvider<IAuthPhoneStep2> formMethods={step2FormMethods as UseFormReturn<IAuthPhoneStep2>} schema={step2Schema}>
        <FormOTPEntry name="otp" required />
        <View style={styles.centered}>
          <Pressable onPress={handleBackToStep1} hitSlop={10}>
            <Text style={styles.linkText}>Change Phone Number</Text>
          </Pressable>
        </View>

        <Button title="Sign In" onPress={onSubmit} />

        <Button variant="outlined" style={styles.resendButton} disabled={!otpResendAvailable || otpResends >= 3} title={otpResends >= 3 ? 'Resend Limit Reached' : otpResendAvailable ? 'Resend Code' : `Resend in ${otpTimer}s`} onPress={handleResendCode} />
      </FormProvider>
    );
  };

  return (
    <ScrollViewContainer style={styles.scrollContent}>
      <View style={styles.innerContainer}>
        <View style={styles.headerSection}>
          <LogoIcon />
        </View>
        {currentStep === 'otp' && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Check your phone</Text>
            <Text style={styles.infoText}>We sent a 6-digit code to {maskedPhone}</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.title}>{currentStep === 'credentials' ? 'Welcome' : 'Verify & Sign in'}</Text>
          <Text style={styles.subtitle}>{currentStep === 'credentials' ? 'Sign in with your phone and optional email' : 'Enter the code to complete your sign in'}</Text>
          {currentStep === 'credentials' ? renderStep1() : renderStep2()}
          {currentStep === 'credentials' && (
            <View style={styles.footerContainer}>
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
                <Pressable onPress={handleSignUp} hitSlop={10}>
                  <Text style={styles.signUpLink}> Sign Up</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollViewContainer>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.white,
    },
    innerContainer: {
      width: '100%',
      maxWidth: 420,
      gap: 12,
    },
    headerSection: {
      alignItems: 'center',
      gap: 12,
    },
    card: {
      backgroundColor: theme.appMainColor + '11',
      borderRadius: 12,
      padding: 20,
      marginTop: 8,
      borderWidth: 1,
      borderColor: theme.appMainColor + '22',
    },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: 16,
    },
    forgotPasswordText: {
      fontSize: 14,
      color: theme.appSecondaryColor,
      fontWeight: '600',
      textDecorationLine: 'underline',
    },
    infoCard: {
      padding: 14,
      marginTop: 8,
      borderRadius: 12,
      backgroundColor: theme.appMainColor + '11',
      borderWidth: 1,
      borderColor: theme.appMainColor + '22',
      alignItems: 'center',
      gap: 4,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      paddingBottom: 6,
      textAlign: 'center',
      color: theme.black,
    },
    subtitle: {
      fontSize: 14,
      color: theme.gray,
      paddingBottom: 16,
      textAlign: 'center',
    },
    infoTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.black,
    },
    infoText: {
      fontSize: 13,
      color: theme.gray,
      textAlign: 'center',
    },
    centered: { alignItems: 'center' },
    linkText: {
      fontSize: 14,
      color: theme.appSecondaryColor,
      fontWeight: '600',
      paddingBottom: 32,
      textDecorationLine: 'underline',
    },
    footerContainer: {
      marginTop: 8,
      alignItems: 'center',
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signUpText: {
      fontSize: 15,
      color: theme.gray,
    },
    signUpLink: {
      color: theme.appSecondaryColor,
      fontWeight: '700',
      fontSize: 15,
    },
    resendButton: {
      marginTop: 8,
    },
  });
