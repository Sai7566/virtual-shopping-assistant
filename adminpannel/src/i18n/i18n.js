import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your language files
import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';

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
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;


