import { useContext, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    SafeAreaView,
    Share,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../settingsContext';
import styles from '../styles';

const QURAN_URL = 'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json';

// Cache for surah data
let surahsCache = null;

const QuranScreen = ({ route }) => {
  const { surah, ayah, surahName } = route.params;
  const { fontScale, getScaledLineHeight } = useContext(SettingsContext);
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highlightedAyah, setHighlightedAyah] = useState(ayah);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadSurahData();
  }, [surah]);

  const loadSurahData = async () => {
    try {
      // Use cache if available
      if (!surahsCache) {
        const response = await fetch(QURAN_URL);
        surahsCache = await response.json();
      }
      
      // Find the surah by ID
      const foundSurah = surahsCache.find(s => s.id === surah);
      if (foundSurah) {
        setSurahData(foundSurah);
      }
    } catch (error) {
      console.error('Failed to load surah:', error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the selected ayah after data loads
  useEffect(() => {
    if (surahData && flatListRef.current && ayah > 1) {
      // Small delay to ensure list is rendered
      setTimeout(() => {
        const index = ayah - 1; // Convert to 0-based index
        flatListRef.current.scrollToIndex({
          index: Math.max(0, index - 1), // Show one verse before for context
          animated: true,
          viewPosition: 0.2
        });
      }, 300);
    }
  }, [surahData, ayah]);

  const handleShare = async (verse) => {
    try {
      await Share.share({
        message: `${surahData?.transliteration || surahName} (${surah}:${verse.id})\n\n"${verse.translation}"\n\n- Holy Quran`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleVersePress = (verseId) => {
    setHighlightedAyah(verseId);
    
    // Scroll to the tapped verse with animation
    const index = verseId - 1; // Convert to 0-based index
    if (flatListRef.current && index >= 0) {
      flatListRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.3 // Position verse 30% from top
      });
    }
  };

  const renderVerse = ({ item }) => {
    const isHighlighted = item.id === highlightedAyah;
    
    return (
      <TouchableOpacity 
        style={[
          quranStyles.verseCard,
          isHighlighted && quranStyles.highlightedCard
        ]}
        onPress={() => handleVersePress(item.id)}
        activeOpacity={0.7}
      >
        {/* Verse Number Badge */}
        <View style={[
          quranStyles.verseBadge,
          isHighlighted && quranStyles.highlightedBadge
        ]}>
          <Text style={[
            quranStyles.verseNumber,
            isHighlighted && quranStyles.highlightedText
          ]}>{item.id}</Text>
        </View>

        {/* Content */}
        <View style={quranStyles.verseContent}>
          {/* Arabic */}
          <Text style={[quranStyles.arabicText, { lineHeight: getScaledLineHeight(22, 1.65) }]}>{item.text}</Text>
          
          {/* Divider */}
          <View style={quranStyles.divider} />
          
          {/* Translation */}
          <Text style={[
            quranStyles.translationText,
            { lineHeight: getScaledLineHeight(15, 1.55) },
            isHighlighted && quranStyles.highlightedTranslation
          ]}>{item.translation}</Text>
        </View>

        {/* Share button */}
        <TouchableOpacity 
          style={quranStyles.shareButton} 
          onPress={() => handleShare(item)}
        >
          <Ionicons name="share-outline" size={18} color="#888" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.appWrapper}>
        <View style={quranStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#256FA2" />
          <Text style={quranStyles.loadingText}>Loading surah...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!surahData) {
    return (
      <SafeAreaView style={styles.appWrapper}>
        <View style={quranStyles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#888" />
          <Text style={quranStyles.errorText}>Failed to load surah data</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.appWrapper} key={`quran-view-${fontScale}`}>
      {/* Surah Header */}
      <View style={quranStyles.header}>
        <View style={quranStyles.headerInfo}>
          <Text style={quranStyles.headerTitle}>
            {surahData.transliteration}
          </Text>
          <Text style={quranStyles.headerSubtitle}>
            {surahData.translation} • {surahData.total_verses} verses
          </Text>
        </View>
        <Text style={quranStyles.headerArabic}>{surahData.name}</Text>
      </View>

      {/* Scroll hint */}
      <View style={quranStyles.hintBar}>
        <Ionicons name="arrows-vertical" size={14} color="#666" style={{marginRight: 6}} />
        <Text style={quranStyles.hintText}>
          Scroll to read surrounding verses • Verse {ayah} highlighted
        </Text>
      </View>

      {/* Verses List */}
      <FlatList
        ref={flatListRef}
        data={surahData.verses}
        renderItem={renderVerse}
        keyExtractor={item => `verse-${item.id}`}
        contentContainerStyle={quranStyles.listContent}
        initialNumToRender={20}
        onScrollToIndexFailed={(info) => {
          // Fallback if scroll fails
          setTimeout(() => {
            flatListRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: true
            });
          }, 100);
        }}
      />
    </SafeAreaView>
  );
};

const quranStyles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbe1fa',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#256FA2',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbe1fa',
  },
  errorText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  headerArabic: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
    color: '#256FA2',
  },
  hintBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#e8f4fc',
    borderBottomWidth: 1,
    borderBottomColor: '#d0e8f5',
  },
  hintText: {
    fontSize: 13,
    color: '#666',
  },
  listContent: {
    padding: 12,
    paddingBottom: 30,
  },
  verseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  highlightedCard: {
    backgroundColor: '#e8f5e9',
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  verseBadge: {
    minWidth: 36,
    minHeight: 36,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 18,
    backgroundColor: '#e8f4fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  highlightedBadge: {
    backgroundColor: '#2E7D32',
  },
  verseNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#256FA2',
  },
  highlightedText: {
    color: '#fff',
  },
  verseContent: {
    flex: 1,
  },
  arabicText: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
    color: '#333',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  translationText: {
    fontSize: 15,
    color: '#444',
  },
  highlightedTranslation: {
    color: '#1b5e20',
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
    marginLeft: 8,
  },
};

export default QuranScreen;
