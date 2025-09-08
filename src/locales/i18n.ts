import 'intl-pluralrules';
import { I18nManager } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './langs/en.json';
import ar from './langs/ar.json';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: I18nManager.isRTL ? 'ar' : 'en',
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
