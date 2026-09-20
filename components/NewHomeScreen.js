import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../settingsContext';
import styles from '../styles';

/**
 * Generate a deterministic "random" number from a date string.
 * Same date = same number, so content changes daily.
 */
const getDailySeed = () => {
  const today = new Date().toDateString(); // e.g. "Sat Sep 20 2026"
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    const char = today.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const NewHomeScreen = ({ navigation }) => {
  const { settings, getQuranUrl, getHadithUrl } = useContext(SettingsContext);
  const [dailyVerse, setDailyVerse] = useState(null);
  const [dailyHadith, setDailyHadith] = useState(null);
  const [loadingVerse, setLoadingVerse] = useState(true);
  const [loadingHadith, setLoadingHadith] = useState(true);

  // Add settings gear icon to navigation header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={homeStyles.headerBanner}>
          <Text style={homeStyles.headerTitle}>ilmihal oku</Text>
          <Text style={homeStyles.headerSubtitle}>Kur'an • Hadis • İlmihal</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={homeStyles.headerSettingsButton}
          onPress={() => navigation.navigate('Settings', { type: 'all' })}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={22} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Load daily verse
  useEffect(() => {
    loadDailyVerse();
  }, [settings.quranLanguage]);

  // Load daily hadith
  useEffect(() => {
    loadDailyHadith();
  }, [settings.hadithLanguage]);

  const loadDailyVerse = async () => {
    setLoadingVerse(true);
    try {
      const url = getQuranUrl();
      const response = await fetch(url);
      const surahs = await response.json();

      const seed = getDailySeed();
      // Pick a surah (weighted towards shorter/popular surahs for readability)
      const surahIndex = seed % surahs.length;
      const surah = surahs[surahIndex];
      const verseIndex = (seed * 7) % surah.verses.length;
      const verse = surah.verses[verseIndex];

      setDailyVerse({
        surahId: surah.id,
        surahName: surah.transliteration,
        verseId: verse.id,
        text: verse.translation,
      });
    } catch (error) {
      console.error('Failed to load daily verse:', error);
    } finally {
      setLoadingVerse(false);
    }
  };

  const loadDailyHadith = async () => {
    setLoadingHadith(true);
    try {
      const url = getHadithUrl('bukhari');
      const response = await fetch(url);
      const data = await response.json();

      const seed = getDailySeed();
      const hadithIndex = (seed * 13) % data.hadiths.length;
      const hadith = data.hadiths[hadithIndex];

      setDailyHadith({
        number: hadith.hadithnumber,
        text: hadith.text,
        book: hadith.reference?.book || 0,
        bookName: data.metadata?.sections?.[hadith.reference?.book] || 'Sahih Bukhari',
      });
    } catch (error) {
      console.error('Failed to load daily hadith:', error);
    } finally {
      setLoadingHadith(false);
    }
  };

  const handleShareVerse = async () => {
    if (!dailyVerse) return;
    try {
      await Share.share({
        message: `${dailyVerse.surahName} (${dailyVerse.surahId}:${dailyVerse.verseId})\n\n"${dailyVerse.text}"\n\n- Kur'an-ı Kerim`,
      });
    } catch (error) {
      console.error('Error sharing verse:', error);
    }
  };

  const handleShareHadith = async () => {
    if (!dailyHadith) return;
    try {
      await Share.share({
        message: `Sahih Bukhari #${dailyHadith.number}\n\n"${dailyHadith.text}"\n\n- ${dailyHadith.bookName}`,
      });
    } catch (error) {
      console.error('Error sharing hadith:', error);
    }
  };

  const handleVersePress = () => {
    if (!dailyVerse) return;
    navigation.navigate('QuranReader', {
      surah: dailyVerse.surahId,
      ayah: dailyVerse.verseId,
    });
  };

  const handleHadithPress = () => {
    if (!dailyHadith) return;
    navigation.navigate('HadithView', {
      collection: 'Sahih Bukhari',
      hadithNumber: dailyHadith.number,
      text: dailyHadith.text,
      book: dailyHadith.book,
    });
  };

  const quickAccessItems = [
    { id: 'quran', label: "Kur'an", icon: 'book', color: '#2E7D32', screen: 'QuranReader' },
    { id: 'hadith', label: 'Hadis', icon: 'library', color: '#1565C0', screen: 'HadithReader' },
    { id: 'ilmihal', label: 'İlmihal', icon: 'document-text', color: '#7B1FA2', screen: 'IlmihalReader' },
  ];

  return (
    <SafeAreaView style={styles.appWrapper} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={homeStyles.container}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Verse of the Day */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionTitleRow}>
            <View style={[homeStyles.sectionIcon, { backgroundColor: '#2E7D3218' }]}>
              <Ionicons name="book" size={16} color="#2E7D32" />
            </View>
            <Text style={homeStyles.sectionTitle}>Günün Ayeti</Text>
          </View>

          {loadingVerse ? (
            <View style={homeStyles.loadingCard}>
              <ActivityIndicator size="small" color="#256FA2" />
              <Text style={homeStyles.loadingText}>Yükleniyor...</Text>
            </View>
          ) : dailyVerse ? (
            <TouchableOpacity
              style={[homeStyles.contentCard, homeStyles.quranCard]}
              onPress={handleVersePress}
              activeOpacity={0.7}
            >
              <Text style={homeStyles.cardSource}>
                {dailyVerse.surahName} {dailyVerse.surahId}:{dailyVerse.verseId}
              </Text>
              <Text style={homeStyles.cardText} numberOfLines={6}>
                "{dailyVerse.text}"
              </Text>
              <View style={homeStyles.cardActions}>
                <View style={homeStyles.readMore}>
                  <Text style={[homeStyles.readMoreText, { color: '#2E7D32' }]}>Oku</Text>
                  <Ionicons name="chevron-forward" size={14} color="#2E7D32" />
                </View>
                <TouchableOpacity
                  onPress={handleShareVerse}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="share-outline" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={homeStyles.errorCard}>
              <Text style={homeStyles.errorText}>Ayet yüklenemedi</Text>
            </View>
          )}
        </View>

        {/* Hadith of the Day */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionTitleRow}>
            <View style={[homeStyles.sectionIcon, { backgroundColor: '#1565C018' }]}>
              <Ionicons name="library" size={16} color="#1565C0" />
            </View>
            <Text style={homeStyles.sectionTitle}>Günün Hadisi</Text>
          </View>

          {loadingHadith ? (
            <View style={homeStyles.loadingCard}>
              <ActivityIndicator size="small" color="#256FA2" />
              <Text style={homeStyles.loadingText}>Yükleniyor...</Text>
            </View>
          ) : dailyHadith ? (
            <TouchableOpacity
              style={[homeStyles.contentCard, homeStyles.hadithCard]}
              onPress={handleHadithPress}
              activeOpacity={0.7}
            >
              <Text style={homeStyles.cardSource}>
                Sahih Bukhari #{dailyHadith.number}
              </Text>
              <Text style={homeStyles.cardText} numberOfLines={6}>
                "{dailyHadith.text}"
              </Text>
              <View style={homeStyles.cardActions}>
                <View style={homeStyles.readMore}>
                  <Text style={[homeStyles.readMoreText, { color: '#1565C0' }]}>Oku</Text>
                  <Ionicons name="chevron-forward" size={14} color="#1565C0" />
                </View>
                <TouchableOpacity
                  onPress={handleShareHadith}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="share-outline" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={homeStyles.errorCard}>
              <Text style={homeStyles.errorText}>Hadis yüklenemedi</Text>
            </View>
          )}
        </View>

        {/* Quick Access */}
        <View style={homeStyles.section}>
          <View style={homeStyles.sectionTitleRow}>
            <View style={[homeStyles.sectionIcon, { backgroundColor: '#256FA218' }]}>
              <Ionicons name="apps" size={16} color="#256FA2" />
            </View>
            <Text style={homeStyles.sectionTitle}>Hızlı Erişim</Text>
          </View>

          <View style={homeStyles.quickAccessRow}>
            {quickAccessItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={homeStyles.quickAccessButton}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <View style={[homeStyles.quickAccessIcon, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={homeStyles.quickAccessLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const homeStyles = {
  container: {
    flex: 1,
    backgroundColor: '#bbe1fa',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 35,
  },
  headerSettingsButton: {
    marginRight: 16,
    padding: 6,
  },
  headerBanner: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    borderRadius: 7,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#bbe1fa',
  },
  // Sections
  section: {
    marginBottom: 18,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b262c',
  },
  // Content Cards
  contentCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  quranCard: {
    borderLeftColor: '#2E7D32',
  },
  hadithCard: {
    borderLeftColor: '#1565C0',
  },
  cardSource: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 2,
  },
  // Loading / Error
  loadingCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: '#888',
  },
  errorCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 13,
    color: '#999',
  },
  // Quick Access
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 14,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
};

export default NewHomeScreen;
