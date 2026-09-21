import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../settingsContext';
import styles from '../styles';

// Cache for hadith editions
const hadithEditionCache = {};

const HadithScreen = ({ navigation, route }) => {
  const { collection, hadithNumber, text: initialText, book, chapter, narrator } = route.params;
  const { settings, getHadithUrl, getHadithLanguageInfo, fontScale, getScaledLineHeight } = useContext(SettingsContext);
  const [hadithText, setHadithText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const languageInfo = getHadithLanguageInfo();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 14,
            marginRight: 12,
          }}
          onPress={() => navigation.navigate('Settings', { type: 'hadith' })}
          activeOpacity={0.7}
        >
          <Ionicons name="globe-outline" size={16} color="#FFF" style={{ marginRight: 4 }} />
          <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '600' }}>{languageInfo.name}</Text>
          <Ionicons name="chevron-down" size={12} color="#FFF" style={{ marginLeft: 3 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, languageInfo.name]);

  useEffect(() => {
    loadTranslatedHadith();
  }, [settings.hadithLanguage]);

  const loadTranslatedHadith = async () => {
    const lang = settings.hadithLanguage;
    if (hadithEditionCache[lang]) {
      const found = hadithEditionCache[lang].hadiths?.find(h => h.hadithnumber === hadithNumber);
      if (found?.text) {
        setHadithText(found.text);
        return;
      }
    }

    setLoading(true);
    try {
      const url = getHadithUrl('bukhari');
      const response = await fetch(url);
      const data = await response.json();
      hadithEditionCache[lang] = data;
      const found = data?.hadiths?.find(h => h.hadithnumber === hadithNumber);
      if (found?.text) {
        setHadithText(found.text);
      }
    } catch (error) {
      console.error('Failed to load translated hadith:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${collection} #${hadithNumber}\n\n"${hadithText}"\n\n- ${collection}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.appWrapper} key={`hadith-view-${fontScale}`}>
      <ScrollView style={hadithStyles.container}>
        {/* Header Card */}
        <View style={hadithStyles.headerCard}>
          <View style={hadithStyles.collectionBadge}>
            <Ionicons name="document-text" size={24} color="#fff" />
          </View>
          <View style={hadithStyles.headerText}>
            <Text style={hadithStyles.collectionName}>{collection}</Text>
            <Text style={hadithStyles.hadithNumber}>Hadith #{hadithNumber}</Text>
          </View>
          <TouchableOpacity style={hadithStyles.shareButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={22} color="#256FA2" />
          </TouchableOpacity>
        </View>

        {/* Book/Chapter Info */}
        {(book || chapter) && (
          <View style={hadithStyles.metaCard}>
            {book && (
              <View style={hadithStyles.metaItem}>
                <Ionicons name="folder-outline" size={16} color="#666" />
                <Text style={hadithStyles.metaText}>Book {book}</Text>
              </View>
            )}
            {chapter && (
              <View style={hadithStyles.metaItem}>
                <Ionicons name="bookmark-outline" size={16} color="#666" />
                <Text style={hadithStyles.metaText}>Chapter {chapter}</Text>
              </View>
            )}
          </View>
        )}

        {/* Hadith Text */}
        <View style={hadithStyles.textCard}>
          <Text style={hadithStyles.textLabel}>Hadith Text</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#256FA2" style={{ paddingVertical: 20 }} />
          ) : (
            <Text style={[hadithStyles.hadithText, { lineHeight: getScaledLineHeight(16, 1.55) }]}>{hadithText}</Text>
          )}
        </View>

        {/* Narrator */}
        {narrator && (
          <View style={hadithStyles.narratorCard}>
            <Ionicons name="person-outline" size={16} color="#256FA2" />
            <Text style={hadithStyles.narratorText}>Narrated by: {narrator}</Text>
          </View>
        )}

        {/* Reference */}
        <View style={hadithStyles.referenceContainer}>
          <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
          <Text style={hadithStyles.referenceText}>
            {collection} • Hadith {hadithNumber}
          </Text>
        </View>

        {/* Authenticity Note */}
        <View style={hadithStyles.authenticityNote}>
          <Text style={hadithStyles.authenticityText}>
            This hadith is from {collection}, one of the most authentic collections of Prophetic traditions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const hadithStyles = {
  container: {
    flex: 1,
    backgroundColor: '#bbe1fa',
    padding: 15,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collectionBadge: {
    minWidth: 50,
    minHeight: 50,
    borderRadius: 25,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: 15,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  hadithNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  shareButton: {
    padding: 10,
  },
  metaCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },
  textCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  textLabel: {
    fontSize: 12,
    color: '#256FA2',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  hadithText: {
    fontSize: 16,
    color: '#333',
  },
  narratorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4fc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  narratorText: {
    marginLeft: 8,
    color: '#256FA2',
    fontSize: 14,
    fontStyle: 'italic',
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  referenceText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  authenticityNote: {
    backgroundColor: '#f0f7f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  authenticityText: {
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
  },
};

export default HadithScreen;
