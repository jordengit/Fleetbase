import type Evented from '@ember/object/evented';
import type Service from '@ember/service';
import type IntlService from 'ember-intl/services/intl';
import type { ConditionalKeys, RemoveFirstFromTuple } from './type-utils';
declare type IntlMethods = Exclude<ConditionalKeys<IntlService, (...args: unknown[]) => void>, keyof Service | keyof Evented>;
/**
 * Resolves the `intl` service and provides it to the `fn` as the first
 * argument. Returns the partially applied function.
 *
 * @private
 * @function
 * @param {function} fn
 * @return {function}
 * @hide
 */
export declare function makeIntlHelper<Fn extends (intl: IntlService, ...rest: unknown[]) => void>(fn: Fn): (...args: RemoveFirstFromTuple<Parameters<Fn>>) => ReturnType<Fn>;
export declare function makeIntlHelper<Fn extends IntlMethods>(fn: Fn): IntlService[Fn];
export default makeIntlHelper;
