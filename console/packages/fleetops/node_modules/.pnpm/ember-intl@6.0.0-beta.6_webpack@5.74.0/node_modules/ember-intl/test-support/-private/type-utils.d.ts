/**
 * Extract the keys from a type where the value type of the key extends the given `Condition`.
 *
 * Taken from `type-fest`.
 *
 * @see https://github.com/sindresorhus/type-fest/blob/master/source/conditional-keys.d.ts
 * @license (MIT OR CC0-1.0)
 */
export declare type ConditionalKeys<Base, Condition> = NonNullable<{
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
}[keyof Base]>;
export declare type RemoveFirstFromTuple<T extends any[]> = ((...b: T) => void) extends (a: unknown, ...b: infer I) => void ? I : [];
