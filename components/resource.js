app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('resource', {
      onEdit: function($scope, component, Formio) {
        $scope.resources = [];
        var loader = new Formio('/app/' + $scope.app);
        loader.loadForms({params: {type: 'resource'}}).then(function(resources) {
          $scope.resources = resources;
          if (!$scope.component.resource) {
            $scope.component.resource = resources[0]._id;
          }
        });
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/resource/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/resource/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/resource/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/resource/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The resource to be used with this field.">Resource</label>' +
          '<select class="form-control" id="resource" name="resource" ng-options="value._id as value.title for value in resources" ng-model="component.resource"></select>' +
        '</div>' +
        '<form-builder-option property="searchExpression" label="Search Expression" placeholder="The search string regular expression"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder">Search Fields</label>' +
          '<input type="text" class="form-control" id="searchFields" name="searchFields" ng-model="component.searchFields" ng-list placeholder="The search field parings" value="{{ component.searchFields }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The HTML template for the result data items.">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<form-builder-option property="multiple" label="Allow Multiple Resources"></form-builder-option>' +
      '</ng-form>'
    );
    // Create the API markup.
    $templateCache.put('formio/components/resource/api.html',
      '<ng-form>' +
        '<form-builder-option-key disable-on-lock></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/resource/validate.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Required</label>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
