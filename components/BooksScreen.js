import { useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from '../i18n';
import { HADITH_LANGUAGES, QURAN_LANGUAGES, SettingsContext } from '../settingsContext';
import styles from '../styles';

const BooksScreen = ({ navigation }) => {
  const { settings, fontScale } = useContext(SettingsContext);
  const { t } = useTranslation();

  const currentHadithLanguage =
    HADITH_LANGUAGES.find((l) => l.code === settings.hadithLanguage)?.name || 'Türkçe';
  const currentQuranLanguage =
    QURAN_LANGUAGES.find((l) => l.code === settings.quranLanguage)?.name || 'Türkçe';

  const books = [
    {
      id: 'quran',
      title: t('quranTitle'),
      subtitle: t('quranSubtitle', currentQuranLanguage),
      icon: 'book',
      color: '#2E7D32',
      screen: 'QuranReader',
    },
    {
      id: 'bukhari',
      title: t('sahihBukhari'),
      subtitle: t('hadithSubtitle', currentHadithLanguage),
      icon: 'library',
      color: '#1565C0',
      screen: 'HadithReader',
    },
    {
      id: 'ilmihal',
      title: t('ilmihalTitle'),
      subtitle: t('ilmihalSubtitle'),
      icon: 'document-text',
      color: '#7B1FA2',
      screen: 'IlmihalReader',
    },
  ];

  const renderBookCard = (book) => (
    <TouchableOpacity
      key={book.id}
      style={[booksStyles.bookCard, !book.screen && booksStyles.disabledCard]}
      onPress={() => book.screen && navigation.navigate(book.screen)}
      disabled={!book.screen}
      activeOpacity={0.7}
    >
      <View style={[booksStyles.iconContainer, { backgroundColor: book.color + '18' }]}>
        <Ionicons name={book.icon} size={28} color={book.color} />
      </View>
      <View style={booksStyles.bookInfo}>
        <Text style={[booksStyles.bookTitle, !book.screen && booksStyles.disabledText]}>
          {book.title}
        </Text>
        <Text style={booksStyles.bookSubtitle}>{book.subtitle}</Text>
      </View>
      {book.screen && <Ionicons name="chevron-forward" size={20} color="#bbb" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.appWrapper} key={`books-${fontScale}`}>
      <View style={booksStyles.container}>
        <View style={booksStyles.booksContainer}>
          {books.map((book) => renderBookCard(book))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const booksStyles = {
  container: {
    flex: 1,
    backgroundColor: '#bbe1fa',
    padding: 16,
  },
  booksContainer: {
    padding: 0,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  disabledCard: {
    opacity: 0.6,
  },
  iconContainer: {
    minWidth: 48,
    minHeight: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  disabledText: {
    color: '#888',
  },
  bookSubtitle: {
    fontSize: 13,
    color: '#777',
  },
};

export default BooksScreen;
