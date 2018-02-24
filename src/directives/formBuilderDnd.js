var _isNumber = require('lodash/isNumber');
var _camelCase = require('lodash/camelCase');
var _assign = require('lodash/assign');

var _upperFirst = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = [
  '$scope',
  '$element',
  '$rootScope',
  'formioComponents',
  'FormioUtils',
  'ngDialog',
  'dndDragIframeWorkaround',
  '$timeout',
  'BuilderUtils',
  function(
    $scope,
    $element,
    $rootScope,
    formioComponents,
    FormioUtils,
    ngDialog,
    dndDragIframeWorkaround,
    $timeout,
    BuilderUtils
  ) {
    $scope.builder = true;
    $rootScope.builder = true;
    $scope.hideCount = (_isNumber($scope.hideDndBoxCount) ? $scope.hideDndBoxCount : 1);
    $scope.$watch('hideDndBoxCount', function(hideCount) {
      $scope.hideCount = hideCount ? hideCount : 1;
    });

    $scope.formComponents = formioComponents.components;
    if (!$scope.component) {
      $scope.component = $scope.form;
    }

    // Components depend on this existing
    if (!$scope.data) {
      $scope.data = {};
    }

    $scope.emit = function() {
      var args = [].slice.call(arguments);
      args[0] = 'formBuilder:' + args[0];
      $scope.$emit.apply($scope, args);
    };

    $scope.$on('iframe-componentClick', function(event, data) {
      FormioUtils.eachComponent($scope.component.components, function(component) {
        if (component.id === data.id) {
          $scope.editComponent(component);
        }
      });
    });
    $scope.$on('iframe-componentUpdate', function(event, data) {
      FormioUtils.eachComponent($scope.component.components, function(component) {
        if (component.id === data.id) {
          component.overlay = data.overlay;
        }
      });
    });

    $scope.$on('fbDragDrop', function(event, component) {
      component.settings.id = Math.random().toString(36).substring(7);
      component.settings.overlay = {
        page: '1',
        top: component.fbDropY,
        left: component.fbDropX
      };
      $scope.addComponent(component.settings);
    });

    $scope.addComponent = function(component, index) {

      delete component.hideLabel;

      // Allow changing default lock options.
      if ($scope.options && $scope.options.noLockKeys) {
        delete component.source;
        delete component.lockKey;
      }

      // Add parent key to default key if parent is present.
      // Sometimes $scope.component is the parent but columns and tables it is actually the column.
      var parent = $scope.parent || $scope.component;
      if (parent.type !== 'form' && parent.type !== 'resource' && component.isNew && component.key) {
        $scope.parentKey = parent.key;
        component.key = $scope.parentKey + _upperFirst(component.key);
      } else {
        $scope.parentKey = '';
      }

      if (index === 'undefined') {
        index = -1;
      }

      // If this is a root component and the display is a wizard, then we know
      // that they dropped the component outside of where it is supposed to go...
      // Instead append or prepend to the components array.
      if ($scope.component.display === 'wizard') {
        var pageIndex = (index === 0) ? 0 : $scope.form.components[$scope.form.page].components.length;
        index = pageIndex;
        $scope.$apply(function() {
          $scope.form.components[$scope.form.page].components.splice(pageIndex, 0, component);
        });
      }

      // Only edit immediately for components that are not resource comps.
      if (component.isNew && !component.lockConfiguration && (!component.key || (component.key.indexOf('.') === -1))) {
        $scope.editComponent(component, index);
      }
      else {
        // Ensure the component has a key.
        component.key = component.key || component.label || 'component';

        BuilderUtils.uniquify($scope.form, component);

        // Update the component to not be flagged as new anymore.
        FormioUtils.eachComponent([component], function(child) {
          delete child.isNew;
        }, true);
      }

      // Refresh all CKEditor instances
      $scope.$broadcast('ckeditor.refresh');

      dndDragIframeWorkaround.isDragging = false;
      $scope.emit('add');
      $scope.$broadcast('iframeMessage', {name: 'addElement', data: component});

      // Make sure that they don't ever add a component on the bottom of the submit button.
      var lastComponent = $scope.component.components[$scope.component.components.length - 1];
      if (
        (lastComponent) &&
        (lastComponent.type === 'button') &&
        (lastComponent.action === 'submit')
      ) {
        // There is only one element on the page.
        if ($scope.component.components.length === 1) {
          index = 0;
        }
        else if (index >= $scope.component.components.length) {
          index -= 1;
        }
      }

      // Add the component to the components array.
      $scope.component.components.splice(index, 0, component);
      $timeout($scope.$apply.bind($scope));

      // Return true since this will tell the drag-and-drop list component to not insert into its own array.
      return true;
    };

    $scope.updateKey = function(component) {
      if (!component.lockKey && component.isNew) {
        if ($scope.data.hasOwnProperty(component.key)) {
          delete $scope.data[component.key];
        }
        if (component.label) {
          var invalidRegex = /^[^A-Za-z_]*|[^A-Za-z0-9\-_]*/g;
          component.key = _camelCase($scope.parentKey + ' ' + component.label.replace(invalidRegex, ''));
        }
        BuilderUtils.uniquify($scope.form, component);
        $scope.data[component.key] = component.multiple ? [''] : '';
      }
    };

    var remove = function(component) {
      if ($scope.component.components.indexOf(component) !== -1) {
        $scope.component.components.splice($scope.component.components.indexOf(component), 1);
        $scope.emit('remove', component);
        $scope.$broadcast('iframeMessage', {name: 'removeElement', data: component});
      }
    };

    $scope.saveComponent = function(component) {
      $scope.emit('update', component);
      $scope.$broadcast('iframeMessage', {name: 'updateElement', data: component});
      ngDialog.closeAll(true);
    };

    $scope.removeComponent = function(component, shouldConfirm) {
      if (shouldConfirm) {
        // Show confirm dialog before removing a component
        ngDialog.open({
          template: 'formio/components/confirm-remove.html',
          showClose: false
        }).closePromise.then(function(e) {
          var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document' || e.value === '$escape';
          if (!cancelled) {
            remove(component);
          }
        });
      }
      else {
        remove(component);
      }
    };

    // Edit a specific component.
    $scope.editComponent = function(component, index) {
      index = index || 0;
      $scope.formComponent = formioComponents.components[component.type] || formioComponents.components.custom;
      // No edit view available
      if (!$scope.formComponent.hasOwnProperty('views')) {
        return;
      }

      // Create child isolate scope for dialog
      var childScope = $scope.$new(false);
      childScope.component = component;
      childScope.data = {};
      childScope.index = index;
      if (component.key) {
        childScope.data[component.key] = component.multiple ? [''] : '';
      }

      var previousSettings = angular.copy(component);

      // Make sure this component has a key.
      if (!component.key) {
        component.key = component.type;
      }

      // Open the dialog.
      var originalKey = '';
      ngDialog.open({
        template: 'formio/components/settings.html',
        scope: childScope,
        className: 'ngdialog-theme-default component-settings',
        controller: ['$scope', 'Formio', '$controller', function($scope, Formio, $controller) {
          $scope.editorVisible = true;

          // Allow the component to add custom logic to the edit page.
          if ($scope.formComponent && $scope.formComponent.onEdit) {
            $controller($scope.formComponent.onEdit, {$scope: $scope});
          }

          $scope.$watch('component.multiple', function(value) {
            $scope.data[$scope.component.key] = value ? [''] : '';
          });

          var editorDebounce = null;
          $scope.$watchCollection('component.wysiwyg', function() {
            $scope.editorVisible = false;
            if (editorDebounce) {
              clearTimeout(editorDebounce);
            }
            editorDebounce = setTimeout(function() {
              $scope.editorVisible = true;
            }, 200);
          });

          // Watch the settings label and auto set the key from it.
          $scope.$watch('component.label', function() {
            $scope.updateKey($scope.component);
            if (!originalKey) {
              originalKey = $scope.component.key;
            }
          });
        }]
      }).closePromise.then(function(e) {
        var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document' || e.value === '$escape';
        if (cancelled) {
          if (component.isNew) {
            return remove(component);
          }

          // Revert to old settings, but use the same object reference
          _assign(component, previousSettings);
          return;
        }

        // If there is no component label, then set it to the key and set hide label to ensure reverse compatibility.
        if (!component.label) {
          component.key = originalKey;
          $scope.updateKey(component);
          component.label = component.key || component.type;
          component.hideLabel = true;
        }

        FormioUtils.eachComponent([component], function(child) {
          delete child.isNew;
        }, true);
        $scope.$broadcast('iframeMessage', {name: 'updateElement', data: component});
        $scope.emit('edit', component);
      });
    };

    // Clone form component
    $scope.cloneComponent = function(component) {
      var newComponent = angular.copy(component);

      // If we are in a panel, the cloned component container should be the parent.components,
      // Otherwise it should be the form.components.
      var container;
      if ($scope.$parent.component && $scope.$parent.component.type === 'columns') {
        var column = _.find($scope.$parent.component.columns, function(column) {
          return _.find(column.components, {key: newComponent.key});
        });
        container = column.components;
      }
      else if ($scope.$parent.component) {
        container = $scope.$parent.component.components;
      }
      else {
        container = $scope.form.components;
      }

      // Add the new component right after the original.
      var index = container.indexOf(component);
      container.splice(index + 1, 0, newComponent);

      // timeout: wait for the form to have the new component.
      $timeout(function() {
        FormioUtils.eachComponent([newComponent], function(child) {
          child.isNew = true;
          BuilderUtils.uniquify($scope.form, child);
          delete child.isNew;
        }, true);
      });
    };

    $scope.copyComponent = function(component) {
      window.sessionStorage.setItem('componentClipboard', JSON.stringify(angular.copy(component)));
    }

    $scope.pasteComponent = function() {
      var component;
      try {
        component = JSON.parse(window.sessionStorage.getItem('componentClipboard'));
      }
      catch(e) {
        console.log('Error fetching componentClipboard');
      }

      if (component) {
        $scope.cloneComponent(component);
      }
    }

    // Add to scope so it can be used in templates
    $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
  }
];
