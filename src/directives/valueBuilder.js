/**
* A directive that provides a UI to add {value, label} objects to an array.
*/
module.exports = function() {
  return {
    scope: {
      data: '=',
      label: '@',
      tooltipText: '@',
      valueLabel: '@',
      labelLabel: '@',
      valueProperty: '@',
      labelProperty: '@'
    },
    restrict: 'E',
    template: '<div class="form-group">' +
                '<label form-builder-tooltip="{{ tooltipText }}">{{ label }}</label>' +
                '<table class="table table-condensed">' +
                  '<thead>' +
                    '<tr>' +
                      '<th class="col-xs-6">{{ labelLabel }}</th>' +
                      '<th class="col-xs-4">{{ valueLabel }}</th>' +
                      '<th class="col-xs-2"></th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr ng-repeat="v in data track by $index">' +
                      '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v[labelProperty]" placeholder="{{ labelLabel }}"/></td>' +
                      '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v[valueProperty]" placeholder="{{ valueLabel }}"/></td>' +
                      '<td class="col-xs-2"><button type="button" class="btn btn-danger btn-xs" ng-click="removeValue($index)" tabindex="-1"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                    '</tr>' +
                  '</tbody>' +
                '</table>' +
                '<button type="button" class="btn" ng-click="addValue()">Add {{ valueLabel }}</button>' +
              '</div>',
    replace: true,
    link: function($scope, el, attrs) {
      $scope.valueProperty = $scope.valueProperty || 'value';
      $scope.labelProperty = $scope.labelProperty || 'label';
      $scope.valueLabel = $scope.valueLabel || 'Value';
      $scope.labelLabel = $scope.labelLabel || 'Label';

      $scope.addValue = function() {
        var obj = {};
        obj[$scope.valueProperty] = '';
        obj[$scope.labelProperty] = '';
        $scope.data.push(obj);
      };

      $scope.removeValue = function(index) {
        $scope.data.splice(index, 1);
      };

      if ($scope.data.length === 0) {
        $scope.addValue();
      }

      if (!attrs.noAutocompleteValue) {
        $scope.$watch('data', function(newValue, oldValue) {
          // Ignore array addition/deletion changes
          if (newValue.length !== oldValue.length) {
            return;
          }

          _.map(newValue, function(entry, i) {
            if (entry[$scope.labelProperty] !== oldValue[i][$scope.labelProperty]) {// label changed
              if (entry[$scope.valueProperty] === '' || entry[$scope.valueProperty] === _.camelCase(oldValue[i][$scope.labelProperty])) {
                entry[$scope.valueProperty] = _.camelCase(entry[$scope.labelProperty]);
              }
            }
          });
        }, true);
      }
    }
  };
};
