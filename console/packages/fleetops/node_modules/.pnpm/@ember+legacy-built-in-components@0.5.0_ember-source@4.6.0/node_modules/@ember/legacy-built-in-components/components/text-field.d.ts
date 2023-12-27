/**
@module @ember/component
*/
import Component from '@ember/component';
/**
  The internal class used to create text inputs when the `Input` component is used with `type` of `text`.

  See [Ember.Templates.components.Input](/ember/release/classes/Ember.Templates.components/methods/Input?anchor=Input) for usage details.

  ## Layout and LayoutName properties

  Because HTML `input` elements are self closing `layout` and `layoutName`
  properties will not be applied.

  @class TextField
  @extends Component
  @uses Ember.TextSupport
  @public
*/
declare const TextField: Readonly<typeof Component> & (new (properties?: object | undefined) => any) & (new (...args: any[]) => any);
export default TextField;
