app.config([
  'formioComponentsProvider',
  'FORM_OPTIONS',
  function(
    formioComponentsProvider,
    FORM_OPTIONS
  ) {
    formioComponentsProvider.register('file', {
      onEdit: function($scope) {
        $scope.storage = FORM_OPTIONS.storage;
      },
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
      ],
      documentation: 'http://help.form.io/userguide/#file'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/file/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="storage" form-builder-tooltip="Which storage to save the files in.">Storage</label>' +
          '<select class="form-control" id="storage" name="storage" ng-options="store.name as store.title for store in storage" ng-model="component.storage"></select>' +
        '</div>' +
        '<form-builder-option property="dir"></form-builder-option>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/file/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/file/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="filePattern"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);
