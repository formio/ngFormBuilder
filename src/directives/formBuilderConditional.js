'use strict';

var _ = require('lodash');
var utils = require('formio-utils');

module.exports = [
  function() {
    return {
      restrict: 'E',
      scope: true,
      template: '' +
        '<uib-accordion>' +
          '<uib-accordion-group heading="Simple" is-open="status.simple">' +
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
          '</uib-accordion-group>' +
          '<uib-accordion-group heading="Advanced" is-open="status.advanced">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.customConditional" placeholder="/*** Example Code ***/\nshow = (data[\'mykey\'] > 1);">{{ component.validate.custom }}</textarea>' +
            '<small>' +
            '<p>Enter custom conditional code.</p>' +
            '<p>You must assign the <strong>show</strong> variable as either <strong>true</strong> or <strong>false</strong>.</p>' +
            '<p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
            '<p><strong>Note: Advanced Conditional logic will only work, if the Simple Conditional logic is not defined.</strong></p>' +
            '</small>' +
          '</uib-accordion-group>' +
        '</uib-accordion>',
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

          // Track the status of the accordion panels open state.
          $scope.status = {
            simple: !$scope.component.customConditional,
            advanced: !!$scope.component.customConditional
          };
        }
      ]
    };
  }
];
