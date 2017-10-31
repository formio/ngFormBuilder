/**
* A directive for a field to edit a component's shortcut.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '' +
        '<div class="form-group">' +
        '  <label for="shortcut" form-builder-tooltip="Shortcut for this component.">{{\'Shortcut\' | formioTranslate}}</label>' +
        '  <select class="form-control" id="shortcut" name="shortcut" ng-options="shortcut as shortcut | formioTranslate for shortcut in shortcuts" ng-model="component.shortcut" placeholder="Shortcut"></select>' +
        '</div>';
    },
    controller: ['$scope', 'BuilderUtils', function($scope, BuilderUtils) {
      $scope.shortcuts = BuilderUtils.getAvailableShortcuts($scope.form, $scope.component);
    }]
  };
};
