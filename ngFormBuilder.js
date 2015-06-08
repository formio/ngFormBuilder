var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'restangular',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ngCkeditor'
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
      'Formio',
      function(
        $scope,
        formioComponents,
        formBuilderTools,
        ngDialog,
        Formio
      ) {

        // Add the components to the scope.
        $scope.formio = new Formio('/app/' + $scope.app);
        $scope.formComponents = formioComponents.components;
        $scope.formComponentGroups = formioComponents.groups;
        $scope.formComponentsByGroup = _.groupBy($scope.formComponents, function(component) {
          return component.group;
        });

        // Add the submit button to the components.
        if ($scope.form.components.length === 0) {
          $scope.form.components.push(formioComponents.components.button.settings);
        }

        // Get the resource fields.
        $scope.formio.loadForms({params: {type: 'resource'}}).then(function(resources) {

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

              if (component.type === 'button') { return; }

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

        // Find the appropriate list.
        var findList = function(components, component) {
          var i = components.length;
          var list = null;
          outerloop:
          while (i--) {
            if (components[i] === component) {
              return components;
            }
            else if (components[i].hasOwnProperty('columns')) {
              var j = components[i].columns.length;
              while (j--) {
                list = findList(components[i].columns[j].components, component);
                if (list) {
                  break outerloop;
                }
              }
            }
            else if (components[i].hasOwnProperty('components')) {
              list = findList(components[i].components, component);
              if (list) {
                break;
              }
            }
          }
          return list;
        };

        // Remove a component.
        $scope.removeComponent = function(component) {
          var list = findList($scope.form.components, component);
          if (list) {
            list.splice(list.indexOf(component), 1);
          }
          ngDialog.closeAll();
        };

        // Add a new component.
        $scope.addComponent = function(list, component) {
          $scope.editComponent(component);
          return component;
        };

        // Edit a specific component.
        $scope.editComponent = function(component) {
          // Set the active component.
          $scope.component = component;
          $scope.data = {};
          if (component.key) {
            $scope.data[component.key] = '';
          }
          $scope.previousSettings = angular.copy(component);
          if (!$scope.formComponents[component.type].hasOwnProperty('views')) {
            return;
          }

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
    controller: [
      '$scope',
      function(
        $scope
      ) {
        if (!$scope.component && $scope.form) {
          $scope.component = $scope.form;
          $scope.$watch('form', function(form) {
            if (!form) { return; }
            $scope.component = $scope.form;
          });
        }
      }
    ],
    templateUrl: 'formio/formbuilder/list.html'
  };
});

/**
* Invokes Bootstrap's tooltip jquery plugin on an element
* Tooltip text can be provided via title attribute or
* as the value for this directive.
*/
app.directive('formBuilderTooltip', function() {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, el, attrs) {
      if(attrs.formBuilderTooltip || attrs.title) {
        var tooltip = angular.element('<i class="glyphicon glyphicon-question-sign text-muted" data-placement="right" data-html="true"></i>');
        if(!attrs.title) {
          tooltip.attr('title', attrs.formBuilderTooltip);
        }
        tooltip.tooltip();
        el.append(' ').append(tooltip);
      }
    }
  };
});

app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/editbuttons.html',
      '<div class="component-btn-group">' +
        '<button class="btn btn-xxs btn-danger component-settings-button" style="z-index: 1000" ng-click="removeComponent(component)"><span class="glyphicon glyphicon-remove"></span></button>' +
        '<button class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" disabled="disabled"><span class="glyphicon glyphicon glyphicon-move"></span></button>' +
        '<button ng-if="formComponents[component.type].views" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" ng-click="editComponent(component)"><span class="glyphicon glyphicon-cog"></span></button>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/component.html',
      '<div class="component-form-group component-type-{{ component.type }}" ng-class="{highlight: hover}" ng-mouseenter="hover = true" ng-mouseleave="hover = false">' +
        '<div ng-include="\'formio/formbuilder/editbuttons.html\'"></div>' +
        '<div class="form-group has-feedback" style="position:inherit"><form-builder-element></form-builder-element></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/list.html',
      '<ul class="component-list" ' +
        'dnd-list="component.components"' +
        'dnd-drop="addComponent(component.components, item)">' +
        '<li ng-if="component.components.length <= 1">' +
          '<div class="alert alert-info" style="text-align:center; margin-bottom: 5px;" role="alert">' +
            'Drag and Drop a form component' +
          '</div>' +
        '</li>' +
        '<li ng-repeat="component in component.components" ' +
          'dnd-draggable="component" ' +
          'dnd-effect-allowed="move" ' +
          'dnd-moved="removeComponent(component)">' +
          '<form-builder-component ng-if="component.input"></form-builder-component>' +
          '<div ng-if="!component.input">' +
            '<div ng-include="\'formio/formbuilder/editbuttons.html\'"></div>' +
            '<form-builder-element></form-builder-element>' +
          '</div>' +
        '</li>' +
      '</ul>'
    );

    $templateCache.put('formio/formbuilder/builder.html',
      '<div class="row">' +
        '<div class="col-sm-3">' +
          '<accordion close-others="true">' +
            '<accordion-group ng-repeat="(groupName, group) in formComponentGroups" heading="{{ group.title }}" is-open="$first">' +
              '<div ng-repeat="component in formComponentsByGroup[groupName]" ng-if="component.title"' +
                'dnd-draggable="component.settings"' +
                'dnd-effect-allowed="copy" style="width:48%;margin: 0 4px 4px 0; float:left;">' +
                '<button type="button" class="btn btn-primary btn-xs btn-block" disabled="disabled"><i ng-if="component.icon" class="{{ component.icon }}"></i> {{ component.title }}</button>' +
              '</div>' +
            '</accordion-group>' +
          '</accordion>' +
        '</div>' +
        '<div class="col-sm-9 formbuilder">' +
          '<tabset>' +
            '<tab heading="Page 1">' +
              '<div class="dropzone">' +
                '<form-builder-list></form-builder-list>' +
              '</div>' +
            '</tab>' +
            '<tab><tab-heading><i class="glyphicon glyphicon-plus-sign"></i> Add Page</tab-heading></tab>' +
          '</tabset>' +
        '</div>' +
      '</div>'
    );
  }
]);
