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
                    label: component.label,
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
}]