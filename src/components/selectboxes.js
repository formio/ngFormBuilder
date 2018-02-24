module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('selectboxes', {
        icon: 'fa fa-plus-square',
        views: [
          {
            name: 'Display',
            template: 'formio/components/selectboxes/display.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/selectboxes/validate.html'
          },
          {
            name: 'API',
            template: 'formio/components/selectboxes/api.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#selectboxes'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/selectboxes/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option-label-position></form-builder-option-label-position>' +
          '<form-builder-option-options-label-position></form-builder-option-options-label-position>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<value-builder-with-shortcuts form="form" component="component" data="component.values" default="component.defaultValue" label="Values" tooltip-text="The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form."></value-builder-with-shortcuts>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="errorLabel"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="inline" type="checkbox" label="Inline Layout" title="Displays the checkboxes horizontally."></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="fieldSet" type="checkbox" label="Wrap inside field set" title="Displays the radio buttons wrapped by a field-set and legend."></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="hidden"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="dataGridLabel"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      // Create the API markup.
      $templateCache.put('formio/components/selectboxes/api.html',
        '<ng-form>' +
          '<form-builder-option-key></form-builder-option-key>' +
        '</ng-form>'
      );

      // Create the API markup.
      $templateCache.put('formio/components/selectboxes/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="autofocus" type="checkbox" label="Add autofocus" tooltip="Set autofocus attribute to the field"></form-builder-option>' +
          '<form-builder-option property="validate.customMessage"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};
