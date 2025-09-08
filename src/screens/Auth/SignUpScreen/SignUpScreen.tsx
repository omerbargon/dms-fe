import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ITheme, useTheme } from '../../../theme';
import { Button } from '../../../common/components/Button/Button';
import { FormTextInput } from '../../../common/components/FormItems/FormInput';
import { FormProvider } from '../../../common/components/FormItems/FormProvider';
import { useForm } from '../../../common/components/FormItems/context';
import { ScrollViewContainer } from '../../../common/components/Container/ScrollViewContainer';
import { FormPhoneInput } from '../../../common/components/FormItems/FormPhoneInput';
import { FormOTPEntry } from '../../../common/components/FormItems/FormOTPEntry';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthRootStackParamList } from '../../../navigation/types';
import { LogoIcon, EnvelopIcon, UserIcon } from '../../../assets/icons';
import { createSchema } from './schema';
import { IAuthSignUp, ESignUpStep } from './types';
import { FormUploadDocument } from '../../../common/components/FormItems/FormUploadDocument';

export const SignUpScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<AuthRootStackParamList>>();

  const [step, setStep] = useState<ESignUpStep>(ESignUpStep.PHONE);
  const [otpPhoneTimer, setOtpPhoneTimer] = useState<number>(60);
  const [otpPhoneResends, setOtpPhoneResends] = useState<number>(0);
  const [otpPhoneResendAvailable, setOtpPhoneResendAvailable] = useState<boolean>(false);

  const schema = useMemo(() => createSchema(), []);
  const formMethods = useForm<IAuthSignUp>({
    schema,
    defaultValues: useMemo(
      () => ({
        phoneNumber: '',
        phoneDialCode: '+961',
        phoneCountry: 'LB',
        phoneOtp: '',
        firstName: '',
        lastName: '',
        email: '',
        ldaCard: [],
      }),
      [],
    ),
  });

  // OTP timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === ESignUpStep.OTP_PHONE && otpPhoneTimer > 0) {
      timer = setTimeout(() => setOtpPhoneTimer(t => t - 1), 1000);
      setOtpPhoneResendAvailable(false);
    } else if (otpPhoneTimer === 0 && otpPhoneResends < 3) {
      setOtpPhoneResendAvailable(true);
    }
    return () => clearTimeout(timer);
  }, [otpPhoneResends, otpPhoneTimer, step]);

  const maskedPhone = (() => {
    const dial = formMethods.getValues('phoneDialCode') || '';
    const num = (formMethods.getValues('phoneNumber') || '').replace(/\s/g, '');
    return `${dial} ${num.replace(/(\d{3})\d{4}(\d{2})/, '$1****$2')}`;
  })();

  const handleSendPhoneCode = useCallback(async () => {
    const valid = await formMethods.trigger(['phoneNumber', 'phoneCountry', 'phoneDialCode']);
    if (!valid) return;

    setStep(ESignUpStep.OTP_PHONE);
    setOtpPhoneTimer(60);
    setOtpPhoneResends(0);
    setOtpPhoneResendAvailable(false);
  }, [formMethods]);

  const handleVerifyPhoneOtp = useCallback(async () => {
    const ok = await formMethods.trigger(['phoneOtp']);
    if (!ok) return;

    const entered = formMethods.getValues('phoneOtp');
    if (entered !== '123456') {
      formMethods.setError('phoneOtp', { type: 'manual', message: 'Incorrect OTP. Please try again.' });
      return;
    }
    setStep(ESignUpStep.FORM);
  }, [formMethods]);

  const handleResendPhoneOtpCode = useCallback(() => {
    if (otpPhoneResends >= 3 || !otpPhoneResendAvailable) return;
    setOtpPhoneResends(p => p + 1);
    setOtpPhoneTimer(60);
    setOtpPhoneResendAvailable(false);
  }, [otpPhoneResends, otpPhoneResendAvailable]);

  const handleChangePhoneNumber = useCallback(() => {
    setStep(ESignUpStep.PHONE);
    formMethods.setValue('phoneOtp', '');
    setOtpPhoneTimer(60);
    setOtpPhoneResends(0);
    setOtpPhoneResendAvailable(false);
  }, [formMethods]);

  const handleFinish = useCallback((data: IAuthSignUp) => {
    console.log('REGISTER DATA:', data);
  }, []);

  const header =
    step === ESignUpStep.PHONE
      ? { title: 'Sign Up', subtitle: 'Verify your phone to begin' }
      : step === ESignUpStep.OTP_PHONE
      ? { title: 'Verify Phone', subtitle: 'Enter the 6-digit code we sent' }
      : { title: 'Complete Your Profile', subtitle: 'Just a few final details' };

  return (
    <ScrollViewContainer style={styles.scrollContent}>
      <View style={styles.innerContainer}>
        <View style={styles.headerSection}>
          <LogoIcon />
        </View>

        {step === ESignUpStep.OTP_PHONE && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Check your phone</Text>
            <Text style={styles.infoText}>We sent a 6-digit code to {maskedPhone}</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.title}>{header.title}</Text>
          {!!header.subtitle && <Text style={styles.subtitle}>{header.subtitle}</Text>}

          <FormProvider<IAuthSignUp> formMethods={formMethods} schema={schema}>
            {step === ESignUpStep.PHONE && (
              <>
                <FormPhoneInput name="phoneNumber" phoneCountry="phoneCountry" phoneDialCode="phoneDialCode" modalVisible required defaultCountry="LB" placeholder="Phone Number" />
                <Button title="Send Code" onPress={handleSendPhoneCode} style={styles.buttonContainer} />

                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>Already have an account?</Text>
                  <Pressable onPress={() => navigation.navigate('SignIn')} hitSlop={10}>
                    <Text style={styles.footerLink}> Sign In</Text>
                  </Pressable>
                </View>
              </>
            )}

            {step === ESignUpStep.OTP_PHONE && (
              <>
                <FormOTPEntry name="phoneOtp" required />

                <View style={styles.centered}>
                  <Pressable onPress={handleChangePhoneNumber} hitSlop={10}>
                    <Text style={styles.linkText}>Change Phone Number</Text>
                  </Pressable>
                </View>

                <Button title="Verify" onPress={handleVerifyPhoneOtp} style={styles.buttonContainer} />
                <Button
                  title={otpPhoneResends >= 3 ? 'Resend Limit Reached' : otpPhoneResendAvailable ? 'Resend Code' : `Resend in ${otpPhoneTimer}s`}
                  onPress={handleResendPhoneOtpCode}
                  disabled={!otpPhoneResendAvailable || otpPhoneResends >= 3}
                  variant="outlined"
                  style={styles.buttonContainer}
                />
              </>
            )}

            {step === ESignUpStep.FORM && (
              <>
                <FormTextInput  addonBefore={<UserIcon />} name="firstName" placeholder="First Name" required />
                <FormTextInput  addonBefore={<UserIcon />} name="lastName" placeholder="Last Name" required />
                <FormTextInput  addonBefore={<EnvelopIcon />} name="email" placeholder="Email" />
                <FormUploadDocument name="ldaCard"  placeholder="Upload LDA Card" required multiple max={3} />
                <Button title="Finish Sign Up" style={styles.buttonContainer} onPress={formMethods.handleSubmit(handleFinish)} />
              </>
            )}
          </FormProvider>
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
    buttonContainer: {
      marginTop: 12,
    },
    footerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 8,
    },
    footerText: {
      fontSize: 15,
      color: theme.gray,
    },
    footerLink: {
      color: theme.appSecondaryColor,
      fontWeight: '700',
      fontSize: 15,
    },
    centered: { alignItems: 'center' },
    linkText: {
      fontSize: 14,
      color: theme.appSecondaryColor,
      fontWeight: '600',
      paddingBottom: 12,
      textDecorationLine: 'underline',
    },
  });
