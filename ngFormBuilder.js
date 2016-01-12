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
      src: '='
    },
    controller: [
      '$scope',
      'formioComponents',
      'ngDialog',
      'Formio',
      'FormioUtils',
      'FormioPlugins',
      function(
        $scope,
        formioComponents,
        ngDialog,
        Formio,
        FormioUtils,
        FormioPlugins
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

        // Find the appropriate list.
        var findList = function(components, component) {
          var i = components.length;
          var j = 0;
          var k = 0;
          var list = null;
          outerloop:
          while (i--) {
            if (components[i] === component) {
              return components;
            }
            else if (components[i].hasOwnProperty('rows')) {
              j = components[i].rows.length;
              while (j--) {
                k = components[i].rows[j].length;
                while (k--) {
                  list = findList(components[i].rows[j][k].components, component);
                  if (list) {
                    break outerloop;
                  }
                }
              }
            }
            else if (components[i].hasOwnProperty('columns')) {
              j = components[i].columns.length;
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

        $scope.setDragging = function(dragging) {
          $scope.dragging = dragging;
        };

        // Show confirm dialog before removing a component
        $scope.confirmRemoveComponent = function(component) {
          ngDialog.open({
            template: 'formio/components/confirm-remove.html',
            showClose: false
          }).closePromise.then(function(e) {
            var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
            if(!cancelled) {
              $scope.removeComponent(component);
            }
          });
        };

        // Allow prototyped scopes to update the original component.
        $scope.updateComponent = function(newComponent, oldComponent) {
          var list = findList($scope.form.components, oldComponent);
          if (list) {
            list.splice(list.indexOf(oldComponent), 1, newComponent);
          }
          $scope.$emit('formUpdate', $scope.form);
        };

        // Remove a component.
        $scope.removeComponent = function(component) {
          var list = findList($scope.form.components, component);
          if (list) {
            list.splice(list.indexOf(component), 1);
          }
          $scope.$emit('formUpdate', $scope.form);
          ngDialog.closeAll(true);
        };

        // Add a new component.
        $scope.addComponent = function(list, component) {
          $scope.setDragging(false);

          // Only edit immediately for components that are not resource comps.
          if (component.isNew && (!component.key || (component.key.indexOf('.') === -1))) {
            $scope.editComponent(component);
          }
          else {
            component.isNew = false;
          }

          $scope.$broadcast('ckeditor.refresh');
          $scope.$emit('formUpdate', $scope.form);
          return component;
        };

        // Edit a specific component.
        $scope.editComponent = function(component) {
          // Set the active component.
          $scope.component = component;
          $scope.data = {};
          $scope.formComponent = formioComponents.components[component.type] || formioComponents.components.custom;
          if (component.key) {
            $scope.data[component.key] = '';
          }
          $scope.previousSettings = angular.copy(component);
          if (!$scope.formComponent.hasOwnProperty('views')) {
            return;
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

          // Allow the component to add custom logic to the edit page.
          if (
            $scope.formComponent && $scope.formComponent.onEdit
          ) {
            $scope.formComponent.onEdit($scope, component, Formio, FormioPlugins);
          }

          // Open the dialog.
          ngDialog.open({
            template: 'formio/components/settings.html',
            scope: $scope,
            className: 'ngdialog-theme-default component-settings'
          }).closePromise.then(function (e) {
            var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
            if (cancelled) {
              if($scope.component.isNew) {
                $scope.removeComponent($scope.component);
              }
              else {
                // Revert to old settings, but use the same object reference
                _.assign($scope.component, $scope.previousSettings);
              }
            }
            else {
              delete $scope.component.isNew;
            }
          });
        };

        $scope.cancelSettings = function() {
          ngDialog.closeAll(false);
        };

        $scope.saveSettings = function() {
          ngDialog.closeAll(true);
          $scope.$emit('formUpdate', $scope.form);
        };
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
app.directive('formBuilderList', function() {
  return {
    scope: true,
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

app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/editbuttons.html',
      '<div class="component-btn-group">' +
        '<button type="button" class="btn btn-xxs btn-danger component-settings-button" style="z-index: 1000" ng-click="formComponents[component.type].confirmRemove ? confirmRemoveComponent(component) : removeComponent(component)"><span class="glyphicon glyphicon-remove"></span></button>' +
        '<button type="button" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" disabled="disabled"><span class="glyphicon glyphicon glyphicon-move"></span></button>' +
        '<button type="button" ng-if="formComponent.views" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" ng-click="editComponent(component)"><span class="glyphicon glyphicon-cog"></span></button>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/component.html',
      '<div class="component-form-group component-type-{{ component.type }}">' +
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
          'dnd-dragstart="setDragging(true)" ' +
          'dnd-dragend="setDragging(false)" ' +
          'dnd-moved="removeComponent(component)">' +
          '<form-builder-component ng-if="component.input"></form-builder-component>' +
          '<div ng-if="!component.input">' +
            '<div ng-include="\'formio/formbuilder/editbuttons.html\'"></div>' +
            '<form-builder-element></form-builder-element>' +
          '</div>' +
          // Fix for problematic components that are difficult to drag over
          // This is either because of iframes or issue #126 in angular-drag-and-drop-lists
          '<div ng-if="dragging && !formComponents[component.type].noDndOverlay" class="dndOverlay"></div>' +
        '</li>' +
      '</ul>'
    );

    $templateCache.put('formio/formbuilder/builder.html',
      '<div class="row">' +
        '<div class="col-sm-3 formcomponents">' +
          '<accordion close-others="true">' +
            '<accordion-group ng-repeat="(groupName, group) in formComponentGroups" heading="{{ group.title }}" is-open="$first">' +
              '<div ng-repeat="component in formComponentsByGroup[groupName]" ng-if="component.title"' +
                'dnd-draggable="component.settings"' +
                'dnd-dragstart="setDragging(true)" ' +
                'dnd-dragend="setDragging(false)" ' +
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
                '<form-builder-list></form-builder-list>' +
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
