import React, { useMemo } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { ScrollViewContainer } from '../../../src/common/components/Container/ScrollViewContainer';
import { ITheme, useTheme } from '../../../src/theme';

export const PrivacyPolicyScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollViewContainer style={styles.container}>
      <Text style={styles.subTitleItalic}>Effective Date: June 1, 2025</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.linkColor}>DMS</Text> ("we", "us", or "our") operates the <Text style={styles.linkColor}>DMS</Text> Insurance mobile application and website (collectively, the "Service").
        </Text>
        <Text style={styles.paragraph}>
          This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Service. By accessing or using the Service, you agree to this policy. Terms not defined here have the same meaning as in our Terms & Conditions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Definitions</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Personal Data: </Text>Information that identifies you, such as your name, email, phone number, address, and policy details.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Usage Data: </Text>Information automatically collected from your device when using the Service, such as IP address, browser type, and app activity.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Cookies: </Text>Small files stored on your device to enhance your browsing experience and help us analyze Service usage.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Data Controller: </Text>
          <Text style={styles.linkColor}>DMS</Text>, which determines why and how personal data is collected and processed.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Information Collection & Use</Text>
        <Text style={styles.paragraph}>We collect different types of information to provide and improve our Service:</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bullet}>• </Text> Personal details (name, email, phone number, address).{'\n'}
          <Text style={styles.bullet}>• </Text> Insurance policy and claims information.{'\n'}
          <Text style={styles.bullet}>• </Text> Financial details for payments and claims.{'\n'}
          <Text style={styles.bullet}>• </Text> Health information, when required by law or with your consent.{'\n'}
          <Text style={styles.bullet}>• </Text> Device and usage data to monitor Service performance.{'\n'}
          <Text style={styles.bullet}>• </Text> Location data (if enabled) to provide location-specific services.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Use of Data</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.linkColor}>DMS</Text> uses collected data for purposes including:
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bullet}>• </Text> Operating and maintaining the Service.{'\n'}
          <Text style={styles.bullet}>• </Text> Processing transactions and claims.{'\n'}
          <Text style={styles.bullet}>• </Text> Providing customer support.{'\n'}
          <Text style={styles.bullet}>• </Text> Sending important updates, offers, and notifications.{'\n'}
          <Text style={styles.bullet}>• </Text> Detecting and preventing fraud or abuse.{'\n'}
          <Text style={styles.bullet}>• </Text> Complying with legal obligations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Sharing of Data</Text>
        <Text style={styles.paragraph}>We may share your information with trusted third parties:</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bullet}>• </Text> Insurance partners for policy and claims administration.{'\n'}
          <Text style={styles.bullet}>• </Text> Payment processors for transactions.{'\n'}
          <Text style={styles.bullet}>• </Text> Service providers who assist with hosting, analytics, or customer support.{'\n'}
          <Text style={styles.bullet}>• </Text> Authorities, if required by law.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Security</Text>
        <Text style={styles.paragraph}>We implement reasonable measures to protect your information, including encryption, restricted access, and regular security audits. However, no method of transmission or storage is completely secure.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Data Retention</Text>
        <Text style={styles.paragraph}>We retain your data only as long as necessary for the purposes outlined in this Privacy Policy or as required by law. Once retention periods expire, your data is deleted or anonymized.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
        <Text style={styles.paragraph}>Our Service is not intended for children under 18. We do not knowingly collect personal data from minors. If you believe we have done so, please contact us immediately.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
        <Text style={styles.paragraph}>We may update this Privacy Policy from time to time. Any changes will be posted here with an updated "Effective Date." Material changes may also be communicated by email or in-app notification.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions about this Privacy Policy, contact us at:{' '}
          <Text style={styles.linkColor} onPress={() => Linking.openURL('mailto:info@dms.com')}>
            info@dms.com
          </Text>{' '}
          Or visit:{' '}
          <Text style={styles.linkColor} onPress={() => Linking.openURL('https://www.dms.com')}>
            www.dms.com
          </Text>
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
    boldText: {
      fontWeight: 'bold',
      color: theme.black,
    },
    bullet: {
      fontWeight: 'bold',
    },
  });
