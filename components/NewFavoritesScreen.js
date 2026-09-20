import { useContext, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from '../i18n';
import { BookmarkContext } from '../bookmarkContext';
import styles from '../styles';

const NewFavoritesScreen = ({ navigation }) => {
  const { store } = useContext(BookmarkContext);
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  // Categorize favorites
  const quranFavorites = store?.quran || [];
  const hadithFavorites = store?.hadith || [];
  const ilmihalFavorites = store?.ilmihal || [];

  const categories = [
    { id: 'all', label: t('all'), count: quranFavorites.length + hadithFavorites.length + ilmihalFavorites.length },
    { id: 'quran', label: t('quran'), count: quranFavorites.length, icon: 'book', color: '#2E7D32' },
    { id: 'hadith', label: t('hadith'), count: hadithFavorites.length, icon: 'library', color: '#1565C0' },
    { id: 'ilmihal', label: t('ilmihal'), count: ilmihalFavorites.length, icon: 'document-text', color: '#7B1FA2' },
  ];

  const getActiveItems = () => {
    switch (activeCategory) {
      case 'quran':
        return quranFavorites.map(item => ({ ...item, type: 'quran' }));
      case 'hadith':
        return hadithFavorites.map(item => ({ ...item, type: 'hadith' }));
      case 'ilmihal':
        return ilmihalFavorites.map(item => ({ ...item, type: 'ilmihal' }));
      case 'all':
      default:
        return [
          ...quranFavorites.map(item => ({ ...item, type: 'quran' })),
          ...hadithFavorites.map(item => ({ ...item, type: 'hadith' })),
          ...ilmihalFavorites.map(item => ({ ...item, type: 'ilmihal' })),
        ];
    }
  };

  const handleItemPress = (item) => {
    if (item.type === 'quran') {
      navigation.navigate('QuranReader', {
        surah: item.surah,
        ayah: item.ayah
      });
    } else if (item.type === 'hadith') {
      navigation.navigate('HadithView', {
        collection: item.collection,
        hadithNumber: item.hadithNumber,
        text: item.text,
        book: item.book
      });
    } else if (item.type === 'ilmihal') {
      navigation.navigate('IlmihalReader', {
        chapterId: item.chapterId,
        sectionId: item.sectionId
      });
    }
  };

  const renderCategoryTab = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        favStyles.categoryTab,
        activeCategory === category.id && favStyles.categoryTabActive
      ]}
      onPress={() => setActiveCategory(category.id)}
    >
      {category.icon && (
        <Ionicons 
          name={category.icon} 
          size={16} 
          color={activeCategory === category.id ? '#fff' : category.color} 
          style={{ marginRight: 6 }}
        />
      )}
      <Text style={[
        favStyles.categoryText,
        activeCategory === category.id && favStyles.categoryTextActive
      ]}>
        {category.label} ({category.count})
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const isQuran = item.type === 'quran';
    const isIlmihal = item.type === 'ilmihal';
    
    const badgeColor = isQuran ? '#2E7D32' : isIlmihal ? '#7B1FA2' : '#1565C0';
    const iconName = isQuran ? 'book' : isIlmihal ? 'document-text' : 'library';
    
    return (
      <TouchableOpacity
        style={favStyles.itemCard}
        onPress={() => handleItemPress(item)}
      >
        <View style={[
          favStyles.itemBadge,
          { backgroundColor: badgeColor }
        ]}>
          <Ionicons 
            name={iconName} 
            size={14} 
            color="#fff" 
          />
        </View>
        <View style={favStyles.itemContent}>
          <Text style={favStyles.itemTitle}>
            {isQuran 
              ? `${item.surahName} ${item.surah}:${item.ayah}`
              : isIlmihal
              ? item.sectionTitle
              : `${item.collection} #${item.hadithNumber}`
            }
          </Text>
          <Text style={favStyles.itemText} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>
    );
  };

  const items = getActiveItems();

  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={favStyles.container}>
        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={favStyles.categoryContainer}
          contentContainerStyle={favStyles.categoryContentContainer}
        >
          {categories.map(renderCategoryTab)}
        </ScrollView>

        {/* Favorites List */}
        {items.length > 0 ? (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => `fav-${item.type}-${index}`}
            contentContainerStyle={favStyles.listContent}
          />
        ) : (
          <View style={favStyles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={favStyles.emptyTitle}>{t('noFavoritesYet')}</Text>
            <Text style={favStyles.emptySubtitle}>
              {t('noFavoritesSubtitle')}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const favStyles = {
  container: {
    flex: 1,
    backgroundColor: '#bbe1fa',
  },
  categoryContainer: {
    flexGrow: 0,
  },
  categoryContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  categoryTabActive: {
    backgroundColor: '#256FA2',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  itemBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
};

export default NewFavoritesScreen;
