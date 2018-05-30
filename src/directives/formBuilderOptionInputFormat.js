/**
* A directive for a field to edit a component input format.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '<div class="form-group">' +
                '<label for="inputFormat" form-builder-tooltip="Input format protects from cross-site scripting attacks.">{{\'Input Format\' | formioTranslate}}</label>' +
                '<select class="form-control" id="inputFormat" name="inputFormat" ng-options="format.value as format.title | formioTranslate for format in formats" ng-model="component.inputFormat"></select>' +
              '</div>';
    },
    controller: ['$scope', function($scope) {
      $scope.formats = [
        {
          value: 'plain',
          title: 'Plain'
        },
        {
          value: 'html',
          title: 'HTML'
        },
        {
          value: 'raw',
          title: 'Raw (Insecure)'
        }
      ];

      if (!$scope.component.inputFormat) {
        if ($scope.component.type === 'textarea') {
          $scope.$watch('component.wysiwyg', function(wysiwyg) {
            $scope.component.inputFormat = wysiwyg ? 'html' : 'plain';
          });
        }

        $scope.component.inputFormat = 'plain';
      }
    }]
  };
};
