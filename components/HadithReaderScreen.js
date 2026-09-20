import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Share,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from '../i18n';
import { BookmarkContext } from '../bookmarkContext';
import { SettingsContext } from '../settingsContext';
import styles from '../styles';

const HadithReaderScreen = ({ navigation }) => {
  const { store, updateStore } = useContext(BookmarkContext);
  const { settings, getHadithUrl, getHadithLanguageInfo } = useContext(SettingsContext);
  const { t } = useTranslation();
  const [hadithData, setHadithData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedHadith, setSelectedHadith] = useState(null);

  const languageInfo = getHadithLanguageInfo();

  // Configure navigation options (gestureEnabled and headerRight language selector)
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !selectedBook,
      headerRight: () => (
        <TouchableOpacity
          style={readerStyles.headerLangButton}
          onPress={() => navigation.navigate('Settings', { type: 'hadith' })}
          activeOpacity={0.7}
        >
          <Text style={{ marginRight: 4, fontSize: 14 }}>{languageInfo.flag || '🌐'}</Text>
          <Text style={readerStyles.headerLangText}>{languageInfo.name}</Text>
          <Ionicons name="chevron-down" size={12} color="#FFF" style={{ marginLeft: 3 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedBook, languageInfo.name]);

  // Reload when language changes
  useEffect(() => {
    loadHadithData();
  }, [settings.hadithLanguage]);

  const loadHadithData = async () => {
    setLoading(true);
    try {
      const url = getHadithUrl('bukhari');
      const response = await fetch(url);
      const data = await response.json();
      setHadithData(data);

      // Keep current book open and update with translated hadiths
      setSelectedBook(prev => {
        if (!prev) return null;
        const newBooks = getBooks(data);
        return newBooks.find(b => b.number === prev.number) || null;
      });
    } catch (error) {
      console.error('Failed to load Hadith:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group hadiths by book
  const getBooks = (data = hadithData) => {
    if (!data?.hadiths) return [];
    
    const books = {};
    for (const hadith of data.hadiths) {
      const bookNum = hadith.reference?.book || 0;
      if (!books[bookNum]) {
        books[bookNum] = {
          number: bookNum,
          name: hadithData.metadata?.sections?.[bookNum] || t('uncategorized'),
          hadiths: []
        };
      }
      books[bookNum].hadiths.push(hadith);
    }
    
    return Object.values(books).sort((a, b) => a.number - b.number);
  };

  const handleShare = async (hadith) => {
    try {
      await Share.share({
        message: `Sahih Bukhari #${hadith.hadithnumber}\n\n"${hadith.text}"\n\n- ${selectedBook.name}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const isHadithFavorited = (hadith) => {
    const hadithFavorites = store?.hadith || [];
    return hadithFavorites.some(
      fav => fav.collection === 'Sahih Bukhari' && fav.hadithNumber === hadith.hadithnumber
    );
  };

  const handleAddFavorite = (hadith) => {
    const hadithFavorites = store?.hadith || [];
    
    const existingIndex = hadithFavorites.findIndex(
      fav => fav.collection === 'Sahih Bukhari' && fav.hadithNumber === hadith.hadithnumber
    );
    
    if (existingIndex >= 0) {
      const newFavorites = [...hadithFavorites];
      newFavorites.splice(existingIndex, 1);
      updateStore({ ...store, hadith: newFavorites });
    } else {
      const newFavorite = {
        collection: 'Sahih Bukhari',
        hadithNumber: hadith.hadithnumber,
        text: hadith.text,
        book: selectedBook.number,
        bookName: selectedBook.name
      };
      updateStore({ ...store, hadith: [...hadithFavorites, newFavorite] });
    }
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={readerStyles.bookItem}
      onPress={() => {
        setSelectedBook(item);
        setSelectedHadith(null);
      }}
    >
      <View style={readerStyles.bookNumber}>
        <Text style={readerStyles.bookNumberText}>{item.number}</Text>
      </View>
      <View style={readerStyles.bookInfo}>
        <Text style={readerStyles.bookName}>{item.name}</Text>
        <Text style={readerStyles.bookMeta}>{item.hadiths.length} hadis</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const renderHadithItem = ({ item }) => {
    const isSelected = selectedHadith === item.hadithnumber;
    const isFavorited = isHadithFavorited(item);
    
    return (
      <TouchableOpacity
        style={[
          readerStyles.hadithItem,
          isSelected && readerStyles.hadithItemSelected
        ]}
        onPress={() => setSelectedHadith(isSelected ? null : item.hadithnumber)}
        onLongPress={() => handleAddFavorite(item)}
        activeOpacity={0.7}
        delayLongPress={400}
      >
        {/* Left column: hadith number + heart */}
        <View style={readerStyles.hadithLeftColumn}>
          <View style={[
            readerStyles.hadithNumber,
            isSelected && readerStyles.hadithNumberSelected
          ]}>
            <Text style={[
              readerStyles.hadithNumberText,
              isSelected && readerStyles.hadithNumberTextSelected
            ]}>#{item.hadithnumber}</Text>
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
        <View style={readerStyles.hadithContent}>
          <Text 
            style={[
              readerStyles.hadithText,
              isSelected && readerStyles.hadithTextSelected
            ]} 
            numberOfLines={isSelected ? undefined : 4}
          >
            {item.text}
          </Text>
          
          {/* Share button - only show when selected */}
          {isSelected && (
            <TouchableOpacity 
              style={readerStyles.shareButtonRow}
              onPress={() => handleShare(item)}
            >
              <Ionicons name="share-outline" size={18} color="#256FA2" />
              <Text style={readerStyles.shareText}>{t('share')}</Text>
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
          <Text style={readerStyles.loadingText}>{t('loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (selectedBook) {
    return (
      <SafeAreaView style={styles.appWrapper}>
        <View style={readerStyles.header}>
          <TouchableOpacity
            style={readerStyles.backButton}
            onPress={() => setSelectedBook(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#256FA2" />
          </TouchableOpacity>
          <View style={readerStyles.headerInfo}>
            <Text style={readerStyles.headerTitle}>{selectedBook.name}</Text>
            <Text style={readerStyles.headerSubtitle}>
              Book {selectedBook.number} • {selectedBook.hadiths.length} hadis
            </Text>
          </View>
        </View>
        <FlatList
          key={`book-${selectedBook.number}-${settings.hadithLanguage}`}
          data={selectedBook.hadiths}
          renderItem={renderHadithItem}
          keyExtractor={item => `hadith-${item.hadithnumber}-${settings.hadithLanguage}`}
          contentContainerStyle={readerStyles.listContent}
          extraData={`${selectedHadith}-${settings.hadithLanguage}`}
        />
      </SafeAreaView>
    );
  }

  const books = getBooks();

  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={readerStyles.titleBar}>
        <Ionicons name="library" size={24} color="#1565C0" />
        <View style={readerStyles.titleInfo}>
          <Text style={readerStyles.titleText}>{t('sahihBukhari')}</Text>
          <Text style={readerStyles.titleSubtext}>{t('hadithSubtitle', languageInfo.name)}</Text>
        </View>
      </View>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={item => `book-${item.number}-${settings.hadithLanguage}`}
        contentContainerStyle={readerStyles.listContent}
        extraData={hadithData}
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
    color: '#1565C0',
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
  listContent: {
    padding: 10,
  },
  bookItem: {
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
  bookNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#256FA2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 15,
  },
  bookName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  bookMeta: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  hadithItem: {
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
  hadithItemSelected: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#1565C0',
  },
  hadithLeftColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  hadithNumber: {
    backgroundColor: '#e8f4fc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hadithNumberSelected: {
    backgroundColor: '#1565C0',
  },
  hadithNumberText: {
    color: '#256FA2',
    fontSize: 12,
    fontWeight: '600',
  },
  hadithNumberTextSelected: {
    color: '#fff',
  },
  heartButton: {
    marginTop: 8,
    padding: 4,
  },
  hadithContent: {
    flex: 1,
  },
  hadithText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  hadithTextSelected: {
    color: '#0d47a1',
  },
  shareButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#bbdefb',
  },
  shareText: {
    marginLeft: 6,
    color: '#256FA2',
    fontSize: 14,
    fontWeight: '500',
  },
};

export default HadithReaderScreen;
