/**
* A directive for a field to edit a component's label position.
*/
module.exports = function() {
    return {
      restrict: 'E',
      replace: true,
      template: function() {
        return '<div>' +
                  '<div class="form-group">' +
                    '<label for="labelPosition" form-builder-tooltip="Position for the label for this field.">{{\'Label Position\' | formioTranslate}}</label>' +
                    '<select class="form-control" id="labelPosition" name="labelPosition" ng-options="position.value as position.title | formioTranslate for position in labelPositions" ng-model="component.labelPosition"></select>' +
                  '</div>' +
                  '<div class="form-group" ng-if="labelAtTheTopOrBottom()">' +
                  '  <label for="labelWidth" form-builder-tooltip="The width of label on line in percentages.">{{\'Label Width\' | formioTranslate}}</label>' +
                  '  <input type="number" class="form-control" id="labelWidth" name="labelWidth" ng-model="component.labelWidth" placeholder="30" min="0" max="100" />' +
                  '</div>' +
                  '<div class="form-group" ng-if="labelAtTheTopOrBottom()">' +
                  '  <label for="labelMargin" form-builder-tooltip="The width of label margin on line in percentages.">{{\'Label Margin\' | formioTranslate}}</label>' +
                  '  <input type="number" class="form-control" id="labelMargin" name="labelMargin" ng-model="component.labelMargin" placeholder="3" min="0" max="100" />' +
                  '</div>' +
                '</div>';
      },
      controller: ['$scope', function($scope) {
        $scope.labelPositions = [
          {
            value: 'top',
            title: 'Top'
          },
          {
            value: 'left-left',
            title: 'Left (Left-aligned)'
          },
          {
            value: 'left-right',
            title: 'Left (Right-aligned)'
          },
          {
            value: 'right-left',
            title: 'Right (Left-aligned)'
          },
          {
            value: 'right-right',
            title: 'Right (Right-aligned)'
          },
          {
            value: 'bottom',
            title: 'Bottom'
          }
        ];

        $scope.labelAtTheTopOrBottom = function() {
          return ['top', 'bottom'].indexOf($scope.component.labelPosition) === -1;
        };

        if (!$scope.component.labelPosition) {
          $scope.component.labelPosition = 'top';
        }
      }]
    };
  };
