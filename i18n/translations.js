/**
 * UI translations for all supported languages.
 * 
 * Supported: tr, en, ar, ur, bn, fr, id, ru, ta, zh, es, sv
 */

export const translations = {
  tr: {
    // Navigation & Tabs
    home: 'Ana Sayfa',
    books: 'Kitaplar',
    search: 'Arama',
    favorites: 'Favoriler',
    settings: 'Ayarlar',
    quran: "Kur'an",
    hadith: 'Hadis',
    ilmihal: 'İlmihal',

    // Home
    verseOfTheDay: 'Günün Ayeti',
    hadithOfTheDay: 'Günün Hadisi',
    quickAccess: 'Hızlı Erişim',
    read: 'Oku',
    loading: 'Yükleniyor...',
    verseLoadError: 'Ayet yüklenemedi',
    hadithLoadError: 'Hadis yüklenemedi',
    slogan: "Kur'an • Hadis • İlmihal",

    // Search
    searchPlaceholder: "Kur'an, Hadis, İlmihal'de ara...",
    searchButton: 'Ara',
    searching: 'Aranıyor...',
    noResults: 'Sonuç Bulunamadı',
    tryDifferentKeywords: 'Farklı anahtar kelimeler deneyin',
    searchPromptTitle: 'Arama Yapın',
    searchPromptSubtitle: "Kur'an, Hadis ve İlmihal içeriklerinde\nanahtar kelime ile arayın",
    all: 'Tümü',

    // Favorites
    noFavoritesYet: 'Henüz favori yok',
    noFavoritesSubtitle: 'Herhangi bir ayeti veya hadisi kaydetmek için kalp simgesine dokunun',

    // Books
    quranTitle: "Kur'an-ı Kerim",
    quranSubtitle: (lang) => `114 Sure • ${lang}`,
    sahihBukhari: 'Sahih Buhari',
    hadithSubtitle: (lang) => `7.589 Hadis • ${lang}`,
    ilmihalTitle: 'İlmihal',
    ilmihalSubtitle: 'Büyük İslam İlmihali • Ömer Nasuhi Bilmen',

    // Reader common
    share: 'Paylaş',
    uncategorized: 'Kategorisiz',
    verses: 'ayet',

    // Settings
    languageSettings: 'Dil Ayarları',
    appLanguage: 'Uygulama Dili',
    appLanguageDescription: 'Uygulama arayüzü için dili seçin',
    quranTranslation: "Kur'an Meali",
    quranTranslationDescription: "Kur'an meali için tercih ettiğiniz dili seçin",
    hadithLanguage: 'Hadis Dili',
    hadithLanguageDescription: 'Hadis çevirileri için tercih ettiğiniz dili seçin',
    ltr: 'Soldan sağa',
    rtl: 'Sağdan sola',


    // Ilmihal Reader
    bigIslamicIlmihal: 'Büyük İslam İlmihali',
  },

  en: {
    home: 'Home',
    books: 'Books',
    search: 'Search',
    favorites: 'Favorites',
    settings: 'Settings',
    quran: "Qur'an",
    hadith: 'Hadith',
    ilmihal: 'Ilmihal',

    verseOfTheDay: 'Verse of the Day',
    hadithOfTheDay: 'Hadith of the Day',
    quickAccess: 'Quick Access',
    read: 'Read',
    loading: 'Loading...',
    verseLoadError: 'Failed to load verse',
    hadithLoadError: 'Failed to load hadith',
    slogan: "Qur'an • Hadith • Ilmihal",

    searchPlaceholder: "Search in Qur'an, Hadith, Ilmihal...",
    searchButton: 'Search',
    searching: 'Searching...',
    noResults: 'No Results Found',
    tryDifferentKeywords: 'Try different keywords',
    searchPromptTitle: 'Search',
    searchPromptSubtitle: "Search by keyword in\nQur'an, Hadith and Ilmihal",
    all: 'All',

    noFavoritesYet: 'No favorites yet',
    noFavoritesSubtitle: 'Tap the heart icon to save any verse or hadith',

    quranTitle: 'The Holy Quran',
    quranSubtitle: (lang) => `114 Surahs • ${lang}`,
    sahihBukhari: 'Sahih Bukhari',
    hadithSubtitle: (lang) => `7,589 Hadiths • ${lang}`,
    ilmihalTitle: 'Ilmihal',
    ilmihalSubtitle: 'Great Islamic Ilmihal • Ömer Nasuhi Bilmen',

    share: 'Share',
    uncategorized: 'Uncategorized',
    verses: 'verses',

    languageSettings: 'Language Settings',
    appLanguage: 'App Language',
    appLanguageDescription: 'Choose the language for the app interface',
    quranTranslation: 'Quran Translation',
    quranTranslationDescription: 'Choose your preferred language for Quran translation',
    hadithLanguage: 'Hadith Language',
    hadithLanguageDescription: 'Choose your preferred language for hadith translations',
    ltr: 'Left to right',
    rtl: 'Right to left',


    bigIslamicIlmihal: 'Great Islamic Ilmihal',
  },

  ar: {
    home: 'الرئيسية',
    books: 'الكتب',
    search: 'بحث',
    favorites: 'المفضلة',
    settings: 'الإعدادات',
    quran: 'القرآن',
    hadith: 'الحديث',
    ilmihal: 'إلميحال',

    verseOfTheDay: 'آية اليوم',
    hadithOfTheDay: 'حديث اليوم',
    quickAccess: 'وصول سريع',
    read: 'اقرأ',
    loading: 'جاري التحميل...',
    verseLoadError: 'فشل تحميل الآية',
    hadithLoadError: 'فشل تحميل الحديث',
    slogan: 'القرآن • الحديث • إلميحال',

    searchPlaceholder: 'ابحث في القرآن والحديث وإلميحال...',
    searchButton: 'بحث',
    searching: 'جاري البحث...',
    noResults: 'لا توجد نتائج',
    tryDifferentKeywords: 'جرب كلمات مفتاحية مختلفة',
    searchPromptTitle: 'ابحث',
    searchPromptSubtitle: 'ابحث بالكلمات المفتاحية في\nالقرآن والحديث وإلميحال',
    all: 'الكل',

    noFavoritesYet: 'لا توجد مفضلات بعد',
    noFavoritesSubtitle: 'اضغط على أيقونة القلب لحفظ أي آية أو حديث',

    quranTitle: 'القرآن الكريم',
    quranSubtitle: (lang) => `١١٤ سورة • ${lang}`,
    sahihBukhari: 'صحيح البخاري',
    hadithSubtitle: (lang) => `٧٬٥٨٩ حديث • ${lang}`,
    ilmihalTitle: 'إلميحال',
    ilmihalSubtitle: 'إلميحال الإسلام الكبير • عمر ناصوحي بيلمن',

    share: 'مشاركة',
    uncategorized: 'غير مصنف',
    verses: 'آيات',

    languageSettings: 'إعدادات اللغة',
    appLanguage: 'لغة التطبيق',
    appLanguageDescription: 'اختر لغة واجهة التطبيق',
    quranTranslation: 'ترجمة القرآن',
    quranTranslationDescription: 'اختر لغتك المفضلة لترجمة القرآن',
    hadithLanguage: 'لغة الحديث',
    hadithLanguageDescription: 'اختر لغتك المفضلة لترجمات الحديث',
    ltr: 'من اليسار إلى اليمين',
    rtl: 'من اليمين إلى اليسار',

    bigIslamicIlmihal: 'إلميحال الإسلام الكبير',
  },

  ur: {
    home: 'ہوم',
    books: 'کتابیں',
    search: 'تلاش',
    favorites: 'پسندیدہ',
    settings: 'ترتیبات',
    quran: 'قرآن',
    hadith: 'حدیث',
    ilmihal: 'الحال',

    verseOfTheDay: 'آج کی آیت',
    hadithOfTheDay: 'آج کی حدیث',
    quickAccess: 'فوری رسائی',
    read: 'پڑھیں',
    loading: 'لوڈ ہو رہا ہے...',
    verseLoadError: 'آیت لوڈ نہیں ہو سکی',
    hadithLoadError: 'حدیث لوڈ نہیں ہو سکی',
    slogan: 'قرآن • حدیث • الحال',

    searchPlaceholder: 'قرآن، حدیث، الحال میں تلاش...',
    searchButton: 'تلاش',
    searching: 'تلاش ہو رہی ہے...',
    noResults: 'کوئی نتیجہ نہیں ملا',
    tryDifferentKeywords: 'مختلف الفاظ آزمائیں',
    searchPromptTitle: 'تلاش کریں',
    searchPromptSubtitle: 'قرآن، حدیث اور الحال میں\nکلیدی الفاظ سے تلاش کریں',
    all: 'سب',

    noFavoritesYet: 'ابھی تک کوئی پسندیدہ نہیں',
    noFavoritesSubtitle: 'کسی بھی آیت یا حدیث کو محفوظ کرنے کے لیے دل کے آئیکن پر ٹیپ کریں',

    quranTitle: 'قرآن مجید',
    quranSubtitle: (lang) => `١١٤ سورتیں • ${lang}`,
    sahihBukhari: 'صحیح بخاری',
    hadithSubtitle: (lang) => `٧٬٥٨٩ احادیث • ${lang}`,
    ilmihalTitle: 'الحال',
    ilmihalSubtitle: 'بڑا اسلامی الحال • عمر ناصوحی بیلمن',

    share: 'شیئر کریں',
    uncategorized: 'غیر زمرہ بند',
    verses: 'آیات',

    languageSettings: 'زبان کی ترتیبات',
    appLanguage: 'ایپ کی زبان',
    appLanguageDescription: 'ایپ انٹرفیس کے لیے زبان منتخب کریں',
    quranTranslation: 'قرآن ترجمہ',
    quranTranslationDescription: 'قرآن ترجمے کے لیے اپنی پسندیدہ زبان منتخب کریں',
    hadithLanguage: 'حدیث کی زبان',
    hadithLanguageDescription: 'حدیث تراجم کے لیے اپنی پسندیدہ زبان منتخب کریں',
    ltr: 'بائیں سے دائیں',
    rtl: 'دائیں سے بائیں',

    bigIslamicIlmihal: 'بڑا اسلامی الحال',
  },

  bn: {
    home: 'হোম',
    books: 'বই',
    search: 'অনুসন্ধান',
    favorites: 'পছন্দের',
    settings: 'সেটিংস',
    quran: 'কুরআন',
    hadith: 'হাদীস',
    ilmihal: 'ইলমিহাল',

    verseOfTheDay: 'আজকের আয়াত',
    hadithOfTheDay: 'আজকের হাদীস',
    quickAccess: 'দ্রুত প্রবেশ',
    read: 'পড়ুন',
    loading: 'লোড হচ্ছে...',
    verseLoadError: 'আয়াত লোড করা যায়নি',
    hadithLoadError: 'হাদীস লোড করা যায়নি',
    slogan: 'কুরআন • হাদীস • ইলমিহাল',

    searchPlaceholder: 'কুরআন, হাদীস, ইলমিহাল-এ অনুসন্ধান...',
    searchButton: 'খুঁজুন',
    searching: 'অনুসন্ধান হচ্ছে...',
    noResults: 'কোন ফলাফল পাওয়া যায়নি',
    tryDifferentKeywords: 'ভিন্ন কীওয়ার্ড চেষ্টা করুন',
    searchPromptTitle: 'অনুসন্ধান করুন',
    searchPromptSubtitle: 'কুরআন, হাদীস এবং ইলমিহাল-এ\nকীওয়ার্ড দিয়ে অনুসন্ধান করুন',
    all: 'সব',

    noFavoritesYet: 'এখনও কোন পছন্দের নেই',
    noFavoritesSubtitle: 'যেকোনো আয়াত বা হাদীস সংরক্ষণ করতে হার্ট আইকনে ট্যাপ করুন',

    quranTitle: 'পবিত্র কুরআন',
    quranSubtitle: (lang) => `১১৪ সূরা • ${lang}`,
    sahihBukhari: 'সহীহ বুখারী',
    hadithSubtitle: (lang) => `৭,৫৮৯ হাদীস • ${lang}`,
    ilmihalTitle: 'ইলমিহাল',
    ilmihalSubtitle: 'মহান ইসলামী ইলমিহাল • ওমর নাসুহি বিলমেন',

    share: 'শেয়ার',
    uncategorized: 'শ্রেণীবিহীন',
    verses: 'আয়াত',

    languageSettings: 'ভাষা সেটিংস',
    appLanguage: 'অ্যাপ ভাষা',
    appLanguageDescription: 'অ্যাপ ইন্টারফেসের জন্য ভাষা নির্বাচন করুন',
    quranTranslation: 'কুরআন অনুবাদ',
    quranTranslationDescription: 'কুরআন অনুবাদের জন্য আপনার পছন্দের ভাষা নির্বাচন করুন',
    hadithLanguage: 'হাদীস ভাষা',
    hadithLanguageDescription: 'হাদীস অনুবাদের জন্য আপনার পছন্দের ভাষা নির্বাচন করুন',
    ltr: 'বাম থেকে ডানে',
    rtl: 'ডান থেকে বামে',

    bigIslamicIlmihal: 'মহান ইসলামী ইলমিহাল',
  },

  fr: {
    home: 'Accueil',
    books: 'Livres',
    search: 'Recherche',
    favorites: 'Favoris',
    settings: 'Paramètres',
    quran: 'Coran',
    hadith: 'Hadith',
    ilmihal: 'Ilmihal',

    verseOfTheDay: 'Verset du Jour',
    hadithOfTheDay: 'Hadith du Jour',
    quickAccess: 'Accès Rapide',
    read: 'Lire',
    loading: 'Chargement...',
    verseLoadError: 'Échec du chargement du verset',
    hadithLoadError: 'Échec du chargement du hadith',
    slogan: 'Coran • Hadith • Ilmihal',

    searchPlaceholder: 'Rechercher dans le Coran, Hadith, Ilmihal...',
    searchButton: 'Rechercher',
    searching: 'Recherche en cours...',
    noResults: 'Aucun Résultat',
    tryDifferentKeywords: 'Essayez des mots-clés différents',
    searchPromptTitle: 'Rechercher',
    searchPromptSubtitle: 'Recherchez par mot-clé dans\nle Coran, le Hadith et Ilmihal',
    all: 'Tout',

    noFavoritesYet: 'Pas encore de favoris',
    noFavoritesSubtitle: "Appuyez sur l'icône cœur pour enregistrer un verset ou un hadith",

    quranTitle: 'Le Saint Coran',
    quranSubtitle: (lang) => `114 Sourates • ${lang}`,
    sahihBukhari: 'Sahih Boukhari',
    hadithSubtitle: (lang) => `7 589 Hadiths • ${lang}`,
    ilmihalTitle: 'Ilmihal',
    ilmihalSubtitle: 'Grand Ilmihal Islamique • Ömer Nasuhi Bilmen',

    share: 'Partager',
    uncategorized: 'Non classé',
    verses: 'versets',

    languageSettings: 'Paramètres de Langue',
    appLanguage: "Langue de l'Application",
    appLanguageDescription: "Choisissez la langue de l'interface de l'application",
    quranTranslation: 'Traduction du Coran',
    quranTranslationDescription: 'Choisissez votre langue préférée pour la traduction du Coran',
    hadithLanguage: 'Langue du Hadith',
    hadithLanguageDescription: 'Choisissez votre langue préférée pour les traductions de hadiths',
    ltr: 'De gauche à droite',
    rtl: 'De droite à gauche',

    bigIslamicIlmihal: 'Grand Ilmihal Islamique',
  },

  id: {
    home: 'Beranda',
    books: 'Buku',
    search: 'Cari',
    favorites: 'Favorit',
    settings: 'Pengaturan',
    quran: 'Al-Quran',
    hadith: 'Hadis',
    ilmihal: 'Ilmihal',

    verseOfTheDay: 'Ayat Hari Ini',
    hadithOfTheDay: 'Hadis Hari Ini',
    quickAccess: 'Akses Cepat',
    read: 'Baca',
    loading: 'Memuat...',
    verseLoadError: 'Gagal memuat ayat',
    hadithLoadError: 'Gagal memuat hadis',
    slogan: 'Al-Quran • Hadis • Ilmihal',

    searchPlaceholder: 'Cari di Al-Quran, Hadis, Ilmihal...',
    searchButton: 'Cari',
    searching: 'Mencari...',
    noResults: 'Tidak Ada Hasil',
    tryDifferentKeywords: 'Coba kata kunci yang berbeda',
    searchPromptTitle: 'Cari',
    searchPromptSubtitle: 'Cari berdasarkan kata kunci di\nAl-Quran, Hadis dan Ilmihal',
    all: 'Semua',

    noFavoritesYet: 'Belum ada favorit',
    noFavoritesSubtitle: 'Ketuk ikon hati untuk menyimpan ayat atau hadis',

    quranTitle: 'Al-Quran',
    quranSubtitle: (lang) => `114 Surah • ${lang}`,
    sahihBukhari: 'Shahih Bukhari',
    hadithSubtitle: (lang) => `7.589 Hadis • ${lang}`,
    ilmihalTitle: 'Ilmihal',
    ilmihalSubtitle: 'Ilmihal Islam Besar • Ömer Nasuhi Bilmen',

    share: 'Bagikan',
    uncategorized: 'Tidak Berkategori',
    verses: 'ayat',

    languageSettings: 'Pengaturan Bahasa',
    appLanguage: 'Bahasa Aplikasi',
    appLanguageDescription: 'Pilih bahasa untuk antarmuka aplikasi',
    quranTranslation: 'Terjemahan Al-Quran',
    quranTranslationDescription: 'Pilih bahasa pilihan Anda untuk terjemahan Al-Quran',
    hadithLanguage: 'Bahasa Hadis',
    hadithLanguageDescription: 'Pilih bahasa pilihan Anda untuk terjemahan hadis',
    ltr: 'Kiri ke kanan',
    rtl: 'Kanan ke kiri',

    bigIslamicIlmihal: 'Ilmihal Islam Besar',
  },

  ru: {
    home: 'Главная',
    books: 'Книги',
    search: 'Поиск',
    favorites: 'Избранное',
    settings: 'Настройки',
    quran: 'Коран',
    hadith: 'Хадис',
    ilmihal: 'Ильмихаль',

    verseOfTheDay: 'Аят Дня',
    hadithOfTheDay: 'Хадис Дня',
    quickAccess: 'Быстрый Доступ',
    read: 'Читать',
    loading: 'Загрузка...',
    verseLoadError: 'Не удалось загрузить аят',
    hadithLoadError: 'Не удалось загрузить хадис',
    slogan: 'Коран • Хадис • Ильмихаль',

    searchPlaceholder: 'Искать в Коране, Хадисах, Ильмихале...',
    searchButton: 'Искать',
    searching: 'Поиск...',
    noResults: 'Ничего Не Найдено',
    tryDifferentKeywords: 'Попробуйте другие ключевые слова',
    searchPromptTitle: 'Поиск',
    searchPromptSubtitle: 'Ищите по ключевым словам в\nКоране, Хадисах и Ильмихале',
    all: 'Все',

    noFavoritesYet: 'Пока нет избранного',
    noFavoritesSubtitle: 'Нажмите на значок сердца, чтобы сохранить аят или хадис',

    quranTitle: 'Священный Коран',
    quranSubtitle: (lang) => `114 Сур • ${lang}`,
    sahihBukhari: 'Сахих аль-Бухари',
    hadithSubtitle: (lang) => `7 589 Хадисов • ${lang}`,
    ilmihalTitle: 'Ильмихаль',
    ilmihalSubtitle: 'Большой Исламский Ильмихаль • Омер Насухи Бильмен',

    share: 'Поделиться',
    uncategorized: 'Без категории',
    verses: 'аятов',

    languageSettings: 'Настройки Языка',
    appLanguage: 'Язык Приложения',
    appLanguageDescription: 'Выберите язык интерфейса приложения',
    quranTranslation: 'Перевод Корана',
    quranTranslationDescription: 'Выберите предпочитаемый язык для перевода Корана',
    hadithLanguage: 'Язык Хадисов',
    hadithLanguageDescription: 'Выберите предпочитаемый язык для переводов хадисов',
    ltr: 'Слева направо',
    rtl: 'Справа налево',

    bigIslamicIlmihal: 'Большой Исламский Ильмихаль',
  },

  ta: {
    home: 'முகப்பு',
    books: 'புத்தகங்கள்',
    search: 'தேடல்',
    favorites: 'பிடித்தவை',
    settings: 'அமைப்புகள்',
    quran: 'குர்ஆன்',
    hadith: 'ஹதீஸ்',
    ilmihal: 'இல்மிஹால்',

    verseOfTheDay: 'இன்றைய வசனம்',
    hadithOfTheDay: 'இன்றைய ஹதீஸ்',
    quickAccess: 'விரைவு அணுகல்',
    read: 'படிக்க',
    loading: 'ஏற்றுகிறது...',
    verseLoadError: 'வசனத்தை ஏற்ற முடியவில்லை',
    hadithLoadError: 'ஹதீஸை ஏற்ற முடியவில்லை',
    slogan: 'குர்ஆன் • ஹதீஸ் • இல்மிஹால்',

    searchPlaceholder: 'குர்ஆன், ஹதீஸ், இல்மிஹால் இல் தேடுங்கள்...',
    searchButton: 'தேடு',
    searching: 'தேடுகிறது...',
    noResults: 'முடிவுகள் இல்லை',
    tryDifferentKeywords: 'வேறு சொற்களை முயற்சிக்கவும்',
    searchPromptTitle: 'தேடுங்கள்',
    searchPromptSubtitle: 'குர்ஆன், ஹதீஸ் மற்றும் இல்மிஹால் இல்\nமுக்கிய வார்த்தையால் தேடுங்கள்',
    all: 'அனைத்தும்',

    noFavoritesYet: 'இன்னும் பிடித்தவை இல்லை',
    noFavoritesSubtitle: 'ஏதேனும் வசனம் அல்லது ஹதீஸை சேமிக்க இதய ஐகானை தட்டவும்',

    quranTitle: 'புனித குர்ஆன்',
    quranSubtitle: (lang) => `114 சூராக்கள் • ${lang}`,
    sahihBukhari: 'ஸஹீஹ் புகாரி',
    hadithSubtitle: (lang) => `7,589 ஹதீஸ்கள் • ${lang}`,
    ilmihalTitle: 'இல்மிஹால்',
    ilmihalSubtitle: 'பெரிய இஸ்லாமிய இல்மிஹால் • ஓமர் நசுஹி பில்மென்',

    share: 'பகிர்',
    uncategorized: 'வகைப்படுத்தப்படாதது',
    verses: 'வசனங்கள்',

    languageSettings: 'மொழி அமைப்புகள்',
    appLanguage: 'பயன்பாட்டு மொழி',
    appLanguageDescription: 'பயன்பாட்டு இடைமுகத்திற்கான மொழியை தேர்வு செய்யுங்கள்',
    quranTranslation: 'குர்ஆன் மொழிபெயர்ப்பு',
    quranTranslationDescription: 'குர்ஆன் மொழிபெயர்ப்புக்கு உங்கள் விருப்ப மொழியை தேர்வு செய்யுங்கள்',
    hadithLanguage: 'ஹதீஸ் மொழி',
    hadithLanguageDescription: 'ஹதீஸ் மொழிபெயர்ப்புகளுக்கு உங்கள் விருப்ப மொழியை தேர்வு செய்யுங்கள்',
    ltr: 'இடமிருந்து வலம்',
    rtl: 'வலமிருந்து இடம்',

    bigIslamicIlmihal: 'பெரிய இஸ்லாமிய இல்மிஹால்',
  },

  zh: {
    home: '首页',
    books: '书籍',
    search: '搜索',
    favorites: '收藏',
    settings: '设置',
    quran: '古兰经',
    hadith: '圣训',
    ilmihal: '伊尔米哈尔',

    verseOfTheDay: '每日经文',
    hadithOfTheDay: '每日圣训',
    quickAccess: '快速访问',
    read: '阅读',
    loading: '加载中...',
    verseLoadError: '无法加载经文',
    hadithLoadError: '无法加载圣训',
    slogan: '古兰经 • 圣训 • 伊尔米哈尔',

    searchPlaceholder: '在古兰经、圣训、伊尔米哈尔中搜索...',
    searchButton: '搜索',
    searching: '搜索中...',
    noResults: '未找到结果',
    tryDifferentKeywords: '尝试不同的关键词',
    searchPromptTitle: '搜索',
    searchPromptSubtitle: '在古兰经、圣训和伊尔米哈尔中\n按关键词搜索',
    all: '全部',

    noFavoritesYet: '还没有收藏',
    noFavoritesSubtitle: '点击心形图标保存任何经文或圣训',

    quranTitle: '古兰经',
    quranSubtitle: (lang) => `114章 • ${lang}`,
    sahihBukhari: '布哈里圣训',
    hadithSubtitle: (lang) => `7,589条圣训 • ${lang}`,
    ilmihalTitle: '伊尔米哈尔',
    ilmihalSubtitle: '伊斯兰大全 • 奥马尔·纳苏希·比尔门',

    share: '分享',
    uncategorized: '未分类',
    verses: '节',

    languageSettings: '语言设置',
    appLanguage: '应用语言',
    appLanguageDescription: '选择应用界面语言',
    quranTranslation: '古兰经翻译',
    quranTranslationDescription: '选择您首选的古兰经翻译语言',
    hadithLanguage: '圣训语言',
    hadithLanguageDescription: '选择您首选的圣训翻译语言',
    ltr: '从左到右',
    rtl: '从右到左',

    bigIslamicIlmihal: '伊斯兰大全',
  },

  es: {
    home: 'Inicio',
    books: 'Libros',
    search: 'Buscar',
    favorites: 'Favoritos',
    settings: 'Ajustes',
    quran: 'Corán',
    hadith: 'Hadiz',
    ilmihal: 'Ilmihal',

    verseOfTheDay: 'Versículo del Día',
    hadithOfTheDay: 'Hadiz del Día',
    quickAccess: 'Acceso Rápido',
    read: 'Leer',
    loading: 'Cargando...',
    verseLoadError: 'No se pudo cargar el versículo',
    hadithLoadError: 'No se pudo cargar el hadiz',
    slogan: 'Corán • Hadiz • Ilmihal',

    searchPlaceholder: 'Buscar en Corán, Hadiz, Ilmihal...',
    searchButton: 'Buscar',
    searching: 'Buscando...',
    noResults: 'Sin Resultados',
    tryDifferentKeywords: 'Pruebe palabras clave diferentes',
    searchPromptTitle: 'Buscar',
    searchPromptSubtitle: 'Busque por palabra clave en\nel Corán, Hadiz e Ilmihal',
    all: 'Todo',

    noFavoritesYet: 'Aún no hay favoritos',
    noFavoritesSubtitle: 'Toque el icono de corazón para guardar cualquier versículo o hadiz',

    quranTitle: 'El Sagrado Corán',
    quranSubtitle: (lang) => `114 Suras • ${lang}`,
    sahihBukhari: 'Sahih Bujari',
    hadithSubtitle: (lang) => `7.589 Hadices • ${lang}`,
    ilmihalTitle: 'Ilmihal',
    ilmihalSubtitle: 'Gran Ilmihal Islámico • Ömer Nasuhi Bilmen',

    share: 'Compartir',
    uncategorized: 'Sin categoría',
    verses: 'versículos',

    languageSettings: 'Ajustes de Idioma',
    appLanguage: 'Idioma de la Aplicación',
    appLanguageDescription: 'Elija el idioma de la interfaz de la aplicación',
    quranTranslation: 'Traducción del Corán',
    quranTranslationDescription: 'Elija su idioma preferido para la traducción del Corán',
    hadithLanguage: 'Idioma del Hadiz',
    hadithLanguageDescription: 'Elija su idioma preferido para las traducciones de hadices',
    ltr: 'De izquierda a derecha',
    rtl: 'De derecha a izquierda',

    bigIslamicIlmihal: 'Gran Ilmihal Islámico',
  },

  sv: {
    home: 'Hem',
    books: 'Böcker',
    search: 'Sök',
    favorites: 'Favoriter',
    settings: 'Inställningar',
    quran: 'Koranen',
    hadith: 'Hadith',
    ilmihal: 'Ilmihal',

    verseOfTheDay: 'Dagens Vers',
    hadithOfTheDay: 'Dagens Hadith',
    quickAccess: 'Snabbåtkomst',
    read: 'Läs',
    loading: 'Laddar...',
    verseLoadError: 'Kunde inte ladda versen',
    hadithLoadError: 'Kunde inte ladda hadith',
    slogan: 'Koranen • Hadith • Ilmihal',

    searchPlaceholder: 'Sök i Koranen, Hadith, Ilmihal...',
    searchButton: 'Sök',
    searching: 'Söker...',
    noResults: 'Inga Resultat',
    tryDifferentKeywords: 'Prova andra sökord',
    searchPromptTitle: 'Sök',
    searchPromptSubtitle: 'Sök med nyckelord i\nKoranen, Hadith och Ilmihal',
    all: 'Alla',

    noFavoritesYet: 'Inga favoriter ännu',
    noFavoritesSubtitle: 'Tryck på hjärtikonen för att spara en vers eller hadith',

    quranTitle: 'Den Heliga Koranen',
    quranSubtitle: (lang) => `114 Suror • ${lang}`,
    sahihBukhari: 'Sahih Bukhari',
    hadithSubtitle: (lang) => `7 589 Hadither • ${lang}`,
    ilmihalTitle: 'Ilmihal',
    ilmihalSubtitle: 'Stor Islamisk Ilmihal • Ömer Nasuhi Bilmen',

    share: 'Dela',
    uncategorized: 'Okategoriserad',
    verses: 'verser',

    languageSettings: 'Språkinställningar',
    appLanguage: 'Appspråk',
    appLanguageDescription: 'Välj språk för appgränssnittet',
    quranTranslation: 'Koranöversättning',
    quranTranslationDescription: 'Välj ditt föredragna språk för Koranöversättning',
    hadithLanguage: 'Hadith-språk',
    hadithLanguageDescription: 'Välj ditt föredragna språk för hadith-översättningar',
    ltr: 'Vänster till höger',
    rtl: 'Höger till vänster',

    bigIslamicIlmihal: 'Stor Islamisk Ilmihal',
  },
};

/**
 * All supported app UI languages.
 * Uses a unified code system (ISO 639-1 two-letter codes).
 */
export const APP_LANGUAGES = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

/**
 * Maps app language codes to hadith API language codes.
 * Returns null if no hadith is available for that language.
 */
export const appLangToHadithLang = {
  tr: 'tur', en: 'eng', ar: 'ara', ur: 'urd',
  bn: 'ben', fr: 'fra', id: 'ind', ru: 'rus', ta: 'tam',
  zh: null, es: null, sv: null,
};

/**
 * Maps app language codes to quran API language codes.
 * Returns null if no quran translation is available for that language.
 */
export const appLangToQuranLang = {
  tr: 'tr', en: 'en', ar: null, ur: 'ur', bn: 'bn',
  fr: 'fr', id: 'id', ru: 'ru', ta: null,
  zh: 'zh', es: 'es', sv: 'sv',
};

export default translations;
