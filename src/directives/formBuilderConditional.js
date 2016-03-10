'use strict';

var _ = require('lodash');
var utils = require('formio-utils');

module.exports = [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template:
      '<div>' +
        'This component should:' +
        '<select class="form-control input-md" ng-model="_boolean">' +
          '<option ng-repeat="item in _booleans track by $index" value="{{item.value}}">{{item.label}}</option>' +
        '</select>' +
        '<br>When the form component:' +
        '<select class="form-control input-md" ng-model="_component">' +
          '<option ng-repeat="item in _components track by $index" value="{{item.key}}">{{item.label}}</option>' +
        '</select>' +
        '<br>Has the value:' +
        '<input type="text" class="form-control input-md" ng-model="_searchValue">' +
      '</div>',
      controller: [
        '$scope',
        function(
          $scope
        ) {
          // Default the current components conditional logic.
          $scope.component = $scope.component || {};
          $scope.component.conditional = $scope.component.conditional || {};

          // The available logic functions.
          $scope._booleans = [
            {value: '', label: ''},
            {value: true, label: 'Display'},
            {value: false, label: 'Hide'}
          ];

          // Filter the list of available form components for conditional logic.
          $scope._components = _.get($scope, 'form.components') || [];
          $scope._components = utils.flattenComponents($scope._components);
          // Remove non-input/button fields because they don't make sense.
          $scope._components = _.reject($scope._components, function(c) {
            return !c.input || (c.type === 'button');
          });

          // Add default item to the components list.
          $scope._components.unshift('');

          // Default and watch the show logic.
          $scope.component.conditional.show = $scope.component.conditional.show || null;
          $scope._boolean = $scope.component.conditional.show;
          $scope.$watch('_boolean', function(newVal) {
            $scope.component.conditional.show = newVal || false;
          });

          // Default and watch the when logic.
          $scope.component.conditional.when = $scope.component.conditional.when || null;
          $scope._component = $scope.component.conditional.when;
          $scope.$watch('_component', function(newVal) {
            $scope.component.conditional.when = newVal;
          });

          // Default and watch the search logic.
          $scope.component.conditional.eq = $scope.component.conditional.eq || '';
          $scope._searchValue = $scope.component.conditional.eq;
          $scope.$watch('_searchValue', function(newVal) {
            $scope.component.conditional.eq = newVal;
          });
        }
      ]
    };
  }
];
