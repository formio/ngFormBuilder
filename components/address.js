app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('address', {
      views: [
        {
          name: 'Settings',
          template: 'formio/components/address/settings.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/address/validate.html'
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
      documentation: 'http://help.form.io/userguide/#address'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/address/settings.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="multiple" label="Allow Multiple Addresses"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/address/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);
