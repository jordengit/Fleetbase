import type ComputedProperty from '@ember/object/computed';
import type IntlService from '../services/intl';
import type { TOptions } from '../services/intl';
/**
 * This class is used to box primitive types and mark them as raw literals that
 * should be used as is by the translation macro.
 *
 * This class is internal. Instead of using this class directly, use the `raw`
 * utility function, that creates an instance of this class.
 */
declare class Raw<T> {
    private _value;
    constructor(value: T);
    valueOf(): T;
    toString(): string;
}
/**
 * Use this utility function to mark a value as a raw literal.
 *
 * @param {*} value The value to mark as a raw literal.
 * @return The same value, but boxed in the `Raw` class so that the consuming
 *  macro understands that this value should be used as is.
 */
export declare function raw<T>(value: T): Raw<T>;
declare type MacroOptions = {
    [K in keyof TOptions]: TOptions[K] | Raw<TOptions[K]>;
};
export default function createTranslatedComputedProperty(translationKey: string, options?: MacroOptions): ComputedProperty<ReturnType<IntlService['t']>>;
export {};
