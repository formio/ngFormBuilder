app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('checkbox', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/checkbox/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/checkbox/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/checkbox/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/checkbox/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.protected" ng-checked="component.protected"> Protected' +
          '</label>' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="persistent" name="persistent" ng-model="component.persistent" ng-checked="component.persistent"> Persistent' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/checkbox/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-blur="component.lockKey = true;" ng-required>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/checkbox/validate.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="required" name="required" ng-model="component.validate.required" ng-checked="component.validate.required"> Required' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
