/**
 * Picks the last locale from a locales array. In case of a string value,
 * returns that string.
 *
 * @private
 * @function
 * @param {string|string[]} locale
 * @return {string}
 * @hide
 */
export declare const pickLastLocale: (locale: string | [string, ...string[]]) => string;
export default pickLastLocale;
