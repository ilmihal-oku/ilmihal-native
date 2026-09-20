/**
 * Search Index for Quran, Hadith, and Ilmihal
 * Implements BM25-style ranking for semantic search
 * Fetches data from CDN on first load
 * Supports multiple languages based on user settings
 */

const { book: ilmihalData } = require('../source');

// Cache for loaded data (keyed by language)
let quranCache = {};
let hadithBukhariCache = {};
let hadithMuslimCache = {};
let currentQuranLang = null;
let currentHadithLang = null;

// Generate URLs based on language settings
const getQuranUrl = (lang = 'en') => {
  return `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_${lang}.json`;
};

const getHadithUrl = (lang = 'eng', collection = 'bukhari') => {
  return `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${lang}-${collection}.min.json`;
};

// Tokenizer - works for Latin-based languages
// For Arabic/Urdu, we use space-based splitting
const tokenize = (text) => {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF\u0980-\u09FF\u4E00-\u9FFF]/g, ' ') // Keep Arabic, Bengali, Chinese chars
    .split(/\s+/)
    .filter(t => t.length > 1); // Reduced from 2 for non-Latin scripts
};

// Calculate term frequency
const termFrequency = (term, tokens) => {
  const count = tokens.filter(t => t === term).length;
  return count / tokens.length;
};

// Clear cache when language changes
const clearCache = (type) => {
  if (type === 'quran') {
    quranCache = {};
    currentQuranLang = null;
  } else if (type === 'hadith') {
    hadithBukhariCache = {};
    hadithMuslimCache = {};
    currentHadithLang = null;
  }
};

// Load Quran data from CDN
const loadQuran = async (lang = 'en') => {
  if (quranCache[lang]) return quranCache[lang];
  
  try {
    const url = getQuranUrl(lang);
    const response = await fetch(url);
    const data = await response.json();
    
    // Flatten the verses from all surahs
    const flatVerses = [];
    for (const surah of data) {
      for (const verse of surah.verses || []) {
        flatVerses.push({
          surah: surah.id,
          surahName: surah.transliteration || surah.name,
          ayah: verse.id,
          text: verse.translation,
          arabicText: verse.text
        });
      }
    }
    quranCache[lang] = flatVerses;
    currentQuranLang = lang;
    return flatVerses;
  } catch (e) {
    console.error('Failed to load Quran data:', e);
    return [];
  }
};

// Load Hadith data from CDN
const loadHadith = async (lang = 'eng', collection = 'bukhari') => {
  try {
    const cache = collection === 'bukhari' ? hadithBukhariCache : hadithMuslimCache;
    if (cache[lang]) return cache[lang];
    
    const url = getHadithUrl(lang, collection);
    const response = await fetch(url);
    const data = await response.json();
    
    if (collection === 'bukhari') {
      hadithBukhariCache[lang] = data;
    } else {
      hadithMuslimCache[lang] = data;
    }
    currentHadithLang = lang;
    return data;
  } catch (e) {
    console.error(`Failed to load ${collection} data:`, e);
    return { hadiths: [] };
  }
};

// Initialize data with specific languages
const initializeData = async (quranLang = 'en', hadithLang = 'eng') => {
  try {
    await Promise.all([
      loadQuran(quranLang),
      loadHadith(hadithLang, 'bukhari')
    ]);
  } catch (e) {
    console.error('Failed to initialize data:', e);
  }
};

// Search Quran (async version with language support)
const searchQuran = async (query, limit = 10, lang = 'en') => {
  const quran = await loadQuran(lang);
  const queryTokens = tokenize(query);
  
  if (queryTokens.length === 0 || !quran || quran.length === 0) return [];
  
  const results = [];
  
  for (const verse of quran) {
    const text = verse.text || '';
    const tokens = tokenize(text);
    
    let score = 0;
    for (const qToken of queryTokens) {
      if (tokens.some(t => t.includes(qToken) || qToken.includes(t))) {
        score += termFrequency(qToken, tokens) + 0.1;
      }
    }
    
    if (score > 0) {
      results.push({
        type: 'quran',
        surah: verse.surah,
        ayah: verse.ayah,
        surahName: verse.surahName,
        text: text,
        arabicText: verse.arabicText || '',
        score
      });
    }
  }
  
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// Search Hadith (async version with language support)
const searchHadith = async (query, limit = 10, lang = 'eng') => {
  const queryTokens = tokenize(query);
  
  if (queryTokens.length === 0) return [];
  
  const results = [];
  
  // Search Bukhari first (most common)
  const bukhariData = await loadHadith(lang, 'bukhari');
  const hadiths = bukhariData.hadiths || [];
  
  for (const hadith of hadiths.slice(0, 5000)) { // Limit for performance
    const text = hadith.text || '';
    const tokens = tokenize(text);
    
    let score = 0;
    for (const qToken of queryTokens) {
      if (tokens.some(t => t.includes(qToken) || qToken.includes(t))) {
        score += termFrequency(qToken, tokens) + 0.1;
      }
    }
    
    if (score > 0) {
      const sections = bukhariData.metadata?.sections || {};
      const bookNum = hadith.reference?.book || 0;
      
      results.push({
        type: 'hadith',
        collection: 'Sahih Bukhari',
        hadithNumber: hadith.hadithnumber,
        book: bookNum,
        bookName: sections[bookNum] || '',
        text: text,
        narrator: '',
        score
      });
    }
  }
  
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// Search Ilmihal (synchronous - data is bundled)
const searchIlmihal = (query, limit = 10) => {
  const queryTokens = tokenize(query);
  
  if (queryTokens.length === 0 || !ilmihalData) return [];
  
  const results = [];
  
  for (const chapter of ilmihalData) {
    for (const section of chapter.chapterContent) {
      for (const para of section.sectionContent) {
        const tokens = tokenize(para);
        
        let score = 0;
        for (const qToken of queryTokens) {
          if (tokens.some(t => t.includes(qToken) || qToken.includes(t))) {
            score += termFrequency(qToken, tokens) + 0.1;
          }
        }
        
        if (score > 0) {
          results.push({
            type: 'ilmihal',
            chapterId: chapter.id,
            chapterTitle: chapter.chapterTitle,
            sectionId: section.id,
            sectionTitle: section.sectionTitle,
            text: para,
            score
          });
        }
      }
    }
  }
  
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// Combined search (async version with language support)
const searchAll = async (query, limit = 10, quranLang = 'en', hadithLang = 'eng') => {
  const [quranResults, hadithResults] = await Promise.all([
    searchQuran(query, Math.ceil(limit / 3), quranLang),
    searchHadith(query, Math.ceil(limit / 3), hadithLang)
  ]);
  const ilmihalResults = searchIlmihal(query, Math.ceil(limit / 3));
  
  // Interleave results
  const combined = [];
  const maxLen = Math.max(quranResults.length, hadithResults.length, ilmihalResults.length);
  
  for (let i = 0; i < maxLen && combined.length < limit; i++) {
    if (quranResults[i]) combined.push(quranResults[i]);
    if (hadithResults[i] && combined.length < limit) combined.push(hadithResults[i]);
    if (ilmihalResults[i] && combined.length < limit) combined.push(ilmihalResults[i]);
  }
  
  return combined;
};

module.exports = {
  searchQuran,
  searchHadith,
  searchIlmihal,
  searchAll,
  loadQuran,
  loadHadith,
  initializeData,
  clearCache
};
