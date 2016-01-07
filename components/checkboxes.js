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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Display',
          template: 'formio/components/common/display.html'
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

    $templateCache.put('formio/components/checkboxes/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);
