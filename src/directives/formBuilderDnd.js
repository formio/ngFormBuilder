module.exports = [
  '$scope',
  'formioComponents',
  'ngDialog',
  'dndDragIframeWorkaround',
  function(
    $scope,
    formioComponents,
    ngDialog,
    dndDragIframeWorkaround
  ) {
    $scope.hideCount = (_.isNumber($scope.hideDndBoxCount) ? $scope.hideDndBoxCount : 1);

    $scope.formComponents = formioComponents.components;

    // Components depend on this existing
    $scope.data = {};

    $scope.emit = function() {
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

    // Add to scope so it can be used in templates
    $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
  }
];
