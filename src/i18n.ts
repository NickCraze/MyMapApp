import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Loads translations from the public/locales folder
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'fr', 'de'], // Supported languages: English, French, German
    debug: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to load translations
    },
  });

export default i18n;
