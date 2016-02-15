(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('address', {
        icon: 'fa fa-home',
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
};

},{}],2:[function(require,module,exports){
"use strict";
module.exports = function(app) {
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
        icon: 'fa fa-stop',
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
};

},{}],3:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('checkbox', {
        icon: 'fa fa-check-square',
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
};

},{}],4:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('columns', {
        fbtemplate: 'formio/formbuilder/columns.html',
        icon: 'fa fa-columns',
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
};

},{}],5:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the component markup.
      $templateCache.put('formio/components/settings.html',
        '<form id="component-settings" novalidate>' +
          '<div class="row">' +
            '<div class="col-xs-6">' +
              '<uib-tabset>' +
                '<uib-tab ng-repeat="view in formComponent.views" heading="{{ view.name }}"><ng-include src="view.template"></ng-include></uib-tab>' +
              '</uib-tabset>' +
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
};

},{}],6:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('container', {
        fbtemplate: 'formio/formbuilder/container.html',
        views: [{
          name: 'Display',
          template: 'formio/components/container/display.html'
        }, {
          name: 'API',
          template: 'formio/components/common/api.html'
        }],
        documentation: 'http://help.form.io/userguide/#container',
        noDndOverlay: true,
        confirmRemove: true
      });
    }
  ]);

  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/components/container/display.html',
        '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/formbuilder/container.html',
        '<fieldset>' +
        '<label ng-if="component.label" class="control-label">{{ component.label }}</label>' +
        '<form-builder-list component="component" form="form" formio="formio"></form-builder-list>' +
        '</fieldset>'
      );
    }
  ]);
};

},{}],7:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('content', {
        fbtemplate: 'formio/formbuilder/content.html',
        icon: 'fa fa-html5',
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
};

},{}],8:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('custom', {
        icon: 'fa fa-cubes',
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
};

},{}],9:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('datagrid', {
        fbtemplate: 'formio/formbuilder/datagrid.html',
        icon: 'fa fa-list',
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
        '<form-builder-option property="addAnother"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="striped"></form-builder-option>' +
        '<form-builder-option property="bordered"></form-builder-option>' +
        '<form-builder-option property="hover"></form-builder-option>' +
        '<form-builder-option property="condensed"></form-builder-option>' +
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
};

},{}],10:[function(require,module,exports){
"use strict";
module.exports = function(app) {
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
        icon: 'fa fa-clock-o',
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
};

},{}],11:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('email', {
        icon: 'fa fa-at',
        views: formioComponentsProvider.$get().components.textfield.views,
        documentation: 'http://help.form.io/userguide/#email'
      });
    }
  ]);
};

},{}],12:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('fieldset', {
        fbtemplate: 'formio/formbuilder/fieldset.html',
        icon: 'fa fa-th-large',
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
};

},{}],13:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(
      formioComponentsProvider
    ) {
      formioComponentsProvider.register('file', {
        onEdit: function($scope, component, Formio, FormioPlugins) {
          // Pull out title and name from the list of storage plugins.
          $scope.storage = _.map(new FormioPlugins('storage'), function(storage) {
            return _.pick(storage, ['title', 'name']);
          });
        },
        icon: 'fa fa-file',
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
};

},{}],14:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('hidden', {
        fbtemplate: 'formio/formbuilder/hidden.html',
        icon: 'fa fa-user-secret',
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
};

},{}],15:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('htmlelement', {
        fbtemplate: 'formio/formbuilder/htmlelement.html',
        icon: 'fa fa-code',
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
};

},{}],16:[function(require,module,exports){
"use strict";
var app = angular.module('ngFormBuilder');

// Basic
require('./components')(app);
require('./textfield')(app);
require('./number')(app);
require('./password')(app);
require('./textarea')(app);
require('./checkbox')(app);
require('./selectboxes')(app);
require('./select')(app);
require('./radio')(app);
require('./htmlelement')(app);
require('./content')(app);
require('./button')(app);

// Special
require('./email')(app);
require('./phonenumber')(app);
require('./address')(app);
require('./datetime')(app);
require('./hidden')(app);
require('./resource')(app);
require('./file')(app);
require('./signature')(app);
require('./custom')(app);

// Layout
require('./columns')(app);
require('./fieldset')(app);
require('./container')(app);
require('./datagrid')(app);
require('./page')(app);
require('./panel')(app);
require('./table')(app);
require('./well')(app);

},{"./address":1,"./button":2,"./checkbox":3,"./columns":4,"./components":5,"./container":6,"./content":7,"./custom":8,"./datagrid":9,"./datetime":10,"./email":11,"./fieldset":12,"./file":13,"./hidden":14,"./htmlelement":15,"./number":17,"./page":18,"./panel":19,"./password":20,"./phonenumber":21,"./radio":22,"./resource":23,"./select":24,"./selectboxes":25,"./signature":26,"./table":27,"./textarea":28,"./textfield":29,"./well":30}],17:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('number', {
        icon: 'fa fa-hashtag',
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
};

},{}],18:[function(require,module,exports){
"use strict";
module.exports = function(app) {
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
};

},{}],19:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    'FORM_OPTIONS',
    function(
      formioComponentsProvider,
      FORM_OPTIONS
    ) {
      formioComponentsProvider.register('panel', {
        fbtemplate: 'formio/formbuilder/panel.html',
        icon: 'fa fa-list-alt',
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
};

},{}],20:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('password', {
        icon: 'fa fa-asterisk',
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
};

},{}],21:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('phoneNumber', {
        icon: 'fa fa-phone-square',
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
};

},{}],22:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('radio', {
        icon: 'fa fa-list-ul',
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
};

},{}],23:[function(require,module,exports){
"use strict";
module.exports = function(app) {
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
        icon: 'fa fa-files-o',
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
};

},{}],24:[function(require,module,exports){
"use strict";
module.exports = function(app) {
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
};

},{}],25:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('selectboxes', {
        icon: 'fa fa-plus-square',
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
};

},{}],26:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('signature', {
        icon: 'fa fa-pencil',
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
};

},{}],27:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('table', {
        fbtemplate: 'formio/formbuilder/table.html',
        documentation: 'http://help.form.io/userguide/#table',
        noDndOverlay: true,
        confirmRemove: true,
        icon: 'fa fa-table',
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
};

},{}],28:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('textarea', {
        icon: 'fa fa-font',
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
};

},{}],29:[function(require,module,exports){
"use strict";
module.exports = function(app) {
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
};

},{}],30:[function(require,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('well', {
        fbtemplate: 'formio/formbuilder/well.html',
        icon: 'fa fa-square-o',
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
};

},{}],31:[function(require,module,exports){
"use strict";
/**
  * These are component options that can be reused
  * with the builder-option directive
  * Valid properties: label, placeholder, tooltip, type
  */
module.exports = {
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
    'addAnother': {
      label: 'Add Another Text',
      placeholder: 'Add Another',
      tooltip: 'Set the text of the Add Another button.'
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
  };

},{}],32:[function(require,module,exports){
"use strict";
module.exports = {
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
};

},{}],33:[function(require,module,exports){
"use strict";
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

},{}],34:[function(require,module,exports){
"use strict";
/**
 * Create the form-builder-component directive.
 * Extend the formio-component directive and change the template.
 */
module.exports = [
  'formioComponentDirective',
  function(formioComponentDirective) {
    return angular.extend({}, formioComponentDirective[0], {
      scope: false,
      templateUrl: 'formio/formbuilder/component.html'
    });
  }
];

},{}],35:[function(require,module,exports){
"use strict";
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

    $scope.addComponent = function(component, index) {

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
          index--;
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

},{}],36:[function(require,module,exports){
"use strict";
module.exports = [
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
];

},{}],37:[function(require,module,exports){
"use strict";
module.exports = [
  function() {
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
      controller: 'formBuilderDnd',
      templateUrl: 'formio/formbuilder/list.html'
    };
  }
];

},{}],38:[function(require,module,exports){
"use strict";
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
module.exports = ['COMMON_OPTIONS', function(COMMON_OPTIONS) {
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
        if (key.toLowerCase() === 'title') {
          tooltip = attrs[key];
        }
      });
      input.attr(inputAttrs);

      // Checkboxes have a slightly different layout
      if (inputAttrs.type.toLowerCase() === 'checkbox') {
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
}];

},{}],39:[function(require,module,exports){
"use strict";
/**
* A directive for editing a component's custom validation.
*/
module.exports = function() {
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
};

},{}],40:[function(require,module,exports){
"use strict";
/**
* A directive for a field to edit a component's key.
*/
module.exports = function() {
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
          if (component.key === newValue && component !== $scope.component) {
            valid = false;
          }
        });
        if (valid) {
          return;
        }
        if (newValue.match(suffixRegex)) {
          newValue = newValue.replace(suffixRegex, function(suffix) {
            return Number(suffix) + 1;
          });
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
        if (!$scope.component.key && $scope.formComponents[$scope.component.type].settings.key) {
          $scope.component.key = $scope.formComponents[$scope.component.type].settings.key;
          $scope.component.lockKey = false; // Also unlock key
          uniquify();
        }
      };

      $scope.shouldWarnAboutEmbedding = function() {
        return !$scope.component.source && $scope.component.key.indexOf('.') !== -1;
      };
    }]
  };
};

},{}],41:[function(require,module,exports){
"use strict";
module.exports = [
  function() {
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
      controller: 'formBuilderDnd',
      templateUrl: 'formio/formbuilder/row.html'
    };
  }
];

},{}],42:[function(require,module,exports){
"use strict";
/**
 * A directive for a table builder
 */
module.exports = function() {
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
          /*eslint-disable max-depth */
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
            /*eslint-enable max-depth */
          }
        };

        $scope.$watch('component.numRows', changeTable);
        $scope.$watch('component.numCols', changeTable);
      }
    ]
  };
};

},{}],43:[function(require,module,exports){
"use strict";
/**
* Invokes Bootstrap's popover jquery plugin on an element
* Tooltip text can be provided via title attribute or
* as the value for this directive.
*/
module.exports = function() {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, el, attrs) {
      if (attrs.formBuilderTooltip || attrs.title) {
        var tooltip = angular.element('<i class="glyphicon glyphicon-question-sign text-muted"></i>');
        tooltip.popover({
          html: true,
          trigger: 'manual',
          placement: 'right',
          content: attrs.title || attrs.formBuilderTooltip
        }).on('mouseenter', function() {
          var $self = angular.element(this);
          $self.popover('show');
          $self.siblings('.popover').on('mouseleave', function() {
            $self.popover('hide');
          });
        }).on('mouseleave', function() {
          var $self = angular.element(this);
          setTimeout(function() {
            if (!angular.element('.popover:hover').length) {
              $self.popover('hide');
            }
          }, 100);
        });
        el.append(' ').append(tooltip);
      }
    }
  };
};

},{}],44:[function(require,module,exports){
"use strict";
module.exports = function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) {
      ctrl.$parsers.push(function(input) {
        try {
          var obj = JSON.parse(input);
          ctrl.$setValidity('jsonInput', true);
          return obj;
        }
        catch (e) {
          ctrl.$setValidity('jsonInput', false);
          return undefined;
        }
      });
      ctrl.$formatters.push(function(data) {
        if (data === null) {
          ctrl.$setValidity('jsonInput', false);
          return '';
        }
        try {
          var str = angular.toJson(data, true);
          ctrl.$setValidity('jsonInput', true);
          return str;
        }
        catch (e) {
          ctrl.$setValidity('jsonInput', false);
          return '';
        }
      });
    }
  };
};

},{}],45:[function(require,module,exports){
"use strict";
/*
* Prevents user inputting invalid api key characters.
* Valid characters for an api key are alphanumeric and hyphens
*/
module.exports = function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var invalidRegex = /^[^A-Za-z]*|[^A-Za-z0-9\-\.\[\]]*/g;
      ngModel.$parsers.push(function(inputValue) {
        var transformedInput = inputValue.replace(invalidRegex, '');
        if (transformedInput !== inputValue) {
          ngModel.$setViewValue(transformedInput);
          ngModel.$render();
        }
        return transformedInput;
     });
    }
  };
};

},{}],46:[function(require,module,exports){
"use strict";
/**
* A directive that provides a UI to add {value, label} objects to an array.
*/
module.exports = function() {
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
          if (newValue.length !== oldValue.length) {
            return;
          }

          _.map(newValue, function(entry, i) {
            if (entry[$scope.labelProperty] !== oldValue[i][$scope.labelProperty]) {// label changed
              if (entry[$scope.valueProperty] === '' || entry[$scope.valueProperty] === _.camelCase(oldValue[i][$scope.labelProperty])) {
                entry[$scope.valueProperty] = _.camelCase(entry[$scope.labelProperty]);
              }
            }
          });
        }, true);
      }
    }
  };
};

},{}],47:[function(require,module,exports){
"use strict";
// Create an AngularJS service called debounce
module.exports = ['$timeout','$q', function($timeout, $q) {
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
        if (!immediate) {
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
}];

},{}],48:[function(require,module,exports){
"use strict";
/*global window: false, console: false */
/*jshint browser: true */
var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ngCkeditor'
]);

app.constant('FORM_OPTIONS', require('./constants/formOptions'));

app.constant('COMMON_OPTIONS', require('./constants/commonOptions'));

app.factory('debounce', require('./factories/debounce'));

app.directive('formBuilder', require('./directives/formBuilder'));

app.directive('formBuilderComponent', require('./directives/formBuilderComponent'));

app.directive('formBuilderElement', require('./directives/formBuilderElement'));

app.controller('formBuilderDnd', require('./directives/formBuilderDnd'));

app.directive('formBuilderList', require('./directives/formBuilderList'));

app.directive('formBuilderRow', require('./directives/formBuilderRow'));

app.directive('jsonInput', require('./directives/jsonInput'));

app.directive('formBuilderOption', require('./directives/formBuilderOption'));

app.directive('formBuilderTable', require('./directives/formBuilderTable'));

app.directive('formBuilderOptionKey', require('./directives/formBuilderOptionKey'));

app.directive('validApiKey', require('./directives/validApiKey'));

app.directive('formBuilderOptionCustomValidation', require('./directives/formBuilderOptionCustomValidation'));

app.directive('formBuilderTooltip', require('./directives/formBuilderTooltip'));

app.directive('valueBuilder', require('./directives/valueBuilder'));

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
  '$rootScope',
  'ngDialog',
  function($templateCache, $rootScope, ngDialog) {
    // Close all open dialogs on state change.
    $rootScope.$on('$stateChangeStart', function() {
      ngDialog.closeAll(false);
    });

    $templateCache.put('formio/formbuilder/editbuttons.html',
      '<div class="component-btn-group">' +
        '<div class="btn btn-xxs btn-danger component-settings-button" style="z-index: 1000" ng-click="removeComponent(component, formComponent.confirmRemove)"><span class="glyphicon glyphicon-remove"></span></div>' +
        '<div class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000"><span class="glyphicon glyphicon glyphicon-move"></span></div>' +
        '<div ng-if="formComponent.views" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" ng-click="editComponent(component)"><span class="glyphicon glyphicon-cog"></span></div>' +
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
        'dnd-drop="addComponent(item, index)">' +
        '<li ng-if="component.components.length < hideCount">' +
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
      '<div class="formbuilder-row">' +
      '<label ng-if="component.label" class="control-label">{{ component.label }}</label>' +
      '<ul class="component-row formbuilder-group" ' +
        'dnd-list="component.components"' +
        'dnd-drop="addComponent(item)"' +
        'dnd-horizontal-list="true">' +
        '<li ng-repeat="component in component.components" ' +
          'class="formbuilder-group-row pull-left" ' +
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
        '<li class="formbuilder-group-row form-builder-drop" ng-if="component.components.length < hideCount">' +
          '<div class="alert alert-info" role="alert">' +
            'Drag and Drop a form component' +
          '</div>' +
        '</li>' +
      '</ul>' +
      '<div style="clear:both;"></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/builder.html',
      '<div class="row formbuilder">' +
        '<div class="col-sm-2 formcomponents">' +
          '<uib-accordion close-others="true">' +
            '<uib-accordion-group ng-repeat="(groupName, group) in formComponentGroups" heading="{{ group.title }}" is-open="$first" panel-class="panel-default {{ group.panelClass }}">' +
              '<uib-accordion close-others="true" ng-if="group.subgroups">' +
                '<uib-accordion-group ng-repeat="(subgroupName, subgroup) in group.subgroups" heading="{{ subgroup.title }}" is-open="$first" panel-class="panel-default subgroup-accordion">' +
                  '<div ng-repeat="component in formComponentsByGroup[groupName][subgroupName]" ng-if="component.title"' +
                    'dnd-draggable="component.settings"' +
                    'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
                    'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
                    'dnd-effect-allowed="copy" ' +
                    'class="formcomponentcontainer">' +
                      '<span class="btn btn-primary btn-xs btn-block formcomponent" title="{{component.title}}" style="overflow: hidden; text-overflow: ellipsis;">' +
                        '<i ng-if="component.icon" class="{{ component.icon }}"></i> {{ component.title }}' +
                      '</span>' +
                  '</div>' +
                '</uib-accordion-group>' +
              '</uib-accordion>' +
              '<div ng-repeat="component in formComponentsByGroup[groupName]" ng-if="!group.subgroup && component.title"' +
                'dnd-draggable="component.settings"' +
                'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
                'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
                'dnd-effect-allowed="copy" ' +
                'class="formcomponentcontainer">' +
                  '<span class="btn btn-primary btn-xs btn-block formcomponent" title="{{component.title}}" style="overflow: hidden; text-overflow: ellipsis;">' +
                    '<i ng-if="component.icon" class="{{ component.icon }}"></i> {{ component.title }}' +
                  '</span>' +
              '</div>' +
            '</uib-accordion-group>' +
          '</uib-accordion>' +
        '</div>' +
        '<div class="col-sm-10 formbuilder">' +
              '<div class="dropzone">' +
                '<form-builder-list component="form" form="form" formio="formio" hide-dnd-box-count="2" class="rootlist"></form-builder-list>' +
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

require('./components');

},{"./components":16,"./constants/commonOptions":31,"./constants/formOptions":32,"./directives/formBuilder":33,"./directives/formBuilderComponent":34,"./directives/formBuilderDnd":35,"./directives/formBuilderElement":36,"./directives/formBuilderList":37,"./directives/formBuilderOption":38,"./directives/formBuilderOptionCustomValidation":39,"./directives/formBuilderOptionKey":40,"./directives/formBuilderRow":41,"./directives/formBuilderTable":42,"./directives/formBuilderTooltip":43,"./directives/jsonInput":44,"./directives/validApiKey":45,"./directives/valueBuilder":46,"./factories/debounce":47}]},{},[48])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9hZGRyZXNzLmpzIiwic3JjL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwic3JjL2NvbXBvbmVudHMvY2hlY2tib3guanMiLCJzcmMvY29tcG9uZW50cy9jb2x1bW5zLmpzIiwic3JjL2NvbXBvbmVudHMvY29tcG9uZW50cy5qcyIsInNyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qcyIsInNyYy9jb21wb25lbnRzL2NvbnRlbnQuanMiLCJzcmMvY29tcG9uZW50cy9jdXN0b20uanMiLCJzcmMvY29tcG9uZW50cy9kYXRhZ3JpZC5qcyIsInNyYy9jb21wb25lbnRzL2RhdGV0aW1lLmpzIiwic3JjL2NvbXBvbmVudHMvZW1haWwuanMiLCJzcmMvY29tcG9uZW50cy9maWVsZHNldC5qcyIsInNyYy9jb21wb25lbnRzL2ZpbGUuanMiLCJzcmMvY29tcG9uZW50cy9oaWRkZW4uanMiLCJzcmMvY29tcG9uZW50cy9odG1sZWxlbWVudC5qcyIsInNyYy9jb21wb25lbnRzL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvbnVtYmVyLmpzIiwic3JjL2NvbXBvbmVudHMvcGFnZS5qcyIsInNyYy9jb21wb25lbnRzL3BhbmVsLmpzIiwic3JjL2NvbXBvbmVudHMvcGFzc3dvcmQuanMiLCJzcmMvY29tcG9uZW50cy9waG9uZW51bWJlci5qcyIsInNyYy9jb21wb25lbnRzL3JhZGlvLmpzIiwic3JjL2NvbXBvbmVudHMvcmVzb3VyY2UuanMiLCJzcmMvY29tcG9uZW50cy9zZWxlY3QuanMiLCJzcmMvY29tcG9uZW50cy9zZWxlY3Rib3hlcy5qcyIsInNyYy9jb21wb25lbnRzL3NpZ25hdHVyZS5qcyIsInNyYy9jb21wb25lbnRzL3RhYmxlLmpzIiwic3JjL2NvbXBvbmVudHMvdGV4dGFyZWEuanMiLCJzcmMvY29tcG9uZW50cy90ZXh0ZmllbGQuanMiLCJzcmMvY29tcG9uZW50cy93ZWxsLmpzIiwic3JjL2NvbnN0YW50cy9jb21tb25PcHRpb25zLmpzIiwic3JjL2NvbnN0YW50cy9mb3JtT3B0aW9ucy5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyLmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJDb21wb25lbnQuanMiLCJzcmMvZGlyZWN0aXZlcy9mb3JtQnVpbGRlckRuZC5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyRWxlbWVudC5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyTGlzdC5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyT3B0aW9uLmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJPcHRpb25DdXN0b21WYWxpZGF0aW9uLmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJPcHRpb25LZXkuanMiLCJzcmMvZGlyZWN0aXZlcy9mb3JtQnVpbGRlclJvdy5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyVGFibGUuanMiLCJzcmMvZGlyZWN0aXZlcy9mb3JtQnVpbGRlclRvb2x0aXAuanMiLCJzcmMvZGlyZWN0aXZlcy9qc29uSW5wdXQuanMiLCJzcmMvZGlyZWN0aXZlcy92YWxpZEFwaUtleS5qcyIsInNyYy9kaXJlY3RpdmVzL3ZhbHVlQnVpbGRlci5qcyIsInNyYy9mYWN0b3JpZXMvZGVib3VuY2UuanMiLCJzcmMvbmdGb3JtQnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdhZGRyZXNzJywge1xuICAgICAgICBpY29uOiAnZmEgZmEtaG9tZScsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9hZGRyZXNzL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvYWRkcmVzcy92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2FkZHJlc3MnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvYWRkcmVzcy9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIiBsYWJlbD1cIkFsbG93IE11bHRpcGxlIEFkZHJlc3Nlc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcm90ZWN0ZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGVyc2lzdGVudFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJsZVZpZXdcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9hZGRyZXNzL3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidW5pcXVlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgICdGT1JNX09QVElPTlMnLFxuICAgIGZ1bmN0aW9uKFxuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLFxuICAgICAgRk9STV9PUFRJT05TXG4gICAgKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2J1dHRvbicsIHtcbiAgICAgICAgb25FZGl0OiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAkc2NvcGUuYWN0aW9ucyA9IEZPUk1fT1BUSU9OUy5hY3Rpb25zO1xuICAgICAgICAgICRzY29wZS5zaXplcyA9IEZPUk1fT1BUSU9OUy5zaXplcztcbiAgICAgICAgICAkc2NvcGUudGhlbWVzID0gRk9STV9PUFRJT05TLnRoZW1lcztcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXN0b3AnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvYnV0dG9uL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNidXR0b24nXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvYnV0dG9uL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiYWN0aW9uXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGlzIGlzIHRoZSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIGJ5IHRoaXMgYnV0dG9uLlwiPkFjdGlvbjwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiYWN0aW9uXCIgbmFtZT1cImFjdGlvblwiIG5nLW9wdGlvbnM9XCJhY3Rpb24ubmFtZSBhcyBhY3Rpb24udGl0bGUgZm9yIGFjdGlvbiBpbiBhY3Rpb25zXCIgbmctbW9kZWw9XCJjb21wb25lbnQuYWN0aW9uXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ0aGVtZVwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIGNvbG9yIHRoZW1lIG9mIHRoaXMgcGFuZWwuXCI+VGhlbWU8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInRoZW1lXCIgbmFtZT1cInRoZW1lXCIgbmctb3B0aW9ucz1cInRoZW1lLm5hbWUgYXMgdGhlbWUudGl0bGUgZm9yIHRoZW1lIGluIHRoZW1lc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LnRoZW1lXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJzaXplXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgc2l6ZSBvZiB0aGlzIGJ1dHRvbi5cIj5TaXplPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJzaXplXCIgbmFtZT1cInNpemVcIiBuZy1vcHRpb25zPVwic2l6ZS5uYW1lIGFzIHNpemUudGl0bGUgZm9yIHNpemUgaW4gc2l6ZXNcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5zaXplXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxlZnRJY29uXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInJpZ2h0SWNvblwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJpbmRleFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJibG9ja1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJkaXNhYmxlT25JbnZhbGlkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdjaGVja2JveCcsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWNoZWNrLXNxdWFyZScsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jaGVja2JveC9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NoZWNrYm94L3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jY2hlY2tib3gnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY2hlY2tib3gvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2NoZWNrYm94L3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2NvbHVtbnMnLCB7XG4gICAgICAgIGZidGVtcGxhdGU6ICdmb3JtaW8vZm9ybWJ1aWxkZXIvY29sdW1ucy5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWNvbHVtbnMnLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2NvbHVtbnMnLFxuICAgICAgICBub0RuZE92ZXJsYXk6IHRydWUsXG4gICAgICAgIGNvbmZpcm1SZW1vdmU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2NvbHVtbnMuaHRtbCcsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicm93XCI+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wteHMtNiBjb21wb25lbnQtZm9ybS1ncm91cFwiIG5nLXJlcGVhdD1cImNvbXBvbmVudCBpbiBjb21wb25lbnQuY29sdW1uc1wiPicgK1xuICAgICAgICAgICAgJzxmb3JtLWJ1aWxkZXItbGlzdCBjbGFzcz1cImZvcm1pby1jb2x1bW5cIiBjb21wb25lbnQ9XCJjb21wb25lbnRcIiBmb3JtPVwiZm9ybVwiIGZvcm1pbz1cImZvcm1pb1wiPjwvZm9ybS1idWlsZGVyLWxpc3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnQgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9zZXR0aW5ncy5odG1sJyxcbiAgICAgICAgJzxmb3JtIGlkPVwiY29tcG9uZW50LXNldHRpbmdzXCIgbm92YWxpZGF0ZT4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cInJvd1wiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wteHMtNlwiPicgK1xuICAgICAgICAgICAgICAnPHVpYi10YWJzZXQ+JyArXG4gICAgICAgICAgICAgICAgJzx1aWItdGFiIG5nLXJlcGVhdD1cInZpZXcgaW4gZm9ybUNvbXBvbmVudC52aWV3c1wiIGhlYWRpbmc9XCJ7eyB2aWV3Lm5hbWUgfX1cIj48bmctaW5jbHVkZSBzcmM9XCJ2aWV3LnRlbXBsYXRlXCI+PC9uZy1pbmNsdWRlPjwvdWliLXRhYj4nICtcbiAgICAgICAgICAgICAgJzwvdWliLXRhYnNldD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXhzLTZcIj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0XCIgbmctaWY9XCJmb3JtQ29tcG9uZW50LmRvY3VtZW50YXRpb25cIiBzdHlsZT1cIm1hcmdpbi10b3A6MTBweDsgbWFyZ2luLXJpZ2h0OjIwcHg7XCI+JyArXG4gICAgICAgICAgICAgICAgJzxhIG5nLWhyZWY9XCJ7eyBmb3JtQ29tcG9uZW50LmRvY3VtZW50YXRpb24gfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj48aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbmV3LXdpbmRvd1wiPjwvaT4gSGVscCE8L2E+JyArXG4gICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0IHByZXZpZXctcGFuZWxcIiBzdHlsZT1cIm1hcmdpbi10b3A6NDRweDtcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5QcmV2aWV3PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+JyArXG4gICAgICAgICAgICAgICAgICAnPGZvcm1pby1jb21wb25lbnQgY29tcG9uZW50PVwiY29tcG9uZW50XCIgZGF0YT1cImRhdGFcIiBmb3JtaW89XCJmb3JtaW9cIj48L2Zvcm1pby1jb21wb25lbnQ+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIG5nLWNsaWNrPVwiY2xvc2VUaGlzRGlhbG9nKHRydWUpXCI+U2F2ZTwvYnV0dG9uPiZuYnNwOycgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWNsaWNrPVwiY2xvc2VUaGlzRGlhbG9nKGZhbHNlKVwiIG5nLWlmPVwiIWNvbXBvbmVudC5pc05ld1wiPkNhbmNlbDwvYnV0dG9uPiZuYnNwOycgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgbmctY2xpY2s9XCJyZW1vdmVDb21wb25lbnQoY29tcG9uZW50LCBmb3JtQ29tcG9uZW50c1tjb21wb25lbnQudHlwZV0uY29uZmlybVJlbW92ZSk7IGNsb3NlVGhpc0RpYWxvZyhmYWxzZSlcIj5SZW1vdmU8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIGNvbW1vbiBBUEkgdGFiIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1rZXk+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWtleT4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIGNvbW1vbiBMYXlvdXQgdGFiIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgIC8vIE5lZWQgdG8gdXNlIGFycmF5IG5vdGF0aW9uIHRvIGhhdmUgZGFzaCBpbiBuYW1lXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3R5bGVbXFwnbWFyZ2luLXRvcFxcJ11cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3R5bGVbXFwnbWFyZ2luLXJpZ2h0XFwnXVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdHlsZVtcXCdtYXJnaW4tYm90dG9tXFwnXVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdHlsZVtcXCdtYXJnaW4tbGVmdFxcJ11cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2NvbnRhaW5lcicsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9jb250YWluZXIuaHRtbCcsXG4gICAgICAgIHZpZXdzOiBbe1xuICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbnRhaW5lci9kaXNwbGF5Lmh0bWwnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgfV0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jY29udGFpbmVyJyxcbiAgICAgICAgbm9EbmRPdmVybGF5OiB0cnVlLFxuICAgICAgICBjb25maXJtUmVtb3ZlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuXG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29udGFpbmVyL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcm90ZWN0ZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9jb250YWluZXIuaHRtbCcsXG4gICAgICAgICc8ZmllbGRzZXQ+JyArXG4gICAgICAgICc8bGFiZWwgbmctaWY9XCJjb21wb25lbnQubGFiZWxcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj57eyBjb21wb25lbnQubGFiZWwgfX08L2xhYmVsPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cImNvbXBvbmVudFwiIGZvcm09XCJmb3JtXCIgZm9ybWlvPVwiZm9ybWlvXCI+PC9mb3JtLWJ1aWxkZXItbGlzdD4nICtcbiAgICAgICAgJzwvZmllbGRzZXQ+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2NvbnRlbnQnLCB7XG4gICAgICAgIGZidGVtcGxhdGU6ICdmb3JtaW8vZm9ybWJ1aWxkZXIvY29udGVudC5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWh0bWw1JyxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNjb250ZW50LWNvbXBvbmVudCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKHNldHRpbmdzLCAkc2NvcGUpIHtcbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdjb21wb25lbnQuaHRtbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KCdmb3JtQnVpbGRlcjp1cGRhdGUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvY29udGVudC5odG1sJyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgJzx0ZXh0YXJlYSBja2VkaXRvciBuZy1tb2RlbD1cImNvbXBvbmVudC5odG1sXCI+PHRleHRhcmVhPicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2N1c3RvbScsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWN1YmVzJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2N1c3RvbS9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2N1c3RvbSdcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG5cbiAgYXBwLmNvbnRyb2xsZXIoJ2N1c3RvbUNvbXBvbmVudCcsIFtcbiAgICAnJHNjb3BlJyxcbiAgICAnZm9ybWlvQ29tcG9uZW50cycsXG4gICAgZnVuY3Rpb24oXG4gICAgICAkc2NvcGUsXG4gICAgICBmb3JtaW9Db21wb25lbnRzXG4gICAgKSB7XG4gICAgICAvLyBCZWNhdXNlIG9mIHRoZSB3ZWlyZG5lc3NlcyBvZiBwcm90b3R5cGUgaW5oZXJpdGVuY2UsIGNvbXBvbmVudHMgY2FuJ3QgdXBkYXRlIHRoZW1zZWx2ZXMsIG9ubHkgdGhlaXIgcHJvcGVydGllcy5cbiAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAvLyBEb24ndCBhbGxvdyBhIHR5cGUgb2YgYSByZWFsIHR5cGUuXG4gICAgICAgICAgbmV3VmFsdWUudHlwZSA9IChmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkobmV3VmFsdWUudHlwZSkgPyAnY3VzdG9tJyA6IG5ld1ZhbHVlLnR5cGUpO1xuICAgICAgICAgIC8vIEVuc3VyZSBzb21lIGtleSBzZXR0aW5ncyBhcmUgc2V0LlxuICAgICAgICAgIG5ld1ZhbHVlLmtleSA9IG5ld1ZhbHVlLmtleSB8fCBuZXdWYWx1ZS50eXBlO1xuICAgICAgICAgIG5ld1ZhbHVlLnByb3RlY3RlZCA9IChuZXdWYWx1ZS5oYXNPd25Qcm9wZXJ0eSgncHJvdGVjdGVkJykgPyBuZXdWYWx1ZS5wcm90ZWN0ZWQgOiBmYWxzZSk7XG4gICAgICAgICAgbmV3VmFsdWUucGVyc2lzdGVudCA9IChuZXdWYWx1ZS5oYXNPd25Qcm9wZXJ0eSgncGVyc2lzdGVudCcpID8gbmV3VmFsdWUucGVyc2lzdGVudCA6IHRydWUpO1xuICAgICAgICAgICRzY29wZS51cGRhdGVDb21wb25lbnQobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcblxuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY3VzdG9tL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICc8cD5DdXN0b20gY29tcG9uZW50cyBjYW4gYmUgdXNlZCB0byByZW5kZXIgc3BlY2lhbCBmaWVsZHMgb3Igd2lkZ2V0cyBpbnNpZGUgeW91ciBhcHAuIEZvciBpbmZvcm1hdGlvbiBvbiBob3cgdG8gZGlzcGxheSBpbiBhbiBhcHAsIHNlZSA8YSBocmVmPVwiaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2N1c3RvbVwiIHRhcmdldD1cIl9ibGFua1wiPmN1c3RvbSBjb21wb25lbnQgZG9jdW1lbnRhdGlvbjwvYT4uPC9wPicgK1xuICAgICAgICAnPGxhYmVsIGZvcj1cImpzb25cIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIkVudGVyIHRoZSBKU09OIGZvciB0aGlzIGN1c3RvbSBlbGVtZW50LlwiPkN1c3RvbSBFbGVtZW50IEpTT048L2xhYmVsPicgK1xuICAgICAgICAnPHRleHRhcmVhIG5nLWNvbnRyb2xsZXI9XCJjdXN0b21Db21wb25lbnRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwianNvblwiIG5hbWU9XCJqc29uXCIganNvbi1pbnB1dCBuZy1tb2RlbD1cImNvbXBvbmVudFwiIHBsYWNlaG9sZGVyPVwie31cIiByb3dzPVwiMTBcIj48L3RleHRhcmVhPicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2RhdGFncmlkJywge1xuICAgICAgICBmYnRlbXBsYXRlOiAnZm9ybWlvL2Zvcm1idWlsZGVyL2RhdGFncmlkLmh0bWwnLFxuICAgICAgICBpY29uOiAnZmEgZmEtbGlzdCcsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9kYXRhZ3JpZC9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNkYXRhZ3JpZCcsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcblxuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2RhdGFncmlkL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImFkZEFub3RoZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3RyaXBlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiYm9yZGVyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImhvdmVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjb25kZW5zZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGVyc2lzdGVudFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2RhdGFncmlkLmh0bWwnLFxuICAgICAgICAnPGZvcm0tYnVpbGRlci1yb3cgY2xhc3M9XCJmb3JtaW8tcm93XCIgY29tcG9uZW50PVwiY29tcG9uZW50XCIgZm9ybT1cImZvcm1cIiBmb3JtaW89XCJmb3JtaW9cIj48L2Zvcm0tYnVpbGRlci1yb3c+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2RhdGV0aW1lJywge1xuICAgICAgICBvbkVkaXQ6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICRzY29wZS5zZXRGb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY29tcG9uZW50LmVuYWJsZURhdGUgJiYgJHNjb3BlLmNvbXBvbmVudC5lbmFibGVUaW1lKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQuZm9ybWF0ID0gJ3l5eXktTU0tZGQgSEg6bW0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoJHNjb3BlLmNvbXBvbmVudC5lbmFibGVEYXRlICYmICEkc2NvcGUuY29tcG9uZW50LmVuYWJsZVRpbWUpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5mb3JtYXQgPSAneXl5eS1NTS1kZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghJHNjb3BlLmNvbXBvbmVudC5lbmFibGVEYXRlICYmICRzY29wZS5jb21wb25lbnQuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LmZvcm1hdCA9ICdISDptbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICAkc2NvcGUuc3RhcnRpbmdEYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuICAgICAgICAgICRzY29wZS5tb2RlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ2RheScsXG4gICAgICAgICAgICAgIGxhYmVsOiAnRGF5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ21vbnRoJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdNb250aCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICd5ZWFyJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdZZWFyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgIH0sXG4gICAgICAgIGljb246ICdmYSBmYS1jbG9jay1vJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2RhdGV0aW1lL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEYXRlJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvZGF0ZXRpbWUvZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1RpbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9kYXRldGltZS90aW1lLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2RhdGV0aW1lL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jZGF0ZXRpbWUnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvZGF0ZXRpbWUvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBsYWNlaG9sZGVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZvcm1hdFwiIGxhYmVsPVwiRGF0ZSBGb3JtYXRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHRoZSBEYXRlIGZvcm1hdFwiIHRpdGxlPVwiVGhlIGZvcm1hdCBmb3IgZGlzcGxheWluZyB0aGlzIGZpZWxkXFwncyBkYXRlLiBUaGUgZm9ybWF0IG11c3QgYmUgc3BlY2lmaWVkIGxpa2UgdGhlIDxhIGhyZWY9XFwnaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL2ZpbHRlci9kYXRlXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+QW5ndWxhckpTIGRhdGUgZmlsdGVyPC9hPi5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvZGF0ZXRpbWUvZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJFbmFibGVzIGRhdGUgaW5wdXQgZm9yIHRoaXMgZmllbGQuXCI+JyArXG4gICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJlbmFibGVEYXRlXCIgbmFtZT1cImVuYWJsZURhdGVcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5lbmFibGVEYXRlXCIgbmctY2hlY2tlZD1cImNvbXBvbmVudC5lbmFibGVEYXRlXCIgbmctY2hhbmdlPVwic2V0Rm9ybWF0KClcIj4gRW5hYmxlIERhdGUgSW5wdXQnICtcbiAgICAgICAgICAgICc8L2xhYmVsPicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiZGF0ZXBpY2tlck1vZGVcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBpbml0aWFsIHZpZXcgdG8gZGlzcGxheSB3aGVuIGNsaWNraW5nIG9uIHRoaXMgZmllbGQuXCI+SW5pdGlhbCBNb2RlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJkYXRlcGlja2VyTW9kZVwiIG5hbWU9XCJkYXRlcGlja2VyTW9kZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmRhdGVwaWNrZXJNb2RlXCIgbmctb3B0aW9ucz1cIm1vZGUubmFtZSBhcyBtb2RlLmxhYmVsIGZvciBtb2RlIGluIG1vZGVzXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGNhbiBiZSBwaWNrZWQuXCI+TWluaW11bSBEYXRlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWZvY3VzPVwibWluRGF0ZU9wZW4gPSB0cnVlXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWluaXQ9XCJtaW5EYXRlT3BlbiA9IGZhbHNlXCIgJyArXG4gICAgICAgICAgICAgICAgJ2lzLW9wZW49XCJtaW5EYXRlT3BlblwiICcgK1xuICAgICAgICAgICAgICAgICdkYXRldGltZS1waWNrZXI9XCJ5eXl5LU1NLWRkXCIgJyArXG4gICAgICAgICAgICAgICAgJ2VuYWJsZS10aW1lPVwiZmFsc2VcIiAnICtcbiAgICAgICAgICAgICAgICAnbmctbW9kZWw9XCJjb21wb25lbnQubWluRGF0ZVwiIC8+JyArXG4gICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWNsaWNrPVwibWluRGF0ZU9wZW4gPSB0cnVlXCI+PGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhclwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInBsYWNlaG9sZGVyXCIgIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIG1heGltdW0gZGF0ZSB0aGF0IGNhbiBiZSBwaWNrZWQuXCI+TWF4aW11bSBEYXRlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWZvY3VzPVwibWF4RGF0ZU9wZW4gPSB0cnVlXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWluaXQ9XCJtYXhEYXRlT3BlbiA9IGZhbHNlXCIgJyArXG4gICAgICAgICAgICAgICAgJ2lzLW9wZW49XCJtYXhEYXRlT3BlblwiICcgK1xuICAgICAgICAgICAgICAgICdkYXRldGltZS1waWNrZXI9XCJ5eXl5LU1NLWRkXCIgJyArXG4gICAgICAgICAgICAgICAgJ2VuYWJsZS10aW1lPVwiZmFsc2VcIiAnICtcbiAgICAgICAgICAgICAgICAnbmctbW9kZWw9XCJjb21wb25lbnQubWF4RGF0ZVwiIC8+JyArXG4gICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWNsaWNrPVwibWF4RGF0ZU9wZW4gPSB0cnVlXCI+PGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhclwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInN0YXJ0aW5nRGF5XCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlwiPlN0YXJ0aW5nIERheTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwic3RhcnRpbmdEYXlcIiBuYW1lPVwic3RhcnRpbmdEYXlcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5kYXRlUGlja2VyLnN0YXJ0aW5nRGF5XCIgbmctb3B0aW9ucz1cImlkeCBhcyBkYXkgZm9yIChpZHgsIGRheSkgaW4gc3RhcnRpbmdEYXlzXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJtaW5Nb2RlXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgc21hbGxlc3QgdW5pdCBvZiB0aW1lIHZpZXcgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIuXCI+TWluaW11bSBNb2RlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJtaW5Nb2RlXCIgbmFtZT1cIm1pbk1vZGVcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5kYXRlUGlja2VyLm1pbk1vZGVcIiBuZy1vcHRpb25zPVwibW9kZS5uYW1lIGFzIG1vZGUubGFiZWwgZm9yIG1vZGUgaW4gbW9kZXNcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cIm1heE1vZGVcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBsYXJnZXN0IHVuaXQgb2YgdGltZSB2aWV3IHRvIGRpc3BsYXkgaW4gdGhlIGRhdGUgcGlja2VyLlwiPk1heGltdW0gTW9kZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwibWF4TW9kZVwiIG5hbWU9XCJtYXhNb2RlXCIgbmctbW9kZWw9XCJjb21wb25lbnQuZGF0ZVBpY2tlci5tYXhNb2RlXCIgbmctb3B0aW9ucz1cIm1vZGUubmFtZSBhcyBtb2RlLmxhYmVsIGZvciBtb2RlIGluIG1vZGVzXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRhdGVQaWNrZXIueWVhclJhbmdlXCIgbGFiZWw9XCJOdW1iZXIgb2YgWWVhcnMgRGlzcGxheWVkXCIgcGxhY2Vob2xkZXI9XCJZZWFyIFJhbmdlXCIgdGl0bGU9XCJUaGUgbnVtYmVyIG9mIHllYXJzIHRvIGRpc3BsYXkgaW4gdGhlIHllYXJzIHZpZXcuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGF0ZVBpY2tlci5zaG93V2Vla3NcIiB0eXBlPVwiY2hlY2tib3hcIiBsYWJlbD1cIlNob3cgV2VlayBOdW1iZXJzXCIgdGl0bGU9XCJEaXNwbGF5cyB0aGUgd2VlayBudW1iZXJzIG9uIHRoZSBkYXRlIHBpY2tlci5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9kYXRldGltZS90aW1lLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIkVuYWJsZXMgdGltZSBpbnB1dCBmb3IgdGhpcyBmaWVsZC5cIj4nICtcbiAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImVuYWJsZVRpbWVcIiBuYW1lPVwiZW5hYmxlVGltZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmVuYWJsZVRpbWVcIiBuZy1jaGVja2VkPVwiY29tcG9uZW50LmVuYWJsZVRpbWVcIiBuZy1jaGFuZ2U9XCJzZXRGb3JtYXQoKVwiPiBFbmFibGUgVGltZSBJbnB1dCcgK1xuICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRpbWVQaWNrZXIuaG91clN0ZXBcIiB0eXBlPVwibnVtYmVyXCIgbGFiZWw9XCJIb3VyIFN0ZXAgU2l6ZVwiIHRpdGxlPVwiVGhlIG51bWJlciBvZiBob3VycyB0byBpbmNyZW1lbnQvZGVjcmVtZW50IGluIHRoZSB0aW1lIHBpY2tlci5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGltZVBpY2tlci5taW51dGVTdGVwXCIgdHlwZT1cIm51bWJlclwiIGxhYmVsPVwiTWludXRlIFN0ZXAgU2l6ZVwiIHRpdGxlPVwiVGhlIG51bWJlciBvZiBtaW51dGVzIHRvIGluY3JlbWVudC9kZWNyZW1lbnQgaW4gdGhlIHRpbWUgcGlja2VyLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0aW1lUGlja2VyLnNob3dNZXJpZGlhblwiIHR5cGU9XCJjaGVja2JveFwiIGxhYmVsPVwiMTIgSG91ciBUaW1lIChBTS9QTSlcIiB0aXRsZT1cIkRpc3BsYXkgdGltZSBpbiAxMiBob3VyIHRpbWUgd2l0aCBBTS9QTS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGltZVBpY2tlci5yZWFkb25seUlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgbGFiZWw9XCJSZWFkLU9ubHkgSW5wdXRcIiB0aXRsZT1cIk1ha2VzIHRoZSB0aW1lIHBpY2tlciBpbnB1dCBib3hlcyByZWFkLW9ubHkuIFRoZSB0aW1lIGNhbiBvbmx5IGJlIGNoYW5nZWQgYnkgdGhlIGluY3JlbWVudC9kZWNyZW1lbnQgYnV0dG9ucy5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9kYXRldGltZS92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj48L2Zvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2VtYWlsJywge1xuICAgICAgICBpY29uOiAnZmEgZmEtYXQnLFxuICAgICAgICB2aWV3czogZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLiRnZXQoKS5jb21wb25lbnRzLnRleHRmaWVsZC52aWV3cyxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNlbWFpbCdcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcignZmllbGRzZXQnLCB7XG4gICAgICAgIGZidGVtcGxhdGU6ICdmb3JtaW8vZm9ybWJ1aWxkZXIvZmllbGRzZXQuaHRtbCcsXG4gICAgICAgIGljb246ICdmYSBmYS10aC1sYXJnZScsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9maWVsZHNldC9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNmaWVsZHNldCcsXG4gICAgICAgIGtlZXBDaGlsZHJlbk9uUmVtb3ZlOiB0cnVlLFxuICAgICAgICBub0RuZE92ZXJsYXk6IHRydWUsXG4gICAgICAgIGNvbmZpcm1SZW1vdmU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2ZpZWxkc2V0Lmh0bWwnLFxuICAgICAgICAnPGZpZWxkc2V0PicgK1xuICAgICAgICAgICc8bGVnZW5kIG5nLWlmPVwiY29tcG9uZW50LmxlZ2VuZFwiPnt7IGNvbXBvbmVudC5sZWdlbmQgfX08L2xlZ2VuZD4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cImNvbXBvbmVudFwiIGZvcm09XCJmb3JtXCIgZm9ybWlvPVwiZm9ybWlvXCI+PC9mb3JtLWJ1aWxkZXItbGlzdD4nICtcbiAgICAgICAgJzwvZmllbGRzZXQ+J1xuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2ZpZWxkc2V0L2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsZWdlbmRcIiBsYWJlbD1cIkxlZ2VuZFwiIHBsYWNlaG9sZGVyPVwiRmllbGRTZXQgTGVnZW5kXCIgdGl0bGU9XCJUaGUgbGVnZW5kIHRleHQgdG8gYXBwZWFyIGFib3ZlIHRoaXMgZmllbGRzZXQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKFxuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyXG4gICAgKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2ZpbGUnLCB7XG4gICAgICAgIG9uRWRpdDogZnVuY3Rpb24oJHNjb3BlLCBjb21wb25lbnQsIEZvcm1pbywgRm9ybWlvUGx1Z2lucykge1xuICAgICAgICAgIC8vIFB1bGwgb3V0IHRpdGxlIGFuZCBuYW1lIGZyb20gdGhlIGxpc3Qgb2Ygc3RvcmFnZSBwbHVnaW5zLlxuICAgICAgICAgICRzY29wZS5zdG9yYWdlID0gXy5tYXAobmV3IEZvcm1pb1BsdWdpbnMoJ3N0b3JhZ2UnKSwgZnVuY3Rpb24oc3RvcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIF8ucGljayhzdG9yYWdlLCBbJ3RpdGxlJywgJ25hbWUnXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGljb246ICdmYSBmYS1maWxlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2ZpbGUvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9maWxlL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jZmlsZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9maWxlL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwic3RvcmFnZVwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiV2hpY2ggc3RvcmFnZSB0byBzYXZlIHRoZSBmaWxlcyBpbi5cIj5TdG9yYWdlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJzdG9yYWdlXCIgbmFtZT1cInN0b3JhZ2VcIiBuZy1vcHRpb25zPVwic3RvcmUubmFtZSBhcyBzdG9yZS50aXRsZSBmb3Igc3RvcmUgaW4gc3RvcmFnZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LnN0b3JhZ2VcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidXJsXCIgbmctc2hvdz1cImNvbXBvbmVudC5zdG9yYWdlID09PSBcXCd1cmxcXCdcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cIm11bHRpcGxlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2ZpbGUvdmFsaWRhdGUuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5yZXF1aXJlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJmaWxlUGF0dGVyblwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcignaGlkZGVuJywge1xuICAgICAgICBmYnRlbXBsYXRlOiAnZm9ybWlvL2Zvcm1idWlsZGVyL2hpZGRlbi5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXVzZXItc2VjcmV0JyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2hpZGRlbi9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2hpZGRlbi92YWxpZGF0aW9uLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNoaWRkZW4nXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9oaWRkZW4uaHRtbCcsICc8c3BhbiBjbGFzcz1cImhpZGRlbi1lbGVtZW50LXRleHRcIj57eyBjb21wb25lbnQubGFiZWwgfX08L3NwYW4+Jyk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9oaWRkZW4vZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCIgbGFiZWw9XCJOYW1lXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgbmFtZSBmb3IgdGhpcyBoaWRkZW4gZmllbGRcIiB0aXRsZT1cIlRoZSBuYW1lIGZvciB0aGlzIGZpZWxkLiBJdCBpcyBvbmx5IHVzZWQgZm9yIGFkbWluaXN0cmF0aXZlIHB1cnBvc2VzIHN1Y2ggYXMgZ2VuZXJhdGluZyB0aGUgYXV0b21hdGljIHByb3BlcnR5IG5hbWUgaW4gdGhlIEFQSSB0YWIgKHdoaWNoIG1heSBiZSBjaGFuZ2VkIG1hbnVhbGx5KS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvaGlkZGVuL3ZhbGlkYXRpb24uaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ1bmlxdWVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2h0bWxlbGVtZW50Jywge1xuICAgICAgICBmYnRlbXBsYXRlOiAnZm9ybWlvL2Zvcm1idWlsZGVyL2h0bWxlbGVtZW50Lmh0bWwnLFxuICAgICAgICBpY29uOiAnZmEgZmEtY29kZScsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9odG1sZWxlbWVudC9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2h0bWwtZWxlbWVudC1jb21wb25lbnQnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9odG1sZWxlbWVudC5odG1sJyxcbiAgICAgICAgJzxmb3JtaW8taHRtbC1lbGVtZW50IGNvbXBvbmVudD1cImNvbXBvbmVudFwiPjwvZGl2PidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9odG1sZWxlbWVudC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFnXCIgbGFiZWw9XCJIVE1MIFRhZ1wiIHBsYWNlaG9sZGVyPVwiSFRNTCBFbGVtZW50IFRhZ1wiIHRpdGxlPVwiVGhlIHRhZyBvZiB0aGlzIEhUTUwgZWxlbWVudC5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY2xhc3NOYW1lXCIgbGFiZWw9XCJDU1MgQ2xhc3NcIiBwbGFjZWhvbGRlcj1cIkNTUyBDbGFzc1wiIHRpdGxlPVwiVGhlIENTUyBjbGFzcyBmb3IgdGhpcyBIVE1MIGVsZW1lbnQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8dmFsdWUtYnVpbGRlciAnICtcbiAgICAgICAgICAgICdkYXRhPVwiY29tcG9uZW50LmF0dHJzXCIgJyArXG4gICAgICAgICAgICAnbGFiZWw9XCJBdHRyaWJ1dGVzXCIgJyArXG4gICAgICAgICAgICAndG9vbHRpcC10ZXh0PVwiVGhlIGF0dHJpYnV0ZXMgZm9yIHRoaXMgSFRNTCBlbGVtZW50LiBPbmx5IHNhZmUgYXR0cmlidXRlcyBhcmUgYWxsb3dlZCwgc3VjaCBhcyBzcmMsIGhyZWYsIGFuZCB0aXRsZS5cIiAnICtcbiAgICAgICAgICAgICd2YWx1ZS1wcm9wZXJ0eT1cImF0dHJcIiAnICtcbiAgICAgICAgICAgICdsYWJlbC1wcm9wZXJ0eT1cInZhbHVlXCIgJyArXG4gICAgICAgICAgICAndmFsdWUtbGFiZWw9XCJBdHRyaWJ1dGVcIiAnICtcbiAgICAgICAgICAgICdsYWJlbC1sYWJlbD1cIlZhbHVlXCIgJyArXG4gICAgICAgICAgICAnbm8tYXV0b2NvbXBsZXRlLXZhbHVlPVwidHJ1ZVwiICcgK1xuICAgICAgICAgICAgJz48L3ZhbHVlLWJ1aWxkZXI+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cImNvbnRlbnRcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBjb250ZW50IG9mIHRoaXMgSFRNTCBlbGVtZW50LlwiPkNvbnRlbnQ8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY29udGVudFwiIG5hbWU9XCJjb250ZW50XCIgbmctbW9kZWw9XCJjb21wb25lbnQuY29udGVudFwiIHBsYWNlaG9sZGVyPVwiSFRNTCBDb250ZW50XCIgcm93cz1cIjNcIj57eyBjb21wb25lbnQuY29udGVudCB9fTwvdGV4dGFyZWE+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnbmdGb3JtQnVpbGRlcicpO1xuXG4vLyBCYXNpY1xucmVxdWlyZSgnLi9jb21wb25lbnRzJykoYXBwKTtcbnJlcXVpcmUoJy4vdGV4dGZpZWxkJykoYXBwKTtcbnJlcXVpcmUoJy4vbnVtYmVyJykoYXBwKTtcbnJlcXVpcmUoJy4vcGFzc3dvcmQnKShhcHApO1xucmVxdWlyZSgnLi90ZXh0YXJlYScpKGFwcCk7XG5yZXF1aXJlKCcuL2NoZWNrYm94JykoYXBwKTtcbnJlcXVpcmUoJy4vc2VsZWN0Ym94ZXMnKShhcHApO1xucmVxdWlyZSgnLi9zZWxlY3QnKShhcHApO1xucmVxdWlyZSgnLi9yYWRpbycpKGFwcCk7XG5yZXF1aXJlKCcuL2h0bWxlbGVtZW50JykoYXBwKTtcbnJlcXVpcmUoJy4vY29udGVudCcpKGFwcCk7XG5yZXF1aXJlKCcuL2J1dHRvbicpKGFwcCk7XG5cbi8vIFNwZWNpYWxcbnJlcXVpcmUoJy4vZW1haWwnKShhcHApO1xucmVxdWlyZSgnLi9waG9uZW51bWJlcicpKGFwcCk7XG5yZXF1aXJlKCcuL2FkZHJlc3MnKShhcHApO1xucmVxdWlyZSgnLi9kYXRldGltZScpKGFwcCk7XG5yZXF1aXJlKCcuL2hpZGRlbicpKGFwcCk7XG5yZXF1aXJlKCcuL3Jlc291cmNlJykoYXBwKTtcbnJlcXVpcmUoJy4vZmlsZScpKGFwcCk7XG5yZXF1aXJlKCcuL3NpZ25hdHVyZScpKGFwcCk7XG5yZXF1aXJlKCcuL2N1c3RvbScpKGFwcCk7XG5cbi8vIExheW91dFxucmVxdWlyZSgnLi9jb2x1bW5zJykoYXBwKTtcbnJlcXVpcmUoJy4vZmllbGRzZXQnKShhcHApO1xucmVxdWlyZSgnLi9jb250YWluZXInKShhcHApO1xucmVxdWlyZSgnLi9kYXRhZ3JpZCcpKGFwcCk7XG5yZXF1aXJlKCcuL3BhZ2UnKShhcHApO1xucmVxdWlyZSgnLi9wYW5lbCcpKGFwcCk7XG5yZXF1aXJlKCcuL3RhYmxlJykoYXBwKTtcbnJlcXVpcmUoJy4vd2VsbCcpKGFwcCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdudW1iZXInLCB7XG4gICAgICAgIGljb246ICdmYSBmYS1oYXNodGFnJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL251bWJlci9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL251bWJlci92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI251bWJlcidcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9udW1iZXIvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBsYWNlaG9sZGVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnN0ZXBcIiBsYWJlbD1cIkluY3JlbWVudCAoU3RlcClcIiBwbGFjZWhvbGRlcj1cIkVudGVyIGhvdyBtdWNoIHRvIGluY3JlbWVudCBwZXIgc3RlcCAob3IgcHJlY2lzaW9uKS5cIiB0aXRsZT1cIlRoZSBhbW91bnQgdG8gaW5jcmVtZW50L2RlY3JlbWVudCBmb3IgZWFjaCBzdGVwLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcmVmaXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3VmZml4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cIm11bHRpcGxlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIEFQSSBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL251bWJlci92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLm1pblwiIHR5cGU9XCJudW1iZXJcIiBsYWJlbD1cIk1pbmltdW0gVmFsdWVcIiBwbGFjZWhvbGRlcj1cIk1pbmltdW0gVmFsdWVcIiB0aXRsZT1cIlRoZSBtaW5pbXVtIHZhbHVlIHRoaXMgZmllbGQgbXVzdCBoYXZlIGJlZm9yZSB0aGUgZm9ybSBjYW4gYmUgc3VibWl0dGVkLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5tYXhcIiB0eXBlPVwibnVtYmVyXCIgbGFiZWw9XCJNYXhpbXVtIFZhbHVlXCIgcGxhY2Vob2xkZXI9XCJNYXhpbXVtIFZhbHVlXCIgdGl0bGU9XCJUaGUgbWF4aW11bSB2YWx1ZSB0aGlzIGZpZWxkIG11c3QgaGF2ZSBiZWZvcmUgdGhlIGZvcm0gY2FuIGJlIHN1Ym1pdHRlZC5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPjwvZm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcigncGFnZScsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9wYWdlLmh0bWwnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9wYWdlLmh0bWwnLFxuICAgICAgICAnPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cImNvbXBvbmVudFwiIGZvcm09XCJmb3JtXCIgZm9ybWlvPVwiZm9ybWlvXCI+PC9mb3JtLWJ1aWxkZXItbGlzdD4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICAnRk9STV9PUFRJT05TJyxcbiAgICBmdW5jdGlvbihcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcixcbiAgICAgIEZPUk1fT1BUSU9OU1xuICAgICkge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdwYW5lbCcsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9wYW5lbC5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWxpc3QtYWx0JyxcbiAgICAgICAgb25FZGl0OiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAkc2NvcGUudGhlbWVzID0gRk9STV9PUFRJT05TLnRoZW1lcztcbiAgICAgICAgfSxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3BhbmVsL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI3BhbmVscycsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvcGFuZWwuaHRtbCcsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwte3sgY29tcG9uZW50LnRoZW1lIH19XCI+JyArXG4gICAgICAgICAgJzxkaXYgbmctaWY9XCJjb21wb25lbnQudGl0bGVcIiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj48aDMgY2xhc3M9XCJwYW5lbC10aXRsZVwiPnt7IGNvbXBvbmVudC50aXRsZSB9fTwvaDM+PC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+JyArXG4gICAgICAgICAgICAnPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cImNvbXBvbmVudFwiIGZvcm09XCJmb3JtXCIgZm9ybWlvPVwiZm9ybWlvXCI+PC9mb3JtLWJ1aWxkZXItbGlzdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvcGFuZWwvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRpdGxlXCIgbGFiZWw9XCJUaXRsZVwiIHBsYWNlaG9sZGVyPVwiUGFuZWwgVGl0bGVcIiB0aXRsZT1cIlRoZSB0aXRsZSB0ZXh0IHRoYXQgYXBwZWFycyBpbiB0aGUgaGVhZGVyIG9mIHRoaXMgcGFuZWwuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJ0aGVtZVwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIGNvbG9yIHRoZW1lIG9mIHRoaXMgcGFuZWwuXCI+VGhlbWU8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInRoZW1lXCIgbmFtZT1cInRoZW1lXCIgbmctb3B0aW9ucz1cInRoZW1lLm5hbWUgYXMgdGhlbWUudGl0bGUgZm9yIHRoZW1lIGluIHRoZW1lc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LnRoZW1lXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdwYXNzd29yZCcsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWFzdGVyaXNrJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3Bhc3N3b3JkL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvdGV4dGZpZWxkL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jcGFzc3dvcmQnLFxuICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3Bhc3N3b3JkLmh0bWwnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKFxuICAgICAgJHRlbXBsYXRlQ2FjaGVcbiAgICApIHtcbiAgICAgIC8vIERpc2FibGUgZHJhZ2dpbmcgb24gcGFzc3dvcmQgaW5wdXRzIGJlY2F1c2UgaXQgYnJlYWtzIGRuZExpc3RzXG4gICAgICB2YXIgdGV4dEZpZWxkVG1wbCA9ICR0ZW1wbGF0ZUNhY2hlLmdldCgnZm9ybWlvL2NvbXBvbmVudHMvdGV4dGZpZWxkLmh0bWwnKTtcbiAgICAgIHZhciBwYXNzd29yZFRtcGwgPSB0ZXh0RmllbGRUbXBsLnJlcGxhY2UoXG4gICAgICAgIC88aW5wdXQgdHlwZT1cInt7IGNvbXBvbmVudC5pbnB1dFR5cGUgfX1cIiAvZyxcbiAgICAgICAgJzxpbnB1dCB0eXBlPVwie3sgY29tcG9uZW50LmlucHV0VHlwZSB9fVwiIGRuZC1ub2RyYWcgJ1xuICAgICAgKTtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvcGFzc3dvcmQuaHRtbCcsIHBhc3N3b3JkVG1wbCk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9wYXNzd29yZC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJlZml4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInN1ZmZpeFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJpbmRleFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcm90ZWN0ZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGVyc2lzdGVudFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJsZVZpZXdcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3Bob25lTnVtYmVyJywge1xuICAgICAgICBpY29uOiAnZmEgZmEtcGhvbmUtc3F1YXJlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3Bob25lTnVtYmVyL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvcGhvbmVOdW1iZXIvdmFsaWRhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNwaG9uZW51bWJlcidcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9waG9uZU51bWJlci9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW5wdXRNYXNrXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByZWZpeFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdWZmaXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgVmFsaWRhdGlvbiBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3Bob25lTnVtYmVyL3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidW5pcXVlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdyYWRpbycsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWxpc3QtdWwnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvcmFkaW8vZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9yYWRpby92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI3JhZGlvJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3JhZGlvL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPHZhbHVlLWJ1aWxkZXIgZGF0YT1cImNvbXBvbmVudC52YWx1ZXNcIiBsYWJlbD1cIlZhbHVlc1wiIHRvb2x0aXAtdGV4dD1cIlRoZSByYWRpbyBidXR0b24gdmFsdWVzIHRoYXQgY2FuIGJlIHBpY2tlZCBmb3IgdGhpcyBmaWVsZC4gVmFsdWVzIGFyZSB0ZXh0IHN1Ym1pdHRlZCB3aXRoIHRoZSBmb3JtIGRhdGEuIExhYmVscyBhcmUgdGV4dCB0aGF0IGFwcGVhcnMgbmV4dCB0byB0aGUgcmFkaW8gYnV0dG9ucyBvbiB0aGUgZm9ybS5cIj48L3ZhbHVlLWJ1aWxkZXI+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW5saW5lXCIgdHlwZT1cImNoZWNrYm94XCIgbGFiZWw9XCJJbmxpbmUgTGF5b3V0XCIgdGl0bGU9XCJEaXNwbGF5cyB0aGUgcmFkaW8gYnV0dG9ucyBob3Jpem9udGFsbHkuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgICAgLy8gQ3JlYXRlIHRoZSBBUEkgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9yYWRpby92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj48L2Zvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3Jlc291cmNlJywge1xuICAgICAgICBvbkVkaXQ6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICRzY29wZS5yZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAkc2NvcGUuZm9ybWlvLmxvYWRGb3Jtcyh7cGFyYW1zOiB7dHlwZTogJ3Jlc291cmNlJ319KS50aGVuKGZ1bmN0aW9uKHJlc291cmNlcykge1xuICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IHJlc291cmNlcztcbiAgICAgICAgICAgIGlmICghJHNjb3BlLmNvbXBvbmVudC5yZXNvdXJjZSkge1xuICAgICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LnJlc291cmNlID0gcmVzb3VyY2VzWzBdLl9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWZpbGVzLW8nLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvcmVzb3VyY2UvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9yZXNvdXJjZS92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI3Jlc291cmNlJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3Jlc291cmNlL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwbGFjZWhvbGRlclwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwicGxhY2Vob2xkZXJcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSByZXNvdXJjZSB0byBiZSB1c2VkIHdpdGggdGhpcyBmaWVsZC5cIj5SZXNvdXJjZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwicmVzb3VyY2VcIiBuYW1lPVwicmVzb3VyY2VcIiBuZy1vcHRpb25zPVwidmFsdWUuX2lkIGFzIHZhbHVlLnRpdGxlIGZvciB2YWx1ZSBpbiByZXNvdXJjZXNcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5yZXNvdXJjZVwiPjwvc2VsZWN0PicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwicGxhY2Vob2xkZXJcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBwcm9wZXJ0aWVzIG9uIHRoZSByZXNvdXJjZSB0byByZXR1cm4gYXMgcGFydCBvZiB0aGUgb3B0aW9ucy4gU2VwYXJhdGUgcHJvcGVydHkgbmFtZXMgYnkgY29tbWFzLiBJZiBsZWZ0IGJsYW5rLCBhbGwgcHJvcGVydGllcyB3aWxsIGJlIHJldHVybmVkLlwiPlNlbGVjdCBGaWVsZHM8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJzZWxlY3RGaWVsZHNcIiBuYW1lPVwic2VsZWN0RmllbGRzXCIgbmctbW9kZWw9XCJjb21wb25lbnQuc2VsZWN0RmllbGRzXCIgcGxhY2Vob2xkZXI9XCJDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBmaWVsZHMgdG8gc2VsZWN0LlwiIHZhbHVlPVwie3sgY29tcG9uZW50LnNlbGVjdEZpZWxkcyB9fVwiPicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwicGxhY2Vob2xkZXJcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIkEgbGlzdCBvZiBzZWFyY2ggZmlsdGVycyBiYXNlZCBvbiB0aGUgZmllbGRzIG9mIHRoZSByZXNvdXJjZS4gU2VlIHRoZSA8YSB0YXJnZXQ9XFwnX2JsYW5rXFwnIGhyZWY9XFwnaHR0cHM6Ly9naXRodWIuY29tL3RyYXZpc3QvcmVzb3VyY2VqcyNmaWx0ZXJpbmctdGhlLXJlc3VsdHNcXCc+UmVzb3VyY2UuanMgZG9jdW1lbnRhdGlvbjwvYT4gZm9yIHRoZSBmb3JtYXQgb2YgdGhlc2UgZmlsdGVycy5cIj5TZWFyY2ggRmllbGRzPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwic2VhcmNoRmllbGRzXCIgbmFtZT1cInNlYXJjaEZpZWxkc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LnNlYXJjaEZpZWxkc1wiIG5nLWxpc3QgcGxhY2Vob2xkZXI9XCJUaGUgZmllbGRzIHRvIHF1ZXJ5IG9uIHRoZSBzZXJ2ZXJcIiB2YWx1ZT1cInt7IGNvbXBvbmVudC5zZWFyY2hGaWVsZHMgfX1cIj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInBsYWNlaG9sZGVyXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgSFRNTCB0ZW1wbGF0ZSBmb3IgdGhlIHJlc3VsdCBkYXRhIGl0ZW1zLlwiPkl0ZW0gVGVtcGxhdGU8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwidGVtcGxhdGVcIiBuYW1lPVwidGVtcGxhdGVcIiBuZy1tb2RlbD1cImNvbXBvbmVudC50ZW1wbGF0ZVwiIHJvd3M9XCIzXCI+e3sgY29tcG9uZW50LnRlbXBsYXRlIH19PC90ZXh0YXJlYT4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIiBsYWJlbD1cIkFsbG93IE11bHRpcGxlIFJlc291cmNlc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJsZVZpZXdcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBBUEkgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9yZXNvdXJjZS92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdzZWxlY3QnLCB7XG4gICAgICAgIGljb246ICdmYSBmYS10aC1saXN0JyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdC9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdC92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBvbkVkaXQ6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICRzY29wZS5kYXRhU291cmNlcyA9IHtcbiAgICAgICAgICAgIHZhbHVlczogJ1ZhbHVlcycsXG4gICAgICAgICAgICBqc29uOiAnUmF3IEpTT04nLFxuICAgICAgICAgICAgdXJsOiAnVVJMJ1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jc2VsZWN0J1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cImRhdGFTcmNcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBzb3VyY2UgdG8gdXNlIGZvciB0aGUgc2VsZWN0IGRhdGEuIFZhbHVlcyBsZXRzIHlvdSBwcm92aWRlIHlvdXIgb3duIHZhbHVlcyBhbmQgbGFiZWxzLiBKU09OIGxldHMgeW91IHByb3ZpZGUgcmF3IEpTT04gZGF0YS4gVVJMIGxldHMgeW91IHByb3ZpZGUgYSBVUkwgdG8gcmV0cmlldmUgdGhlIEpTT04gZGF0YSBmcm9tLlwiPkRhdGEgU291cmNlIFR5cGU8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImRhdGFTcmNcIiBuYW1lPVwiZGF0YVNyY1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LmRhdGFTcmNcIiBuZy1vcHRpb25zPVwidmFsdWUgYXMgbGFiZWwgZm9yICh2YWx1ZSwgbGFiZWwpIGluIGRhdGFTb3VyY2VzXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8bmctc3dpdGNoIG9uPVwiY29tcG9uZW50LmRhdGFTcmNcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIG5nLXN3aXRjaC13aGVuPVwianNvblwiPicgK1xuICAgICAgICAgICAgICAnPGxhYmVsIGZvcj1cImRhdGEuanNvblwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiQSByYXcgSlNPTiBhcnJheSB0byB1c2UgYXMgYSBkYXRhIHNvdXJjZS5cIj5EYXRhIFNvdXJjZSBSYXcgSlNPTjwvbGFiZWw+JyArXG4gICAgICAgICAgICAgICc8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImRhdGEuanNvblwiIG5hbWU9XCJkYXRhLmpzb25cIiBuZy1tb2RlbD1cImNvbXBvbmVudC5kYXRhLmpzb25cIiBwbGFjZWhvbGRlcj1cIlJhdyBKU09OIEFycmF5XCIgcm93cz1cIjNcIj57eyBjb21wb25lbnQuZGF0YS5qc29uIH19PC90ZXh0YXJlYT4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBuZy1zd2l0Y2gtd2hlbj1cInVybFwiIHByb3BlcnR5PVwiZGF0YS51cmxcIiBsYWJlbD1cIkRhdGEgU291cmNlIFVSTFwiIHBsYWNlaG9sZGVyPVwiRGF0YSBTb3VyY2UgVVJMXCIgdGl0bGU9XCJBIFVSTCB0aGF0IHJldHVybnMgYSBKU09OIGFycmF5IHRvIHVzZSBhcyB0aGUgZGF0YSBzb3VyY2UuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICAgJzx2YWx1ZS1idWlsZGVyIG5nLXN3aXRjaC13aGVuPVwidmFsdWVzXCIgZGF0YT1cImNvbXBvbmVudC5kYXRhLnZhbHVlc1wiIGxhYmVsPVwiRGF0YSBTb3VyY2UgVmFsdWVzXCIgdG9vbHRpcC10ZXh0PVwiVmFsdWVzIHRvIHVzZSBhcyB0aGUgZGF0YSBzb3VyY2UuIExhYmVscyBhcmUgc2hvd24gaW4gdGhlIHNlbGVjdCBmaWVsZC4gVmFsdWVzIGFyZSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMgc2F2ZWQgd2l0aCB0aGUgc3VibWlzc2lvbi5cIj48L3ZhbHVlLWJ1aWxkZXI+JyArXG4gICAgICAgICAgJzwvbmctc3dpdGNoPicgK1xuXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIG5nLWhpZGU9XCJjb21wb25lbnQuZGF0YVNyYyA9PSBcXCd2YWx1ZXNcXCdcIiBwcm9wZXJ0eT1cInZhbHVlUHJvcGVydHlcIiBsYWJlbD1cIlZhbHVlIFByb3BlcnR5XCIgcGxhY2Vob2xkZXI9XCJUaGUgc2VsZWN0ZWQgaXRlbXMgcHJvcGVydHkgdG8gc2F2ZS5cIiB0aXRsZT1cIlRoZSBwcm9wZXJ0eSBvZiBlYWNoIGl0ZW0gaW4gdGhlIGRhdGEgc291cmNlIHRvIHVzZSBhcyB0aGUgc2VsZWN0IHZhbHVlLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgaXRlbSBpdHNlbGYgd2lsbCBiZSB1c2VkLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gbmctc2hvdz1cImNvbXBvbmVudC5kYXRhU3JjID09IFxcJ3VybFxcJ1wiIHByb3BlcnR5PVwic2VhcmNoRmllbGRcIiBsYWJlbD1cIlNlYXJjaCBRdWVyeSBOYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lIG9mIFVSTCBxdWVyeSBwYXJhbWV0ZXJcIiB0aXRsZT1cIlRoZSBuYW1lIG9mIHRoZSBzZWFyY2ggcXVlcnlzdHJpbmcgcGFyYW1ldGVyIHVzZWQgd2hlbiBzZW5kaW5nIGEgcmVxdWVzdCB0byBmaWx0ZXIgcmVzdWx0cyB3aXRoLiBUaGUgc2VydmVyIGF0IHRoZSBVUkwgbXVzdCBoYW5kbGUgdGhpcyBxdWVyeSBwYXJhbWV0ZXIuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIEhUTUwgdGVtcGxhdGUgZm9yIHRoZSByZXN1bHQgZGF0YSBpdGVtcy5cIj5JdGVtIFRlbXBsYXRlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInRlbXBsYXRlXCIgbmFtZT1cInRlbXBsYXRlXCIgbmctbW9kZWw9XCJjb21wb25lbnQudGVtcGxhdGVcIiByb3dzPVwiM1wiPnt7IGNvbXBvbmVudC50ZW1wbGF0ZSB9fTwvdGV4dGFyZWE+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cIm11bHRpcGxlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIEFQSSBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdC92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInVuaXF1ZVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3Rlcignc2VsZWN0Ym94ZXMnLCB7XG4gICAgICAgIGljb246ICdmYSBmYS1wbHVzLXNxdWFyZScsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9zZWxlY3Rib3hlcy9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdGJveGVzL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0Ym94ZXMvYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNzZWxlY3Rib3hlcydcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9zZWxlY3Rib3hlcy9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzx2YWx1ZS1idWlsZGVyIGRhdGE9XCJjb21wb25lbnQudmFsdWVzXCIgbGFiZWw9XCJTZWxlY3QgQm94ZXNcIiB0b29sdGlwLXRleHQ9XCJDaGVja2JveGVzIHRvIGRpc3BsYXkuIExhYmVscyBhcmUgc2hvd24gaW4gdGhlIGZvcm0uIFZhbHVlcyBhcmUgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzIHNhdmVkIHdpdGggdGhlIHN1Ym1pc3Npb24uXCI+PC92YWx1ZS1idWlsZGVyPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImlubGluZVwiIHR5cGU9XCJjaGVja2JveFwiIGxhYmVsPVwiSW5saW5lIExheW91dFwiIHRpdGxlPVwiRGlzcGxheXMgdGhlIGNoZWNrYm94ZXMgaG9yaXpvbnRhbGx5LlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcm90ZWN0ZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGVyc2lzdGVudFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJsZVZpZXdcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBBUEkgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9zZWxlY3Rib3hlcy9hcGkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24ta2V5PjwvZm9ybS1idWlsZGVyLW9wdGlvbi1rZXk+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBBUEkgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9zZWxlY3Rib3hlcy92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj48L2Zvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3NpZ25hdHVyZScsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXBlbmNpbCcsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9zaWduYXR1cmUvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9zaWduYXR1cmUvdmFsaWRhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNzaWduYXR1cmUnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvc2lnbmF0dXJlL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJmb290ZXJcIiBsYWJlbD1cIkZvb3RlciBMYWJlbFwiIHBsYWNlaG9sZGVyPVwiRm9vdGVyIExhYmVsXCIgdGl0bGU9XCJUaGUgZm9vdGVyIHRleHQgdGhhdCBhcHBlYXJzIGJlbG93IHRoZSBzaWduYXR1cmUgYXJlYS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwid2lkdGhcIiBsYWJlbD1cIldpZHRoXCIgcGxhY2Vob2xkZXI9XCJXaWR0aFwiIHRpdGxlPVwiVGhlIHdpZHRoIG9mIHRoZSBzaWduYXR1cmUgYXJlYS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaGVpZ2h0XCIgbGFiZWw9XCJIZWlnaHRcIiBwbGFjZWhvbGRlcj1cIkhlaWdodFwiIHRpdGxlPVwiVGhlIGhlaWdodCBvZiB0aGUgc2lnbmF0dXJlIGFyZWEuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImJhY2tncm91bmRDb2xvclwiIGxhYmVsPVwiQmFja2dyb3VuZCBDb2xvclwiIHBsYWNlaG9sZGVyPVwiQmFja2dyb3VuZCBDb2xvclwiIHRpdGxlPVwiVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIHNpZ25hdHVyZSBhcmVhLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZW5Db2xvclwiIGxhYmVsPVwiUGVuIENvbG9yXCIgcGxhY2Vob2xkZXI9XCJQZW4gQ29sb3JcIiB0aXRsZT1cIlRoZSBpbmsgY29sb3IgZm9yIHRoZSBzaWduYXR1cmUgYXJlYS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgVmFsaWRhdGlvbiBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3NpZ25hdHVyZS92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCd0YWJsZScsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci90YWJsZS5odG1sJyxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyN0YWJsZScsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZSxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXRhYmxlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3RhYmxlL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICB2YXIgdGFibGVDbGFzc2VzID0gXCJ7J3RhYmxlLXN0cmlwZWQnOiBjb21wb25lbnQuc3RyaXBlZCwgXCI7XG4gICAgICB0YWJsZUNsYXNzZXMgKz0gXCIndGFibGUtYm9yZGVyZWQnOiBjb21wb25lbnQuYm9yZGVyZWQsIFwiO1xuICAgICAgdGFibGVDbGFzc2VzICs9IFwiJ3RhYmxlLWhvdmVyJzogY29tcG9uZW50LmhvdmVyLCBcIjtcbiAgICAgIHRhYmxlQ2xhc3NlcyArPSBcIid0YWJsZS1jb25kZW5zZWQnOiBjb21wb25lbnQuY29uZGVuc2VkfVwiO1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvdGFibGUuaHRtbCcsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFibGUtcmVzcG9uc2l2ZVwiPicgK1xuICAgICAgICAgICc8dGFibGUgbmctY2xhc3M9XCInICsgdGFibGVDbGFzc2VzICsgJ1wiIGNsYXNzPVwidGFibGVcIj4nICtcbiAgICAgICAgICAgICc8dGhlYWQgbmctaWY9XCJjb21wb25lbnQuaGVhZGVyLmxlbmd0aFwiPjx0cj4nICtcbiAgICAgICAgICAgICAgJzx0aCBuZy1yZXBlYXQ9XCJoZWFkZXIgaW4gY29tcG9uZW50LmhlYWRlclwiPnt7IGhlYWRlciB9fTwvdGg+JyArXG4gICAgICAgICAgICAnPC90cj48L3RoZWFkPicgK1xuICAgICAgICAgICAgJzx0Ym9keT4nICtcbiAgICAgICAgICAgICAgJzx0ciBuZy1yZXBlYXQ9XCJyb3cgaW4gY29tcG9uZW50LnJvd3NcIj4nICtcbiAgICAgICAgICAgICAgICAnPHRkIG5nLXJlcGVhdD1cImNvbXBvbmVudCBpbiByb3dcIj4nICtcbiAgICAgICAgICAgICAgICAgICc8Zm9ybS1idWlsZGVyLWxpc3QgY29tcG9uZW50PVwiY29tcG9uZW50XCIgZm9ybT1cImZvcm1cIiBmb3JtaW89XCJmb3JtaW9cIj48L2Zvcm0tYnVpbGRlci1saXN0PicgK1xuICAgICAgICAgICAgICAgICc8L3RkPicgK1xuICAgICAgICAgICAgICAnPC90cj4nICtcbiAgICAgICAgICAgICc8L3Rib2R5PicgK1xuICAgICAgICAgICc8L3RhYmxlPicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICAgKTtcblxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy90YWJsZS9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItdGFibGU+PC9mb3JtLWJ1aWxkZXItdGFibGU+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3RyaXBlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJib3JkZXJlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJob3ZlclwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjb25kZW5zZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3RleHRhcmVhJywge1xuICAgICAgICBpY29uOiAnZmEgZmEtZm9udCcsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy90ZXh0ZmllbGQvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy90ZXh0ZmllbGQvdmFsaWRhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyN0ZXh0YXJlYSdcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcigndGV4dGZpZWxkJywge1xuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvdGV4dGZpZWxkL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvdGV4dGZpZWxkL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jdGV4dGZpZWxkJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3RleHRmaWVsZC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW5wdXRNYXNrXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByZWZpeFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdWZmaXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvdGV4dGZpZWxkL3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidW5pcXVlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLm1pbkxlbmd0aFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5tYXhMZW5ndGhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucGF0dGVyblwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCd3ZWxsJywge1xuICAgICAgICBmYnRlbXBsYXRlOiAnZm9ybWlvL2Zvcm1idWlsZGVyL3dlbGwuaHRtbCcsXG4gICAgICAgIGljb246ICdmYSBmYS1zcXVhcmUtbycsXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jd2VsbCcsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvd2VsbC5odG1sJyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCI+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItbGlzdCBjb21wb25lbnQ9XCJjb21wb25lbnRcIiBmb3JtPVwiZm9ybVwiIGZvcm1pbz1cImZvcm1pb1wiPjwvZm9ybS1idWlsZGVyLWxpc3Q+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAgKiBUaGVzZSBhcmUgY29tcG9uZW50IG9wdGlvbnMgdGhhdCBjYW4gYmUgcmV1c2VkXG4gICogd2l0aCB0aGUgYnVpbGRlci1vcHRpb24gZGlyZWN0aXZlXG4gICogVmFsaWQgcHJvcGVydGllczogbGFiZWwsIHBsYWNlaG9sZGVyLCB0b29sdGlwLCB0eXBlXG4gICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsYWJlbDoge1xuICAgICAgbGFiZWw6ICdMYWJlbCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ0ZpZWxkIExhYmVsJyxcbiAgICAgIHRvb2x0aXA6ICdUaGUgbGFiZWwgZm9yIHRoaXMgZmllbGQgdGhhdCB3aWxsIGFwcGVhciBuZXh0IHRvIGl0LidcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICBsYWJlbDogJ1BsYWNlaG9sZGVyJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnUGxhY2Vob2xkZXInLFxuICAgICAgdG9vbHRpcDogJ1RoZSBwbGFjZWhvbGRlciB0ZXh0IHRoYXQgd2lsbCBhcHBlYXIgd2hlbiB0aGlzIGZpZWxkIGlzIGVtcHR5LidcbiAgICB9LFxuICAgIGlucHV0TWFzazoge1xuICAgICAgbGFiZWw6ICdJbnB1dCBNYXNrJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnSW5wdXQgTWFzaycsXG4gICAgICB0b29sdGlwOiAnQW4gaW5wdXQgbWFzayBoZWxwcyB0aGUgdXNlciB3aXRoIGlucHV0IGJ5IGVuc3VyaW5nIGEgcHJlZGVmaW5lZCBmb3JtYXQuPGJyPjxicj45OiBudW1lcmljPGJyPmE6IGFscGhhYmV0aWNhbDxicj4qOiBhbHBoYW51bWVyaWM8YnI+PGJyPkV4YW1wbGUgdGVsZXBob25lIG1hc2s6ICg5OTkpIDk5OS05OTk5PGJyPjxicj5TZWUgdGhlIDxhIHRhcmdldD1cXCdfYmxhbmtcXCcgaHJlZj1cXCdodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL2pxdWVyeS5pbnB1dG1hc2tcXCc+anF1ZXJ5LmlucHV0bWFzayBkb2N1bWVudGF0aW9uPC9hPiBmb3IgbW9yZSBpbmZvcm1hdGlvbi48L2E+J1xuICAgIH0sXG4gICAgdGFibGVWaWV3OiB7XG4gICAgICBsYWJlbDogJ1RhYmxlIFZpZXcnLFxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgIHRvb2x0aXA6ICdTaG93cyB0aGlzIHZhbHVlIHdpdGhpbiB0aGUgdGFibGUgdmlldyBvZiB0aGUgc3VibWlzc2lvbnMuJ1xuICAgIH0sXG4gICAgcHJlZml4OiB7XG4gICAgICBsYWJlbDogJ1ByZWZpeCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ2V4YW1wbGUgXFwnJFxcJywgXFwnQFxcJycsXG4gICAgICB0b29sdGlwOiAnVGhlIHRleHQgdG8gc2hvdyBiZWZvcmUgYSBmaWVsZC4nXG4gICAgfSxcbiAgICBzdWZmaXg6IHtcbiAgICAgIGxhYmVsOiAnU3VmZml4JyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnZXhhbXBsZSBcXCckXFwnLCBcXCdAXFwnJyxcbiAgICAgIHRvb2x0aXA6ICdUaGUgdGV4dCB0byBzaG93IGFmdGVyIGEgZmllbGQuJ1xuICAgIH0sXG4gICAgbXVsdGlwbGU6IHtcbiAgICAgIGxhYmVsOiAnTXVsdGlwbGUgVmFsdWVzJyxcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICB0b29sdGlwOiAnQWxsb3dzIG11bHRpcGxlIHZhbHVlcyB0byBiZSBlbnRlcmVkIGZvciB0aGlzIGZpZWxkLidcbiAgICB9LFxuICAgIHVuaXF1ZToge1xuICAgICAgbGFiZWw6ICdVbmlxdWUnLFxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgIHRvb2x0aXA6ICdNYWtlcyBzdXJlIHRoZSBkYXRhIHN1Ym1pdHRlZCBmb3IgdGhpcyBmaWVsZCBpcyB1bmlxdWUsIGFuZCBoYXMgbm90IGJlZW4gc3VibWl0dGVkIGJlZm9yZS4nXG4gICAgfSxcbiAgICBwcm90ZWN0ZWQ6IHtcbiAgICAgIGxhYmVsOiAnUHJvdGVjdGVkJyxcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICB0b29sdGlwOiAnQSBwcm90ZWN0ZWQgZmllbGQgd2lsbCBub3QgYmUgcmV0dXJuZWQgd2hlbiBxdWVyaWVkIHZpYSBBUEkuJ1xuICAgIH0sXG4gICAgcGVyc2lzdGVudDoge1xuICAgICAgbGFiZWw6ICdQZXJzaXN0ZW50JyxcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICB0b29sdGlwOiAnQSBwZXJzaXN0ZW50IGZpZWxkIHdpbGwgYmUgc3RvcmVkIGluIGRhdGFiYXNlIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkLidcbiAgICB9LFxuICAgIGJsb2NrOiB7XG4gICAgICBsYWJlbDogJ0Jsb2NrJyxcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICB0b29sdGlwOiAnVGhpcyBjb250cm9sIHNob3VsZCBzcGFuIHRoZSBmdWxsIHdpZHRoIG9mIHRoZSBib3VuZGluZyBjb250YWluZXIuJ1xuICAgIH0sXG4gICAgbGVmdEljb246IHtcbiAgICAgIGxhYmVsOiAnTGVmdCBJY29uJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnRW50ZXIgaWNvbiBjbGFzc2VzJyxcbiAgICAgIHRvb2x0aXA6ICdUaGlzIGlzIHRoZSBmdWxsIGljb24gY2xhc3Mgc3RyaW5nIHRvIHNob3cgdGhlIGljb24uIEV4YW1wbGU6IFxcJ2dseXBoaWNvbiBnbHlwaGljb24tc2VhcmNoXFwnIG9yIFxcJ2ZhIGZhLXBsdXNcXCcnXG4gICAgfSxcbiAgICByaWdodEljb246IHtcbiAgICAgIGxhYmVsOiAnUmlnaHQgSWNvbicsXG4gICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGljb24gY2xhc3NlcycsXG4gICAgICB0b29sdGlwOiAnVGhpcyBpcyB0aGUgZnVsbCBpY29uIGNsYXNzIHN0cmluZyB0byBzaG93IHRoZSBpY29uLiBFeGFtcGxlOiBcXCdnbHlwaGljb24gZ2x5cGhpY29uLXNlYXJjaFxcJyBvciBcXCdmYSBmYS1wbHVzXFwnJ1xuICAgIH0sXG4gICAgdXJsOiB7XG4gICAgICBsYWJlbDogJ1VwbG9hZCBVcmwnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdFbnRlciB0aGUgdXJsIHRvIHBvc3QgdGhlIGZpbGVzIHRvLicsXG4gICAgICB0b29sdGlwOiAnU2VlIDxhIGhyZWY9XFwnaHR0cHM6Ly9naXRodWIuY29tL2RhbmlhbGZhcmlkL25nLWZpbGUtdXBsb2FkI3NlcnZlci1zaWRlXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+aHR0cHM6Ly9naXRodWIuY29tL2RhbmlhbGZhcmlkL25nLWZpbGUtdXBsb2FkI3NlcnZlci1zaWRlPC9hPiBmb3IgaG93IHRvIHNldCB1cCB0aGUgc2VydmVyLidcbiAgICB9LFxuICAgIGRpcjoge1xuICAgICAgbGFiZWw6ICdEaXJlY3RvcnknLFxuICAgICAgcGxhY2Vob2xkZXI6ICcob3B0aW9uYWwpIEVudGVyIGEgZGlyZWN0b3J5IGZvciB0aGUgZmlsZXMnLFxuICAgICAgdG9vbHRpcDogJ1RoaXMgd2lsbCBwbGFjZSBhbGwgdGhlIGZpbGVzIHVwbG9hZGVkIGluIHRoaXMgZmllbGQgaW4gdGhlIGRpcmVjdG9yeSdcbiAgICB9LFxuICAgIGRpc2FibGVPbkludmFsaWQ6IHtcbiAgICAgIGxhYmVsOiAnRGlzYWJsZSBvbiBGb3JtIEludmFsaWQnLFxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgIHRvb2x0aXA6ICdUaGlzIHdpbGwgZGlzYWJsZSB0aGlzIGZpZWxkIGlmIHRoZSBmb3JtIGlzIGludmFsaWQuJ1xuICAgIH0sXG4gICAgc3RyaXBlZDoge1xuICAgICAgbGFiZWw6ICdTdHJpcGVkJyxcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICB0b29sdGlwOiAnVGhpcyB3aWxsIHN0cmlwZSB0aGUgdGFibGUgaWYgY2hlY2tlZC4nXG4gICAgfSxcbiAgICBib3JkZXJlZDoge1xuICAgICAgbGFiZWw6ICdCb3JkZXJlZCcsXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgdG9vbHRpcDogJ1RoaXMgd2lsbCBib3JkZXIgdGhlIHRhYmxlIGlmIGNoZWNrZWQuJ1xuICAgIH0sXG4gICAgaG92ZXI6IHtcbiAgICAgIGxhYmVsOiAnSG92ZXInLFxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgIHRvb2x0aXA6ICdIaWdobGlnaHQgYSByb3cgb24gaG92ZXIuJ1xuICAgIH0sXG4gICAgY29uZGVuc2VkOiB7XG4gICAgICBsYWJlbDogJ0NvbmRlbnNlZCcsXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgdG9vbHRpcDogJ0NvbmRlbnNlIHRoZSBzaXplIG9mIHRoZSB0YWJsZS4nXG4gICAgfSxcbiAgICAndmFsaWRhdGUucmVxdWlyZWQnOiB7XG4gICAgICBsYWJlbDogJ1JlcXVpcmVkJyxcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICB0b29sdGlwOiAnQSByZXF1aXJlZCBmaWVsZCBtdXN0IGJlIGZpbGxlZCBpbiBiZWZvcmUgdGhlIGZvcm0gY2FuIGJlIHN1Ym1pdHRlZC4nXG4gICAgfSxcbiAgICAndmFsaWRhdGUubWluTGVuZ3RoJzoge1xuICAgICAgbGFiZWw6ICdNaW5pbXVtIExlbmd0aCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ01pbmltdW0gTGVuZ3RoJyxcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgdG9vbHRpcDogJ1RoZSBtaW5pbXVtIGxlbmd0aCByZXF1aXJlbWVudCB0aGlzIGZpZWxkIG11c3QgbWVldC4nXG4gICAgfSxcbiAgICAndmFsaWRhdGUubWF4TGVuZ3RoJzoge1xuICAgICAgbGFiZWw6ICdNYXhpbXVtIExlbmd0aCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ01heGltdW0gTGVuZ3RoJyxcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgdG9vbHRpcDogJ1RoZSBtYXhpbXVtIGxlbmd0aCByZXF1aXJlbWVudCB0aGlzIGZpZWxkIG11c3QgbWVldCdcbiAgICB9LFxuICAgICd2YWxpZGF0ZS5wYXR0ZXJuJzoge1xuICAgICAgbGFiZWw6ICdSZWd1bGFyIEV4cHJlc3Npb24gUGF0dGVybicsXG4gICAgICBwbGFjZWhvbGRlcjogJ1JlZ3VsYXIgRXhwcmVzc2lvbiBQYXR0ZXJuJyxcbiAgICAgIHRvb2x0aXA6ICdUaGUgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gdGVzdCB0aGF0IHRoZSBmaWVsZCB2YWx1ZSBtdXN0IHBhc3MgYmVmb3JlIHRoZSBmb3JtIGNhbiBiZSBzdWJtaXR0ZWQuJ1xuICAgIH0sXG4gICAgJ2N1c3RvbUNsYXNzJzoge1xuICAgICAgbGFiZWw6ICdDdXN0b20gQ1NTIENsYXNzJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnQ3VzdG9tIENTUyBDbGFzcycsXG4gICAgICB0b29sdGlwOiAnQ3VzdG9tIENTUyBjbGFzcyB0byBhZGQgdG8gdGhpcyBjb21wb25lbnQuJ1xuICAgIH0sXG4gICAgJ3RhYmluZGV4Jzoge1xuICAgICAgbGFiZWw6ICdUYWIgSW5kZXgnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdUYWIgSW5kZXgnLFxuICAgICAgdG9vbHRpcDogJ1NldHMgdGhlIHRhYmluZGV4IGF0dHJpYnV0ZSBvZiB0aGlzIGNvbXBvbmVudCB0byBvdmVycmlkZSB0aGUgdGFiIG9yZGVyIG9mIHRoZSBmb3JtLiBTZWUgdGhlIDxhIGhyZWY9XFwnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9HbG9iYWxfYXR0cmlidXRlcy90YWJpbmRleFxcJz5NRE4gZG9jdW1lbnRhdGlvbjwvYT4gb24gdGFiaW5kZXggZm9yIG1vcmUgaW5mb3JtYXRpb24uJ1xuICAgIH0sXG4gICAgJ2FkZEFub3RoZXInOiB7XG4gICAgICBsYWJlbDogJ0FkZCBBbm90aGVyIFRleHQnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdBZGQgQW5vdGhlcicsXG4gICAgICB0b29sdGlwOiAnU2V0IHRoZSB0ZXh0IG9mIHRoZSBBZGQgQW5vdGhlciBidXR0b24uJ1xuICAgIH0sXG4gICAgLy8gTmVlZCB0byB1c2UgYXJyYXkgbm90YXRpb24gdG8gaGF2ZSBkYXNoIGluIG5hbWVcbiAgICAnc3R5bGVbXFwnbWFyZ2luLXRvcFxcJ10nOiB7XG4gICAgICBsYWJlbDogJ01hcmdpbiBUb3AnLFxuICAgICAgcGxhY2Vob2xkZXI6ICcwcHgnLFxuICAgICAgdG9vbHRpcDogJ1NldHMgdGhlIHRvcCBtYXJnaW4gb2YgdGhpcyBjb21wb25lbnQuIE11c3QgYmUgYSB2YWxpZCBDU1MgbWVhc3VyZW1lbnQgbGlrZSBgMTBweGAuJ1xuICAgIH0sXG4gICAgJ3N0eWxlW1xcJ21hcmdpbi1yaWdodFxcJ10nOiB7XG4gICAgICBsYWJlbDogJ01hcmdpbiBSaWdodCcsXG4gICAgICBwbGFjZWhvbGRlcjogJzBweCcsXG4gICAgICB0b29sdGlwOiAnU2V0cyB0aGUgcmlnaHQgbWFyZ2luIG9mIHRoaXMgY29tcG9uZW50LiBNdXN0IGJlIGEgdmFsaWQgQ1NTIG1lYXN1cmVtZW50IGxpa2UgYDEwcHhgLidcbiAgICB9LFxuICAgICdzdHlsZVtcXCdtYXJnaW4tYm90dG9tXFwnXSc6IHtcbiAgICAgIGxhYmVsOiAnTWFyZ2luIEJvdHRvbScsXG4gICAgICBwbGFjZWhvbGRlcjogJzBweCcsXG4gICAgICB0b29sdGlwOiAnU2V0cyB0aGUgYm90dG9tIG1hcmdpbiBvZiB0aGlzIGNvbXBvbmVudC4gTXVzdCBiZSBhIHZhbGlkIENTUyBtZWFzdXJlbWVudCBsaWtlIGAxMHB4YC4nXG4gICAgfSxcbiAgICAnc3R5bGVbXFwnbWFyZ2luLWxlZnRcXCddJzoge1xuICAgICAgbGFiZWw6ICdNYXJnaW4gTGVmdCcsXG4gICAgICBwbGFjZWhvbGRlcjogJzBweCcsXG4gICAgICB0b29sdGlwOiAnU2V0cyB0aGUgbGVmdCBtYXJnaW4gb2YgdGhpcyBjb21wb25lbnQuIE11c3QgYmUgYSB2YWxpZCBDU1MgbWVhc3VyZW1lbnQgbGlrZSBgMTBweGAuJ1xuICAgIH1cbiAgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFjdGlvbnM6IFtcbiAgICB7XG4gICAgICBuYW1lOiAnc3VibWl0JyxcbiAgICAgIHRpdGxlOiAnU3VibWl0J1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3Jlc2V0JyxcbiAgICAgIHRpdGxlOiAnUmVzZXQnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnb2F1dGgnLFxuICAgICAgdGl0bGU6ICdPQXV0aCdcbiAgICB9XG4gIF0sXG4gIHRoZW1lczogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdkZWZhdWx0JyxcbiAgICAgIHRpdGxlOiAnRGVmYXVsdCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdwcmltYXJ5JyxcbiAgICAgIHRpdGxlOiAnUHJpbWFyeSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdpbmZvJyxcbiAgICAgIHRpdGxlOiAnSW5mbydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnU3VjY2VzcydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdkYW5nZXInLFxuICAgICAgdGl0bGU6ICdEYW5nZXInXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnd2FybmluZycsXG4gICAgICB0aXRsZTogJ1dhcm5pbmcnXG4gICAgfVxuICBdLFxuICBzaXplczogW1xuICAgIHtcbiAgICAgIG5hbWU6ICd4cycsXG4gICAgICB0aXRsZTogJ0V4dHJhIFNtYWxsJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3NtJyxcbiAgICAgIHRpdGxlOiAnU21hbGwnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbWQnLFxuICAgICAgdGl0bGU6ICdNZWRpdW0nXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbGcnLFxuICAgICAgdGl0bGU6ICdMYXJnZSdcbiAgICB9XG4gIF1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gWydkZWJvdW5jZScsIGZ1bmN0aW9uKGRlYm91bmNlKSB7XG4gIHJldHVybiB7XG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogJ2Zvcm1pby9mb3JtYnVpbGRlci9idWlsZGVyLmh0bWwnLFxuICAgIHNjb3BlOiB7XG4gICAgICBzcmM6ICc9JyxcbiAgICAgIHR5cGU6ICc9JyxcbiAgICAgIG9uU2F2ZTogJz0nLFxuICAgICAgb25DYW5jZWw6ICc9J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogW1xuICAgICAgJyRzY29wZScsXG4gICAgICAnZm9ybWlvQ29tcG9uZW50cycsXG4gICAgICAnbmdEaWFsb2cnLFxuICAgICAgJ0Zvcm1pbycsXG4gICAgICAnRm9ybWlvVXRpbHMnLFxuICAgICAgJ0Zvcm1pb1BsdWdpbnMnLFxuICAgICAgJ2RuZERyYWdJZnJhbWVXb3JrYXJvdW5kJyxcbiAgICAgIGZ1bmN0aW9uKFxuICAgICAgICAkc2NvcGUsXG4gICAgICAgIGZvcm1pb0NvbXBvbmVudHMsXG4gICAgICAgIG5nRGlhbG9nLFxuICAgICAgICBGb3JtaW8sXG4gICAgICAgIEZvcm1pb1V0aWxzLFxuICAgICAgICBGb3JtaW9QbHVnaW5zLFxuICAgICAgICBkbmREcmFnSWZyYW1lV29ya2Fyb3VuZFxuICAgICAgKSB7XG4gICAgICAgIC8vIEFkZCB0aGUgY29tcG9uZW50cyB0byB0aGUgc2NvcGUuXG4gICAgICAgIHZhciBzdWJtaXRCdXR0b24gPSBhbmd1bGFyLmNvcHkoZm9ybWlvQ29tcG9uZW50cy5jb21wb25lbnRzLmJ1dHRvbi5zZXR0aW5ncyk7XG4gICAgICAgICRzY29wZS5mb3JtID0ge2NvbXBvbmVudHM6W3N1Ym1pdEJ1dHRvbl19O1xuICAgICAgICAkc2NvcGUuZm9ybWlvID0gbmV3IEZvcm1pbygkc2NvcGUuc3JjKTtcblxuICAgICAgICAvLyBMb2FkIHRoZSBmb3JtLlxuICAgICAgICBpZiAoJHNjb3BlLmZvcm1pby5mb3JtSWQpIHtcbiAgICAgICAgICAkc2NvcGUuZm9ybWlvLmxvYWRGb3JtKCkudGhlbihmdW5jdGlvbihmb3JtKSB7XG4gICAgICAgICAgICAkc2NvcGUuZm9ybSA9IGZvcm07XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmZvcm0uY29tcG9uZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmZvcm0uY29tcG9uZW50cy5wdXNoKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudHMgPSBfLmNsb25lRGVlcChmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHMpO1xuICAgICAgICBfLmVhY2goJHNjb3BlLmZvcm1Db21wb25lbnRzLCBmdW5jdGlvbihjb21wb25lbnQsIGtleSkge1xuICAgICAgICAgIGNvbXBvbmVudC5zZXR0aW5ncy5pc05ldyA9IHRydWU7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5zZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnYnVpbGRlcicpICYmICFjb21wb25lbnQuc2V0dGluZ3MuYnVpbGRlcikge1xuICAgICAgICAgICAgZGVsZXRlICRzY29wZS5mb3JtQ29tcG9uZW50c1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZvcm1Db21wb25lbnRHcm91cHMgPSBfLmNsb25lRGVlcChmb3JtaW9Db21wb25lbnRzLmdyb3Vwcyk7XG4gICAgICAgICRzY29wZS5mb3JtQ29tcG9uZW50c0J5R3JvdXAgPSBfLmdyb3VwQnkoJHNjb3BlLmZvcm1Db21wb25lbnRzLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICByZXR1cm4gY29tcG9uZW50Lmdyb3VwO1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudHNCeUdyb3VwLnJlc291cmNlID0ge307XG4gICAgICAgICRzY29wZS5mb3JtQ29tcG9uZW50R3JvdXBzLnJlc291cmNlID0ge1xuICAgICAgICAgIHRpdGxlOiAnRXhpc3RpbmcgUmVzb3VyY2UgRmllbGRzJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiAnc3ViZ3JvdXAtYWNjb3JkaW9uLWNvbnRhaW5lcicsXG4gICAgICAgICAgc3ViZ3JvdXBzOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEdldCB0aGUgcmVzb3VyY2UgZmllbGRzLlxuICAgICAgICAkc2NvcGUuZm9ybWlvLmxvYWRGb3Jtcyh7cGFyYW1zOiB7dHlwZTogJ3Jlc291cmNlJ319KS50aGVuKGZ1bmN0aW9uKHJlc291cmNlcykge1xuXG4gICAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGFsbCByZXNvdXJjZXMuXG4gICAgICAgICAgXy5lYWNoKHJlc291cmNlcywgZnVuY3Rpb24ocmVzb3VyY2UpIHtcblxuICAgICAgICAgICAgdmFyIHJlc291cmNlS2V5ID0gcmVzb3VyY2UubmFtZTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgbGVnZW5kIGZvciB0aGlzIHJlc291cmNlLlxuICAgICAgICAgICAgJHNjb3BlLmZvcm1Db21wb25lbnRzQnlHcm91cC5yZXNvdXJjZVtyZXNvdXJjZUtleV0gPSBbXTtcbiAgICAgICAgICAgICRzY29wZS5mb3JtQ29tcG9uZW50R3JvdXBzLnJlc291cmNlLnN1Ymdyb3Vwc1tyZXNvdXJjZUtleV0gPSB7XG4gICAgICAgICAgICAgIHRpdGxlOiByZXNvdXJjZS50aXRsZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggY29tcG9uZW50LlxuICAgICAgICAgICAgRm9ybWlvVXRpbHMuZWFjaENvbXBvbmVudChyZXNvdXJjZS5jb21wb25lbnRzLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC50eXBlID09PSAnYnV0dG9uJykgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICRzY29wZS5mb3JtQ29tcG9uZW50c0J5R3JvdXAucmVzb3VyY2VbcmVzb3VyY2VLZXldLnB1c2goXy5tZXJnZShcbiAgICAgICAgICAgICAgICBfLmNsb25lRGVlcChmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHNbY29tcG9uZW50LnR5cGVdLCB0cnVlKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogY29tcG9uZW50LmxhYmVsLFxuICAgICAgICAgICAgICAgICAgZ3JvdXA6ICdyZXNvdXJjZScsXG4gICAgICAgICAgICAgICAgICBzdWJncm91cDogcmVzb3VyY2VLZXksXG4gICAgICAgICAgICAgICAgICBzZXR0aW5nczogY29tcG9uZW50XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogY29tcG9uZW50LmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBrZXk6IGNvbXBvbmVudC5rZXksXG4gICAgICAgICAgICAgICAgICAgIGxvY2tLZXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogcmVzb3VyY2UuX2lkXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLiRlbWl0KCdmb3JtVXBkYXRlJywgJHNjb3BlLmZvcm0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFkZCBhIG5ldyBjb21wb25lbnQuXG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOmFkZCcsIHVwZGF0ZSk7XG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOnVwZGF0ZScsIHVwZGF0ZSk7XG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOnJlbW92ZScsIHVwZGF0ZSk7XG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOmVkaXQnLCB1cGRhdGUpO1xuXG4gICAgICAgICRzY29wZS5zYXZlU2V0dGluZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBuZ0RpYWxvZy5jbG9zZUFsbCh0cnVlKTtcbiAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2Zvcm1VcGRhdGUnLCAkc2NvcGUuZm9ybSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNhcGl0YWxpemUgPSBfLmNhcGl0YWxpemU7XG5cbiAgICAgICAgLy8gU2V0IHRoZSByb290IGxpc3QgaGVpZ2h0IHRvIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm1idWlsZGVyIGZvciBlYXNlIG9mIGZvcm0gYnVpbGRpbmcuXG4gICAgICAgIChmdW5jdGlvbiBzZXRSb290TGlzdEhlaWdodCgpIHtcbiAgICAgICAgICB2YXIgbGlzdEhlaWdodCA9IGFuZ3VsYXIuZWxlbWVudCgnLnJvb3RsaXN0JykuaGVpZ2h0KCdpbmhlcml0JykuaGVpZ2h0KCk7XG4gICAgICAgICAgdmFyIGJ1aWxkZXJIZWlnaHQgPSBhbmd1bGFyLmVsZW1lbnQoJy5mb3JtYnVpbGRlcicpLmhlaWdodCgpO1xuICAgICAgICAgIGlmICgoYnVpbGRlckhlaWdodCAtIGxpc3RIZWlnaHQpID4gMTAwKSB7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5yb290bGlzdCcpLmhlaWdodChidWlsZGVySGVpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0VGltZW91dChzZXRSb290TGlzdEhlaWdodCwgMTAwMCk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgLy8gQWRkIHRvIHNjb3BlIHNvIGl0IGNhbiBiZSB1c2VkIGluIHRlbXBsYXRlc1xuICAgICAgICAkc2NvcGUuZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQgPSBkbmREcmFnSWZyYW1lV29ya2Fyb3VuZDtcbiAgICAgIH1cbiAgICBdLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICB2YXIgc2Nyb2xsU2lkZWJhciA9IGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBEaXNhYmxlIGFsbCBidXR0b25zIHdpdGhpbiB0aGUgZm9ybS5cbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCcuZm9ybWJ1aWxkZXInKS5maW5kKCdidXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2Zvcm0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJy5mb3JtYnVpbGRlcicpLmZpbmQoJ2J1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIC8vIE1ha2UgdGhlIGxlZnQgY29sdW1uIGZvbGxvdyB0aGUgZm9ybS5cbiAgICAgICAgdmFyIGZvcm1Db21wb25lbnRzID0gYW5ndWxhci5lbGVtZW50KCcuZm9ybWNvbXBvbmVudHMnKTtcbiAgICAgICAgdmFyIGZvcm1CdWlsZGVyID0gYW5ndWxhci5lbGVtZW50KCcuZm9ybWJ1aWxkZXInKTtcbiAgICAgICAgaWYgKGZvcm1Db21wb25lbnRzLmxlbmd0aCAhPT0gMCAmJiBmb3JtQnVpbGRlci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB2YXIgbWF4U2Nyb2xsID0gZm9ybUJ1aWxkZXIub3V0ZXJIZWlnaHQoKSA+IGZvcm1Db21wb25lbnRzLm91dGVySGVpZ2h0KCkgPyBmb3JtQnVpbGRlci5vdXRlckhlaWdodCgpIC0gZm9ybUNvbXBvbmVudHMub3V0ZXJIZWlnaHQoKSA6IDA7XG4gICAgICAgICAgLy8gNTAgcGl4ZWxzIGdpdmVzIHNwYWNlIGZvciB0aGUgZml4ZWQgaGVhZGVyLlxuICAgICAgICAgIHZhciBzY3JvbGwgPSBhbmd1bGFyLmVsZW1lbnQod2luZG93KS5zY3JvbGxUb3AoKSAtIGZvcm1Db21wb25lbnRzLnBhcmVudCgpLm9mZnNldCgpLnRvcCArIDUwO1xuICAgICAgICAgIGlmIChzY3JvbGwgPCAwKSB7XG4gICAgICAgICAgICBzY3JvbGwgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2Nyb2xsID4gbWF4U2Nyb2xsKSB7XG4gICAgICAgICAgICBzY3JvbGwgPSBtYXhTY3JvbGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcm1Db21wb25lbnRzLmNzcygnbWFyZ2luLXRvcCcsIHNjcm9sbCArICdweCcpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5vbnNjcm9sbCA9IHNjcm9sbFNpZGViYXI7XG4gICAgICBlbGVtZW50Lm9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cub25zY3JvbGwgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufV07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ3JlYXRlIHRoZSBmb3JtLWJ1aWxkZXItY29tcG9uZW50IGRpcmVjdGl2ZS5cbiAqIEV4dGVuZCB0aGUgZm9ybWlvLWNvbXBvbmVudCBkaXJlY3RpdmUgYW5kIGNoYW5nZSB0aGUgdGVtcGxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gW1xuICAnZm9ybWlvQ29tcG9uZW50RGlyZWN0aXZlJyxcbiAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50RGlyZWN0aXZlKSB7XG4gICAgcmV0dXJuIGFuZ3VsYXIuZXh0ZW5kKHt9LCBmb3JtaW9Db21wb25lbnREaXJlY3RpdmVbMF0sIHtcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAnZm9ybWlvL2Zvcm1idWlsZGVyL2NvbXBvbmVudC5odG1sJ1xuICAgIH0pO1xuICB9XG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJyRzY29wZScsXG4gICdmb3JtaW9Db21wb25lbnRzJyxcbiAgJ25nRGlhbG9nJyxcbiAgJ2RuZERyYWdJZnJhbWVXb3JrYXJvdW5kJyxcbiAgZnVuY3Rpb24oXG4gICAgJHNjb3BlLFxuICAgIGZvcm1pb0NvbXBvbmVudHMsXG4gICAgbmdEaWFsb2csXG4gICAgZG5kRHJhZ0lmcmFtZVdvcmthcm91bmRcbiAgKSB7XG4gICAgJHNjb3BlLmhpZGVDb3VudCA9IChfLmlzTnVtYmVyKCRzY29wZS5oaWRlRG5kQm94Q291bnQpID8gJHNjb3BlLmhpZGVEbmRCb3hDb3VudCA6IDEpO1xuXG4gICAgJHNjb3BlLmZvcm1Db21wb25lbnRzID0gZm9ybWlvQ29tcG9uZW50cy5jb21wb25lbnRzO1xuXG4gICAgLy8gQ29tcG9uZW50cyBkZXBlbmQgb24gdGhpcyBleGlzdGluZ1xuICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAkc2NvcGUuZW1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBhcmdzWzBdID0gJ2Zvcm1CdWlsZGVyOicgKyBhcmdzWzBdO1xuICAgICAgJHNjb3BlLiRlbWl0LmFwcGx5KCRzY29wZSwgYXJncyk7XG4gICAgfTtcblxuICAgICRzY29wZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbihjb21wb25lbnQsIGluZGV4KSB7XG5cbiAgICAgIC8vIE9ubHkgZWRpdCBpbW1lZGlhdGVseSBmb3IgY29tcG9uZW50cyB0aGF0IGFyZSBub3QgcmVzb3VyY2UgY29tcHMuXG4gICAgICBpZiAoY29tcG9uZW50LmlzTmV3ICYmICghY29tcG9uZW50LmtleSB8fCAoY29tcG9uZW50LmtleS5pbmRleE9mKCcuJykgPT09IC0xKSkpIHtcbiAgICAgICAgJHNjb3BlLmVkaXRDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb21wb25lbnQuaXNOZXcgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVmcmVzaCBhbGwgQ0tFZGl0b3IgaW5zdGFuY2VzXG4gICAgICAkc2NvcGUuJGJyb2FkY2FzdCgnY2tlZGl0b3IucmVmcmVzaCcpO1xuXG4gICAgICBkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAkc2NvcGUuZW1pdCgnYWRkJyk7XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXkgZG9uJ3QgZXZlciBhZGQgYSBjb21wb25lbnQgb24gdGhlIGJvdHRvbSBvZiB0aGUgc3VibWl0IGJ1dHRvbi5cbiAgICAgIHZhciBsYXN0Q29tcG9uZW50ID0gJHNjb3BlLmNvbXBvbmVudC5jb21wb25lbnRzWyRzY29wZS5jb21wb25lbnQuY29tcG9uZW50cy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChcbiAgICAgICAgKGxhc3RDb21wb25lbnQpICYmXG4gICAgICAgIChsYXN0Q29tcG9uZW50LnR5cGUgPT09ICdidXR0b24nKSAmJlxuICAgICAgICAobGFzdENvbXBvbmVudC5hY3Rpb24gPT09ICdzdWJtaXQnKVxuICAgICAgKSB7XG5cbiAgICAgICAgLy8gVGhlcmUgaXMgb25seSBvbmUgZWxlbWVudCBvbiB0aGUgcGFnZS5cbiAgICAgICAgaWYgKCRzY29wZS5jb21wb25lbnQuY29tcG9uZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPj0gJHNjb3BlLmNvbXBvbmVudC5jb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRoZSBjb21wb25lbnQgdG8gdGhlIGNvbXBvbmVudHMgYXJyYXkuXG4gICAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuY29tcG9uZW50LmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAwLCBjb21wb25lbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0cnVlIHNpbmNlIHRoaXMgd2lsbCB0ZWxsIHRoZSBkcmFnLWFuZC1kcm9wIGxpc3QgY29tcG9uZW50IHRvIG5vdCBpbnNlcnQgaW50byBpdHMgb3duIGFycmF5LlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8vIEFsbG93IHByb3RvdHlwZWQgc2NvcGVzIHRvIHVwZGF0ZSB0aGUgb3JpZ2luYWwgY29tcG9uZW50LlxuICAgICRzY29wZS51cGRhdGVDb21wb25lbnQgPSBmdW5jdGlvbihuZXdDb21wb25lbnQsIG9sZENvbXBvbmVudCkge1xuICAgICAgdmFyIGxpc3QgPSAkc2NvcGUuY29tcG9uZW50LmNvbXBvbmVudHM7XG4gICAgICBsaXN0LnNwbGljZShsaXN0LmluZGV4T2Yob2xkQ29tcG9uZW50KSwgMSwgbmV3Q29tcG9uZW50KTtcbiAgICAgICRzY29wZS4kZW1pdCgndXBkYXRlJywgbmV3Q29tcG9uZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlbW92ZSA9IGZ1bmN0aW9uKGNvbXBvbmVudCkge1xuICAgICAgdmFyIGxpc3QgPSAkc2NvcGUuY29tcG9uZW50LmNvbXBvbmVudHM7XG4gICAgICBsaXN0LnNwbGljZShsaXN0LmluZGV4T2YoY29tcG9uZW50KSwgMSk7XG4gICAgICAkc2NvcGUuZW1pdCgncmVtb3ZlJywgY29tcG9uZW50KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnJlbW92ZUNvbXBvbmVudCA9IGZ1bmN0aW9uKGNvbXBvbmVudCwgc2hvdWxkQ29uZmlybSkge1xuICAgICAgaWYgKHNob3VsZENvbmZpcm0pIHtcbiAgICAgICAgLy8gU2hvdyBjb25maXJtIGRpYWxvZyBiZWZvcmUgcmVtb3ZpbmcgYSBjb21wb25lbnRcbiAgICAgICAgbmdEaWFsb2cub3Blbih7XG4gICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb25maXJtLXJlbW92ZS5odG1sJyxcbiAgICAgICAgICBzaG93Q2xvc2U6IGZhbHNlXG4gICAgICAgIH0pLmNsb3NlUHJvbWlzZS50aGVuKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICB2YXIgY2FuY2VsbGVkID0gZS52YWx1ZSA9PT0gZmFsc2UgfHwgZS52YWx1ZSA9PT0gJyRjbG9zZUJ1dHRvbicgfHwgZS52YWx1ZSA9PT0gJyRkb2N1bWVudCc7XG4gICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHJlbW92ZShjb21wb25lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlKGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEVkaXQgYSBzcGVjaWZpYyBjb21wb25lbnQuXG4gICAgJHNjb3BlLmVkaXRDb21wb25lbnQgPSBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICRzY29wZS5mb3JtQ29tcG9uZW50ID0gZm9ybWlvQ29tcG9uZW50cy5jb21wb25lbnRzW2NvbXBvbmVudC50eXBlXSB8fCBmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHMuY3VzdG9tO1xuICAgICAgLy8gTm8gZWRpdCB2aWV3IGF2YWlsYWJsZVxuICAgICAgaWYgKCEkc2NvcGUuZm9ybUNvbXBvbmVudC5oYXNPd25Qcm9wZXJ0eSgndmlld3MnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBjaGlsZCBpc29sYXRlIHNjb3BlIGZvciBkaWFsb2dcbiAgICAgIHZhciBjaGlsZFNjb3BlID0gJHNjb3BlLiRuZXcoZmFsc2UpO1xuICAgICAgY2hpbGRTY29wZS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICBjaGlsZFNjb3BlLmRhdGEgPSB7fTtcblxuICAgICAgaWYgKGNvbXBvbmVudC5rZXkpIHtcbiAgICAgICAgY2hpbGRTY29wZS5kYXRhW2NvbXBvbmVudC5rZXldID0gY29tcG9uZW50Lm11bHRpcGxlID8gWycnXSA6ICcnO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJldmlvdXNTZXR0aW5ncyA9IGFuZ3VsYXIuY29weShjb21wb25lbnQpO1xuXG4gICAgICAvLyBPcGVuIHRoZSBkaWFsb2cuXG4gICAgICBuZ0RpYWxvZy5vcGVuKHtcbiAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9zZXR0aW5ncy5odG1sJyxcbiAgICAgICAgc2NvcGU6IGNoaWxkU2NvcGUsXG4gICAgICAgIGNsYXNzTmFtZTogJ25nZGlhbG9nLXRoZW1lLWRlZmF1bHQgY29tcG9uZW50LXNldHRpbmdzJyxcbiAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCAnRm9ybWlvJywgJ0Zvcm1pb1BsdWdpbnMnLCBmdW5jdGlvbigkc2NvcGUsIEZvcm1pbywgRm9ybWlvUGx1Z2lucykge1xuICAgICAgICAgIC8vIEFsbG93IHRoZSBjb21wb25lbnQgdG8gYWRkIGN1c3RvbSBsb2dpYyB0byB0aGUgZWRpdCBwYWdlLlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICRzY29wZS5mb3JtQ29tcG9uZW50ICYmICRzY29wZS5mb3JtQ29tcG9uZW50Lm9uRWRpdFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm1Db21wb25lbnQub25FZGl0KCRzY29wZSwgY29tcG9uZW50LCBGb3JtaW8sIEZvcm1pb1BsdWdpbnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudC5tdWx0aXBsZScsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YVskc2NvcGUuY29tcG9uZW50LmtleV0gPSB2YWx1ZSA/IFsnJ10gOiAnJztcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFdhdGNoIHRoZSBzZXR0aW5ncyBsYWJlbCBhbmQgYXV0byBzZXQgdGhlIGtleSBmcm9tIGl0LlxuICAgICAgICAgIHZhciBpbnZhbGlkUmVnZXggPSAvXlteQS1aYS16XSp8W15BLVphLXowLTlcXC1dKi9nO1xuICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudC5sYWJlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5jb21wb25lbnQubGFiZWwgJiYgISRzY29wZS5jb21wb25lbnQubG9ja0tleSkge1xuICAgICAgICAgICAgICBpZiAoJHNjb3BlLmRhdGEuaGFzT3duUHJvcGVydHkoJHNjb3BlLmNvbXBvbmVudC5rZXkpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlICRzY29wZS5kYXRhWyRzY29wZS5jb21wb25lbnQua2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LmtleSA9IF8uY2FtZWxDYXNlKCRzY29wZS5jb21wb25lbnQubGFiZWwucmVwbGFjZShpbnZhbGlkUmVnZXgsICcnKSk7XG4gICAgICAgICAgICAgICRzY29wZS5kYXRhWyRzY29wZS5jb21wb25lbnQua2V5XSA9ICRzY29wZS5jb21wb25lbnQubXVsdGlwbGUgPyBbJyddIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1dXG4gICAgICB9KS5jbG9zZVByb21pc2UudGhlbihmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjYW5jZWxsZWQgPSBlLnZhbHVlID09PSBmYWxzZSB8fCBlLnZhbHVlID09PSAnJGNsb3NlQnV0dG9uJyB8fCBlLnZhbHVlID09PSAnJGRvY3VtZW50JztcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICAgIGlmIChjb21wb25lbnQuaXNOZXcpIHtcbiAgICAgICAgICAgIHJlbW92ZShjb21wb25lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJldmVydCB0byBvbGQgc2V0dGluZ3MsIGJ1dCB1c2UgdGhlIHNhbWUgb2JqZWN0IHJlZmVyZW5jZVxuICAgICAgICAgICAgXy5hc3NpZ24oY29tcG9uZW50LCBwcmV2aW91c1NldHRpbmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGNvbXBvbmVudC5pc05ldztcbiAgICAgICAgICAkc2NvcGUuZW1pdCgnZWRpdCcsIGNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBBZGQgdG8gc2NvcGUgc28gaXQgY2FuIGJlIHVzZWQgaW4gdGVtcGxhdGVzXG4gICAgJHNjb3BlLmRuZERyYWdJZnJhbWVXb3JrYXJvdW5kID0gZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQ7XG4gIH1cbl07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnZm9ybWlvRWxlbWVudERpcmVjdGl2ZScsXG4gIGZ1bmN0aW9uKGZvcm1pb0VsZW1lbnREaXJlY3RpdmUpIHtcbiAgICByZXR1cm4gYW5ndWxhci5leHRlbmQoe30sIGZvcm1pb0VsZW1lbnREaXJlY3RpdmVbMF0sIHtcbiAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgIGNvbnRyb2xsZXI6IFtcbiAgICAgICAgJyRzY29wZScsXG4gICAgICAgICdmb3JtaW9Db21wb25lbnRzJyxcbiAgICAgICAgZnVuY3Rpb24oXG4gICAgICAgICAgJHNjb3BlLFxuICAgICAgICAgIGZvcm1pb0NvbXBvbmVudHNcbiAgICAgICAgKSB7XG4gICAgICAgICAgJHNjb3BlLmZvcm1Db21wb25lbnQgPSBmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHNbJHNjb3BlLmNvbXBvbmVudC50eXBlXSB8fCBmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHMuY3VzdG9tO1xuICAgICAgICAgIGlmICgkc2NvcGUuZm9ybUNvbXBvbmVudC5mYnRlbXBsYXRlKSB7XG4gICAgICAgICAgICAkc2NvcGUudGVtcGxhdGUgPSAkc2NvcGUuZm9ybUNvbXBvbmVudC5mYnRlbXBsYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNvbXBvbmVudDogJz0nLFxuICAgICAgICBmb3JtaW86ICc9JyxcbiAgICAgICAgZm9ybTogJz0nLFxuICAgICAgICAvLyAjIG9mIGl0ZW1zIG5lZWRlZCBpbiB0aGUgbGlzdCBiZWZvcmUgaGlkaW5nIHRoZVxuICAgICAgICAvLyBkcmFnIGFuZCBkcm9wIHByb21wdCBkaXZcbiAgICAgICAgaGlkZURuZEJveENvdW50OiAnPSdcbiAgICAgIH0sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6ICdmb3JtQnVpbGRlckRuZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Zvcm1pby9mb3JtYnVpbGRlci9saXN0Lmh0bWwnXG4gICAgfTtcbiAgfVxuXTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4qIFRoaXMgZGlyZWN0aXZlIGNyZWF0ZXMgYSBmaWVsZCBmb3IgdHdlYWtpbmcgY29tcG9uZW50IG9wdGlvbnMuXG4qIFRoaXMgbmVlZHMgYXQgbGVhc3QgYSBwcm9wZXJ0eSBhdHRyaWJ1dGUgc3BlY2lmeWluZyB3aGF0IHByb3BlcnR5XG4qIG9mIHRoZSBjb21wb25lbnQgdG8gYmluZCB0by5cbipcbiogSWYgdGhlIHByb3BlcnR5IGlzIGRlZmluZWQgaW4gQ09NTU9OX09QVElPTlMgYWJvdmUsIGl0IHdpbGwgYXV0b21hdGljYWxseVxuKiBwb3B1bGF0ZSBpdHMgbGFiZWwsIHBsYWNlaG9sZGVyLCBpbnB1dCB0eXBlLCBhbmQgdG9vbHRpcC4gSWYgbm90LCB5b3UgbWF5IHNwZWNpZnlcbiogdGhvc2UgdmlhIGF0dHJpYnV0ZXMgKGV4Y2VwdCBmb3IgdG9vbHRpcCwgd2hpY2ggeW91IGNhbiBzcGVjaWZ5IHdpdGggdGhlIHRpdGxlIGF0dHJpYnV0ZSkuXG4qIFRoZSBnZW5lcmF0ZWQgaW5wdXQgd2lsbCBhbHNvIGNhcnJ5IG92ZXIgYW55IG90aGVyIHByb3BlcnRpZXMgeW91IHNwZWNpZnkgb24gdGhpcyBkaXJlY3RpdmUuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBbJ0NPTU1PTl9PUFRJT05TJywgZnVuY3Rpb24oQ09NTU9OX09QVElPTlMpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcXVpcmU6ICdwcm9wZXJ0eScsXG4gICAgcHJpb3JpdHk6IDIsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZTogZnVuY3Rpb24oZWwsIGF0dHJzKSB7XG4gICAgICB2YXIgcHJvcGVydHkgPSBhdHRycy5wcm9wZXJ0eTtcbiAgICAgIHZhciBsYWJlbCA9IGF0dHJzLmxhYmVsIHx8IChDT01NT05fT1BUSU9OU1twcm9wZXJ0eV0gJiYgQ09NTU9OX09QVElPTlNbcHJvcGVydHldLmxhYmVsKSB8fCAnJztcbiAgICAgIHZhciBwbGFjZWhvbGRlciA9IChDT01NT05fT1BUSU9OU1twcm9wZXJ0eV0gJiYgQ09NTU9OX09QVElPTlNbcHJvcGVydHldLnBsYWNlaG9sZGVyKSB8fCBudWxsO1xuICAgICAgdmFyIHR5cGUgPSAoQ09NTU9OX09QVElPTlNbcHJvcGVydHldICYmIENPTU1PTl9PUFRJT05TW3Byb3BlcnR5XS50eXBlKSB8fCAndGV4dCc7XG4gICAgICB2YXIgdG9vbHRpcCA9IChDT01NT05fT1BUSU9OU1twcm9wZXJ0eV0gJiYgQ09NTU9OX09QVElPTlNbcHJvcGVydHldLnRvb2x0aXApIHx8ICcnO1xuXG4gICAgICB2YXIgaW5wdXQgPSBhbmd1bGFyLmVsZW1lbnQoJzxpbnB1dD48L2lucHV0PicpO1xuICAgICAgdmFyIGlucHV0QXR0cnMgPSB7XG4gICAgICAgIGlkOiBwcm9wZXJ0eSxcbiAgICAgICAgbmFtZTogcHJvcGVydHksXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICduZy1tb2RlbCc6ICdjb21wb25lbnQuJyArIHByb3BlcnR5LFxuICAgICAgICBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXJcbiAgICAgIH07XG4gICAgICAvLyBQYXNzIHRocm91Z2ggYXR0cmlidXRlcyBmcm9tIHRoZSBkaXJlY3RpdmUgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRycy4kYXR0ciwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlucHV0QXR0cnNba2V5XSA9IGF0dHJzW2tleV07XG4gICAgICAgIC8vIEFsbG93IHNwZWNpZnlpbmcgdG9vbHRpcCB2aWEgdGl0bGUgYXR0clxuICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09ICd0aXRsZScpIHtcbiAgICAgICAgICB0b29sdGlwID0gYXR0cnNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpbnB1dC5hdHRyKGlucHV0QXR0cnMpO1xuXG4gICAgICAvLyBDaGVja2JveGVzIGhhdmUgYSBzbGlnaHRseSBkaWZmZXJlbnQgbGF5b3V0XG4gICAgICBpZiAoaW5wdXRBdHRycy50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nICtcbiAgICAgICAgICAgICAgICAnPGxhYmVsIGZvcj1cIicgKyBwcm9wZXJ0eSArICdcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIicgKyB0b29sdGlwICsgJ1wiPicgK1xuICAgICAgICAgICAgICAgIGlucHV0LnByb3AoJ291dGVySFRNTCcpICtcbiAgICAgICAgICAgICAgICAnICcgKyBsYWJlbCArICc8L2xhYmVsPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgIH1cblxuICAgICAgaW5wdXQuYWRkQ2xhc3MoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiJyArIHByb3BlcnR5ICsgJ1wiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiJyArIHRvb2x0aXAgKyAnXCI+JyArIGxhYmVsICsgJzwvbGFiZWw+JyArXG4gICAgICAgICAgICAgICAgaW5wdXQucHJvcCgnb3V0ZXJIVE1MJykgK1xuICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9XG4gIH07XG59XTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4qIEEgZGlyZWN0aXZlIGZvciBlZGl0aW5nIGEgY29tcG9uZW50J3MgY3VzdG9tIHZhbGlkYXRpb24uXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPjxhIGNsYXNzPVwicGFuZWwtdGl0bGVcIiBuZy1jbGljaz1cImN1c3RvbUNvbGxhcHNlZCA9ICFjdXN0b21Db2xsYXBzZWRcIj5DdXN0b20gVmFsaWRhdGlvbjwvYT48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBjb2xsYXBzZT1cImN1c3RvbUNvbGxhcHNlZFwiIG5nLWluaXQ9XCJjdXN0b21Db2xsYXBzZWQgPSB0cnVlO1wiPicgK1xuICAgICAgICAgICAgICAgICAgJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJvd3M9XCI1XCIgaWQ9XCJjdXN0b21cIiBuYW1lPVwiY3VzdG9tXCIgbmctbW9kZWw9XCJjb21wb25lbnQudmFsaWRhdGUuY3VzdG9tXCIgcGxhY2Vob2xkZXI9XCIvKioqIEV4YW1wbGUgQ29kZSAqKiovXFxudmFsaWQgPSAoaW5wdXQgPT09IDMpID8gdHJ1ZSA6IFxcJ011c3QgYmUgM1xcJztcIj57eyBjb21wb25lbnQudmFsaWRhdGUuY3VzdG9tIH19PC90ZXh0YXJlYT4nICtcbiAgICAgICAgICAgICAgICAgICc8c21hbGw+PHA+RW50ZXIgY3VzdG9tIHZhbGlkYXRpb24gY29kZS48L3A+JyArXG4gICAgICAgICAgICAgICAgICAnPHA+WW91IG11c3QgYXNzaWduIHRoZSA8c3Ryb25nPnZhbGlkPC9zdHJvbmc+IHZhcmlhYmxlIGFzIGVpdGhlciA8c3Ryb25nPnRydWU8L3N0cm9uZz4gb3IgYW4gZXJyb3IgbWVzc2FnZSBpZiB2YWxpZGF0aW9uIGZhaWxzLjwvcD4nICtcbiAgICAgICAgICAgICAgICAgICc8cD5UaGUgZ2xvYmFsIHZhcmlhYmxlcyA8c3Ryb25nPmlucHV0PC9zdHJvbmc+LCA8c3Ryb25nPmNvbXBvbmVudDwvc3Ryb25nPiwgYW5kIDxzdHJvbmc+dmFsaWQ8L3N0cm9uZz4gYXJlIHByb3ZpZGVkLjwvcD48L3NtYWxsPicgK1xuICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAnPGxhYmVsPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInByaXZhdGVcIiBuYW1lPVwicHJpdmF0ZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LnZhbGlkYXRlLmN1c3RvbVByaXZhdGVcIiBuZy1jaGVja2VkPVwiY29tcG9uZW50LnZhbGlkYXRlLmN1c3RvbVByaXZhdGVcIj4gPHN0cm9uZz5TZWNyZXQgVmFsaWRhdGlvbjwvc3Ryb25nPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8L2xhYmVsPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8cD5DaGVjayB0aGlzIGlmIHlvdSB3aXNoIHRvIHBlcmZvcm0gdGhlIHZhbGlkYXRpb24gT05MWSBvbiB0aGUgc2VydmVyIHNpZGUuIFRoaXMga2VlcHMgeW91ciB2YWxpZGF0aW9uIGxvZ2ljIHByaXZhdGUgYW5kIHNlY3JldC48L3A+JyArXG4gICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAnPC9kaXY+J1xuICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4qIEEgZGlyZWN0aXZlIGZvciBhIGZpZWxkIHRvIGVkaXQgYSBjb21wb25lbnQncyBrZXkuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIG5nLWNsYXNzPVwie1xcJ2hhcy13YXJuaW5nXFwnOiBzaG91bGRXYXJuQWJvdXRFbWJlZGRpbmcoKSB8fCAhY29tcG9uZW50LmtleX1cIj4nICtcbiAgICAgICAgICAgICAgICAnPGxhYmVsIGZvcj1cImtleVwiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIG5hbWUgb2YgdGhpcyBmaWVsZCBpbiB0aGUgQVBJIGVuZHBvaW50LlwiPlByb3BlcnR5IE5hbWU8L2xhYmVsPicgK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwia2V5XCIgbmFtZT1cImtleVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmtleVwiIHZhbGlkLWFwaS1rZXkgdmFsdWU9XCJ7eyBjb21wb25lbnQua2V5IH19XCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWRpc2FibGVkPVwiY29tcG9uZW50LnNvdXJjZVwiIG5nLWJsdXI9XCJvbkJsdXIoKVwiPicgK1xuICAgICAgICAgICAgICAgICc8cCBuZy1pZj1cInNob3VsZFdhcm5BYm91dEVtYmVkZGluZygpXCIgY2xhc3M9XCJoZWxwLWJsb2NrXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIj48L3NwYW4+ICcgK1xuICAgICAgICAgICAgICAgICAgJ1VzaW5nIGEgZG90IGluIHlvdXIgUHJvcGVydHkgTmFtZSB3aWxsIGxpbmsgdGhpcyBmaWVsZCB0byBhIGZpZWxkIGZyb20gYSBSZXNvdXJjZS4gRG9pbmcgdGhpcyBtYW51YWxseSBpcyBub3QgcmVjb21tZW5kZWQgYmVjYXVzZSB5b3Ugd2lsbCBleHBlcmllbmNlIHVuZXhwZWN0ZWQgYmVoYXZpb3IgaWYgdGhlIFJlc291cmNlIGZpZWxkIGlzIG5vdCBmb3VuZC4gSWYgeW91IHdpc2ggdG8gZW1iZWQgYSBSZXNvdXJjZSBmaWVsZCBpbiB5b3VyIGZvcm0sIHVzZSBhIGNvbXBvbmVudCBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIFJlc291cmNlIENvbXBvbmVudHMgY2F0ZWdvcnkgb24gdGhlIGxlZnQuJyArXG4gICAgICAgICAgICAgICAgJzwvcD4nICtcbiAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBbJyRzY29wZScsICdGb3JtaW9VdGlscycsIGZ1bmN0aW9uKCRzY29wZSwgRm9ybWlvVXRpbHMpIHtcbiAgICAgIHZhciBzdWZmaXhSZWdleCA9IC8oXFxkKykkLztcbiAgICAgIC8vIEFwcGVuZHMgYSBudW1iZXIgdG8gYSBjb21wb25lbnQua2V5IHRvIGtlZXAgaXQgdW5pcXVlXG4gICAgICB2YXIgdW5pcXVpZnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gJHNjb3BlLmNvbXBvbmVudC5rZXk7XG4gICAgICAgIHZhciB2YWxpZCA9IHRydWU7XG4gICAgICAgIEZvcm1pb1V0aWxzLmVhY2hDb21wb25lbnQoJHNjb3BlLmZvcm0uY29tcG9uZW50cywgZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5rZXkgPT09IG5ld1ZhbHVlICYmIGNvbXBvbmVudCAhPT0gJHNjb3BlLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1ZhbHVlLm1hdGNoKHN1ZmZpeFJlZ2V4KSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUucmVwbGFjZShzdWZmaXhSZWdleCwgZnVuY3Rpb24oc3VmZml4KSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHN1ZmZpeCkgKyAxO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIG5ld1ZhbHVlICs9ICcyJztcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuY29tcG9uZW50LmtleSA9IG5ld1ZhbHVlO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLiR3YXRjaCgnY29tcG9uZW50LmtleScsIHVuaXF1aWZ5KTtcblxuICAgICAgJHNjb3BlLm9uQmx1ciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuY29tcG9uZW50LmxvY2tLZXkgPSB0cnVlO1xuXG4gICAgICAgIC8vIElmIHRoZXkgdHJ5IHRvIGlucHV0IGFuIGVtcHR5IGtleSwgcmVmaWxsIGl0IHdpdGggZGVmYXVsdCBhbmQgbGV0IHVuaXF1aWZ5XG4gICAgICAgIC8vIG1ha2UgaXQgdW5pcXVlXG4gICAgICAgIGlmICghJHNjb3BlLmNvbXBvbmVudC5rZXkgJiYgJHNjb3BlLmZvcm1Db21wb25lbnRzWyRzY29wZS5jb21wb25lbnQudHlwZV0uc2V0dGluZ3Mua2V5KSB7XG4gICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5rZXkgPSAkc2NvcGUuZm9ybUNvbXBvbmVudHNbJHNjb3BlLmNvbXBvbmVudC50eXBlXS5zZXR0aW5ncy5rZXk7XG4gICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5sb2NrS2V5ID0gZmFsc2U7IC8vIEFsc28gdW5sb2NrIGtleVxuICAgICAgICAgIHVuaXF1aWZ5KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5zaG91bGRXYXJuQWJvdXRFbWJlZGRpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEkc2NvcGUuY29tcG9uZW50LnNvdXJjZSAmJiAkc2NvcGUuY29tcG9uZW50LmtleS5pbmRleE9mKCcuJykgIT09IC0xO1xuICAgICAgfTtcbiAgICB9XVxuICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzY29wZToge1xuICAgICAgICBjb21wb25lbnQ6ICc9JyxcbiAgICAgICAgZm9ybWlvOiAnPScsXG4gICAgICAgIGZvcm06ICc9JyxcbiAgICAgICAgLy8gIyBvZiBpdGVtcyBuZWVkZWQgaW4gdGhlIGxpc3QgYmVmb3JlIGhpZGluZyB0aGVcbiAgICAgICAgLy8gZHJhZyBhbmQgZHJvcCBwcm9tcHQgZGl2XG4gICAgICAgIGhpZGVEbmRCb3hDb3VudDogJz0nXG4gICAgICB9LFxuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBjb250cm9sbGVyOiAnZm9ybUJ1aWxkZXJEbmQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdmb3JtaW8vZm9ybWJ1aWxkZXIvcm93Lmh0bWwnXG4gICAgfTtcbiAgfVxuXTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBBIGRpcmVjdGl2ZSBmb3IgYSB0YWJsZSBidWlsZGVyXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRlbXBsYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImZvcm0tYnVpbGRlci10YWJsZVwiPicgK1xuICAgICAgICAnICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAnICAgIDxsYWJlbCBmb3I9XCJsYWJlbFwiPk51bWJlciBvZiBSb3dzPC9sYWJlbD4nICtcbiAgICAgICAgJyAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJudW1Sb3dzXCIgbmFtZT1cIm51bVJvd3NcIiBwbGFjZWhvbGRlcj1cIk51bWJlciBvZiBSb3dzXCIgbmctbW9kZWw9XCJjb21wb25lbnQubnVtUm93c1wiPicgK1xuICAgICAgICAnICA8L2Rpdj4nICtcbiAgICAgICAgJyAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgJyAgICA8bGFiZWwgZm9yPVwibGFiZWxcIj5OdW1iZXIgb2YgQ29sdW1uczwvbGFiZWw+JyArXG4gICAgICAgICcgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwibnVtQ29sc1wiIG5hbWU9XCJudW1Db2xzXCIgcGxhY2Vob2xkZXI9XCJOdW1iZXIgb2YgQ29sdW1uc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50Lm51bUNvbHNcIj4nICtcbiAgICAgICAgJyAgPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nO1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogW1xuICAgICAgJyRzY29wZScsXG4gICAgICBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgdmFyIGNoYW5nZVRhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLyplc2xpbnQtZGlzYWJsZSBtYXgtZGVwdGggKi9cbiAgICAgICAgICBpZiAoJHNjb3BlLmNvbXBvbmVudC5udW1Sb3dzICYmICRzY29wZS5jb21wb25lbnQubnVtQ29scykge1xuICAgICAgICAgICAgdmFyIHRtcFRhYmxlID0gW107XG4gICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LnJvd3Muc3BsaWNlKCRzY29wZS5jb21wb25lbnQubnVtUm93cyk7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCAkc2NvcGUuY29tcG9uZW50Lm51bVJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICAgIGlmICgkc2NvcGUuY29tcG9uZW50LnJvd3Nbcm93XSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQucm93c1tyb3ddLnNwbGljZSgkc2NvcGUuY29tcG9uZW50Lm51bUNvbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8ICRzY29wZS5jb21wb25lbnQubnVtQ29sczsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRtcFRhYmxlW3Jvd10pIHtcbiAgICAgICAgICAgICAgICAgIHRtcFRhYmxlW3Jvd10gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG1wVGFibGVbcm93XVtjb2xdID0ge2NvbXBvbmVudHM6W119O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LnJvd3MgPSBfLm1lcmdlKHRtcFRhYmxlLCAkc2NvcGUuY29tcG9uZW50LnJvd3MpO1xuICAgICAgICAgICAgLyplc2xpbnQtZW5hYmxlIG1heC1kZXB0aCAqL1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjb21wb25lbnQubnVtUm93cycsIGNoYW5nZVRhYmxlKTtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY29tcG9uZW50Lm51bUNvbHMnLCBjaGFuZ2VUYWJsZSk7XG4gICAgICB9XG4gICAgXVxuICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4qIEludm9rZXMgQm9vdHN0cmFwJ3MgcG9wb3ZlciBqcXVlcnkgcGx1Z2luIG9uIGFuIGVsZW1lbnRcbiogVG9vbHRpcCB0ZXh0IGNhbiBiZSBwcm92aWRlZCB2aWEgdGl0bGUgYXR0cmlidXRlIG9yXG4qIGFzIHRoZSB2YWx1ZSBmb3IgdGhpcyBkaXJlY3RpdmUuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICBpZiAoYXR0cnMuZm9ybUJ1aWxkZXJUb29sdGlwIHx8IGF0dHJzLnRpdGxlKSB7XG4gICAgICAgIHZhciB0b29sdGlwID0gYW5ndWxhci5lbGVtZW50KCc8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnbiB0ZXh0LW11dGVkXCI+PC9pPicpO1xuICAgICAgICB0b29sdGlwLnBvcG92ZXIoe1xuICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgdHJpZ2dlcjogJ21hbnVhbCcsXG4gICAgICAgICAgcGxhY2VtZW50OiAncmlnaHQnLFxuICAgICAgICAgIGNvbnRlbnQ6IGF0dHJzLnRpdGxlIHx8IGF0dHJzLmZvcm1CdWlsZGVyVG9vbHRpcFxuICAgICAgICB9KS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciAkc2VsZiA9IGFuZ3VsYXIuZWxlbWVudCh0aGlzKTtcbiAgICAgICAgICAkc2VsZi5wb3BvdmVyKCdzaG93Jyk7XG4gICAgICAgICAgJHNlbGYuc2libGluZ3MoJy5wb3BvdmVyJykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzZWxmLnBvcG92ZXIoJ2hpZGUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJHNlbGYgPSBhbmd1bGFyLmVsZW1lbnQodGhpcyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghYW5ndWxhci5lbGVtZW50KCcucG9wb3Zlcjpob3ZlcicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAkc2VsZi5wb3BvdmVyKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsLmFwcGVuZCgnICcpLmFwcGVuZCh0b29sdGlwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRyLCBjdHJsKSB7XG4gICAgICBjdHJsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShpbnB1dCk7XG4gICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkoJ2pzb25JbnB1dCcsIHRydWUpO1xuICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eSgnanNvbklucHV0JywgZmFsc2UpO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY3RybC4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eSgnanNvbklucHV0JywgZmFsc2UpO1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBzdHIgPSBhbmd1bGFyLnRvSnNvbihkYXRhLCB0cnVlKTtcbiAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eSgnanNvbklucHV0JywgdHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KCdqc29uSW5wdXQnLCBmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuKiBQcmV2ZW50cyB1c2VyIGlucHV0dGluZyBpbnZhbGlkIGFwaSBrZXkgY2hhcmFjdGVycy5cbiogVmFsaWQgY2hhcmFjdGVycyBmb3IgYW4gYXBpIGtleSBhcmUgYWxwaGFudW1lcmljIGFuZCBoeXBoZW5zXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBuZ01vZGVsKSB7XG4gICAgICB2YXIgaW52YWxpZFJlZ2V4ID0gL15bXkEtWmEtel0qfFteQS1aYS16MC05XFwtXFwuXFxbXFxdXSovZztcbiAgICAgIG5nTW9kZWwuJHBhcnNlcnMucHVzaChmdW5jdGlvbihpbnB1dFZhbHVlKSB7XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lZElucHV0ID0gaW5wdXRWYWx1ZS5yZXBsYWNlKGludmFsaWRSZWdleCwgJycpO1xuICAgICAgICBpZiAodHJhbnNmb3JtZWRJbnB1dCAhPT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZSh0cmFuc2Zvcm1lZElucHV0KTtcbiAgICAgICAgICBuZ01vZGVsLiRyZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWRJbnB1dDtcbiAgICAgfSk7XG4gICAgfVxuICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4qIEEgZGlyZWN0aXZlIHRoYXQgcHJvdmlkZXMgYSBVSSB0byBhZGQge3ZhbHVlLCBsYWJlbH0gb2JqZWN0cyB0byBhbiBhcnJheS5cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHNjb3BlOiB7XG4gICAgICBkYXRhOiAnPScsXG4gICAgICBsYWJlbDogJ0AnLFxuICAgICAgdG9vbHRpcFRleHQ6ICdAJyxcbiAgICAgIHZhbHVlTGFiZWw6ICdAJyxcbiAgICAgIGxhYmVsTGFiZWw6ICdAJyxcbiAgICAgIHZhbHVlUHJvcGVydHk6ICdAJyxcbiAgICAgIGxhYmVsUHJvcGVydHk6ICdAJ1xuICAgIH0sXG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAgICAgJzxsYWJlbCBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cInt7IHRvb2x0aXBUZXh0IH19XCI+e3sgbGFiZWwgfX08L2xhYmVsPicgK1xuICAgICAgICAgICAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1jb25kZW5zZWRcIj4nICtcbiAgICAgICAgICAgICAgICAgICc8dGhlYWQ+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dHI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgJzx0aCBjbGFzcz1cImNvbC14cy00XCI+e3sgdmFsdWVMYWJlbCB9fTwvdGg+JyArXG4gICAgICAgICAgICAgICAgICAgICAgJzx0aCBjbGFzcz1cImNvbC14cy02XCI+e3sgbGFiZWxMYWJlbCB9fTwvdGg+JyArXG4gICAgICAgICAgICAgICAgICAgICAgJzx0aCBjbGFzcz1cImNvbC14cy0yXCI+PC90aD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvdHI+JyArXG4gICAgICAgICAgICAgICAgICAnPC90aGVhZD4nICtcbiAgICAgICAgICAgICAgICAgICc8dGJvZHk+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dHIgbmctcmVwZWF0PVwidiBpbiBkYXRhIHRyYWNrIGJ5ICRpbmRleFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8dGQgY2xhc3M9XCJjb2wteHMtNFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmctbW9kZWw9XCJ2W3ZhbHVlUHJvcGVydHldXCIgcGxhY2Vob2xkZXI9XCJ7eyB2YWx1ZUxhYmVsIH19XCIvPjwvdGQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgJzx0ZCBjbGFzcz1cImNvbC14cy02XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuZy1tb2RlbD1cInZbbGFiZWxQcm9wZXJ0eV1cIiBwbGFjZWhvbGRlcj1cInt7IGxhYmVsTGFiZWwgfX1cIi8+PC90ZD4nICtcbiAgICAgICAgICAgICAgICAgICAgICAnPHRkIGNsYXNzPVwiY29sLXhzLTJcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi14c1wiIG5nLWNsaWNrPVwicmVtb3ZlVmFsdWUoJGluZGV4KVwiIHRhYmluZGV4PVwiLTFcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlLWNpcmNsZVwiPjwvc3Bhbj48L2J1dHRvbj48L3RkPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC90cj4nICtcbiAgICAgICAgICAgICAgICAgICc8L3Rib2R5PicgK1xuICAgICAgICAgICAgICAgICc8L3RhYmxlPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiIG5nLWNsaWNrPVwiYWRkVmFsdWUoKVwiPkFkZCB7eyB2YWx1ZUxhYmVsIH19PC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsLCBhdHRycykge1xuICAgICAgJHNjb3BlLnZhbHVlUHJvcGVydHkgPSAkc2NvcGUudmFsdWVQcm9wZXJ0eSB8fCAndmFsdWUnO1xuICAgICAgJHNjb3BlLmxhYmVsUHJvcGVydHkgPSAkc2NvcGUubGFiZWxQcm9wZXJ0eSB8fCAnbGFiZWwnO1xuICAgICAgJHNjb3BlLnZhbHVlTGFiZWwgPSAkc2NvcGUudmFsdWVMYWJlbCB8fCAnVmFsdWUnO1xuICAgICAgJHNjb3BlLmxhYmVsTGFiZWwgPSAkc2NvcGUubGFiZWxMYWJlbCB8fCAnTGFiZWwnO1xuXG4gICAgICAkc2NvcGUuYWRkVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICBvYmpbJHNjb3BlLnZhbHVlUHJvcGVydHldID0gJyc7XG4gICAgICAgIG9ialskc2NvcGUubGFiZWxQcm9wZXJ0eV0gPSAnJztcbiAgICAgICAgJHNjb3BlLmRhdGEucHVzaChvYmopO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLnJlbW92ZVZhbHVlID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgJHNjb3BlLmRhdGEuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH07XG5cbiAgICAgIGlmICgkc2NvcGUuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJHNjb3BlLmFkZFZhbHVlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghYXR0cnMubm9BdXRvY29tcGxldGVWYWx1ZSkge1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgLy8gSWdub3JlIGFycmF5IGFkZGl0aW9uL2RlbGV0aW9uIGNoYW5nZXNcbiAgICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoICE9PSBvbGRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfLm1hcChuZXdWYWx1ZSwgZnVuY3Rpb24oZW50cnksIGkpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeVskc2NvcGUubGFiZWxQcm9wZXJ0eV0gIT09IG9sZFZhbHVlW2ldWyRzY29wZS5sYWJlbFByb3BlcnR5XSkgey8vIGxhYmVsIGNoYW5nZWRcbiAgICAgICAgICAgICAgaWYgKGVudHJ5WyRzY29wZS52YWx1ZVByb3BlcnR5XSA9PT0gJycgfHwgZW50cnlbJHNjb3BlLnZhbHVlUHJvcGVydHldID09PSBfLmNhbWVsQ2FzZShvbGRWYWx1ZVtpXVskc2NvcGUubGFiZWxQcm9wZXJ0eV0pKSB7XG4gICAgICAgICAgICAgICAgZW50cnlbJHNjb3BlLnZhbHVlUHJvcGVydHldID0gXy5jYW1lbENhc2UoZW50cnlbJHNjb3BlLmxhYmVsUHJvcGVydHldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDcmVhdGUgYW4gQW5ndWxhckpTIHNlcnZpY2UgY2FsbGVkIGRlYm91bmNlXG5tb2R1bGUuZXhwb3J0cyA9IFsnJHRpbWVvdXQnLCckcScsIGZ1bmN0aW9uKCR0aW1lb3V0LCAkcSkge1xuICAvLyBUaGUgc2VydmljZSBpcyBhY3R1YWxseSB0aGlzIGZ1bmN0aW9uLCB3aGljaCB3ZSBjYWxsIHdpdGggdGhlIGZ1bmNcbiAgLy8gdGhhdCBzaG91bGQgYmUgZGVib3VuY2VkIGFuZCBob3cgbG9uZyB0byB3YWl0IGluIGJldHdlZW4gY2FsbHNcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgIHZhciB0aW1lb3V0O1xuICAgIC8vIENyZWF0ZSBhIGRlZmVycmVkIG9iamVjdCB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2hlbiB3ZSBuZWVkIHRvXG4gICAgLy8gYWN0dWFsbHkgY2FsbCB0aGUgZnVuY1xuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKSk7XG4gICAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIHRpbWVvdXQgKSB7XG4gICAgICAgICR0aW1lb3V0LmNhbmNlbCh0aW1lb3V0KTtcbiAgICAgIH1cbiAgICAgIHRpbWVvdXQgPSAkdGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZ1bmMuYXBwbHkoY29udGV4dCxhcmdzKSk7XG4gICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG4gIH07XG59XTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLypnbG9iYWwgd2luZG93OiBmYWxzZSwgY29uc29sZTogZmFsc2UgKi9cbi8qanNoaW50IGJyb3dzZXI6IHRydWUgKi9cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnbmdGb3JtQnVpbGRlcicsIFtcbiAgJ2Zvcm1pbycsXG4gICdkbmRMaXN0cycsXG4gICduZ0RpYWxvZycsXG4gICd1aS5ib290c3RyYXAuYWNjb3JkaW9uJyxcbiAgJ25nQ2tlZGl0b3InXG5dKTtcblxuYXBwLmNvbnN0YW50KCdGT1JNX09QVElPTlMnLCByZXF1aXJlKCcuL2NvbnN0YW50cy9mb3JtT3B0aW9ucycpKTtcblxuYXBwLmNvbnN0YW50KCdDT01NT05fT1BUSU9OUycsIHJlcXVpcmUoJy4vY29uc3RhbnRzL2NvbW1vbk9wdGlvbnMnKSk7XG5cbmFwcC5mYWN0b3J5KCdkZWJvdW5jZScsIHJlcXVpcmUoJy4vZmFjdG9yaWVzL2RlYm91bmNlJykpO1xuXG5hcHAuZGlyZWN0aXZlKCdmb3JtQnVpbGRlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlcicpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXJDb21wb25lbnQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJDb21wb25lbnQnKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyRWxlbWVudCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlckVsZW1lbnQnKSk7XG5cbmFwcC5jb250cm9sbGVyKCdmb3JtQnVpbGRlckRuZCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlckRuZCcpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXJMaXN0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyTGlzdCcpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXJSb3cnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJSb3cnKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2pzb25JbnB1dCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9qc29uSW5wdXQnKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyT3B0aW9uJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyT3B0aW9uJykpO1xuXG5hcHAuZGlyZWN0aXZlKCdmb3JtQnVpbGRlclRhYmxlJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyVGFibGUnKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyT3B0aW9uS2V5JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyT3B0aW9uS2V5JykpO1xuXG5hcHAuZGlyZWN0aXZlKCd2YWxpZEFwaUtleScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy92YWxpZEFwaUtleScpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXJPcHRpb25DdXN0b21WYWxpZGF0aW9uJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyT3B0aW9uQ3VzdG9tVmFsaWRhdGlvbicpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXJUb29sdGlwJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyVG9vbHRpcCcpKTtcblxuYXBwLmRpcmVjdGl2ZSgndmFsdWVCdWlsZGVyJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL3ZhbHVlQnVpbGRlcicpKTtcblxuLyoqXG4gKiBUaGlzIHdvcmthcm91bmQgaGFuZGxlcyB0aGUgZmFjdCB0aGF0IGlmcmFtZXMgY2FwdHVyZSBtb3VzZSBkcmFnXG4gKiBldmVudHMuIFRoaXMgaW50ZXJmZXJlcyB3aXRoIGRyYWdnaW5nIG92ZXIgY29tcG9uZW50cyBsaWtlIHRoZVxuICogQ29udGVudCBjb21wb25lbnQuIEFzIGEgd29ya2Fyb3VuZCwgd2Uga2VlcCB0cmFjayBvZiB0aGUgaXNEcmFnZ2luZ1xuICogZmxhZyBoZXJlIHRvIG92ZXJsYXkgaWZyYW1lcyB3aXRoIGEgZGl2IHdoaWxlIGRyYWdnaW5nLlxuICovXG5hcHAudmFsdWUoJ2RuZERyYWdJZnJhbWVXb3JrYXJvdW5kJywge1xuICBpc0RyYWdnaW5nOiBmYWxzZVxufSk7XG5cbmFwcC5ydW4oW1xuICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAnJHJvb3RTY29wZScsXG4gICduZ0RpYWxvZycsXG4gIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlLCAkcm9vdFNjb3BlLCBuZ0RpYWxvZykge1xuICAgIC8vIENsb3NlIGFsbCBvcGVuIGRpYWxvZ3Mgb24gc3RhdGUgY2hhbmdlLlxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgbmdEaWFsb2cuY2xvc2VBbGwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvZWRpdGJ1dHRvbnMuaHRtbCcsXG4gICAgICAnPGRpdiBjbGFzcz1cImNvbXBvbmVudC1idG4tZ3JvdXBcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4gYnRuLXh4cyBidG4tZGFuZ2VyIGNvbXBvbmVudC1zZXR0aW5ncy1idXR0b25cIiBzdHlsZT1cInotaW5kZXg6IDEwMDBcIiBuZy1jbGljaz1cInJlbW92ZUNvbXBvbmVudChjb21wb25lbnQsIGZvcm1Db21wb25lbnQuY29uZmlybVJlbW92ZSlcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCI+PC9zcGFuPjwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImJ0biBidG4teHhzIGJ0bi1kZWZhdWx0IGNvbXBvbmVudC1zZXR0aW5ncy1idXR0b25cIiBzdHlsZT1cInotaW5kZXg6IDEwMDBcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24gZ2x5cGhpY29uLW1vdmVcIj48L3NwYW4+PC9kaXY+JyArXG4gICAgICAgICc8ZGl2IG5nLWlmPVwiZm9ybUNvbXBvbmVudC52aWV3c1wiIGNsYXNzPVwiYnRuIGJ0bi14eHMgYnRuLWRlZmF1bHQgY29tcG9uZW50LXNldHRpbmdzLWJ1dHRvblwiIHN0eWxlPVwiei1pbmRleDogMTAwMFwiIG5nLWNsaWNrPVwiZWRpdENvbXBvbmVudChjb21wb25lbnQpXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNvZ1wiPjwvc3Bhbj48L2Rpdj4nICtcbiAgICAgICc8L2Rpdj4nXG4gICAgKTtcblxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2NvbXBvbmVudC5odG1sJyxcbiAgICAgICc8ZGl2IGNsYXNzPVwiY29tcG9uZW50LWZvcm0tZ3JvdXAgY29tcG9uZW50LXR5cGUte3sgY29tcG9uZW50LnR5cGUgfX0gZm9ybS1idWlsZGVyLWNvbXBvbmVudFwiPicgK1xuICAgICAgICAnPGRpdiBuZy1pbmNsdWRlPVwiXFwnZm9ybWlvL2Zvcm1idWlsZGVyL2VkaXRidXR0b25zLmh0bWxcXCdcIj48L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGhhcy1mZWVkYmFjayBmb3JtLWZpZWxkLXR5cGUte3sgY29tcG9uZW50LnR5cGUgfX0ge3tjb21wb25lbnQuY3VzdG9tQ2xhc3N9fVwiIGlkPVwiZm9ybS1ncm91cC17eyBjb21wb25lbnQua2V5IH19XCIgc3R5bGU9XCJwb3NpdGlvbjppbmhlcml0XCIgbmctc3R5bGU9XCJjb21wb25lbnQuc3R5bGVcIj48Zm9ybS1idWlsZGVyLWVsZW1lbnQ+PC9mb3JtLWJ1aWxkZXItZWxlbWVudD48L2Rpdj4nICtcbiAgICAgICc8L2Rpdj4nXG4gICAgKTtcblxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2xpc3QuaHRtbCcsXG4gICAgICAnPHVsIGNsYXNzPVwiY29tcG9uZW50LWxpc3RcIiAnICtcbiAgICAgICAgJ2RuZC1saXN0PVwiY29tcG9uZW50LmNvbXBvbmVudHNcIicgK1xuICAgICAgICAnZG5kLWRyb3A9XCJhZGRDb21wb25lbnQoaXRlbSwgaW5kZXgpXCI+JyArXG4gICAgICAgICc8bGkgbmctaWY9XCJjb21wb25lbnQuY29tcG9uZW50cy5sZW5ndGggPCBoaWRlQ291bnRcIj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWluZm9cIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyOyBtYXJnaW4tYm90dG9tOiA1cHg7XCIgcm9sZT1cImFsZXJ0XCI+JyArXG4gICAgICAgICAgICAnRHJhZyBhbmQgRHJvcCBhIGZvcm0gY29tcG9uZW50JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9saT4nICtcbiAgICAgICAgJzxsaSBuZy1yZXBlYXQ9XCJjb21wb25lbnQgaW4gY29tcG9uZW50LmNvbXBvbmVudHNcIiAnICtcbiAgICAgICAgICAnZG5kLWRyYWdnYWJsZT1cImNvbXBvbmVudFwiICcgK1xuICAgICAgICAgICdkbmQtZWZmZWN0LWFsbG93ZWQ9XCJtb3ZlXCIgJyArXG4gICAgICAgICAgJ2RuZC1kcmFnc3RhcnQ9XCJkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nID0gdHJ1ZVwiICcgK1xuICAgICAgICAgICdkbmQtZHJhZ2VuZD1cImRuZERyYWdJZnJhbWVXb3JrYXJvdW5kLmlzRHJhZ2dpbmcgPSBmYWxzZVwiICcgK1xuICAgICAgICAgICdkbmQtbW92ZWQ9XCJyZW1vdmVDb21wb25lbnQoY29tcG9uZW50LCBmYWxzZSlcIj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1jb21wb25lbnQ+PC9mb3JtLWJ1aWxkZXItY29tcG9uZW50PicgK1xuICAgICAgICAgIC8vIEZpeCBmb3IgcHJvYmxlbWF0aWMgY29tcG9uZW50cyB0aGF0IGFyZSBkaWZmaWN1bHQgdG8gZHJhZyBvdmVyXG4gICAgICAgICAgLy8gVGhpcyBpcyBlaXRoZXIgYmVjYXVzZSBvZiBpZnJhbWVzIG9yIGlzc3VlICMxMjYgaW4gYW5ndWxhci1kcmFnLWFuZC1kcm9wLWxpc3RzXG4gICAgICAgICAgJzxkaXYgbmctaWY9XCJkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nICYmICFmb3JtQ29tcG9uZW50Lm5vRG5kT3ZlcmxheVwiIGNsYXNzPVwiZG5kT3ZlcmxheVwiPjwvZGl2PicgK1xuICAgICAgICAnPC9saT4nICtcbiAgICAgICc8L3VsPidcbiAgICApO1xuXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvcm93Lmh0bWwnLFxuICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtYnVpbGRlci1yb3dcIj4nICtcbiAgICAgICc8bGFiZWwgbmctaWY9XCJjb21wb25lbnQubGFiZWxcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj57eyBjb21wb25lbnQubGFiZWwgfX08L2xhYmVsPicgK1xuICAgICAgJzx1bCBjbGFzcz1cImNvbXBvbmVudC1yb3cgZm9ybWJ1aWxkZXItZ3JvdXBcIiAnICtcbiAgICAgICAgJ2RuZC1saXN0PVwiY29tcG9uZW50LmNvbXBvbmVudHNcIicgK1xuICAgICAgICAnZG5kLWRyb3A9XCJhZGRDb21wb25lbnQoaXRlbSlcIicgK1xuICAgICAgICAnZG5kLWhvcml6b250YWwtbGlzdD1cInRydWVcIj4nICtcbiAgICAgICAgJzxsaSBuZy1yZXBlYXQ9XCJjb21wb25lbnQgaW4gY29tcG9uZW50LmNvbXBvbmVudHNcIiAnICtcbiAgICAgICAgICAnY2xhc3M9XCJmb3JtYnVpbGRlci1ncm91cC1yb3cgcHVsbC1sZWZ0XCIgJyArXG4gICAgICAgICAgJ2RuZC1kcmFnZ2FibGU9XCJjb21wb25lbnRcIiAnICtcbiAgICAgICAgICAnZG5kLWVmZmVjdC1hbGxvd2VkPVwibW92ZVwiICcgK1xuICAgICAgICAgICdkbmQtZHJhZ3N0YXJ0PVwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IHRydWVcIiAnICtcbiAgICAgICAgICAnZG5kLWRyYWdlbmQ9XCJkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nID0gZmFsc2VcIiAnICtcbiAgICAgICAgICAnZG5kLW1vdmVkPVwicmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudCwgZmFsc2UpXCI+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItY29tcG9uZW50PjwvZm9ybS1idWlsZGVyLWNvbXBvbmVudD4nICtcbiAgICAgICAgICAgIC8vIEZpeCBmb3IgcHJvYmxlbWF0aWMgY29tcG9uZW50cyB0aGF0IGFyZSBkaWZmaWN1bHQgdG8gZHJhZyBvdmVyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGVpdGhlciBiZWNhdXNlIG9mIGlmcmFtZXMgb3IgaXNzdWUgIzEyNiBpbiBhbmd1bGFyLWRyYWctYW5kLWRyb3AtbGlzdHNcbiAgICAgICAgICAnPGRpdiBuZy1pZj1cImRuZERyYWdJZnJhbWVXb3JrYXJvdW5kLmlzRHJhZ2dpbmcgJiYgIWZvcm1Db21wb25lbnQubm9EbmRPdmVybGF5XCIgY2xhc3M9XCJkbmRPdmVybGF5XCI+PC9kaXY+JyArXG4gICAgICAgICc8L2xpPicgK1xuICAgICAgICAnPGxpIGNsYXNzPVwiZm9ybWJ1aWxkZXItZ3JvdXAtcm93IGZvcm0tYnVpbGRlci1kcm9wXCIgbmctaWY9XCJjb21wb25lbnQuY29tcG9uZW50cy5sZW5ndGggPCBoaWRlQ291bnRcIj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWluZm9cIiByb2xlPVwiYWxlcnRcIj4nICtcbiAgICAgICAgICAgICdEcmFnIGFuZCBEcm9wIGEgZm9ybSBjb21wb25lbnQnICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2xpPicgK1xuICAgICAgJzwvdWw+JyArXG4gICAgICAnPGRpdiBzdHlsZT1cImNsZWFyOmJvdGg7XCI+PC9kaXY+JyArXG4gICAgICAnPC9kaXY+J1xuICAgICk7XG5cbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9idWlsZGVyLmh0bWwnLFxuICAgICAgJzxkaXYgY2xhc3M9XCJyb3cgZm9ybWJ1aWxkZXJcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtc20tMiBmb3JtY29tcG9uZW50c1wiPicgK1xuICAgICAgICAgICc8dWliLWFjY29yZGlvbiBjbG9zZS1vdGhlcnM9XCJ0cnVlXCI+JyArXG4gICAgICAgICAgICAnPHVpYi1hY2NvcmRpb24tZ3JvdXAgbmctcmVwZWF0PVwiKGdyb3VwTmFtZSwgZ3JvdXApIGluIGZvcm1Db21wb25lbnRHcm91cHNcIiBoZWFkaW5nPVwie3sgZ3JvdXAudGl0bGUgfX1cIiBpcy1vcGVuPVwiJGZpcnN0XCIgcGFuZWwtY2xhc3M9XCJwYW5lbC1kZWZhdWx0IHt7IGdyb3VwLnBhbmVsQ2xhc3MgfX1cIj4nICtcbiAgICAgICAgICAgICAgJzx1aWItYWNjb3JkaW9uIGNsb3NlLW90aGVycz1cInRydWVcIiBuZy1pZj1cImdyb3VwLnN1Ymdyb3Vwc1wiPicgK1xuICAgICAgICAgICAgICAgICc8dWliLWFjY29yZGlvbi1ncm91cCBuZy1yZXBlYXQ9XCIoc3ViZ3JvdXBOYW1lLCBzdWJncm91cCkgaW4gZ3JvdXAuc3ViZ3JvdXBzXCIgaGVhZGluZz1cInt7IHN1Ymdyb3VwLnRpdGxlIH19XCIgaXMtb3Blbj1cIiRmaXJzdFwiIHBhbmVsLWNsYXNzPVwicGFuZWwtZGVmYXVsdCBzdWJncm91cC1hY2NvcmRpb25cIj4nICtcbiAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLXJlcGVhdD1cImNvbXBvbmVudCBpbiBmb3JtQ29tcG9uZW50c0J5R3JvdXBbZ3JvdXBOYW1lXVtzdWJncm91cE5hbWVdXCIgbmctaWY9XCJjb21wb25lbnQudGl0bGVcIicgK1xuICAgICAgICAgICAgICAgICAgICAnZG5kLWRyYWdnYWJsZT1cImNvbXBvbmVudC5zZXR0aW5nc1wiJyArXG4gICAgICAgICAgICAgICAgICAgICdkbmQtZHJhZ3N0YXJ0PVwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IHRydWVcIiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2RuZC1kcmFnZW5kPVwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IGZhbHNlXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICdkbmQtZWZmZWN0LWFsbG93ZWQ9XCJjb3B5XCIgJyArXG4gICAgICAgICAgICAgICAgICAgICdjbGFzcz1cImZvcm1jb21wb25lbnRjb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXhzIGJ0bi1ibG9jayBmb3JtY29tcG9uZW50XCIgdGl0bGU9XCJ7e2NvbXBvbmVudC50aXRsZX19XCIgc3R5bGU9XCJvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aSBuZy1pZj1cImNvbXBvbmVudC5pY29uXCIgY2xhc3M9XCJ7eyBjb21wb25lbnQuaWNvbiB9fVwiPjwvaT4ge3sgY29tcG9uZW50LnRpdGxlIH19JyArXG4gICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPC91aWItYWNjb3JkaW9uLWdyb3VwPicgK1xuICAgICAgICAgICAgICAnPC91aWItYWNjb3JkaW9uPicgK1xuICAgICAgICAgICAgICAnPGRpdiBuZy1yZXBlYXQ9XCJjb21wb25lbnQgaW4gZm9ybUNvbXBvbmVudHNCeUdyb3VwW2dyb3VwTmFtZV1cIiBuZy1pZj1cIiFncm91cC5zdWJncm91cCAmJiBjb21wb25lbnQudGl0bGVcIicgK1xuICAgICAgICAgICAgICAgICdkbmQtZHJhZ2dhYmxlPVwiY29tcG9uZW50LnNldHRpbmdzXCInICtcbiAgICAgICAgICAgICAgICAnZG5kLWRyYWdzdGFydD1cImRuZERyYWdJZnJhbWVXb3JrYXJvdW5kLmlzRHJhZ2dpbmcgPSB0cnVlXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RuZC1kcmFnZW5kPVwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IGZhbHNlXCIgJyArXG4gICAgICAgICAgICAgICAgJ2RuZC1lZmZlY3QtYWxsb3dlZD1cImNvcHlcIiAnICtcbiAgICAgICAgICAgICAgICAnY2xhc3M9XCJmb3JtY29tcG9uZW50Y29udGFpbmVyXCI+JyArXG4gICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXhzIGJ0bi1ibG9jayBmb3JtY29tcG9uZW50XCIgdGl0bGU9XCJ7e2NvbXBvbmVudC50aXRsZX19XCIgc3R5bGU9XCJvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxpIG5nLWlmPVwiY29tcG9uZW50Lmljb25cIiBjbGFzcz1cInt7IGNvbXBvbmVudC5pY29uIH19XCI+PC9pPiB7eyBjb21wb25lbnQudGl0bGUgfX0nICtcbiAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L3VpYi1hY2NvcmRpb24tZ3JvdXA+JyArXG4gICAgICAgICAgJzwvdWliLWFjY29yZGlvbj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1zbS0xMCBmb3JtYnVpbGRlclwiPicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRyb3B6b25lXCI+JyArXG4gICAgICAgICAgICAgICAgJzxmb3JtLWJ1aWxkZXItbGlzdCBjb21wb25lbnQ9XCJmb3JtXCIgZm9ybT1cImZvcm1cIiBmb3JtaW89XCJmb3JtaW9cIiBoaWRlLWRuZC1ib3gtY291bnQ9XCIyXCIgY2xhc3M9XCJyb290bGlzdFwiPjwvZm9ybS1idWlsZGVyLWxpc3Q+JyArXG4gICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgJzwvZGl2PidcbiAgICApO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnQgbWFya3VwLlxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29uZmlybS1yZW1vdmUuaHRtbCcsXG4gICAgICAnPGZvcm0gaWQ9XCJjb25maXJtLXJlbW92ZS1kaWFsb2dcIj4nICtcbiAgICAgICAgICAgICc8cD5SZW1vdmluZyB0aGlzIGNvbXBvbmVudCB3aWxsIGFsc28gPHN0cm9uZz5yZW1vdmUgYWxsIG9mIGl0cyBjaGlsZHJlbjwvc3Ryb25nPiEgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRvIHRoaXM/PC9wPicgK1xuICAgICAgICAgICAgJzxkaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIG5nLWNsaWNrPVwiY2xvc2VUaGlzRGlhbG9nKHRydWUpXCI+UmVtb3ZlPC9idXR0b24+Jm5ic3A7JyArXG4gICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDVweDtcIiBuZy1jbGljaz1cImNsb3NlVGhpc0RpYWxvZyhmYWxzZSlcIj5DYW5jZWw8L2J1dHRvbj4mbmJzcDsnICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8L2Zvcm0+J1xuICAgICk7XG4gIH1cbl0pO1xuXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMnKTtcbiJdfQ==
