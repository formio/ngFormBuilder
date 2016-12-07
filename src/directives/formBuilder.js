/*eslint max-statements: 0*/
module.exports = ['debounce', function(debounce) {
  return {
    replace: true,
    templateUrl: 'formio/formbuilder/builder.html',
    scope: {
      form: '=?',
      src: '=',
      type: '=',
      onSave: '=',
      onCancel: '=',
      options: '=?'
    },
    controller: [
      '$scope',
      'formioComponents',
      'ngDialog',
      'Formio',
      'FormioUtils',
      'dndDragIframeWorkaround',
      '$interval',
      function(
        $scope,
        formioComponents,
        ngDialog,
        Formio,
        FormioUtils,
        dndDragIframeWorkaround,
        $interval
      ) {
        $scope.options = $scope.options || {};

        // Add the components to the scope.
        var submitButton = angular.copy(formioComponents.components.button.settings);
        if (!$scope.form) {
          $scope.form = {};
        }
        if (!$scope.form.components) {
          $scope.form.components = [];
        }
        if (!$scope.options.noSubmit && !$scope.form.components.length) {
          $scope.form.components.push(submitButton);
        }
        $scope.hideCount = 2;
        $scope.form.page = 0;
        $scope.formio = $scope.src ? new Formio($scope.src) : null;

        var setNumPages = function() {
          if (!$scope.form) {
            return;
          }
          if ($scope.form.display !== 'wizard') {
            return;
          }

          var numPages = 0;
          $scope.form.components.forEach(function(component) {
            if (component.type === 'panel') {
              numPages++;
            }
          });

          $scope.form.numPages = numPages;

          // Add a page if none is found.
          if (numPages === 0) {
            $scope.newPage();
          }

          // Make sure the page doesn't excede the end.
          if ((numPages > 0) && ($scope.form.page >= numPages)) {
            $scope.form.page = numPages - 1;
          }
        };

        // Load the form.
        if ($scope.formio && $scope.formio.formId) {
          $scope.formio.loadForm().then(function(form) {
            $scope.form = form;
            $scope.form.page = 0;
            if (!$scope.options.noSubmit && $scope.form.components.length === 0) {
              $scope.form.components.push(submitButton);
            }
          });
        }

        $scope.$watch('form.display', function(display) {
          $scope.hideCount = (display === 'wizard') ? 1 : 2;
        });

        // Make sure they can switch back and forth between wizard and pages.
        $scope.$on('formDisplay', function(event, display) {
          $scope.form.display = display;
          $scope.form.page = 0;
          setNumPages();
        });

        // Return the form pages.
        $scope.pages = function() {
          var pages = [];
          $scope.form.components.forEach(function(component) {
            if (component.type === 'panel') {
              if (component.title) {
                pages.push(component.title);
              }
              else {
                pages.push('Page ' + (pages.length + 1));
              }
            }
          });
          return pages;
        };

        // Show the form page.
        $scope.showPage = function(page) {
          var i = 0;
          for (i = 0; i < $scope.form.components.length; i++) {
            var component = $scope.form.components[i];
            if (component.type === 'panel') {
              if (i === page) {
                break;
              }
            }
          }
          $scope.form.page = i;
        };

        $scope.newPage = function() {
          var index = $scope.form.numPages;
          var pageNum = index + 1;
          var component = {
            type: 'panel',
            title: 'Page ' + pageNum,
            isNew: true,
            components: [],
            input: false,
            key: 'page' + pageNum
          };
          $scope.form.numPages++;
          $scope.form.components.splice(index, 0, component);
        };

        // Ensure the number of pages is always correct.
        $scope.$watch('form.components.length', function() {
          setNumPages();
        });

        $scope.formComponents = _.cloneDeep(formioComponents.components);
        _.each($scope.formComponents, function(component, key) {
          component.settings.isNew = true;
          if (component.settings.hasOwnProperty('builder') && !component.settings.builder || component.disabled) {
            delete $scope.formComponents[key];
          }
        });

        $scope.formComponentGroups = _.cloneDeep(_.omitBy(formioComponents.groups, 'disabled'));
        $scope.formComponentsByGroup = _.groupBy($scope.formComponents, function(component) {
          return component.group;
        });

        // Get the resource fields.
        var resourceEnabled = !formioComponents.groups.resource || !formioComponents.groups.resource.disabled;
        if ($scope.formio && resourceEnabled) {
          $scope.formComponentsByGroup.resource = {};
          $scope.formComponentGroups.resource = {
            title: 'Existing Resource Fields',
            panelClass: 'subgroup-accordion-container',
            subgroups: {}
          };

          $scope.formio.loadForms({params: {type: 'resource', limit: 100}}).then(function(resources) {
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

                var componentName = component.label;
                if (!componentName && component.key) {
                  componentName = _.upperFirst(component.key);
                }

                $scope.formComponentsByGroup.resource[resourceKey].push(_.merge(
                  _.cloneDeep(formioComponents.components[component.type], true),
                  {
                    title: componentName,
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
        }

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
        var rootlistEL = angular.element('.rootlist');
        var formbuilderEL = angular.element('.formbuilder');

        $interval(function setRootListHeight() {
          var listHeight = rootlistEL.height('inherit').height();
          var builderHeight = formbuilderEL.height();
          if ((builderHeight - listHeight) > 100) {
            rootlistEL.height(builderHeight);
          }
        }, 1000);

        // Add to scope so it can be used in templates
        $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
      }
    ],
    link: function(scope, element) {
      var scrollSidebar = debounce(function() {
        // Disable all buttons within the form.
        angular.element('.formbuilder').find('button').attr('disabled', 'disabled');

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
