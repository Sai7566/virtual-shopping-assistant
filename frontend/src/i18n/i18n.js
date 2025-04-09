import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your language files
import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';

// Get saved language from localStorage or fallback to 'en'
const savedLang = localStorage.getItem('selectedLanguage') || 'en';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      hi: {
        translation: hi,
      },
      te: {
        translation: te,
      },
      ta: {
        translation: ta,
      },
      kn: {
        translation: kn,
      },
    },
    lng: savedLang, // Use saved language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;


