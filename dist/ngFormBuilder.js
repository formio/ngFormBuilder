(function () {
'use strict';
/*global window: false, console: false, $: false */
/*jshint browser: true */
var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ngCkeditor'
]);
app.directive('formBuilder', ['debounce', function(debounce) {
  return {
    replace: true,
    templateUrl: 'formio/formbuilder/builder.html',
    scope: {
      src: '=',
      type: '=',
      onSave: '=',
      onCancel: '='
    },
    controller: [
      '$scope',
      'formioComponents',
      'ngDialog',
      'Formio',
      'FormioUtils',
      'FormioPlugins',
      'dndDragIframeWorkaround',
      function(
        $scope,
        formioComponents,
        ngDialog,
        Formio,
        FormioUtils,
        FormioPlugins,
        dndDragIframeWorkaround
      ) {
        // Add the components to the scope.
        var submitButton = angular.copy(formioComponents.components.button.settings);
        $scope.form = {components:[submitButton]};
        $scope.formio = new Formio($scope.src);

        // Load the form.
        if ($scope.formio.formId) {
          $scope.formio.loadForm().then(function(form) {
            $scope.form = form;
            if ($scope.form.components.length === 0) {
              $scope.form.components.push(submitButton);
            }
          });
        }

        $scope.formComponents = _.cloneDeep(formioComponents.components);
        _.each($scope.formComponents, function(component) {
          component.settings.isNew = true;
        });
        $scope.formComponentGroups = _.cloneDeep(formioComponents.groups);
        $scope.formComponentsByGroup = _.groupBy($scope.formComponents, function(component) {
          return component.group;
        });

        // Get the resource fields.
        $scope.formio.loadForms({params: {type: 'resource'}}).then(function(resources) {

          // Iterate through all resources.
          _.each(resources, function(resource) {

            // Add the component group.
            $scope.formComponentGroups[resource.name] = {
              title: resource.title + ' Fields'
            };

            // Create a new group for this resource.
            $scope.formComponentsByGroup[resource.name] = {};

            // Iterate through each component.
            FormioUtils.eachComponent(resource.components, function(component) {

              if (component.type === 'button') { return; }

              // Add the component to the list.
              var resourceKey = resource.name;
              $scope.formComponentsByGroup[resourceKey][resourceKey + '.' + component.key] = _.merge(
                _.clone(formioComponents.components[component.type], true),
                {
                  title:component.label,
                  group: resourceKey,
                  settings: component
                },
                {
                  settings: {
                    label: resource.title + ' ' + component.label,
                    key: resourceKey + '.' + component.key,
                    lockKey: true,
                    source: resource._id
                  }
                }
              );
            });
          });
        });

        var update = function() {
          $scope.$emit('formUpdate', $scope.form);
        };

        // Add a new component.
        $scope.$on('formBuilder:add', update);
        $scope.$on('formBuilder:update', update);
        $scope.$on('formBuilder:remove', update);
        $scope.$on('formBuilder:edit', update);

        $scope.saveSettings = function() {
          ngDialog.closeAll(true);
          $scope.$emit('formUpdate', $scope.form);
        };

        $scope.capitalize = _.capitalize;

        // Add to scope so it can be used in templates
        $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;

      }
    ],
    link: function(scope, element) {
      var scrollSidebar = debounce(function() {
        var formComponents = angular.element('.formcomponents');
        var formBuilder = angular.element('.formbuilder');
        if (formComponents.length !== 0 && formBuilder.length !== 0) {
          var maxScroll = formBuilder.outerHeight() > formComponents.outerHeight() ? formBuilder.outerHeight() - formComponents.outerHeight() : 0;
          // 50 pixels gives space for the fixed header.
          var scroll = angular.element(window).scrollTop() - formComponents.parent().offset().top + 50;
          if (scroll < 0) {
            scroll = 0;
          }
          if (scroll > maxScroll) {
            scroll = maxScroll;
          }
          formComponents.css('margin-top', scroll + 'px');
        }
      }, 100, false);
      window.onscroll = scrollSidebar;
      element.on('$destroy', function() {
        window.onscroll = null;
      });
    }
  };
}]);

// Create an AngularJS service called debounce
app.factory('debounce', ['$timeout','$q', function($timeout, $q) {
  // The service is actually this function, which we call with the func
  // that should be debounced and how long to wait in between calls
  return function debounce(func, wait, immediate) {
    var timeout;
    // Create a deferred object that will be resolved when we need to
    // actually call the func
    var deferred = $q.defer();
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if(!immediate) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
      };
      var callNow = immediate && !timeout;
      if ( timeout ) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait);
      if (callNow) {
        deferred.resolve(func.apply(context,args));
        deferred = $q.defer();
      }
      return deferred.promise;
    };
  };
}]);

app.run([
  '$rootScope',
  'ngDialog',
  function($rootScope, ngDialog) {
    // Close all open dialogs on state change.
    $rootScope.$on('$stateChangeStart', function() {
      ngDialog.closeAll(false);
    });
  }
]);

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
          $scope.formComponent = formioComponents.components[$scope.component.type] || formioComponents.components.custom;
          if ($scope.formComponent.fbtemplate) {
            $scope.template = $scope.formComponent.fbtemplate;
          }
        }
      ]
    });
  }
]);

app.directive('formBuilderList', [
  'formioComponents',
  'ngDialog',
  'dndDragIframeWorkaround',
  function(
    formioComponents,
    ngDialog,
    dndDragIframeWorkaround
  ) {
    return {
      scope: {
        component: '=',
        formio: '=',
        form: '=',
        // # of items needed in the list before hiding the
        // drag and drop prompt div
        hideDndBoxCount: '='
      },
      restrict: 'E',
      replace: true,
      controller: [
        '$scope',
        function(
          $scope
        ) {
          if(!_.isNumber($scope.hideDndBoxCount)) {
            $scope.hideDndBoxCount = 1;
          }

          $scope.formComponents = formioComponents.components;

          // Components depend on this existing
          $scope.data = {};

          $scope.emit = function(event) {
            var args = [].slice.call(arguments);
            args[0] = 'formBuilder:' + args[0];
            $scope.$emit.apply($scope, args);
          };

          $scope.addComponent = function(component) {
            // Only edit immediately for components that are not resource comps.
            if (component.isNew && (!component.key || (component.key.indexOf('.') === -1))) {
              $scope.editComponent(component);
            }
            else {
              component.isNew = false;
            }

            // Refresh all CKEditor instances
            $scope.$broadcast('ckeditor.refresh');

            dndDragIframeWorkaround.isDragging = false;
            $scope.emit('add');
            return component;
          };

          // Allow prototyped scopes to update the original component.
          $scope.updateComponent = function(newComponent, oldComponent) {
            var list = $scope.component.components;
            list.splice(list.indexOf(oldComponent), 1, newComponent);
            $scope.$emit('update', newComponent);
          };

          var remove = function(component) {
            var list = $scope.component.components;
            list.splice(list.indexOf(component), 1);
            $scope.emit('remove', component);
          };

          $scope.removeComponent = function(component, shouldConfirm) {
            if (shouldConfirm) {
              // Show confirm dialog before removing a component
              ngDialog.open({
                template: 'formio/components/confirm-remove.html',
                showClose: false
              }).closePromise.then(function(e) {
                var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
                if(!cancelled) {
                  remove(component);
                }
              });
            }
            else {
              remove(component);
            }
          };

          // Edit a specific component.
          $scope.editComponent = function(component) {
            $scope.formComponent = formioComponents.components[component.type] || formioComponents.components.custom;
            // No edit view available
            if (!$scope.formComponent.hasOwnProperty('views')) {
              return;
            }

            // Create child isolate scope for dialog
            var childScope = $scope.$new(false);
            childScope.component = component;
            childScope.data = {};

            if (component.key) {
              childScope.data[component.key] = component.multiple ? [''] : '';
            }

            var previousSettings = angular.copy(component);

            // Open the dialog.
            ngDialog.open({
              template: 'formio/components/settings.html',
              scope: childScope,
              className: 'ngdialog-theme-default component-settings',
              controller: ['$scope', 'Formio', 'FormioPlugins', function($scope, Formio, FormioPlugins) {
                // Allow the component to add custom logic to the edit page.
                if (
                  $scope.formComponent && $scope.formComponent.onEdit
                ) {
                  $scope.formComponent.onEdit($scope, component, Formio, FormioPlugins);
                }

                $scope.$watch('component.multiple', function(value) {
                  $scope.data[$scope.component.key] = value ? [''] : '';
                });

                // Watch the settings label and auto set the key from it.
                var invalidRegex = /^[^A-Za-z]*|[^A-Za-z0-9\-]*/g;
                $scope.$watch('component.label', function() {
                  if ($scope.component.label && !$scope.component.lockKey) {
                    if ($scope.data.hasOwnProperty($scope.component.key)) {
                      delete $scope.data[$scope.component.key];
                    }
                    $scope.component.key = _.camelCase($scope.component.label.replace(invalidRegex, ''));
                    $scope.data[$scope.component.key] = $scope.component.multiple ? [''] : '';
                  }
                });
              }]
            }).closePromise.then(function (e) {
              var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
              if (cancelled) {
                if(component.isNew) {
                  remove(component);
                }
                else {
                  // Revert to old settings, but use the same object reference
                  _.assign(component, previousSettings);
                }
              }
              else {
                delete component.isNew;
                $scope.emit('edit', component);
              }
            });
          };

          // Add to scope so it can be used in templates
          $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
        }
      ],
      templateUrl: 'formio/formbuilder/list.html'
    };
  }
]);

app.directive('formBuilderRow', [
  'formioComponents',
  'ngDialog',
  'dndDragIframeWorkaround',
  function(
    formioComponents,
    ngDialog,
    dndDragIframeWorkaround
  ) {
    return {
      scope: {
        component: '=',
        formio: '=',
        form: '='
      },
      restrict: 'E',
      replace: true,
      controller: [
        '$scope',
        function(
          $scope
        ) {

          $scope.formComponents = formioComponents.components;

          // Components depend on this existing
          $scope.data = {};

          $scope.emit = function(event) {
            var args = [].slice.call(arguments);
            args[0] = 'formBuilder:' + args[0];
            $scope.$emit.apply($scope, args);
          };

          $scope.addComponent = function(component) {
            // Only edit immediately for components that are not resource comps.
            if (component.isNew && (!component.key || (component.key.indexOf('.') === -1))) {
              $scope.editComponent(component);
            }
            else {
              component.isNew = false;
            }

            // Refresh all CKEditor instances
            $scope.$broadcast('ckeditor.refresh');

            dndDragIframeWorkaround.isDragging = false;
            $scope.emit('add');
            return component;
          };

          // Allow prototyped scopes to update the original component.
          $scope.updateComponent = function(newComponent, oldComponent) {
            var list = $scope.component.components;
            list.splice(list.indexOf(oldComponent), 1, newComponent);
            $scope.$emit('update', newComponent);
          };

          var remove = function(component) {
            var list = $scope.component.components;
            list.splice(list.indexOf(component), 1);
            $scope.emit('remove', component);
          };

          $scope.removeComponent = function(component, shouldConfirm) {
            if (shouldConfirm) {
              // Show confirm dialog before removing a component
              ngDialog.open({
                template: 'formio/components/confirm-remove.html',
                showClose: false
              }).closePromise.then(function(e) {
                var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
                if(!cancelled) {
                  remove(component);
                }
              });
            }
            else {
              remove(component);
            }
          };

          // Edit a specific component.
          $scope.editComponent = function(component) {
            $scope.formComponent = formioComponents.components[component.type] || formioComponents.components.custom;
            // No edit view available
            if (!$scope.formComponent.hasOwnProperty('views')) {
              return;
            }

            // Create child isolate scope for dialog
            var childScope = $scope.$new(false);
            childScope.component = component;
            childScope.data = {};

            if (component.key) {
              childScope.data[component.key] = component.multiple ? [''] : '';
            }

            var previousSettings = angular.copy(component);

            // Open the dialog.
            ngDialog.open({
              template: 'formio/components/settings.html',
              scope: childScope,
              className: 'ngdialog-theme-default component-settings',
              controller: ['$scope', 'Formio', 'FormioPlugins', function($scope, Formio, FormioPlugins) {
                // Allow the component to add custom logic to the edit page.
                if (
                  $scope.formComponent && $scope.formComponent.onEdit
                ) {
                  $scope.formComponent.onEdit($scope, component, Formio, FormioPlugins);
                }

                $scope.$watch('component.multiple', function(value) {
                  $scope.data[$scope.component.key] = value ? [''] : '';
                });

                // Watch the settings label and auto set the key from it.
                var invalidRegex = /^[^A-Za-z]*|[^A-Za-z0-9\-]*/g;
                $scope.$watch('component.label', function() {
                  if ($scope.component.label && !$scope.component.lockKey) {
                    if ($scope.data.hasOwnProperty($scope.component.key)) {
                      delete $scope.data[$scope.component.key];
                    }
                    $scope.component.key = _.camelCase($scope.component.label.replace(invalidRegex, ''));
                    $scope.data[$scope.component.key] = $scope.component.multiple ? [''] : '';
                  }
                });
              }]
            }).closePromise.then(function (e) {
              var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
              if (cancelled) {
                if(component.isNew) {
                  remove(component);
                }
                else {
                  // Revert to old settings, but use the same object reference
                  _.assign(component, previousSettings);
                }
              }
              else {
                delete component.isNew;
                $scope.emit('edit', component);
              }
            });
          };

          // Add to scope so it can be used in templates
          $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
        }
      ],
      templateUrl: 'formio/formbuilder/row.html'
    };
  }
]);

app.directive('jsonInput', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attr, ctrl) {
      ctrl.$parsers.push(function(input) {
        try {
          var obj = JSON.parse(input);
          ctrl.$setValidity('jsonInput', true);
          return obj;
        } catch (e) {
          ctrl.$setValidity('jsonInput', false);
          return undefined;
        }
      });
      ctrl.$formatters.push(function(data) {
        if (data === null) {
          ctrl.$setValidity('jsonInput', false);
          return "";
        }
        try {
          var str = angular.toJson(data, true);
          ctrl.$setValidity('jsonInput', true);
          return str;
        } catch (e) {
          ctrl.$setValidity('jsonInput', false);
          return "";
        }
      });
    }
  };
});

/**
* Invokes Bootstrap's popover jquery plugin on an element
* Tooltip text can be provided via title attribute or
* as the value for this directive.
*/
app.directive('formBuilderTooltip', function() {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, el, attrs) {
      if(attrs.formBuilderTooltip || attrs.title) {
        var tooltip = angular.element('<i class="glyphicon glyphicon-question-sign text-muted"></i>');
        tooltip.popover({
          html: true,
          trigger: 'manual',
          placement: 'right',
          content: attrs.title || attrs.formBuilderTooltip
        }).on('mouseenter', function() {
          var $self = $(this);
          $self.popover('show');
          $self.siblings('.popover').on('mouseleave', function() {
            $self.popover('hide');
          });
        }).on('mouseleave', function() {
          var $self = $(this);
          setTimeout(function() {
            if(!$('.popover:hover').length) {
              $self.popover('hide');
            }
          }, 100);
        });
        el.append(' ').append(tooltip);
      }
    }
  };
});

/**
 * This workaround handles the fact that iframes capture mouse drag
 * events. This interferes with dragging over components like the
 * Content component. As a workaround, we keep track of the isDragging
 * flag here to overlay iframes with a div while dragging.
 */
app.value('dndDragIframeWorkaround', {
  isDragging: false
});

app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/editbuttons.html',
      '<div class="component-btn-group">' +
        '<button type="button" class="btn btn-xxs btn-danger component-settings-button" style="z-index: 1000" ng-click="removeComponent(component, formComponent.confirmRemove)"><span class="glyphicon glyphicon-remove"></span></button>' +
        '<button type="button" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" disabled="disabled"><span class="glyphicon glyphicon glyphicon-move"></span></button>' +
        '<button type="button" ng-if="formComponent.views" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" ng-click="editComponent(component)"><span class="glyphicon glyphicon-cog"></span></button>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/component.html',
      '<div class="component-form-group component-type-{{ component.type }} form-builder-component">' +
        '<div ng-include="\'formio/formbuilder/editbuttons.html\'"></div>' +
        '<div class="form-group has-feedback form-field-type-{{ component.type }} {{component.customClass}}" id="form-group-{{ component.key }}" style="position:inherit" ng-style="component.style"><form-builder-element></form-builder-element></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/list.html',
      '<ul class="component-list" ' +
        'dnd-list="component.components"' +
        'dnd-drop="addComponent(item)">' +
        '<li ng-if="component.components.length < hideDndBoxCount">' +
          '<div class="alert alert-info" style="text-align:center; margin-bottom: 5px;" role="alert">' +
            'Drag and Drop a form component' +
          '</div>' +
        '</li>' +
        '<li ng-repeat="component in component.components" ' +
          'dnd-draggable="component" ' +
          'dnd-effect-allowed="move" ' +
          'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
          'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
          'dnd-moved="removeComponent(component, false)">' +
          '<form-builder-component></form-builder-component>' +
          // Fix for problematic components that are difficult to drag over
          // This is either because of iframes or issue #126 in angular-drag-and-drop-lists
          '<div ng-if="dndDragIframeWorkaround.isDragging && !formComponent.noDndOverlay" class="dndOverlay"></div>' +
        '</li>' +
      '</ul>'
    );

    $templateCache.put('formio/formbuilder/row.html',
      '<div class="formbuilder-datagrid">' +
      '<ul class="component-row formbuilder-group" ' +
        'dnd-list="component.components"' +
        'dnd-drop="addComponent(item)"' +
        'dnd-horizontal-list="true">' +
        '<li ng-repeat="component in component.components" ' +
          'class="formbuilder-row pull-left" ' +
          'dnd-draggable="component" ' +
          'dnd-effect-allowed="move" ' +
          'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
          'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
          'dnd-moved="removeComponent(component, false)">' +
          '<form-builder-component></form-builder-component>' +
            // Fix for problematic components that are difficult to drag over
            // This is either because of iframes or issue #126 in angular-drag-and-drop-lists
          '<div ng-if="dndDragIframeWorkaround.isDragging && !formComponent.noDndOverlay" class="dndOverlay"></div>' +
        '</li>' +
        '<li class="formbuilder-row pull-left">' +
          '<div class="alert alert-info" style="text-align:center; margin-bottom: 5px;" role="alert">' +
            'Drag and Drop a form component' +
          '</div>' +
        '</li>' +
      '</ul>' +
      '<div style="clear:both;"></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/builder.html',
      '<div class="row">' +
        '<div class="col-sm-3 formcomponents">' +
          '<div class="form-group">' +
            '<button type="button" class="btn btn-default" ng-if="onCancel" ng-click="onCancel()">Cancel</button> ' +
            '<button type="button" class="btn btn-primary" ng-if="onSave" ng-click="onSave()">Save<span ng-if="type"> {{capitalize(type)}}</span></button>' +
          '</div>' +
          '<accordion close-others="true">' +
            '<accordion-group ng-repeat="(groupName, group) in formComponentGroups" heading="{{ group.title }}" is-open="$first">' +
              '<div ng-repeat="component in formComponentsByGroup[groupName]" ng-if="component.title"' +
                'dnd-draggable="component.settings"' +
                'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
                'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
                'dnd-effect-allowed="copy" style="width:48%; margin: 0 2px 2px 0; float:left;">' +
                '<span class="btn btn-primary btn-xs btn-block" title="{{component.title}}" style="overflow: hidden; text-overflow: ellipsis;">' +
                  '<i ng-if="component.icon" class="{{ component.icon }}"></i> {{ component.title }}' +
                '</span>' +
              '</div>' +
            '</accordion-group>' +
          '</accordion>' +
        '</div>' +
        '<div class="col-sm-9 formbuilder">' +
              '<div class="dropzone">' +
                '<form-builder-list component="form" form="form" formio="formio" hide-dnd-box-count="2"></form-builder-list>' +
              '</div>' +
        '</div>' +
      '</div>'
    );

    // Create the component markup.
    $templateCache.put('formio/components/confirm-remove.html',
      '<form id="confirm-remove-dialog">' +
            '<p>Removing this component will also <strong>remove all of its children</strong>! Are you sure you want to do this?</p>' +
            '<div>' +
            '<div class="form-group">' +
              '<button type="submit" class="btn btn-danger pull-right" ng-click="closeThisDialog(true)">Remove</button>&nbsp;' +
              '<button type="button" class="btn btn-default pull-right" style="margin-right: 5px;" ng-click="closeThisDialog(false)">Cancel</button>&nbsp;' +
            '</div>' +
            '</div>' +
      '</form>'
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
              '<tab ng-repeat="view in formComponent.views" heading="{{ view.name }}"><ng-include src="view.template"></ng-include></tab>' +
            '</tabset>' +
          '</div>' +
          '<div class="col-xs-6">' +
            '<div class="pull-right" ng-if="formComponent.documentation" style="margin-top:10px; margin-right:20px;">' +
              '<a ng-href="{{ formComponent.documentation }}" target="_blank"><i class="glyphicon glyphicon-new-window"></i> Help!</a>' +
            '</div>' +
            '<div class="panel panel-default preview-panel" style="margin-top:44px;">' +
              '<div class="panel-heading">Preview</div>' +
              '<div class="panel-body">' +
                '<formio-component component="component" data="data" formio="formio"></formio-component>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<button type="submit" class="btn btn-success" ng-click="closeThisDialog(true)">Save</button>&nbsp;' +
              '<button type="button" class="btn btn-default" ng-click="closeThisDialog(false)" ng-if="!component.isNew">Cancel</button>&nbsp;' +
              '<button type="button" class="btn btn-danger" ng-click="removeComponent(component, formComponents[component.type].confirmRemove); closeThisDialog(false)">Remove</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</form>'
    );

    // Create the common API tab markup.
    $templateCache.put('formio/components/common/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the common Layout tab markup.
    $templateCache.put('formio/components/common/layout.html',
      '<ng-form>' +
        // Need to use array notation to have dash in name
        '<form-builder-option property="style[\'margin-top\']"></form-builder-option>' +
        '<form-builder-option property="style[\'margin-right\']"></form-builder-option>' +
        '<form-builder-option property="style[\'margin-bottom\']"></form-builder-option>' +
        '<form-builder-option property="style[\'margin-left\']"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.constant('FORM_OPTIONS', {
  actions: [
    {
      name: 'submit',
      title: 'Submit'
    },
    {
      name: 'reset',
      title: 'Reset'
    },
    {
      name: 'oauth',
      title: 'OAuth'
    }
  ],
  themes: [
    {
      name: 'default',
      title: 'Default'
    },
    {
      name: 'primary',
      title: 'Primary'
    },
    {
      name: 'info',
      title: 'Info'
    },
    {
      name: 'success',
      title: 'Success'
    },
    {
      name: 'danger',
      title: 'Danger'
    },
    {
      name: 'warning',
      title: 'Warning'
    }
  ],
  sizes: [
    {
      name: 'xs',
      title: 'Extra Small'
    },
    {
      name: 'sm',
      title: 'Small'
    },
    {
      name: 'md',
      title: 'Medium'
    },
    {
      name: 'lg',
      title: 'Large'
    }
  ]
});


/**
* These are component options that can be reused
* with the builder-option directive
* Valid properties: label, placeholder, tooltip, type
*/
app.constant('COMMON_OPTIONS', {
  label: {
    label: 'Label',
    placeholder: 'Field Label',
    tooltip: 'The label for this field that will appear next to it.'
  },
  placeholder: {
    label: 'Placeholder',
    placeholder: 'Placeholder',
    tooltip: 'The placeholder text that will appear when this field is empty.'
  },
  inputMask: {
    label: 'Input Mask',
    placeholder: 'Input Mask',
    tooltip: 'An input mask helps the user with input by ensuring a predefined format.<br><br>9: numeric<br>a: alphabetical<br>*: alphanumeric<br><br>Example telephone mask: (999) 999-9999<br><br>See the <a target=\'_blank\' href=\'https://github.com/RobinHerbots/jquery.inputmask\'>jquery.inputmask documentation</a> for more information.</a>'
  },
  tableView: {
    label: 'Table View',
    type: 'checkbox',
    tooltip: 'Shows this value within the table view of the submissions.'
  },
  prefix: {
    label: 'Prefix',
    placeholder: 'example \'$\', \'@\'',
    tooltip: 'The text to show before a field.'
  },
  suffix: {
    label: 'Suffix',
    placeholder: 'example \'$\', \'@\'',
    tooltip: 'The text to show after a field.'
  },
  multiple: {
    label: 'Multiple Values',
    type: 'checkbox',
    tooltip: 'Allows multiple values to be entered for this field.'
  },
  unique: {
    label: 'Unique',
    type: 'checkbox',
    tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.'
  },
  protected: {
    label: 'Protected',
    type: 'checkbox',
    tooltip: 'A protected field will not be returned when queried via API.'
  },
  persistent: {
    label: 'Persistent',
    type: 'checkbox',
    tooltip: 'A persistent field will be stored in database when the form is submitted.'
  },
  block: {
    label: 'Block',
    type: 'checkbox',
    tooltip: 'This control should span the full width of the bounding container.'
  },
  leftIcon: {
    label: 'Left Icon',
    placeholder: 'Enter icon classes',
    tooltip: 'This is the full icon class string to show the icon. Example: \'glyphicon glyphicon-search\' or \'fa fa-plus\''
  },
  rightIcon: {
    label: 'Right Icon',
    placeholder: 'Enter icon classes',
    tooltip: 'This is the full icon class string to show the icon. Example: \'glyphicon glyphicon-search\' or \'fa fa-plus\''
  },
  url: {
    label: 'Upload Url',
    placeholder: 'Enter the url to post the files to.',
    tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#server-side\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#server-side</a> for how to set up the server.'
  },
  dir: {
    label: 'Directory',
    placeholder: '(optional) Enter a directory for the files',
    tooltip: 'This will place all the files uploaded in this field in the directory'
  },
  disableOnInvalid: {
    label: 'Disable on Form Invalid',
    type: 'checkbox',
    tooltip: 'This will disable this field if the form is invalid.'
  },
  striped: {
    label: 'Striped',
    type: 'checkbox',
    tooltip: 'This will stripe the table if checked.'
  },
  bordered: {
    label: 'Bordered',
    type: 'checkbox',
    tooltip: 'This will border the table if checked.'
  },
  hover: {
    label: 'Hover',
    type: 'checkbox',
    tooltip: 'Highlight a row on hover.'
  },
  condensed: {
    label: 'Condensed',
    type: 'checkbox',
    tooltip: 'Condense the size of the table.'
  },
  'validate.required': {
    label: 'Required',
    type: 'checkbox',
    tooltip: 'A required field must be filled in before the form can be submitted.'
  },
  'validate.minLength': {
    label: 'Minimum Length',
    placeholder: 'Minimum Length',
    type: 'number',
    tooltip: 'The minimum length requirement this field must meet.'
  },
  'validate.maxLength': {
    label: 'Maximum Length',
    placeholder: 'Maximum Length',
    type: 'number',
    tooltip: 'The maximum length requirement this field must meet'
  },
  'validate.pattern': {
    label: 'Regular Expression Pattern',
    placeholder: 'Regular Expression Pattern',
    tooltip: 'The regular expression pattern test that the field value must pass before the form can be submitted.'
  },
  'customClass': {
    label: 'Custom CSS Class',
    placeholder: 'Custom CSS Class',
    tooltip: 'Custom CSS class to add to this component.'
  },
  'tabindex': {
    label: 'Tab Index',
    placeholder: 'Tab Index',
    tooltip: 'Sets the tabindex attribute of this component to override the tab order of the form. See the <a href=\'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex\'>MDN documentation</a> on tabindex for more information.'
  },
  // Need to use array notation to have dash in name
  'style[\'margin-top\']': {
    label: 'Margin Top',
    placeholder: '0px',
    tooltip: 'Sets the top margin of this component. Must be a valid CSS measurement like `10px`.'
  },
  'style[\'margin-right\']': {
    label: 'Margin Right',
    placeholder: '0px',
    tooltip: 'Sets the right margin of this component. Must be a valid CSS measurement like `10px`.'
  },
  'style[\'margin-bottom\']': {
    label: 'Margin Bottom',
    placeholder: '0px',
    tooltip: 'Sets the bottom margin of this component. Must be a valid CSS measurement like `10px`.'
  },
  'style[\'margin-left\']': {
    label: 'Margin Left',
    placeholder: '0px',
    tooltip: 'Sets the left margin of this component. Must be a valid CSS measurement like `10px`.'
  }
});

// Common directives for editing component

/**
* This directive creates a field for tweaking component options.
* This needs at least a property attribute specifying what property
* of the component to bind to.
*
* If the property is defined in COMMON_OPTIONS above, it will automatically
* populate its label, placeholder, input type, and tooltip. If not, you may specify
* those via attributes (except for tooltip, which you can specify with the title attribute).
* The generated input will also carry over any other properties you specify on this directive.
*/
app.directive('formBuilderOption', ['COMMON_OPTIONS', function(COMMON_OPTIONS){
  return {
    restrict: 'E',
    require: 'property',
    priority: 2,
    replace: true,
    template: function(el, attrs) {
      var property = attrs.property;
      var label = attrs.label || (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].label) || '';
      var placeholder = (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].placeholder) || null;
      var type = (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].type) || 'text';
      var tooltip = (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].tooltip) || '';

      var input = angular.element('<input></input>');
      var inputAttrs = {
        id: property,
        name: property,
        type: type,
        'ng-model': 'component.' + property,
        placeholder: placeholder
      };
      // Pass through attributes from the directive to the input element
      angular.forEach(attrs.$attr, function(key) {
        inputAttrs[key] = attrs[key];
        // Allow specifying tooltip via title attr
        if(key.toLowerCase() === 'title') {
          tooltip = attrs[key];
        }
      });
      input.attr(inputAttrs);

      // Checkboxes have a slightly different layout
      if(inputAttrs.type.toLowerCase() === 'checkbox') {
        return '<div class="checkbox">' +
                '<label for="' + property + '" form-builder-tooltip="' + tooltip + '">' +
                input.prop('outerHTML') +
                ' ' + label + '</label>' +
              '</div>';
      }

      input.addClass('form-control');
      return '<div class="form-group">' +
                '<label for="' + property + '" form-builder-tooltip="' + tooltip + '">' + label + '</label>' +
                input.prop('outerHTML') +
              '</div>';
    }
  };
}]);

/**
 * A directive for a table builder
 */
app.directive('formBuilderTable', function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '<div class="form-builder-table">' +
        '  <div class="form-group">' +
        '    <label for="label">Number of Rows</label>' +
        '    <input type="number" class="form-control" id="numRows" name="numRows" placeholder="Number of Rows" ng-model="component.numRows">' +
        '  </div>' +
        '  <div class="form-group">' +
        '    <label for="label">Number of Columns</label>' +
        '    <input type="number" class="form-control" id="numCols" name="numCols" placeholder="Number of Columns" ng-model="component.numCols">' +
        '  </div>' +
        '</div>';
    },
    controller: [
      '$scope',
      function($scope) {
        var changeTable = function() {
          if ($scope.component.numRows && $scope.component.numCols) {
            var tmpTable = [];
            $scope.component.rows.splice($scope.component.numRows);
            for (var row = 0; row < $scope.component.numRows; row++) {
              if ($scope.component.rows[row]) {
                $scope.component.rows[row].splice($scope.component.numCols);
              }
              for (var col = 0; col < $scope.component.numCols; col++) {
                if (!tmpTable[row]) {
                  tmpTable[row] = [];
                }
                tmpTable[row][col] = {components:[]};
              }
            }
            $scope.component.rows = _.merge(tmpTable, $scope.component.rows);
          }
        };

        $scope.$watch('component.numRows', changeTable);
        $scope.$watch('component.numCols', changeTable);
      }
    ]
  };
});

/**
* A directive for a field to edit a component's key.
*/
app.directive('formBuilderOptionKey', function(){
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '<div class="form-group" ng-class="{\'has-warning\': shouldWarnAboutEmbedding() || !component.key}">' +
                '<label for="key" class="control-label" form-builder-tooltip="The name of this field in the API endpoint.">Property Name</label>' +
                '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" valid-api-key value="{{ component.key }}" ' +
                'ng-disabled="component.source" ng-blur="onBlur()">' +
                '<p ng-if="shouldWarnAboutEmbedding()" class="help-block"><span class="glyphicon glyphicon-exclamation-sign"></span> ' +
                  'Using a dot in your Property Name will link this field to a field from a Resource. Doing this manually is not recommended because you will experience unexpected behavior if the Resource field is not found. If you wish to embed a Resource field in your form, use a component from the corresponding Resource Components category on the left.' +
                '</p>' +
              '</div>';
    },
    controller: ['$scope', 'FormioUtils', function($scope, FormioUtils) {
      var suffixRegex = /(\d+)$/;
      // Appends a number to a component.key to keep it unique
      var uniquify = function() {
        var newValue = $scope.component.key;
        var valid = true;
        FormioUtils.eachComponent($scope.form.components, function(component) {
          if(component.key === newValue && component !== $scope.component) {
            valid = false;
          }
        });
        if(valid) {
          return;
        }
        if(newValue.match(suffixRegex)) {
          newValue = newValue.replace(suffixRegex, function(suffix) { return Number(suffix) + 1; });
        }
        else {
          newValue += '2';
        }
        $scope.component.key = newValue;
      };

      $scope.$watch('component.key', uniquify);

      $scope.onBlur = function() {
        $scope.component.lockKey = true;

        // If they try to input an empty key, refill it with default and let uniquify
        // make it unique
        if(!$scope.component.key && $scope.formComponents[$scope.component.type].settings.key) {
          $scope.component.key = $scope.formComponents[$scope.component.type].settings.key;
          $scope.component.lockKey = false; // Also unlock key
          uniquify();
        }
      };

      $scope.shouldWarnAboutEmbedding = function() {
        return !$scope.component.source && $scope.component.key.indexOf('.') !== -1;
      };
    }],
  };
});

/*
* Prevents user inputting invalid api key characters.
* Valid characters for an api key are alphanumeric and hyphens
*/
app.directive('validApiKey', function(){
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var invalidRegex = /^[^A-Za-z]*|[^A-Za-z0-9\-\.\[\]]*/g;
      ngModel.$parsers.push(function (inputValue) {
        var transformedInput = inputValue.replace(invalidRegex, '');
        if (transformedInput !== inputValue) {
          ngModel.$setViewValue(transformedInput);
          ngModel.$render();
        }
        return transformedInput;
     });
    }
  };
});

/**
* A directive for editing a component's custom validation.
*/
app.directive('formBuilderOptionCustomValidation', function(){
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="panel panel-default">' +
                '<div class="panel-heading"><a class="panel-title" ng-click="customCollapsed = !customCollapsed">Custom Validation</a></div>' +
                '<div class="panel-body" collapse="customCollapsed" ng-init="customCollapsed = true;">' +
                  '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';">{{ component.validate.custom }}</textarea>' +
                  '<small><p>Enter custom validation code.</p>' +
                  '<p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
                  '<p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p></small>' +
                  '<div class="well">' +
                    '<div class="checkbox">' +
                      '<label>' +
                        '<input type="checkbox" id="private" name="private" ng-model="component.validate.customPrivate" ng-checked="component.validate.customPrivate"> <strong>Secret Validation</strong>' +
                      '</label>' +
                    '</div>' +
                    '<p>Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.</p>' +
                  '</div>' +
                '</div>' +
              '</div>'
  };
});

/**
* A directive that provides a UI to add {value, label} objects to an array.
*/
app.directive('valueBuilder', function(){
  return {
    scope: {
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
                '<label form-builder-tooltip="{{ tooltipText }}">{{ label }}</label>' +
                '<table class="table table-condensed">' +
                  '<thead>' +
                    '<tr>' +
                      '<th class="col-xs-4">{{ valueLabel }}</th>' +
                      '<th class="col-xs-6">{{ labelLabel }}</th>' +
                      '<th class="col-xs-2"></th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr ng-repeat="v in data track by $index">' +
                      '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v[valueProperty]" placeholder="{{ valueLabel }}"/></td>' +
                      '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v[labelProperty]" placeholder="{{ labelLabel }}"/></td>' +
                      '<td class="col-xs-2"><button type="button" class="btn btn-danger btn-xs" ng-click="removeValue($index)" tabindex="-1"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                    '</tr>' +
                  '</tbody>' +
                '</table>' +
                '<button type="button" class="btn" ng-click="addValue()">Add {{ valueLabel }}</button>' +
                '</div>',
    replace: true,
    link: function($scope, el, attrs) {
      $scope.valueProperty = $scope.valueProperty || 'value';
      $scope.labelProperty = $scope.labelProperty || 'label';
      $scope.valueLabel = $scope.valueLabel || 'Value';
      $scope.labelLabel = $scope.labelLabel || 'Label';

      $scope.addValue = function() {
        var obj = {};
        obj[$scope.valueProperty] = '';
        obj[$scope.labelProperty] = '';
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
          // Ignore array addition/deletion changes
          if(newValue.length !== oldValue.length) {
            return;
          }

          _.map(newValue, function(entry, i) {
            if(entry[$scope.labelProperty] !== oldValue[i][$scope.labelProperty]) {// label changed
              if(entry[$scope.valueProperty] === '' || entry[$scope.valueProperty] === _.camelCase(oldValue[i][$scope.labelProperty])) {
                entry[$scope.valueProperty] = _.camelCase(entry[$scope.labelProperty]);
              }
            }
          });
        }, true);
      }
    }
  };
});

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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#textfield'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/textfield/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="inputMask"></form-builder-option>' +
        '<form-builder-option property="prefix"></form-builder-option>' +
        '<form-builder-option property="suffix"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/textfield/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="validate.minLength"></form-builder-option>' +
        '<form-builder-option property="validate.maxLength"></form-builder-option>' +
        '<form-builder-option property="validate.pattern"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#address'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/address/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="multiple" label="Allow Multiple Addresses"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/address/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  'FORM_OPTIONS',
  function(
    formioComponentsProvider,
    FORM_OPTIONS
  ) {
    formioComponentsProvider.register('button', {
      onEdit: function($scope) {
        $scope.actions = FORM_OPTIONS.actions;
        $scope.sizes = FORM_OPTIONS.sizes;
        $scope.themes = FORM_OPTIONS.themes;
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/button/display.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#button'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/button/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="action" form-builder-tooltip="This is the action to be performed by this button.">Action</label>' +
          '<select class="form-control" id="action" name="action" ng-options="action.name as action.title for action in actions" ng-model="component.action"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="theme" form-builder-tooltip="The color theme of this panel.">Theme</label>' +
          '<select class="form-control" id="theme" name="theme" ng-options="theme.name as theme.title for theme in themes" ng-model="component.theme"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="size" form-builder-tooltip="The size of this button.">Size</label>' +
          '<select class="form-control" id="size" name="size" ng-options="size.name as size.title for size in sizes" ng-model="component.size"></select>' +
        '</div>' +
        '<form-builder-option property="leftIcon"></form-builder-option>' +
        '<form-builder-option property="rightIcon"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="block"></form-builder-option>' +
        '<form-builder-option property="disableOnInvalid"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('checkbox', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/checkbox/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/checkbox/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#checkbox'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/checkbox/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/checkbox/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('columns', {
      fbtemplate: 'formio/formbuilder/columns.html',
      documentation: 'http://help.form.io/userguide/#columns',
      noDndOverlay: true,
      confirmRemove: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/columns.html',
      '<div class="row">' +
        '<div class="col-xs-6 component-form-group" ng-repeat="component in component.columns">' +
          '<form-builder-list class="formio-column" component="component" form="form" formio="formio"></form-builder-list>' +
        '</div>' +
      '</div>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('content', {
      fbtemplate: 'formio/formbuilder/content.html',
      documentation: 'http://help.form.io/userguide/#content-component',
      controller: function(settings, $scope) {
        $scope.$watch('component.html', function() {
          $scope.$emit('formBuilder:update');
        });
      }
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/content.html',
      '<div class="form-group">' +
        '<textarea ckeditor ng-model="component.html"><textarea>' +
      '</div>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('custom', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/custom/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#custom'
    });
  }
]);

app.controller('customComponent', [
  '$scope',
  'formioComponents',
  function(
    $scope,
    formioComponents
  ) {
    // Because of the weirdnesses of prototype inheritence, components can't update themselves, only their properties.
    $scope.$watch('component', function(newValue, oldValue) {
      if (newValue) {
        // Don't allow a type of a real type.
        newValue.type = (formioComponents.components.hasOwnProperty(newValue.type) ? 'custom' : newValue.type);
        // Ensure some key settings are set.
        newValue.key = newValue.key || newValue.type;
        newValue.protected = (newValue.hasOwnProperty('protected') ? newValue.protected : false);
        newValue.persistent = (newValue.hasOwnProperty('persistent') ? newValue.persistent : true);
        $scope.updateComponent(newValue, oldValue);
      }
    });
  }
]);

app.run([
  '$templateCache',
  function($templateCache) {
    // Create the settings markup.
    $templateCache.put('formio/components/custom/display.html',
      '<ng-form>' +
      '<div class="form-group">' +
      '<p>Custom components can be used to render special fields or widgets inside your app. For information on how to display in an app, see <a href="http://help.form.io/userguide/#custom" target="_blank">custom component documentation</a>.</p>' +
      '<label for="json" form-builder-tooltip="Enter the JSON for this custom element.">Custom Element JSON</label>' +
      '<textarea ng-controller="customComponent" class="form-control" id="json" name="json" json-input ng-model="component" placeholder="{}" rows="10"></textarea>' +
      '</div>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('datagrid', {
      fbtemplate: 'formio/formbuilder/datagrid.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/datagrid/display.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#datagrid',
      noDndOverlay: true,
      confirmRemove: true
    });
  }
]);

app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/components/datagrid/display.html',
      '<ng-form>' +
      '<form-builder-option property="label"></form-builder-option>' +
      '<form-builder-option property="customClass"></form-builder-option>' +
      '<form-builder-option property="protected"></form-builder-option>' +
      '<form-builder-option property="persistent"></form-builder-option>' +
      '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/formbuilder/datagrid.html',
      '<form-builder-row class="formio-row" component="component" form="form" formio="formio"></form-builder-row>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('datetime', {
      onEdit: function($scope) {
        $scope.setFormat = function() {
          if ($scope.component.enableDate && $scope.component.enableTime) {
            $scope.component.format = 'yyyy-MM-dd HH:mm';
          }
          else if ($scope.component.enableDate && !$scope.component.enableTime) {
            $scope.component.format = 'yyyy-MM-dd';
          }
          else if (!$scope.component.enableDate && $scope.component.enableTime) {
            $scope.component.format = 'HH:mm';
          }
        };
        $scope.startingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.modes = [
          {
            name: 'day',
            label: 'Day'
          },
          {
            name: 'month',
            label: 'Month'
          },
          {
            name: 'year',
            label: 'Year'
          }
        ];
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/datetime/display.html'
        },
        {
          name: 'Date',
          template: 'formio/components/datetime/date.html'
        },
        {
          name: 'Time',
          template: 'formio/components/datetime/time.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/datetime/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#datetime'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/datetime/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="format" label="Date Format" placeholder="Enter the Date format" title="The format for displaying this field\'s date. The format must be specified like the <a href=\'https://docs.angularjs.org/api/ng/filter/date\' target=\'_blank\'>AngularJS date filter</a>."></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/datetime/date.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label form-builder-tooltip="Enables date input for this field.">' +
            '<input type="checkbox" id="enableDate" name="enableDate" ng-model="component.enableDate" ng-checked="component.enableDate" ng-change="setFormat()"> Enable Date Input' +
          '</label>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="datepickerMode" form-builder-tooltip="The initial view to display when clicking on this field.">Initial Mode</label>' +
          '<select class="form-control" id="datepickerMode" name="datepickerMode" ng-model="component.datepickerMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The minimum date that can be picked.">Minimum Date</label>' +
          '<div class="input-group">' +
            '<input type="text" class="form-control" ' +
              'ng-focus="minDateOpen = true" ' +
              'ng-init="minDateOpen = false" ' +
              'is-open="minDateOpen" ' +
              'datetime-picker="yyyy-MM-dd" ' +
              'enable-time="false" ' +
              'ng-model="component.minDate" />' +
            '<span class="input-group-btn">' +
              '<button type="button" class="btn btn-default" ng-click="minDateOpen = true"><i class="fa fa-calendar"></i></button>' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder"  form-builder-tooltip="The maximum date that can be picked.">Maximum Date</label>' +
          '<div class="input-group">' +
            '<input type="text" class="form-control" ' +
              'ng-focus="maxDateOpen = true" ' +
              'ng-init="maxDateOpen = false" ' +
              'is-open="maxDateOpen" ' +
              'datetime-picker="yyyy-MM-dd" ' +
              'enable-time="false" ' +
              'ng-model="component.maxDate" />' +
            '<span class="input-group-btn">' +
              '<button type="button" class="btn btn-default" ng-click="maxDateOpen = true"><i class="fa fa-calendar"></i></button>' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="startingDay" form-builder-tooltip="The first day of the week.">Starting Day</label>' +
          '<select class="form-control" id="startingDay" name="startingDay" ng-model="component.datePicker.startingDay" ng-options="idx as day for (idx, day) in startingDays"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="minMode" form-builder-tooltip="The smallest unit of time view to display in the date picker.">Minimum Mode</label>' +
          '<select class="form-control" id="minMode" name="minMode" ng-model="component.datePicker.minMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="maxMode" form-builder-tooltip="The largest unit of time view to display in the date picker.">Maximum Mode</label>' +
          '<select class="form-control" id="maxMode" name="maxMode" ng-model="component.datePicker.maxMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
        '</div>' +
        '<form-builder-option property="datePicker.yearRange" label="Number of Years Displayed" placeholder="Year Range" title="The number of years to display in the years view."></form-builder-option>' +

        '<form-builder-option property="datePicker.showWeeks" type="checkbox" label="Show Week Numbers" title="Displays the week numbers on the date picker."></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/datetime/time.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label form-builder-tooltip="Enables time input for this field.">' +
            '<input type="checkbox" id="enableTime" name="enableTime" ng-model="component.enableTime" ng-checked="component.enableTime" ng-change="setFormat()"> Enable Time Input' +
          '</label>' +
        '</div>' +
        '<form-builder-option property="timePicker.hourStep" type="number" label="Hour Step Size" title="The number of hours to increment/decrement in the time picker."></form-builder-option>' +
        '<form-builder-option property="timePicker.minuteStep" type="number" label="Minute Step Size" title="The number of minutes to increment/decrement in the time picker."></form-builder-option>' +
        '<form-builder-option property="timePicker.showMeridian" type="checkbox" label="12 Hour Time (AM/PM)" title="Display time in 12 hour time with AM/PM."></form-builder-option>' +
        '<form-builder-option property="timePicker.readonlyInput" type="checkbox" label="Read-Only Input" title="Makes the time picker input boxes read-only. The time can only be changed by the increment/decrement buttons."></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/datetime/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('email', {
      views: formioComponentsProvider.$get().components.textfield.views,
      documentation: 'http://help.form.io/userguide/#email'
    });
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('fieldset', {
      fbtemplate: 'formio/formbuilder/fieldset.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/fieldset/display.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#fieldset',
      keepChildrenOnRemove: true,
      noDndOverlay: true,
      confirmRemove: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/fieldset.html',
      '<fieldset>' +
        '<legend ng-if="component.legend">{{ component.legend }}</legend>' +
        '<form-builder-list component="component" form="form" formio="formio"></form-builder-list>' +
      '</fieldset>'
    );

    // Create the settings markup.
    $templateCache.put('formio/components/fieldset/display.html',
      '<ng-form>' +
        '<form-builder-option property="legend" label="Legend" placeholder="FieldSet Legend" title="The legend text to appear above this fieldset."></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(
    formioComponentsProvider
  ) {
    formioComponentsProvider.register('file', {
      onEdit: function($scope, component, Formio, FormioPlugins) {
        // Pull out title and name from the list of storage plugins.
        $scope.storage = _.map(new FormioPlugins('storage'), function(storage) {return _.pick(storage, ['title', 'name']);});
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/file/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/file/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#file'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/file/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="storage" form-builder-tooltip="Which storage to save the files in.">Storage</label>' +
          '<select class="form-control" id="storage" name="storage" ng-options="store.name as store.title for store in storage" ng-model="component.storage"></select>' +
        '</div>' +
        '<form-builder-option property="url" ng-show="component.storage === \'url\'"></form-builder-option>' +
        '<form-builder-option property="dir"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/file/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="filePattern"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('hidden', {
      fbtemplate: 'formio/formbuilder/hidden.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/hidden/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/hidden/validation.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#hidden'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    $templateCache.put('formio/formbuilder/hidden.html', '<span class="hidden-element-text">{{ component.label }}</span>');

    // Create the settings markup.
    $templateCache.put('formio/components/hidden/display.html',
      '<ng-form>' +
        '<form-builder-option property="label" label="Name" placeholder="Enter the name for this hidden field" title="The name for this field. It is only used for administrative purposes such as generating the automatic property name in the API tab (which may be changed manually)."></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/hidden/validation.html',
      '<ng-form>' +
        '<form-builder-option property="unique"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('htmlelement', {
      fbtemplate: 'formio/formbuilder/htmlelement.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/htmlelement/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#html-element-component'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/htmlelement.html',
      '<formio-html-element component="component"></div>'
    );

    // Create the settings markup.
    $templateCache.put('formio/components/htmlelement/display.html',
      '<ng-form>' +
        '<form-builder-option property="tag" label="HTML Tag" placeholder="HTML Element Tag" title="The tag of this HTML element."></form-builder-option>' +
        '<form-builder-option property="className" label="CSS Class" placeholder="CSS Class" title="The CSS class for this HTML element."></form-builder-option>' +
        '<value-builder ' +
          'data="component.attrs" ' +
          'label="Attributes" ' +
          'tooltip-text="The attributes for this HTML element. Only safe attributes are allowed, such as src, href, and title." ' +
          'value-property="attr" ' +
          'label-property="value" ' +
          'value-label="Attribute" ' +
          'label-label="Value" ' +
          'no-autocomplete-value="true" ' +
          '></value-builder>' +
        '<div class="form-group">' +
          '<label for="content" form-builder-tooltip="The content of this HTML element.">Content</label>' +
          '<textarea class="form-control" id="content" name="content" ng-model="component.content" placeholder="HTML Content" rows="3">{{ component.content }}</textarea>' +
        '</div>' +
      '</ng-form>'
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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#number'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/number/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="validate.step" label="Increment (Step)" placeholder="Enter how much to increment per step (or precision)." title="The amount to increment/decrement for each step."></form-builder-option>' +
        '<form-builder-option property="prefix"></form-builder-option>' +
        '<form-builder-option property="suffix"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/number/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="validate.min" type="number" label="Minimum Value" placeholder="Minimum Value" title="The minimum value this field must have before the form can be submitted."></form-builder-option>' +
        '<form-builder-option property="validate.max" type="number" label="Maximum Value" placeholder="Maximum Value" title="The maximum value this field must have before the form can be submitted."></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);


app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('page', {
      fbtemplate: 'formio/formbuilder/page.html'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/page.html',
      '<form-builder-list component="component" form="form" formio="formio"></form-builder-list>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  'FORM_OPTIONS',
  function(
    formioComponentsProvider,
    FORM_OPTIONS
  ) {
    formioComponentsProvider.register('panel', {
      fbtemplate: 'formio/formbuilder/panel.html',
      onEdit: function($scope) {
        $scope.themes = FORM_OPTIONS.themes;
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/panel/display.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#panels',
      noDndOverlay: true,
      confirmRemove: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/panel.html',
      '<div class="panel panel-{{ component.theme }}">' +
        '<div ng-if="component.title" class="panel-heading"><h3 class="panel-title">{{ component.title }}</h3></div>' +
        '<div class="panel-body">' +
          '<form-builder-list component="component" form="form" formio="formio"></form-builder-list>' +
        '</div>' +
      '</div>'
    );

    // Create the settings markup.
    $templateCache.put('formio/components/panel/display.html',
      '<ng-form>' +
        '<form-builder-option property="title" label="Title" placeholder="Panel Title" title="The title text that appears in the header of this panel."></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="theme" form-builder-tooltip="The color theme of this panel.">Theme</label>' +
          '<select class="form-control" id="theme" name="theme" ng-options="theme.name as theme.title for theme in themes" ng-model="component.theme"></select>' +
        '</div>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('password', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/password/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/textfield/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#password',
      template: 'formio/components/password.html'
    });
  }
]);
app.run([
  '$templateCache',
  function(
    $templateCache
  ) {
    // Disable dragging on password inputs because it breaks dndLists
    var textFieldTmpl = $templateCache.get('formio/components/textfield.html');
    var passwordTmpl = textFieldTmpl.replace(
      /<input type="{{ component.inputType }}" /g,
      '<input type="{{ component.inputType }}" dnd-nodrag '
    );
    $templateCache.put('formio/components/password.html', passwordTmpl);

    // Create the settings markup.
    $templateCache.put('formio/components/password/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="prefix"></form-builder-option>' +
        '<form-builder-option property="suffix"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );
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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#phonenumber'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/phoneNumber/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="inputMask"></form-builder-option>' +
        '<form-builder-option property="prefix"></form-builder-option>' +
        '<form-builder-option property="suffix"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the Validation markup.
    $templateCache.put('formio/components/phoneNumber/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('radio', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/radio/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/radio/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#radio'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/radio/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<value-builder data="component.values" label="Values" tooltip-text="The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form."></value-builder>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="inline" type="checkbox" label="Inline Layout" title="Displays the radio buttons horizontally."></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );
    // Create the API markup.
    $templateCache.put('formio/components/radio/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('resource', {
      onEdit: function($scope) {
        $scope.resources = [];
        $scope.formio.loadForms({params: {type: 'resource'}}).then(function(resources) {
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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#resource'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/resource/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The resource to be used with this field.">Resource</label>' +
          '<select class="form-control" id="resource" name="resource" ng-options="value._id as value.title for value in resources" ng-model="component.resource"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The properties on the resource to return as part of the options. Separate property names by commas. If left blank, all properties will be returned.">Select Fields</label>' +
          '<input type="text" class="form-control" id="selectFields" name="selectFields" ng-model="component.selectFields" placeholder="Comma separated list of fields to select." value="{{ component.selectFields }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="A list of search filters based on the fields of the resource. See the <a target=\'_blank\' href=\'https://github.com/travist/resourcejs#filtering-the-results\'>Resource.js documentation</a> for the format of these filters.">Search Fields</label>' +
          '<input type="text" class="form-control" id="searchFields" name="searchFields" ng-model="component.searchFields" ng-list placeholder="The fields to query on the server" value="{{ component.searchFields }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The HTML template for the result data items.">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="multiple" label="Allow Multiple Resources"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/resource/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('select', {
      icon: 'fa fa-th-list',
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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      onEdit: function($scope) {
        $scope.dataSources = {
          values: 'Values',
          json: 'Raw JSON',
          url: 'URL'
        };
      },
      documentation: 'http://help.form.io/userguide/#select'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/select/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="dataSrc" form-builder-tooltip="The source to use for the select data. Values lets you provide your own values and labels. JSON lets you provide raw JSON data. URL lets you provide a URL to retrieve the JSON data from.">Data Source Type</label>' +
          '<select class="form-control" id="dataSrc" name="dataSrc" ng-model="component.dataSrc" ng-options="value as label for (value, label) in dataSources"></select>' +
        '</div>' +
        '<ng-switch on="component.dataSrc">' +
          '<div class="form-group" ng-switch-when="json">' +
            '<label for="data.json" form-builder-tooltip="A raw JSON array to use as a data source.">Data Source Raw JSON</label>' +
            '<textarea class="form-control" id="data.json" name="data.json" ng-model="component.data.json" placeholder="Raw JSON Array" rows="3">{{ component.data.json }}</textarea>' +
          '</div>' +
          '<form-builder-option ng-switch-when="url" property="data.url" label="Data Source URL" placeholder="Data Source URL" title="A URL that returns a JSON array to use as the data source."></form-builder-option>' +
          '<value-builder ng-switch-when="values" data="component.data.values" label="Data Source Values" tooltip-text="Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission."></value-builder>' +
        '</ng-switch>' +

        '<form-builder-option ng-hide="component.dataSrc == \'values\'" property="valueProperty" label="Value Property" placeholder="The selected items property to save." title="The property of each item in the data source to use as the select value. If not specified, the item itself will be used."></form-builder-option>' +
        '<form-builder-option ng-show="component.dataSrc == \'url\'" property="searchField" label="Search Query Name" placeholder="Name of URL query parameter" title="The name of the search querystring parameter used when sending a request to filter results with. The server at the URL must handle this query parameter."></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The HTML template for the result data items.">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/select/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('selectboxes', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/selectboxes/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/selectboxes/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/selectboxes/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#selectboxes'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/selectboxes/display.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<value-builder data="component.values" label="Select Boxes" tooltip-text="Checkboxes to display. Labels are shown in the form. Values are the corresponding values saved with the submission."></value-builder>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tabindex"></form-builder-option>' +
        '<form-builder-option property="inline" type="checkbox" label="Inline Layout" title="Displays the checkboxes horizontally."></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/selectboxes/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/selectboxes/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('signature', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/signature/display.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/signature/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#signature'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/signature/display.html',
      '<ng-form>' +
        '<form-builder-option property="footer" label="Footer Label" placeholder="Footer Label" title="The footer text that appears below the signature area."></form-builder-option>' +
        '<form-builder-option property="width" label="Width" placeholder="Width" title="The width of the signature area."></form-builder-option>' +
        '<form-builder-option property="height" label="Height" placeholder="Height" title="The height of the signature area."></form-builder-option>' +
        '<form-builder-option property="backgroundColor" label="Background Color" placeholder="Background Color" title="The background color of the signature area."></form-builder-option>' +
        '<form-builder-option property="penColor" label="Pen Color" placeholder="Pen Color" title="The ink color for the signature area."></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the Validation markup.
    $templateCache.put('formio/components/signature/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('table', {
      fbtemplate: 'formio/formbuilder/table.html',
      documentation: 'http://help.form.io/userguide/#table',
      noDndOverlay: true,
      confirmRemove: true,
      views: [
        {
          name: 'Display',
          template: 'formio/components/table/display.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    var tableClasses = "{'table-striped': component.striped, ";
    tableClasses += "'table-bordered': component.bordered, ";
    tableClasses += "'table-hover': component.hover, ";
    tableClasses += "'table-condensed': component.condensed}";
    $templateCache.put('formio/formbuilder/table.html',
      '<div class="table-responsive">' +
        '<table ng-class="' + tableClasses + '" class="table">' +
          '<thead ng-if="component.header.length"><tr>' +
            '<th ng-repeat="header in component.header">{{ header }}</th>' +
          '</tr></thead>' +
          '<tbody>' +
            '<tr ng-repeat="row in component.rows">' +
              '<td ng-repeat="component in row">' +
                '<form-builder-list component="component" form="form" formio="formio"></form-builder-list>' +
              '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>' +
      '</div>'
    );

    $templateCache.put('formio/components/table/display.html',
      '<ng-form>' +
        '<form-builder-table></form-builder-table>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="striped"></form-builder-option>' +
        '<form-builder-option property="bordered"></form-builder-option>' +
        '<form-builder-option property="hover"></form-builder-option>' +
        '<form-builder-option property="condensed"></form-builder-option>' +
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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#textarea'
    });
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('well', {
      fbtemplate: 'formio/formbuilder/well.html',
      documentation: 'http://help.form.io/userguide/#well',
      noDndOverlay: true,
      confirmRemove: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/well.html',
      '<div class="well">' +
        '<form-builder-list component="component" form="form" formio="formio"></form-builder-list>' +
      '</div>'
    );
  }
]);
})();