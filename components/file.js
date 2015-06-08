app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('file', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/file/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/file/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/file/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/file/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Multiple Values' +
          '</label>' +
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
    $templateCache.put('formio/components/file/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-blur="component.lockKey = true;" ng-required>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/file/validate.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="required" name="required" ng-model="component.validate.required" ng-checked="component.validate.required"> Required' +
          '</label>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Minimum File Size in Bytes</label>' +
          '<input type="text" class="form-control" id="minSizeLimit" name="minSizeLimit" ng-model="component.validate.minSizeLimit" placeholder="Minimum File Size in Bytes" value="{{ component.validate.minSizeLimit }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Maximum File Size in Bytes</label>' +
          '<input type="text" class="form-control" id="maxSizeLimit" name="maxSizeLimit" ng-model="component.validate.maxSizeLimit" placeholder="Maximum File Size in Bytes" value="{{ component.validate.maxSizeLimit }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Allowed Extensions</label>' +
          '<input type="text" class="form-control" id="allowedExtensions" name="allowedExtensions" ng-list ng-model="component.validate.allowedExtensions" placeholder="Allowed Extensions" value="{{ component.validate.allowedExtensions }}">' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
