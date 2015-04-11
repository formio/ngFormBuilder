(function () {
'use strict';
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
              '</div>' +
            '</tab>' +
            '<tab><tab-heading><i class="glyphicon glyphicon-plus-sign"></i> Add Page</tab-heading></tab>' +
          '</tabset>' +
        '</div>' +
      '</div>'
    );
  }
]);

app.run([
  '$templateCache',
  function($templateCache) {

    // Create the component markup.
    $templateCache.put('formio/components/settings.html',
      '<form id="component-settings" novalidate>' +
        '<div class="row">' +
          '<div class="col-xs-6">' +
            '<tabset>' +
              '<tab ng-repeat="view in formComponents[component.type].views" heading="{{ view.name }}"><ng-include src="view.template"></ng-include></tab>' +
            '</tabset>' +
          '</div>' +
          '<div class="col-xs-6">' +
            '<div class="panel panel-default">' +
              '<div class="panel-heading">Preview</div>' +
              '<div class="panel-body">' +
                '<formio-component component="component" data="data" formio="formio"></formio-component>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<button type="submit" class="btn btn-success" ng-click="saveSettings()">Save</button>&nbsp;' +
              '<button type="button" class="btn btn-default" ng-click="cancelSettings()">Cancel</button>&nbsp;' +
              '<button type="button" class="btn btn-danger" ng-click="removeComponent()">Remove</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('textfield', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/textfield/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/textfield/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/textfield/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/textfield/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Input Mask</label>' +
          '<input type="text" class="form-control" id="inputMask" name="inputMask" ng-model="component.inputMask" placeholder="Input Mask" value="{{ component.inputMask }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="prefix">Prefix</label>' +
          '<input type="text" class="form-control" id="prefix" name="prefix" ng-model="component.prefix" placeholder="example \'$\', \'@\'" value="{{ component.prefix }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="suffix">Suffix</label>' +
          '<input type="text" class="form-control" id="suffix" name="suffix" ng-model="component.suffix" placeholder="example \'%\', \'#\'" value="{{ component.suffix }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Multiple Values' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/textfield/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/textfield/validate.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="required" name="required" ng-model="component.validate.required" ng-checked="component.validate.required"> Required' +
          '</label>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Minimum Length</label>' +
          '<input type="number" class="form-control" id="min" name="min" ng-model="component.validate.minLength" placeholder="Minimum Length" value="{{ component.validate.minLength }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Maximum Length</label>' +
          '<input type="number" class="form-control" id="max" name="max" ng-model="component.validate.maxLength" placeholder="Maximum Length" value="{{ component.validate.maxLength }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Regular Expression Pattern</label>' +
          '<input type="text" class="form-control" id="pattern" name="pattern" ng-model="component.validate.pattern" placeholder="Regular Expression Pattern" value="{{ component.validate.pattern }}">' +
        '</div>' +
        '<div class="panel panel-default">' +
          '<div class="panel-heading"><a class="panel-title" ng-click="customCollapsed = !customCollapsed">Custom Validation</a></div>' +
          '<div class="panel-body" collapse="customCollapsed" ng-init="customCollapsed = true;">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';">{{ component.validate.custom }}</textarea>' +
            '<small><p>Enter custom validation code.</p>' +
            '<p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
            '<p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p></small>' +
          '</div>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('address', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/address/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/address/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/address/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/address/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Allow Multiple Addresses' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/address/api.html',
      '<ng-form>' +
      '<div class="form-group">' +
      '<label for="key">Property Name</label>' +
      '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
      '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/address/validate.html',
      '<ng-form>' +
      '<div class="form-group">' +
      '<label for="key">Required</label>' +
      '</div>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('container', {
      fbtemplate: 'formio/formbuilder/container.html'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/container.html',
      '<div class="row">' +
        '<div class="col-xs-6 component-form-group" ng-repeat="components in component.columns">' +
          '<form-builder-list></form-builder-list>' +
        '</div>' +
      '</div>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('email', {
      views: formioComponentsProvider.$get().components.textfield.views
    });
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('fieldset', {
      fbtemplate: 'formio/formbuilder/fieldset.html'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/fieldset.html',
      '<fieldset>' +
        '<legend ng-if="component.legend">{{ component.legend }}</legend>' +
        '<form-builder-component-list></form-builder-component-list>' +
      '</fieldset>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('number', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/number/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/number/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/textfield/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/number/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Increment (Step)</label>' +
          '<input type="text" class="form-control" id="step" name="step" ng-model="component.validate.step" placeholder="Enter how much to increment per step (or precision)." value="{{ component.validate.step }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="prefix">Prefix</label>' +
          '<input type="text" class="form-control" id="prefix" name="prefix" ng-model="component.prefix" placeholder="example \'$\', \'@\'" value="{{ component.prefix }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="suffix">Suffix</label>' +
          '<input type="text" class="form-control" id="suffix" name="suffix" ng-model="component.suffix" placeholder="example \'%\', \'#\'" value="{{ component.suffix }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Multiple Values' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/number/validate.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="required" name="required" ng-model="component.validate.required" ng-checked="component.validate.required"> Required' +
          '</label>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Minimum Value</label>' +
          '<input type="number" class="form-control" id="min" name="min" ng-model="component.validate.min" placeholder="Minimum Value" value="{{ component.validate.min }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Maximum Value</label>' +
          '<input type="number" class="form-control" id="max" name="max" ng-model="component.validate.max" placeholder="Maximum Value" value="{{ component.validate.max }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Greater Than</label>' +
          '<input type="number" class="form-control" id="greater" name="greater" ng-model="component.validate.greater" placeholder="Greater Than" value="{{ component.validate.greater }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Less Than</label>' +
          '<input type="number" class="form-control" id="less" name="less" ng-model="component.validate.less" placeholder="Less Than" value="{{ component.validate.less }}">' +
        '</div>' +
        '<div class="panel panel-default">' +
          '<div class="panel-heading"><a class="panel-title" ng-click="customCollapsed = !customCollapsed">Custom Validation</a></div>' +
          '<div class="panel-body" collapse="customCollapsed" ng-init="customCollapsed = true;">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';">{{ component.validate.custom }}</textarea>' +
            '<small><p>Enter custom validation code.</p>' +
            '<p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
            '<p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p></small>' +
          '</div>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);


app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('password', {
      views: formioComponentsProvider.$get().components.textfield.views
    });
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('phoneNumber', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/phoneNumber/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/phoneNumber/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/phoneNumber/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/phoneNumber/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Input Mask</label>' +
          '<input type="text" class="form-control" id="inputMask" name="inputMask" ng-model="component.inputMask" placeholder="Input Mask" value="{{ component.inputMask }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="prefix">Prefix</label>' +
          '<input type="text" class="form-control" id="prefix" name="prefix" ng-model="component.prefix" placeholder="example \'$\', \'@\'" value="{{ component.prefix }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="suffix">Suffix</label>' +
          '<input type="text" class="form-control" id="suffix" name="suffix" ng-model="component.suffix" placeholder="example \'%\', \'#\'" value="{{ component.suffix }}">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/phoneNumber/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/phoneNumber/validate.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Required</label>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('resource', {
      onEdit: function($scope, component, Formio) {
        $scope.resources = [];
        var loader = new Formio('/app/' + $scope.app);
        loader.loadResources().then(function(resources) {
          $scope.resources = resources;
          if (!$scope.component.resource) {
            $scope.component.resource = resources[0]._id;
          }
        });
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/resource/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/resource/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/resource/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/resource/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Resource</label>' +
          '<select class="form-control" id="resource" name="resource" ng-options="value._id as value.title for value in resources" ng-model="component.resource"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Search Expression</label>' +
          '<input type="text" class="form-control" id="searchExpression" name="searchExpression" ng-model="component.searchExpression" placeholder="The search string regular expression" value="{{ component.searchExpression }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Search Fields</label>' +
          '<input type="text" class="form-control" id="searchFields" name="searchFields" ng-model="component.searchFields" ng-list placeholder="The search field parings" value="{{ component.searchFields }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<div class="form-group checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Allow Multiple Resources' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/resource/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/resource/validate.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Required</label>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('select', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/select/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/select/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/select/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/select/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Data Source</label>' +
          '<textarea class="form-control" id="dataSrc" name="dataSrc" ng-model="component.dataSrc" placeholder="Data Source URL or JSON" rows="3">{{ component.dataSrc }}</textarea>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<div class="form-group checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Allow Multiple Values' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/select/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-required ng-disabled="component.lockKey">' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/select/validate.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Required</label>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('textarea', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/textfield/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/textfield/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/textfield/api.html'
        }
      ]
    });
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('well', {
      fbtemplate: 'formio/formbuilder/well.html'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/well.html',
      '<div class="well">' +
        '<form-builder-component-list></form-builder-component-list>' +
      '</div>'
    );
  }
]);
})();