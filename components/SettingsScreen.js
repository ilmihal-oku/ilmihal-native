import { useContext, useEffect, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { APP_LANGUAGES, useTranslation } from '../i18n';
import { HADITH_LANGUAGES, QURAN_LANGUAGES, SettingsContext } from '../settingsContext';
import styles from '../styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SettingsScreen = ({ navigation, route }) => {
  const settingType = route?.params?.type || 'all'; // 'all', 'app', 'quran', or 'hadith'
  const { settings, updateSettings } = useContext(SettingsContext);
  const { t } = useTranslation();

  // If a specific setting type is requested, open it by default; otherwise start all collapsed
  const [expandedSection, setExpandedSection] = useState(
    settingType !== 'all' ? settingType : null
  );

  const toggleSection = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  const handleAppLanguageSelect = (code) => {
    updateSettings({ appLanguage: code });
    if (settingType !== 'all') {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }, 150);
    }
  };

  const handleHadithLanguageSelect = (code) => {
    updateSettings({ hadithLanguage: code });
    if (settingType !== 'all') {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }, 150);
    }
  };

  const handleQuranLanguageSelect = (code) => {
    updateSettings({ quranLanguage: code });
    if (settingType !== 'all') {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }, 150);
    }
  };

  const currentAppLang =
    APP_LANGUAGES.find((l) => l.code === settings.appLanguage) || APP_LANGUAGES[0];
  const currentQuranLang =
    QURAN_LANGUAGES.find((l) => l.code === settings.quranLanguage) || QURAN_LANGUAGES[0];
  const currentHadithLang =
    HADITH_LANGUAGES.find((l) => l.code === settings.hadithLanguage) || HADITH_LANGUAGES[0];

  const renderLanguageList = (languages, selectedCode, onSelect) => {
    return languages.map((item) => {
      const isSelected = selectedCode === item.code;
      const isRTL = item.direction === 'rtl' || item.code === 'ar' || item.code === 'ur';
      const flag =
        item.flag ||
        (item.code.startsWith('tr')
          ? '🇹🇷'
          : item.code.startsWith('en')
          ? '🇬🇧'
          : item.code.startsWith('ar')
          ? '🇸🇦'
          : item.code.startsWith('ur')
          ? '🇵🇰'
          : item.code.startsWith('b')
          ? '🇧🇩'
          : item.code.startsWith('fr')
          ? '🇫🇷'
          : item.code.startsWith('i')
          ? '🇮🇩'
          : item.code.startsWith('ru')
          ? '🇷🇺'
          : item.code.startsWith('ta')
          ? '🇮🇳'
          : item.code === 'zh'
          ? '🇨🇳'
          : item.code === 'es'
          ? '🇪🇸'
          : item.code === 'sv'
          ? '🇸🇪'
          : '🌐');

      return (
        <TouchableOpacity
          key={item.code}
          style={[
            settingsStyles.languageItem,
            isSelected && settingsStyles.languageItemSelected,
          ]}
          onPress={() => onSelect(item.code)}
          activeOpacity={0.7}
        >
          <Text style={settingsStyles.flagEmoji}>{flag}</Text>
          <View style={settingsStyles.languageInfo}>
            <Text
              style={[
                settingsStyles.languageName,
                isSelected && settingsStyles.languageNameSelected,
              ]}
            >
              {item.name}
            </Text>
            <Text style={settingsStyles.languageCode}>
              {isRTL ? t('rtl') : t('ltr')}
            </Text>
          </View>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
          )}
        </TouchableOpacity>
      );
    });
  };

  const headerTitle =
    settingType === 'quran'
      ? t('quranTranslation')
      : settingType === 'hadith'
      ? t('hadithLanguage')
      : settingType === 'app'
      ? t('appLanguage')
      : t('languageSettings');

  useEffect(() => {
    navigation.setOptions({
      title: headerTitle,
    });
  }, [navigation, headerTitle]);

  const showApp = settingType === 'all' || settingType === 'app';
  const showQuran = settingType === 'all' || settingType === 'quran';
  const showHadith = settingType === 'all' || settingType === 'hadith';

  const AccordionSection = ({
    id,
    title,
    description,
    icon,
    iconColor,
    currentLanguage,
    languages,
    selectedCode,
    onSelect,
  }) => {
    const isExpanded = expandedSection === id;

    return (
      <View style={settingsStyles.accordionCard}>
        <TouchableOpacity
          style={[
            settingsStyles.accordionHeader,
            isExpanded && settingsStyles.accordionHeaderExpanded,
          ]}
          onPress={() => toggleSection(id)}
          activeOpacity={0.7}
        >
          <View
            style={[
              settingsStyles.iconBadge,
              { backgroundColor: iconColor + '15' },
            ]}
          >
            <Ionicons name={icon} size={22} color={iconColor} />
          </View>
          <View style={settingsStyles.headerTextContainer}>
            <Text style={settingsStyles.accordionTitle}>{title}</Text>
            <View style={settingsStyles.previewBadge}>
              <Text style={settingsStyles.previewBadgeText}>
                {currentLanguage.flag} {currentLanguage.name}
              </Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#666"
            style={settingsStyles.chevron}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={settingsStyles.accordionBody}>
            <Text style={settingsStyles.sectionDescription}>{description}</Text>
            {renderLanguageList(languages, selectedCode, onSelect)}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={settingsStyles.container}>
        {/* Scrollable Content */}
        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {showApp && (
            <AccordionSection
              id="app"
              title={t('appLanguage')}
              description={t('appLanguageDescription')}
              icon="globe"
              iconColor="#256FA2"
              currentLanguage={currentAppLang}
              languages={APP_LANGUAGES}
              selectedCode={settings.appLanguage}
              onSelect={handleAppLanguageSelect}
            />
          )}

          {showQuran && (
            <AccordionSection
              id="quran"
              title={t('quranTranslation')}
              description={t('quranTranslationDescription')}
              icon="book"
              iconColor="#2E7D32"
              currentLanguage={currentQuranLang}
              languages={QURAN_LANGUAGES}
              selectedCode={settings.quranLanguage}
              onSelect={handleQuranLanguageSelect}
            />
          )}

          {showHadith && (
            <AccordionSection
              id="hadith"
              title={t('hadithLanguage')}
              description={t('hadithLanguageDescription')}
              icon="library"
              iconColor="#1565C0"
              currentLanguage={currentHadithLang}
              languages={HADITH_LANGUAGES}
              selectedCode={settings.hadithLanguage}
              onSelect={handleHadithLanguageSelect}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const settingsStyles = {
  container: {
    flex: 1,
    backgroundColor: '#bbe1fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 30,
  },
  accordionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  previewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  previewBadgeText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 10,
  },
  accordionBody: {
    padding: 16,
    paddingTop: 14,
    backgroundColor: '#fafbfc',
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 14,
    lineHeight: 18,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#e8ecef',
  },
  languageItemSelected: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2E7D32',
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 14,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  languageNameSelected: {
    color: '#1b5e20',
    fontWeight: '600',
  },
  languageCode: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
};

export default SettingsScreen;
