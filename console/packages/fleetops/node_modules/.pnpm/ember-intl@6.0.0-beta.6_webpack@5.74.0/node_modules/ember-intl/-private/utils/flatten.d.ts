export declare type NestedStructure<T = string> = {
    [Key in string | number]?: T | NestedStructure<T>;
};
/**
 * @private
 * @hide
 */
export default function flatten<T>(src: NestedStructure<T>): Record<string, T>;
