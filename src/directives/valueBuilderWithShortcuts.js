/**
* A directive that provides a UI to add {value, label} objects to an array.
*/
var _difference = require('lodash/difference');
var _without = require('lodash/without');
var _map = require('lodash/map');
var _camelCase = require('lodash/camelCase');
module.exports = ['BuilderUtils', function(BuilderUtils) {
    return {
      scope: {
        form: '=',
        component: '=',
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
                  '<label form-builder-tooltip="{{ tooltipText | formioTranslate }}">{{ label | formioTranslate }}</label>' +
                  '<table class="table table-condensed">' +
                    '<thead>' +
                      '<tr>' +
                        '<th class="col-xs-5">{{ labelLabel | formioTranslate }}</th>' +
                        '<th class="col-xs-3">{{ valueLabel | formioTranslate }}</th>' +
                        '<th class="col-xs-2">{{ \'Shortcut\' | formioTranslate }}</th>' +
                        '<th class="col-xs-1"></th>' +
                      '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                      '<tr ng-repeat="v in data track by $index">' +
                        '<td class="col-xs-5"><input type="text" class="form-control" ng-model="v[labelProperty]" placeholder="{{ labelLabel | formioTranslate }}"/></td>' +
                        '<td class="col-xs-3"><input type="text" class="form-control" ng-model="v[valueProperty]" placeholder="{{ valueLabel | formioTranslate }}"/></td>' +
                        '<td class="col-xs-2"><select class="form-control" id="shortcut" name="shortcut" ng-options="shortcut as shortcut | formioTranslate for shortcut in shortcuts[$index]" ng-model="v.shortcut"  placeholder="Shortcut"></select></td>' +
                        '<td class="col-xs-1"><button type="button" class="btn btn-danger btn-xs" ng-click="removeValue($index)" tabindex="-1"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                      '</tr>' +
                    '</tbody>' +
                  '</table>' +
                  '<button type="button" class="btn btn-primary" ng-click="addValue()"><span class="glyphicon glyphicon-plus"></span> {{ \'Add Value\' | formioTranslate }}</button>' +
                '</div>',
      replace: true,
      link: function($scope, el, attrs) {
        $scope.valueProperty = $scope.valueProperty || 'value';
        $scope.labelProperty = $scope.labelProperty || 'label';
        $scope.valueLabel = $scope.valueLabel || 'Value';
        $scope.labelLabel = $scope.labelLabel || 'Label';

        var shortcuts = BuilderUtils.getAvailableShortcuts($scope.form, $scope.component);
        $scope.shortcuts = [];

        $scope.data = $scope.data || [];

        if ($scope.data.length) {
          updateShortcuts($scope.data);
        }

        $scope.addValue = function() {
          var obj = {};
          obj[$scope.valueProperty] = '';
          obj[$scope.labelProperty] = '';
          obj.shortcut = '';
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
            if (newValue.length !== oldValue.length) {
              updateShortcuts(newValue);
              return;
            }

            var shortcutChanged = false;
            _map(newValue, function(entry, i) {
              var oldEntry = oldValue[i];

              if (entry.shortcut !== oldEntry.shortcut) {
                shortcutChanged = true;
              }

              if (entry[$scope.labelProperty] !== oldEntry[$scope.labelProperty]) {// label changed
                if (entry[$scope.valueProperty] === '' || entry[$scope.valueProperty] === _camelCase(oldEntry[$scope.labelProperty])) {
                  entry[$scope.valueProperty] = _camelCase(entry[$scope.labelProperty]);
                }
              }
            });

            if (shortcutChanged) {
              updateShortcuts(newValue);
            }
          }, true);
        }

        function updateShortcuts(entries) {
          var bindedShortcuts = [];
          entries.forEach(function(entry) {
            if (entry.shortcut) {
              bindedShortcuts.push(entry.shortcut);
            }
          });
          $scope.shortcuts = entries.map(function(entry) {
            var shortcutsToOmit = _without(bindedShortcuts, entry.shortcut);
            return _difference(shortcuts, shortcutsToOmit);
          });
        }
      }
    };
  }
];
