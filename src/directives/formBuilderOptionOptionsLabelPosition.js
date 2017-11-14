/**
* A directive for a field to edit a component options' label position.
*/
module.exports = function() {
    return {
      restrict: 'E',
      replace: true,
      template: function() {
        return '<div class="form-group">' +
                  '<label for="optionsLabelPosition" form-builder-tooltip="Position for the label for options for this field.">{{\'Options Label Position\' | formioTranslate}}</label>' +
                  '<select class="form-control" id="optionsLabelPosition" name="optionsLabelPosition" ng-options="position.value as position.title | formioTranslate for position in optionsLabelPositions" ng-model="component.optionsLabelPosition"></select>' +
                '</div>';
      },
      controller: ['$scope', function($scope) {
        $scope.optionsLabelPositions = [
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

        if (!$scope.component.optionsLabelPosition) {
          $scope.component.optionsLabelPosition = 'right';
        }
      }]
    };
  };
