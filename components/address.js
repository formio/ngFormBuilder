app.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('address', {
    views: [
      {
        name: 'Display',
        template: 'formio/components/address/display.html'
      },
      {
        name: 'Validation',
        template: 'formio/components/address/validate.html'
      },
      {
        name: 'API',
        template: 'formio/components/address/api.html'
      }
    ]
  });
});
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/address/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Allow Multiple Addresses' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/address/api.html',
      '<ng-form>' +
      '<div class="form-group">' +
      '<label for="key">Property Name</label>' +
      '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
      '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/address/validate.html',
      '<ng-form>' +
      '<div class="form-group">' +
      '<label for="key">Required</label>' +
      '</div>' +
      '</ng-form>'
    );
  }
]);
