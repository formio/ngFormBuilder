(function () {
'use strict';
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
      project: '=',
      form: '='
    },
    controller: [
      '$scope',
      'formioComponents',
      'ngDialog',
      'Formio',
      function(
        $scope,
        formioComponents,
        ngDialog,
        Formio
      ) {
        // Add the components to the scope.
        $scope.formio = new Formio('/project/' + $scope.project);
        $scope.formComponents = formioComponents.components;
        $scope.formComponentGroups = _.cloneDeep(formioComponents.groups);
        $scope.formComponentsByGroup = _.groupBy($scope.formComponents, function(component) {
          return component.group;
        });

        // Add the submit button to the components.
        if ($scope.form.components.length === 0) {
          $scope.form.components.push(angular.copy(formioComponents.components.button.settings));
        }

        // Get the resource fields.
        $scope.formio.loadForms({params: {type: 'resource'}}).then(function(resources) {

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

              if (component.type === 'button') { return; }

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

        // Find the appropriate list.
        var findList = function(components, component) {
          var i = components.length;
          var list = null;
          outerloop:
          while (i--) {
            if (components[i] === component) {
              return components;
            }
            else if (components[i].hasOwnProperty('columns')) {
              var j = components[i].columns.length;
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

        // Remove a component.
        $scope.removeComponent = function(component) {
          var list = findList($scope.form.components, component);
          if (list) {
            var spliceArgs = [list.indexOf(component), 1];
            if($scope.formComponents[component.type].keepChildrenOnRemove) {
              spliceArgs = spliceArgs.concat(component.components || []);
            }
            list.splice.apply(list, spliceArgs);
          }
          ngDialog.closeAll(true);
        };

        // Add a new component.
        $scope.addComponent = function(list, component) {
          $scope.setDragging(false);
          component.isNew = true;

          // Only edit immediately for components that are not resource comps.
          if (!component.key || (component.key.indexOf('.') === -1)) {
            $scope.editComponent(component);
          }
          else {
            component.isNew = false;
          }

          $scope.$broadcast('ckeditor.refresh');

          return component;
        };

        // Edit a specific component.
        $scope.editComponent = function(component) {
          // Set the active component.
          $scope.component = component;
          $scope.data = {};
          if (component.key) {
            $scope.data[component.key] = '';
          }
          $scope.previousSettings = angular.copy(component);
          if (!$scope.formComponents[component.type].hasOwnProperty('views')) {
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
        '<button class="btn btn-xxs btn-danger component-settings-button" style="z-index: 1000" ng-click="removeComponent(component)"><span class="glyphicon glyphicon-remove"></span></button>' +
        '<button class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" disabled="disabled"><span class="glyphicon glyphicon glyphicon-move"></span></button>' +
        '<button ng-if="formComponents[component.type].views" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" ng-click="editComponent(component)"><span class="glyphicon glyphicon-cog"></span></button>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/component.html',
      '<div class="component-form-group component-type-{{ component.type }}" ng-class="{highlight: hover}" ng-mouseenter="hover = true" ng-mouseleave="hover = false">' +
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
          '<div ng-if="dragging && formComponents[component.type].hasIFrame" class="dndOverlay"></div>' +
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
                '<span class="btn btn-primary btn-xs btn-block"><i ng-if="component.icon" class="{{ component.icon }}"></i> {{ component.title }}</span>' +
              '</div>' +
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
            '<div class="pull-right" ng-if="formComponents[component.type].documentation" style="margin-top:10px; margin-right:20px;">' +
              '<a ng-href="{{ formComponents[component.type].documentation }}" target="_blank"><i class="glyphicon glyphicon-new-window"></i> Help!</a>' +
            '</div>' +
            '<div class="panel panel-default preview-panel" style="margin-top:44px;">' +
              '<div class="panel-heading">Preview</div>' +
              '<div class="panel-body">' +
                '<formio-component component="component" data="data" formio="formio"></formio-component>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<button type="submit" class="btn btn-success" ng-click="saveSettings()">Save</button>&nbsp;' +
              '<button type="button" class="btn btn-default" ng-click="cancelSettings()" ng-if="!component.isNew">Cancel</button>&nbsp;' +
              '<button type="button" class="btn btn-danger" ng-click="removeComponent(component)">Remove</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</form>'
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
      title: 'Succeess'
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
    tooltip: 'This is the full icon class string to show the icon. Example: "glyphicon glyphicon-search" or "fa fa-plus"'
  },
  rightIcon: {
    label: 'Right Icon',
    placeholder: 'Enter icon classes',
    tooltip: 'This is the full icon class string to show the icon. Example: "glyphicon glyphicon-search" or "fa fa-plus"'
  },
  disableOnInvalid: {
    label: 'Disable on Form Invalid',
    type: 'checkbox',
    tooltip: 'This will disable this field if the form is invalid.'
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
* A directive for a field to edit a component's key.
* If you want the field to be disabled on when component.lockKey is true,
* specify a `disable-on-lock` attribute.
*/
app.directive('formBuilderOptionKey', function(){
  return {
    restrict: 'E',
    replace: true,
    template: function(el, attrs) {
      var disableOnLock = attrs.disableOnLock || attrs.disableOnLock === '';
      return '<div class="form-group">' +
                '<label for="key" form-builder-tooltip="The name of this field in the API endpoint.">Property Name</label>' +
                '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" valid-api-key value="{{ component.key }}" ' +
                  (disableOnLock ? 'ng-disabled="component.lockKey" ' : 'ng-blur="component.lockKey = true;" ') +
                  'ng-required>' +
              '</div>';
    },
    link: function($scope) {
      var suffixRegex = /(\d+)$/;
      $scope.$watch('component.key', function(newValue) {
        var valid = $scope.form.components.every(function(component) {
          if(component.key === newValue && component !== $scope.component) {
            return false;
          }
          return true;
        });
        if(valid) {
          return;
        }
        if(suffixRegex.test(newValue)) {
          newValue = newValue.replace(suffixRegex, function(suffix) { return Number(suffix) + 1; });
        }
        else {
          newValue += '2';
        }
        $scope.component.key = newValue;
      });
    }
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
      var invalidRegex = /^[^A-Za-z]*|[^A-Za-z0-9\-]*/g;
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
      tooltipText: '@'
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<div class="form-group">' +
                '<label form-builder-tooltip="{{ tooltipText }}">{{ label }}</label>' +
                '<table class="table table-condensed">' +
                  '<thead>' +
                    '<tr>' +
                      '<th class="col-xs-4">Value</th>' +
                      '<th class="col-xs-6">Label</th>' +
                      '<th class="col-xs-2"></th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr ng-repeat="v in data track by $index">' +
                      '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v.value"/></td>' +
                      '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v.label"/></td>' +
                      '<td class="col-xs-2"><button class="btn btn-danger btn-xs" ng-click="removeValue($index)"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                    '</tr>' +
                  '</tbody>' +
                '</table>' +
                '<button class="btn" ng-click="addValue()">Add Value</button>' +
                '</div>',
    replace: true,
    link: function($scope) {
      $scope.addValue = function() {
        var value = $scope.data.length + 1;
        $scope.data.push({
          value: 'value' + value,
          label: 'Value ' + value
        });
      };
      $scope.removeValue = function(index) {
        $scope.data.splice(index, 1);
      };
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
          template: 'formio/components/textfield/api.html'
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
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/textfield/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/textfield/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
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
          template: 'formio/components/address/api.html'
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
        '<form-builder-option property="multiple" label="Allow Multiple Addresses"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/address/api.html',
      '<ng-form>' +
        '<form-builder-option-key disable-on-lock></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/address/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
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
          template: 'formio/components/textfield/api.html'
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
          template: 'formio/components/checkbox/api.html'
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
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/checkbox/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
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
      documentation: 'http://help.form.io/userguide/#columns'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/columns.html',
      '<div class="row">' +
        '<div class="col-xs-6 component-form-group" ng-repeat="component in component.columns">' +
          '<form-builder-list></form-builder-list>' +
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
      hasIFrame: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/content.html',
      '<textarea ckeditor ng-model="component.html"><textarea>'
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
          template: 'formio/components/datetime/api.html'
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
        '<form-builder-option property="format" label="Date Format" placeholder="Enter the Date format" title="The format for displaying this field\'s date. The format must be specified like the AngularJS date filter."></form-builder-option>' +
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

    // Create the API markup.
    $templateCache.put('formio/components/datetime/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
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
        }
      ],
      documentation: 'http://help.form.io/userguide/#fieldset',
      keepChildrenOnRemove: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/fieldset.html',
      '<fieldset>' +
        '<legend ng-if="component.legend">{{ component.legend }}</legend>' +
        '<form-builder-list></form-builder-list>' +
      '</fieldset>'
    );

    // Create the settings markup.
    $templateCache.put('formio/components/fieldset/display.html',
      '<ng-form>' +
        '<form-builder-option property="legend" label="Legend" placeholder="FieldSet Legend" title="The legend text to appear above this fieldset."></form-builder-option>' +
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
          name: 'API',
          template: 'formio/components/hidden/api.html'
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
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/hidden/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
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
          template: 'formio/components/textfield/api.html'
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
      '<form-builder-list></form-builder-list>'
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
        }
      ],
      documentation: 'http://help.form.io/userguide/#panels'
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
          '<form-builder-list></form-builder-list>' +
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
      '</ng-form>'
    );
  }
]);

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('password', {
      views: formioComponentsProvider.$get().components.textfield.views,
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
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/phoneNumber/api.html',
      '<ng-form>' +
        '<form-builder-option-key disable-on-lock></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the Validation markup.
    $templateCache.put('formio/components/phoneNumber/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
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
          template: 'formio/components/radio/api.html'
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
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/radio/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
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
      onEdit: function($scope, component, Formio) {
        $scope.resources = [];
        var loader = new Formio('/project/' + $scope.project);
        loader.loadForms({params: {type: 'resource'}}).then(function(resources) {
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
        '<form-builder-option property="searchExpression" label="Search Expression" placeholder="The search string regular expression" title="A regular expression to filter the results with."></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder">Select Fields</label>' +
          '<input type="text" class="form-control" id="selectFields" name="selectFields" ng-model="component.selectFields" placeholder="Comma separated list of fields to select." value="{{ component.selectFields }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="A list of search filters based on the fields of the resource. See the <a target=\'_blank\' href=\'https://github.com/travist/resourcejs#filtering-the-results\'>Resource.js documentation</a> for the format of these filters.">Search Fields</label>' +
          '<input type="text" class="form-control" id="searchFields" name="searchFields" ng-model="component.searchFields" ng-list placeholder="The search field parings" value="{{ component.searchFields }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The HTML template for the result data items.">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<form-builder-option property="multiple" label="Allow Multiple Resources"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );
    // Create the API markup.
    $templateCache.put('formio/components/resource/api.html',
      '<ng-form>' +
        '<form-builder-option-key disable-on-lock></form-builder-option-key>' +
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
          template: 'formio/components/select/api.html'
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
        '<div class="form-group">' +
          '<label for="placeholder" form-builder-tooltip="The HTML template for the result data items.">Item Template</label>' +
          '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
        '</div>' +
        '<form-builder-option property="multiple"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/select/api.html',
      '<ng-form>' +
        '<form-builder-option-key disable-on-lock></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/select/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
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
          template: 'formio/components/signature/api.html'
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
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/signature/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
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
      documentation: 'http://help.form.io/userguide/#well'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/well.html',
      '<div class="well">' +
        '<form-builder-list></form-builder-list>' +
      '</div>'
    );
  }
]);
})();