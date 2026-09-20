import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

const SETTINGS_KEY = '@ilmihal_settings';

// Available languages for hadith
export const HADITH_LANGUAGES = [
  { code: 'tur', name: 'Türkçe', direction: 'ltr' },
  { code: 'eng', name: 'English', direction: 'ltr' },
  { code: 'ara', name: 'العربية', direction: 'rtl' },
  { code: 'urd', name: 'اردو', direction: 'rtl' },
  { code: 'ben', name: 'বাংলা', direction: 'ltr' },
  { code: 'fra', name: 'Français', direction: 'ltr' },
  { code: 'ind', name: 'Bahasa Indonesia', direction: 'ltr' },
  { code: 'rus', name: 'Русский', direction: 'ltr' },
  { code: 'tam', name: 'தமிழ்', direction: 'ltr' },
];

// Available languages for Quran translation
export const QURAN_LANGUAGES = [
  { code: 'tr', name: 'Türkçe', direction: 'ltr' },
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'ur', name: 'اردو', direction: 'rtl' },
  { code: 'bn', name: 'বাংলা', direction: 'ltr' },
  { code: 'zh', name: '中文', direction: 'ltr' },
  { code: 'es', name: 'Español', direction: 'ltr' },
  { code: 'fr', name: 'Français', direction: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', direction: 'ltr' },
  { code: 'ru', name: 'Русский', direction: 'ltr' },
  { code: 'sv', name: 'Svenska', direction: 'ltr' },
];

const defaultSettings = {
  hadithLanguage: 'tur',
  quranLanguage: 'tr',
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  updateSettings: () => {},
  getHadithUrl: () => '',
  getQuranUrl: () => '',
  getQuranChaptersUrl: () => '',
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      getHadithUrl,
      getQuranUrl,
      getQuranChaptersUrl,
      getHadithLanguageInfo,
      getQuranLanguageInfo,
      loaded 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
