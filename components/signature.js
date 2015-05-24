app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('signature', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/signature/display.html'
        },
        {
          name: 'API',
          template: 'formio/components/signature/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/signature/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Footer Label</label>' +
          '<input type="text" class="form-control" id="footer" name="footer" ng-model="component.footer" placeholder="Footer Label" value="{{ component.footer }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Width</label>' +
          '<input type="text" class="form-control" id="width" name="width" ng-model="component.width" placeholder="Width" value="{{ component.width }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Height</label>' +
          '<input type="text" class="form-control" id="height" name="height" ng-model="component.height" placeholder="Height" value="{{ component.height }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Background Color</label>' +
          '<input type="text" class="form-control" id="backgroundColor" name="backgroundColor" ng-model="component.backgroundColor" placeholder="Background Color" value="{{ component.backgroundColor }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Pen Color</label>' +
          '<input type="text" class="form-control" id="penColor" name="penColor" ng-model="component.penColor" placeholder="Pen Color" value="{{ component.penColor }}">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/signature/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-blur="component.lockKey = true;" ng-required>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
