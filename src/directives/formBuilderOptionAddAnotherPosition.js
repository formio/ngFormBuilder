/**
* A directive for a datagrid to edit a component's button position.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '<div>' +
        '<div class="form-group">' +
        '<label for="addAnotherPosition" form-builder-tooltip="Position for Add Another button with respect to Data Grid Array.">{{\'Add Another Position\' | formioTranslate}}</label>' +
        '<select class="form-control" id="addAnotherPosition" name="addAnotherPosition" ng-options="position.value as position.title | formioTranslate for position in addAnotherPosition" ng-model="component.addAnotherPosition"></select>' +
        '</div>';
    },
    controller: ['$scope', function($scope) {
      $scope.addAnotherPosition = [
        {
          value: 'top',
          title: 'Top'
        },
        {
          value: 'bottom',
          title: 'Bottom'
        },
        {
          value: 'both',
          title: 'Both'
        }
      ];

      if (!$scope.component.addAnotherPosition) {
        $scope.component.addAnotherPosition = 'bottom';
      }
    }]
  };
};
