/**
 * A directive that provides a UI for multiple masks input.
 */
module.exports = ['COMMON_OPTIONS', function (COMMON_OPTIONS) {
  return {
    scope: {
      component: '=',
      property: '@'
    },
    restrict: 'E',
    template: '<div class="form-group">' +
                '<label form-builder-tooltip="{{ tooltipText | formioTranslate }}">{{ label | formioTranslate }}</label>' +
                '<div class="input-group formio-multiple-mask-container">' +
                  '<select class="form-control formio-multiple-mask-select" ng-options="inputMask as inputMask.label | formioTranslate for inputMask in component.inputMasks" ng-model="mask"></select>' +
                  '<input type="text" class="form-control formio-multiple-mask-input" text-mask ng-model="value">' +
                '</div>' +
              '</div>',
    replace: true,
    link: function ($scope, el, attrs) {
      if (!$scope.property) {
        return;
      }
      $scope.label = (COMMON_OPTIONS[$scope.property] && COMMON_OPTIONS[$scope.property].label) || '';
      $scope.tooltip = (COMMON_OPTIONS[$scope.property] && COMMON_OPTIONS[$scope.property].tooltip) || '';
      if ($scope.property) {
        $scope.component[$scope.property] = {};
      }
      $scope.$watch('mask', function (newMask) {
        $scope.component[$scope.property].maskName = newMask.label || undefined;
        $scope.component.inputMask = newMask.mask || undefined;
      });

      $scope.$watch('value', function (newValue) {
        $scope.component[$scope.property].value = newValue;
      });
    }
  };
}];
