app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('radio', {
      views: [
        {
          name: 'Settings',
          template: 'formio/components/radio/settings.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/radio/validate.html'
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
      documentation: 'http://help.form.io/userguide/#radio'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/radio/settings.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<value-builder data="component.values" label="Values" tooltip-text="The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form."></value-builder>' +
        '<form-builder-option property="inline" type="checkbox" label="Inline Layout" title="Displays the radio buttons horizontally."></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );
    // Create the API markup.
    $templateCache.put('formio/components/radio/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);
