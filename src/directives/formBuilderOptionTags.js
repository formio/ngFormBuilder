/**
* A directive for a field to edit a component's tags.
*/
var _map = require('lodash/map');
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '' +
        '<div class="form-group">' +
        '  <label class="control-label" form-builder-tooltip="Tag the field for use in custom logic.">Field Tags</label>' +
        '  <tags-input ng-model="tags" on-tag-added="addTag($tag)" on-tag-removed="removeTag($tag)"></tags-input>' +
        '</div>';
    },
    controller: ['$scope', function($scope) {
      $scope.component.tags = $scope.component.tags || [];
      $scope.tags = _map($scope.component.tags, function(tag) {
        return {text: tag};
      });

      $scope.addTag = function(tag) {
        if (!$scope.component) {
          return;
        }
        if (!$scope.component.tags) {
          $scope.component.tags = [];
        }
        $scope.component.tags.push(tag.text);
      };
      $scope.removeTag = function(tag) {
        if ($scope.component.tags && $scope.component.tags.length) {
          var tagIndex = $scope.component.tags.indexOf(tag.text);
          if (tagIndex !== -1) {
            $scope.component.tags.splice(tagIndex, 1);
          }
        }
      };
    }]
  };
};
