module.exports = ['debounce', function(debounce) {
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
        _.each($scope.formComponents, function(component, key) {
          component.settings.isNew = true;
          if (component.settings.hasOwnProperty('builder') && !component.settings.builder) {
            delete $scope.formComponents[key];
          }
        });

        $scope.formComponentGroups = _.cloneDeep(formioComponents.groups);
        $scope.formComponentsByGroup = _.groupBy($scope.formComponents, function(component) {
          return component.group;
        });

        $scope.formComponentsByGroup.resource = {};
        $scope.formComponentGroups.resource = {
          title: 'Existing Resource Fields',
          panelClass: 'subgroup-accordion-container',
          subgroups: {}
        };

        // Get the resource fields.
        $scope.formio.loadForms({params: {type: 'resource'}}).then(function(resources) {
          // Iterate through all resources.
          _.each(resources, function(resource) {
            var resourceKey = resource.name;

            // Add a legend for this resource.
            $scope.formComponentsByGroup.resource[resourceKey] = [];
            $scope.formComponentGroups.resource.subgroups[resourceKey] = {
              title: resource.title
            };

            // Iterate through each component.
            FormioUtils.eachComponent(resource.components, function(component) {
              if (component.type === 'button') return;

              $scope.formComponentsByGroup.resource[resourceKey].push(_.merge(
                _.cloneDeep(formioComponents.components[component.type], true),
                {
                  title: component.label,
                  group: 'resource',
                  subgroup: resourceKey,
                  settings: component
                },
                {
                  settings: {
                    label: component.label,
                    key: component.key,
                    lockKey: true,
                    source: resource._id
                  }
                }
              ));
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

        // Set the root list height to the height of the formbuilder for ease of form building.
        (function setRootListHeight() {
          var listHeight = angular.element('.rootlist').height('inherit').height();
          var builderHeight = angular.element('.formbuilder').height();
          if ((builderHeight - listHeight) > 100) {
            angular.element('.rootlist').height(builderHeight);
          }
          setTimeout(setRootListHeight, 1000);
        })();

        // Add to scope so it can be used in templates
        $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
      }
    ],
    link: function(scope, element) {
      var scrollSidebar = debounce(function() {
        // Disable all buttons within the form.
        angular.element('.formbuilder').find('button').attr('disabled', 'disabled');
        scope.$watch('form', function() {
          angular.element('.formbuilder').find('button').attr('disabled', 'disabled');
        }, true);

        // Make the left column follow the form.
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
}];
