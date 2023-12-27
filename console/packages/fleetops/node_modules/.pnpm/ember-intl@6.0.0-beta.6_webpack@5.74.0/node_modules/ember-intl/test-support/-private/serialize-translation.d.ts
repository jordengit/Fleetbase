/**
 * Serializes a translation invocation deterministically.
 *
 * @private
 * @function
 * @param {string} key translation key
 * @param {object} [options] options and variables passed along
 * @return {string}
 * @hide
 */
export declare const serializeTranslation: (key: string, options: Record<string, unknown>) => string;
/**
 * Used to overwrite the default `intl/missing-message` implementation in order
 * to display a deterministic serialization of the translation for easier
 * assertions in the tests.
 *
 * @private
 * @function
 * @param {string} key translation key
 * @param {string[]} locales list of locales to search through
 * @param {object} [options] options and variables passed along
 * @return {string}
 * @hide
 */
export declare const missingMessage: (key: string, _locales: string[], options: Record<string, unknown>) => string;
