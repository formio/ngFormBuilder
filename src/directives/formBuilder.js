/*eslint max-statements: 0*/
var _cloneDeep = require('lodash/cloneDeep');
var _each = require('lodash/each');
var _omitBy = require('lodash/omitBy');
var _groupBy = require('lodash/groupBy');
var _upperFirst = require('lodash/upperFirst');
var _merge = require('lodash/merge');
var _capitalize = require('lodash/capitalize');
module.exports = ['debounce', function(debounce) {
  return {
    replace: true,
    templateUrl: 'formio/formbuilder/builder.html',
    scope: {
      form: '=?',
      src: '=',
      url: '=?',
      type: '=',
      onSave: '=',
      onCancel: '=',
      options: '<'
    },
    controller: [
      '$scope',
      'formioComponents',
      'ngDialog',
      'Formio',
      'FormioUtils',
      'dndDragIframeWorkaround',
      '$interval',
      '$timeout',
      function(
        $scope,
        formioComponents,
        ngDialog,
        Formio,
        FormioUtils,
        dndDragIframeWorkaround,
        $interval,
        $timeout
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
        if (!$scope.form.display) {
          $scope.form.display = 'form';
        }
        if (!$scope.options.noSubmit && !$scope.form.components.length) {
          $scope.form.components.push(submitButton);
        }
        $scope.hideCount = 2;
        $scope.form.page = 0;
        var baseUrl = $scope.options.baseUrl || Formio.getBaseUrl();
        var formSrc = $scope.url || $scope.src || Formio.getProjectUrl();
        $scope.formio = new Formio(formSrc, {base: baseUrl});

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
        if ($scope.src && $scope.formio && $scope.formio.formId) {
          $scope.formio.loadForm().then(function(form) {
            $scope.form = form;
            if (!$scope.form.display) {
              $scope.form.display = 'form';
            }
            if (!$scope.options.noSubmit && $scope.form.components.length === 0) {
              $scope.form.components.push(submitButton);
            }
            $scope.showPage(0);
          });
        }

        // Ensure we always have a page set.
        $scope.$watch('form.page', function(page) {
          if (page === undefined) {
            $scope.showPage(0);
          }
        });

        $scope.$watch('form.display', function(display) {
          $scope.hideCount = (display === 'wizard') ? 1 : 2;
        });

        // Ensure that they don't remove components by canceling the edit modal.
        $scope.$watch('form._id', function(_id) {
          if (!_id) {
            return;
          }
          FormioUtils.eachComponent($scope.form.components, function(component) {
            delete component.isNew;
          }, true);
        });

        // Make sure they can switch back and forth between wizard and pages.
        $scope.$on('formDisplay', function(event, display) {
          $scope.form.display = display;
          setNumPages();
          $timeout(function() {
            $scope.showPage(0);
            $scope.$apply();
          });
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

        $scope.getPage = function() {
          var pageNum = 0;
          for (var i = 0; i < $scope.form.components.length; i++) {
            var component = $scope.form.components[i];
            if (component.type === 'panel') {
              if (i === $scope.form.page) {
                break;
              }
              pageNum++;
            }
          }
          return pageNum;
        };

        // Show the form page.
        /* eslint-disable max-depth */
        $scope.showPage = function(page) {
          var pageNum = 0;
          if ($scope.form && $scope.form.components) {
            for (var i = 0; i < $scope.form.components.length; i++) {
              var component = $scope.form.components[i];
              if (component.type === 'panel') {
                if (pageNum === page) {
                  pageNum = i;
                  break;
                }
                pageNum++;
              }
            }
          }
          $scope.form.page = pageNum;
        };
        /* eslint-enable max-depth */

        $scope.newPage = function() {
          var index = $scope.form.numPages;
          var pageNum = index + 1;
          var component = {
            type: 'panel',
            title: 'Page ' + pageNum,
            isNew: false,
            components: [],
            input: false,
            key: 'page' + pageNum
          };
          $scope.form.numPages++;
          $scope.$emit('newPage', {
            index: index,
            component: component
          });
          $scope.form.components.splice(index, 0, component);
        };

        // Ensure the number of pages is always correct.
        $scope.$watch('form.components.length', function() {
          setNumPages();
        });

        $scope.formComponents = _cloneDeep(formioComponents.components);
        _each($scope.formComponents, function(component, key) {
          component.settings.isNew = true;
          if (component.settings.hasOwnProperty('builder') && !component.settings.builder || component.disabled) {
            delete $scope.formComponents[key];
          }
        });

        $scope.pdftypes = [
          $scope.formComponents.textfield,
          $scope.formComponents.number,
          $scope.formComponents.password,
          $scope.formComponents.email,
          $scope.formComponents.phoneNumber,
          $scope.formComponents.currency,
          $scope.formComponents.checkbox,
          $scope.formComponents.signature,
          $scope.formComponents.select,
          $scope.formComponents.textarea,
          $scope.formComponents.datetime
        ];

        $scope.formComponentGroups = _cloneDeep(_omitBy(formioComponents.groups, 'disabled'));
        $scope.formComponentsByGroup = _groupBy($scope.formComponents, function(component) {
          return component.group;
        });

        // Get the resource fields.
        var resourceEnabled = !formioComponents.groups.resource || !formioComponents.groups.resource.disabled;
        if ($scope.formio && resourceEnabled) {
          $scope.formComponentsByGroup.resource = {};
          $scope.formComponentGroups.resource = {
            title: $scope.options.resourceTitle || 'Existing Resource Fields',
            panelClass: 'subgroup-accordion-container',
            subgroups: {}
          };

          var query = {params: {
            type: 'resource',
            limit: 4294967295,
            select: '_id,title,name,components'
          }};
          if ($scope.options && $scope.options.resourceFilter) {
            query.params.tags = $scope.options.resourceFilter;
          }

          $scope.formio.loadForms(query).then(function(resources) {
            // Iterate through all resources.
            _each(resources, function(resource) {
              var resourceKey = resource.name;

              // Add a legend for this resource.
              $scope.formComponentsByGroup.resource[resourceKey] = [];
              $scope.formComponentGroups.resource.subgroups[resourceKey] = {
                title: resource.title
              };

              // Iterate through each component.
              FormioUtils.eachComponent(resource.components, function(component) {
                if (component.type === 'button') return;
                if ($scope.options && $scope.options.resourceFilter && (!component.tags || component.tags.indexOf($scope.options.resourceFilter) === -1)) return;

                var componentName = component.label;
                if (!componentName && component.key) {
                  componentName = _upperFirst(component.key);
                }

                $scope.formComponentsByGroup.resource[resourceKey].push(_merge(
                  _cloneDeep(formioComponents.components[component.type], true),
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
                      source: (!$scope.options.noSource ? resource._id : undefined),
                      isNew: true
                    }
                  }
                ));
              }, true);
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

        $scope.capitalize = _capitalize;

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
        $scope.showPage(0);
      }
    ],
    link: function(scope, element) {
      var minHeight = 200;
      var headerOffset = 50;
      var bottomOffset = 15;

      var scrollSidebar = function() {
        // Disable all buttons within the form.
        angular.element('.formbuilder').find('button').attr('disabled', 'disabled');

        // Make the left column follow the form.
        var formComponents = angular.element('.formcomponents');
        var formBuilder = angular.element('.formbuilder');
        if (formComponents.length !== 0 && formBuilder.length !== 0) {
          var windowEl = angular.element(window);
          var windowHeight = windowEl.height();
          var windowScrollTop = windowEl.scrollTop();
          var windowScrollBottom = windowScrollTop + windowHeight;

          var formBuilderOffsetTop = formBuilder.offset().top;
          var formBuilderHeight = formBuilder.outerHeight();
          var formBuilderOffsetBottom = formBuilderOffsetTop + formBuilderHeight;

          var height = 0;

          if (windowHeight > formBuilderHeight) {
            formComponents.css('height', formBuilderHeight);
            return;
          }

          if (windowScrollBottom < formBuilderOffsetTop
            || windowScrollTop > formBuilderOffsetBottom) {
            // Form Builder is not visible.
            return;
          }
          else if (windowScrollTop < formBuilderOffsetTop) {
            // Top part of Form Builder is visible.
            height = windowScrollBottom - formBuilderOffsetTop - bottomOffset;
          }
          else if (windowScrollBottom < formBuilderOffsetBottom) {
            // Form builder is visible.
            height = windowHeight - headerOffset - bottomOffset;
          }
          else {
            // Bottom part of Form Builder is visible.
            height = formBuilderOffsetBottom - windowScrollTop - headerOffset - bottomOffset;
          }

          if (height < minHeight) {
            height = minHeight;
          }

          var maxScroll = formBuilderHeight - height - bottomOffset;
          var scroll = windowScrollTop - formBuilderOffsetTop + headerOffset;
          if (scroll < 0) {
            scroll = 0;
          }
          if (scroll > maxScroll) {
            scroll = maxScroll;
          }

          // Necessary fix for header.
          if (scroll > 0 && scroll < headerOffset) {
            height -= scroll;
          }

          formComponents.css({
            'margin-top': scroll,
            height: height
          });
        }
      };
      window.onscroll = debounce(scrollSidebar, 100, false);
      scrollSidebar();
      element.on('$destroy', function() {
        window.onscroll = null;
      });
    }
  };
}];
