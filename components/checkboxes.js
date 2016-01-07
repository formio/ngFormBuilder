app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('checkboxes', {
      views: [
        {
          name: 'Settings',
          template: 'formio/components/checkboxes/settings.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/checkboxes/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/checkboxes/api.html'
        },
        {
          name: 'Display',
          template: 'formio/components/checkboxes/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#checkboxes'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/checkboxes/settings.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<value-builder data="component.values" label="Checkboxes" tooltip-text="Checkboxes to display. Labels are shown in the form. Values are the corresponding values saved with the submission."></value-builder>' +
        '<form-builder-option property="inline" type="checkbox" label="Inline Layout" title="Displays the checkboxes horizontally."></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/checkboxes/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/checkboxes/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/checkboxes/display.html',
      '<ng-form>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);
