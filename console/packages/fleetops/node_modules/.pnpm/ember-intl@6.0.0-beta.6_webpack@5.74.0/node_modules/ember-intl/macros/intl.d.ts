import type ComputedProperty from '@ember/object/computed';
import type IntlService from '../services/intl';
export declare type GetterFn<T, C = unknown> = (this: C, intl: IntlService, key: string, context: C) => T;
/**
 * @private
 * @hide
 */
export declare const __intlInjectionName: "intl-PRIVATE-SYMBOL";
export default function intl<T>(getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, key4: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, key4: string, key5: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, key4: string, key5: string, key6: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, key4: string, key5: string, key6: string, key7: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, key4: string, key5: string, key6: string, key7: string, key8: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, key4: string, key5: string, key6: string, key7: string, key8: string, key9: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, key3: string, key4: string, key5: string, key6: string, key7: string, key8: string, key9: string, ...rest: [string | GetterFn<T>][]): ComputedProperty<T>;
