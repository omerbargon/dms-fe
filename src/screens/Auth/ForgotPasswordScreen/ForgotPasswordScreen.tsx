import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { ScrollViewContainer } from '../../../common/components/Container/ScrollViewContainer';
import { FormTextInput } from '../../../common/components/FormItems/FormInput';
import { useForm } from '../../../common/components/FormItems/context';
import { FormProvider } from '../../../common/components/FormItems/FormProvider';
import { Button } from '../../../common/components/Button/Button';
import { ITheme, useTheme } from '../../../theme';
import { EnvelopIcon, LogoIcon } from '../../../assets/icons';
import { IForgotPassword } from './types';
import { createSchema } from './schema';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthRootStackParamList } from '../../../navigation/types';

export const ForgotPasswordScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const schema = useMemo(() => createSchema(), []);
  const navigation = useNavigation<NativeStackNavigationProp<AuthRootStackParamList>>();

  const formMethods = useForm<IForgotPassword>({
    schema,
    defaultValues: useMemo(() => ({ email: '' }), []),
  });

  const handleSendResetLink = useCallback((data: IForgotPassword) => {
    console.log('Send password reset link to:', data.email);
  }, []);

  const handleBackToSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <ScrollViewContainer style={styles.scrollContent}>
      <View style={styles.innerContainer}>
        <View style={styles.headerSection}>
          <LogoIcon />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Enter your email and we&apos;ll send you a reset link</Text>

          <FormProvider<IForgotPassword> formMethods={formMethods} schema={schema}>
            <FormTextInput name="email" addonBefore={<EnvelopIcon />} placeholder="Email" required />
            <Button title="Send Link" style={styles.buttonContainer} onPress={formMethods.handleSubmit(handleSendResetLink)} />
          </FormProvider>
                  <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Remember your password?</Text>
          <Pressable onPress={handleBackToSignIn} hitSlop={10}>
            <Text style={styles.footerLink}> Sign In</Text>
          </Pressable>
        </View>
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
    buttonContainer: {
      marginTop: 12,
    },
    footerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 8
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
  });
