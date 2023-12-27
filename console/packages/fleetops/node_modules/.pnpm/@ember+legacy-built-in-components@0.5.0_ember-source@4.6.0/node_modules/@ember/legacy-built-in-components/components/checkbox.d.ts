import EmberComponent from '@ember/component';
/**
@module @ember/component
*/
/**
  The internal class used to create text inputs when the `{{input}}`
  helper is used with `type` of `checkbox`.

  See [Ember.Templates.helpers.input](/ember/release/classes/Ember.Templates.helpers/methods/input?anchor=input)  for usage details.

  ## Direct manipulation of `checked`

  The `checked` attribute of an `Checkbox` object should always be set
  through the Ember object or by interacting with its rendered element
  representation via the mouse, keyboard, or touch. Updating the value of the
  checkbox via jQuery will result in the checked value of the object and its
  element losing synchronization.

  ## Layout and LayoutName properties

  Because HTML `input` elements are self closing `layout` and `layoutName`
  properties will not be applied.

  @class Checkbox
  @public
*/
declare const Checkbox: Readonly<typeof EmberComponent> & (new (properties?: object | undefined) => {
    /**
      By default, this component will add the `ember-checkbox` class to the component's element.
  
      @property classNames
      @type Array<String> | String
      @default ['ember-checkbox']
      @public
     */
    classNames: string[];
    tagName: string;
    /**
      By default this component will forward a number of arguments to attributes on the the
      component's element:
  
      * indeterminate
      * disabled
      * tabindex
      * name
      * autofocus
      * required
      * form
  
      When invoked with curly braces, this is the exhaustive list of HTML attributes you can
      customize (i.e. `{{input type="checkbox" disabled=true}}`).
  
      When invoked with angle bracket invocation, this list is irrelevant, because you can use HTML
      attribute syntax to customize the element (i.e.
      `<Input @type="checkbox" disabled data-custom="custom value" />`). However, `@type` and
      `@checked` must be passed as named arguments, not attributes.
  
      @property attributeBindings
      @type Array<String> | String
      @default ['type', 'checked', 'indeterminate', 'disabled', 'tabindex', 'name', 'autofocus', 'required', 'form']
      @public
    */
    attributeBindings: string[];
    /**
      Sets the `type` attribute of the `Checkbox`'s element
  
      @property disabled
      @default false
      @private
     */
    type: string;
    /**
      Sets the `disabled` attribute of the `Checkbox`'s element
  
      @property disabled
      @default false
      @public
     */
    disabled: boolean;
    /**
      Corresponds to the `indeterminate` property of the `Checkbox`'s element
  
      @property disabled
      @default false
      @public
     */
    indeterminate: boolean;
    /**
      @property checked
      @default false
      @private
     */
    checked: boolean;
    /**
      Whenever the checkbox is inserted into the DOM, perform initialization steps, which include
      setting the indeterminate property if needed.
  
      If this method is overridden, `super` must be called.
  
      @method
      @public
     */
    didInsertElement(): void;
    /**
      Whenever the `change` event is fired on the checkbox, update its `checked` property to reflect
      whether the checkbox is checked.
  
      If this method is overridden, `super` must be called.
  
      @method
      @public
     */
    change(): void;
} & EmberComponent) & (new (...args: any[]) => {
    /**
      By default, this component will add the `ember-checkbox` class to the component's element.
  
      @property classNames
      @type Array<String> | String
      @default ['ember-checkbox']
      @public
     */
    classNames: string[];
    tagName: string;
    /**
      By default this component will forward a number of arguments to attributes on the the
      component's element:
  
      * indeterminate
      * disabled
      * tabindex
      * name
      * autofocus
      * required
      * form
  
      When invoked with curly braces, this is the exhaustive list of HTML attributes you can
      customize (i.e. `{{input type="checkbox" disabled=true}}`).
  
      When invoked with angle bracket invocation, this list is irrelevant, because you can use HTML
      attribute syntax to customize the element (i.e.
      `<Input @type="checkbox" disabled data-custom="custom value" />`). However, `@type` and
      `@checked` must be passed as named arguments, not attributes.
  
      @property attributeBindings
      @type Array<String> | String
      @default ['type', 'checked', 'indeterminate', 'disabled', 'tabindex', 'name', 'autofocus', 'required', 'form']
      @public
    */
    attributeBindings: string[];
    /**
      Sets the `type` attribute of the `Checkbox`'s element
  
      @property disabled
      @default false
      @private
     */
    type: string;
    /**
      Sets the `disabled` attribute of the `Checkbox`'s element
  
      @property disabled
      @default false
      @public
     */
    disabled: boolean;
    /**
      Corresponds to the `indeterminate` property of the `Checkbox`'s element
  
      @property disabled
      @default false
      @public
     */
    indeterminate: boolean;
    /**
      @property checked
      @default false
      @private
     */
    checked: boolean;
    /**
      Whenever the checkbox is inserted into the DOM, perform initialization steps, which include
      setting the indeterminate property if needed.
  
      If this method is overridden, `super` must be called.
  
      @method
      @public
     */
    didInsertElement(): void;
    /**
      Whenever the `change` event is fired on the checkbox, update its `checked` property to reflect
      whether the checkbox is checked.
  
      If this method is overridden, `super` must be called.
  
      @method
      @public
     */
    change(): void;
} & EmberComponent);
export default Checkbox;
