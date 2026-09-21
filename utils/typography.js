/**
 * Typography utilities for accessibility font scaling across iOS and Android.
 */

export const TEXT_MULTIPLIERS = {
  // Navigation headers and bottom tabs: keep UI stable without clipping
  nav: 1.25,
  // Compact buttons, badges, chips, icon labels
  compact: 1.3,
  // Card titles, subtitles, search results
  body: 1.6,
  // Long-form reading views (Quran verses, Hadiths, Ilmihal paragraphs)
  reader: 2.0,
};

/**
 * Calculates a proportional line height that scales with the system font scale.
 * 
 * In React Native, fontSize scales automatically with allowFontScaling={true},
 * but lineHeight remains a rigid number unless dynamically multiplied by fontScale.
 * 
 * @param {number} fontSize Base font size in points
 * @param {number} fontScale Active system font scale (e.g. 1.0, 1.2 for 120%)
 * @param {number} ratio Line height ratio (default: 1.45)
 * @returns {number} Computed scaled line height
 */
export const getScaledLineHeight = (fontSize, fontScale = 1, ratio = 1.45) => {
  const effectiveScale = Math.max(1, fontScale || 1);
  return Math.round(fontSize * ratio * effectiveScale);
};

/**
 * Returns a friendly percentage string for a given fontScale.
 * e.g. 1.2 -> "%120"
 */
export const formatFontScale = (fontScale = 1) => {
  const percent = Math.round((fontScale || 1) * 100);
  return `%${percent}`;
};
