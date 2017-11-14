/**
* A directive for a field to edit a component inputs' label position.
*/
module.exports = function() {
    return {
      restrict: 'E',
      replace: true,
      template: function() {
        return '<div class="form-group">' +
                  '<label for="inputsLabelPosition" form-builder-tooltip="Position for the label for inputs for this field.">{{\'Inputs Label Position\' | formioTranslate}}</label>' +
                  '<select class="form-control" id="inputsLabelPosition" name="inputsLabelPosition" ng-options="position.value as position.title | formioTranslate for position in inputsLabelPosition" ng-model="component.inputsLabelPosition"></select>' +
                '</div>';
      },
      controller: ['$scope', function($scope) {
        $scope.inputsLabelPosition = [
          {
            value: 'top',
            title: 'Top'
          },
          {
            value: 'left',
            title: 'Left'
          },
          {
            value: 'right',
            title: 'Right'
          },
          {
            value: 'bottom',
            title: 'Bottom'
          }
        ];

        if (!$scope.component.inputsLabelPosition) {
          $scope.component.inputsLabelPosition = 'top';
        }
      }]
    };
  };
