var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'restangular',
  'ngDialog',
  'ui.bootstrap.accordion'
]);
app.service('formBuilderTools', function() {
  return {
    toCamelCase: function(input) {
      return input.toLowerCase().replace(/ (.)/g, function(match, group1) {
        return group1.toUpperCase();
      });
    }
  };
});
app.directive('formBuilder', function() {
  return {
    replace: true,
    templateUrl: 'formio/formbuilder/builder.html',
    scope: {
      app: '=',
      form: '='
    },
    controller: [
      '$scope',
      'formioComponents',
      'formBuilderTools',
      'ngDialog',
      'Restangular',
      'Formio',
      function(
        $scope,
        formioComponents,
        formBuilderTools,
        ngDialog,
        Restangular,
        Formio
      ) {

        // Add the components to the scope.
        $scope.formio = new Formio('/app/' + $scope.app);
        $scope.formComponents = formioComponents.components;
        $scope.formComponentGroups = formioComponents.groups;
        $scope.formComponentsByGroup = _.groupBy($scope.formComponents, function(component) {
          return component.group;
        });

        // Get the resource fields.
        Restangular.one('app', $scope.app).all('resource').getList().then(function(resources) {

          // Iterate through all resources.
          _.each(resources, function(resource) {

            // Add the component group.
            $scope.formComponentGroups[resource.title.toLowerCase()] = {
              title: resource.title + ' Fields'
            };

            // Create a new group for this resource.
            $scope.formComponentsByGroup[resource.title.toLowerCase()] = {};

            // Iterate through each component.
            _.each(resource.components, function(component) {

              // Add the component to the list.
              var resourceKey = resource.title.toLowerCase();
              $scope.formComponentsByGroup[resourceKey][resourceKey + '.' + component.key] = _.merge(
                _.clone(formioComponents.components[component.type], true),
                {
                  title: resource.title + ' ' + component.label,
                  group: resourceKey,
                  settings: component
                },
                {
                  settings: {
                    label: resource.title + ' ' + component.label,
                    key: resourceKey + '.' + component.key,
                    lockKey: true
                  }
                }
              );
            });
          });
        });

        if (!$scope.form.components) {
          $scope.form.components = [];
        }

        // Remove a component.
        $scope.removeComponent = function() {
          $scope.componentList.splice($scope.componentList.indexOf($scope.component), 1);
          ngDialog.closeAll();
        };

        // Add a new component.
        $scope.addComponent = function(list, component) {
          $scope.editComponent(list, component);
          return component;
        };

        // Edit a specific component.
        $scope.editComponent = function(list, component) {
          // Set the active component.
          $scope.component = component;
          $scope.componentList = list;
          $scope.data = {};
          if (component.key) {
            $scope.data[component.key] = '';
          }
          $scope.previousSettings = angular.copy(component);

          $scope.$watch('component.multiple', function(value) {
            $scope.data[$scope.component.key] = value ? [''] : '';
          });

          // Watch the settings label and auto set the key from it.
          $scope.$watch('component.label', function() {
            if ($scope.component.label && !$scope.component.lockKey) {
              if ($scope.data.hasOwnProperty($scope.component.key)) {
                delete $scope.data[$scope.component.key];
              }
              $scope.component.key = formBuilderTools.toCamelCase($scope.component.label);
              $scope.data[$scope.component.key] = $scope.component.multiple ? [''] : '';
            }
          });

          // Allow the component to add custom logic to the edit page.
          if (
            formioComponents.components[component.type] &&
            formioComponents.components[component.type].onEdit
          ) {
            formioComponents.components[component.type].onEdit($scope, component, Formio);
          }

          // Open the dialog.
          ngDialog.open({
            template: 'formio/components/settings.html',
            scope: $scope,
            className: 'ngdialog-theme-default component-settings'
          });
        };

        // Cancel the settings.
        $scope.cancelSettings = function() {
          $scope.component = $scope.previousSettings;
          ngDialog.close();
        };

        // The settings are already bound, so just close the dialog.
        $scope.saveSettings = function() {
          ngDialog.close();
        };
      }
    ]
  };
});

/**
 * Create the form-builder-component directive.
 * Extend the formio-component directive and change the template.
 */
app.directive('formBuilderComponent', [
  'formioComponentDirective',
  function(formioComponentDirective) {
    return angular.extend({}, formioComponentDirective[0], {
      scope: false,
      templateUrl: 'formio/formbuilder/component.html'
    });
  }
]);
app.directive('formBuilderElement', [
  'formioElementDirective',
  function(formioElementDirective) {
    return angular.extend({}, formioElementDirective[0], {
      scope: false,
      controller: [
        '$scope',
        'formioComponents',
        function(
          $scope,
          formioComponents
        ) {
          var component = formioComponents.components[$scope.component.type];
          if (component.fbtemplate) {
            $scope.template = component.fbtemplate;
          }
        }
      ]
    });
  }
]);
app.directive('formBuilderList', function() {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    templateUrl: 'formio/formbuilder/list.html'
  };
});
app.directive('formBuilderComponentList', function() {
  return {
    scope: false,
    restrict: 'E',
    replace: true,
    templateUrl: 'formio/formbuilder/component-list.html'
  };
});
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/component.html',
      '<div class="component-form-group" ng-class="{highlight: hover}" ng-mouseenter="hover = true" ng-mouseleave="hover = false">' +
        '<button class="btn btn-xs btn-default component-settings-button" style="z-index: 1000" ng-click="editComponent(form.components, component)"><span class="glyphicon glyphicon-cog"></span></button>' +
        '<button class="btn btn-xs btn-default component-settings-button" style="z-index: 1000" disabled="disabled"><span class="glyphicon glyphicon glyphicon-move"></span></button>' +
        '<div class="form-group has-feedback" style="position:inherit"><form-builder-element></form-builder-element></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/list.html',
      '<ul class="component-list" ' +
        'dnd-list="form.components"' +
        'dnd-drop="addComponent(form.components, item)">' +
        '<li ng-if="form.components.length === 0">' +
          '<div class="alert alert-info" style="text-align:center; margin-bottom: 0px;" role="alert">' +
            'Drag and Drop a form component' +
          '</div>' +
        '</li>' +
        '<li ng-repeat="component in form.components" ' +
          'dnd-draggable="component" ' +
          'dnd-effect-allowed="move" ' +
          'dnd-moved="form.components.splice($index, 1)">' +
          '<form-builder-component></form-builder-component>' +
        '</li>' +
      '</ul>'
    );

    $templateCache.put('formio/formbuilder/component-list.html',
      '<ul class="component-list" ' +
        'dnd-list="component.components"' +
        'dnd-drop="addComponent(component.components, item)">' +
        '<li ng-repeat="component in component.components" ' +
          'dnd-draggable="component" ' +
          'dnd-effect-allowed="move" ' +
          'dnd-moved="component.components.splice($index, 1)">' +
          '<form-builder-component></form-builder-component>' +
        '</li>' +
      '</ul>'
    );

    $templateCache.put('formio/formbuilder/builder.html',
      '<div class="row">' +
        '<div class="col-sm-3">' +
          '<accordion close-others="true">' +
            '<accordion-group ng-repeat="(groupName, group) in formComponentGroups" heading="{{ group.title }}" is-open="$first">' +
              '<ul class="form-component-list">' +
                '<li ng-repeat="component in formComponentsByGroup[groupName]"' +
                  'dnd-draggable="component.settings"' +
                  'dnd-effect-allowed="copy">' +
                  '<button type="button" class="btn btn-success btn-block" disabled="disabled">{{component.title}}</button>' +
                '</li>' +
              '</ul>' +
            '</accordion-group>' +
          '</accordion>' +
        '</div>' +
        '<div class="col-sm-9 formbuilder">' +
          '<tabset>' +
            '<tab heading="Page 1">' +
              '<div class="dropzone">' +
                '<form-builder-list></form-builder-list>' +
              '</div><br>' +
              '<button type="button" class="btn btn-info btn-block" ng-click=""><i class="glyphicon glyphicon-plus-sign"></i> Add Behavior</button>' +
            '</tab>' +
            '<tab><tab-heading><i class="glyphicon glyphicon-plus-sign"></i> Add Page</tab-heading></tab>' +
          '</tabset>' +
        '</div>' +
      '</div>'
    );
  }
]);
