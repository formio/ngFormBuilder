/**
* A directive that provides a UI to add {value, label} objects to an array.
*/
var _map = require('lodash/map');
var _camelCase = require('lodash/camelCase');
module.exports = function() {
  return {
    scope: {
      data: '=',
      label: '@',
      tooltipText: '@',
      valueLabel: '@',
      labelHeader: '@',
      valueProperty: '@',
      headerProperty: '@'
    },
    restrict: 'E',
    template: '<div class="form-group">' +
                '<label form-builder-tooltip="{{ tooltipText | formioTranslate }}">{{ label | formioTranslate }}</label>' +
                '<table class="table table-condensed">' +
                  '<thead>' +
                    '<tr>' +
                      '<th class="col-xs-6">{{ labelHeader | formioTranslate }}</th>' +
                      '<th class="col-xs-4">{{ valueLabel | formioTranslate }}</th>' +
                      '<th class="col-xs-2"></th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr ng-repeat="v in data track by $index">' +
                      '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v[headerProperty]" placeholder="{{ labelHeader | formioTranslate }}"/></td>' +
                      '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v[valueProperty]" placeholder="{{ valueLabel | formioTranslate }}"/></td>' +
                      '<td class="col-xs-2"><button type="button" class="btn btn-danger btn-xs" ng-click="removeValue($index)" tabindex="-1"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                    '</tr>' +
                  '</tbody>' +
                '</table>' +
                '<button type="button" class="btn btn-primary" ng-click="addValue()"><span class="glyphicon glyphicon-plus"></span> {{ \'Add Header\'' +
    ' | formioTranslate' +
    ' }}</button>' +
              '</div>',
    replace: true,
    link: function($scope, el, attrs) {
      $scope.valueProperty = $scope.valueProperty || 'value';
      $scope.headerProperty = $scope.headerProperty || 'header';
      $scope.valueLabel = $scope.valueLabel || 'Value';
      $scope.labelHeader = $scope.labelHeader || 'Header';
      $scope.data = $scope.data || [];

      $scope.addValue = function() {
        var obj = {};
        obj[$scope.valueProperty] = '';
        obj[$scope.headerProperty] = '';
        $scope.data.push(obj);
      };

      $scope.removeValue = function(index) {
        $scope.data.splice(index, 1);
      };
    }
  };
};
