app.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('resource', {
    onEdit: function($scope, component, Formio) {
      $scope.resources = [];
      var loader = new Formio();
      loader.loadResources().then(function(resources) {
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
});
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/resource/display.html',
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
          '<label for="placeholder">Resource</label>' +
          '<select class="form-control" id="resource" name="resource" ng-options="value._id as value.title for value in resources" ng-model="component.resource"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Search Expression</label>' +
          '<input type="text" class="form-control" id="searchExpression" name="searchExpression" ng-model="component.searchExpression" placeholder="The search string regular expression" value="{{ component.searchExpression }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Search Fields</label>' +
          '<input type="text" class="form-control" id="searchFields" name="searchFields" ng-model="component.searchFields" ng-list placeholder="The search field parings" value="{{ component.searchFields }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<div class="form-group checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Allow Multiple Resources' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/resource/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
        '</div>' +
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
