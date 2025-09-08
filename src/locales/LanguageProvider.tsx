import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (lng: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage && storedLanguage !== currentLanguage) {
          await i18n.changeLanguage(storedLanguage);
          setCurrentLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };

    initializeLanguage();
  }, [currentLanguage]);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      await AsyncStorage.setItem('language', lng);
      setCurrentLanguage(lng);
      RNRestart.restart();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      <React.Fragment>{children}</React.Fragment>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
