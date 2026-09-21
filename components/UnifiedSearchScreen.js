import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from '../i18n';
import { SettingsContext } from '../settingsContext';
import styles from '../styles';

const { searchAll } = require('../utils/searchIndex');

const UnifiedSearchScreen = ({ navigation }) => {
  const { settings, fontScale } = useContext(SettingsContext);
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;

    Keyboard.dismiss();
    setIsLoading(true);
    setHasSearched(true);

    try {
      const searchResults = await searchAll(trimmed, 30, settings.quranLanguage, settings.hadithLanguage);
      setResults(searchResults);
      setActiveTab('all');
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSourcePress = (source) => {
    if (source.type === 'quran') {
      navigation.navigate('QuranReader', {
        surah: source.surah,
        ayah: source.ayah,
      });
    } else if (source.type === 'ilmihal') {
      navigation.navigate('IlmihalReader', {
        chapterId: source.chapterId,
        sectionId: source.sectionId,
      });
    } else {
      navigation.navigate('HadithView', {
        collection: source.collection,
        hadithNumber: source.hadithNumber,
        text: source.text,
        book: source.book,
      });
    }
  };

  const filteredResults =
    activeTab === 'all' ? results : results.filter((r) => r.type === activeTab);

  const quranCount = results.filter((r) => r.type === 'quran').length;
  const hadithCount = results.filter((r) => r.type === 'hadith').length;
  const ilmihalCount = results.filter((r) => r.type === 'ilmihal').length;

  const renderResultCard = ({ item, index }) => {
    const isQuran = item.type === 'quran';
    const isIlmihal = item.type === 'ilmihal';

    const cardAccent = isQuran ? '#2E7D32' : isIlmihal ? '#7B1FA2' : '#1565C0';
    const iconName = isQuran ? 'book' : isIlmihal ? 'document-text' : 'library';

    const title = isQuran
      ? `${item.surahName} ${item.surah}:${item.ayah}`
      : isIlmihal
      ? item.sectionTitle
      : `${item.collection} #${item.hadithNumber}`;

    const typeLabel = isQuran ? t('quran') : isIlmihal ? t('ilmihal') : t('hadith');

    const currentScale = fontScale || 1;
    const badgeMinHeight = Math.round(24 * currentScale);
    const badgePaddingVertical = Math.max(4, Math.round(4 * Math.min(currentScale, 1.3)));
    const badgeRadius = Math.round(12 * Math.max(1, currentScale));
    const badgeIconSize = Math.round(13 * Math.min(currentScale, 1.3));

    return (
      <TouchableOpacity
        key={`result-${index}`}
        style={searchStyles.resultCard}
        onPress={() => handleSourcePress(item)}
        activeOpacity={0.7}
      >
        <View style={searchStyles.resultHeader}>
          <View style={searchStyles.resultHeaderLeft}>
            <View
              style={[
                searchStyles.typeBadge,
                {
                  backgroundColor: cardAccent + '18',
                  minHeight: badgeMinHeight,
                  paddingVertical: badgePaddingVertical,
                  borderRadius: badgeRadius,
                },
              ]}
            >
              <Ionicons name={iconName} size={badgeIconSize} color={cardAccent} />
              <Text style={[searchStyles.typeBadgeText, { color: cardAccent }]}>
                {typeLabel}
              </Text>
            </View>
            <Text style={searchStyles.resultTitle} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </View>
        <Text style={searchStyles.resultText} numberOfLines={3}>
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (isLoading) return null;

    if (!hasSearched) {
      return (
        <View style={searchStyles.emptyState}>
          <Ionicons name="search" size={60} color="#ccc" />
          <Text style={searchStyles.emptyTitle}>{t('searchPromptTitle')}</Text>
          <Text style={searchStyles.emptySubtitle}>
            {t('searchPromptSubtitle')}
          </Text>
        </View>
      );
    }

    return (
      <View style={searchStyles.emptyState}>
        <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
        <Text style={searchStyles.emptyTitle}>{t('noResults')}</Text>
        <Text style={searchStyles.emptySubtitle}>
          {t('tryDifferentKeywords')}
        </Text>
      </View>
    );
  };

  const TabButton = ({ tab, label, count, color }) => {
    const isActive = activeTab === tab;
    const currentScale = fontScale || 1;
    const iconName = tab === 'quran' ? 'book' : tab === 'hadith' ? 'library' : tab === 'ilmihal' ? 'document-text' : null;
    const iconSize = Math.round(16 * Math.min(currentScale, 1.3));
    const chipMinHeight = Math.round(36 * currentScale);
    const chipPaddingVertical = Math.max(8, Math.round(8 * Math.min(currentScale, 1.3)));
    const chipRadius = Math.round(20 * Math.max(1, currentScale));

    return (
      <TouchableOpacity
        style={[
          searchStyles.tabButton,
          {
            minHeight: chipMinHeight,
            paddingVertical: chipPaddingVertical,
            borderRadius: chipRadius,
          },
          isActive ? searchStyles.tabButtonActive : searchStyles.tabButtonInactive,
        ]}
        onPress={() => setActiveTab(tab)}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={iconSize}
            color={isActive ? '#fff' : color}
            style={{ marginRight: 6 }}
          />
        )}
        <Text
          style={[
            searchStyles.tabText,
            isActive ? searchStyles.tabTextActive : searchStyles.tabTextInactive,
          ]}
        >
          {label} {count !== undefined ? `(${count})` : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.appWrapper} key={`search-${fontScale}`}>
      <View style={searchStyles.container}>
        {/* Search Bar */}
        <View style={searchStyles.searchBarContainer}>
          <View style={searchStyles.searchInputWrapper}>
            <Ionicons name="search" size={20} color="#999" style={searchStyles.searchIcon} />
            <TextInput
              style={searchStyles.searchInput}
              placeholder={t('searchPlaceholder')}
              placeholderTextColor="#999"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCorrect={false}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => { setQuery(''); setResults([]); setHasSearched(false); }}>
                <Ionicons name="close-circle" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[searchStyles.searchButton, (!query.trim() || isLoading) && searchStyles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={!query.trim() || isLoading}
          >
            <Text style={searchStyles.searchButtonText}>{t('searchButton')}</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        {hasSearched && results.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={searchStyles.tabBarScroll}
            contentContainerStyle={searchStyles.tabBar}
          >
            <TabButton tab="all" label={t('all')} count={results.length} color="#256FA2" />
            <TabButton tab="quran" label={t('quran')} count={quranCount} color="#2E7D32" />
            <TabButton tab="hadith" label={t('hadith')} count={hadithCount} color="#1565C0" />
            <TabButton tab="ilmihal" label={t('ilmihal')} count={ilmihalCount} color="#7B1FA2" />
          </ScrollView>
        )}

        {/* Loading */}
        {isLoading && (
          <View style={searchStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#256FA2" />
            <Text style={searchStyles.loadingText}>{t('searching')}</Text>
          </View>
        )}

        {/* Results */}
        {filteredResults.length > 0 ? (
          <FlatList
            data={filteredResults}
            renderItem={renderResultCard}
            keyExtractor={(item, index) => `${item.type}-${index}`}
            contentContainerStyle={searchStyles.resultsList}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />
        ) : (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              {renderEmptyState()}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
};

const searchStyles = {
  container: {
    flex: 1,
    backgroundColor: '#bbe1fa',
  },
  searchBarContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#256FA2',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchButtonDisabled: {
    backgroundColor: '#ccc',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  tabBarScroll: {
    flexGrow: 0,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: '#256FA2',
  },
  tabButtonInactive: {
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabTextInactive: {
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 15,
  },
  resultsList: {
    padding: 12,
    paddingBottom: 30,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginRight: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    flex: 1,
  },
  resultText: {
    fontSize: 14,
    color: '#555',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
};

export default UnifiedSearchScreen;
