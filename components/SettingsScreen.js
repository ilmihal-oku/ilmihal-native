import { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HADITH_LANGUAGES, QURAN_LANGUAGES, SettingsContext } from '../settingsContext';
import styles from '../styles';

const SettingsScreen = ({ navigation, route }) => {
  const settingType = route?.params?.type || 'all'; // 'all', 'quran', or 'hadith'
  const { settings, updateSettings } = useContext(SettingsContext);
  const [selectedHadithLanguage, setSelectedHadithLanguage] = useState(settings.hadithLanguage);
  const [selectedQuranLanguage, setSelectedQuranLanguage] = useState(settings.quranLanguage);

  const handleHadithLanguageSelect = (code) => {
    setSelectedHadithLanguage(code);
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
    setSelectedQuranLanguage(code);
    updateSettings({ quranLanguage: code });
    if (settingType !== 'all') {
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }, 150);
    }
  };

  const renderLanguageList = (languages, selectedCode, onSelect) => {
    return languages.map((item) => {
      const isSelected = selectedCode === item.code;
      return (
        <TouchableOpacity
          key={item.code}
          style={[
            settingsStyles.languageItem,
            isSelected && settingsStyles.languageItemSelected
          ]}
          onPress={() => onSelect(item.code)}
        >
          <View style={settingsStyles.languageInfo}>
            <Text style={[
              settingsStyles.languageName,
              isSelected && settingsStyles.languageNameSelected
            ]}>
              {item.name}
            </Text>
            <Text style={settingsStyles.languageCode}>
              {item.direction === 'rtl' ? 'Sağdan sola' : 'Soldan sağa'}
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
      ? "Kur'an Meali"
      : settingType === 'hadith'
      ? 'Hadis Dili'
      : 'Dil Ayarları';

  const showQuran = settingType === 'all' || settingType === 'quran';
  const showHadith = settingType === 'all' || settingType === 'hadith';

  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={settingsStyles.container}>
        {/* Header */}
        <View style={settingsStyles.header}>
          <TouchableOpacity
            style={settingsStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#256FA2" />
          </TouchableOpacity>
          <View style={settingsStyles.headerInfo}>
            <Text style={settingsStyles.headerTitle}>{headerTitle}</Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {showQuran && (
            /* Quran Language Section */
            <View style={settingsStyles.section}>
              <View style={settingsStyles.sectionHeader}>
                <Ionicons name="book" size={20} color="#256FA2" />
                <Text style={settingsStyles.sectionTitle}>Kur'an Meali</Text>
              </View>
              <Text style={settingsStyles.sectionDescription}>
                Kur'an meali için tercih ettiğiniz dili seçin
              </Text>
              {renderLanguageList(QURAN_LANGUAGES, selectedQuranLanguage, handleQuranLanguageSelect)}
            </View>
          )}

          {showHadith && (
            /* Hadith Language Section */
            <View style={[settingsStyles.section, showQuran && { marginTop: 16 }]}>
              <View style={settingsStyles.sectionHeader}>
                <Ionicons name="library" size={20} color="#256FA2" />
                <Text style={settingsStyles.sectionTitle}>Hadis Dili</Text>
              </View>
              <Text style={settingsStyles.sectionDescription}>
                Hadis çevirileri için tercih ettiğiniz dili seçin
              </Text>
              {renderLanguageList(HADITH_LANGUAGES, selectedHadithLanguage, handleHadithLanguageSelect)}
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerInfo: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 30,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageItemSelected: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2E7D32',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
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
