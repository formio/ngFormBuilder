components.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('phoneNumber', {
    views: [
      {
        name: 'Display',
        template: 'formio/components/phoneNumber/display.html'
      },
      {
        name: 'Validation',
        template: 'formio/components/phoneNumber/validate.html'
      },
      {
        name: 'API',
        template: 'formio/components/phoneNumber/api.html'
      }
    ]
  });
});
components.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/phoneNumber/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Input Mask</label>' +
          '<input type="text" class="form-control" id="inputMask" name="inputMask" ng-model="component.inputMask" placeholder="Input Mask" value="{{ component.inputMask }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="prefix">Prefix</label>' +
          '<input type="text" class="form-control" id="prefix" name="prefix" ng-model="component.prefix" placeholder="example \'$\', \'@\'" value="{{ component.prefix }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="suffix">Suffix</label>' +
          '<input type="text" class="form-control" id="suffix" name="suffix" ng-model="component.suffix" placeholder="example \'%\', \'#\'" value="{{ component.suffix }}">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/phoneNumber/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/phoneNumber/validate.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Required</label>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
