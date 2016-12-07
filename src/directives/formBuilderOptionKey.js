/**
* A directive for a field to edit a component's key.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '<div class="form-group" ng-class="{\'has-warning\': shouldWarnAboutEmbedding()}">' +
                '<label for="key" class="control-label" form-builder-tooltip="The name of this field in the API endpoint.">Property Name</label>' +
                '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" valid-api-key value="{{ component.key }}" ' +
                'ng-disabled="component.source" ng-blur="onBlur()">' +
                '<p ng-if="shouldWarnAboutEmbedding()" class="help-block"><span class="glyphicon glyphicon-exclamation-sign"></span> ' +
                  'Using a dot in your Property Name will link this field to a field from a Resource. Doing this manually is not recommended because you will experience unexpected behavior if the Resource field is not found. If you wish to embed a Resource field in your form, use a component from the corresponding Resource Components category on the left.' +
                '</p>' +
              '</div>';
    },
    controller: ['$scope', 'FormioUtils', function($scope, FormioUtils) {
      var suffixRegex = /(\d+)$/;

      // Prebuild a list of existing components.
      var existingComponents = {};
      FormioUtils.eachComponent($scope.form.components, function(component) {
        // Don't add to existing components if current component or if it is new. (New could mean same as another item).
        if (component.key && ($scope.component.key !== component.key || $scope.component.isNew)) {
          existingComponents[component.key] = component;
        }
      }, true);

      var keyExists = function(component) {
        if (existingComponents.hasOwnProperty(component.key)) {
          return true;
        }
        return false;
      };

      var iterateKey = function(componentKey) {
        if (!componentKey.match(suffixRegex)) {
          return componentKey + '1';
        }

        return componentKey.replace(suffixRegex, function(suffix) {
          return Number(suffix) + 1;
        });
      };

      // Appends a number to a component.key to keep it unique
      var uniquify = function() {
        if (!$scope.component.key) {
          return;
        }
        while (keyExists($scope.component)) {
          $scope.component.key = iterateKey($scope.component.key);
        }
      };

      $scope.$watch('component.key', uniquify);

      $scope.onBlur = function() {
        $scope.component.lockKey = true;

        // If they try to input an empty key, refill it with default and let uniquify
        // make it unique
        if (!$scope.component.key && $scope.formComponents[$scope.component.type].settings.key) {
          $scope.component.key = $scope.formComponents[$scope.component.type].settings.key;
          $scope.component.lockKey = false; // Also unlock key
          uniquify();
        }
      };

      $scope.shouldWarnAboutEmbedding = function() {
        if (!$scope.component || !$scope.component.key) {
          return false;
        }
        return !$scope.component.source && $scope.component.key.indexOf('.') !== -1;
      };
    }]
  };
};
