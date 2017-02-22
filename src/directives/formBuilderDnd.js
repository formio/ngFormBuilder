module.exports = [
  '$scope',
  '$rootScope',
  'formioComponents',
  'ngDialog',
  'dndDragIframeWorkaround',
  function(
    $scope,
    $rootScope,
    formioComponents,
    ngDialog,
    dndDragIframeWorkaround
  ) {
    $scope.builder = true;
    $rootScope.builder = true;
    $scope.hideCount = (_.isNumber($scope.hideDndBoxCount) ? $scope.hideDndBoxCount : 1);
    $scope.$watch('hideDndBoxCount', function(hideCount) {
      $scope.hideCount = hideCount ? hideCount : 1;
    });

    $scope.formComponents = formioComponents.components;

    // Components depend on this existing
    $scope.data = {};

    $scope.emit = function() {
      var args = [].slice.call(arguments);
      args[0] = 'formBuilder:' + args[0];
      $scope.$emit.apply($scope, args);
    };

    $scope.addComponent = function(component, index) {
      // Only edit immediately for components that are not resource comps.
      if (component.isNew && !component.lockConfiguration && (!component.key || (component.key.indexOf('.') === -1))) {
        $scope.editComponent(component);
      }
      else {
        component.isNew = false;
      }

      // Refresh all CKEditor instances
      $scope.$broadcast('ckeditor.refresh');

      dndDragIframeWorkaround.isDragging = false;
      $scope.emit('add');

      // If this is a root component and the display is a wizard, then we know
      // that they dropped the component outside of where it is supposed to go...
      // Instead append or prepend to the components array.
      if ($scope.component.display === 'wizard') {
        $scope.$apply(function() {
          var pageIndex = (index === 0) ? 0 : $scope.form.components[$scope.form.page].components.length;
          $scope.form.components[$scope.form.page].components.splice(pageIndex, 0, component);
        });
        return true;
      }

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
      $scope.$apply(function() {
        $scope.component.components.splice(index, 0, component);
      });

      // Return true since this will tell the drag-and-drop list component to not insert into its own array.
      return true;
    };

    // Allow prototyped scopes to update the original component.
    $scope.updateComponent = function(newComponent, oldComponent) {
      var list = $scope.component.components;
      list.splice(list.indexOf(oldComponent), 1, newComponent);
      $scope.$emit('update', newComponent);
    };

    var remove = function(component) {
      if ($scope.component.components.indexOf(component) !== -1) {
        $scope.component.components.splice($scope.component.components.indexOf(component), 1);
        $scope.emit('remove', component);
      }
    };

    $scope.removeComponent = function(component, shouldConfirm) {
      if (shouldConfirm) {
        // Show confirm dialog before removing a component
        ngDialog.open({
          template: 'formio/components/confirm-remove.html',
          showClose: false
        }).closePromise.then(function(e) {
          var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
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
        controller: ['$scope', 'Formio', '$controller', function($scope, Formio, $controller) {
          $scope.editorVisible = true;

          // Allow the component to add custom logic to the edit page.
          if (
            $scope.formComponent && $scope.formComponent.onEdit
          ) {
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
          var invalidRegex = /^[^A-Za-z]*|[^A-Za-z0-9\-]*/g;
          $scope.$watch('component.label', function() {
            if ($scope.component.label && !$scope.component.lockKey && $scope.component.isNew) {
              if ($scope.data.hasOwnProperty($scope.component.key)) {
                delete $scope.data[$scope.component.key];
              }
              $scope.component.key = _.camelCase($scope.component.label.replace(invalidRegex, ''));
              $scope.data[$scope.component.key] = $scope.component.multiple ? [''] : '';
            }
          });
        }]
      }).closePromise.then(function(e) {
        var cancelled = e.value === false || e.value === '$closeButton' || e.value === '$document';
        if (cancelled) {
          if (component.isNew) {
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

    // Clone form component
    $scope.cloneComponent = function(component) {
      $scope.formElement = angular.copy(component);
      $scope.formElement.key = component.key + '' + $scope.form.components.length;
      $scope.form.components.push($scope.formElement);
    };

    // Add to scope so it can be used in templates
    $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
  }
];
