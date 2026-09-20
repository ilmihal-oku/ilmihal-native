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
import { BookmarkContext } from '../bookmarkContext';
import { SettingsContext } from '../settingsContext';
import styles from '../styles';

// Cache for surah data (keyed by language)
let surahsCache = {};

const QuranReaderScreen = ({ navigation, route }) => {
  // Get optional params for deep linking from search
  const initialSurah = route?.params?.surah;
  const initialVerse = route?.params?.ayah;
  
  const { store, updateStore } = useContext(BookmarkContext);
  const { settings, getQuranUrl, getQuranLanguageInfo } = useContext(SettingsContext);
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const flatListRef = useRef(null);
  const hasAppliedInitialVerse = useRef(false); // Track if initial verse was applied

  const languageInfo = getQuranLanguageInfo();

  // Configure navigation options (gestureEnabled and headerRight language selector)
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !selectedSurah,
      headerRight: () => (
        <TouchableOpacity
          style={readerStyles.headerLangButton}
          onPress={() => navigation.navigate('Settings', { type: 'quran' })}
          activeOpacity={0.7}
        >
          <Ionicons name="globe-outline" size={16} color="#FFF" style={{ marginRight: 4 }} />
          <Text style={readerStyles.headerLangText}>{languageInfo.name}</Text>
          <Ionicons name="chevron-down" size={12} color="#FFF" style={{ marginLeft: 3 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedSurah, languageInfo.name]);

  // Reload when language changes
  useEffect(() => {
    loadQuranData();
  }, [settings.quranLanguage]);

  const loadQuranData = async () => {
    setLoading(true);
    const langCode = settings.quranLanguage;
    
    try {
      if (!surahsCache[langCode]) {
        const url = getQuranUrl();
        const response = await fetch(url);
        surahsCache[langCode] = await response.json();
      }
      const newSurahs = surahsCache[langCode];
      setSurahs(newSurahs);

      // Keep current surah open and update with translated verses
      setSelectedSurah(prev => {
        if (!prev) return null;
        return newSurahs.find(s => s.id === prev.id) || prev;
      });
      
      // If we have initial params and haven't applied them yet, navigate to that surah/verse
      if (initialSurah && newSurahs && !hasAppliedInitialVerse.current) {
        const surah = newSurahs.find(s => s.id === initialSurah);
        if (surah) {
          setSelectedSurah(surah);
          if (initialVerse) {
            setSelectedVerse(initialVerse);
            hasAppliedInitialVerse.current = true;
          }
        }
      }
    } catch (error) {
      console.error('Failed to load Quran:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set selected verse when coming from search (only once)
  useEffect(() => {
    if (selectedSurah && initialVerse && !hasAppliedInitialVerse.current) {
      setSelectedVerse(initialVerse);
      hasAppliedInitialVerse.current = true;
    }
  }, [selectedSurah, initialVerse]);

  const handleShare = async (verse) => {
    try {
      await Share.share({
        message: `${selectedSurah.transliteration} (${selectedSurah.id}:${verse.id})\n\n"${verse.translation}"\n\n- Kur'an-ı Kerim`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const isVerseFavorited = (verse) => {
    const quranFavorites = store?.quran || [];
    return quranFavorites.some(
      fav => fav.surah === selectedSurah.id && fav.ayah === verse.id
    );
  };

  const handleAddFavorite = (verse) => {
    const quranFavorites = store?.quran || [];
    
    // Check if already favorited
    const existingIndex = quranFavorites.findIndex(
      fav => fav.surah === selectedSurah.id && fav.ayah === verse.id
    );
    
    if (existingIndex >= 0) {
      // Remove from favorites
      const newFavorites = [...quranFavorites];
      newFavorites.splice(existingIndex, 1);
      updateStore({ ...store, quran: newFavorites });
    } else {
      // Add to favorites
      const newFavorite = {
        surah: selectedSurah.id,
        ayah: verse.id,
        surahName: selectedSurah.transliteration,
        text: verse.translation,
        arabicText: verse.text
      };
      updateStore({ ...store, quran: [...quranFavorites, newFavorite] });
    }
  };

  const renderSurahItem = ({ item }) => (
    <TouchableOpacity
      style={readerStyles.surahItem}
      onPress={() => {
        setSelectedSurah(item);
        setSelectedVerse(null);
        setHasScrolled(true); // Mark as scrolled so it doesn't try to scroll to old verse
      }}
    >
      <View style={readerStyles.surahNumber}>
        <Text style={readerStyles.surahNumberText}>{item.id}</Text>
      </View>
      <View style={readerStyles.surahInfo}>
        <Text style={readerStyles.surahName}>{item.transliteration}</Text>
        <Text style={readerStyles.surahTranslation}>{item.translation}</Text>
        <Text style={readerStyles.surahMeta}>
          {item.type} • {item.total_verses} ayet
        </Text>
      </View>
      <Text style={readerStyles.arabicName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderVerseItem = ({ item }) => {
    const isSelected = selectedVerse === item.id;
    const isFavorited = isVerseFavorited(item);
    
    return (
      <TouchableOpacity
        style={[
          readerStyles.verseItem,
          isSelected && readerStyles.verseItemSelected
        ]}
        onPress={() => setSelectedVerse(isSelected ? null : item.id)}
        onLongPress={() => handleAddFavorite(item)}
        activeOpacity={0.7}
        delayLongPress={400}
      >
        {/* Left column: verse number + heart */}
        <View style={readerStyles.verseLeftColumn}>
          <View style={[
            readerStyles.verseNumber,
            isSelected && readerStyles.verseNumberSelected
          ]}>
            <Text style={[
              readerStyles.verseNumberText,
              isSelected && readerStyles.verseNumberTextSelected
            ]}>{item.id}</Text>
          </View>
          
          {/* Heart icon - filled if favorited, outline if selected but not favorited */}
          {isFavorited ? (
            <TouchableOpacity 
              style={readerStyles.heartButton}
              onPress={() => handleAddFavorite(item)}
            >
              <Ionicons name="heart" size={24} color="#e91e63" />
            </TouchableOpacity>
          ) : isSelected ? (
            <TouchableOpacity 
              style={readerStyles.heartButton}
              onPress={() => handleAddFavorite(item)}
            >
              <Ionicons name="heart-outline" size={24} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* Right column: content */}
        <View style={readerStyles.verseContent}>
          <Text style={readerStyles.arabicText}>{item.text}</Text>
          <Text style={[
            readerStyles.translationText,
            isSelected && readerStyles.translationTextSelected
          ]}>{item.translation}</Text>
          
          {/* Share button - only show when selected */}
          {isSelected && (
            <TouchableOpacity 
              style={readerStyles.shareButtonRow}
              onPress={() => handleShare(item)}
            >
              <Ionicons name="share-outline" size={18} color="#256FA2" />
              <Text style={readerStyles.shareText}>Paylaş</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.appWrapper}>
        <View style={readerStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#256FA2" />
          <Text style={readerStyles.loadingText}>Kur'an yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (selectedSurah) {
    // Scroll after layout is complete - only for initial deep link navigation
    const handleLayout = () => {
      // Only scroll if we're navigating from a deep link AND haven't scrolled yet for this navigation
      if (selectedVerse && !hasScrolled && flatListRef.current) {
        const index = selectedVerse - 1;
        if (index >= 0 && index < selectedSurah.verses.length) {
          setTimeout(() => {
            try {
              flatListRef.current?.scrollToIndex({
                index: index,
                animated: false,
                viewPosition: 0.1 // Show near top of screen
              });
            } catch (e) {
              // Fallback: just scroll to approximate position
              console.log('scrollToIndex failed, using offset');
            }
            setHasScrolled(true);
          }, 100);
        }
      }
    };
    
    return (
      <SafeAreaView style={styles.appWrapper}>
        <View style={readerStyles.header}>
          <TouchableOpacity
            style={readerStyles.backButton}
            onPress={() => {
              setSelectedSurah(null);
              setSelectedVerse(null);
              setHasScrolled(false);
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#256FA2" />
          </TouchableOpacity>
          <View style={readerStyles.headerInfo}>
            <Text style={readerStyles.headerTitle}>{selectedSurah.transliteration}</Text>
            <Text style={readerStyles.headerSubtitle}>{selectedSurah.translation}</Text>
          </View>
          <Text style={readerStyles.headerArabic}>{selectedSurah.name}</Text>
        </View>
        <FlatList
          key={`surah-${selectedSurah.id}-${settings.quranLanguage}`}
          ref={flatListRef}
          data={selectedSurah.verses}
          renderItem={renderVerseItem}
          keyExtractor={item => `verse-${item.id}-${settings.quranLanguage}`}
          contentContainerStyle={readerStyles.listContent}
          extraData={`${selectedVerse}-${settings.quranLanguage}`}
          onLayout={handleLayout}
          initialNumToRender={selectedSurah.verses.length}
          onScrollToIndexFailed={(info) => {
            // Retry after a short delay
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: false,
                viewPosition: 0.1
              });
            }, 500);
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={readerStyles.titleBar}>
        <Ionicons name="book" size={24} color="#256FA2" />
        <View style={readerStyles.titleInfo}>
          <Text style={readerStyles.titleText}>Kur'an-ı Kerim</Text>
          <Text style={readerStyles.titleSubtext}>114 Sure</Text>
        </View>
      </View>
      <FlatList
        data={surahs}
        renderItem={renderSurahItem}
        keyExtractor={item => `surah-${item.id}-${settings.quranLanguage}`}
        extraData={surahs}
        contentContainerStyle={readerStyles.listContent}
      />
    </SafeAreaView>
  );
};

const readerStyles = {
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
  headerLangButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 12,
  },
  headerLangText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleInfo: {
    marginLeft: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#256FA2',
  },
  titleSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
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
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  headerArabic: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
    color: '#256FA2',
  },
  listContent: {
    padding: 10,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#256FA2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  surahInfo: {
    flex: 1,
    marginLeft: 15,
  },
  surahName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  surahTranslation: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  surahMeta: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  arabicName: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
    color: '#256FA2',
  },
  verseItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  verseItemSelected: {
    backgroundColor: '#e8f5e9',
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  verseLeftColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  verseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4fc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumberText: {
    color: '#256FA2',
    fontSize: 12,
    fontWeight: '600',
  },
  verseNumberSelected: {
    backgroundColor: '#2E7D32',
  },
  verseNumberTextSelected: {
    color: '#fff',
  },
  heartButton: {
    marginTop: 8,
    padding: 4,
  },
  verseContent: {
    flex: 1,
  },
  arabicText: {
    fontSize: 22,
    lineHeight: 36,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'serif',
    color: '#333',
    textAlign: 'right',
    marginBottom: 10,
  },
  translationText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  translationTextSelected: {
    color: '#1b5e20',
    fontWeight: '500',
  },
  shareButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#c8e6c9',
  },
  shareText: {
    marginLeft: 6,
    color: '#256FA2',
    fontSize: 14,
    fontWeight: '500',
  },
};

export default QuranReaderScreen;
