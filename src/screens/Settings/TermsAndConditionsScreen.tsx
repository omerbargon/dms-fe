import { ITheme, useTheme } from '../../../src/theme';
import { ScrollViewContainer } from '../../../src/common/components/Container/ScrollViewContainer';
import React, { useMemo } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

export const TermsAndConditionsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollViewContainer style={styles.container}>
      <Text style={styles.subTitleItalic}>Effective Date: June 1, 2025</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.linkColor}>DMS</Text>! These Terms and Conditions explain the rules and guidelines for using our application. By accessing or using the app, you agree to comply with these Terms.
        </Text>
        <Text style={styles.paragraph}>
          The purpose of this agreement is to create a clear understanding between you (the user) and
          <Text style={styles.linkColor}> DMS</Text> regarding your rights, responsibilities, and limitations when using the app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
        <Text style={styles.paragraph}>By using this app, you agree to the following responsibilities:</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bullet}>• </Text> Use the app in a lawful manner and not engage in any activity that could harm the platform or other users.{'\n'}
          <Text style={styles.bullet}>• </Text> Provide accurate and truthful information when creating an account.{'\n'}
          <Text style={styles.bullet}>• </Text> Keep your login details secure and confidential.{'\n'}
          <Text style={styles.bullet}>• </Text> Avoid attempting to hack, reverse-engineer, or misuse the service.
        </Text>
        <Text style={styles.paragraph}>Failure to meet these responsibilities may result in suspension or termination of your account.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Services Provided</Text>
        <Text style={styles.paragraph}>
          The <Text style={styles.linkColor}>DMS</Text> app provides tools for viewing and managing dummy insurance policies, submitting claims, accessing support, and keeping track of policy updates.
        </Text>
        <Text style={styles.paragraph}>We may add, remove, or update features from time to time to improve your experience. Some services may be limited to certain countries or require specific eligibility criteria.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Limitations</Text>
        <Text style={styles.paragraph}>While we aim to provide reliable services, we cannot guarantee the app will always be available, free from errors, or meet every expectation.</Text>
        <Text style={styles.paragraph}>The app may occasionally be unavailable due to maintenance, updates, or technical issues. We are not responsible for data loss, delays, or inaccuracies caused by user error, device compatibility, or third-party services.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Termination</Text>
        <Text style={styles.paragraph}>We reserve the right to suspend or terminate your account if you violate these Terms, misuse the app, or engage in fraudulent activity.</Text>
        <Text style={styles.paragraph}>You may also delete your account at any time by contacting our support team. Upon termination, you may lose access to your data and related features within the app.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at:{' '}
          <Text style={styles.linkColor} onPress={() => Linking.openURL('mailto:info@dms.com')}>
            info@dms.com
          </Text>
        </Text>
        <Text style={styles.paragraph}>
          We may also provide support through in-app chat, phone, or additional help channels to ensure your experience with <Text style={styles.linkColor}>DMS</Text> is smooth and transparent.
        </Text>
      </View>
    </ScrollViewContainer>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme.white,
    },
    subTitleItalic: {
      fontSize: 15,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: theme.danger,
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 19,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      color: theme.appMainColor,
      marginBottom: 8,
    },
    paragraph: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.black,
      marginBottom: 10,
    },
    linkColor: {
      color: theme.linkColor,
      fontWeight: '600',
    },
    bullet: {
      fontWeight: 'bold',
    },
  });
