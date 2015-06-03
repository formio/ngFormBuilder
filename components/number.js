app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('number', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/number/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/number/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/textfield/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/number/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="validate.step" label="Increment (Step)" placeholder="Enter how much to increment per step (or precision)."></form-builder-option>' +
        '<form-builder-option property="prefix"></form-builder-option>' +
        '<form-builder-option property="suffix"></form-builder-option>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/number/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="validate.min" type="number" label="Minimum Value" placeholder="Minimum Value"></form-builder-option>' +
        '<form-builder-option property="validate.max" type="number" label="Maximum Value" placeholder="Maximum Value"></form-builder-option>' +
        '<form-builder-option property="validate.greater" type="number" label="Greater Than" placeholder="Greater Than"></form-builder-option>' +
        '<form-builder-option property="validate.less" type="number" label="Less Than" placeholder="Less Than"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);

