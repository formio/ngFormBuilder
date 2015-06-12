app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('select', {
      icon: 'fa fa-th-list',
      views: [
        {
          name: 'Display',
          template: 'formio/components/select/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/select/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/select/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/select/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The data to populate the select field items from. This can either be a JSON array of values, or a URL that returns a JSON array.">Data Source</label>' +
          '<textarea class="form-control" id="dataSrc" name="dataSrc" ng-model="component.dataSrc" placeholder="Data Source URL or JSON" rows="3">{{ component.dataSrc }}</textarea>' +
        '</div>' +
        '<form-builder-option property="valueProperty" label="Value Property" placeholder="The selected items property to save." title="The property of each item in the data source to use as the select value. If not specified, the item itself will be used."></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The HTML template for the result data items.">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/select/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/select/validate.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Required</label>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
