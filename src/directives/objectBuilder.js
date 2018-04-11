/**
* A directive that provides a UI to add key-value pair object.
*/
module.exports = function() {
  return {
    scope: {
      data: '=',
      label: '@',
      tooltipText: '@'
    },
    restrict: 'E',
    template: '<div class="form-group">' +
                '<label form-builder-tooltip="{{ tooltipText | formioTranslate }}">{{ label | formioTranslate }}</label>' +
                '<table class="table table-condensed">' +
                  '<thead>' +
                    '<tr>' +
                      '<th class="col-xs-6">{{ "Key" | formioTranslate }}</th>' +
                      '<th class="col-xs-4">{{ "Value" | formioTranslate }}</th>' +
                      '<th class="col-xs-2"></th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr ng-repeat="v in dataArray track by $index">' +
                      '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v.key" placeholder="{{ \'Key\' | formioTranslate }}"/></td>' +
                      '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v.value" placeholder="{{ \'Value\' | formioTranslate }}"/></td>' +
                      '<td class="col-xs-2"><button type="button" class="btn btn-danger btn-xs" ng-click="removeValue($index)" tabindex="-1"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                    '</tr>' +
                  '</tbody>' +
                '</table>' +
                '<button type="button" class="btn btn-primary" ng-click="addValue()"><span class="glyphicon glyphicon-plus"></span> {{ \'Add Value\' | formioTranslate }}</button>' +
              '</div>',
    replace: true,
    link: function($scope) {
      init();

      $scope.addValue = function() {
        $scope.dataArray.push({key: '', value: ''});
      };

      $scope.removeValue = function(index) {
        $scope.dataArray.splice(index, 1);
      };

      if ($scope.dataArray.length === 0) {
        $scope.addValue();
      }

      $scope.$watch('data', init);

      $scope.$watch('dataArray', function(newValue) {
        $scope.data = {};
        for (var i in newValue) {
          var item = newValue[i];
          $scope.data[item.key] = item.value;
        }
      }, true);

      function init() {
        $scope.data = $scope.data || {};
        $scope.dataArray = [];
        for (var key in $scope.data) {
          $scope.dataArray.push({
            key: key,
            value: $scope.data[key]
          });
        }
      }
    }
  };
};
