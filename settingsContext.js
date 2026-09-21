import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useMemo, useState } from 'react';
import { AppState, Dimensions, PixelRatio, useWindowDimensions } from 'react-native';
import { I18nContext, detectDeviceLanguage, getTranslations } from './i18n';
import { appLangToHadithLang, appLangToQuranLang } from './i18n/translations';
import { getScaledLineHeight } from './utils/typography';

const SETTINGS_KEY = '@ilmihal_settings';

// Available languages for hadith
export const HADITH_LANGUAGES = [
  { code: 'tur', name: 'Türkçe', direction: 'ltr', flag: '🇹🇷' },
  { code: 'eng', name: 'English', direction: 'ltr', flag: '🇬🇧' },
  { code: 'ara', name: 'العربية', direction: 'rtl', flag: '🇸🇦' },
  { code: 'urd', name: 'اردو', direction: 'rtl', flag: '🇵🇰' },
  { code: 'ben', name: 'বাংলা', direction: 'ltr', flag: '🇧🇩' },
  { code: 'fra', name: 'Français', direction: 'ltr', flag: '🇫🇷' },
  { code: 'ind', name: 'Bahasa Indonesia', direction: 'ltr', flag: '🇮🇩' },
  { code: 'rus', name: 'Русский', direction: 'ltr', flag: '🇷🇺' },
  { code: 'tam', name: 'தமிழ்', direction: 'ltr', flag: '🇮🇳' },
];

// Available languages for Quran translation
export const QURAN_LANGUAGES = [
  { code: 'tr', name: 'Türkçe', direction: 'ltr', flag: '🇹🇷' },
  { code: 'en', name: 'English', direction: 'ltr', flag: '🇬🇧' },
  { code: 'ur', name: 'اردو', direction: 'rtl', flag: '🇵🇰' },
  { code: 'bn', name: 'বাংলা', direction: 'ltr', flag: '🇧🇩' },
  { code: 'zh', name: '中文', direction: 'ltr', flag: '🇨🇳' },
  { code: 'es', name: 'Español', direction: 'ltr', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', direction: 'ltr', flag: '🇫🇷' },
  { code: 'id', name: 'Bahasa Indonesia', direction: 'ltr', flag: '🇮🇩' },
  { code: 'ru', name: 'Русский', direction: 'ltr', flag: '🇷🇺' },
  { code: 'sv', name: 'Svenska', direction: 'ltr', flag: '🇸🇪' },
];

const detectedLang = detectDeviceLanguage();

const defaultSettings = {
  appLanguage: detectedLang,
  hadithLanguage: appLangToHadithLang[detectedLang] || 'eng',
  quranLanguage: appLangToQuranLang[detectedLang] || 'en',
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  updateSettings: () => {},
  getHadithUrl: () => '',
  getQuranUrl: () => '',
  getQuranChaptersUrl: () => '',
  fontScale: 1,
  getScaledLineHeight: (size, ratio) => Math.round(size * (ratio || 1.45)),
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);
  const { fontScale: windowFontScale } = useWindowDimensions();
  const [fontScale, setFontScale] = useState(windowFontScale || PixelRatio.getFontScale() || 1);

  const checkFontScale = () => {
    const currentScale = Dimensions.get('window').fontScale || PixelRatio.getFontScale() || 1;
    setFontScale((prev) => {
      if (Math.abs(prev - currentScale) > 0.005) {
        return currentScale;
      }
      return prev;
    });
  };

  // Sync when windowFontScale updates from OS Dynamic Type / Font Size change
  useEffect(() => {
    if (windowFontScale) {
      checkFontScale();
    }
  }, [windowFontScale]);

  // Also sync when app transitions from background to active (e.g. user adjusted font size in phone Settings)
  useEffect(() => {
    let timers = [];
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkFontScale();
        timers.push(setTimeout(checkFontScale, 50));
        timers.push(setTimeout(checkFontScale, 150));
        timers.push(setTimeout(checkFontScale, 300));
        timers.push(setTimeout(checkFontScale, 600));
      }
    });

    const dimSub = Dimensions.addEventListener('change', ({ window }) => {
      if (window?.fontScale) {
        checkFontScale();
      }
    });

    return () => {
      subscription.remove();
      dimSub?.remove?.();
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoaded(true);
    }
  };

  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };

    // Auto-switch content languages when app language changes
    if (newSettings.appLanguage && newSettings.appLanguage !== settings.appLanguage) {
      const newAppLang = newSettings.appLanguage;
      const hadithLang = appLangToHadithLang[newAppLang];
      const quranLang = appLangToQuranLang[newAppLang];
      if (hadithLang) updated.hadithLanguage = hadithLang;
      if (quranLang) updated.quranLanguage = quranLang;
    }

    setSettings(updated);
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  // Generate hadith URL based on selected language
  const getHadithUrl = (collection = 'bukhari') => {
    return `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${settings.hadithLanguage}-${collection}.min.json`;
  };

  // Generate Quran URL based on selected language
  const getQuranUrl = () => {
    return `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_${settings.quranLanguage}.json`;
  };

  // Generate Quran chapters URL based on selected language
  const getQuranChaptersUrl = () => {
    return `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${settings.quranLanguage}/index.json`;
  };

  const getHadithLanguageInfo = () => {
    return HADITH_LANGUAGES.find(l => l.code === settings.hadithLanguage) || HADITH_LANGUAGES[0];
  };

  const getQuranLanguageInfo = () => {
    return QURAN_LANGUAGES.find(l => l.code === settings.quranLanguage) || QURAN_LANGUAGES[0];
  };

  // Build i18n context value
  const i18nValue = useMemo(() => {
    const strings = getTranslations(settings.appLanguage);
    return {
      t: (key, ...args) => {
        const val = strings[key];
        if (typeof val === 'function') {
          return val(...args);
        }
        return val || key;
      },
      language: settings.appLanguage,
    };
  }, [settings.appLanguage]);

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      getHadithUrl,
      getQuranUrl,
      getQuranChaptersUrl,
      getHadithLanguageInfo,
      getQuranLanguageInfo,
      fontScale,
      getScaledLineHeight: (size, ratio) => getScaledLineHeight(size, fontScale, ratio),
      loaded 
    }}>
      <I18nContext.Provider value={i18nValue}>
        {children}
      </I18nContext.Provider>
    </SettingsContext.Provider>
  );
};
