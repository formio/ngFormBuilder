app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('custom', {
      views: [
        {
          name: 'Custom',
          template: 'formio/components/custom/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#custom'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/custom/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);
