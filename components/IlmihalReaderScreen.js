import { useContext, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    Share,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BookmarkContext } from '../bookmarkContext';
import { book as ilmihal } from '../source';
import styles from '../styles';

const IlmihalReaderScreen = ({ navigation, route }) => {
  const initialChapterId = route?.params?.chapterId;
  const initialSectionId = route?.params?.sectionId;

  const { store, updateStore } = useContext(BookmarkContext);
  const [selectedChapter, setSelectedChapter] = useState(() => {
    if (initialChapterId) {
      return ilmihal.find(ch => ch.id === initialChapterId) || null;
    }
    return null;
  });
  const [expandedSection, setExpandedSection] = useState(initialSectionId || null);

  // Disable swipe gesture when viewing a chapter
  const isChapterView = !!selectedChapter;

  // Favorites helpers
  const isParaFavorited = (sectionTitle, text) => {
    const ilmihalFavs = store?.ilmihal || [];
    return ilmihalFavs.some(
      fav => fav.sectionTitle === sectionTitle && fav.text === text
    );
  };

  const handleToggleFavorite = (sectionTitle, chapterTitle, text) => {
    const ilmihalFavs = store?.ilmihal || [];
    const existingIndex = ilmihalFavs.findIndex(
      fav => fav.sectionTitle === sectionTitle && fav.text === text
    );

    if (existingIndex >= 0) {
      const newFavs = [...ilmihalFavs];
      newFavs.splice(existingIndex, 1);
      updateStore({ ...store, ilmihal: newFavs });
    } else {
      const newFav = {
        sectionTitle,
        chapterTitle,
        text,
        chapterId: selectedChapter.id,
        sectionId: expandedSection,
      };
      updateStore({ ...store, ilmihal: [...ilmihalFavs, newFav] });
    }
  };

  const handleShare = async (text, sectionTitle) => {
    try {
      await Share.share({
        message: `${sectionTitle}\n\n"${text.substring(0, 500)}${text.length > 500 ? '...' : ''}"\n\n- Büyük İslam İlmihali`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // ─── Chapter List ───
  const renderChapterItem = ({ item }) => (
    <TouchableOpacity
      style={ilmihalStyles.chapterItem}
      onPress={() => {
        setSelectedChapter(item);
        setExpandedSection(null);
      }}
    >
      <View style={ilmihalStyles.chapterNumber}>
        <Text style={ilmihalStyles.chapterNumberText}>{item.id}</Text>
      </View>
      <View style={ilmihalStyles.chapterInfo}>
        <Text style={ilmihalStyles.chapterName}>{item.chapterTitle}</Text>
        <Text style={ilmihalStyles.chapterMeta}>
          {item.chapterContent.length} bölüm
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  // ─── Section + Paragraphs ───
  const renderSectionItem = ({ item }) => {
    const isExpanded = expandedSection === item.id;

    return (
      <View style={ilmihalStyles.sectionContainer}>
        <TouchableOpacity
          style={[
            ilmihalStyles.sectionHeader,
            isExpanded && ilmihalStyles.sectionHeaderExpanded
          ]}
          onPress={() => setExpandedSection(isExpanded ? null : item.id)}
        >
          <View style={ilmihalStyles.sectionNumberBadge}>
            <Text style={ilmihalStyles.sectionNumberText}>{item.id}</Text>
          </View>
          <Text style={[
            ilmihalStyles.sectionTitle,
            isExpanded && ilmihalStyles.sectionTitleExpanded
          ]}>{item.sectionTitle}</Text>
          <Ionicons
            name={isExpanded ? 'chevron-down' : 'chevron-forward'}
            size={20}
            color={isExpanded ? '#7B1FA2' : '#999'}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={ilmihalStyles.paragraphsContainer}>
            {item.sectionContent.map((para, idx) => {
              const isFav = isParaFavorited(item.sectionTitle, para);
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    ilmihalStyles.paragraphItem,
                    isFav && ilmihalStyles.paragraphItemFav
                  ]}
                  onLongPress={() =>
                    handleToggleFavorite(
                      item.sectionTitle,
                      selectedChapter.chapterTitle,
                      para
                    )
                  }
                  activeOpacity={0.7}
                  delayLongPress={400}
                >
                  <Text style={ilmihalStyles.paragraphText}>{para}</Text>
                  <View style={ilmihalStyles.paragraphActions}>
                    <TouchableOpacity
                      style={ilmihalStyles.actionButton}
                      onPress={() =>
                        handleToggleFavorite(
                          item.sectionTitle,
                          selectedChapter.chapterTitle,
                          para
                        )
                      }
                    >
                      <Ionicons
                        name={isFav ? 'heart' : 'heart-outline'}
                        size={20}
                        color={isFav ? '#e91e63' : '#999'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={ilmihalStyles.actionButton}
                      onPress={() => handleShare(para, item.sectionTitle)}
                    >
                      <Ionicons name="share-outline" size={20} color="#7B1FA2" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  // ─── Chapter detail view (sections) ───
  if (selectedChapter) {
    return (
      <SafeAreaView style={styles.appWrapper}>
        <View style={ilmihalStyles.header}>
          <TouchableOpacity
            style={ilmihalStyles.backButton}
            onPress={() => {
              setSelectedChapter(null);
              setExpandedSection(null);
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#7B1FA2" />
          </TouchableOpacity>
          <View style={ilmihalStyles.headerInfo}>
            <Text style={ilmihalStyles.headerTitle} numberOfLines={2}>
              {selectedChapter.chapterTitle}
            </Text>
            <Text style={ilmihalStyles.headerSubtitle}>
              {selectedChapter.chapterContent.length} bölüm
            </Text>
          </View>
        </View>
        <FlatList
          data={selectedChapter.chapterContent}
          renderItem={renderSectionItem}
          keyExtractor={item => `section-${item.id}`}
          contentContainerStyle={ilmihalStyles.listContent}
        />
      </SafeAreaView>
    );
  }

  // ─── Top-level chapters list ───
  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={ilmihalStyles.titleBar}>
        <Ionicons name="document-text" size={24} color="#7B1FA2" />
        <View style={ilmihalStyles.titleInfo}>
          <Text style={ilmihalStyles.titleText}>İlmihal</Text>
          <Text style={ilmihalStyles.titleSubtext}>Büyük İslam İlmihali</Text>
        </View>
      </View>
      <FlatList
        data={ilmihal}
        renderItem={renderChapterItem}
        keyExtractor={item => `chapter-${item.id}`}
        contentContainerStyle={ilmihalStyles.listContent}
      />
    </SafeAreaView>
  );
};

const ilmihalStyles = {
  // Title bar
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
    color: '#7B1FA2',
  },
  titleSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  // Header (chapter detail)
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  listContent: {
    padding: 10,
    paddingBottom: 30,
  },
  // Chapter items
  chapterItem: {
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
  chapterNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B1FA2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  chapterInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chapterName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  chapterMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  // Section items
  sectionContainer: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeaderExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#7B1FA2',
  },
  sectionNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3e5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionNumberText: {
    color: '#7B1FA2',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sectionTitleExpanded: {
    color: '#7B1FA2',
    fontWeight: '600',
  },
  // Paragraphs
  paragraphsContainer: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paragraphItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  paragraphItemFav: {
    backgroundColor: '#fce4ec',
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  },
  paragraphActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
};

export default IlmihalReaderScreen;
