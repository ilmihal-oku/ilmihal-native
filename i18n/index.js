import { getLocales } from 'expo-localization';
import { createContext, useContext } from 'react';
import { translations, APP_LANGUAGES } from './translations';

const FALLBACK_LANGUAGE = 'en';

/**
 * Detect the best matching app language from the device locale.
 * Falls back to English if no match is found.
 */
export const detectDeviceLanguage = () => {
  try {
    const locales = getLocales();
    if (locales && locales.length > 0) {
      const deviceLang = locales[0].languageCode; // e.g. 'en', 'tr', 'ar'
      // Check if we support this language
      if (translations[deviceLang]) {
        return deviceLang;
      }
    }
  } catch (error) {
    console.warn('Failed to detect device language:', error);
  }
  return FALLBACK_LANGUAGE;
};

/**
 * Get translation strings for a given language code.
 * Falls back to English if the language is not supported.
 */
export const getTranslations = (langCode) => {
  return {
    ...translations[FALLBACK_LANGUAGE],
    ...(translations[langCode] || {}),
  };
};

/**
 * I18nContext provides the current translation function.
 */
export const I18nContext = createContext({
  t: (key) => key,
  language: FALLBACK_LANGUAGE,
});

/**
 * Hook to access translations in any component.
 * 
 * Usage:
 *   const { t } = useTranslation();
 *   <Text>{t('verseOfTheDay')}</Text>
 */
export const useTranslation = () => {
  return useContext(I18nContext);
};

export { APP_LANGUAGES };
