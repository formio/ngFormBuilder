app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('hidden', {
      fbtemplate: 'formio/formbuilder/hidden.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/hidden/display.html'
        },
        {
          name: 'API',
          template: 'formio/components/hidden/api.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#hidden'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    $templateCache.put('formio/formbuilder/hidden.html', '<span class="hidden-element-text">{{ component.label }}</span>');

    // Create the settings markup.
    $templateCache.put('formio/components/hidden/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Name</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Enter the name for this hidden field" value="{{ component.label }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="unique" name="unique" ng-model="component.unique" ng-checked="component.unique"> Unique' +
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
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/hidden/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-blur="component.lockKey = true;" ng-required>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
