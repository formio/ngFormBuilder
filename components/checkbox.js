app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('checkbox', {
      views: [
        {
          name: 'Settings',
          template: 'formio/components/checkbox/settings.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/checkbox/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/checkbox/api.html'
        },
        {
          name: 'Display',
          template: 'formio/components/checkbox/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#checkbox'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/checkbox/settings.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/checkbox/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/checkbox/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/checkbox/display.html',
      '<ng-form>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);
