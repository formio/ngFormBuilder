(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  /**
   * Determine if a component is a layout component or not.
   *
   * @param {Object} component
   *   The component to check.
   *
   * @returns {Boolean}
   *   Whether or not the component is a layout component.
   */
  isLayoutComponent: function isLayoutComponent(component) {
    return (
      (component.columns && Array.isArray(component.columns)) ||
      (component.rows && Array.isArray(component.rows)) ||
      (component.components && Array.isArray(component.components))
    ) ? true : false;
  },

  /**
   * Iterate through each component within a form.
   *
   * @param {Object} components
   *   The components to iterate.
   * @param {Function} fn
   *   The iteration function to invoke for each component.
   * @param {Boolean} includeAll
   *   Whether or not to include layout components.
   * @param {String} path
   *   The current data path of the element. Example: data.user.firstName
   */
  eachComponent: function eachComponent(components, fn, includeAll, path) {
    if (!components) return;
    path = path || '';
    components.forEach(function(component) {
      var hasColumns = component.columns && Array.isArray(component.columns);
      var hasRows = component.rows && Array.isArray(component.rows);
      var hasComps = component.components && Array.isArray(component.components);
      var noRecurse = false;
      var newPath = component.key ? (path ? (path + '.' + component.key) : component.key) : '';

      if (includeAll || component.tree || (!hasColumns && !hasRows && !hasComps)) {
        noRecurse = fn(component, newPath);
      }

      var subPath = function() {
        if (component.key && ((component.type === 'datagrid') || (component.type === 'container'))) {
          return newPath;
        }
        return path;
      };

      if (!noRecurse) {
        if (hasColumns) {
          component.columns.forEach(function(column) {
            eachComponent(column.components, fn, includeAll, subPath());
          });
        }

        else if (hasRows) {
          [].concat.apply([], component.rows).forEach(function(row) {
            eachComponent(row.components, fn, includeAll, subPath());
          });
        }

        else if (hasComps) {
          eachComponent(component.components, fn, includeAll, subPath());
        }
      }
    });
  },

  /**
   * Get a component by its key
   *
   * @param {Object} components
   *   The components to iterate.
   * @param {String} key
   *   The key of the component to get.
   *
   * @returns {Object}
   *   The component that matches the given key, or undefined if not found.
   */
  getComponent: function getComponent(components, key) {
    var result;
    module.exports.eachComponent(components, function(component) {
      if (component.key === key) {
        result = component;
      }
    });
    return result;
  },

  /**
   * Flatten the form components for data manipulation.
   *
   * @param {Object} components
   *   The components to iterate.
   * @param {Boolean} includeAll
   *   Whether or not to include layout components.
   *
   * @returns {Object}
   *   The flattened components map.
   */
  flattenComponents: function flattenComponents(components, includeAll) {
    var flattened = {};
    module.exports.eachComponent(components, function(component, path) {
      flattened[path] = component;
    }, includeAll);
    return flattened;
  },

  /**
   * Get the value for a component key, in the given submission.
   *
   * @param {Object} submission
   *   A submission object to search.
   * @param {String} key
   *   A for components API key to search for.
   */
  getValue: function getValue(submission, key) {
    var data = submission.data || {};

    var search = function search(data) {
      var i;
      var value;

      if (!data) {
        return null;
      }

      if (data instanceof Array) {
        for (i = 0; i < data.length; i++) {
          if (typeof data[i] === 'object') {
            value = search(data[i]);
          }

          if (value) {
            return value;
          }
        }
      }
      else if (typeof data === 'object') {
        if (data.hasOwnProperty(key)) {
          return data[key];
        }

        var keys = Object.keys(data);
        for (i = 0; i < keys.length; i++) {
          if (typeof data[keys[i]] === 'object') {
            value = search(data[keys[i]]);
          }

          if (value) {
            return value;
          }
        }
      }
    };

    return search(data);
  }
};

},{}],2:[function(_dereq_,module,exports){
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<div class="form-group">' +
            '<label for="mapRegion" form-builder-tooltip="The region bias to use for this search. See <a href=\'https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes\' target=\'_blank\'>Region Biasing</a> for more information.">Region Bias</label>' +
            '<input type="text" class="form-control" id="mapRegion" name="mapRegion" ng-model="component.map.region" placeholder="Dallas" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="mapKey" form-builder-tooltip="The API key for Google Maps. See <a href=\'https://developers.google.com/maps/documentation/geocoding/get-api-key\' target=\'_blank\'>Get an API Key</a> for more information.">Google Maps API Key</label>' +
            '<input type="text" class="form-control" id="mapKey" name="mapKey" ng-model="component.map.key" placeholder="xxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxx"/>' +
          '</div>' +
          '<form-builder-option property="multiple" label="Allow Multiple Addresses"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],3:[function(_dereq_,module,exports){
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
        onEdit: ['$scope', function($scope) {
          $scope.actions = FORM_OPTIONS.actions;
          $scope.sizes = FORM_OPTIONS.sizes;
          $scope.themes = FORM_OPTIONS.themes;
        }],
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<div class="form-group" ng-if="component.action === \'event\'">' +
          '  <label for="event" form-builder-tooltip="The event to fire when the button is clicked.">Button Event</label>' +
          '  <input type="text" class="form-control" id="event" name="event" ng-model="component.event" placeholder="event" />' +
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

},{}],4:[function(_dereq_,module,exports){
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
            name: 'Data',
            template: 'formio/components/common/data.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],5:[function(_dereq_,module,exports){
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
        confirmRemove: true,
        views: [
          {
            name: 'Display',
            template: 'formio/components/columns/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ]
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/columns.html',
        '<div class="row">' +
          '<div class="col-xs-6 component-form-group" ng-repeat="component in component.columns">' +
            '<form-builder-list class="formio-column" component="component" form="form" formio="::formio"></form-builder-list>' +
          '</div>' +
        '</div>'
      );
      $templateCache.put('formio/components/columns/display.html',
        '<ng-form>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the component markup.
      $templateCache.put('formio/components/settings.html',
        '<form id="component-settings" novalidate>' +
          '<div class="row">' +
            '<div class="col-md-6">' +
              '<p class="lead" ng-if="::formComponent.title" style="margin-top:10px;">{{::formComponent.title}} Component</p>' +
            '</div>' +
            '<div class="col-md-6">' +
              '<div class="pull-right" ng-if="::formComponent.documentation" style="margin-top:10px; margin-right:20px;">' +
                '<a ng-href="{{ ::formComponent.documentation }}" target="_blank"><i class="glyphicon glyphicon-new-window"></i> Help!</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col-xs-6">' +
              '<uib-tabset>' +
                '<uib-tab ng-repeat="view in ::formComponent.views" heading="{{ ::view.name }}"><ng-include src="::view.template"></ng-include></uib-tab>' +
              '</uib-tabset>' +
            '</div>' +
            '<div class="col-xs-6">' +
              '<div class="panel panel-default preview-panel" style="margin-top:44px;">' +
                '<div class="panel-heading">Preview</div>' +
                '<div class="panel-body">' +
                  '<formio-component component="component" data="data" formio="::formio" builder="::builder"></formio-component>' +
                '</div>' +
              '</div>' +
              '<formio-settings-info component="component" data="data" formio="::formio"></formio-settings-info>' +
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
      $templateCache.put('formio/components/common/data.html',
        '<form-builder-option property="defaultValue"></form-builder-option>' +
        '<uib-accordion>' +
        '  <div uib-accordion-group heading="Custom Default Value" class="panel panel-default">' +
        '    <textarea class="form-control" rows="5" id="customDefaultValue" name="customDefaultValue" ng-model="component.customDefaultValue" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></textarea>' +
        '    <small>' +
        '      <p>Enter custom default value code.</p>' +
        '      <p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' +
        '      <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
        '      <p>Default Values are only calculated on form load. Use Calculated Value for a value that will update with the form.</p>' +
        '    </small>' +
        '  </div>' +
        '  <div uib-accordion-group heading="Calculated Value" class="panel panel-default">' +
        '    <textarea class="form-control" rows="5" id="calculateValue" name="calculateValue" ng-model="component.calculateValue" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></textarea>' +
        '    <small>' +
        '      <p>Enter code to calculate a value.</p>' +
        '      <p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' +
        '      <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
        '    </small>' +
        '  </div>' +
        '</uib-accordion>'
      );

      // Create the common API tab markup.
      $templateCache.put('formio/components/common/api.html',
        '<ng-form>' +
          '<form-builder-option-key></form-builder-option-key>' +
          '<form-builder-option-tags></form-builder-option-tags>' +
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

      // Create the common Layout tab markup.
      $templateCache.put('formio/components/common/conditional.html',
        '<form-builder-conditional></form-builder-conditional>'
      );
    }
  ]);
};

},{}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('container', {
        fbtemplate: 'formio/formbuilder/container.html',
        views: [
          {
            name: 'Display',
            template: 'formio/components/container/display.html'
          }, {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
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
        '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
        '</fieldset>'
      );
    }
  ]);
};

},{}],8:[function(_dereq_,module,exports){
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
        },
        views: [
          {
            name: 'Display',
            template: 'formio/components/common/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ]
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
      $templateCache.put('formio/components/common/display.html',
        '<ng-form>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('currency', {
        icon: 'fa fa-usd',
        views: [
          {
            name: 'Display',
            template: 'formio/components/currency/display.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/currency/validate.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#currency'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/currency/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      // Create the API markup.
      $templateCache.put('formio/components/currency/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],10:[function(_dereq_,module,exports){
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('datagrid', {
        fbtemplate: 'formio/formbuilder/datagrid.html',
        icon: 'fa fa-th',
        views: [
          {
            name: 'Display',
            template: 'formio/components/datagrid/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
        '<form-builder-option property="striped"></form-builder-option>' +
        '<form-builder-option property="bordered"></form-builder-option>' +
        '<form-builder-option property="hover"></form-builder-option>' +
        '<form-builder-option property="condensed"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="disabled"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],12:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('datetime', {
        onEdit: ['$scope', function($scope) {
          // FOR-34 - Update 12hr time display in the field, not only time picker.
          $scope.$watch('component.timePicker.showMeridian', function(value) {
            var _old = value ? 'HH' : 'hh';
            var _new = !value ? 'HH' : 'hh';

            if ($scope.component.enableTime) {
              $scope.component.format = $scope.component.format.toString().replace(_old, _new);
            }
          });

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
        }],
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="defaultDate"></form-builder-option>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="format" label="Date Format" placeholder="Enter the Date format" title="The format for displaying this field\'s date. The format must be specified like the <a href=\'https://docs.angularjs.org/api/ng/filter/date\' target=\'_blank\'>AngularJS date filter</a>."></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],13:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('day', {
        icon: 'fa fa-calendar',
        views: [
          {
            name: 'Display',
            template: 'formio/components/day/display.html'
          },
          {
            name: 'Data',
            template: 'formio/components/common/data.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/day/validate.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#day'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/day/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="fields.day.placeholder" label="Day Placeholder"></form-builder-option>' +
          '<form-builder-option property="fields.month.placeholder" label="Month Placeholder"></form-builder-option>' +
          '<form-builder-option property="fields.year.placeholder" label="Year Placeholder"></form-builder-option>' +
          '<form-builder-option property="dayFirst" type="checkbox" label="Day first" title="Display the Day field before the Month field."></form-builder-option>' +
          '<form-builder-option property="fields.day.hide" type="checkbox" label="Hide Day" title="Hide the day part of the component."></form-builder-option>' +
          '<form-builder-option property="fields.month.hide" type="checkbox" label="Hide Month" title="Hide the month part of the component."></form-builder-option>' +
          '<form-builder-option property="fields.year.hide" type="checkbox" label="Hide Year" title="Hide the year part of the component."></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/day/validate.html',
        '<ng-form>' +
          '<form-builder-option property="fields.day.required" label="Require Day" type="checkbox"></form-builder-option>' +
          '<form-builder-option property="fields.month.required" label="Require Month" type="checkbox"></form-builder-option>' +
          '<form-builder-option property="fields.year.required" label="Require Year" type="checkbox"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      var views = _.cloneDeep(formioComponentsProvider.$get().components.textfield.views);
      _.each(views, function(view) {
        if (view.name === 'Validation') {
          view.template = 'formio/components/email/validate.html';
        }
      });
      formioComponentsProvider.register('email', {
        icon: 'fa fa-at',
        views: views,
        documentation: 'http://help.form.io/userguide/#email'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/components/email/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="unique"></form-builder-option>' +
          '<div class="panel panel-default">' +
            '<div class="panel-heading"><h3 class="panel-title">Kickbox</h3></div>' +
            '<div class="panel-body">' +
              '<p>Validate this email using the Kickbox email validation service.</p>' +
              '<div class="checkbox">' +
                '<label for="kickbox-enable" form-builder-tooltip="Enable Kickbox validation for this email field.">' +
                  '<input type="checkbox" id="kickbox-enable" name="kickbox-enable" ng-model="component.kickbox.enabled"> Enable' +
                '</label>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<form-builder-option property="validate.minLength"></form-builder-option>' +
          '<form-builder-option property="validate.maxLength"></form-builder-option>' +
          '<form-builder-option property="validate.pattern"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],15:[function(_dereq_,module,exports){
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
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
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

},{}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(
      formioComponentsProvider
    ) {
      formioComponentsProvider.register('file', {
        onEdit: [
          '$scope',
          'Formio',
          function($scope, Formio) {
            // Pull out title and name from the list of storage plugins.
            $scope.storage = _.map(Formio.providers.storage, function(storage, key) {
              return {
                title: storage.title,
                name: key
              };
            });
          }
        ],
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="image"></form-builder-option>' +
          '<form-builder-option property="imageSize" ng-if="component.image"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],17:[function(_dereq_,module,exports){
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
            name: 'Data',
            template: 'formio/components/common/data.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/hidden/validation.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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

},{}],18:[function(_dereq_,module,exports){
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
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
        '<form-builder-option property="customClass" label="Container Custom Class"></form-builder-option>' +
          '<form-builder-option property="tag" label="HTML Tag" placeholder="HTML Element Tag" title="The tag of this HTML element."></form-builder-option>' +
          '<form-builder-option property="className" label="CSS Class" placeholder="CSS Class" title="The CSS class for this HTML element."></form-builder-option>' +
          '<value-builder ' +
            'data="component.attrs" ' +
            'label="Attributes" ' +
            'tooltip-text="The attributes for this HTML element. Only safe attributes are allowed, such as src, href, and title." ' +
            'value-property="value" ' +
            'label-property="attr" ' +
            'value-label="Value" ' +
            'label-label="Attribute" ' +
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

},{}],19:[function(_dereq_,module,exports){
"use strict";
var app = angular.module('ngFormBuilder');

// Basic
_dereq_('./components')(app);
_dereq_('./textfield')(app);
_dereq_('./number')(app);
_dereq_('./password')(app);
_dereq_('./textarea')(app);
_dereq_('./checkbox')(app);
_dereq_('./selectboxes')(app);
_dereq_('./select')(app);
_dereq_('./radio')(app);
_dereq_('./htmlelement')(app);
_dereq_('./content')(app);
_dereq_('./button')(app);

// Special
_dereq_('./email')(app);
_dereq_('./phonenumber')(app);
_dereq_('./address')(app);
_dereq_('./datetime')(app);
_dereq_('./day')(app);
_dereq_('./currency')(app);
_dereq_('./hidden')(app);
_dereq_('./resource')(app);
_dereq_('./file')(app);
_dereq_('./signature')(app);
_dereq_('./custom')(app);
_dereq_('./datagrid')(app);
_dereq_('./survey')(app);

// Layout
_dereq_('./columns')(app);
_dereq_('./fieldset')(app);
_dereq_('./container')(app);
_dereq_('./page')(app);
_dereq_('./panel')(app);
_dereq_('./table')(app);
_dereq_('./well')(app);

},{"./address":2,"./button":3,"./checkbox":4,"./columns":5,"./components":6,"./container":7,"./content":8,"./currency":9,"./custom":10,"./datagrid":11,"./datetime":12,"./day":13,"./email":14,"./fieldset":15,"./file":16,"./hidden":17,"./htmlelement":18,"./number":20,"./page":21,"./panel":22,"./password":23,"./phonenumber":24,"./radio":25,"./resource":26,"./select":27,"./selectboxes":28,"./signature":29,"./survey":30,"./table":31,"./textarea":32,"./textfield":33,"./well":34}],20:[function(_dereq_,module,exports){
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
            name: 'Data',
            template: 'formio/components/common/data.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],21:[function(_dereq_,module,exports){
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
        '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>'
      );
    }
  ]);
};

},{}],22:[function(_dereq_,module,exports){
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
        onEdit: ['$scope', function($scope) {
          $scope.themes = FORM_OPTIONS.themes;
        }],
        views: [
          {
            name: 'Display',
            template: 'formio/components/panel/display.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
            '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
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

},{}],23:[function(_dereq_,module,exports){
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],24:[function(_dereq_,module,exports){
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
            name: 'Data',
            template: 'formio/components/common/data.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('radio', {
        icon: 'fa fa-dot-circle-o',
        views: [
          {
            name: 'Display',
            template: 'formio/components/radio/display.html'
          },
          {
            name: 'Data',
            template: 'formio/components/common/data.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<value-builder data="component.values" default="component.defaultValue" label="Values" tooltip-text="The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form."></value-builder>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="inline" type="checkbox" label="Inline Layout" title="Displays the radio buttons horizontally."></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],26:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('resource', {
        onEdit: ['$scope', function($scope) {
          $scope.resources = [];
          $scope.component.project = $scope.formio.projectId;
          $scope.formio.loadForms({params: {type: 'resource', limit: 100}}).then(function(resources) {
            $scope.resources = resources;
            if (!$scope.component.resource) {
              $scope.component.resource = resources[0]._id;
            }
          });
        }],
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],27:[function(_dereq_,module,exports){
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
            name: 'Data',
            template: 'formio/components/select/data.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        onEdit: ['$scope', 'FormioUtils', function($scope, FormioUtils) {
          $scope.dataSources = {
            values: 'Values',
            json: 'Raw JSON',
            url: 'URL',
            resource: 'Resource',
            custom: 'Custom'
          };
          $scope.resources = [];
          $scope.resourceFields = [];

          // Returns only input fields we are interested in.
          var getInputFields = function(components) {
            var fields = [];
            FormioUtils.eachComponent(components, function(component) {
              if (component.key && component.input && (component.type !== 'button') && component.key !== $scope.component.key) {
                var comp = _.clone(component);
                if (!comp.label) {
                  comp.label = comp.key;
                }
                fields.push(comp);
              }
            });
            return fields;
          };

          $scope.formFields = [{label: 'Any Change', key: 'data'}].concat(getInputFields($scope.form.components));

          // Loads the selected fields.
          var loadFields = function() {
            if (!$scope.component.data.resource || ($scope.resources.length === 0)) {
              return;
            }
            var selected = null;
            $scope.resourceFields = [
              {
                property: '',
                title: '{Entire Object}'
              },
              {
                property: '_id',
                title: 'Submission Id'
              }
            ];
            if ($scope.formio.projectId) {
              $scope.component.data.project = $scope.formio.projectId;
            }
            for (var index in $scope.resources) {
              if ($scope.resources[index]._id.toString() === $scope.component.data.resource) {
                selected = $scope.resources[index];
                break;
              }
            }
            if (selected) {
              var fields = getInputFields(selected.components);
              for (var i in fields) {
                var field = fields[i];
                var title = field.label || field.key;
                $scope.resourceFields.push({
                  property: 'data.' + field.key,
                  title: title
                });
              }
              if (!$scope.component.valueProperty && $scope.resourceFields.length) {
                $scope.component.valueProperty = $scope.resourceFields[0].property;
              }
            }
          };

          $scope.$watch('component.dataSrc', function(source) {
            if (($scope.resources.length === 0) && (source === 'resource')) {
              $scope.formio.loadForms({params: {type: 'resource', limit: 4294967295}}).then(function(resources) {
                $scope.resources = resources;
                loadFields();
              });
            }
          });

          // Trigger when the resource changes.
          $scope.$watch('component.data.resource', function(resourceId) {
            if (!resourceId) {
              return;
            }
            loadFields();
          });

          // Update other parameters when the value property changes.
          $scope.currentValueProperty = $scope.component.valueProperty;
          $scope.$watch('component.valueProperty', function(property) {
            if ($scope.component.dataSrc === 'resource' && $scope.currentValueProperty !== property) {
              if (!property) {
                $scope.component.searchField = '';
                $scope.component.template = '<span>{{ item.data }}</span>';
              }
              else {
                $scope.component.searchField = property + '__regex';
                $scope.component.template = '<span>{{ item.' + property + ' }}</span>';
              }
            }
          });

          loadFields();
        }],
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
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/select/data.html',
        '<ng-form>' +
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
          '<div class="form-group" ng-switch-when="resource">' +
            '<label for="placeholder" form-builder-tooltip="The resource to be used with this field.">Resource</label>' +
            '<ui-select ui-select-required ui-select-open-on-focus ng-model="component.data.resource" theme="bootstrap">' +
              '<ui-select-match class="ui-select-match" placeholder="">' +
                '{{$select.selected.title}}' +
              '</ui-select-match>' +
              '<ui-select-choices class="ui-select-choices" repeat="value._id as value in resources | filter: $select.search" refresh="refreshSubmissions($select.search)" refresh-delay="250">' +
                '<div ng-bind-html="value.title | highlight: $select.search"></div>' +
              '</ui-select-choices>' +
            '</ui-select>' +
          '</div>' +
          '</ng-switch>' +
          '<form-builder-option ng-hide="component.dataSrc !== \'url\'" property="selectValues" label="Data Path" type="text" placeholder="The object path to the iterable items." title="The property within the source data, where iterable items reside. For example: results.items or results[0].items"></form-builder-option>' +
          '<form-builder-option ng-hide="component.dataSrc == \'values\' || component.dataSrc == \'resource\' || component.dataSrc == \'custom\'" property="valueProperty" label="Value Property" placeholder="The selected item\'s property to save." title="The property of each item in the data source to use as the select value. If not specified, the item itself will be used."></form-builder-option>' +
          '<div class="form-group" ng-hide="component.dataSrc !== \'resource\' || !component.data.resource || resourceFields.length == 0">' +
            '<label for="placeholder" form-builder-tooltip="The field to use as the value.">Value</label>' +
            '<select class="form-control" id="valueProperty" name="valueProperty" ng-options="value.property as value.title for value in resourceFields" ng-model="component.valueProperty"></select>' +
          '</div>' +
          '<div class="form-group" ng-if="component.dataSrc == \'resource\' && component.valueProperty === \'\'">' +
          '  <label for="placeholder" form-builder-tooltip="The properties on the resource to return as part of the options. Separate property names by commas. If left blank, all properties will be returned.">Select Fields</label>' +
          '  <input type="text" class="form-control" id="selectFields" name="selectFields" ng-model="component.selectFields" placeholder="Comma separated list of fields to select." value="{{ component.selectFields }}">' +
          '</div>' +
          '<form-builder-option ng-show="component.dataSrc == \'url\' || component.dataSrc == \'resource\'" property="searchField" label="Search Query Name" placeholder="Name of URL query parameter" title="The name of the search querystring parameter used when sending a request to filter results with. The server at the URL must handle this query parameter."></form-builder-option>' +
          '<form-builder-option ng-show="component.dataSrc == \'url\' || component.dataSrc == \'resource\'" property="filter" label="Filter Query" placeholder="The filter query for results." title="Use this to provide additional filtering using query parameters."></form-builder-option>' +
          '<div class="form-group" ng-show="component.dataSrc == \'custom\'">' +
          '  <label for="custom" form-builder-tooltip="Write custom code to return the value options. The form data object is available.">Custom Values</label>' +
          '  <textarea class="form-control" rows="10" id="custom" name="custom" ng-model="component.data.custom" placeholder="/*** Example Code ***/\nvalues = data[\'mykey\'];">{{ component.data.custom }}</textarea>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="placeholder" form-builder-tooltip="The HTML template for the result data items.">Item Template</label>' +
            '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
          '</div>' +
          '<div class="form-group" ng-hide="component.dataSrc == \'values\' || component.dataSrc == \'json\'">' +
          '  <label for="placeholder" form-builder-tooltip="Refresh data when another field changes.">Refresh On</label>' +
          '  <select class="form-control" id="refreshOn" name="refreshOn" ng-options="field.key as field.label for field in formFields" ng-model="component.refreshOn"></select>' +
          '</div>' +
          '<form-builder-option ng-show="component.dataSrc == \'resource\' || component.dataSrc == \'url\' || component.dataSrc == \'custom\'" property="clearOnRefresh"></form-builder-option>' +
          '<form-builder-option ng-show="component.dataSrc == \'url\'" property="authenticate"></form-builder-option>' +
        '</ng-form>'
      );

      // Create the API markup.
      $templateCache.put('formio/components/select/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="unique"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],28:[function(_dereq_,module,exports){
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],29:[function(_dereq_,module,exports){
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],30:[function(_dereq_,module,exports){
"use strict";
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('survey', {
        icon: 'fa fa-list',
        views: [
          {
            name: 'Display',
            template: 'formio/components/survey/display.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/survey/validate.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#survey'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/survey/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<value-builder data="component.questions" default="component.questions" label="Questions" tooltip-text="The questions you would like to as in this survey question."></value-builder>' +
          '<value-builder data="component.values" default="component.values" label="Values" tooltip-text="The values that can be selected per question. Example: \'Satisfied\', \'Very Satisfied\', etc."></value-builder>' +
          '<form-builder-option property="defaultValue"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="inline" type="checkbox" label="Inline Layout" title="Displays the radio buttons horizontally."></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
      // Create the API markup.
      $templateCache.put('formio/components/survey/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};

},{}],31:[function(_dereq_,module,exports){
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
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
                  '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
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

},{}],32:[function(_dereq_,module,exports){
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
            name: 'Data',
            template: 'formio/components/common/data.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#textarea'
      });
    }
  ]);
};

},{}],33:[function(_dereq_,module,exports){
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
            name: 'Data',
            template: 'formio/components/common/data.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
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
          '<form-builder-option property="disabled"></form-builder-option>' +
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

},{}],34:[function(_dereq_,module,exports){
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
        confirmRemove: true,
        views: [
          {
            name: 'Display',
            template: 'formio/components/common/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ]
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/well.html',
        '<div class="well">' +
          '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
        '</div>'
      );
      $templateCache.put('formio/components/common/display.html',
        '<ng-form>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
        '<ng-form>'
      );
    }
  ]);
};

},{}],35:[function(_dereq_,module,exports){
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
  defaultValue: {
    label: 'Default Value',
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.'
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
  authenticate: {
    label: 'Formio Authenticate',
    tooltip: 'Check this if you would like to use Formio Authentication with the request.',
    type: 'checkbox'
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
  disabled: {
    label: 'Disabled',
    type: 'checkbox',
    tooltip: 'Disable the form input.'
  },
  clearOnRefresh: {
    label: 'Clear Value On Refresh',
    type: 'checkbox',
    tooltip: 'When the Refresh On field is changed, clear the selected value.'
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
  image: {
    label: 'Display as images',
    type: 'checkbox',
    tooltip: 'Instead of a list of linked files, images will be rendered in the view.'
  },
  imageSize: {
    label: 'Image Size',
    placeholder: '100',
    tooltip: 'The image size for previewing images.'
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
  'defaultDate': {
    label: 'Default Value',
    placeholder: 'Default Value',
    tooltip: 'You can use Moment.js functions to set the default value to a specific date. For example: \n \n moment().subtract(10, \'days\').calendar();'
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

},{}],36:[function(_dereq_,module,exports){
"use strict";
module.exports = {
  actions: [
    {
      name: 'submit',
      title: 'Submit'
    },
    {
      name: 'event',
      title: 'Event'
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

},{}],37:[function(_dereq_,module,exports){
"use strict";
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

},{}],38:[function(_dereq_,module,exports){
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

},{}],39:[function(_dereq_,module,exports){
"use strict";
'use strict';

var utils = _dereq_('formio-utils');

module.exports = [
  function() {
    return {
      restrict: 'E',
      scope: true,
      template: '' +
        '<uib-accordion>' +
          '<div uib-accordion-group heading="Simple" class="panel panel-default" is-open="status.simple">' +
            'This component should Display:' +
            '<select class="form-control input-md" ng-model="component.conditional.show">' +
            '<option ng-repeat="item in _booleans track by $index" value="{{item}}">{{item.toString()}}</option>' +
            '</select>' +
            '<br>When the form component:' +
            '<select class="form-control input-md" ng-model="component.conditional.when">' +
            '<option ng-repeat="item in _components track by $index" value="{{item.key}}">{{item !== "" ? item.label + " (" + item.key + ")" : ""}}</option>' +
            '</select>' +
            '<br>Has the value:' +
            '<input type="text" class="form-control input-md" ng-model="component.conditional.eq">' +
          '</div>' +
          '<div uib-accordion-group heading="Advanced" class="panel panel-default" is-open="status.advanced">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.customConditional" placeholder="/*** Example Code ***/\nshow = (data[\'mykey\'] > 1);"></textarea>' +
            '<small>' +
            '<p>Enter custom conditional code.</p>' +
            '<p>You must assign the <strong>show</strong> variable as either <strong>true</strong> or <strong>false</strong>.</p>' +
            '<p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
            '<p><strong>Note: Advanced Conditional logic will override the results of the Simple Conditional logic.</strong></p>' +
            '</small>' +
          '</div>' +
        '</uib-accordion>',
      controller: [
        '$scope',
        function(
          $scope) {
          // Default the current components conditional logic.
          $scope.component = $scope.component || {};
          $scope.component.conditional = $scope.component.conditional || {};

          // The available logic functions.
          $scope._booleans = ['', 'true', 'false'];

          // Filter the list of available form components for conditional logic.
          $scope._components = _.get($scope, 'form.components') || [];
          $scope._components = utils.flattenComponents($scope._components);
          // Remove non-input/button fields because they don't make sense.
          // FA-890 - Dont allow the current component to be a conditional trigger.
          $scope._components = _.reject($scope._components, function(c) {
            return !c.input || (c.type === 'button') || (c.key === $scope.component.key) || (!c.label && !c.key);
          });

          // Add default item to the components list.
          $scope._components.unshift('');

          // Default and watch the show logic.
          $scope.component.conditional.show = $scope.component.conditional.show || '';
          // Coerce show var to supported value.
          var _booleanMap = {
            '': '',
            'true': 'true',
            'false': 'false'
          };
          $scope.component.conditional.show = _booleanMap.hasOwnProperty($scope.component.conditional.show)
            ? _booleanMap[$scope.component.conditional.show]
            : '';

          // Default and watch the when logic.
          $scope.component.conditional.when = $scope.component.conditional.when || null;

          // Default and watch the search logic.
          $scope.component.conditional.eq = $scope.component.conditional.eq || '';

          // Track the status of the accordion panels open state.
          $scope.status = {
            simple: !$scope.component.customConditional,
            advanced: !!$scope.component.customConditional
          };
        }
      ]
    };
  }
];

},{"formio-utils":1}],40:[function(_dereq_,module,exports){
"use strict";
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
          // Allow the component to add custom logic to the edit page.
          if (
            $scope.formComponent && $scope.formComponent.onEdit
          ) {
            $controller($scope.formComponent.onEdit, {$scope: $scope});
          }

          $scope.$watch('component.multiple', function(value) {
            $scope.data[$scope.component.key] = value ? [''] : '';
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

    // Add to scope so it can be used in templates
    $scope.dndDragIframeWorkaround = dndDragIframeWorkaround;
  }
];

},{}],41:[function(_dereq_,module,exports){
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
          $scope.builder = true;
          $scope.formComponent = formioComponents.components[$scope.component.type] || formioComponents.components.custom;
          if ($scope.formComponent.fbtemplate) {
            $scope.template = $scope.formComponent.fbtemplate;
          }
        }
      ]
    });
  }
];

},{}],42:[function(_dereq_,module,exports){
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
        hideDndBoxCount: '=',
        rootList: '='
      },
      restrict: 'E',
      replace: true,
      controller: 'formBuilderDnd',
      templateUrl: 'formio/formbuilder/list.html'
    };
  }
];

},{}],43:[function(_dereq_,module,exports){
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

      var input = angular.element('<input>');
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

      // Add min/max value floor values for validation.
      if (property === 'validate.minLength' || property === 'validate.maxLength') {
        inputAttrs.min = 0;
      }

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

},{}],44:[function(_dereq_,module,exports){
"use strict";
/**
* A directive for editing a component's custom validation.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: '' +
      '<div class="panel panel-default" id="accordion">' +
        '<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#validationSection">' +
          '<span class="panel-title">Custom Validation</span>' +
        '</div>' +
        '<div id="validationSection" class="panel-collapse collapse in">' +
          '<div class="panel-body">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';">{{ component.validate.custom }}</textarea>' +
            '<small>' +
              '<p>Enter custom validation code.</p>' +
              '<p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
              '<p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p>' +
            '</small>' +
            '<div class="well">' +
              '<div class="checkbox">' +
                '<label>' +
                  '<input type="checkbox" id="private" name="private" ng-model="component.validate.customPrivate" ng-checked="component.validate.customPrivate"> <strong>Secret Validation</strong>' +
                '</label>' +
              '</div>' +
              '<p>Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
  };
};

},{}],45:[function(_dereq_,module,exports){
"use strict";
/**
* A directive for a field to edit a component's key.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '<div class="form-group" ng-class="{\'has-warning\': shouldWarnAboutEmbedding()}">' +
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

      // Prebuild a list of existing components.
      var existingComponents = {};
      FormioUtils.eachComponent($scope.form.components, function(component) {
        // Don't add to existing components if current component or if it is new. (New could mean same as another item).
        if (component.key && ($scope.component.key !== component.key || $scope.component.isNew)) {
          existingComponents[component.key] = component;
        }
      }, true);

      var keyExists = function(component) {
        if (existingComponents.hasOwnProperty(component.key)) {
          return true;
        }
        return false;
      };

      var iterateKey = function(componentKey) {
        if (!componentKey.match(suffixRegex)) {
          return componentKey + '1';
        }

        return componentKey.replace(suffixRegex, function(suffix) {
          return Number(suffix) + 1;
        });
      };

      // Appends a number to a component.key to keep it unique
      var uniquify = function() {
        if (!$scope.component.key) {
          return;
        }
        while (keyExists($scope.component)) {
          $scope.component.key = iterateKey($scope.component.key);
        }
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
        if (!$scope.component || !$scope.component.key) {
          return false;
        }
        return !$scope.component.source && $scope.component.key.indexOf('.') !== -1;
      };
    }]
  };
};

},{}],46:[function(_dereq_,module,exports){
"use strict";
/**
* A directive for a field to edit a component's tags.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: function() {
      return '' +
        '<div class="form-group">' +
        '  <label class="control-label" form-builder-tooltip="Tag the field for use in custom logic.">Field Tags</label>' +
        '  <tags-input ng-model="tags" on-tag-added="addTag($tag)" on-tag-removed="removeTag($tag)"></tags-input>' +
        '</div>';
    },
    controller: ['$scope', function($scope) {
      $scope.component.tags = $scope.component.tags || [];
      $scope.tags = _.map($scope.component.tags, function(tag) {
        return {text: tag};
      });

      $scope.addTag = function(tag) {
        if (!$scope.component) {
          return;
        }
        if (!$scope.component.tags) {
          $scope.component.tags = [];
        }
        $scope.component.tags.push(tag.text);
      };
      $scope.removeTag = function(tag) {
        if ($scope.component.tags && $scope.component.tags.length) {
          var tagIndex = $scope.component.tags.indexOf(tag.text);
          if (tagIndex !== -1) {
            $scope.component.tags.splice(tagIndex, 1);
          }
        }
      };
    }]
  };
};

},{}],47:[function(_dereq_,module,exports){
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

},{}],48:[function(_dereq_,module,exports){
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
        $scope.builder = true;
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

},{}],49:[function(_dereq_,module,exports){
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

},{}],50:[function(_dereq_,module,exports){
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

},{}],51:[function(_dereq_,module,exports){
"use strict";
/*
* Prevents user inputting invalid api key characters.
* Valid characters for an api key are alphanumeric and hyphens
*/
module.exports = function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var invalidRegex = /^[^A-Za-z]+|[^A-Za-z0-9\-\.]+/g;
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

},{}],52:[function(_dereq_,module,exports){
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
                      '<th class="col-xs-6">{{ labelLabel }}</th>' +
                      '<th class="col-xs-4">{{ valueLabel }}</th>' +
                      '<th class="col-xs-2"></th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr ng-repeat="v in data track by $index">' +
                      '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v[labelProperty]" placeholder="{{ labelLabel }}"/></td>' +
                      '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v[valueProperty]" placeholder="{{ valueLabel }}"/></td>' +
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

},{}],53:[function(_dereq_,module,exports){
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

},{}],54:[function(_dereq_,module,exports){
"use strict";
/*! ng-formio-builder v2.5.2 | https://unpkg.com/ng-formio-builder@2.5.2/LICENSE.txt */
/*global window: false, console: false */
/*jshint browser: true */


var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ngCkeditor'
]);

app.constant('FORM_OPTIONS', _dereq_('./constants/formOptions'));

app.constant('COMMON_OPTIONS', _dereq_('./constants/commonOptions'));

app.factory('debounce', _dereq_('./factories/debounce'));

app.directive('formBuilder', _dereq_('./directives/formBuilder'));

app.directive('formBuilderComponent', _dereq_('./directives/formBuilderComponent'));

app.directive('formBuilderElement', _dereq_('./directives/formBuilderElement'));

app.controller('formBuilderDnd', _dereq_('./directives/formBuilderDnd'));

app.directive('formBuilderList', _dereq_('./directives/formBuilderList'));

app.directive('formBuilderRow', _dereq_('./directives/formBuilderRow'));

app.directive('jsonInput', _dereq_('./directives/jsonInput'));

app.directive('formBuilderOption', _dereq_('./directives/formBuilderOption'));

app.directive('formBuilderTable', _dereq_('./directives/formBuilderTable'));

app.directive('formBuilderOptionKey', _dereq_('./directives/formBuilderOptionKey'));

app.directive('formBuilderOptionTags', _dereq_('./directives/formBuilderOptionTags'));

app.directive('validApiKey', _dereq_('./directives/validApiKey'));

app.directive('formBuilderOptionCustomValidation', _dereq_('./directives/formBuilderOptionCustomValidation'));

app.directive('formBuilderTooltip', _dereq_('./directives/formBuilderTooltip'));

app.directive('valueBuilder', _dereq_('./directives/valueBuilder'));

app.directive('formBuilderConditional', _dereq_('./directives/formBuilderConditional'));

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
      "<div class=\"component-btn-group\">\n  <div class=\"btn btn-xxs btn-danger component-settings-button\" style=\"z-index: 1000\" ng-click=\"removeComponent(component, formComponent.confirmRemove)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n  <div ng-if=\"::!hideMoveButton\" class=\"btn btn-xxs btn-default component-settings-button\" style=\"z-index: 1000\"><span class=\"glyphicon glyphicon glyphicon-move\"></span></div>\n  <div ng-if=\"::formComponent.views\" class=\"btn btn-xxs btn-default component-settings-button\" style=\"z-index: 1000\" ng-click=\"editComponent(component)\"><span class=\"glyphicon glyphicon-cog\"></span></div>\n</div>\n"
    );

    $templateCache.put('formio/formbuilder/component.html',
      "<div class=\"component-form-group component-type-{{ component.type }} form-builder-component\">\n  <div ng-if=\"::!hideButtons\" ng-include=\"'formio/formbuilder/editbuttons.html'\"></div>\n  <div class=\"form-group has-feedback form-field-type-{{ component.type }} {{component.customClass}}\" id=\"form-group-{{ component.key }}\" style=\"position:inherit\" ng-style=\"component.style\">\n    <form-builder-element></form-builder-element>\n  </div>\n</div>\n"
    );

    $templateCache.put('formio/formbuilder/list.html',
      "<ul class=\"component-list\"\n    dnd-list=\"component.components\"\n    dnd-drop=\"addComponent(item, index)\">\n  <li ng-if=\"component.components.length < hideCount\">\n    <div class=\"alert alert-info\" style=\"text-align:center; margin-bottom: 5px;\" role=\"alert\">\n      Drag and Drop a form component\n    </div>\n  </li>\n  <!-- DO NOT PUT \"track by $index\" HERE SINCE DYNAMICALLY ADDING/REMOVING COMPONENTS WILL BREAK -->\n  <li ng-repeat=\"component in component.components\"\n      ng-if=\"!rootList || !form.display || (form.display === 'form') || (form.page === $index)\"\n      dnd-draggable=\"component\"\n      dnd-effect-allowed=\"move\"\n      dnd-dragstart=\"dndDragIframeWorkaround.isDragging = true\"\n      dnd-dragend=\"dndDragIframeWorkaround.isDragging = false\"\n      dnd-moved=\"removeComponent(component, false)\">\n    <form-builder-component ng-if=\"!component.hideBuilder\"></form-builder-component>\n    <div ng-if=\"dndDragIframeWorkaround.isDragging && !formComponent.noDndOverlay\" class=\"dndOverlay\"></div>\n  </li>\n</ul>\n"
    );

    $templateCache.put('formio/formbuilder/row.html',
      "<div class=\"formbuilder-row\">\n  <label ng-if=\"component.label\" class=\"control-label\">{{ component.label }}</label>\n  <ul class=\"component-row formbuilder-group\"\n      dnd-list=\"component.components\"\n      dnd-drop=\"addComponent(item, index)\"\n      dnd-horizontal-list=\"true\">\n    <li ng-repeat=\"component in component.components\"\n        class=\"formbuilder-group-row pull-left\"\n        dnd-draggable=\"component\"\n        dnd-effect-allowed=\"move\"\n        dnd-dragstart=\"dndDragIframeWorkaround.isDragging = true\"\n        dnd-dragend=\"dndDragIframeWorkaround.isDragging = false\"\n        dnd-moved=\"removeComponent(component, false)\">\n      <form-builder-component></form-builder-component>\n      <div ng-if=\"dndDragIframeWorkaround.isDragging && !formComponent.noDndOverlay\" class=\"dndOverlay\"></div>\n    </li>\n    <li class=\"formbuilder-group-row form-builder-drop\" ng-if=\"component.components.length < hideCount\">\n      <div class=\"alert alert-info\" role=\"alert\">\n        Drag and Drop a form component\n      </div>\n    </li>\n  </ul>\n  <div style=\"clear:both;\"></div>\n</div>\n"
    );

    $templateCache.put('formio/formbuilder/builder.html',
      "<div class=\"row formbuilder\">\n  <div class=\"col-xs-4 col-sm-3 col-md-2 formcomponents\">\n    <uib-accordion close-others=\"true\">\n      <div uib-accordion-group ng-repeat=\"(groupName, group) in formComponentGroups\" heading=\"{{ group.title }}\" is-open=\"$first\" class=\"panel panel-default form-builder-panel {{ group.panelClass }}\">\n        <uib-accordion close-others=\"true\" ng-if=\"group.subgroups\">\n          <div uib-accordion-group ng-repeat=\"(subgroupName, subgroup) in group.subgroups\" heading=\"{{ subgroup.title }}\" is-open=\"$first\" class=\"panel panel-default form-builder-panel subgroup-accordion\">\n            <div ng-repeat=\"component in formComponentsByGroup[groupName][subgroupName]\" ng-if=\"component.title\"\n                dnd-draggable=\"component.settings\"\n                dnd-dragstart=\"dndDragIframeWorkaround.isDragging = true\"\n                dnd-dragend=\"dndDragIframeWorkaround.isDragging = false\"\n                dnd-effect-allowed=\"copy\"\n                class=\"formcomponentcontainer\">\n              <span class=\"btn btn-primary btn-xs btn-block formcomponent\" title=\"{{component.title}}\" style=\"overflow: hidden; text-overflow: ellipsis;\">\n                <i ng-if=\"component.icon\" class=\"{{ component.icon }}\"></i> {{ component.title }}\n              </span>\n            </div>\n          </div>\n        </uib-accordion>\n        <div ng-repeat=\"component in formComponentsByGroup[groupName]\" ng-if=\"!group.subgroup && component.title\"\n            dnd-draggable=\"component.settings\"\n            dnd-dragstart=\"dndDragIframeWorkaround.isDragging = true\"\n            dnd-dragend=\"dndDragIframeWorkaround.isDragging = false\"\n            dnd-effect-allowed=\"copy\"\n            class=\"formcomponentcontainer\">\n          <span class=\"btn btn-primary btn-xs btn-block formcomponent\" title=\"{{component.title}}\" style=\"overflow: hidden; text-overflow: ellipsis;\">\n            <i ng-if=\"component.icon\" class=\"{{ component.icon }}\"></i> {{ component.title }}\n          </span>\n        </div>\n      </div>\n    </uib-accordion>\n  </div>\n  <div class=\"col-xs-8 col-sm-9 col-md-10 formarea\">\n    <ol class=\"breadcrumb\" ng-if=\"form.display === 'wizard'\">\n      <li ng-repeat=\"title in pages() track by $index\"><a class=\"label\" style=\"font-size:1em;\" ng-class=\"{'label-info': ($index === form.page), 'label-primary': ($index !== form.page)}\" ng-click=\"showPage($index)\">{{ title }}</a></li>\n      <li><a class=\"label label-success\" style=\"font-size:1em;\" ng-click=\"newPage()\" data-toggle=\"tooltip\" title=\"Create Page\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> page</a></li>\n    </ol>\n    <div class=\"dropzone\">\n      <form-builder-list component=\"form\" form=\"form\" formio=\"::formio\" hide-dnd-box-count=\"hideCount\" root-list=\"true\" class=\"rootlist\"></form-builder-list>\n    </div>\n  </div>\n</div>\n"
    );

    $templateCache.put('formio/formbuilder/datagrid.html',
      "<div class=\"datagrid-dnd dropzone\" ng-controller=\"formBuilderDnd\">\n  <label ng-if=\"component.label\" class=\"control-label\">{{ component.label }}</label>\n  <table class=\"table datagrid-table\" ng-class=\"{'table-striped': component.striped, 'table-bordered': component.bordered, 'table-hover': component.hover, 'table-condensed': component.condensed}\">\n    <tr>\n      <th style=\"padding:30px 0 10px 0\" ng-repeat=\"component in component.components\" ng-class=\"{'field-required': component.validate.required}\">\n        {{ (component.label || '') | formioTranslate:null:builder }}\n        <div ng-if=\"dndDragIframeWorkaround.isDragging && !formComponent.noDndOverlay\" class=\"dndOverlay\"></div>\n      </th>\n    </tr>\n    <tr\n      class=\"component-list\"\n      dnd-list=\"component.components\"\n      dnd-drop=\"addComponent(item, index)\"\n    >\n      <td\n        ng-repeat=\"component in component.components\"\n        ng-init=\"hideMoveButton = true; component.hideLabel = true\"\n        dnd-draggable=\"component\"\n        dnd-effect-allowed=\"move\"\n        dnd-dragstart=\"dndDragIframeWorkaround.isDragging = true\"\n        dnd-dragend=\"dndDragIframeWorkaround.isDragging = false\"\n        dnd-moved=\"removeComponent(component, false)\"\n      >\n        <div class=\"component-form-group component-type-{{ component.type }} form-builder-component\">\n          <div class=\"has-feedback form-field-type-{{ component.type }} {{component.customClass}}\" id=\"form-group-{{ component.key }}\" style=\"position:inherit\" ng-style=\"component.style\">\n            <div class=\"input-group\">\n              <form-builder-component></form-builder-component>\n            </div>\n          </div>\n        </div>\n      </td>\n      <td ng-if=\"component.components.length === 0\">\n        <div class=\"alert alert-info\" role=\"alert\">\n          Datagrid Components\n        </div>\n      </td>\n    </tr>\n  </table>\n  <div style=\"clear:both;\"></div>\n</div>\n"
    );

    $templateCache.put('formio/components/confirm-remove.html',
      "<form id=\"confirm-remove-dialog\">\n  <p>Removing this component will also <strong>remove all of its children</strong>! Are you sure you want to do this?</p>\n  <div>\n    <div class=\"form-group\">\n      <button type=\"submit\" class=\"btn btn-danger pull-right\" ng-click=\"closeThisDialog(true)\">Remove</button>&nbsp;\n      <button type=\"button\" class=\"btn btn-default pull-right\" style=\"margin-right: 5px;\" ng-click=\"closeThisDialog(false)\">Cancel</button>&nbsp;\n    </div>\n  </div>\n</form>\n"
    );
  }
]);

_dereq_('./components');

},{"./components":19,"./constants/commonOptions":35,"./constants/formOptions":36,"./directives/formBuilder":37,"./directives/formBuilderComponent":38,"./directives/formBuilderConditional":39,"./directives/formBuilderDnd":40,"./directives/formBuilderElement":41,"./directives/formBuilderList":42,"./directives/formBuilderOption":43,"./directives/formBuilderOptionCustomValidation":44,"./directives/formBuilderOptionKey":45,"./directives/formBuilderOptionTags":46,"./directives/formBuilderRow":47,"./directives/formBuilderTable":48,"./directives/formBuilderTooltip":49,"./directives/jsonInput":50,"./directives/validApiKey":51,"./directives/valueBuilder":52,"./factories/debounce":53}]},{},[54])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZm9ybWlvLXV0aWxzL3NyYy9pbmRleC5qcyIsInNyYy9jb21wb25lbnRzL2FkZHJlc3MuanMiLCJzcmMvY29tcG9uZW50cy9idXR0b24uanMiLCJzcmMvY29tcG9uZW50cy9jaGVja2JveC5qcyIsInNyYy9jb21wb25lbnRzL2NvbHVtbnMuanMiLCJzcmMvY29tcG9uZW50cy9jb21wb25lbnRzLmpzIiwic3JjL2NvbXBvbmVudHMvY29udGFpbmVyLmpzIiwic3JjL2NvbXBvbmVudHMvY29udGVudC5qcyIsInNyYy9jb21wb25lbnRzL2N1cnJlbmN5LmpzIiwic3JjL2NvbXBvbmVudHMvY3VzdG9tLmpzIiwic3JjL2NvbXBvbmVudHMvZGF0YWdyaWQuanMiLCJzcmMvY29tcG9uZW50cy9kYXRldGltZS5qcyIsInNyYy9jb21wb25lbnRzL2RheS5qcyIsInNyYy9jb21wb25lbnRzL2VtYWlsLmpzIiwic3JjL2NvbXBvbmVudHMvZmllbGRzZXQuanMiLCJzcmMvY29tcG9uZW50cy9maWxlLmpzIiwic3JjL2NvbXBvbmVudHMvaGlkZGVuLmpzIiwic3JjL2NvbXBvbmVudHMvaHRtbGVsZW1lbnQuanMiLCJzcmMvY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9jb21wb25lbnRzL251bWJlci5qcyIsInNyYy9jb21wb25lbnRzL3BhZ2UuanMiLCJzcmMvY29tcG9uZW50cy9wYW5lbC5qcyIsInNyYy9jb21wb25lbnRzL3Bhc3N3b3JkLmpzIiwic3JjL2NvbXBvbmVudHMvcGhvbmVudW1iZXIuanMiLCJzcmMvY29tcG9uZW50cy9yYWRpby5qcyIsInNyYy9jb21wb25lbnRzL3Jlc291cmNlLmpzIiwic3JjL2NvbXBvbmVudHMvc2VsZWN0LmpzIiwic3JjL2NvbXBvbmVudHMvc2VsZWN0Ym94ZXMuanMiLCJzcmMvY29tcG9uZW50cy9zaWduYXR1cmUuanMiLCJzcmMvY29tcG9uZW50cy9zdXJ2ZXkuanMiLCJzcmMvY29tcG9uZW50cy90YWJsZS5qcyIsInNyYy9jb21wb25lbnRzL3RleHRhcmVhLmpzIiwic3JjL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzIiwic3JjL2NvbXBvbmVudHMvd2VsbC5qcyIsInNyYy9jb25zdGFudHMvY29tbW9uT3B0aW9ucy5qcyIsInNyYy9jb25zdGFudHMvZm9ybU9wdGlvbnMuanMiLCJzcmMvZGlyZWN0aXZlcy9mb3JtQnVpbGRlci5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyQ29tcG9uZW50LmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJDb25kaXRpb25hbC5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyRG5kLmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJFbGVtZW50LmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJMaXN0LmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJPcHRpb24uanMiLCJzcmMvZGlyZWN0aXZlcy9mb3JtQnVpbGRlck9wdGlvbkN1c3RvbVZhbGlkYXRpb24uanMiLCJzcmMvZGlyZWN0aXZlcy9mb3JtQnVpbGRlck9wdGlvbktleS5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyT3B0aW9uVGFncy5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyUm93LmpzIiwic3JjL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJUYWJsZS5qcyIsInNyYy9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyVG9vbHRpcC5qcyIsInNyYy9kaXJlY3RpdmVzL2pzb25JbnB1dC5qcyIsInNyYy9kaXJlY3RpdmVzL3ZhbGlkQXBpS2V5LmpzIiwic3JjL2RpcmVjdGl2ZXMvdmFsdWVCdWlsZGVyLmpzIiwic3JjL2ZhY3Rvcmllcy9kZWJvdW5jZS5qcyIsInNyYy9uZ0Zvcm1CdWlsZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLyoqXG4gICAqIERldGVybWluZSBpZiBhIGNvbXBvbmVudCBpcyBhIGxheW91dCBjb21wb25lbnQgb3Igbm90LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50XG4gICAqICAgVGhlIGNvbXBvbmVudCB0byBjaGVjay5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqICAgV2hldGhlciBvciBub3QgdGhlIGNvbXBvbmVudCBpcyBhIGxheW91dCBjb21wb25lbnQuXG4gICAqL1xuICBpc0xheW91dENvbXBvbmVudDogZnVuY3Rpb24gaXNMYXlvdXRDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChjb21wb25lbnQuY29sdW1ucyAmJiBBcnJheS5pc0FycmF5KGNvbXBvbmVudC5jb2x1bW5zKSkgfHxcbiAgICAgIChjb21wb25lbnQucm93cyAmJiBBcnJheS5pc0FycmF5KGNvbXBvbmVudC5yb3dzKSkgfHxcbiAgICAgIChjb21wb25lbnQuY29tcG9uZW50cyAmJiBBcnJheS5pc0FycmF5KGNvbXBvbmVudC5jb21wb25lbnRzKSlcbiAgICApID8gdHJ1ZSA6IGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIHRocm91Z2ggZWFjaCBjb21wb25lbnQgd2l0aGluIGEgZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudHNcbiAgICogICBUaGUgY29tcG9uZW50cyB0byBpdGVyYXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiAgIFRoZSBpdGVyYXRpb24gZnVuY3Rpb24gdG8gaW52b2tlIGZvciBlYWNoIGNvbXBvbmVudC5cbiAgICogQHBhcmFtIHtCb29sZWFufSBpbmNsdWRlQWxsXG4gICAqICAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBsYXlvdXQgY29tcG9uZW50cy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogICBUaGUgY3VycmVudCBkYXRhIHBhdGggb2YgdGhlIGVsZW1lbnQuIEV4YW1wbGU6IGRhdGEudXNlci5maXJzdE5hbWVcbiAgICovXG4gIGVhY2hDb21wb25lbnQ6IGZ1bmN0aW9uIGVhY2hDb21wb25lbnQoY29tcG9uZW50cywgZm4sIGluY2x1ZGVBbGwsIHBhdGgpIHtcbiAgICBpZiAoIWNvbXBvbmVudHMpIHJldHVybjtcbiAgICBwYXRoID0gcGF0aCB8fCAnJztcbiAgICBjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICB2YXIgaGFzQ29sdW1ucyA9IGNvbXBvbmVudC5jb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoY29tcG9uZW50LmNvbHVtbnMpO1xuICAgICAgdmFyIGhhc1Jvd3MgPSBjb21wb25lbnQucm93cyAmJiBBcnJheS5pc0FycmF5KGNvbXBvbmVudC5yb3dzKTtcbiAgICAgIHZhciBoYXNDb21wcyA9IGNvbXBvbmVudC5jb21wb25lbnRzICYmIEFycmF5LmlzQXJyYXkoY29tcG9uZW50LmNvbXBvbmVudHMpO1xuICAgICAgdmFyIG5vUmVjdXJzZSA9IGZhbHNlO1xuICAgICAgdmFyIG5ld1BhdGggPSBjb21wb25lbnQua2V5ID8gKHBhdGggPyAocGF0aCArICcuJyArIGNvbXBvbmVudC5rZXkpIDogY29tcG9uZW50LmtleSkgOiAnJztcblxuICAgICAgaWYgKGluY2x1ZGVBbGwgfHwgY29tcG9uZW50LnRyZWUgfHwgKCFoYXNDb2x1bW5zICYmICFoYXNSb3dzICYmICFoYXNDb21wcykpIHtcbiAgICAgICAgbm9SZWN1cnNlID0gZm4oY29tcG9uZW50LCBuZXdQYXRoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN1YlBhdGggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5rZXkgJiYgKChjb21wb25lbnQudHlwZSA9PT0gJ2RhdGFncmlkJykgfHwgKGNvbXBvbmVudC50eXBlID09PSAnY29udGFpbmVyJykpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICB9O1xuXG4gICAgICBpZiAoIW5vUmVjdXJzZSkge1xuICAgICAgICBpZiAoaGFzQ29sdW1ucykge1xuICAgICAgICAgIGNvbXBvbmVudC5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oY29sdW1uKSB7XG4gICAgICAgICAgICBlYWNoQ29tcG9uZW50KGNvbHVtbi5jb21wb25lbnRzLCBmbiwgaW5jbHVkZUFsbCwgc3ViUGF0aCgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKGhhc1Jvd3MpIHtcbiAgICAgICAgICBbXS5jb25jYXQuYXBwbHkoW10sIGNvbXBvbmVudC5yb3dzKS5mb3JFYWNoKGZ1bmN0aW9uKHJvdykge1xuICAgICAgICAgICAgZWFjaENvbXBvbmVudChyb3cuY29tcG9uZW50cywgZm4sIGluY2x1ZGVBbGwsIHN1YlBhdGgoKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChoYXNDb21wcykge1xuICAgICAgICAgIGVhY2hDb21wb25lbnQoY29tcG9uZW50LmNvbXBvbmVudHMsIGZuLCBpbmNsdWRlQWxsLCBzdWJQYXRoKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhIGNvbXBvbmVudCBieSBpdHMga2V5XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnRzXG4gICAqICAgVGhlIGNvbXBvbmVudHMgdG8gaXRlcmF0ZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgKiAgIFRoZSBrZXkgb2YgdGhlIGNvbXBvbmVudCB0byBnZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqICAgVGhlIGNvbXBvbmVudCB0aGF0IG1hdGNoZXMgdGhlIGdpdmVuIGtleSwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGdldENvbXBvbmVudDogZnVuY3Rpb24gZ2V0Q29tcG9uZW50KGNvbXBvbmVudHMsIGtleSkge1xuICAgIHZhciByZXN1bHQ7XG4gICAgbW9kdWxlLmV4cG9ydHMuZWFjaENvbXBvbmVudChjb21wb25lbnRzLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgIGlmIChjb21wb25lbnQua2V5ID09PSBrZXkpIHtcbiAgICAgICAgcmVzdWx0ID0gY29tcG9uZW50O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZsYXR0ZW4gdGhlIGZvcm0gY29tcG9uZW50cyBmb3IgZGF0YSBtYW5pcHVsYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnRzXG4gICAqICAgVGhlIGNvbXBvbmVudHMgdG8gaXRlcmF0ZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBpbmNsdWRlQWxsXG4gICAqICAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBsYXlvdXQgY29tcG9uZW50cy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICogICBUaGUgZmxhdHRlbmVkIGNvbXBvbmVudHMgbWFwLlxuICAgKi9cbiAgZmxhdHRlbkNvbXBvbmVudHM6IGZ1bmN0aW9uIGZsYXR0ZW5Db21wb25lbnRzKGNvbXBvbmVudHMsIGluY2x1ZGVBbGwpIHtcbiAgICB2YXIgZmxhdHRlbmVkID0ge307XG4gICAgbW9kdWxlLmV4cG9ydHMuZWFjaENvbXBvbmVudChjb21wb25lbnRzLCBmdW5jdGlvbihjb21wb25lbnQsIHBhdGgpIHtcbiAgICAgIGZsYXR0ZW5lZFtwYXRoXSA9IGNvbXBvbmVudDtcbiAgICB9LCBpbmNsdWRlQWxsKTtcbiAgICByZXR1cm4gZmxhdHRlbmVkO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIGZvciBhIGNvbXBvbmVudCBrZXksIGluIHRoZSBnaXZlbiBzdWJtaXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3VibWlzc2lvblxuICAgKiAgIEEgc3VibWlzc2lvbiBvYmplY3QgdG8gc2VhcmNoLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAqICAgQSBmb3IgY29tcG9uZW50cyBBUEkga2V5IHRvIHNlYXJjaCBmb3IuXG4gICAqL1xuICBnZXRWYWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUoc3VibWlzc2lvbiwga2V5KSB7XG4gICAgdmFyIGRhdGEgPSBzdWJtaXNzaW9uLmRhdGEgfHwge307XG5cbiAgICB2YXIgc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoKGRhdGEpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHNlYXJjaChkYXRhW2ldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2tleXNbaV1dID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFsdWUgPSBzZWFyY2goZGF0YVtrZXlzW2ldXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzZWFyY2goZGF0YSk7XG4gIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdhZGRyZXNzJywge1xuICAgICAgICBpY29uOiAnZmEgZmEtaG9tZScsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9hZGRyZXNzL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvYWRkcmVzcy92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jYWRkcmVzcydcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9hZGRyZXNzL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwbGFjZWhvbGRlclwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJpbmRleFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwibWFwUmVnaW9uXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgcmVnaW9uIGJpYXMgdG8gdXNlIGZvciB0aGlzIHNlYXJjaC4gU2VlIDxhIGhyZWY9XFwnaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2dlb2NvZGluZy9pbnRybyNSZWdpb25Db2Rlc1xcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPlJlZ2lvbiBCaWFzaW5nPC9hPiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cIj5SZWdpb24gQmlhczwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cIm1hcFJlZ2lvblwiIG5hbWU9XCJtYXBSZWdpb25cIiBuZy1tb2RlbD1cImNvbXBvbmVudC5tYXAucmVnaW9uXCIgcGxhY2Vob2xkZXI9XCJEYWxsYXNcIiAvPicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwibWFwS2V5XCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgQVBJIGtleSBmb3IgR29vZ2xlIE1hcHMuIFNlZSA8YSBocmVmPVxcJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9nZW9jb2RpbmcvZ2V0LWFwaS1rZXlcXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5HZXQgYW4gQVBJIEtleTwvYT4gZm9yIG1vcmUgaW5mb3JtYXRpb24uXCI+R29vZ2xlIE1hcHMgQVBJIEtleTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cIm1hcEtleVwiIG5hbWU9XCJtYXBLZXlcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5tYXAua2V5XCIgcGxhY2Vob2xkZXI9XCJ4eHh4eHh4eHh4eHh4eHh4eHh4LXh4eHh4eHh4eHh4eHh4eHh4eHhcIi8+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cIm11bHRpcGxlXCIgbGFiZWw9XCJBbGxvdyBNdWx0aXBsZSBBZGRyZXNzZXNcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvYWRkcmVzcy92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInVuaXF1ZVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICAnRk9STV9PUFRJT05TJyxcbiAgICBmdW5jdGlvbihcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcixcbiAgICAgIEZPUk1fT1BUSU9OU1xuICAgICkge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdidXR0b24nLCB7XG4gICAgICAgIG9uRWRpdDogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAkc2NvcGUuYWN0aW9ucyA9IEZPUk1fT1BUSU9OUy5hY3Rpb25zO1xuICAgICAgICAgICRzY29wZS5zaXplcyA9IEZPUk1fT1BUSU9OUy5zaXplcztcbiAgICAgICAgICAkc2NvcGUudGhlbWVzID0gRk9STV9PUFRJT05TLnRoZW1lcztcbiAgICAgICAgfV0sXG4gICAgICAgIGljb246ICdmYSBmYS1zdG9wJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2J1dHRvbi9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNidXR0b24nXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvYnV0dG9uL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiYWN0aW9uXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGlzIGlzIHRoZSBhY3Rpb24gdG8gYmUgcGVyZm9ybWVkIGJ5IHRoaXMgYnV0dG9uLlwiPkFjdGlvbjwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiYWN0aW9uXCIgbmFtZT1cImFjdGlvblwiIG5nLW9wdGlvbnM9XCJhY3Rpb24ubmFtZSBhcyBhY3Rpb24udGl0bGUgZm9yIGFjdGlvbiBpbiBhY3Rpb25zXCIgbmctbW9kZWw9XCJjb21wb25lbnQuYWN0aW9uXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIG5nLWlmPVwiY29tcG9uZW50LmFjdGlvbiA9PT0gXFwnZXZlbnRcXCdcIj4nICtcbiAgICAgICAgICAnICA8bGFiZWwgZm9yPVwiZXZlbnRcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBldmVudCB0byBmaXJlIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLlwiPkJ1dHRvbiBFdmVudDwvbGFiZWw+JyArXG4gICAgICAgICAgJyAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImV2ZW50XCIgbmFtZT1cImV2ZW50XCIgbmctbW9kZWw9XCJjb21wb25lbnQuZXZlbnRcIiBwbGFjZWhvbGRlcj1cImV2ZW50XCIgLz4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInRoZW1lXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgY29sb3IgdGhlbWUgb2YgdGhpcyBwYW5lbC5cIj5UaGVtZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwidGhlbWVcIiBuYW1lPVwidGhlbWVcIiBuZy1vcHRpb25zPVwidGhlbWUubmFtZSBhcyB0aGVtZS50aXRsZSBmb3IgdGhlbWUgaW4gdGhlbWVzXCIgbmctbW9kZWw9XCJjb21wb25lbnQudGhlbWVcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInNpemVcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBzaXplIG9mIHRoaXMgYnV0dG9uLlwiPlNpemU8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInNpemVcIiBuYW1lPVwic2l6ZVwiIG5nLW9wdGlvbnM9XCJzaXplLm5hbWUgYXMgc2l6ZS50aXRsZSBmb3Igc2l6ZSBpbiBzaXplc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LnNpemVcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGVmdEljb25cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicmlnaHRJY29uXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImJsb2NrXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRpc2FibGVPbkludmFsaWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2NoZWNrYm94Jywge1xuICAgICAgICBpY29uOiAnZmEgZmEtY2hlY2stc3F1YXJlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NoZWNrYm94L2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEYXRhJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2RhdGEuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY2hlY2tib3gvdmFsaWRhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2NoZWNrYm94J1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2NoZWNrYm94L2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJpbmRleFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcm90ZWN0ZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGVyc2lzdGVudFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJkaXNhYmxlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJsZVZpZXdcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9jaGVja2JveC92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdjb2x1bW5zJywge1xuICAgICAgICBmYnRlbXBsYXRlOiAnZm9ybWlvL2Zvcm1idWlsZGVyL2NvbHVtbnMuaHRtbCcsXG4gICAgICAgIGljb246ICdmYSBmYS1jb2x1bW5zJyxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNjb2x1bW5zJyxcbiAgICAgICAgbm9EbmRPdmVybGF5OiB0cnVlLFxuICAgICAgICBjb25maXJtUmVtb3ZlOiB0cnVlLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29sdW1ucy9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9jb2x1bW5zLmh0bWwnLFxuICAgICAgICAnPGRpdiBjbGFzcz1cInJvd1wiPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXhzLTYgY29tcG9uZW50LWZvcm0tZ3JvdXBcIiBuZy1yZXBlYXQ9XCJjb21wb25lbnQgaW4gY29tcG9uZW50LmNvbHVtbnNcIj4nICtcbiAgICAgICAgICAgICc8Zm9ybS1idWlsZGVyLWxpc3QgY2xhc3M9XCJmb3JtaW8tY29sdW1uXCIgY29tcG9uZW50PVwiY29tcG9uZW50XCIgZm9ybT1cImZvcm1cIiBmb3JtaW89XCI6OmZvcm1pb1wiPjwvZm9ybS1idWlsZGVyLWxpc3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICAgKTtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29sdW1ucy9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnQgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9zZXR0aW5ncy5odG1sJyxcbiAgICAgICAgJzxmb3JtIGlkPVwiY29tcG9uZW50LXNldHRpbmdzXCIgbm92YWxpZGF0ZT4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cInJvd1wiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtbWQtNlwiPicgK1xuICAgICAgICAgICAgICAnPHAgY2xhc3M9XCJsZWFkXCIgbmctaWY9XCI6OmZvcm1Db21wb25lbnQudGl0bGVcIiBzdHlsZT1cIm1hcmdpbi10b3A6MTBweDtcIj57ezo6Zm9ybUNvbXBvbmVudC50aXRsZX19IENvbXBvbmVudDwvcD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLW1kLTZcIj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0XCIgbmctaWY9XCI6OmZvcm1Db21wb25lbnQuZG9jdW1lbnRhdGlvblwiIHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4OyBtYXJnaW4tcmlnaHQ6MjBweDtcIj4nICtcbiAgICAgICAgICAgICAgICAnPGEgbmctaHJlZj1cInt7IDo6Zm9ybUNvbXBvbmVudC5kb2N1bWVudGF0aW9uIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW5ldy13aW5kb3dcIj48L2k+IEhlbHAhPC9hPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwicm93XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC14cy02XCI+JyArXG4gICAgICAgICAgICAgICc8dWliLXRhYnNldD4nICtcbiAgICAgICAgICAgICAgICAnPHVpYi10YWIgbmctcmVwZWF0PVwidmlldyBpbiA6OmZvcm1Db21wb25lbnQudmlld3NcIiBoZWFkaW5nPVwie3sgOjp2aWV3Lm5hbWUgfX1cIj48bmctaW5jbHVkZSBzcmM9XCI6OnZpZXcudGVtcGxhdGVcIj48L25nLWluY2x1ZGU+PC91aWItdGFiPicgK1xuICAgICAgICAgICAgICAnPC91aWItdGFic2V0PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wteHMtNlwiPicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHQgcHJldmlldy1wYW5lbFwiIHN0eWxlPVwibWFyZ2luLXRvcDo0NHB4O1wiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlByZXZpZXc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj4nICtcbiAgICAgICAgICAgICAgICAgICc8Zm9ybWlvLWNvbXBvbmVudCBjb21wb25lbnQ9XCJjb21wb25lbnRcIiBkYXRhPVwiZGF0YVwiIGZvcm1pbz1cIjo6Zm9ybWlvXCIgYnVpbGRlcj1cIjo6YnVpbGRlclwiPjwvZm9ybWlvLWNvbXBvbmVudD4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgJzxmb3JtaW8tc2V0dGluZ3MtaW5mbyBjb21wb25lbnQ9XCJjb21wb25lbnRcIiBkYXRhPVwiZGF0YVwiIGZvcm1pbz1cIjo6Zm9ybWlvXCI+PC9mb3JtaW8tc2V0dGluZ3MtaW5mbz4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgbmctY2xpY2s9XCJjbG9zZVRoaXNEaWFsb2codHJ1ZSlcIj5TYXZlPC9idXR0b24+Jm5ic3A7JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctY2xpY2s9XCJjbG9zZVRoaXNEaWFsb2coZmFsc2UpXCIgbmctaWY9XCIhY29tcG9uZW50LmlzTmV3XCI+Q2FuY2VsPC9idXR0b24+Jm5ic3A7JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiBuZy1jbGljaz1cInJlbW92ZUNvbXBvbmVudChjb21wb25lbnQsIGZvcm1Db21wb25lbnRzW2NvbXBvbmVudC50eXBlXS5jb25maXJtUmVtb3ZlKTsgY2xvc2VUaGlzRGlhbG9nKGZhbHNlKVwiPlJlbW92ZTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9mb3JtPidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgY29tbW9uIEFQSSB0YWIgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vZGF0YS5odG1sJyxcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGVmYXVsdFZhbHVlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPHVpYi1hY2NvcmRpb24+JyArXG4gICAgICAgICcgIDxkaXYgdWliLWFjY29yZGlvbi1ncm91cCBoZWFkaW5nPVwiQ3VzdG9tIERlZmF1bHQgVmFsdWVcIiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj4nICtcbiAgICAgICAgJyAgICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiByb3dzPVwiNVwiIGlkPVwiY3VzdG9tRGVmYXVsdFZhbHVlXCIgbmFtZT1cImN1c3RvbURlZmF1bHRWYWx1ZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmN1c3RvbURlZmF1bHRWYWx1ZVwiIHBsYWNlaG9sZGVyPVwiLyoqKiBFeGFtcGxlIENvZGUgKioqL1xcbnZhbHVlID0gZGF0YVtcXCdteWtleVxcJ10gKyBkYXRhW1xcJ2Fub3RoZXJLZXlcXCddO1wiPjwvdGV4dGFyZWE+JyArXG4gICAgICAgICcgICAgPHNtYWxsPicgK1xuICAgICAgICAnICAgICAgPHA+RW50ZXIgY3VzdG9tIGRlZmF1bHQgdmFsdWUgY29kZS48L3A+JyArXG4gICAgICAgICcgICAgICA8cD5Zb3UgbXVzdCBhc3NpZ24gdGhlIDxzdHJvbmc+dmFsdWU8L3N0cm9uZz4gdmFyaWFibGUgYXMgdGhlIHJlc3VsdCB5b3Ugd2FudCBmb3IgdGhlIGRlZmF1bHQgdmFsdWUuPC9wPicgK1xuICAgICAgICAnICAgICAgPHA+VGhlIGdsb2JhbCB2YXJpYWJsZSA8c3Ryb25nPmRhdGE8L3N0cm9uZz4gaXMgcHJvdmlkZWQsIGFuZCBhbGxvd3MgeW91IHRvIGFjY2VzcyB0aGUgZGF0YSBvZiBhbnkgZm9ybSBjb21wb25lbnQsIGJ5IHVzaW5nIGl0cyBBUEkga2V5LjwvcD4nICtcbiAgICAgICAgJyAgICAgIDxwPkRlZmF1bHQgVmFsdWVzIGFyZSBvbmx5IGNhbGN1bGF0ZWQgb24gZm9ybSBsb2FkLiBVc2UgQ2FsY3VsYXRlZCBWYWx1ZSBmb3IgYSB2YWx1ZSB0aGF0IHdpbGwgdXBkYXRlIHdpdGggdGhlIGZvcm0uPC9wPicgK1xuICAgICAgICAnICAgIDwvc21hbGw+JyArXG4gICAgICAgICcgIDwvZGl2PicgK1xuICAgICAgICAnICA8ZGl2IHVpYi1hY2NvcmRpb24tZ3JvdXAgaGVhZGluZz1cIkNhbGN1bGF0ZWQgVmFsdWVcIiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj4nICtcbiAgICAgICAgJyAgICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiByb3dzPVwiNVwiIGlkPVwiY2FsY3VsYXRlVmFsdWVcIiBuYW1lPVwiY2FsY3VsYXRlVmFsdWVcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5jYWxjdWxhdGVWYWx1ZVwiIHBsYWNlaG9sZGVyPVwiLyoqKiBFeGFtcGxlIENvZGUgKioqL1xcbnZhbHVlID0gZGF0YVtcXCdteWtleVxcJ10gKyBkYXRhW1xcJ2Fub3RoZXJLZXlcXCddO1wiPjwvdGV4dGFyZWE+JyArXG4gICAgICAgICcgICAgPHNtYWxsPicgK1xuICAgICAgICAnICAgICAgPHA+RW50ZXIgY29kZSB0byBjYWxjdWxhdGUgYSB2YWx1ZS48L3A+JyArXG4gICAgICAgICcgICAgICA8cD5Zb3UgbXVzdCBhc3NpZ24gdGhlIDxzdHJvbmc+dmFsdWU8L3N0cm9uZz4gdmFyaWFibGUgYXMgdGhlIHJlc3VsdCB5b3Ugd2FudCBmb3IgdGhlIGRlZmF1bHQgdmFsdWUuPC9wPicgK1xuICAgICAgICAnICAgICAgPHA+VGhlIGdsb2JhbCB2YXJpYWJsZSA8c3Ryb25nPmRhdGE8L3N0cm9uZz4gaXMgcHJvdmlkZWQsIGFuZCBhbGxvd3MgeW91IHRvIGFjY2VzcyB0aGUgZGF0YSBvZiBhbnkgZm9ybSBjb21wb25lbnQsIGJ5IHVzaW5nIGl0cyBBUEkga2V5LjwvcD4nICtcbiAgICAgICAgJyAgICA8L3NtYWxsPicgK1xuICAgICAgICAnICA8L2Rpdj4nICtcbiAgICAgICAgJzwvdWliLWFjY29yZGlvbj4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIGNvbW1vbiBBUEkgdGFiIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1rZXk+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWtleT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24tdGFncz48L2Zvcm0tYnVpbGRlci1vcHRpb24tdGFncz4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIGNvbW1vbiBMYXlvdXQgdGFiIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgIC8vIE5lZWQgdG8gdXNlIGFycmF5IG5vdGF0aW9uIHRvIGhhdmUgZGFzaCBpbiBuYW1lXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3R5bGVbXFwnbWFyZ2luLXRvcFxcJ11cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3R5bGVbXFwnbWFyZ2luLXJpZ2h0XFwnXVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdHlsZVtcXCdtYXJnaW4tYm90dG9tXFwnXVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdHlsZVtcXCdtYXJnaW4tbGVmdFxcJ11cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBjb21tb24gTGF5b3V0IHRhYiBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJyxcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItY29uZGl0aW9uYWw+PC9mb3JtLWJ1aWxkZXItY29uZGl0aW9uYWw+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2NvbnRhaW5lcicsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9jb250YWluZXIuaHRtbCcsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb250YWluZXIvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jY29udGFpbmVyJyxcbiAgICAgICAgbm9EbmRPdmVybGF5OiB0cnVlLFxuICAgICAgICBjb25maXJtUmVtb3ZlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuXG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29udGFpbmVyL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcm90ZWN0ZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9jb250YWluZXIuaHRtbCcsXG4gICAgICAgICc8ZmllbGRzZXQ+JyArXG4gICAgICAgICc8bGFiZWwgbmctaWY9XCJjb21wb25lbnQubGFiZWxcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj57eyBjb21wb25lbnQubGFiZWwgfX08L2xhYmVsPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cImNvbXBvbmVudFwiIGZvcm09XCJmb3JtXCIgZm9ybWlvPVwiOjpmb3JtaW9cIj48L2Zvcm0tYnVpbGRlci1saXN0PicgK1xuICAgICAgICAnPC9maWVsZHNldD4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcignY29udGVudCcsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9jb250ZW50Lmh0bWwnLFxuICAgICAgICBpY29uOiAnZmEgZmEtaHRtbDUnLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2NvbnRlbnQtY29tcG9uZW50JyxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oc2V0dGluZ3MsICRzY29wZSkge1xuICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudC5odG1sJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2Zvcm1CdWlsZGVyOnVwZGF0ZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2NvbnRlbnQuaHRtbCcsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICc8dGV4dGFyZWEgY2tlZGl0b3IgbmctbW9kZWw9XCJjb21wb25lbnQuaHRtbFwiPjx0ZXh0YXJlYT4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICAgICk7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2N1cnJlbmN5Jywge1xuICAgICAgICBpY29uOiAnZmEgZmEtdXNkJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2N1cnJlbmN5L2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY3VycmVuY3kvdmFsaWRhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2N1cnJlbmN5J1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2N1cnJlbmN5L2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwbGFjZWhvbGRlclwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcmVmaXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3VmZml4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cIm11bHRpcGxlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRpc2FibGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIEFQSSBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2N1cnJlbmN5L3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPjwvZm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcignY3VzdG9tJywge1xuICAgICAgICBpY29uOiAnZmEgZmEtY3ViZXMnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY3VzdG9tL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNjdXN0b20nXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuXG4gIGFwcC5jb250cm9sbGVyKCdjdXN0b21Db21wb25lbnQnLCBbXG4gICAgJyRzY29wZScsXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHMnLFxuICAgIGZ1bmN0aW9uKFxuICAgICAgJHNjb3BlLFxuICAgICAgZm9ybWlvQ29tcG9uZW50c1xuICAgICkge1xuICAgICAgLy8gQmVjYXVzZSBvZiB0aGUgd2VpcmRuZXNzZXMgb2YgcHJvdG90eXBlIGluaGVyaXRlbmNlLCBjb21wb25lbnRzIGNhbid0IHVwZGF0ZSB0aGVtc2VsdmVzLCBvbmx5IHRoZWlyIHByb3BlcnRpZXMuXG4gICAgICAkc2NvcGUuJHdhdGNoKCdjb21wb25lbnQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgYSB0eXBlIG9mIGEgcmVhbCB0eXBlLlxuICAgICAgICAgIG5ld1ZhbHVlLnR5cGUgPSAoZm9ybWlvQ29tcG9uZW50cy5jb21wb25lbnRzLmhhc093blByb3BlcnR5KG5ld1ZhbHVlLnR5cGUpID8gJ2N1c3RvbScgOiBuZXdWYWx1ZS50eXBlKTtcbiAgICAgICAgICAvLyBFbnN1cmUgc29tZSBrZXkgc2V0dGluZ3MgYXJlIHNldC5cbiAgICAgICAgICBuZXdWYWx1ZS5rZXkgPSBuZXdWYWx1ZS5rZXkgfHwgbmV3VmFsdWUudHlwZTtcbiAgICAgICAgICBuZXdWYWx1ZS5wcm90ZWN0ZWQgPSAobmV3VmFsdWUuaGFzT3duUHJvcGVydHkoJ3Byb3RlY3RlZCcpID8gbmV3VmFsdWUucHJvdGVjdGVkIDogZmFsc2UpO1xuICAgICAgICAgIG5ld1ZhbHVlLnBlcnNpc3RlbnQgPSAobmV3VmFsdWUuaGFzT3duUHJvcGVydHkoJ3BlcnNpc3RlbnQnKSA/IG5ld1ZhbHVlLnBlcnNpc3RlbnQgOiB0cnVlKTtcbiAgICAgICAgICAkc2NvcGUudXBkYXRlQ29tcG9uZW50KG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG5cbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2N1c3RvbS9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAnPHA+Q3VzdG9tIGNvbXBvbmVudHMgY2FuIGJlIHVzZWQgdG8gcmVuZGVyIHNwZWNpYWwgZmllbGRzIG9yIHdpZGdldHMgaW5zaWRlIHlvdXIgYXBwLiBGb3IgaW5mb3JtYXRpb24gb24gaG93IHRvIGRpc3BsYXkgaW4gYW4gYXBwLCBzZWUgPGEgaHJlZj1cImh0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNjdXN0b21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5jdXN0b20gY29tcG9uZW50IGRvY3VtZW50YXRpb248L2E+LjwvcD4nICtcbiAgICAgICAgJzxsYWJlbCBmb3I9XCJqc29uXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJFbnRlciB0aGUgSlNPTiBmb3IgdGhpcyBjdXN0b20gZWxlbWVudC5cIj5DdXN0b20gRWxlbWVudCBKU09OPC9sYWJlbD4nICtcbiAgICAgICAgJzx0ZXh0YXJlYSBuZy1jb250cm9sbGVyPVwiY3VzdG9tQ29tcG9uZW50XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImpzb25cIiBuYW1lPVwianNvblwiIGpzb24taW5wdXQgbmctbW9kZWw9XCJjb21wb25lbnRcIiBwbGFjZWhvbGRlcj1cInt9XCIgcm93cz1cIjEwXCI+PC90ZXh0YXJlYT4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdkYXRhZ3JpZCcsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9kYXRhZ3JpZC5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXRoJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2RhdGFncmlkL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jZGF0YWdyaWQnLFxuICAgICAgICBub0RuZE92ZXJsYXk6IHRydWUsXG4gICAgICAgIGNvbmZpcm1SZW1vdmU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG5cbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9kYXRhZ3JpZC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJhZGRBbm90aGVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwic3RyaXBlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiYm9yZGVyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImhvdmVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjb25kZW5zZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGVyc2lzdGVudFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcignZGF0ZXRpbWUnLCB7XG4gICAgICAgIG9uRWRpdDogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAvLyBGT1ItMzQgLSBVcGRhdGUgMTJociB0aW1lIGRpc3BsYXkgaW4gdGhlIGZpZWxkLCBub3Qgb25seSB0aW1lIHBpY2tlci5cbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdjb21wb25lbnQudGltZVBpY2tlci5zaG93TWVyaWRpYW4nLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIF9vbGQgPSB2YWx1ZSA/ICdISCcgOiAnaGgnO1xuICAgICAgICAgICAgdmFyIF9uZXcgPSAhdmFsdWUgPyAnSEgnIDogJ2hoJztcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5jb21wb25lbnQuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LmZvcm1hdCA9ICRzY29wZS5jb21wb25lbnQuZm9ybWF0LnRvU3RyaW5nKCkucmVwbGFjZShfb2xkLCBfbmV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRzY29wZS5zZXRGb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY29tcG9uZW50LmVuYWJsZURhdGUgJiYgJHNjb3BlLmNvbXBvbmVudC5lbmFibGVUaW1lKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQuZm9ybWF0ID0gJ3l5eXktTU0tZGQgSEg6bW0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoJHNjb3BlLmNvbXBvbmVudC5lbmFibGVEYXRlICYmICEkc2NvcGUuY29tcG9uZW50LmVuYWJsZVRpbWUpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5mb3JtYXQgPSAneXl5eS1NTS1kZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghJHNjb3BlLmNvbXBvbmVudC5lbmFibGVEYXRlICYmICRzY29wZS5jb21wb25lbnQuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LmZvcm1hdCA9ICdISDptbSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICAkc2NvcGUuc3RhcnRpbmdEYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuICAgICAgICAgICRzY29wZS5tb2RlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ2RheScsXG4gICAgICAgICAgICAgIGxhYmVsOiAnRGF5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ21vbnRoJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdNb250aCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICd5ZWFyJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdZZWFyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgIH1dLFxuICAgICAgICBpY29uOiAnZmEgZmEtY2xvY2stbycsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9kYXRldGltZS9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGF0ZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2RhdGV0aW1lL2RhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdUaW1lJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvZGF0ZXRpbWUvdGltZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9kYXRldGltZS92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jZGF0ZXRpbWUnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvZGF0ZXRpbWUvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRlZmF1bHREYXRlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBsYWNlaG9sZGVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZvcm1hdFwiIGxhYmVsPVwiRGF0ZSBGb3JtYXRcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHRoZSBEYXRlIGZvcm1hdFwiIHRpdGxlPVwiVGhlIGZvcm1hdCBmb3IgZGlzcGxheWluZyB0aGlzIGZpZWxkXFwncyBkYXRlLiBUaGUgZm9ybWF0IG11c3QgYmUgc3BlY2lmaWVkIGxpa2UgdGhlIDxhIGhyZWY9XFwnaHR0cHM6Ly9kb2NzLmFuZ3VsYXJqcy5vcmcvYXBpL25nL2ZpbHRlci9kYXRlXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+QW5ndWxhckpTIGRhdGUgZmlsdGVyPC9hPi5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvZGF0ZXRpbWUvZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJFbmFibGVzIGRhdGUgaW5wdXQgZm9yIHRoaXMgZmllbGQuXCI+JyArXG4gICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJlbmFibGVEYXRlXCIgbmFtZT1cImVuYWJsZURhdGVcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5lbmFibGVEYXRlXCIgbmctY2hlY2tlZD1cImNvbXBvbmVudC5lbmFibGVEYXRlXCIgbmctY2hhbmdlPVwic2V0Rm9ybWF0KClcIj4gRW5hYmxlIERhdGUgSW5wdXQnICtcbiAgICAgICAgICAgICc8L2xhYmVsPicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiZGF0ZXBpY2tlck1vZGVcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBpbml0aWFsIHZpZXcgdG8gZGlzcGxheSB3aGVuIGNsaWNraW5nIG9uIHRoaXMgZmllbGQuXCI+SW5pdGlhbCBNb2RlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJkYXRlcGlja2VyTW9kZVwiIG5hbWU9XCJkYXRlcGlja2VyTW9kZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmRhdGVwaWNrZXJNb2RlXCIgbmctb3B0aW9ucz1cIm1vZGUubmFtZSBhcyBtb2RlLmxhYmVsIGZvciBtb2RlIGluIG1vZGVzXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGNhbiBiZSBwaWNrZWQuXCI+TWluaW11bSBEYXRlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWZvY3VzPVwibWluRGF0ZU9wZW4gPSB0cnVlXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWluaXQ9XCJtaW5EYXRlT3BlbiA9IGZhbHNlXCIgJyArXG4gICAgICAgICAgICAgICAgJ2lzLW9wZW49XCJtaW5EYXRlT3BlblwiICcgK1xuICAgICAgICAgICAgICAgICdkYXRldGltZS1waWNrZXI9XCJ5eXl5LU1NLWRkXCIgJyArXG4gICAgICAgICAgICAgICAgJ2VuYWJsZS10aW1lPVwiZmFsc2VcIiAnICtcbiAgICAgICAgICAgICAgICAnbmctbW9kZWw9XCJjb21wb25lbnQubWluRGF0ZVwiIC8+JyArXG4gICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWNsaWNrPVwibWluRGF0ZU9wZW4gPSB0cnVlXCI+PGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhclwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInBsYWNlaG9sZGVyXCIgIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIG1heGltdW0gZGF0ZSB0aGF0IGNhbiBiZSBwaWNrZWQuXCI+TWF4aW11bSBEYXRlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWZvY3VzPVwibWF4RGF0ZU9wZW4gPSB0cnVlXCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLWluaXQ9XCJtYXhEYXRlT3BlbiA9IGZhbHNlXCIgJyArXG4gICAgICAgICAgICAgICAgJ2lzLW9wZW49XCJtYXhEYXRlT3BlblwiICcgK1xuICAgICAgICAgICAgICAgICdkYXRldGltZS1waWNrZXI9XCJ5eXl5LU1NLWRkXCIgJyArXG4gICAgICAgICAgICAgICAgJ2VuYWJsZS10aW1lPVwiZmFsc2VcIiAnICtcbiAgICAgICAgICAgICAgICAnbmctbW9kZWw9XCJjb21wb25lbnQubWF4RGF0ZVwiIC8+JyArXG4gICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWNsaWNrPVwibWF4RGF0ZU9wZW4gPSB0cnVlXCI+PGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhclwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInN0YXJ0aW5nRGF5XCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlwiPlN0YXJ0aW5nIERheTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwic3RhcnRpbmdEYXlcIiBuYW1lPVwic3RhcnRpbmdEYXlcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5kYXRlUGlja2VyLnN0YXJ0aW5nRGF5XCIgbmctb3B0aW9ucz1cImlkeCBhcyBkYXkgZm9yIChpZHgsIGRheSkgaW4gc3RhcnRpbmdEYXlzXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJtaW5Nb2RlXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgc21hbGxlc3QgdW5pdCBvZiB0aW1lIHZpZXcgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIuXCI+TWluaW11bSBNb2RlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJtaW5Nb2RlXCIgbmFtZT1cIm1pbk1vZGVcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5kYXRlUGlja2VyLm1pbk1vZGVcIiBuZy1vcHRpb25zPVwibW9kZS5uYW1lIGFzIG1vZGUubGFiZWwgZm9yIG1vZGUgaW4gbW9kZXNcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cIm1heE1vZGVcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBsYXJnZXN0IHVuaXQgb2YgdGltZSB2aWV3IHRvIGRpc3BsYXkgaW4gdGhlIGRhdGUgcGlja2VyLlwiPk1heGltdW0gTW9kZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwibWF4TW9kZVwiIG5hbWU9XCJtYXhNb2RlXCIgbmctbW9kZWw9XCJjb21wb25lbnQuZGF0ZVBpY2tlci5tYXhNb2RlXCIgbmctb3B0aW9ucz1cIm1vZGUubmFtZSBhcyBtb2RlLmxhYmVsIGZvciBtb2RlIGluIG1vZGVzXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRhdGVQaWNrZXIueWVhclJhbmdlXCIgbGFiZWw9XCJOdW1iZXIgb2YgWWVhcnMgRGlzcGxheWVkXCIgcGxhY2Vob2xkZXI9XCJZZWFyIFJhbmdlXCIgdGl0bGU9XCJUaGUgbnVtYmVyIG9mIHllYXJzIHRvIGRpc3BsYXkgaW4gdGhlIHllYXJzIHZpZXcuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGF0ZVBpY2tlci5zaG93V2Vla3NcIiB0eXBlPVwiY2hlY2tib3hcIiBsYWJlbD1cIlNob3cgV2VlayBOdW1iZXJzXCIgdGl0bGU9XCJEaXNwbGF5cyB0aGUgd2VlayBudW1iZXJzIG9uIHRoZSBkYXRlIHBpY2tlci5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9kYXRldGltZS90aW1lLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIkVuYWJsZXMgdGltZSBpbnB1dCBmb3IgdGhpcyBmaWVsZC5cIj4nICtcbiAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImVuYWJsZVRpbWVcIiBuYW1lPVwiZW5hYmxlVGltZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmVuYWJsZVRpbWVcIiBuZy1jaGVja2VkPVwiY29tcG9uZW50LmVuYWJsZVRpbWVcIiBuZy1jaGFuZ2U9XCJzZXRGb3JtYXQoKVwiPiBFbmFibGUgVGltZSBJbnB1dCcgK1xuICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRpbWVQaWNrZXIuaG91clN0ZXBcIiB0eXBlPVwibnVtYmVyXCIgbGFiZWw9XCJIb3VyIFN0ZXAgU2l6ZVwiIHRpdGxlPVwiVGhlIG51bWJlciBvZiBob3VycyB0byBpbmNyZW1lbnQvZGVjcmVtZW50IGluIHRoZSB0aW1lIHBpY2tlci5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGltZVBpY2tlci5taW51dGVTdGVwXCIgdHlwZT1cIm51bWJlclwiIGxhYmVsPVwiTWludXRlIFN0ZXAgU2l6ZVwiIHRpdGxlPVwiVGhlIG51bWJlciBvZiBtaW51dGVzIHRvIGluY3JlbWVudC9kZWNyZW1lbnQgaW4gdGhlIHRpbWUgcGlja2VyLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0aW1lUGlja2VyLnNob3dNZXJpZGlhblwiIHR5cGU9XCJjaGVja2JveFwiIGxhYmVsPVwiMTIgSG91ciBUaW1lIChBTS9QTSlcIiB0aXRsZT1cIkRpc3BsYXkgdGltZSBpbiAxMiBob3VyIHRpbWUgd2l0aCBBTS9QTS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGltZVBpY2tlci5yZWFkb25seUlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgbGFiZWw9XCJSZWFkLU9ubHkgSW5wdXRcIiB0aXRsZT1cIk1ha2VzIHRoZSB0aW1lIHBpY2tlciBpbnB1dCBib3hlcyByZWFkLW9ubHkuIFRoZSB0aW1lIGNhbiBvbmx5IGJlIGNoYW5nZWQgYnkgdGhlIGluY3JlbWVudC9kZWNyZW1lbnQgYnV0dG9ucy5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9kYXRldGltZS92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj48L2Zvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ2RheScsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWNhbGVuZGFyJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2RheS9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGF0YScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9kYXRhLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2RheS92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jZGF5J1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2RheS9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZmllbGRzLmRheS5wbGFjZWhvbGRlclwiIGxhYmVsPVwiRGF5IFBsYWNlaG9sZGVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZpZWxkcy5tb250aC5wbGFjZWhvbGRlclwiIGxhYmVsPVwiTW9udGggUGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZmllbGRzLnllYXIucGxhY2Vob2xkZXJcIiBsYWJlbD1cIlllYXIgUGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGF5Rmlyc3RcIiB0eXBlPVwiY2hlY2tib3hcIiBsYWJlbD1cIkRheSBmaXJzdFwiIHRpdGxlPVwiRGlzcGxheSB0aGUgRGF5IGZpZWxkIGJlZm9yZSB0aGUgTW9udGggZmllbGQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZpZWxkcy5kYXkuaGlkZVwiIHR5cGU9XCJjaGVja2JveFwiIGxhYmVsPVwiSGlkZSBEYXlcIiB0aXRsZT1cIkhpZGUgdGhlIGRheSBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZpZWxkcy5tb250aC5oaWRlXCIgdHlwZT1cImNoZWNrYm94XCIgbGFiZWw9XCJIaWRlIE1vbnRoXCIgdGl0bGU9XCJIaWRlIHRoZSBtb250aCBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZpZWxkcy55ZWFyLmhpZGVcIiB0eXBlPVwiY2hlY2tib3hcIiBsYWJlbD1cIkhpZGUgWWVhclwiIHRpdGxlPVwiSGlkZSB0aGUgeWVhciBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmluZGV4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRpc2FibGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2RheS92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZpZWxkcy5kYXkucmVxdWlyZWRcIiBsYWJlbD1cIlJlcXVpcmUgRGF5XCIgdHlwZT1cImNoZWNrYm94XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZpZWxkcy5tb250aC5yZXF1aXJlZFwiIGxhYmVsPVwiUmVxdWlyZSBNb250aFwiIHR5cGU9XCJjaGVja2JveFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJmaWVsZHMueWVhci5yZXF1aXJlZFwiIGxhYmVsPVwiUmVxdWlyZSBZZWFyXCIgdHlwZT1cImNoZWNrYm94XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj48L2Zvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICB2YXIgdmlld3MgPSBfLmNsb25lRGVlcChmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIuJGdldCgpLmNvbXBvbmVudHMudGV4dGZpZWxkLnZpZXdzKTtcbiAgICAgIF8uZWFjaCh2aWV3cywgZnVuY3Rpb24odmlldykge1xuICAgICAgICBpZiAodmlldy5uYW1lID09PSAnVmFsaWRhdGlvbicpIHtcbiAgICAgICAgICB2aWV3LnRlbXBsYXRlID0gJ2Zvcm1pby9jb21wb25lbnRzL2VtYWlsL3ZhbGlkYXRlLmh0bWwnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcignZW1haWwnLCB7XG4gICAgICAgIGljb246ICdmYSBmYS1hdCcsXG4gICAgICAgIHZpZXdzOiB2aWV3cyxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNlbWFpbCdcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvZW1haWwvdmFsaWRhdGUuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5yZXF1aXJlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ1bmlxdWVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj48aDMgY2xhc3M9XCJwYW5lbC10aXRsZVwiPktpY2tib3g8L2gzPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+JyArXG4gICAgICAgICAgICAgICc8cD5WYWxpZGF0ZSB0aGlzIGVtYWlsIHVzaW5nIHRoZSBLaWNrYm94IGVtYWlsIHZhbGlkYXRpb24gc2VydmljZS48L3A+JyArXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nICtcbiAgICAgICAgICAgICAgICAnPGxhYmVsIGZvcj1cImtpY2tib3gtZW5hYmxlXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJFbmFibGUgS2lja2JveCB2YWxpZGF0aW9uIGZvciB0aGlzIGVtYWlsIGZpZWxkLlwiPicgK1xuICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImtpY2tib3gtZW5hYmxlXCIgbmFtZT1cImtpY2tib3gtZW5hYmxlXCIgbmctbW9kZWw9XCJjb21wb25lbnQua2lja2JveC5lbmFibGVkXCI+IEVuYWJsZScgK1xuICAgICAgICAgICAgICAgICc8L2xhYmVsPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLm1pbkxlbmd0aFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5tYXhMZW5ndGhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucGF0dGVyblwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdmaWVsZHNldCcsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9maWVsZHNldC5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXRoLWxhcmdlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2ZpZWxkc2V0L2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI2ZpZWxkc2V0JyxcbiAgICAgICAga2VlcENoaWxkcmVuT25SZW1vdmU6IHRydWUsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvZmllbGRzZXQuaHRtbCcsXG4gICAgICAgICc8ZmllbGRzZXQ+JyArXG4gICAgICAgICAgJzxsZWdlbmQgbmctaWY9XCJjb21wb25lbnQubGVnZW5kXCI+e3sgY29tcG9uZW50LmxlZ2VuZCB9fTwvbGVnZW5kPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLWxpc3QgY29tcG9uZW50PVwiY29tcG9uZW50XCIgZm9ybT1cImZvcm1cIiBmb3JtaW89XCI6OmZvcm1pb1wiPjwvZm9ybS1idWlsZGVyLWxpc3Q+JyArXG4gICAgICAgICc8L2ZpZWxkc2V0PidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9maWVsZHNldC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGVnZW5kXCIgbGFiZWw9XCJMZWdlbmRcIiBwbGFjZWhvbGRlcj1cIkZpZWxkU2V0IExlZ2VuZFwiIHRpdGxlPVwiVGhlIGxlZ2VuZCB0ZXh0IHRvIGFwcGVhciBhYm92ZSB0aGlzIGZpZWxkc2V0LlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlclxuICAgICkge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdmaWxlJywge1xuICAgICAgICBvbkVkaXQ6IFtcbiAgICAgICAgICAnJHNjb3BlJyxcbiAgICAgICAgICAnRm9ybWlvJyxcbiAgICAgICAgICBmdW5jdGlvbigkc2NvcGUsIEZvcm1pbykge1xuICAgICAgICAgICAgLy8gUHVsbCBvdXQgdGl0bGUgYW5kIG5hbWUgZnJvbSB0aGUgbGlzdCBvZiBzdG9yYWdlIHBsdWdpbnMuXG4gICAgICAgICAgICAkc2NvcGUuc3RvcmFnZSA9IF8ubWFwKEZvcm1pby5wcm92aWRlcnMuc3RvcmFnZSwgZnVuY3Rpb24oc3RvcmFnZSwga2V5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHN0b3JhZ2UudGl0bGUsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGljb246ICdmYSBmYS1maWxlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2ZpbGUvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9maWxlL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNmaWxlJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2ZpbGUvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJzdG9yYWdlXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJXaGljaCBzdG9yYWdlIHRvIHNhdmUgdGhlIGZpbGVzIGluLlwiPlN0b3JhZ2U8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInN0b3JhZ2VcIiBuYW1lPVwic3RvcmFnZVwiIG5nLW9wdGlvbnM9XCJzdG9yZS5uYW1lIGFzIHN0b3JlLnRpdGxlIGZvciBzdG9yZSBpbiBzdG9yYWdlXCIgbmctbW9kZWw9XCJjb21wb25lbnQuc3RvcmFnZVwiPjwvc2VsZWN0PicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ1cmxcIiBuZy1zaG93PVwiY29tcG9uZW50LnN0b3JhZ2UgPT09IFxcJ3VybFxcJ1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJkaXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW1hZ2VcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW1hZ2VTaXplXCIgbmctaWY9XCJjb21wb25lbnQuaW1hZ2VcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvZmlsZS92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImZpbGVQYXR0ZXJuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdoaWRkZW4nLCB7XG4gICAgICAgIGZidGVtcGxhdGU6ICdmb3JtaW8vZm9ybWJ1aWxkZXIvaGlkZGVuLmh0bWwnLFxuICAgICAgICBpY29uOiAnZmEgZmEtdXNlci1zZWNyZXQnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvaGlkZGVuL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEYXRhJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2RhdGEuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvaGlkZGVuL3ZhbGlkYXRpb24uaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jaGlkZGVuJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvaGlkZGVuLmh0bWwnLCAnPHNwYW4gY2xhc3M9XCJoaWRkZW4tZWxlbWVudC10ZXh0XCI+e3sgY29tcG9uZW50LmxhYmVsIH19PC9zcGFuPicpO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvaGlkZGVuL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiIGxhYmVsPVwiTmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGhlIG5hbWUgZm9yIHRoaXMgaGlkZGVuIGZpZWxkXCIgdGl0bGU9XCJUaGUgbmFtZSBmb3IgdGhpcyBmaWVsZC4gSXQgaXMgb25seSB1c2VkIGZvciBhZG1pbmlzdHJhdGl2ZSBwdXJwb3NlcyBzdWNoIGFzIGdlbmVyYXRpbmcgdGhlIGF1dG9tYXRpYyBwcm9wZXJ0eSBuYW1lIGluIHRoZSBBUEkgdGFiICh3aGljaCBtYXkgYmUgY2hhbmdlZCBtYW51YWxseSkuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImN1c3RvbUNsYXNzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL2hpZGRlbi92YWxpZGF0aW9uLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidW5pcXVlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdodG1sZWxlbWVudCcsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9odG1sZWxlbWVudC5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWNvZGUnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvaHRtbGVsZW1lbnQvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNodG1sLWVsZW1lbnQtY29tcG9uZW50J1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvaHRtbGVsZW1lbnQuaHRtbCcsXG4gICAgICAgICc8Zm9ybWlvLWh0bWwtZWxlbWVudCBjb21wb25lbnQ9XCJjb21wb25lbnRcIj48L2Rpdj4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvaHRtbGVsZW1lbnQvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiIGxhYmVsPVwiQ29udGFpbmVyIEN1c3RvbSBDbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWdcIiBsYWJlbD1cIkhUTUwgVGFnXCIgcGxhY2Vob2xkZXI9XCJIVE1MIEVsZW1lbnQgVGFnXCIgdGl0bGU9XCJUaGUgdGFnIG9mIHRoaXMgSFRNTCBlbGVtZW50LlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjbGFzc05hbWVcIiBsYWJlbD1cIkNTUyBDbGFzc1wiIHBsYWNlaG9sZGVyPVwiQ1NTIENsYXNzXCIgdGl0bGU9XCJUaGUgQ1NTIGNsYXNzIGZvciB0aGlzIEhUTUwgZWxlbWVudC5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzx2YWx1ZS1idWlsZGVyICcgK1xuICAgICAgICAgICAgJ2RhdGE9XCJjb21wb25lbnQuYXR0cnNcIiAnICtcbiAgICAgICAgICAgICdsYWJlbD1cIkF0dHJpYnV0ZXNcIiAnICtcbiAgICAgICAgICAgICd0b29sdGlwLXRleHQ9XCJUaGUgYXR0cmlidXRlcyBmb3IgdGhpcyBIVE1MIGVsZW1lbnQuIE9ubHkgc2FmZSBhdHRyaWJ1dGVzIGFyZSBhbGxvd2VkLCBzdWNoIGFzIHNyYywgaHJlZiwgYW5kIHRpdGxlLlwiICcgK1xuICAgICAgICAgICAgJ3ZhbHVlLXByb3BlcnR5PVwidmFsdWVcIiAnICtcbiAgICAgICAgICAgICdsYWJlbC1wcm9wZXJ0eT1cImF0dHJcIiAnICtcbiAgICAgICAgICAgICd2YWx1ZS1sYWJlbD1cIlZhbHVlXCIgJyArXG4gICAgICAgICAgICAnbGFiZWwtbGFiZWw9XCJBdHRyaWJ1dGVcIiAnICtcbiAgICAgICAgICAgICduby1hdXRvY29tcGxldGUtdmFsdWU9XCJ0cnVlXCIgJyArXG4gICAgICAgICAgJz48L3ZhbHVlLWJ1aWxkZXI+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cImNvbnRlbnRcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBjb250ZW50IG9mIHRoaXMgSFRNTCBlbGVtZW50LlwiPkNvbnRlbnQ8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY29udGVudFwiIG5hbWU9XCJjb250ZW50XCIgbmctbW9kZWw9XCJjb21wb25lbnQuY29udGVudFwiIHBsYWNlaG9sZGVyPVwiSFRNTCBDb250ZW50XCIgcm93cz1cIjNcIj57eyBjb21wb25lbnQuY29udGVudCB9fTwvdGV4dGFyZWE+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnbmdGb3JtQnVpbGRlcicpO1xuXG4vLyBCYXNpY1xucmVxdWlyZSgnLi9jb21wb25lbnRzJykoYXBwKTtcbnJlcXVpcmUoJy4vdGV4dGZpZWxkJykoYXBwKTtcbnJlcXVpcmUoJy4vbnVtYmVyJykoYXBwKTtcbnJlcXVpcmUoJy4vcGFzc3dvcmQnKShhcHApO1xucmVxdWlyZSgnLi90ZXh0YXJlYScpKGFwcCk7XG5yZXF1aXJlKCcuL2NoZWNrYm94JykoYXBwKTtcbnJlcXVpcmUoJy4vc2VsZWN0Ym94ZXMnKShhcHApO1xucmVxdWlyZSgnLi9zZWxlY3QnKShhcHApO1xucmVxdWlyZSgnLi9yYWRpbycpKGFwcCk7XG5yZXF1aXJlKCcuL2h0bWxlbGVtZW50JykoYXBwKTtcbnJlcXVpcmUoJy4vY29udGVudCcpKGFwcCk7XG5yZXF1aXJlKCcuL2J1dHRvbicpKGFwcCk7XG5cbi8vIFNwZWNpYWxcbnJlcXVpcmUoJy4vZW1haWwnKShhcHApO1xucmVxdWlyZSgnLi9waG9uZW51bWJlcicpKGFwcCk7XG5yZXF1aXJlKCcuL2FkZHJlc3MnKShhcHApO1xucmVxdWlyZSgnLi9kYXRldGltZScpKGFwcCk7XG5yZXF1aXJlKCcuL2RheScpKGFwcCk7XG5yZXF1aXJlKCcuL2N1cnJlbmN5JykoYXBwKTtcbnJlcXVpcmUoJy4vaGlkZGVuJykoYXBwKTtcbnJlcXVpcmUoJy4vcmVzb3VyY2UnKShhcHApO1xucmVxdWlyZSgnLi9maWxlJykoYXBwKTtcbnJlcXVpcmUoJy4vc2lnbmF0dXJlJykoYXBwKTtcbnJlcXVpcmUoJy4vY3VzdG9tJykoYXBwKTtcbnJlcXVpcmUoJy4vZGF0YWdyaWQnKShhcHApO1xucmVxdWlyZSgnLi9zdXJ2ZXknKShhcHApO1xuXG4vLyBMYXlvdXRcbnJlcXVpcmUoJy4vY29sdW1ucycpKGFwcCk7XG5yZXF1aXJlKCcuL2ZpZWxkc2V0JykoYXBwKTtcbnJlcXVpcmUoJy4vY29udGFpbmVyJykoYXBwKTtcbnJlcXVpcmUoJy4vcGFnZScpKGFwcCk7XG5yZXF1aXJlKCcuL3BhbmVsJykoYXBwKTtcbnJlcXVpcmUoJy4vdGFibGUnKShhcHApO1xucmVxdWlyZSgnLi93ZWxsJykoYXBwKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ251bWJlcicsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWhhc2h0YWcnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvbnVtYmVyL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEYXRhJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2RhdGEuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvbnVtYmVyL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNudW1iZXInXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvbnVtYmVyL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJsYWJlbFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwbGFjZWhvbGRlclwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5zdGVwXCIgbGFiZWw9XCJJbmNyZW1lbnQgKFN0ZXApXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBob3cgbXVjaCB0byBpbmNyZW1lbnQgcGVyIHN0ZXAgKG9yIHByZWNpc2lvbikuXCIgdGl0bGU9XCJUaGUgYW1vdW50IHRvIGluY3JlbWVudC9kZWNyZW1lbnQgZm9yIGVhY2ggc3RlcC5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJlZml4XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInN1ZmZpeFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJpbmRleFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJtdWx0aXBsZVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwcm90ZWN0ZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGVyc2lzdGVudFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJkaXNhYmxlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJsZVZpZXdcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBBUEkgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9udW1iZXIvdmFsaWRhdGUuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5yZXF1aXJlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5taW5cIiB0eXBlPVwibnVtYmVyXCIgbGFiZWw9XCJNaW5pbXVtIFZhbHVlXCIgcGxhY2Vob2xkZXI9XCJNaW5pbXVtIFZhbHVlXCIgdGl0bGU9XCJUaGUgbWluaW11bSB2YWx1ZSB0aGlzIGZpZWxkIG11c3QgaGF2ZSBiZWZvcmUgdGhlIGZvcm0gY2FuIGJlIHN1Ym1pdHRlZC5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUubWF4XCIgdHlwZT1cIm51bWJlclwiIGxhYmVsPVwiTWF4aW11bSBWYWx1ZVwiIHBsYWNlaG9sZGVyPVwiTWF4aW11bSBWYWx1ZVwiIHRpdGxlPVwiVGhlIG1heGltdW0gdmFsdWUgdGhpcyBmaWVsZCBtdXN0IGhhdmUgYmVmb3JlIHRoZSBmb3JtIGNhbiBiZSBzdWJtaXR0ZWQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj48L2Zvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3BhZ2UnLCB7XG4gICAgICAgIGZidGVtcGxhdGU6ICdmb3JtaW8vZm9ybWJ1aWxkZXIvcGFnZS5odG1sJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvcGFnZS5odG1sJyxcbiAgICAgICAgJzxmb3JtLWJ1aWxkZXItbGlzdCBjb21wb25lbnQ9XCJjb21wb25lbnRcIiBmb3JtPVwiZm9ybVwiIGZvcm1pbz1cIjo6Zm9ybWlvXCI+PC9mb3JtLWJ1aWxkZXItbGlzdD4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICAnRk9STV9PUFRJT05TJyxcbiAgICBmdW5jdGlvbihcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcixcbiAgICAgIEZPUk1fT1BUSU9OU1xuICAgICkge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdwYW5lbCcsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci9wYW5lbC5odG1sJyxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWxpc3QtYWx0JyxcbiAgICAgICAgb25FZGl0OiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICRzY29wZS50aGVtZXMgPSBGT1JNX09QVElPTlMudGhlbWVzO1xuICAgICAgICB9XSxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3BhbmVsL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI3BhbmVscycsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvcGFuZWwuaHRtbCcsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwte3sgY29tcG9uZW50LnRoZW1lIH19XCI+JyArXG4gICAgICAgICAgJzxkaXYgbmctaWY9XCJjb21wb25lbnQudGl0bGVcIiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj48aDMgY2xhc3M9XCJwYW5lbC10aXRsZVwiPnt7IGNvbXBvbmVudC50aXRsZSB9fTwvaDM+PC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+JyArXG4gICAgICAgICAgICAnPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cImNvbXBvbmVudFwiIGZvcm09XCJmb3JtXCIgZm9ybWlvPVwiOjpmb3JtaW9cIj48L2Zvcm0tYnVpbGRlci1saXN0PicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9wYW5lbC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGl0bGVcIiBsYWJlbD1cIlRpdGxlXCIgcGxhY2Vob2xkZXI9XCJQYW5lbCBUaXRsZVwiIHRpdGxlPVwiVGhlIHRpdGxlIHRleHQgdGhhdCBhcHBlYXJzIGluIHRoZSBoZWFkZXIgb2YgdGhpcyBwYW5lbC5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInRoZW1lXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgY29sb3IgdGhlbWUgb2YgdGhpcyBwYW5lbC5cIj5UaGVtZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwidGhlbWVcIiBuYW1lPVwidGhlbWVcIiBuZy1vcHRpb25zPVwidGhlbWUubmFtZSBhcyB0aGVtZS50aXRsZSBmb3IgdGhlbWUgaW4gdGhlbWVzXCIgbmctbW9kZWw9XCJjb21wb25lbnQudGhlbWVcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3Bhc3N3b3JkJywge1xuICAgICAgICBpY29uOiAnZmEgZmEtYXN0ZXJpc2snLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvcGFzc3dvcmQvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy90ZXh0ZmllbGQvdmFsaWRhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vYXBpLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTGF5b3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2xheW91dC5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBkb2N1bWVudGF0aW9uOiAnaHR0cDovL2hlbHAuZm9ybS5pby91c2VyZ3VpZGUvI3Bhc3N3b3JkJyxcbiAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9wYXNzd29yZC5odG1sJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbihcbiAgICAgICR0ZW1wbGF0ZUNhY2hlXG4gICAgKSB7XG4gICAgICAvLyBEaXNhYmxlIGRyYWdnaW5nIG9uIHBhc3N3b3JkIGlucHV0cyBiZWNhdXNlIGl0IGJyZWFrcyBkbmRMaXN0c1xuICAgICAgdmFyIHRleHRGaWVsZFRtcGwgPSAkdGVtcGxhdGVDYWNoZS5nZXQoJ2Zvcm1pby9jb21wb25lbnRzL3RleHRmaWVsZC5odG1sJyk7XG4gICAgICB2YXIgcGFzc3dvcmRUbXBsID0gdGV4dEZpZWxkVG1wbC5yZXBsYWNlKFxuICAgICAgICAvPGlucHV0IHR5cGU9XCJ7eyBjb21wb25lbnQuaW5wdXRUeXBlIH19XCIgL2csXG4gICAgICAgICc8aW5wdXQgdHlwZT1cInt7IGNvbXBvbmVudC5pbnB1dFR5cGUgfX1cIiBkbmQtbm9kcmFnICdcbiAgICAgICk7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3Bhc3N3b3JkLmh0bWwnLCBwYXNzd29yZFRtcGwpO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvcGFzc3dvcmQvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBsYWNlaG9sZGVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByZWZpeFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdWZmaXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdwaG9uZU51bWJlcicsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXBob25lLXNxdWFyZScsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9waG9uZU51bWJlci9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGF0YScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9kYXRhLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3Bob25lTnVtYmVyL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNwaG9uZW51bWJlcidcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9waG9uZU51bWJlci9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW5wdXRNYXNrXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByZWZpeFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdWZmaXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgVmFsaWRhdGlvbiBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3Bob25lTnVtYmVyL3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidW5pcXVlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdyYWRpbycsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWRvdC1jaXJjbGUtbycsXG4gICAgICAgIHZpZXdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Rpc3BsYXknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9yYWRpby9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGF0YScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9kYXRhLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3JhZGlvL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNyYWRpbydcbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG4gIGFwcC5ydW4oW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZ3MgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9yYWRpby9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzx2YWx1ZS1idWlsZGVyIGRhdGE9XCJjb21wb25lbnQudmFsdWVzXCIgZGVmYXVsdD1cImNvbXBvbmVudC5kZWZhdWx0VmFsdWVcIiBsYWJlbD1cIlZhbHVlc1wiIHRvb2x0aXAtdGV4dD1cIlRoZSByYWRpbyBidXR0b24gdmFsdWVzIHRoYXQgY2FuIGJlIHBpY2tlZCBmb3IgdGhpcyBmaWVsZC4gVmFsdWVzIGFyZSB0ZXh0IHN1Ym1pdHRlZCB3aXRoIHRoZSBmb3JtIGRhdGEuIExhYmVscyBhcmUgdGV4dCB0aGF0IGFwcGVhcnMgbmV4dCB0byB0aGUgcmFkaW8gYnV0dG9ucyBvbiB0aGUgZm9ybS5cIj48L3ZhbHVlLWJ1aWxkZXI+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW5saW5lXCIgdHlwZT1cImNoZWNrYm94XCIgbGFiZWw9XCJJbmxpbmUgTGF5b3V0XCIgdGl0bGU9XCJEaXNwbGF5cyB0aGUgcmFkaW8gYnV0dG9ucyBob3Jpem9udGFsbHkuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRpc2FibGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgICAgLy8gQ3JlYXRlIHRoZSBBUEkgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9yYWRpby92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbi1jdXN0b20tdmFsaWRhdGlvbj48L2Zvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3Jlc291cmNlJywge1xuICAgICAgICBvbkVkaXQ6IFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IFtdO1xuICAgICAgICAgICRzY29wZS5jb21wb25lbnQucHJvamVjdCA9ICRzY29wZS5mb3JtaW8ucHJvamVjdElkO1xuICAgICAgICAgICRzY29wZS5mb3JtaW8ubG9hZEZvcm1zKHtwYXJhbXM6IHt0eXBlOiAncmVzb3VyY2UnLCBsaW1pdDogMTAwfX0pLnRoZW4oZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAkc2NvcGUucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuICAgICAgICAgICAgaWYgKCEkc2NvcGUuY29tcG9uZW50LnJlc291cmNlKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQucmVzb3VyY2UgPSByZXNvdXJjZXNbMF0uX2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XSxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLWZpbGVzLW8nLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvcmVzb3VyY2UvZGlzcGxheS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1ZhbGlkYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9yZXNvdXJjZS92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jcmVzb3VyY2UnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvcmVzb3VyY2UvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBsYWNlaG9sZGVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIHJlc291cmNlIHRvIGJlIHVzZWQgd2l0aCB0aGlzIGZpZWxkLlwiPlJlc291cmNlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJyZXNvdXJjZVwiIG5hbWU9XCJyZXNvdXJjZVwiIG5nLW9wdGlvbnM9XCJ2YWx1ZS5faWQgYXMgdmFsdWUudGl0bGUgZm9yIHZhbHVlIGluIHJlc291cmNlc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LnJlc291cmNlXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIHByb3BlcnRpZXMgb24gdGhlIHJlc291cmNlIHRvIHJldHVybiBhcyBwYXJ0IG9mIHRoZSBvcHRpb25zLiBTZXBhcmF0ZSBwcm9wZXJ0eSBuYW1lcyBieSBjb21tYXMuIElmIGxlZnQgYmxhbmssIGFsbCBwcm9wZXJ0aWVzIHdpbGwgYmUgcmV0dXJuZWQuXCI+U2VsZWN0IEZpZWxkczwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInNlbGVjdEZpZWxkc1wiIG5hbWU9XCJzZWxlY3RGaWVsZHNcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5zZWxlY3RGaWVsZHNcIiBwbGFjZWhvbGRlcj1cIkNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGZpZWxkcyB0byBzZWxlY3QuXCIgdmFsdWU9XCJ7eyBjb21wb25lbnQuc2VsZWN0RmllbGRzIH19XCI+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiQSBsaXN0IG9mIHNlYXJjaCBmaWx0ZXJzIGJhc2VkIG9uIHRoZSBmaWVsZHMgb2YgdGhlIHJlc291cmNlLiBTZWUgdGhlIDxhIHRhcmdldD1cXCdfYmxhbmtcXCcgaHJlZj1cXCdodHRwczovL2dpdGh1Yi5jb20vdHJhdmlzdC9yZXNvdXJjZWpzI2ZpbHRlcmluZy10aGUtcmVzdWx0c1xcJz5SZXNvdXJjZS5qcyBkb2N1bWVudGF0aW9uPC9hPiBmb3IgdGhlIGZvcm1hdCBvZiB0aGVzZSBmaWx0ZXJzLlwiPlNlYXJjaCBGaWVsZHM8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJzZWFyY2hGaWVsZHNcIiBuYW1lPVwic2VhcmNoRmllbGRzXCIgbmctbW9kZWw9XCJjb21wb25lbnQuc2VhcmNoRmllbGRzXCIgbmctbGlzdCBwbGFjZWhvbGRlcj1cIlRoZSBmaWVsZHMgdG8gcXVlcnkgb24gdGhlIHNlcnZlclwiIHZhbHVlPVwie3sgY29tcG9uZW50LnNlYXJjaEZpZWxkcyB9fVwiPicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwicGxhY2Vob2xkZXJcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIlRoZSBIVE1MIHRlbXBsYXRlIGZvciB0aGUgcmVzdWx0IGRhdGEgaXRlbXMuXCI+SXRlbSBUZW1wbGF0ZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ0ZW1wbGF0ZVwiIG5hbWU9XCJ0ZW1wbGF0ZVwiIG5nLW1vZGVsPVwiY29tcG9uZW50LnRlbXBsYXRlXCIgcm93cz1cIjNcIj57eyBjb21wb25lbnQudGVtcGxhdGUgfX08L3RleHRhcmVhPicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJpbmRleFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJtdWx0aXBsZVwiIGxhYmVsPVwiQWxsb3cgTXVsdGlwbGUgUmVzb3VyY2VzXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRpc2FibGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIEFQSSBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3Jlc291cmNlL3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICc8L25nLWZvcm0+J1xuICAgICAgKTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3NlbGVjdCcsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXRoLWxpc3QnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0L2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEYXRhJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0L2RhdGEuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0L3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgb25FZGl0OiBbJyRzY29wZScsICdGb3JtaW9VdGlscycsIGZ1bmN0aW9uKCRzY29wZSwgRm9ybWlvVXRpbHMpIHtcbiAgICAgICAgICAkc2NvcGUuZGF0YVNvdXJjZXMgPSB7XG4gICAgICAgICAgICB2YWx1ZXM6ICdWYWx1ZXMnLFxuICAgICAgICAgICAganNvbjogJ1JhdyBKU09OJyxcbiAgICAgICAgICAgIHVybDogJ1VSTCcsXG4gICAgICAgICAgICByZXNvdXJjZTogJ1Jlc291cmNlJyxcbiAgICAgICAgICAgIGN1c3RvbTogJ0N1c3RvbSdcbiAgICAgICAgICB9O1xuICAgICAgICAgICRzY29wZS5yZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAkc2NvcGUucmVzb3VyY2VGaWVsZHMgPSBbXTtcblxuICAgICAgICAgIC8vIFJldHVybnMgb25seSBpbnB1dCBmaWVsZHMgd2UgYXJlIGludGVyZXN0ZWQgaW4uXG4gICAgICAgICAgdmFyIGdldElucHV0RmllbGRzID0gZnVuY3Rpb24oY29tcG9uZW50cykge1xuICAgICAgICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgICAgICAgRm9ybWlvVXRpbHMuZWFjaENvbXBvbmVudChjb21wb25lbnRzLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5rZXkgJiYgY29tcG9uZW50LmlucHV0ICYmIChjb21wb25lbnQudHlwZSAhPT0gJ2J1dHRvbicpICYmIGNvbXBvbmVudC5rZXkgIT09ICRzY29wZS5jb21wb25lbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXAgPSBfLmNsb25lKGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICBjb21wLmxhYmVsID0gY29tcC5rZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKGNvbXApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgICRzY29wZS5mb3JtRmllbGRzID0gW3tsYWJlbDogJ0FueSBDaGFuZ2UnLCBrZXk6ICdkYXRhJ31dLmNvbmNhdChnZXRJbnB1dEZpZWxkcygkc2NvcGUuZm9ybS5jb21wb25lbnRzKSk7XG5cbiAgICAgICAgICAvLyBMb2FkcyB0aGUgc2VsZWN0ZWQgZmllbGRzLlxuICAgICAgICAgIHZhciBsb2FkRmllbGRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoISRzY29wZS5jb21wb25lbnQuZGF0YS5yZXNvdXJjZSB8fCAoJHNjb3BlLnJlc291cmNlcy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICAkc2NvcGUucmVzb3VyY2VGaWVsZHMgPSBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJycsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICd7RW50aXJlIE9iamVjdH0nXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ19pZCcsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdTdWJtaXNzaW9uIElkJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKCRzY29wZS5mb3JtaW8ucHJvamVjdElkKSB7XG4gICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQuZGF0YS5wcm9qZWN0ID0gJHNjb3BlLmZvcm1pby5wcm9qZWN0SWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiAkc2NvcGUucmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgIGlmICgkc2NvcGUucmVzb3VyY2VzW2luZGV4XS5faWQudG9TdHJpbmcoKSA9PT0gJHNjb3BlLmNvbXBvbmVudC5kYXRhLnJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSAkc2NvcGUucmVzb3VyY2VzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZHMgPSBnZXRJbnB1dEZpZWxkcyhzZWxlY3RlZC5jb21wb25lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gZmllbGQubGFiZWwgfHwgZmllbGQua2V5O1xuICAgICAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZUZpZWxkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnZGF0YS4nICsgZmllbGQua2V5LFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuY29tcG9uZW50LnZhbHVlUHJvcGVydHkgJiYgJHNjb3BlLnJlc291cmNlRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQudmFsdWVQcm9wZXJ0eSA9ICRzY29wZS5yZXNvdXJjZUZpZWxkc1swXS5wcm9wZXJ0eTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKCdjb21wb25lbnQuZGF0YVNyYycsIGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKCgkc2NvcGUucmVzb3VyY2VzLmxlbmd0aCA9PT0gMCkgJiYgKHNvdXJjZSA9PT0gJ3Jlc291cmNlJykpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLmZvcm1pby5sb2FkRm9ybXMoe3BhcmFtczoge3R5cGU6ICdyZXNvdXJjZScsIGxpbWl0OiA0Mjk0OTY3Mjk1fX0pLnRoZW4oZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IHJlc291cmNlcztcbiAgICAgICAgICAgICAgICBsb2FkRmllbGRzKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gVHJpZ2dlciB3aGVuIHRoZSByZXNvdXJjZSBjaGFuZ2VzLlxuICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudC5kYXRhLnJlc291cmNlJywgZnVuY3Rpb24ocmVzb3VyY2VJZCkge1xuICAgICAgICAgICAgaWYgKCFyZXNvdXJjZUlkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvYWRGaWVsZHMoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFVwZGF0ZSBvdGhlciBwYXJhbWV0ZXJzIHdoZW4gdGhlIHZhbHVlIHByb3BlcnR5IGNoYW5nZXMuXG4gICAgICAgICAgJHNjb3BlLmN1cnJlbnRWYWx1ZVByb3BlcnR5ID0gJHNjb3BlLmNvbXBvbmVudC52YWx1ZVByb3BlcnR5O1xuICAgICAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudC52YWx1ZVByb3BlcnR5JywgZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUuY29tcG9uZW50LmRhdGFTcmMgPT09ICdyZXNvdXJjZScgJiYgJHNjb3BlLmN1cnJlbnRWYWx1ZVByb3BlcnR5ICE9PSBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5zZWFyY2hGaWVsZCA9ICcnO1xuICAgICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQudGVtcGxhdGUgPSAnPHNwYW4+e3sgaXRlbS5kYXRhIH19PC9zcGFuPic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5zZWFyY2hGaWVsZCA9IHByb3BlcnR5ICsgJ19fcmVnZXgnO1xuICAgICAgICAgICAgICAgICRzY29wZS5jb21wb25lbnQudGVtcGxhdGUgPSAnPHNwYW4+e3sgaXRlbS4nICsgcHJvcGVydHkgKyAnIH19PC9zcGFuPic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGxvYWRGaWVsZHMoKTtcbiAgICAgICAgfV0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jc2VsZWN0J1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0L2RhdGEuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiZGF0YVNyY1wiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIHNvdXJjZSB0byB1c2UgZm9yIHRoZSBzZWxlY3QgZGF0YS4gVmFsdWVzIGxldHMgeW91IHByb3ZpZGUgeW91ciBvd24gdmFsdWVzIGFuZCBsYWJlbHMuIEpTT04gbGV0cyB5b3UgcHJvdmlkZSByYXcgSlNPTiBkYXRhLiBVUkwgbGV0cyB5b3UgcHJvdmlkZSBhIFVSTCB0byByZXRyaWV2ZSB0aGUgSlNPTiBkYXRhIGZyb20uXCI+RGF0YSBTb3VyY2UgVHlwZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiZGF0YVNyY1wiIG5hbWU9XCJkYXRhU3JjXCIgbmctbW9kZWw9XCJjb21wb25lbnQuZGF0YVNyY1wiIG5nLW9wdGlvbnM9XCJ2YWx1ZSBhcyBsYWJlbCBmb3IgKHZhbHVlLCBsYWJlbCkgaW4gZGF0YVNvdXJjZXNcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxuZy1zd2l0Y2ggb249XCJjb21wb25lbnQuZGF0YVNyY1wiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgbmctc3dpdGNoLXdoZW49XCJqc29uXCI+JyArXG4gICAgICAgICAgICAgICc8bGFiZWwgZm9yPVwiZGF0YS5qc29uXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJBIHJhdyBKU09OIGFycmF5IHRvIHVzZSBhcyBhIGRhdGEgc291cmNlLlwiPkRhdGEgU291cmNlIFJhdyBKU09OPC9sYWJlbD4nICtcbiAgICAgICAgICAgICAgJzx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiZGF0YS5qc29uXCIgbmFtZT1cImRhdGEuanNvblwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmRhdGEuanNvblwiIHBsYWNlaG9sZGVyPVwiUmF3IEpTT04gQXJyYXlcIiByb3dzPVwiM1wiPnt7IGNvbXBvbmVudC5kYXRhLmpzb24gfX08L3RleHRhcmVhPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIG5nLXN3aXRjaC13aGVuPVwidXJsXCIgcHJvcGVydHk9XCJkYXRhLnVybFwiIGxhYmVsPVwiRGF0YSBTb3VyY2UgVVJMXCIgcGxhY2Vob2xkZXI9XCJEYXRhIFNvdXJjZSBVUkxcIiB0aXRsZT1cIkEgVVJMIHRoYXQgcmV0dXJucyBhIEpTT04gYXJyYXkgdG8gdXNlIGFzIHRoZSBkYXRhIHNvdXJjZS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgICAnPHZhbHVlLWJ1aWxkZXIgbmctc3dpdGNoLXdoZW49XCJ2YWx1ZXNcIiBkYXRhPVwiY29tcG9uZW50LmRhdGEudmFsdWVzXCIgbGFiZWw9XCJEYXRhIFNvdXJjZSBWYWx1ZXNcIiB0b29sdGlwLXRleHQ9XCJWYWx1ZXMgdG8gdXNlIGFzIHRoZSBkYXRhIHNvdXJjZS4gTGFiZWxzIGFyZSBzaG93biBpbiB0aGUgc2VsZWN0IGZpZWxkLiBWYWx1ZXMgYXJlIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcyBzYXZlZCB3aXRoIHRoZSBzdWJtaXNzaW9uLlwiPjwvdmFsdWUtYnVpbGRlcj4nICtcbiAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBuZy1zd2l0Y2gtd2hlbj1cInJlc291cmNlXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInBsYWNlaG9sZGVyXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgcmVzb3VyY2UgdG8gYmUgdXNlZCB3aXRoIHRoaXMgZmllbGQuXCI+UmVzb3VyY2U8L2xhYmVsPicgK1xuICAgICAgICAgICAgJzx1aS1zZWxlY3QgdWktc2VsZWN0LXJlcXVpcmVkIHVpLXNlbGVjdC1vcGVuLW9uLWZvY3VzIG5nLW1vZGVsPVwiY29tcG9uZW50LmRhdGEucmVzb3VyY2VcIiB0aGVtZT1cImJvb3RzdHJhcFwiPicgK1xuICAgICAgICAgICAgICAnPHVpLXNlbGVjdC1tYXRjaCBjbGFzcz1cInVpLXNlbGVjdC1tYXRjaFwiIHBsYWNlaG9sZGVyPVwiXCI+JyArXG4gICAgICAgICAgICAgICAgJ3t7JHNlbGVjdC5zZWxlY3RlZC50aXRsZX19JyArXG4gICAgICAgICAgICAgICc8L3VpLXNlbGVjdC1tYXRjaD4nICtcbiAgICAgICAgICAgICAgJzx1aS1zZWxlY3QtY2hvaWNlcyBjbGFzcz1cInVpLXNlbGVjdC1jaG9pY2VzXCIgcmVwZWF0PVwidmFsdWUuX2lkIGFzIHZhbHVlIGluIHJlc291cmNlcyB8IGZpbHRlcjogJHNlbGVjdC5zZWFyY2hcIiByZWZyZXNoPVwicmVmcmVzaFN1Ym1pc3Npb25zKCRzZWxlY3Quc2VhcmNoKVwiIHJlZnJlc2gtZGVsYXk9XCIyNTBcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBuZy1iaW5kLWh0bWw9XCJ2YWx1ZS50aXRsZSB8IGhpZ2hsaWdodDogJHNlbGVjdC5zZWFyY2hcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgJzwvdWktc2VsZWN0LWNob2ljZXM+JyArXG4gICAgICAgICAgICAnPC91aS1zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8L25nLXN3aXRjaD4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gbmctaGlkZT1cImNvbXBvbmVudC5kYXRhU3JjICE9PSBcXCd1cmxcXCdcIiBwcm9wZXJ0eT1cInNlbGVjdFZhbHVlc1wiIGxhYmVsPVwiRGF0YSBQYXRoXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRoZSBvYmplY3QgcGF0aCB0byB0aGUgaXRlcmFibGUgaXRlbXMuXCIgdGl0bGU9XCJUaGUgcHJvcGVydHkgd2l0aGluIHRoZSBzb3VyY2UgZGF0YSwgd2hlcmUgaXRlcmFibGUgaXRlbXMgcmVzaWRlLiBGb3IgZXhhbXBsZTogcmVzdWx0cy5pdGVtcyBvciByZXN1bHRzWzBdLml0ZW1zXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBuZy1oaWRlPVwiY29tcG9uZW50LmRhdGFTcmMgPT0gXFwndmFsdWVzXFwnIHx8IGNvbXBvbmVudC5kYXRhU3JjID09IFxcJ3Jlc291cmNlXFwnIHx8IGNvbXBvbmVudC5kYXRhU3JjID09IFxcJ2N1c3RvbVxcJ1wiIHByb3BlcnR5PVwidmFsdWVQcm9wZXJ0eVwiIGxhYmVsPVwiVmFsdWUgUHJvcGVydHlcIiBwbGFjZWhvbGRlcj1cIlRoZSBzZWxlY3RlZCBpdGVtXFwncyBwcm9wZXJ0eSB0byBzYXZlLlwiIHRpdGxlPVwiVGhlIHByb3BlcnR5IG9mIGVhY2ggaXRlbSBpbiB0aGUgZGF0YSBzb3VyY2UgdG8gdXNlIGFzIHRoZSBzZWxlY3QgdmFsdWUuIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBpdGVtIGl0c2VsZiB3aWxsIGJlIHVzZWQuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIG5nLWhpZGU9XCJjb21wb25lbnQuZGF0YVNyYyAhPT0gXFwncmVzb3VyY2VcXCcgfHwgIWNvbXBvbmVudC5kYXRhLnJlc291cmNlIHx8IHJlc291cmNlRmllbGRzLmxlbmd0aCA9PSAwXCI+JyArXG4gICAgICAgICAgICAnPGxhYmVsIGZvcj1cInBsYWNlaG9sZGVyXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgZmllbGQgdG8gdXNlIGFzIHRoZSB2YWx1ZS5cIj5WYWx1ZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwidmFsdWVQcm9wZXJ0eVwiIG5hbWU9XCJ2YWx1ZVByb3BlcnR5XCIgbmctb3B0aW9ucz1cInZhbHVlLnByb3BlcnR5IGFzIHZhbHVlLnRpdGxlIGZvciB2YWx1ZSBpbiByZXNvdXJjZUZpZWxkc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LnZhbHVlUHJvcGVydHlcIj48L3NlbGVjdD4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgbmctaWY9XCJjb21wb25lbnQuZGF0YVNyYyA9PSBcXCdyZXNvdXJjZVxcJyAmJiBjb21wb25lbnQudmFsdWVQcm9wZXJ0eSA9PT0gXFwnXFwnXCI+JyArXG4gICAgICAgICAgJyAgPGxhYmVsIGZvcj1cInBsYWNlaG9sZGVyXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgcHJvcGVydGllcyBvbiB0aGUgcmVzb3VyY2UgdG8gcmV0dXJuIGFzIHBhcnQgb2YgdGhlIG9wdGlvbnMuIFNlcGFyYXRlIHByb3BlcnR5IG5hbWVzIGJ5IGNvbW1hcy4gSWYgbGVmdCBibGFuaywgYWxsIHByb3BlcnRpZXMgd2lsbCBiZSByZXR1cm5lZC5cIj5TZWxlY3QgRmllbGRzPC9sYWJlbD4nICtcbiAgICAgICAgICAnICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwic2VsZWN0RmllbGRzXCIgbmFtZT1cInNlbGVjdEZpZWxkc1wiIG5nLW1vZGVsPVwiY29tcG9uZW50LnNlbGVjdEZpZWxkc1wiIHBsYWNlaG9sZGVyPVwiQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgZmllbGRzIHRvIHNlbGVjdC5cIiB2YWx1ZT1cInt7IGNvbXBvbmVudC5zZWxlY3RGaWVsZHMgfX1cIj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIG5nLXNob3c9XCJjb21wb25lbnQuZGF0YVNyYyA9PSBcXCd1cmxcXCcgfHwgY29tcG9uZW50LmRhdGFTcmMgPT0gXFwncmVzb3VyY2VcXCdcIiBwcm9wZXJ0eT1cInNlYXJjaEZpZWxkXCIgbGFiZWw9XCJTZWFyY2ggUXVlcnkgTmFtZVwiIHBsYWNlaG9sZGVyPVwiTmFtZSBvZiBVUkwgcXVlcnkgcGFyYW1ldGVyXCIgdGl0bGU9XCJUaGUgbmFtZSBvZiB0aGUgc2VhcmNoIHF1ZXJ5c3RyaW5nIHBhcmFtZXRlciB1c2VkIHdoZW4gc2VuZGluZyBhIHJlcXVlc3QgdG8gZmlsdGVyIHJlc3VsdHMgd2l0aC4gVGhlIHNlcnZlciBhdCB0aGUgVVJMIG11c3QgaGFuZGxlIHRoaXMgcXVlcnkgcGFyYW1ldGVyLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gbmctc2hvdz1cImNvbXBvbmVudC5kYXRhU3JjID09IFxcJ3VybFxcJyB8fCBjb21wb25lbnQuZGF0YVNyYyA9PSBcXCdyZXNvdXJjZVxcJ1wiIHByb3BlcnR5PVwiZmlsdGVyXCIgbGFiZWw9XCJGaWx0ZXIgUXVlcnlcIiBwbGFjZWhvbGRlcj1cIlRoZSBmaWx0ZXIgcXVlcnkgZm9yIHJlc3VsdHMuXCIgdGl0bGU9XCJVc2UgdGhpcyB0byBwcm92aWRlIGFkZGl0aW9uYWwgZmlsdGVyaW5nIHVzaW5nIHF1ZXJ5IHBhcmFtZXRlcnMuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIG5nLXNob3c9XCJjb21wb25lbnQuZGF0YVNyYyA9PSBcXCdjdXN0b21cXCdcIj4nICtcbiAgICAgICAgICAnICA8bGFiZWwgZm9yPVwiY3VzdG9tXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJXcml0ZSBjdXN0b20gY29kZSB0byByZXR1cm4gdGhlIHZhbHVlIG9wdGlvbnMuIFRoZSBmb3JtIGRhdGEgb2JqZWN0IGlzIGF2YWlsYWJsZS5cIj5DdXN0b20gVmFsdWVzPC9sYWJlbD4nICtcbiAgICAgICAgICAnICA8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiByb3dzPVwiMTBcIiBpZD1cImN1c3RvbVwiIG5hbWU9XCJjdXN0b21cIiBuZy1tb2RlbD1cImNvbXBvbmVudC5kYXRhLmN1c3RvbVwiIHBsYWNlaG9sZGVyPVwiLyoqKiBFeGFtcGxlIENvZGUgKioqL1xcbnZhbHVlcyA9IGRhdGFbXFwnbXlrZXlcXCddO1wiPnt7IGNvbXBvbmVudC5kYXRhLmN1c3RvbSB9fTwvdGV4dGFyZWE+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiVGhlIEhUTUwgdGVtcGxhdGUgZm9yIHRoZSByZXN1bHQgZGF0YSBpdGVtcy5cIj5JdGVtIFRlbXBsYXRlPC9sYWJlbD4nICtcbiAgICAgICAgICAgICc8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInRlbXBsYXRlXCIgbmFtZT1cInRlbXBsYXRlXCIgbmctbW9kZWw9XCJjb21wb25lbnQudGVtcGxhdGVcIiByb3dzPVwiM1wiPnt7IGNvbXBvbmVudC50ZW1wbGF0ZSB9fTwvdGV4dGFyZWE+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIG5nLWhpZGU9XCJjb21wb25lbnQuZGF0YVNyYyA9PSBcXCd2YWx1ZXNcXCcgfHwgY29tcG9uZW50LmRhdGFTcmMgPT0gXFwnanNvblxcJ1wiPicgK1xuICAgICAgICAgICcgIDxsYWJlbCBmb3I9XCJwbGFjZWhvbGRlclwiIGZvcm0tYnVpbGRlci10b29sdGlwPVwiUmVmcmVzaCBkYXRhIHdoZW4gYW5vdGhlciBmaWVsZCBjaGFuZ2VzLlwiPlJlZnJlc2ggT248L2xhYmVsPicgK1xuICAgICAgICAgICcgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInJlZnJlc2hPblwiIG5hbWU9XCJyZWZyZXNoT25cIiBuZy1vcHRpb25zPVwiZmllbGQua2V5IGFzIGZpZWxkLmxhYmVsIGZvciBmaWVsZCBpbiBmb3JtRmllbGRzXCIgbmctbW9kZWw9XCJjb21wb25lbnQucmVmcmVzaE9uXCI+PC9zZWxlY3Q+JyArXG4gICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBuZy1zaG93PVwiY29tcG9uZW50LmRhdGFTcmMgPT0gXFwncmVzb3VyY2VcXCcgfHwgY29tcG9uZW50LmRhdGFTcmMgPT0gXFwndXJsXFwnIHx8IGNvbXBvbmVudC5kYXRhU3JjID09IFxcJ2N1c3RvbVxcJ1wiIHByb3BlcnR5PVwiY2xlYXJPblJlZnJlc2hcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIG5nLXNob3c9XCJjb21wb25lbnQuZGF0YVNyYyA9PSBcXCd1cmxcXCdcIiBwcm9wZXJ0eT1cImF1dGhlbnRpY2F0ZVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIEFQSSBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdC92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInVuaXF1ZVwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdzZWxlY3Rib3hlcycsIHtcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXBsdXMtc3F1YXJlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3NlbGVjdGJveGVzL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0Ym94ZXMvdmFsaWRhdGUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBUEknLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9zZWxlY3Rib3hlcy9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jc2VsZWN0Ym94ZXMnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0Ym94ZXMvZGlzcGxheS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImxhYmVsXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8dmFsdWUtYnVpbGRlciBkYXRhPVwiY29tcG9uZW50LnZhbHVlc1wiIGxhYmVsPVwiU2VsZWN0IEJveGVzXCIgdG9vbHRpcC10ZXh0PVwiQ2hlY2tib3hlcyB0byBkaXNwbGF5LiBMYWJlbHMgYXJlIHNob3duIGluIHRoZSBmb3JtLiBWYWx1ZXMgYXJlIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcyBzYXZlZCB3aXRoIHRoZSBzdWJtaXNzaW9uLlwiPjwvdmFsdWUtYnVpbGRlcj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ0YWJpbmRleFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJpbmxpbmVcIiB0eXBlPVwiY2hlY2tib3hcIiBsYWJlbD1cIklubGluZSBMYXlvdXRcIiB0aXRsZT1cIkRpc3BsYXlzIHRoZSBjaGVja2JveGVzIGhvcml6b250YWxseS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgQVBJIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0Ym94ZXMvYXBpLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uLWtleT48L2Zvcm0tYnVpbGRlci1vcHRpb24ta2V5PicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgQVBJIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvc2VsZWN0Ym94ZXMvdmFsaWRhdGUuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5yZXF1aXJlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdzaWduYXR1cmUnLCB7XG4gICAgICAgIGljb246ICdmYSBmYS1wZW5jaWwnLFxuICAgICAgICB2aWV3czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdEaXNwbGF5JyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvc2lnbmF0dXJlL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdWYWxpZGF0aW9uJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvc2lnbmF0dXJlL3ZhbGlkYXRlLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xheW91dCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9sYXlvdXQuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdDb25kaXRpb25hbCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9jb25kaXRpb25hbC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyNzaWduYXR1cmUnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHNldHRpbmdzIG1hcmt1cC5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvc2lnbmF0dXJlL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJmb290ZXJcIiBsYWJlbD1cIkZvb3RlciBMYWJlbFwiIHBsYWNlaG9sZGVyPVwiRm9vdGVyIExhYmVsXCIgdGl0bGU9XCJUaGUgZm9vdGVyIHRleHQgdGhhdCBhcHBlYXJzIGJlbG93IHRoZSBzaWduYXR1cmUgYXJlYS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwid2lkdGhcIiBsYWJlbD1cIldpZHRoXCIgcGxhY2Vob2xkZXI9XCJXaWR0aFwiIHRpdGxlPVwiVGhlIHdpZHRoIG9mIHRoZSBzaWduYXR1cmUgYXJlYS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaGVpZ2h0XCIgbGFiZWw9XCJIZWlnaHRcIiBwbGFjZWhvbGRlcj1cIkhlaWdodFwiIHRpdGxlPVwiVGhlIGhlaWdodCBvZiB0aGUgc2lnbmF0dXJlIGFyZWEuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImJhY2tncm91bmRDb2xvclwiIGxhYmVsPVwiQmFja2dyb3VuZCBDb2xvclwiIHBsYWNlaG9sZGVyPVwiQmFja2dyb3VuZCBDb2xvclwiIHRpdGxlPVwiVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIHNpZ25hdHVyZSBhcmVhLlwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZW5Db2xvclwiIGxhYmVsPVwiUGVuIENvbG9yXCIgcGxhY2Vob2xkZXI9XCJQZW4gQ29sb3JcIiB0aXRsZT1cIlRoZSBpbmsgY29sb3IgZm9yIHRoZSBzaWduYXR1cmUgYXJlYS5cIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgVmFsaWRhdGlvbiBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3NpZ25hdHVyZS92YWxpZGF0ZS5odG1sJyxcbiAgICAgICAgJzxuZy1mb3JtPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLnJlcXVpcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCdzdXJ2ZXknLCB7XG4gICAgICAgIGljb246ICdmYSBmYS1saXN0JyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3N1cnZleS9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3N1cnZleS92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jc3VydmV5J1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3N1cnZleS9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzx2YWx1ZS1idWlsZGVyIGRhdGE9XCJjb21wb25lbnQucXVlc3Rpb25zXCIgZGVmYXVsdD1cImNvbXBvbmVudC5xdWVzdGlvbnNcIiBsYWJlbD1cIlF1ZXN0aW9uc1wiIHRvb2x0aXAtdGV4dD1cIlRoZSBxdWVzdGlvbnMgeW91IHdvdWxkIGxpa2UgdG8gYXMgaW4gdGhpcyBzdXJ2ZXkgcXVlc3Rpb24uXCI+PC92YWx1ZS1idWlsZGVyPicgK1xuICAgICAgICAgICc8dmFsdWUtYnVpbGRlciBkYXRhPVwiY29tcG9uZW50LnZhbHVlc1wiIGRlZmF1bHQ9XCJjb21wb25lbnQudmFsdWVzXCIgbGFiZWw9XCJWYWx1ZXNcIiB0b29sdGlwLXRleHQ9XCJUaGUgdmFsdWVzIHRoYXQgY2FuIGJlIHNlbGVjdGVkIHBlciBxdWVzdGlvbi4gRXhhbXBsZTogXFwnU2F0aXNmaWVkXFwnLCBcXCdWZXJ5IFNhdGlzZmllZFxcJywgZXRjLlwiPjwvdmFsdWUtYnVpbGRlcj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJkZWZhdWx0VmFsdWVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW5saW5lXCIgdHlwZT1cImNoZWNrYm94XCIgbGFiZWw9XCJJbmxpbmUgTGF5b3V0XCIgdGl0bGU9XCJEaXNwbGF5cyB0aGUgcmFkaW8gYnV0dG9ucyBob3Jpem9udGFsbHkuXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByb3RlY3RlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJwZXJzaXN0ZW50XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImRpc2FibGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInRhYmxlVmlld1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgICAgLy8gQ3JlYXRlIHRoZSBBUEkgbWFya3VwLlxuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9zdXJ2ZXkvdmFsaWRhdGUuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5yZXF1aXJlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCd0YWJsZScsIHtcbiAgICAgICAgZmJ0ZW1wbGF0ZTogJ2Zvcm1pby9mb3JtYnVpbGRlci90YWJsZS5odG1sJyxcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJ2h0dHA6Ly9oZWxwLmZvcm0uaW8vdXNlcmd1aWRlLyN0YWJsZScsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZSxcbiAgICAgICAgaWNvbjogJ2ZhIGZhLXRhYmxlJyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3RhYmxlL2Rpc3BsYXkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICB2YXIgdGFibGVDbGFzc2VzID0gXCJ7J3RhYmxlLXN0cmlwZWQnOiBjb21wb25lbnQuc3RyaXBlZCwgXCI7XG4gICAgICB0YWJsZUNsYXNzZXMgKz0gXCIndGFibGUtYm9yZGVyZWQnOiBjb21wb25lbnQuYm9yZGVyZWQsIFwiO1xuICAgICAgdGFibGVDbGFzc2VzICs9IFwiJ3RhYmxlLWhvdmVyJzogY29tcG9uZW50LmhvdmVyLCBcIjtcbiAgICAgIHRhYmxlQ2xhc3NlcyArPSBcIid0YWJsZS1jb25kZW5zZWQnOiBjb21wb25lbnQuY29uZGVuc2VkfVwiO1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvdGFibGUuaHRtbCcsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFibGUtcmVzcG9uc2l2ZVwiPicgK1xuICAgICAgICAgICc8dGFibGUgbmctY2xhc3M9XCInICsgdGFibGVDbGFzc2VzICsgJ1wiIGNsYXNzPVwidGFibGVcIj4nICtcbiAgICAgICAgICAgICc8dGhlYWQgbmctaWY9XCJjb21wb25lbnQuaGVhZGVyLmxlbmd0aFwiPjx0cj4nICtcbiAgICAgICAgICAgICAgJzx0aCBuZy1yZXBlYXQ9XCJoZWFkZXIgaW4gY29tcG9uZW50LmhlYWRlclwiPnt7IGhlYWRlciB9fTwvdGg+JyArXG4gICAgICAgICAgICAnPC90cj48L3RoZWFkPicgK1xuICAgICAgICAgICAgJzx0Ym9keT4nICtcbiAgICAgICAgICAgICAgJzx0ciBuZy1yZXBlYXQ9XCJyb3cgaW4gY29tcG9uZW50LnJvd3NcIj4nICtcbiAgICAgICAgICAgICAgICAnPHRkIG5nLXJlcGVhdD1cImNvbXBvbmVudCBpbiByb3dcIj4nICtcbiAgICAgICAgICAgICAgICAgICc8Zm9ybS1idWlsZGVyLWxpc3QgY29tcG9uZW50PVwiY29tcG9uZW50XCIgZm9ybT1cImZvcm1cIiBmb3JtaW89XCI6OmZvcm1pb1wiPjwvZm9ybS1idWlsZGVyLWxpc3Q+JyArXG4gICAgICAgICAgICAgICAgJzwvdGQ+JyArXG4gICAgICAgICAgICAgICc8L3RyPicgK1xuICAgICAgICAgICAgJzwvdGJvZHk+JyArXG4gICAgICAgICAgJzwvdGFibGU+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgICApO1xuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3RhYmxlL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci10YWJsZT48L2Zvcm0tYnVpbGRlci10YWJsZT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdHJpcGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImJvcmRlcmVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImhvdmVyXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cImNvbmRlbnNlZFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzwvbmctZm9ybT4nXG4gICAgICApO1xuICAgIH1cbiAgXSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29uZmlnKFtcbiAgICAnZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyJyxcbiAgICBmdW5jdGlvbihmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIpIHtcbiAgICAgIGZvcm1pb0NvbXBvbmVudHNQcm92aWRlci5yZWdpc3RlcigndGV4dGFyZWEnLCB7XG4gICAgICAgIGljb246ICdmYSBmYS1mb250JyxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3RleHRmaWVsZC9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGF0YScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9kYXRhLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3RleHRmaWVsZC92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jdGV4dGFyZWEnXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbmZpZyhbXG4gICAgJ2Zvcm1pb0NvbXBvbmVudHNQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyKSB7XG4gICAgICBmb3JtaW9Db21wb25lbnRzUHJvdmlkZXIucmVnaXN0ZXIoJ3RleHRmaWVsZCcsIHtcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3RleHRmaWVsZC9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGF0YScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9kYXRhLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnVmFsaWRhdGlvbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3RleHRmaWVsZC92YWxpZGF0ZS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FQSScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9hcGkuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMYXlvdXQnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vbGF5b3V0Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQ29uZGl0aW9uYWwnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdmb3JtaW8vY29tcG9uZW50cy9jb21tb24vY29uZGl0aW9uYWwuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jdGV4dGZpZWxkJ1xuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5ncyBtYXJrdXAuXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9jb21wb25lbnRzL3RleHRmaWVsZC9kaXNwbGF5Lmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibGFiZWxcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicGxhY2Vob2xkZXJcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiaW5wdXRNYXNrXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInByZWZpeFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJzdWZmaXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiY3VzdG9tQ2xhc3NcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFiaW5kZXhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwibXVsdGlwbGVcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwicHJvdGVjdGVkXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInBlcnNpc3RlbnRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwiZGlzYWJsZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidGFibGVWaWV3XCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG5cbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvdGV4dGZpZWxkL3ZhbGlkYXRlLmh0bWwnLFxuICAgICAgICAnPG5nLWZvcm0+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucmVxdWlyZWRcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidW5pcXVlXCI+PC9mb3JtLWJ1aWxkZXItb3B0aW9uPicgK1xuICAgICAgICAgICc8Zm9ybS1idWlsZGVyLW9wdGlvbiBwcm9wZXJ0eT1cInZhbGlkYXRlLm1pbkxlbmd0aFwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJ2YWxpZGF0ZS5tYXhMZW5ndGhcIj48L2Zvcm0tYnVpbGRlci1vcHRpb24+JyArXG4gICAgICAgICAgJzxmb3JtLWJ1aWxkZXItb3B0aW9uIHByb3BlcnR5PVwidmFsaWRhdGUucGF0dGVyblwiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24tY3VzdG9tLXZhbGlkYXRpb24+PC9mb3JtLWJ1aWxkZXItb3B0aW9uLWN1c3RvbS12YWxpZGF0aW9uPicgK1xuICAgICAgICAnPC9uZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5jb25maWcoW1xuICAgICdmb3JtaW9Db21wb25lbnRzUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudHNQcm92aWRlcikge1xuICAgICAgZm9ybWlvQ29tcG9uZW50c1Byb3ZpZGVyLnJlZ2lzdGVyKCd3ZWxsJywge1xuICAgICAgICBmYnRlbXBsYXRlOiAnZm9ybWlvL2Zvcm1idWlsZGVyL3dlbGwuaHRtbCcsXG4gICAgICAgIGljb246ICdmYSBmYS1zcXVhcmUtbycsXG4gICAgICAgIGRvY3VtZW50YXRpb246ICdodHRwOi8vaGVscC5mb3JtLmlvL3VzZXJndWlkZS8jd2VsbCcsXG4gICAgICAgIG5vRG5kT3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgY29uZmlybVJlbW92ZTogdHJ1ZSxcbiAgICAgICAgdmlld3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRGlzcGxheScsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL2NvbW1vbi9kaXNwbGF5Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQVBJJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2FwaS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmRpdGlvbmFsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2NvbmRpdGlvbmFsLmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci93ZWxsLmh0bWwnLFxuICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIj4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cImNvbXBvbmVudFwiIGZvcm09XCJmb3JtXCIgZm9ybWlvPVwiOjpmb3JtaW9cIj48L2Zvcm0tYnVpbGRlci1saXN0PicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICAgKTtcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2NvbXBvbmVudHMvY29tbW9uL2Rpc3BsYXkuaHRtbCcsXG4gICAgICAgICc8bmctZm9ybT4nICtcbiAgICAgICAgICAnPGZvcm0tYnVpbGRlci1vcHRpb24gcHJvcGVydHk9XCJjdXN0b21DbGFzc1wiPjwvZm9ybS1idWlsZGVyLW9wdGlvbj4nICtcbiAgICAgICAgJzxuZy1mb3JtPidcbiAgICAgICk7XG4gICAgfVxuICBdKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICAqIFRoZXNlIGFyZSBjb21wb25lbnQgb3B0aW9ucyB0aGF0IGNhbiBiZSByZXVzZWRcbiAgKiB3aXRoIHRoZSBidWlsZGVyLW9wdGlvbiBkaXJlY3RpdmVcbiAgKiBWYWxpZCBwcm9wZXJ0aWVzOiBsYWJlbCwgcGxhY2Vob2xkZXIsIHRvb2x0aXAsIHR5cGVcbiAgKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsYWJlbDoge1xuICAgIGxhYmVsOiAnTGFiZWwnLFxuICAgIHBsYWNlaG9sZGVyOiAnRmllbGQgTGFiZWwnLFxuICAgIHRvb2x0aXA6ICdUaGUgbGFiZWwgZm9yIHRoaXMgZmllbGQgdGhhdCB3aWxsIGFwcGVhciBuZXh0IHRvIGl0LidcbiAgfSxcbiAgZGVmYXVsdFZhbHVlOiB7XG4gICAgbGFiZWw6ICdEZWZhdWx0IFZhbHVlJyxcbiAgICBwbGFjZWhvbGRlcjogJ0RlZmF1bHQgVmFsdWUnLFxuICAgIHRvb2x0aXA6ICdUaGUgd2lsbCBiZSB0aGUgdmFsdWUgZm9yIHRoaXMgZmllbGQsIGJlZm9yZSB1c2VyIGludGVyYWN0aW9uLiBIYXZpbmcgYSBkZWZhdWx0IHZhbHVlIHdpbGwgb3ZlcnJpZGUgdGhlIHBsYWNlaG9sZGVyIHRleHQuJ1xuICB9LFxuICBwbGFjZWhvbGRlcjoge1xuICAgIGxhYmVsOiAnUGxhY2Vob2xkZXInLFxuICAgIHBsYWNlaG9sZGVyOiAnUGxhY2Vob2xkZXInLFxuICAgIHRvb2x0aXA6ICdUaGUgcGxhY2Vob2xkZXIgdGV4dCB0aGF0IHdpbGwgYXBwZWFyIHdoZW4gdGhpcyBmaWVsZCBpcyBlbXB0eS4nXG4gIH0sXG4gIGlucHV0TWFzazoge1xuICAgIGxhYmVsOiAnSW5wdXQgTWFzaycsXG4gICAgcGxhY2Vob2xkZXI6ICdJbnB1dCBNYXNrJyxcbiAgICB0b29sdGlwOiAnQW4gaW5wdXQgbWFzayBoZWxwcyB0aGUgdXNlciB3aXRoIGlucHV0IGJ5IGVuc3VyaW5nIGEgcHJlZGVmaW5lZCBmb3JtYXQuPGJyPjxicj45OiBudW1lcmljPGJyPmE6IGFscGhhYmV0aWNhbDxicj4qOiBhbHBoYW51bWVyaWM8YnI+PGJyPkV4YW1wbGUgdGVsZXBob25lIG1hc2s6ICg5OTkpIDk5OS05OTk5PGJyPjxicj5TZWUgdGhlIDxhIHRhcmdldD1cXCdfYmxhbmtcXCcgaHJlZj1cXCdodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL2pxdWVyeS5pbnB1dG1hc2tcXCc+anF1ZXJ5LmlucHV0bWFzayBkb2N1bWVudGF0aW9uPC9hPiBmb3IgbW9yZSBpbmZvcm1hdGlvbi48L2E+J1xuICB9LFxuICBhdXRoZW50aWNhdGU6IHtcbiAgICBsYWJlbDogJ0Zvcm1pbyBBdXRoZW50aWNhdGUnLFxuICAgIHRvb2x0aXA6ICdDaGVjayB0aGlzIGlmIHlvdSB3b3VsZCBsaWtlIHRvIHVzZSBGb3JtaW8gQXV0aGVudGljYXRpb24gd2l0aCB0aGUgcmVxdWVzdC4nLFxuICAgIHR5cGU6ICdjaGVja2JveCdcbiAgfSxcbiAgdGFibGVWaWV3OiB7XG4gICAgbGFiZWw6ICdUYWJsZSBWaWV3JyxcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgIHRvb2x0aXA6ICdTaG93cyB0aGlzIHZhbHVlIHdpdGhpbiB0aGUgdGFibGUgdmlldyBvZiB0aGUgc3VibWlzc2lvbnMuJ1xuICB9LFxuICBwcmVmaXg6IHtcbiAgICBsYWJlbDogJ1ByZWZpeCcsXG4gICAgcGxhY2Vob2xkZXI6ICdleGFtcGxlIFxcJyRcXCcsIFxcJ0BcXCcnLFxuICAgIHRvb2x0aXA6ICdUaGUgdGV4dCB0byBzaG93IGJlZm9yZSBhIGZpZWxkLidcbiAgfSxcbiAgc3VmZml4OiB7XG4gICAgbGFiZWw6ICdTdWZmaXgnLFxuICAgIHBsYWNlaG9sZGVyOiAnZXhhbXBsZSBcXCckXFwnLCBcXCdAXFwnJyxcbiAgICB0b29sdGlwOiAnVGhlIHRleHQgdG8gc2hvdyBhZnRlciBhIGZpZWxkLidcbiAgfSxcbiAgbXVsdGlwbGU6IHtcbiAgICBsYWJlbDogJ011bHRpcGxlIFZhbHVlcycsXG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICB0b29sdGlwOiAnQWxsb3dzIG11bHRpcGxlIHZhbHVlcyB0byBiZSBlbnRlcmVkIGZvciB0aGlzIGZpZWxkLidcbiAgfSxcbiAgZGlzYWJsZWQ6IHtcbiAgICBsYWJlbDogJ0Rpc2FibGVkJyxcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgIHRvb2x0aXA6ICdEaXNhYmxlIHRoZSBmb3JtIGlucHV0LidcbiAgfSxcbiAgY2xlYXJPblJlZnJlc2g6IHtcbiAgICBsYWJlbDogJ0NsZWFyIFZhbHVlIE9uIFJlZnJlc2gnLFxuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgdG9vbHRpcDogJ1doZW4gdGhlIFJlZnJlc2ggT24gZmllbGQgaXMgY2hhbmdlZCwgY2xlYXIgdGhlIHNlbGVjdGVkIHZhbHVlLidcbiAgfSxcbiAgdW5pcXVlOiB7XG4gICAgbGFiZWw6ICdVbmlxdWUnLFxuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgdG9vbHRpcDogJ01ha2VzIHN1cmUgdGhlIGRhdGEgc3VibWl0dGVkIGZvciB0aGlzIGZpZWxkIGlzIHVuaXF1ZSwgYW5kIGhhcyBub3QgYmVlbiBzdWJtaXR0ZWQgYmVmb3JlLidcbiAgfSxcbiAgcHJvdGVjdGVkOiB7XG4gICAgbGFiZWw6ICdQcm90ZWN0ZWQnLFxuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgdG9vbHRpcDogJ0EgcHJvdGVjdGVkIGZpZWxkIHdpbGwgbm90IGJlIHJldHVybmVkIHdoZW4gcXVlcmllZCB2aWEgQVBJLidcbiAgfSxcbiAgaW1hZ2U6IHtcbiAgICBsYWJlbDogJ0Rpc3BsYXkgYXMgaW1hZ2VzJyxcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgIHRvb2x0aXA6ICdJbnN0ZWFkIG9mIGEgbGlzdCBvZiBsaW5rZWQgZmlsZXMsIGltYWdlcyB3aWxsIGJlIHJlbmRlcmVkIGluIHRoZSB2aWV3LidcbiAgfSxcbiAgaW1hZ2VTaXplOiB7XG4gICAgbGFiZWw6ICdJbWFnZSBTaXplJyxcbiAgICBwbGFjZWhvbGRlcjogJzEwMCcsXG4gICAgdG9vbHRpcDogJ1RoZSBpbWFnZSBzaXplIGZvciBwcmV2aWV3aW5nIGltYWdlcy4nXG4gIH0sXG4gIHBlcnNpc3RlbnQ6IHtcbiAgICBsYWJlbDogJ1BlcnNpc3RlbnQnLFxuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgdG9vbHRpcDogJ0EgcGVyc2lzdGVudCBmaWVsZCB3aWxsIGJlIHN0b3JlZCBpbiBkYXRhYmFzZSB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZC4nXG4gIH0sXG4gIGJsb2NrOiB7XG4gICAgbGFiZWw6ICdCbG9jaycsXG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICB0b29sdGlwOiAnVGhpcyBjb250cm9sIHNob3VsZCBzcGFuIHRoZSBmdWxsIHdpZHRoIG9mIHRoZSBib3VuZGluZyBjb250YWluZXIuJ1xuICB9LFxuICBsZWZ0SWNvbjoge1xuICAgIGxhYmVsOiAnTGVmdCBJY29uJyxcbiAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGljb24gY2xhc3NlcycsXG4gICAgdG9vbHRpcDogJ1RoaXMgaXMgdGhlIGZ1bGwgaWNvbiBjbGFzcyBzdHJpbmcgdG8gc2hvdyB0aGUgaWNvbi4gRXhhbXBsZTogXFwnZ2x5cGhpY29uIGdseXBoaWNvbi1zZWFyY2hcXCcgb3IgXFwnZmEgZmEtcGx1c1xcJydcbiAgfSxcbiAgcmlnaHRJY29uOiB7XG4gICAgbGFiZWw6ICdSaWdodCBJY29uJyxcbiAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGljb24gY2xhc3NlcycsXG4gICAgdG9vbHRpcDogJ1RoaXMgaXMgdGhlIGZ1bGwgaWNvbiBjbGFzcyBzdHJpbmcgdG8gc2hvdyB0aGUgaWNvbi4gRXhhbXBsZTogXFwnZ2x5cGhpY29uIGdseXBoaWNvbi1zZWFyY2hcXCcgb3IgXFwnZmEgZmEtcGx1c1xcJydcbiAgfSxcbiAgdXJsOiB7XG4gICAgbGFiZWw6ICdVcGxvYWQgVXJsJyxcbiAgICBwbGFjZWhvbGRlcjogJ0VudGVyIHRoZSB1cmwgdG8gcG9zdCB0aGUgZmlsZXMgdG8uJyxcbiAgICB0b29sdGlwOiAnU2VlIDxhIGhyZWY9XFwnaHR0cHM6Ly9naXRodWIuY29tL2RhbmlhbGZhcmlkL25nLWZpbGUtdXBsb2FkI3NlcnZlci1zaWRlXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+aHR0cHM6Ly9naXRodWIuY29tL2RhbmlhbGZhcmlkL25nLWZpbGUtdXBsb2FkI3NlcnZlci1zaWRlPC9hPiBmb3IgaG93IHRvIHNldCB1cCB0aGUgc2VydmVyLidcbiAgfSxcbiAgZGlyOiB7XG4gICAgbGFiZWw6ICdEaXJlY3RvcnknLFxuICAgIHBsYWNlaG9sZGVyOiAnKG9wdGlvbmFsKSBFbnRlciBhIGRpcmVjdG9yeSBmb3IgdGhlIGZpbGVzJyxcbiAgICB0b29sdGlwOiAnVGhpcyB3aWxsIHBsYWNlIGFsbCB0aGUgZmlsZXMgdXBsb2FkZWQgaW4gdGhpcyBmaWVsZCBpbiB0aGUgZGlyZWN0b3J5J1xuICB9LFxuICBkaXNhYmxlT25JbnZhbGlkOiB7XG4gICAgbGFiZWw6ICdEaXNhYmxlIG9uIEZvcm0gSW52YWxpZCcsXG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICB0b29sdGlwOiAnVGhpcyB3aWxsIGRpc2FibGUgdGhpcyBmaWVsZCBpZiB0aGUgZm9ybSBpcyBpbnZhbGlkLidcbiAgfSxcbiAgc3RyaXBlZDoge1xuICAgIGxhYmVsOiAnU3RyaXBlZCcsXG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICB0b29sdGlwOiAnVGhpcyB3aWxsIHN0cmlwZSB0aGUgdGFibGUgaWYgY2hlY2tlZC4nXG4gIH0sXG4gIGJvcmRlcmVkOiB7XG4gICAgbGFiZWw6ICdCb3JkZXJlZCcsXG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICB0b29sdGlwOiAnVGhpcyB3aWxsIGJvcmRlciB0aGUgdGFibGUgaWYgY2hlY2tlZC4nXG4gIH0sXG4gIGhvdmVyOiB7XG4gICAgbGFiZWw6ICdIb3ZlcicsXG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICB0b29sdGlwOiAnSGlnaGxpZ2h0IGEgcm93IG9uIGhvdmVyLidcbiAgfSxcbiAgY29uZGVuc2VkOiB7XG4gICAgbGFiZWw6ICdDb25kZW5zZWQnLFxuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgdG9vbHRpcDogJ0NvbmRlbnNlIHRoZSBzaXplIG9mIHRoZSB0YWJsZS4nXG4gIH0sXG4gICd2YWxpZGF0ZS5yZXF1aXJlZCc6IHtcbiAgICBsYWJlbDogJ1JlcXVpcmVkJyxcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgIHRvb2x0aXA6ICdBIHJlcXVpcmVkIGZpZWxkIG11c3QgYmUgZmlsbGVkIGluIGJlZm9yZSB0aGUgZm9ybSBjYW4gYmUgc3VibWl0dGVkLidcbiAgfSxcbiAgJ3ZhbGlkYXRlLm1pbkxlbmd0aCc6IHtcbiAgICBsYWJlbDogJ01pbmltdW0gTGVuZ3RoJyxcbiAgICBwbGFjZWhvbGRlcjogJ01pbmltdW0gTGVuZ3RoJyxcbiAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICB0b29sdGlwOiAnVGhlIG1pbmltdW0gbGVuZ3RoIHJlcXVpcmVtZW50IHRoaXMgZmllbGQgbXVzdCBtZWV0LidcbiAgfSxcbiAgJ3ZhbGlkYXRlLm1heExlbmd0aCc6IHtcbiAgICBsYWJlbDogJ01heGltdW0gTGVuZ3RoJyxcbiAgICBwbGFjZWhvbGRlcjogJ01heGltdW0gTGVuZ3RoJyxcbiAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICB0b29sdGlwOiAnVGhlIG1heGltdW0gbGVuZ3RoIHJlcXVpcmVtZW50IHRoaXMgZmllbGQgbXVzdCBtZWV0J1xuICB9LFxuICAndmFsaWRhdGUucGF0dGVybic6IHtcbiAgICBsYWJlbDogJ1JlZ3VsYXIgRXhwcmVzc2lvbiBQYXR0ZXJuJyxcbiAgICBwbGFjZWhvbGRlcjogJ1JlZ3VsYXIgRXhwcmVzc2lvbiBQYXR0ZXJuJyxcbiAgICB0b29sdGlwOiAnVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuIHRlc3QgdGhhdCB0aGUgZmllbGQgdmFsdWUgbXVzdCBwYXNzIGJlZm9yZSB0aGUgZm9ybSBjYW4gYmUgc3VibWl0dGVkLidcbiAgfSxcbiAgJ2N1c3RvbUNsYXNzJzoge1xuICAgIGxhYmVsOiAnQ3VzdG9tIENTUyBDbGFzcycsXG4gICAgcGxhY2Vob2xkZXI6ICdDdXN0b20gQ1NTIENsYXNzJyxcbiAgICB0b29sdGlwOiAnQ3VzdG9tIENTUyBjbGFzcyB0byBhZGQgdG8gdGhpcyBjb21wb25lbnQuJ1xuICB9LFxuICAndGFiaW5kZXgnOiB7XG4gICAgbGFiZWw6ICdUYWIgSW5kZXgnLFxuICAgIHBsYWNlaG9sZGVyOiAnVGFiIEluZGV4JyxcbiAgICB0b29sdGlwOiAnU2V0cyB0aGUgdGFiaW5kZXggYXR0cmlidXRlIG9mIHRoaXMgY29tcG9uZW50IHRvIG92ZXJyaWRlIHRoZSB0YWIgb3JkZXIgb2YgdGhlIGZvcm0uIFNlZSB0aGUgPGEgaHJlZj1cXCdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0dsb2JhbF9hdHRyaWJ1dGVzL3RhYmluZGV4XFwnPk1ETiBkb2N1bWVudGF0aW9uPC9hPiBvbiB0YWJpbmRleCBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nXG4gIH0sXG4gICdhZGRBbm90aGVyJzoge1xuICAgIGxhYmVsOiAnQWRkIEFub3RoZXIgVGV4dCcsXG4gICAgcGxhY2Vob2xkZXI6ICdBZGQgQW5vdGhlcicsXG4gICAgdG9vbHRpcDogJ1NldCB0aGUgdGV4dCBvZiB0aGUgQWRkIEFub3RoZXIgYnV0dG9uLidcbiAgfSxcbiAgJ2RlZmF1bHREYXRlJzoge1xuICAgIGxhYmVsOiAnRGVmYXVsdCBWYWx1ZScsXG4gICAgcGxhY2Vob2xkZXI6ICdEZWZhdWx0IFZhbHVlJyxcbiAgICB0b29sdGlwOiAnWW91IGNhbiB1c2UgTW9tZW50LmpzIGZ1bmN0aW9ucyB0byBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgdG8gYSBzcGVjaWZpYyBkYXRlLiBGb3IgZXhhbXBsZTogXFxuIFxcbiBtb21lbnQoKS5zdWJ0cmFjdCgxMCwgXFwnZGF5c1xcJykuY2FsZW5kYXIoKTsnXG4gIH0sXG4gIC8vIE5lZWQgdG8gdXNlIGFycmF5IG5vdGF0aW9uIHRvIGhhdmUgZGFzaCBpbiBuYW1lXG4gICdzdHlsZVtcXCdtYXJnaW4tdG9wXFwnXSc6IHtcbiAgICBsYWJlbDogJ01hcmdpbiBUb3AnLFxuICAgIHBsYWNlaG9sZGVyOiAnMHB4JyxcbiAgICB0b29sdGlwOiAnU2V0cyB0aGUgdG9wIG1hcmdpbiBvZiB0aGlzIGNvbXBvbmVudC4gTXVzdCBiZSBhIHZhbGlkIENTUyBtZWFzdXJlbWVudCBsaWtlIGAxMHB4YC4nXG4gIH0sXG4gICdzdHlsZVtcXCdtYXJnaW4tcmlnaHRcXCddJzoge1xuICAgIGxhYmVsOiAnTWFyZ2luIFJpZ2h0JyxcbiAgICBwbGFjZWhvbGRlcjogJzBweCcsXG4gICAgdG9vbHRpcDogJ1NldHMgdGhlIHJpZ2h0IG1hcmdpbiBvZiB0aGlzIGNvbXBvbmVudC4gTXVzdCBiZSBhIHZhbGlkIENTUyBtZWFzdXJlbWVudCBsaWtlIGAxMHB4YC4nXG4gIH0sXG4gICdzdHlsZVtcXCdtYXJnaW4tYm90dG9tXFwnXSc6IHtcbiAgICBsYWJlbDogJ01hcmdpbiBCb3R0b20nLFxuICAgIHBsYWNlaG9sZGVyOiAnMHB4JyxcbiAgICB0b29sdGlwOiAnU2V0cyB0aGUgYm90dG9tIG1hcmdpbiBvZiB0aGlzIGNvbXBvbmVudC4gTXVzdCBiZSBhIHZhbGlkIENTUyBtZWFzdXJlbWVudCBsaWtlIGAxMHB4YC4nXG4gIH0sXG4gICdzdHlsZVtcXCdtYXJnaW4tbGVmdFxcJ10nOiB7XG4gICAgbGFiZWw6ICdNYXJnaW4gTGVmdCcsXG4gICAgcGxhY2Vob2xkZXI6ICcwcHgnLFxuICAgIHRvb2x0aXA6ICdTZXRzIHRoZSBsZWZ0IG1hcmdpbiBvZiB0aGlzIGNvbXBvbmVudC4gTXVzdCBiZSBhIHZhbGlkIENTUyBtZWFzdXJlbWVudCBsaWtlIGAxMHB4YC4nXG4gIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBhY3Rpb25zOiBbXG4gICAge1xuICAgICAgbmFtZTogJ3N1Ym1pdCcsXG4gICAgICB0aXRsZTogJ1N1Ym1pdCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdldmVudCcsXG4gICAgICB0aXRsZTogJ0V2ZW50J1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3Jlc2V0JyxcbiAgICAgIHRpdGxlOiAnUmVzZXQnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnb2F1dGgnLFxuICAgICAgdGl0bGU6ICdPQXV0aCdcbiAgICB9XG4gIF0sXG4gIHRoZW1lczogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdkZWZhdWx0JyxcbiAgICAgIHRpdGxlOiAnRGVmYXVsdCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdwcmltYXJ5JyxcbiAgICAgIHRpdGxlOiAnUHJpbWFyeSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdpbmZvJyxcbiAgICAgIHRpdGxlOiAnSW5mbydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnU3VjY2VzcydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdkYW5nZXInLFxuICAgICAgdGl0bGU6ICdEYW5nZXInXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnd2FybmluZycsXG4gICAgICB0aXRsZTogJ1dhcm5pbmcnXG4gICAgfVxuICBdLFxuICBzaXplczogW1xuICAgIHtcbiAgICAgIG5hbWU6ICd4cycsXG4gICAgICB0aXRsZTogJ0V4dHJhIFNtYWxsJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3NtJyxcbiAgICAgIHRpdGxlOiAnU21hbGwnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbWQnLFxuICAgICAgdGl0bGU6ICdNZWRpdW0nXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbGcnLFxuICAgICAgdGl0bGU6ICdMYXJnZSdcbiAgICB9XG4gIF1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qZXNsaW50IG1heC1zdGF0ZW1lbnRzOiAwKi9cbm1vZHVsZS5leHBvcnRzID0gWydkZWJvdW5jZScsIGZ1bmN0aW9uKGRlYm91bmNlKSB7XG4gIHJldHVybiB7XG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogJ2Zvcm1pby9mb3JtYnVpbGRlci9idWlsZGVyLmh0bWwnLFxuICAgIHNjb3BlOiB7XG4gICAgICBmb3JtOiAnPT8nLFxuICAgICAgc3JjOiAnPScsXG4gICAgICB0eXBlOiAnPScsXG4gICAgICBvblNhdmU6ICc9JyxcbiAgICAgIG9uQ2FuY2VsOiAnPScsXG4gICAgICBvcHRpb25zOiAnPT8nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBbXG4gICAgICAnJHNjb3BlJyxcbiAgICAgICdmb3JtaW9Db21wb25lbnRzJyxcbiAgICAgICduZ0RpYWxvZycsXG4gICAgICAnRm9ybWlvJyxcbiAgICAgICdGb3JtaW9VdGlscycsXG4gICAgICAnZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQnLFxuICAgICAgJyRpbnRlcnZhbCcsXG4gICAgICBmdW5jdGlvbihcbiAgICAgICAgJHNjb3BlLFxuICAgICAgICBmb3JtaW9Db21wb25lbnRzLFxuICAgICAgICBuZ0RpYWxvZyxcbiAgICAgICAgRm9ybWlvLFxuICAgICAgICBGb3JtaW9VdGlscyxcbiAgICAgICAgZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQsXG4gICAgICAgICRpbnRlcnZhbFxuICAgICAgKSB7XG4gICAgICAgICRzY29wZS5vcHRpb25zID0gJHNjb3BlLm9wdGlvbnMgfHwge307XG5cbiAgICAgICAgLy8gQWRkIHRoZSBjb21wb25lbnRzIHRvIHRoZSBzY29wZS5cbiAgICAgICAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGFuZ3VsYXIuY29weShmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHMuYnV0dG9uLnNldHRpbmdzKTtcbiAgICAgICAgaWYgKCEkc2NvcGUuZm9ybSkge1xuICAgICAgICAgICRzY29wZS5mb3JtID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEkc2NvcGUuZm9ybS5jb21wb25lbnRzKSB7XG4gICAgICAgICAgJHNjb3BlLmZvcm0uY29tcG9uZW50cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghJHNjb3BlLm9wdGlvbnMubm9TdWJtaXQgJiYgISRzY29wZS5mb3JtLmNvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgJHNjb3BlLmZvcm0uY29tcG9uZW50cy5wdXNoKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmhpZGVDb3VudCA9IDI7XG4gICAgICAgICRzY29wZS5mb3JtLnBhZ2UgPSAwO1xuICAgICAgICAkc2NvcGUuZm9ybWlvID0gJHNjb3BlLnNyYyA/IG5ldyBGb3JtaW8oJHNjb3BlLnNyYykgOiBudWxsO1xuXG4gICAgICAgIHZhciBzZXROdW1QYWdlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLmZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRzY29wZS5mb3JtLmRpc3BsYXkgIT09ICd3aXphcmQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG51bVBhZ2VzID0gMDtcbiAgICAgICAgICAkc2NvcGUuZm9ybS5jb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LnR5cGUgPT09ICdwYW5lbCcpIHtcbiAgICAgICAgICAgICAgbnVtUGFnZXMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRzY29wZS5mb3JtLm51bVBhZ2VzID0gbnVtUGFnZXM7XG5cbiAgICAgICAgICAvLyBBZGQgYSBwYWdlIGlmIG5vbmUgaXMgZm91bmQuXG4gICAgICAgICAgaWYgKG51bVBhZ2VzID09PSAwKSB7XG4gICAgICAgICAgICAkc2NvcGUubmV3UGFnZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgcGFnZSBkb2Vzbid0IGV4Y2VkZSB0aGUgZW5kLlxuICAgICAgICAgIGlmICgobnVtUGFnZXMgPiAwKSAmJiAoJHNjb3BlLmZvcm0ucGFnZSA+PSBudW1QYWdlcykpIHtcbiAgICAgICAgICAgICRzY29wZS5mb3JtLnBhZ2UgPSBudW1QYWdlcyAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIExvYWQgdGhlIGZvcm0uXG4gICAgICAgIGlmICgkc2NvcGUuZm9ybWlvICYmICRzY29wZS5mb3JtaW8uZm9ybUlkKSB7XG4gICAgICAgICAgJHNjb3BlLmZvcm1pby5sb2FkRm9ybSgpLnRoZW4oZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0gPSBmb3JtO1xuICAgICAgICAgICAgJHNjb3BlLmZvcm0ucGFnZSA9IDA7XG4gICAgICAgICAgICBpZiAoISRzY29wZS5vcHRpb25zLm5vU3VibWl0ICYmICRzY29wZS5mb3JtLmNvbXBvbmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICRzY29wZS5mb3JtLmNvbXBvbmVudHMucHVzaChzdWJtaXRCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZm9ybS5kaXNwbGF5JywgZnVuY3Rpb24oZGlzcGxheSkge1xuICAgICAgICAgICRzY29wZS5oaWRlQ291bnQgPSAoZGlzcGxheSA9PT0gJ3dpemFyZCcpID8gMSA6IDI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGV5IGNhbiBzd2l0Y2ggYmFjayBhbmQgZm9ydGggYmV0d2VlbiB3aXphcmQgYW5kIHBhZ2VzLlxuICAgICAgICAkc2NvcGUuJG9uKCdmb3JtRGlzcGxheScsIGZ1bmN0aW9uKGV2ZW50LCBkaXNwbGF5KSB7XG4gICAgICAgICAgJHNjb3BlLmZvcm0uZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICAgICAgJHNjb3BlLmZvcm0ucGFnZSA9IDA7XG4gICAgICAgICAgc2V0TnVtUGFnZXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBmb3JtIHBhZ2VzLlxuICAgICAgICAkc2NvcGUucGFnZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcGFnZXMgPSBbXTtcbiAgICAgICAgICAkc2NvcGUuZm9ybS5jb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LnR5cGUgPT09ICdwYW5lbCcpIHtcbiAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC50aXRsZSkge1xuICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goY29tcG9uZW50LnRpdGxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWdlcy5wdXNoKCdQYWdlICcgKyAocGFnZXMubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHBhZ2VzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNob3cgdGhlIGZvcm0gcGFnZS5cbiAgICAgICAgJHNjb3BlLnNob3dQYWdlID0gZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLmZvcm0uY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9ICRzY29wZS5mb3JtLmNvbXBvbmVudHNbaV07XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LnR5cGUgPT09ICdwYW5lbCcpIHtcbiAgICAgICAgICAgICAgaWYgKGkgPT09IHBhZ2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAkc2NvcGUuZm9ybS5wYWdlID0gaTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUubmV3UGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5mb3JtLm51bVBhZ2VzO1xuICAgICAgICAgIHZhciBwYWdlTnVtID0gaW5kZXggKyAxO1xuICAgICAgICAgIHZhciBjb21wb25lbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICAgICAgdGl0bGU6ICdQYWdlICcgKyBwYWdlTnVtLFxuICAgICAgICAgICAgaXNOZXc6IHRydWUsXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbXSxcbiAgICAgICAgICAgIGlucHV0OiBmYWxzZSxcbiAgICAgICAgICAgIGtleTogJ3BhZ2UnICsgcGFnZU51bVxuICAgICAgICAgIH07XG4gICAgICAgICAgJHNjb3BlLmZvcm0ubnVtUGFnZXMrKztcbiAgICAgICAgICAkc2NvcGUuZm9ybS5jb21wb25lbnRzLnNwbGljZShpbmRleCwgMCwgY29tcG9uZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBFbnN1cmUgdGhlIG51bWJlciBvZiBwYWdlcyBpcyBhbHdheXMgY29ycmVjdC5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZm9ybS5jb21wb25lbnRzLmxlbmd0aCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNldE51bVBhZ2VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5mb3JtQ29tcG9uZW50cyA9IF8uY2xvbmVEZWVwKGZvcm1pb0NvbXBvbmVudHMuY29tcG9uZW50cyk7XG4gICAgICAgIF8uZWFjaCgkc2NvcGUuZm9ybUNvbXBvbmVudHMsIGZ1bmN0aW9uKGNvbXBvbmVudCwga2V5KSB7XG4gICAgICAgICAgY29tcG9uZW50LnNldHRpbmdzLmlzTmV3ID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoY29tcG9uZW50LnNldHRpbmdzLmhhc093blByb3BlcnR5KCdidWlsZGVyJykgJiYgIWNvbXBvbmVudC5zZXR0aW5ncy5idWlsZGVyIHx8IGNvbXBvbmVudC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZGVsZXRlICRzY29wZS5mb3JtQ29tcG9uZW50c1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZvcm1Db21wb25lbnRHcm91cHMgPSBfLmNsb25lRGVlcChfLm9taXRCeShmb3JtaW9Db21wb25lbnRzLmdyb3VwcywgJ2Rpc2FibGVkJykpO1xuICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudHNCeUdyb3VwID0gXy5ncm91cEJ5KCRzY29wZS5mb3JtQ29tcG9uZW50cywgZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbXBvbmVudC5ncm91cDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSByZXNvdXJjZSBmaWVsZHMuXG4gICAgICAgIHZhciByZXNvdXJjZUVuYWJsZWQgPSAhZm9ybWlvQ29tcG9uZW50cy5ncm91cHMucmVzb3VyY2UgfHwgIWZvcm1pb0NvbXBvbmVudHMuZ3JvdXBzLnJlc291cmNlLmRpc2FibGVkO1xuICAgICAgICBpZiAoJHNjb3BlLmZvcm1pbyAmJiByZXNvdXJjZUVuYWJsZWQpIHtcbiAgICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudHNCeUdyb3VwLnJlc291cmNlID0ge307XG4gICAgICAgICAgJHNjb3BlLmZvcm1Db21wb25lbnRHcm91cHMucmVzb3VyY2UgPSB7XG4gICAgICAgICAgICB0aXRsZTogJ0V4aXN0aW5nIFJlc291cmNlIEZpZWxkcycsXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnc3ViZ3JvdXAtYWNjb3JkaW9uLWNvbnRhaW5lcicsXG4gICAgICAgICAgICBzdWJncm91cHM6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgICRzY29wZS5mb3JtaW8ubG9hZEZvcm1zKHtwYXJhbXM6IHt0eXBlOiAncmVzb3VyY2UnLCBsaW1pdDogMTAwfX0pLnRoZW4oZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggYWxsIHJlc291cmNlcy5cbiAgICAgICAgICAgIF8uZWFjaChyZXNvdXJjZXMsIGZ1bmN0aW9uKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgIHZhciByZXNvdXJjZUtleSA9IHJlc291cmNlLm5hbWU7XG5cbiAgICAgICAgICAgICAgLy8gQWRkIGEgbGVnZW5kIGZvciB0aGlzIHJlc291cmNlLlxuICAgICAgICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudHNCeUdyb3VwLnJlc291cmNlW3Jlc291cmNlS2V5XSA9IFtdO1xuICAgICAgICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudEdyb3Vwcy5yZXNvdXJjZS5zdWJncm91cHNbcmVzb3VyY2VLZXldID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiByZXNvdXJjZS50aXRsZVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgRm9ybWlvVXRpbHMuZWFjaENvbXBvbmVudChyZXNvdXJjZS5jb21wb25lbnRzLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LnR5cGUgPT09ICdidXR0b24nKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudC5sYWJlbDtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudE5hbWUgJiYgY29tcG9uZW50LmtleSkge1xuICAgICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZSA9IF8udXBwZXJGaXJzdChjb21wb25lbnQua2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudHNCeUdyb3VwLnJlc291cmNlW3Jlc291cmNlS2V5XS5wdXNoKF8ubWVyZ2UoXG4gICAgICAgICAgICAgICAgICBfLmNsb25lRGVlcChmb3JtaW9Db21wb25lbnRzLmNvbXBvbmVudHNbY29tcG9uZW50LnR5cGVdLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBzdWJncm91cDogcmVzb3VyY2VLZXksXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNvbXBvbmVudC5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICBrZXk6IGNvbXBvbmVudC5rZXksXG4gICAgICAgICAgICAgICAgICAgICAgbG9ja0tleTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHJlc291cmNlLl9pZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLiRlbWl0KCdmb3JtVXBkYXRlJywgJHNjb3BlLmZvcm0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFkZCBhIG5ldyBjb21wb25lbnQuXG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOmFkZCcsIHVwZGF0ZSk7XG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOnVwZGF0ZScsIHVwZGF0ZSk7XG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOnJlbW92ZScsIHVwZGF0ZSk7XG4gICAgICAgICRzY29wZS4kb24oJ2Zvcm1CdWlsZGVyOmVkaXQnLCB1cGRhdGUpO1xuXG4gICAgICAgICRzY29wZS5zYXZlU2V0dGluZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBuZ0RpYWxvZy5jbG9zZUFsbCh0cnVlKTtcbiAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2Zvcm1VcGRhdGUnLCAkc2NvcGUuZm9ybSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmNhcGl0YWxpemUgPSBfLmNhcGl0YWxpemU7XG5cbiAgICAgICAgLy8gU2V0IHRoZSByb290IGxpc3QgaGVpZ2h0IHRvIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm1idWlsZGVyIGZvciBlYXNlIG9mIGZvcm0gYnVpbGRpbmcuXG4gICAgICAgIHZhciByb290bGlzdEVMID0gYW5ndWxhci5lbGVtZW50KCcucm9vdGxpc3QnKTtcbiAgICAgICAgdmFyIGZvcm1idWlsZGVyRUwgPSBhbmd1bGFyLmVsZW1lbnQoJy5mb3JtYnVpbGRlcicpO1xuXG4gICAgICAgICRpbnRlcnZhbChmdW5jdGlvbiBzZXRSb290TGlzdEhlaWdodCgpIHtcbiAgICAgICAgICB2YXIgbGlzdEhlaWdodCA9IHJvb3RsaXN0RUwuaGVpZ2h0KCdpbmhlcml0JykuaGVpZ2h0KCk7XG4gICAgICAgICAgdmFyIGJ1aWxkZXJIZWlnaHQgPSBmb3JtYnVpbGRlckVMLmhlaWdodCgpO1xuICAgICAgICAgIGlmICgoYnVpbGRlckhlaWdodCAtIGxpc3RIZWlnaHQpID4gMTAwKSB7XG4gICAgICAgICAgICByb290bGlzdEVMLmhlaWdodChidWlsZGVySGVpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgIC8vIEFkZCB0byBzY29wZSBzbyBpdCBjYW4gYmUgdXNlZCBpbiB0ZW1wbGF0ZXNcbiAgICAgICAgJHNjb3BlLmRuZERyYWdJZnJhbWVXb3JrYXJvdW5kID0gZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQ7XG4gICAgICB9XG4gICAgXSxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgdmFyIHNjcm9sbFNpZGViYXIgPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gRGlzYWJsZSBhbGwgYnV0dG9ucyB3aXRoaW4gdGhlIGZvcm0uXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLmZvcm1idWlsZGVyJykuZmluZCgnYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICAvLyBNYWtlIHRoZSBsZWZ0IGNvbHVtbiBmb2xsb3cgdGhlIGZvcm0uXG4gICAgICAgIHZhciBmb3JtQ29tcG9uZW50cyA9IGFuZ3VsYXIuZWxlbWVudCgnLmZvcm1jb21wb25lbnRzJyk7XG4gICAgICAgIHZhciBmb3JtQnVpbGRlciA9IGFuZ3VsYXIuZWxlbWVudCgnLmZvcm1idWlsZGVyJyk7XG4gICAgICAgIGlmIChmb3JtQ29tcG9uZW50cy5sZW5ndGggIT09IDAgJiYgZm9ybUJ1aWxkZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdmFyIG1heFNjcm9sbCA9IGZvcm1CdWlsZGVyLm91dGVySGVpZ2h0KCkgPiBmb3JtQ29tcG9uZW50cy5vdXRlckhlaWdodCgpID8gZm9ybUJ1aWxkZXIub3V0ZXJIZWlnaHQoKSAtIGZvcm1Db21wb25lbnRzLm91dGVySGVpZ2h0KCkgOiAwO1xuICAgICAgICAgIC8vIDUwIHBpeGVscyBnaXZlcyBzcGFjZSBmb3IgdGhlIGZpeGVkIGhlYWRlci5cbiAgICAgICAgICB2YXIgc2Nyb2xsID0gYW5ndWxhci5lbGVtZW50KHdpbmRvdykuc2Nyb2xsVG9wKCkgLSBmb3JtQ29tcG9uZW50cy5wYXJlbnQoKS5vZmZzZXQoKS50b3AgKyA1MDtcbiAgICAgICAgICBpZiAoc2Nyb2xsIDwgMCkge1xuICAgICAgICAgICAgc2Nyb2xsID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjcm9sbCA+IG1heFNjcm9sbCkge1xuICAgICAgICAgICAgc2Nyb2xsID0gbWF4U2Nyb2xsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3JtQ29tcG9uZW50cy5jc3MoJ21hcmdpbi10b3AnLCBzY3JvbGwgKyAncHgnKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwLCBmYWxzZSk7XG4gICAgICB3aW5kb3cub25zY3JvbGwgPSBzY3JvbGxTaWRlYmFyO1xuICAgICAgZWxlbWVudC5vbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93Lm9uc2Nyb2xsID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENyZWF0ZSB0aGUgZm9ybS1idWlsZGVyLWNvbXBvbmVudCBkaXJlY3RpdmUuXG4gKiBFeHRlbmQgdGhlIGZvcm1pby1jb21wb25lbnQgZGlyZWN0aXZlIGFuZCBjaGFuZ2UgdGhlIHRlbXBsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2Zvcm1pb0NvbXBvbmVudERpcmVjdGl2ZScsXG4gIGZ1bmN0aW9uKGZvcm1pb0NvbXBvbmVudERpcmVjdGl2ZSkge1xuICAgIHJldHVybiBhbmd1bGFyLmV4dGVuZCh7fSwgZm9ybWlvQ29tcG9uZW50RGlyZWN0aXZlWzBdLCB7XG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Zvcm1pby9mb3JtYnVpbGRlci9jb21wb25lbnQuaHRtbCdcbiAgICB9KTtcbiAgfVxuXTtcbiIsIlwidXNlIHN0cmljdFwiO1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCdmb3JtaW8tdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHRydWUsXG4gICAgICB0ZW1wbGF0ZTogJycgK1xuICAgICAgICAnPHVpYi1hY2NvcmRpb24+JyArXG4gICAgICAgICAgJzxkaXYgdWliLWFjY29yZGlvbi1ncm91cCBoZWFkaW5nPVwiU2ltcGxlXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgaXMtb3Blbj1cInN0YXR1cy5zaW1wbGVcIj4nICtcbiAgICAgICAgICAgICdUaGlzIGNvbXBvbmVudCBzaG91bGQgRGlzcGxheTonICtcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LW1kXCIgbmctbW9kZWw9XCJjb21wb25lbnQuY29uZGl0aW9uYWwuc2hvd1wiPicgK1xuICAgICAgICAgICAgJzxvcHRpb24gbmctcmVwZWF0PVwiaXRlbSBpbiBfYm9vbGVhbnMgdHJhY2sgYnkgJGluZGV4XCIgdmFsdWU9XCJ7e2l0ZW19fVwiPnt7aXRlbS50b1N0cmluZygpfX08L29wdGlvbj4nICtcbiAgICAgICAgICAgICc8L3NlbGVjdD4nICtcbiAgICAgICAgICAgICc8YnI+V2hlbiB0aGUgZm9ybSBjb21wb25lbnQ6JyArXG4gICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBpbnB1dC1tZFwiIG5nLW1vZGVsPVwiY29tcG9uZW50LmNvbmRpdGlvbmFsLndoZW5cIj4nICtcbiAgICAgICAgICAgICc8b3B0aW9uIG5nLXJlcGVhdD1cIml0ZW0gaW4gX2NvbXBvbmVudHMgdHJhY2sgYnkgJGluZGV4XCIgdmFsdWU9XCJ7e2l0ZW0ua2V5fX1cIj57e2l0ZW0gIT09IFwiXCIgPyBpdGVtLmxhYmVsICsgXCIgKFwiICsgaXRlbS5rZXkgKyBcIilcIiA6IFwiXCJ9fTwvb3B0aW9uPicgK1xuICAgICAgICAgICAgJzwvc2VsZWN0PicgK1xuICAgICAgICAgICAgJzxicj5IYXMgdGhlIHZhbHVlOicgK1xuICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LW1kXCIgbmctbW9kZWw9XCJjb21wb25lbnQuY29uZGl0aW9uYWwuZXFcIj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgJzxkaXYgdWliLWFjY29yZGlvbi1ncm91cCBoZWFkaW5nPVwiQWR2YW5jZWRcIiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiBpcy1vcGVuPVwic3RhdHVzLmFkdmFuY2VkXCI+JyArXG4gICAgICAgICAgICAnPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcm93cz1cIjVcIiBpZD1cImN1c3RvbVwiIG5hbWU9XCJjdXN0b21cIiBuZy1tb2RlbD1cImNvbXBvbmVudC5jdXN0b21Db25kaXRpb25hbFwiIHBsYWNlaG9sZGVyPVwiLyoqKiBFeGFtcGxlIENvZGUgKioqL1xcbnNob3cgPSAoZGF0YVtcXCdteWtleVxcJ10gPiAxKTtcIj48L3RleHRhcmVhPicgK1xuICAgICAgICAgICAgJzxzbWFsbD4nICtcbiAgICAgICAgICAgICc8cD5FbnRlciBjdXN0b20gY29uZGl0aW9uYWwgY29kZS48L3A+JyArXG4gICAgICAgICAgICAnPHA+WW91IG11c3QgYXNzaWduIHRoZSA8c3Ryb25nPnNob3c8L3N0cm9uZz4gdmFyaWFibGUgYXMgZWl0aGVyIDxzdHJvbmc+dHJ1ZTwvc3Ryb25nPiBvciA8c3Ryb25nPmZhbHNlPC9zdHJvbmc+LjwvcD4nICtcbiAgICAgICAgICAgICc8cD5UaGUgZ2xvYmFsIHZhcmlhYmxlIDxzdHJvbmc+ZGF0YTwvc3Ryb25nPiBpcyBwcm92aWRlZCwgYW5kIGFsbG93cyB5b3UgdG8gYWNjZXNzIHRoZSBkYXRhIG9mIGFueSBmb3JtIGNvbXBvbmVudCwgYnkgdXNpbmcgaXRzIEFQSSBrZXkuPC9wPicgK1xuICAgICAgICAgICAgJzxwPjxzdHJvbmc+Tm90ZTogQWR2YW5jZWQgQ29uZGl0aW9uYWwgbG9naWMgd2lsbCBvdmVycmlkZSB0aGUgcmVzdWx0cyBvZiB0aGUgU2ltcGxlIENvbmRpdGlvbmFsIGxvZ2ljLjwvc3Ryb25nPjwvcD4nICtcbiAgICAgICAgICAgICc8L3NtYWxsPicgK1xuICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvdWliLWFjY29yZGlvbj4nLFxuICAgICAgY29udHJvbGxlcjogW1xuICAgICAgICAnJHNjb3BlJyxcbiAgICAgICAgZnVuY3Rpb24oXG4gICAgICAgICAgJHNjb3BlKSB7XG4gICAgICAgICAgLy8gRGVmYXVsdCB0aGUgY3VycmVudCBjb21wb25lbnRzIGNvbmRpdGlvbmFsIGxvZ2ljLlxuICAgICAgICAgICRzY29wZS5jb21wb25lbnQgPSAkc2NvcGUuY29tcG9uZW50IHx8IHt9O1xuICAgICAgICAgICRzY29wZS5jb21wb25lbnQuY29uZGl0aW9uYWwgPSAkc2NvcGUuY29tcG9uZW50LmNvbmRpdGlvbmFsIHx8IHt9O1xuXG4gICAgICAgICAgLy8gVGhlIGF2YWlsYWJsZSBsb2dpYyBmdW5jdGlvbnMuXG4gICAgICAgICAgJHNjb3BlLl9ib29sZWFucyA9IFsnJywgJ3RydWUnLCAnZmFsc2UnXTtcblxuICAgICAgICAgIC8vIEZpbHRlciB0aGUgbGlzdCBvZiBhdmFpbGFibGUgZm9ybSBjb21wb25lbnRzIGZvciBjb25kaXRpb25hbCBsb2dpYy5cbiAgICAgICAgICAkc2NvcGUuX2NvbXBvbmVudHMgPSBfLmdldCgkc2NvcGUsICdmb3JtLmNvbXBvbmVudHMnKSB8fCBbXTtcbiAgICAgICAgICAkc2NvcGUuX2NvbXBvbmVudHMgPSB1dGlscy5mbGF0dGVuQ29tcG9uZW50cygkc2NvcGUuX2NvbXBvbmVudHMpO1xuICAgICAgICAgIC8vIFJlbW92ZSBub24taW5wdXQvYnV0dG9uIGZpZWxkcyBiZWNhdXNlIHRoZXkgZG9uJ3QgbWFrZSBzZW5zZS5cbiAgICAgICAgICAvLyBGQS04OTAgLSBEb250IGFsbG93IHRoZSBjdXJyZW50IGNvbXBvbmVudCB0byBiZSBhIGNvbmRpdGlvbmFsIHRyaWdnZXIuXG4gICAgICAgICAgJHNjb3BlLl9jb21wb25lbnRzID0gXy5yZWplY3QoJHNjb3BlLl9jb21wb25lbnRzLCBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICByZXR1cm4gIWMuaW5wdXQgfHwgKGMudHlwZSA9PT0gJ2J1dHRvbicpIHx8IChjLmtleSA9PT0gJHNjb3BlLmNvbXBvbmVudC5rZXkpIHx8ICghYy5sYWJlbCAmJiAhYy5rZXkpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gQWRkIGRlZmF1bHQgaXRlbSB0byB0aGUgY29tcG9uZW50cyBsaXN0LlxuICAgICAgICAgICRzY29wZS5fY29tcG9uZW50cy51bnNoaWZ0KCcnKTtcblxuICAgICAgICAgIC8vIERlZmF1bHQgYW5kIHdhdGNoIHRoZSBzaG93IGxvZ2ljLlxuICAgICAgICAgICRzY29wZS5jb21wb25lbnQuY29uZGl0aW9uYWwuc2hvdyA9ICRzY29wZS5jb21wb25lbnQuY29uZGl0aW9uYWwuc2hvdyB8fCAnJztcbiAgICAgICAgICAvLyBDb2VyY2Ugc2hvdyB2YXIgdG8gc3VwcG9ydGVkIHZhbHVlLlxuICAgICAgICAgIHZhciBfYm9vbGVhbk1hcCA9IHtcbiAgICAgICAgICAgICcnOiAnJyxcbiAgICAgICAgICAgICd0cnVlJzogJ3RydWUnLFxuICAgICAgICAgICAgJ2ZhbHNlJzogJ2ZhbHNlJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5jb25kaXRpb25hbC5zaG93ID0gX2Jvb2xlYW5NYXAuaGFzT3duUHJvcGVydHkoJHNjb3BlLmNvbXBvbmVudC5jb25kaXRpb25hbC5zaG93KVxuICAgICAgICAgICAgPyBfYm9vbGVhbk1hcFskc2NvcGUuY29tcG9uZW50LmNvbmRpdGlvbmFsLnNob3ddXG4gICAgICAgICAgICA6ICcnO1xuXG4gICAgICAgICAgLy8gRGVmYXVsdCBhbmQgd2F0Y2ggdGhlIHdoZW4gbG9naWMuXG4gICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5jb25kaXRpb25hbC53aGVuID0gJHNjb3BlLmNvbXBvbmVudC5jb25kaXRpb25hbC53aGVuIHx8IG51bGw7XG5cbiAgICAgICAgICAvLyBEZWZhdWx0IGFuZCB3YXRjaCB0aGUgc2VhcmNoIGxvZ2ljLlxuICAgICAgICAgICRzY29wZS5jb21wb25lbnQuY29uZGl0aW9uYWwuZXEgPSAkc2NvcGUuY29tcG9uZW50LmNvbmRpdGlvbmFsLmVxIHx8ICcnO1xuXG4gICAgICAgICAgLy8gVHJhY2sgdGhlIHN0YXR1cyBvZiB0aGUgYWNjb3JkaW9uIHBhbmVscyBvcGVuIHN0YXRlLlxuICAgICAgICAgICRzY29wZS5zdGF0dXMgPSB7XG4gICAgICAgICAgICBzaW1wbGU6ICEkc2NvcGUuY29tcG9uZW50LmN1c3RvbUNvbmRpdGlvbmFsLFxuICAgICAgICAgICAgYWR2YW5jZWQ6ICEhJHNjb3BlLmNvbXBvbmVudC5jdXN0b21Db25kaXRpb25hbFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJyRzY29wZScsXG4gICckcm9vdFNjb3BlJyxcbiAgJ2Zvcm1pb0NvbXBvbmVudHMnLFxuICAnbmdEaWFsb2cnLFxuICAnZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQnLFxuICBmdW5jdGlvbihcbiAgICAkc2NvcGUsXG4gICAgJHJvb3RTY29wZSxcbiAgICBmb3JtaW9Db21wb25lbnRzLFxuICAgIG5nRGlhbG9nLFxuICAgIGRuZERyYWdJZnJhbWVXb3JrYXJvdW5kXG4gICkge1xuICAgICRzY29wZS5idWlsZGVyID0gdHJ1ZTtcbiAgICAkcm9vdFNjb3BlLmJ1aWxkZXIgPSB0cnVlO1xuICAgICRzY29wZS5oaWRlQ291bnQgPSAoXy5pc051bWJlcigkc2NvcGUuaGlkZURuZEJveENvdW50KSA/ICRzY29wZS5oaWRlRG5kQm94Q291bnQgOiAxKTtcbiAgICAkc2NvcGUuJHdhdGNoKCdoaWRlRG5kQm94Q291bnQnLCBmdW5jdGlvbihoaWRlQ291bnQpIHtcbiAgICAgICRzY29wZS5oaWRlQ291bnQgPSBoaWRlQ291bnQgPyBoaWRlQ291bnQgOiAxO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLmZvcm1Db21wb25lbnRzID0gZm9ybWlvQ29tcG9uZW50cy5jb21wb25lbnRzO1xuXG4gICAgLy8gQ29tcG9uZW50cyBkZXBlbmQgb24gdGhpcyBleGlzdGluZ1xuICAgICRzY29wZS5kYXRhID0ge307XG5cbiAgICAkc2NvcGUuZW1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBhcmdzWzBdID0gJ2Zvcm1CdWlsZGVyOicgKyBhcmdzWzBdO1xuICAgICAgJHNjb3BlLiRlbWl0LmFwcGx5KCRzY29wZSwgYXJncyk7XG4gICAgfTtcblxuICAgICRzY29wZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbihjb21wb25lbnQsIGluZGV4KSB7XG4gICAgICAvLyBPbmx5IGVkaXQgaW1tZWRpYXRlbHkgZm9yIGNvbXBvbmVudHMgdGhhdCBhcmUgbm90IHJlc291cmNlIGNvbXBzLlxuICAgICAgaWYgKGNvbXBvbmVudC5pc05ldyAmJiAoIWNvbXBvbmVudC5rZXkgfHwgKGNvbXBvbmVudC5rZXkuaW5kZXhPZignLicpID09PSAtMSkpKSB7XG4gICAgICAgICRzY29wZS5lZGl0Q29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50LmlzTmV3ID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlZnJlc2ggYWxsIENLRWRpdG9yIGluc3RhbmNlc1xuICAgICAgJHNjb3BlLiRicm9hZGNhc3QoJ2NrZWRpdG9yLnJlZnJlc2gnKTtcblxuICAgICAgZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmVtaXQoJ2FkZCcpO1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcm9vdCBjb21wb25lbnQgYW5kIHRoZSBkaXNwbGF5IGlzIGEgd2l6YXJkLCB0aGVuIHdlIGtub3dcbiAgICAgIC8vIHRoYXQgdGhleSBkcm9wcGVkIHRoZSBjb21wb25lbnQgb3V0c2lkZSBvZiB3aGVyZSBpdCBpcyBzdXBwb3NlZCB0byBnby4uLlxuICAgICAgLy8gSW5zdGVhZCBhcHBlbmQgb3IgcHJlcGVuZCB0byB0aGUgY29tcG9uZW50cyBhcnJheS5cbiAgICAgIGlmICgkc2NvcGUuY29tcG9uZW50LmRpc3BsYXkgPT09ICd3aXphcmQnKSB7XG4gICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBhZ2VJbmRleCA9IChpbmRleCA9PT0gMCkgPyAwIDogJHNjb3BlLmZvcm0uY29tcG9uZW50c1skc2NvcGUuZm9ybS5wYWdlXS5jb21wb25lbnRzLmxlbmd0aDtcbiAgICAgICAgICAkc2NvcGUuZm9ybS5jb21wb25lbnRzWyRzY29wZS5mb3JtLnBhZ2VdLmNvbXBvbmVudHMuc3BsaWNlKHBhZ2VJbmRleCwgMCwgY29tcG9uZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGV5IGRvbid0IGV2ZXIgYWRkIGEgY29tcG9uZW50IG9uIHRoZSBib3R0b20gb2YgdGhlIHN1Ym1pdCBidXR0b24uXG4gICAgICB2YXIgbGFzdENvbXBvbmVudCA9ICRzY29wZS5jb21wb25lbnQuY29tcG9uZW50c1skc2NvcGUuY29tcG9uZW50LmNvbXBvbmVudHMubGVuZ3RoIC0gMV07XG4gICAgICBpZiAoXG4gICAgICAgIChsYXN0Q29tcG9uZW50KSAmJlxuICAgICAgICAobGFzdENvbXBvbmVudC50eXBlID09PSAnYnV0dG9uJykgJiZcbiAgICAgICAgKGxhc3RDb21wb25lbnQuYWN0aW9uID09PSAnc3VibWl0JylcbiAgICAgICkge1xuICAgICAgICAvLyBUaGVyZSBpcyBvbmx5IG9uZSBlbGVtZW50IG9uIHRoZSBwYWdlLlxuICAgICAgICBpZiAoJHNjb3BlLmNvbXBvbmVudC5jb21wb25lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA+PSAkc2NvcGUuY29tcG9uZW50LmNvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgaW5kZXggLT0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGhlIGNvbXBvbmVudCB0byB0aGUgY29tcG9uZW50cyBhcnJheS5cbiAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5jb21wb25lbnQuY29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDAsIGNvbXBvbmVudCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gUmV0dXJuIHRydWUgc2luY2UgdGhpcyB3aWxsIHRlbGwgdGhlIGRyYWctYW5kLWRyb3AgbGlzdCBjb21wb25lbnQgdG8gbm90IGluc2VydCBpbnRvIGl0cyBvd24gYXJyYXkuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLy8gQWxsb3cgcHJvdG90eXBlZCBzY29wZXMgdG8gdXBkYXRlIHRoZSBvcmlnaW5hbCBjb21wb25lbnQuXG4gICAgJHNjb3BlLnVwZGF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uKG5ld0NvbXBvbmVudCwgb2xkQ29tcG9uZW50KSB7XG4gICAgICB2YXIgbGlzdCA9ICRzY29wZS5jb21wb25lbnQuY29tcG9uZW50cztcbiAgICAgIGxpc3Quc3BsaWNlKGxpc3QuaW5kZXhPZihvbGRDb21wb25lbnQpLCAxLCBuZXdDb21wb25lbnQpO1xuICAgICAgJHNjb3BlLiRlbWl0KCd1cGRhdGUnLCBuZXdDb21wb25lbnQpO1xuICAgIH07XG5cbiAgICB2YXIgcmVtb3ZlID0gZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICBpZiAoJHNjb3BlLmNvbXBvbmVudC5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KSAhPT0gLTEpIHtcbiAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5jb21wb25lbnRzLnNwbGljZSgkc2NvcGUuY29tcG9uZW50LmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpLCAxKTtcbiAgICAgICAgJHNjb3BlLmVtaXQoJ3JlbW92ZScsIGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS5yZW1vdmVDb21wb25lbnQgPSBmdW5jdGlvbihjb21wb25lbnQsIHNob3VsZENvbmZpcm0pIHtcbiAgICAgIGlmIChzaG91bGRDb25maXJtKSB7XG4gICAgICAgIC8vIFNob3cgY29uZmlybSBkaWFsb2cgYmVmb3JlIHJlbW92aW5nIGEgY29tcG9uZW50XG4gICAgICAgIG5nRGlhbG9nLm9wZW4oe1xuICAgICAgICAgIHRlbXBsYXRlOiAnZm9ybWlvL2NvbXBvbmVudHMvY29uZmlybS1yZW1vdmUuaHRtbCcsXG4gICAgICAgICAgc2hvd0Nsb3NlOiBmYWxzZVxuICAgICAgICB9KS5jbG9zZVByb21pc2UudGhlbihmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIGNhbmNlbGxlZCA9IGUudmFsdWUgPT09IGZhbHNlIHx8IGUudmFsdWUgPT09ICckY2xvc2VCdXR0b24nIHx8IGUudmFsdWUgPT09ICckZG9jdW1lbnQnO1xuICAgICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICByZW1vdmUoY29tcG9uZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZShjb21wb25lbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBFZGl0IGEgc3BlY2lmaWMgY29tcG9uZW50LlxuICAgICRzY29wZS5lZGl0Q29tcG9uZW50ID0gZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudCA9IGZvcm1pb0NvbXBvbmVudHMuY29tcG9uZW50c1tjb21wb25lbnQudHlwZV0gfHwgZm9ybWlvQ29tcG9uZW50cy5jb21wb25lbnRzLmN1c3RvbTtcbiAgICAgIC8vIE5vIGVkaXQgdmlldyBhdmFpbGFibGVcbiAgICAgIGlmICghJHNjb3BlLmZvcm1Db21wb25lbnQuaGFzT3duUHJvcGVydHkoJ3ZpZXdzJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgY2hpbGQgaXNvbGF0ZSBzY29wZSBmb3IgZGlhbG9nXG4gICAgICB2YXIgY2hpbGRTY29wZSA9ICRzY29wZS4kbmV3KGZhbHNlKTtcbiAgICAgIGNoaWxkU2NvcGUuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgY2hpbGRTY29wZS5kYXRhID0ge307XG4gICAgICBpZiAoY29tcG9uZW50LmtleSkge1xuICAgICAgICBjaGlsZFNjb3BlLmRhdGFbY29tcG9uZW50LmtleV0gPSBjb21wb25lbnQubXVsdGlwbGUgPyBbJyddIDogJyc7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcmV2aW91c1NldHRpbmdzID0gYW5ndWxhci5jb3B5KGNvbXBvbmVudCk7XG5cbiAgICAgIC8vIE9wZW4gdGhlIGRpYWxvZy5cbiAgICAgIG5nRGlhbG9nLm9wZW4oe1xuICAgICAgICB0ZW1wbGF0ZTogJ2Zvcm1pby9jb21wb25lbnRzL3NldHRpbmdzLmh0bWwnLFxuICAgICAgICBzY29wZTogY2hpbGRTY29wZSxcbiAgICAgICAgY2xhc3NOYW1lOiAnbmdkaWFsb2ctdGhlbWUtZGVmYXVsdCBjb21wb25lbnQtc2V0dGluZ3MnLFxuICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsICdGb3JtaW8nLCAnJGNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIEZvcm1pbywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAvLyBBbGxvdyB0aGUgY29tcG9uZW50IHRvIGFkZCBjdXN0b20gbG9naWMgdG8gdGhlIGVkaXQgcGFnZS5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudCAmJiAkc2NvcGUuZm9ybUNvbXBvbmVudC5vbkVkaXRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICRjb250cm9sbGVyKCRzY29wZS5mb3JtQ29tcG9uZW50Lm9uRWRpdCwgeyRzY29wZTogJHNjb3BlfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJHNjb3BlLiR3YXRjaCgnY29tcG9uZW50Lm11bHRpcGxlJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICRzY29wZS5kYXRhWyRzY29wZS5jb21wb25lbnQua2V5XSA9IHZhbHVlID8gWycnXSA6ICcnO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gV2F0Y2ggdGhlIHNldHRpbmdzIGxhYmVsIGFuZCBhdXRvIHNldCB0aGUga2V5IGZyb20gaXQuXG4gICAgICAgICAgdmFyIGludmFsaWRSZWdleCA9IC9eW15BLVphLXpdKnxbXkEtWmEtejAtOVxcLV0qL2c7XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaCgnY29tcG9uZW50LmxhYmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmNvbXBvbmVudC5sYWJlbCAmJiAhJHNjb3BlLmNvbXBvbmVudC5sb2NrS2V5ICYmICRzY29wZS5jb21wb25lbnQuaXNOZXcpIHtcbiAgICAgICAgICAgICAgaWYgKCRzY29wZS5kYXRhLmhhc093blByb3BlcnR5KCRzY29wZS5jb21wb25lbnQua2V5KSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSAkc2NvcGUuZGF0YVskc2NvcGUuY29tcG9uZW50LmtleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5rZXkgPSBfLmNhbWVsQ2FzZSgkc2NvcGUuY29tcG9uZW50LmxhYmVsLnJlcGxhY2UoaW52YWxpZFJlZ2V4LCAnJykpO1xuICAgICAgICAgICAgICAkc2NvcGUuZGF0YVskc2NvcGUuY29tcG9uZW50LmtleV0gPSAkc2NvcGUuY29tcG9uZW50Lm11bHRpcGxlID8gWycnXSA6ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XVxuICAgICAgfSkuY2xvc2VQcm9taXNlLnRoZW4oZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgY2FuY2VsbGVkID0gZS52YWx1ZSA9PT0gZmFsc2UgfHwgZS52YWx1ZSA9PT0gJyRjbG9zZUJ1dHRvbicgfHwgZS52YWx1ZSA9PT0gJyRkb2N1bWVudCc7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICBpZiAoY29tcG9uZW50LmlzTmV3KSB7XG4gICAgICAgICAgICByZW1vdmUoY29tcG9uZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXZlcnQgdG8gb2xkIHNldHRpbmdzLCBidXQgdXNlIHRoZSBzYW1lIG9iamVjdCByZWZlcmVuY2VcbiAgICAgICAgICAgIF8uYXNzaWduKGNvbXBvbmVudCwgcHJldmlvdXNTZXR0aW5ncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBjb21wb25lbnQuaXNOZXc7XG4gICAgICAgICAgJHNjb3BlLmVtaXQoJ2VkaXQnLCBjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHRvIHNjb3BlIHNvIGl0IGNhbiBiZSB1c2VkIGluIHRlbXBsYXRlc1xuICAgICRzY29wZS5kbmREcmFnSWZyYW1lV29ya2Fyb3VuZCA9IGRuZERyYWdJZnJhbWVXb3JrYXJvdW5kO1xuICB9XG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2Zvcm1pb0VsZW1lbnREaXJlY3RpdmUnLFxuICBmdW5jdGlvbihmb3JtaW9FbGVtZW50RGlyZWN0aXZlKSB7XG4gICAgcmV0dXJuIGFuZ3VsYXIuZXh0ZW5kKHt9LCBmb3JtaW9FbGVtZW50RGlyZWN0aXZlWzBdLCB7XG4gICAgICBzY29wZTogZmFsc2UsXG4gICAgICBjb250cm9sbGVyOiBbXG4gICAgICAgICckc2NvcGUnLFxuICAgICAgICAnZm9ybWlvQ29tcG9uZW50cycsXG4gICAgICAgIGZ1bmN0aW9uKFxuICAgICAgICAgICRzY29wZSxcbiAgICAgICAgICBmb3JtaW9Db21wb25lbnRzXG4gICAgICAgICkge1xuICAgICAgICAgICRzY29wZS5idWlsZGVyID0gdHJ1ZTtcbiAgICAgICAgICAkc2NvcGUuZm9ybUNvbXBvbmVudCA9IGZvcm1pb0NvbXBvbmVudHMuY29tcG9uZW50c1skc2NvcGUuY29tcG9uZW50LnR5cGVdIHx8IGZvcm1pb0NvbXBvbmVudHMuY29tcG9uZW50cy5jdXN0b207XG4gICAgICAgICAgaWYgKCRzY29wZS5mb3JtQ29tcG9uZW50LmZidGVtcGxhdGUpIHtcbiAgICAgICAgICAgICRzY29wZS50ZW1wbGF0ZSA9ICRzY29wZS5mb3JtQ29tcG9uZW50LmZidGVtcGxhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbl07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29tcG9uZW50OiAnPScsXG4gICAgICAgIGZvcm1pbzogJz0nLFxuICAgICAgICBmb3JtOiAnPScsXG4gICAgICAgIC8vICMgb2YgaXRlbXMgbmVlZGVkIGluIHRoZSBsaXN0IGJlZm9yZSBoaWRpbmcgdGhlXG4gICAgICAgIC8vIGRyYWcgYW5kIGRyb3AgcHJvbXB0IGRpdlxuICAgICAgICBoaWRlRG5kQm94Q291bnQ6ICc9JyxcbiAgICAgICAgcm9vdExpc3Q6ICc9J1xuICAgICAgfSxcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgY29udHJvbGxlcjogJ2Zvcm1CdWlsZGVyRG5kJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnZm9ybWlvL2Zvcm1idWlsZGVyL2xpc3QuaHRtbCdcbiAgICB9O1xuICB9XG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiogVGhpcyBkaXJlY3RpdmUgY3JlYXRlcyBhIGZpZWxkIGZvciB0d2Vha2luZyBjb21wb25lbnQgb3B0aW9ucy5cbiogVGhpcyBuZWVkcyBhdCBsZWFzdCBhIHByb3BlcnR5IGF0dHJpYnV0ZSBzcGVjaWZ5aW5nIHdoYXQgcHJvcGVydHlcbiogb2YgdGhlIGNvbXBvbmVudCB0byBiaW5kIHRvLlxuKlxuKiBJZiB0aGUgcHJvcGVydHkgaXMgZGVmaW5lZCBpbiBDT01NT05fT1BUSU9OUyBhYm92ZSwgaXQgd2lsbCBhdXRvbWF0aWNhbGx5XG4qIHBvcHVsYXRlIGl0cyBsYWJlbCwgcGxhY2Vob2xkZXIsIGlucHV0IHR5cGUsIGFuZCB0b29sdGlwLiBJZiBub3QsIHlvdSBtYXkgc3BlY2lmeVxuKiB0aG9zZSB2aWEgYXR0cmlidXRlcyAoZXhjZXB0IGZvciB0b29sdGlwLCB3aGljaCB5b3UgY2FuIHNwZWNpZnkgd2l0aCB0aGUgdGl0bGUgYXR0cmlidXRlKS5cbiogVGhlIGdlbmVyYXRlZCBpbnB1dCB3aWxsIGFsc28gY2Fycnkgb3ZlciBhbnkgb3RoZXIgcHJvcGVydGllcyB5b3Ugc3BlY2lmeSBvbiB0aGlzIGRpcmVjdGl2ZS5cbiovXG5tb2R1bGUuZXhwb3J0cyA9IFsnQ09NTU9OX09QVElPTlMnLCBmdW5jdGlvbihDT01NT05fT1BUSU9OUykge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVxdWlyZTogJ3Byb3BlcnR5JyxcbiAgICBwcmlvcml0eTogMixcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRlbXBsYXRlOiBmdW5jdGlvbihlbCwgYXR0cnMpIHtcbiAgICAgIHZhciBwcm9wZXJ0eSA9IGF0dHJzLnByb3BlcnR5O1xuICAgICAgdmFyIGxhYmVsID0gYXR0cnMubGFiZWwgfHwgKENPTU1PTl9PUFRJT05TW3Byb3BlcnR5XSAmJiBDT01NT05fT1BUSU9OU1twcm9wZXJ0eV0ubGFiZWwpIHx8ICcnO1xuICAgICAgdmFyIHBsYWNlaG9sZGVyID0gKENPTU1PTl9PUFRJT05TW3Byb3BlcnR5XSAmJiBDT01NT05fT1BUSU9OU1twcm9wZXJ0eV0ucGxhY2Vob2xkZXIpIHx8IG51bGw7XG4gICAgICB2YXIgdHlwZSA9IChDT01NT05fT1BUSU9OU1twcm9wZXJ0eV0gJiYgQ09NTU9OX09QVElPTlNbcHJvcGVydHldLnR5cGUpIHx8ICd0ZXh0JztcbiAgICAgIHZhciB0b29sdGlwID0gKENPTU1PTl9PUFRJT05TW3Byb3BlcnR5XSAmJiBDT01NT05fT1BUSU9OU1twcm9wZXJ0eV0udG9vbHRpcCkgfHwgJyc7XG5cbiAgICAgIHZhciBpbnB1dCA9IGFuZ3VsYXIuZWxlbWVudCgnPGlucHV0PicpO1xuICAgICAgdmFyIGlucHV0QXR0cnMgPSB7XG4gICAgICAgIGlkOiBwcm9wZXJ0eSxcbiAgICAgICAgbmFtZTogcHJvcGVydHksXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICduZy1tb2RlbCc6ICdjb21wb25lbnQuJyArIHByb3BlcnR5LFxuICAgICAgICBwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXJcbiAgICAgIH07XG4gICAgICAvLyBQYXNzIHRocm91Z2ggYXR0cmlidXRlcyBmcm9tIHRoZSBkaXJlY3RpdmUgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRycy4kYXR0ciwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlucHV0QXR0cnNba2V5XSA9IGF0dHJzW2tleV07XG4gICAgICAgIC8vIEFsbG93IHNwZWNpZnlpbmcgdG9vbHRpcCB2aWEgdGl0bGUgYXR0clxuICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09ICd0aXRsZScpIHtcbiAgICAgICAgICB0b29sdGlwID0gYXR0cnNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCBtaW4vbWF4IHZhbHVlIGZsb29yIHZhbHVlcyBmb3IgdmFsaWRhdGlvbi5cbiAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJ3ZhbGlkYXRlLm1pbkxlbmd0aCcgfHwgcHJvcGVydHkgPT09ICd2YWxpZGF0ZS5tYXhMZW5ndGgnKSB7XG4gICAgICAgIGlucHV0QXR0cnMubWluID0gMDtcbiAgICAgIH1cblxuICAgICAgaW5wdXQuYXR0cihpbnB1dEF0dHJzKTtcblxuICAgICAgLy8gQ2hlY2tib3hlcyBoYXZlIGEgc2xpZ2h0bHkgZGlmZmVyZW50IGxheW91dFxuICAgICAgaWYgKGlucHV0QXR0cnMudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+JyArXG4gICAgICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCInICsgcHJvcGVydHkgKyAnXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCInICsgdG9vbHRpcCArICdcIj4nICtcbiAgICAgICAgICAgICAgICBpbnB1dC5wcm9wKCdvdXRlckhUTUwnKSArXG4gICAgICAgICAgICAgICAgJyAnICsgbGFiZWwgKyAnPC9sYWJlbD4nICtcbiAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LmFkZENsYXNzKCdmb3JtLWNvbnRyb2wnKTtcbiAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nICtcbiAgICAgICAgICAgICAgICAnPGxhYmVsIGZvcj1cIicgKyBwcm9wZXJ0eSArICdcIiBmb3JtLWJ1aWxkZXItdG9vbHRpcD1cIicgKyB0b29sdGlwICsgJ1wiPicgKyBsYWJlbCArICc8L2xhYmVsPicgK1xuICAgICAgICAgICAgICAgIGlucHV0LnByb3AoJ291dGVySFRNTCcpICtcbiAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuICB9O1xufV07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuKiBBIGRpcmVjdGl2ZSBmb3IgZWRpdGluZyBhIGNvbXBvbmVudCdzIGN1c3RvbSB2YWxpZGF0aW9uLlxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRlbXBsYXRlOiAnJyArXG4gICAgICAnPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiBpZD1cImFjY29yZGlvblwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9XCIjYWNjb3JkaW9uXCIgZGF0YS10YXJnZXQ9XCIjdmFsaWRhdGlvblNlY3Rpb25cIj4nICtcbiAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJwYW5lbC10aXRsZVwiPkN1c3RvbSBWYWxpZGF0aW9uPC9zcGFuPicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGlkPVwidmFsaWRhdGlvblNlY3Rpb25cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlIGluXCI+JyArXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+JyArXG4gICAgICAgICAgICAnPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcm93cz1cIjVcIiBpZD1cImN1c3RvbVwiIG5hbWU9XCJjdXN0b21cIiBuZy1tb2RlbD1cImNvbXBvbmVudC52YWxpZGF0ZS5jdXN0b21cIiBwbGFjZWhvbGRlcj1cIi8qKiogRXhhbXBsZSBDb2RlICoqKi9cXG52YWxpZCA9IChpbnB1dCA9PT0gMykgPyB0cnVlIDogXFwnTXVzdCBiZSAzXFwnO1wiPnt7IGNvbXBvbmVudC52YWxpZGF0ZS5jdXN0b20gfX08L3RleHRhcmVhPicgK1xuICAgICAgICAgICAgJzxzbWFsbD4nICtcbiAgICAgICAgICAgICAgJzxwPkVudGVyIGN1c3RvbSB2YWxpZGF0aW9uIGNvZGUuPC9wPicgK1xuICAgICAgICAgICAgICAnPHA+WW91IG11c3QgYXNzaWduIHRoZSA8c3Ryb25nPnZhbGlkPC9zdHJvbmc+IHZhcmlhYmxlIGFzIGVpdGhlciA8c3Ryb25nPnRydWU8L3N0cm9uZz4gb3IgYW4gZXJyb3IgbWVzc2FnZSBpZiB2YWxpZGF0aW9uIGZhaWxzLjwvcD4nICtcbiAgICAgICAgICAgICAgJzxwPlRoZSBnbG9iYWwgdmFyaWFibGVzIDxzdHJvbmc+aW5wdXQ8L3N0cm9uZz4sIDxzdHJvbmc+Y29tcG9uZW50PC9zdHJvbmc+LCBhbmQgPHN0cm9uZz52YWxpZDwvc3Ryb25nPiBhcmUgcHJvdmlkZWQuPC9wPicgK1xuICAgICAgICAgICAgJzwvc21hbGw+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicgK1xuICAgICAgICAgICAgICAgICc8bGFiZWw+JyArXG4gICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwicHJpdmF0ZVwiIG5hbWU9XCJwcml2YXRlXCIgbmctbW9kZWw9XCJjb21wb25lbnQudmFsaWRhdGUuY3VzdG9tUHJpdmF0ZVwiIG5nLWNoZWNrZWQ9XCJjb21wb25lbnQudmFsaWRhdGUuY3VzdG9tUHJpdmF0ZVwiPiA8c3Ryb25nPlNlY3JldCBWYWxpZGF0aW9uPC9zdHJvbmc+JyArXG4gICAgICAgICAgICAgICAgJzwvbGFiZWw+JyArXG4gICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgJzxwPkNoZWNrIHRoaXMgaWYgeW91IHdpc2ggdG8gcGVyZm9ybSB0aGUgdmFsaWRhdGlvbiBPTkxZIG9uIHRoZSBzZXJ2ZXIgc2lkZS4gVGhpcyBrZWVwcyB5b3VyIHZhbGlkYXRpb24gbG9naWMgcHJpdmF0ZSBhbmQgc2VjcmV0LjwvcD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8L2Rpdj4nXG4gIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiogQSBkaXJlY3RpdmUgZm9yIGEgZmllbGQgdG8gZWRpdCBhIGNvbXBvbmVudCdzIGtleS5cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgbmctY2xhc3M9XCJ7XFwnaGFzLXdhcm5pbmdcXCc6IHNob3VsZFdhcm5BYm91dEVtYmVkZGluZygpfVwiPicgK1xuICAgICAgICAgICAgICAgICc8bGFiZWwgZm9yPVwia2V5XCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUaGUgbmFtZSBvZiB0aGlzIGZpZWxkIGluIHRoZSBBUEkgZW5kcG9pbnQuXCI+UHJvcGVydHkgTmFtZTwvbGFiZWw+JyArXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJrZXlcIiBuYW1lPVwia2V5XCIgbmctbW9kZWw9XCJjb21wb25lbnQua2V5XCIgdmFsaWQtYXBpLWtleSB2YWx1ZT1cInt7IGNvbXBvbmVudC5rZXkgfX1cIiAnICtcbiAgICAgICAgICAgICAgICAnbmctZGlzYWJsZWQ9XCJjb21wb25lbnQuc291cmNlXCIgbmctYmx1cj1cIm9uQmx1cigpXCI+JyArXG4gICAgICAgICAgICAgICAgJzxwIG5nLWlmPVwic2hvdWxkV2FybkFib3V0RW1iZWRkaW5nKClcIiBjbGFzcz1cImhlbHAtYmxvY2tcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZXhjbGFtYXRpb24tc2lnblwiPjwvc3Bhbj4gJyArXG4gICAgICAgICAgICAgICAgICAnVXNpbmcgYSBkb3QgaW4geW91ciBQcm9wZXJ0eSBOYW1lIHdpbGwgbGluayB0aGlzIGZpZWxkIHRvIGEgZmllbGQgZnJvbSBhIFJlc291cmNlLiBEb2luZyB0aGlzIG1hbnVhbGx5IGlzIG5vdCByZWNvbW1lbmRlZCBiZWNhdXNlIHlvdSB3aWxsIGV4cGVyaWVuY2UgdW5leHBlY3RlZCBiZWhhdmlvciBpZiB0aGUgUmVzb3VyY2UgZmllbGQgaXMgbm90IGZvdW5kLiBJZiB5b3Ugd2lzaCB0byBlbWJlZCBhIFJlc291cmNlIGZpZWxkIGluIHlvdXIgZm9ybSwgdXNlIGEgY29tcG9uZW50IGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgUmVzb3VyY2UgQ29tcG9uZW50cyBjYXRlZ29yeSBvbiB0aGUgbGVmdC4nICtcbiAgICAgICAgICAgICAgICAnPC9wPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJ0Zvcm1pb1V0aWxzJywgZnVuY3Rpb24oJHNjb3BlLCBGb3JtaW9VdGlscykge1xuICAgICAgdmFyIHN1ZmZpeFJlZ2V4ID0gLyhcXGQrKSQvO1xuXG4gICAgICAvLyBQcmVidWlsZCBhIGxpc3Qgb2YgZXhpc3RpbmcgY29tcG9uZW50cy5cbiAgICAgIHZhciBleGlzdGluZ0NvbXBvbmVudHMgPSB7fTtcbiAgICAgIEZvcm1pb1V0aWxzLmVhY2hDb21wb25lbnQoJHNjb3BlLmZvcm0uY29tcG9uZW50cywgZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgIC8vIERvbid0IGFkZCB0byBleGlzdGluZyBjb21wb25lbnRzIGlmIGN1cnJlbnQgY29tcG9uZW50IG9yIGlmIGl0IGlzIG5ldy4gKE5ldyBjb3VsZCBtZWFuIHNhbWUgYXMgYW5vdGhlciBpdGVtKS5cbiAgICAgICAgaWYgKGNvbXBvbmVudC5rZXkgJiYgKCRzY29wZS5jb21wb25lbnQua2V5ICE9PSBjb21wb25lbnQua2V5IHx8ICRzY29wZS5jb21wb25lbnQuaXNOZXcpKSB7XG4gICAgICAgICAgZXhpc3RpbmdDb21wb25lbnRzW2NvbXBvbmVudC5rZXldID0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgdmFyIGtleUV4aXN0cyA9IGZ1bmN0aW9uKGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoZXhpc3RpbmdDb21wb25lbnRzLmhhc093blByb3BlcnR5KGNvbXBvbmVudC5rZXkpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgdmFyIGl0ZXJhdGVLZXkgPSBmdW5jdGlvbihjb21wb25lbnRLZXkpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnRLZXkubWF0Y2goc3VmZml4UmVnZXgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbXBvbmVudEtleSArICcxJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRLZXkucmVwbGFjZShzdWZmaXhSZWdleCwgZnVuY3Rpb24oc3VmZml4KSB7XG4gICAgICAgICAgcmV0dXJuIE51bWJlcihzdWZmaXgpICsgMTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBBcHBlbmRzIGEgbnVtYmVyIHRvIGEgY29tcG9uZW50LmtleSB0byBrZWVwIGl0IHVuaXF1ZVxuICAgICAgdmFyIHVuaXF1aWZ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghJHNjb3BlLmNvbXBvbmVudC5rZXkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGtleUV4aXN0cygkc2NvcGUuY29tcG9uZW50KSkge1xuICAgICAgICAgICRzY29wZS5jb21wb25lbnQua2V5ID0gaXRlcmF0ZUtleSgkc2NvcGUuY29tcG9uZW50LmtleSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudC5rZXknLCB1bmlxdWlmeSk7XG5cbiAgICAgICRzY29wZS5vbkJsdXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5sb2NrS2V5ID0gdHJ1ZTtcblxuICAgICAgICAvLyBJZiB0aGV5IHRyeSB0byBpbnB1dCBhbiBlbXB0eSBrZXksIHJlZmlsbCBpdCB3aXRoIGRlZmF1bHQgYW5kIGxldCB1bmlxdWlmeVxuICAgICAgICAvLyBtYWtlIGl0IHVuaXF1ZVxuICAgICAgICBpZiAoISRzY29wZS5jb21wb25lbnQua2V5ICYmICRzY29wZS5mb3JtQ29tcG9uZW50c1skc2NvcGUuY29tcG9uZW50LnR5cGVdLnNldHRpbmdzLmtleSkge1xuICAgICAgICAgICRzY29wZS5jb21wb25lbnQua2V5ID0gJHNjb3BlLmZvcm1Db21wb25lbnRzWyRzY29wZS5jb21wb25lbnQudHlwZV0uc2V0dGluZ3Mua2V5O1xuICAgICAgICAgICRzY29wZS5jb21wb25lbnQubG9ja0tleSA9IGZhbHNlOyAvLyBBbHNvIHVubG9jayBrZXlcbiAgICAgICAgICB1bmlxdWlmeSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuc2hvdWxkV2FybkFib3V0RW1iZWRkaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghJHNjb3BlLmNvbXBvbmVudCB8fCAhJHNjb3BlLmNvbXBvbmVudC5rZXkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEkc2NvcGUuY29tcG9uZW50LnNvdXJjZSAmJiAkc2NvcGUuY29tcG9uZW50LmtleS5pbmRleE9mKCcuJykgIT09IC0xO1xuICAgICAgfTtcbiAgICB9XVxuICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4qIEEgZGlyZWN0aXZlIGZvciBhIGZpZWxkIHRvIGVkaXQgYSBjb21wb25lbnQncyB0YWdzLlxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRlbXBsYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAnJyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAnICA8bGFiZWwgY2xhc3M9XCJjb250cm9sLWxhYmVsXCIgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJUYWcgdGhlIGZpZWxkIGZvciB1c2UgaW4gY3VzdG9tIGxvZ2ljLlwiPkZpZWxkIFRhZ3M8L2xhYmVsPicgK1xuICAgICAgICAnICA8dGFncy1pbnB1dCBuZy1tb2RlbD1cInRhZ3NcIiBvbi10YWctYWRkZWQ9XCJhZGRUYWcoJHRhZylcIiBvbi10YWctcmVtb3ZlZD1cInJlbW92ZVRhZygkdGFnKVwiPjwvdGFncy1pbnB1dD4nICtcbiAgICAgICAgJzwvZGl2Pic7XG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgJHNjb3BlLmNvbXBvbmVudC50YWdzID0gJHNjb3BlLmNvbXBvbmVudC50YWdzIHx8IFtdO1xuICAgICAgJHNjb3BlLnRhZ3MgPSBfLm1hcCgkc2NvcGUuY29tcG9uZW50LnRhZ3MsIGZ1bmN0aW9uKHRhZykge1xuICAgICAgICByZXR1cm4ge3RleHQ6IHRhZ307XG4gICAgICB9KTtcblxuICAgICAgJHNjb3BlLmFkZFRhZyA9IGZ1bmN0aW9uKHRhZykge1xuICAgICAgICBpZiAoISRzY29wZS5jb21wb25lbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEkc2NvcGUuY29tcG9uZW50LnRhZ3MpIHtcbiAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LnRhZ3MgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuY29tcG9uZW50LnRhZ3MucHVzaCh0YWcudGV4dCk7XG4gICAgICB9O1xuICAgICAgJHNjb3BlLnJlbW92ZVRhZyA9IGZ1bmN0aW9uKHRhZykge1xuICAgICAgICBpZiAoJHNjb3BlLmNvbXBvbmVudC50YWdzICYmICRzY29wZS5jb21wb25lbnQudGFncy5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgdGFnSW5kZXggPSAkc2NvcGUuY29tcG9uZW50LnRhZ3MuaW5kZXhPZih0YWcudGV4dCk7XG4gICAgICAgICAgaWYgKHRhZ0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC50YWdzLnNwbGljZSh0YWdJbmRleCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1dXG4gIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNvbXBvbmVudDogJz0nLFxuICAgICAgICBmb3JtaW86ICc9JyxcbiAgICAgICAgZm9ybTogJz0nLFxuICAgICAgICAvLyAjIG9mIGl0ZW1zIG5lZWRlZCBpbiB0aGUgbGlzdCBiZWZvcmUgaGlkaW5nIHRoZVxuICAgICAgICAvLyBkcmFnIGFuZCBkcm9wIHByb21wdCBkaXZcbiAgICAgICAgaGlkZURuZEJveENvdW50OiAnPSdcbiAgICAgIH0sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6ICdmb3JtQnVpbGRlckRuZCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Zvcm1pby9mb3JtYnVpbGRlci9yb3cuaHRtbCdcbiAgICB9O1xuICB9XG5dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEEgZGlyZWN0aXZlIGZvciBhIHRhYmxlIGJ1aWxkZXJcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgdGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiZm9ybS1idWlsZGVyLXRhYmxlXCI+JyArXG4gICAgICAgICcgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JyArXG4gICAgICAgICcgICAgPGxhYmVsIGZvcj1cImxhYmVsXCI+TnVtYmVyIG9mIFJvd3M8L2xhYmVsPicgK1xuICAgICAgICAnICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cIm51bVJvd3NcIiBuYW1lPVwibnVtUm93c1wiIHBsYWNlaG9sZGVyPVwiTnVtYmVyIG9mIFJvd3NcIiBuZy1tb2RlbD1cImNvbXBvbmVudC5udW1Sb3dzXCI+JyArXG4gICAgICAgICcgIDwvZGl2PicgK1xuICAgICAgICAnICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAnICAgIDxsYWJlbCBmb3I9XCJsYWJlbFwiPk51bWJlciBvZiBDb2x1bW5zPC9sYWJlbD4nICtcbiAgICAgICAgJyAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJudW1Db2xzXCIgbmFtZT1cIm51bUNvbHNcIiBwbGFjZWhvbGRlcj1cIk51bWJlciBvZiBDb2x1bW5zXCIgbmctbW9kZWw9XCJjb21wb25lbnQubnVtQ29sc1wiPicgK1xuICAgICAgICAnICA8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2Pic7XG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBbXG4gICAgICAnJHNjb3BlJyxcbiAgICAgIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuYnVpbGRlciA9IHRydWU7XG4gICAgICAgIHZhciBjaGFuZ2VUYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8qZXNsaW50LWRpc2FibGUgbWF4LWRlcHRoICovXG4gICAgICAgICAgaWYgKCRzY29wZS5jb21wb25lbnQubnVtUm93cyAmJiAkc2NvcGUuY29tcG9uZW50Lm51bUNvbHMpIHtcbiAgICAgICAgICAgIHZhciB0bXBUYWJsZSA9IFtdO1xuICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5yb3dzLnNwbGljZSgkc2NvcGUuY29tcG9uZW50Lm51bVJvd3MpO1xuICAgICAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgJHNjb3BlLmNvbXBvbmVudC5udW1Sb3dzOyByb3crKykge1xuICAgICAgICAgICAgICBpZiAoJHNjb3BlLmNvbXBvbmVudC5yb3dzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY29tcG9uZW50LnJvd3Nbcm93XS5zcGxpY2UoJHNjb3BlLmNvbXBvbmVudC5udW1Db2xzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCAkc2NvcGUuY29tcG9uZW50Lm51bUNvbHM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0bXBUYWJsZVtyb3ddKSB7XG4gICAgICAgICAgICAgICAgICB0bXBUYWJsZVtyb3ddID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRtcFRhYmxlW3Jvd11bY29sXSA9IHtjb21wb25lbnRzOltdfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmNvbXBvbmVudC5yb3dzID0gXy5tZXJnZSh0bXBUYWJsZSwgJHNjb3BlLmNvbXBvbmVudC5yb3dzKTtcbiAgICAgICAgICAgIC8qZXNsaW50LWVuYWJsZSBtYXgtZGVwdGggKi9cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY29tcG9uZW50Lm51bVJvd3MnLCBjaGFuZ2VUYWJsZSk7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2NvbXBvbmVudC5udW1Db2xzJywgY2hhbmdlVGFibGUpO1xuICAgICAgfVxuICAgIF1cbiAgfTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuKiBJbnZva2VzIEJvb3RzdHJhcCdzIHBvcG92ZXIganF1ZXJ5IHBsdWdpbiBvbiBhbiBlbGVtZW50XG4qIFRvb2x0aXAgdGV4dCBjYW4gYmUgcHJvdmlkZWQgdmlhIHRpdGxlIGF0dHJpYnV0ZSBvclxuKiBhcyB0aGUgdmFsdWUgZm9yIHRoaXMgZGlyZWN0aXZlLlxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICByZXBsYWNlOiBmYWxzZSxcbiAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsLCBhdHRycykge1xuICAgICAgaWYgKGF0dHJzLmZvcm1CdWlsZGVyVG9vbHRpcCB8fCBhdHRycy50aXRsZSkge1xuICAgICAgICB2YXIgdG9vbHRpcCA9IGFuZ3VsYXIuZWxlbWVudCgnPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXF1ZXN0aW9uLXNpZ24gdGV4dC1tdXRlZFwiPjwvaT4nKTtcbiAgICAgICAgdG9vbHRpcC5wb3BvdmVyKHtcbiAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgIHRyaWdnZXI6ICdtYW51YWwnLFxuICAgICAgICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICAgICAgICBjb250ZW50OiBhdHRycy50aXRsZSB8fCBhdHRycy5mb3JtQnVpbGRlclRvb2x0aXBcbiAgICAgICAgfSkub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJHNlbGYgPSBhbmd1bGFyLmVsZW1lbnQodGhpcyk7XG4gICAgICAgICAgJHNlbGYucG9wb3Zlcignc2hvdycpO1xuICAgICAgICAgICRzZWxmLnNpYmxpbmdzKCcucG9wb3ZlcicpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2VsZi5wb3BvdmVyKCdoaWRlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyICRzZWxmID0gYW5ndWxhci5lbGVtZW50KHRoaXMpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuZWxlbWVudCgnLnBvcG92ZXI6aG92ZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgJHNlbGYucG9wb3ZlcignaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hcHBlbmQoJyAnKS5hcHBlbmQodG9vbHRpcCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0ciwgY3RybCkge1xuICAgICAgY3RybC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UoaW5wdXQpO1xuICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KCdqc29uSW5wdXQnLCB0cnVlKTtcbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkoJ2pzb25JbnB1dCcsIGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGN0cmwuJGZvcm1hdHRlcnMucHVzaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkoJ2pzb25JbnB1dCcsIGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgc3RyID0gYW5ndWxhci50b0pzb24oZGF0YSwgdHJ1ZSk7XG4gICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkoJ2pzb25JbnB1dCcsIHRydWUpO1xuICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eSgnanNvbklucHV0JywgZmFsc2UpO1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLypcbiogUHJldmVudHMgdXNlciBpbnB1dHRpbmcgaW52YWxpZCBhcGkga2V5IGNoYXJhY3RlcnMuXG4qIFZhbGlkIGNoYXJhY3RlcnMgZm9yIGFuIGFwaSBrZXkgYXJlIGFscGhhbnVtZXJpYyBhbmQgaHlwaGVuc1xuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgbmdNb2RlbCkge1xuICAgICAgdmFyIGludmFsaWRSZWdleCA9IC9eW15BLVphLXpdK3xbXkEtWmEtejAtOVxcLVxcLl0rL2c7XG4gICAgICBuZ01vZGVsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24oaW5wdXRWYWx1ZSkge1xuICAgICAgICB2YXIgdHJhbnNmb3JtZWRJbnB1dCA9IGlucHV0VmFsdWUucmVwbGFjZShpbnZhbGlkUmVnZXgsICcnKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWVkSW5wdXQgIT09IGlucHV0VmFsdWUpIHtcbiAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUodHJhbnNmb3JtZWRJbnB1dCk7XG4gICAgICAgICAgbmdNb2RlbC4kcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkSW5wdXQ7XG4gICAgIH0pO1xuICAgIH1cbiAgfTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuKiBBIGRpcmVjdGl2ZSB0aGF0IHByb3ZpZGVzIGEgVUkgdG8gYWRkIHt2YWx1ZSwgbGFiZWx9IG9iamVjdHMgdG8gYW4gYXJyYXkuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBzY29wZToge1xuICAgICAgZGF0YTogJz0nLFxuICAgICAgbGFiZWw6ICdAJyxcbiAgICAgIHRvb2x0aXBUZXh0OiAnQCcsXG4gICAgICB2YWx1ZUxhYmVsOiAnQCcsXG4gICAgICBsYWJlbExhYmVsOiAnQCcsXG4gICAgICB2YWx1ZVByb3BlcnR5OiAnQCcsXG4gICAgICBsYWJlbFByb3BlcnR5OiAnQCdcbiAgICB9LFxuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicgK1xuICAgICAgICAgICAgICAgICc8bGFiZWwgZm9ybS1idWlsZGVyLXRvb2x0aXA9XCJ7eyB0b29sdGlwVGV4dCB9fVwiPnt7IGxhYmVsIH19PC9sYWJlbD4nICtcbiAgICAgICAgICAgICAgICAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtY29uZGVuc2VkXCI+JyArXG4gICAgICAgICAgICAgICAgICAnPHRoZWFkPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHRyPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8dGggY2xhc3M9XCJjb2wteHMtNlwiPnt7IGxhYmVsTGFiZWwgfX08L3RoPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8dGggY2xhc3M9XCJjb2wteHMtNFwiPnt7IHZhbHVlTGFiZWwgfX08L3RoPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8dGggY2xhc3M9XCJjb2wteHMtMlwiPjwvdGg+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L3RyPicgK1xuICAgICAgICAgICAgICAgICAgJzwvdGhlYWQ+JyArXG4gICAgICAgICAgICAgICAgICAnPHRib2R5PicgK1xuICAgICAgICAgICAgICAgICAgICAnPHRyIG5nLXJlcGVhdD1cInYgaW4gZGF0YSB0cmFjayBieSAkaW5kZXhcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAnPHRkIGNsYXNzPVwiY29sLXhzLTZcIj48aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5nLW1vZGVsPVwidltsYWJlbFByb3BlcnR5XVwiIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxMYWJlbCB9fVwiLz48L3RkPicgK1xuICAgICAgICAgICAgICAgICAgICAgICc8dGQgY2xhc3M9XCJjb2wteHMtNFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmctbW9kZWw9XCJ2W3ZhbHVlUHJvcGVydHldXCIgcGxhY2Vob2xkZXI9XCJ7eyB2YWx1ZUxhYmVsIH19XCIvPjwvdGQ+JyArXG4gICAgICAgICAgICAgICAgICAgICAgJzx0ZCBjbGFzcz1cImNvbC14cy0yXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4teHNcIiBuZy1jbGljaz1cInJlbW92ZVZhbHVlKCRpbmRleClcIiB0YWJpbmRleD1cIi0xXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZS1jaXJjbGVcIj48L3NwYW4+PC9idXR0b24+PC90ZD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvdHI+JyArXG4gICAgICAgICAgICAgICAgICAnPC90Ym9keT4nICtcbiAgICAgICAgICAgICAgICAnPC90YWJsZT4nICtcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIiBuZy1jbGljaz1cImFkZFZhbHVlKClcIj5BZGQge3sgdmFsdWVMYWJlbCB9fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICAkc2NvcGUudmFsdWVQcm9wZXJ0eSA9ICRzY29wZS52YWx1ZVByb3BlcnR5IHx8ICd2YWx1ZSc7XG4gICAgICAkc2NvcGUubGFiZWxQcm9wZXJ0eSA9ICRzY29wZS5sYWJlbFByb3BlcnR5IHx8ICdsYWJlbCc7XG4gICAgICAkc2NvcGUudmFsdWVMYWJlbCA9ICRzY29wZS52YWx1ZUxhYmVsIHx8ICdWYWx1ZSc7XG4gICAgICAkc2NvcGUubGFiZWxMYWJlbCA9ICRzY29wZS5sYWJlbExhYmVsIHx8ICdMYWJlbCc7XG5cbiAgICAgICRzY29wZS5hZGRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2JqID0ge307XG4gICAgICAgIG9ialskc2NvcGUudmFsdWVQcm9wZXJ0eV0gPSAnJztcbiAgICAgICAgb2JqWyRzY29wZS5sYWJlbFByb3BlcnR5XSA9ICcnO1xuICAgICAgICAkc2NvcGUuZGF0YS5wdXNoKG9iaik7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUucmVtb3ZlVmFsdWUgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAkc2NvcGUuZGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfTtcblxuICAgICAgaWYgKCRzY29wZS5kYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkc2NvcGUuYWRkVmFsdWUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFhdHRycy5ub0F1dG9jb21wbGV0ZVZhbHVlKSB7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2RhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAvLyBJZ25vcmUgYXJyYXkgYWRkaXRpb24vZGVsZXRpb24gY2hhbmdlc1xuICAgICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggIT09IG9sZFZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF8ubWFwKG5ld1ZhbHVlLCBmdW5jdGlvbihlbnRyeSwgaSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5WyRzY29wZS5sYWJlbFByb3BlcnR5XSAhPT0gb2xkVmFsdWVbaV1bJHNjb3BlLmxhYmVsUHJvcGVydHldKSB7Ly8gbGFiZWwgY2hhbmdlZFxuICAgICAgICAgICAgICBpZiAoZW50cnlbJHNjb3BlLnZhbHVlUHJvcGVydHldID09PSAnJyB8fCBlbnRyeVskc2NvcGUudmFsdWVQcm9wZXJ0eV0gPT09IF8uY2FtZWxDYXNlKG9sZFZhbHVlW2ldWyRzY29wZS5sYWJlbFByb3BlcnR5XSkpIHtcbiAgICAgICAgICAgICAgICBlbnRyeVskc2NvcGUudmFsdWVQcm9wZXJ0eV0gPSBfLmNhbWVsQ2FzZShlbnRyeVskc2NvcGUubGFiZWxQcm9wZXJ0eV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIENyZWF0ZSBhbiBBbmd1bGFySlMgc2VydmljZSBjYWxsZWQgZGVib3VuY2Vcbm1vZHVsZS5leHBvcnRzID0gWyckdGltZW91dCcsJyRxJywgZnVuY3Rpb24oJHRpbWVvdXQsICRxKSB7XG4gIC8vIFRoZSBzZXJ2aWNlIGlzIGFjdHVhbGx5IHRoaXMgZnVuY3Rpb24sIHdoaWNoIHdlIGNhbGwgd2l0aCB0aGUgZnVuY1xuICAvLyB0aGF0IHNob3VsZCBiZSBkZWJvdW5jZWQgYW5kIGhvdyBsb25nIHRvIHdhaXQgaW4gYmV0d2VlbiBjYWxsc1xuICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQ7XG4gICAgLy8gQ3JlYXRlIGEgZGVmZXJyZWQgb2JqZWN0IHRoYXQgd2lsbCBiZSByZXNvbHZlZCB3aGVuIHdlIG5lZWQgdG9cbiAgICAvLyBhY3R1YWxseSBjYWxsIHRoZSBmdW5jXG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpKTtcbiAgICAgICAgICBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgIGlmICggdGltZW91dCApIHtcbiAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVvdXQpO1xuICAgICAgfVxuICAgICAgdGltZW91dCA9ICR0aW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoZnVuYy5hcHBseShjb250ZXh0LGFyZ3MpKTtcbiAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfTtcbiAgfTtcbn1dO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiEgbmctZm9ybWlvLWJ1aWxkZXIgdjwlPXZlcnNpb24lPiB8IGh0dHBzOi8vdW5wa2cuY29tL25nLWZvcm1pby1idWlsZGVyQDwlPXZlcnNpb24lPi9MSUNFTlNFLnR4dCAqL1xuLypnbG9iYWwgd2luZG93OiBmYWxzZSwgY29uc29sZTogZmFsc2UgKi9cbi8qanNoaW50IGJyb3dzZXI6IHRydWUgKi9cblxuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ25nRm9ybUJ1aWxkZXInLCBbXG4gICdmb3JtaW8nLFxuICAnZG5kTGlzdHMnLFxuICAnbmdEaWFsb2cnLFxuICAndWkuYm9vdHN0cmFwLmFjY29yZGlvbicsXG4gICduZ0NrZWRpdG9yJ1xuXSk7XG5cbmFwcC5jb25zdGFudCgnRk9STV9PUFRJT05TJywgcmVxdWlyZSgnLi9jb25zdGFudHMvZm9ybU9wdGlvbnMnKSk7XG5cbmFwcC5jb25zdGFudCgnQ09NTU9OX09QVElPTlMnLCByZXF1aXJlKCcuL2NvbnN0YW50cy9jb21tb25PcHRpb25zJykpO1xuXG5hcHAuZmFjdG9yeSgnZGVib3VuY2UnLCByZXF1aXJlKCcuL2ZhY3Rvcmllcy9kZWJvdW5jZScpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXInLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXInKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyQ29tcG9uZW50JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyQ29tcG9uZW50JykpO1xuXG5hcHAuZGlyZWN0aXZlKCdmb3JtQnVpbGRlckVsZW1lbnQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJFbGVtZW50JykpO1xuXG5hcHAuY29udHJvbGxlcignZm9ybUJ1aWxkZXJEbmQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJEbmQnKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyTGlzdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlckxpc3QnKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyUm93JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyUm93JykpO1xuXG5hcHAuZGlyZWN0aXZlKCdqc29uSW5wdXQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvanNvbklucHV0JykpO1xuXG5hcHAuZGlyZWN0aXZlKCdmb3JtQnVpbGRlck9wdGlvbicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlck9wdGlvbicpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXJUYWJsZScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlclRhYmxlJykpO1xuXG5hcHAuZGlyZWN0aXZlKCdmb3JtQnVpbGRlck9wdGlvbktleScsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlck9wdGlvbktleScpKTtcblxuYXBwLmRpcmVjdGl2ZSgnZm9ybUJ1aWxkZXJPcHRpb25UYWdzJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvcm1CdWlsZGVyT3B0aW9uVGFncycpKTtcblxuYXBwLmRpcmVjdGl2ZSgndmFsaWRBcGlLZXknLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvdmFsaWRBcGlLZXknKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyT3B0aW9uQ3VzdG9tVmFsaWRhdGlvbicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlck9wdGlvbkN1c3RvbVZhbGlkYXRpb24nKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyVG9vbHRpcCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9mb3JtQnVpbGRlclRvb2x0aXAnKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ3ZhbHVlQnVpbGRlcicsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy92YWx1ZUJ1aWxkZXInKSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Zvcm1CdWlsZGVyQ29uZGl0aW9uYWwnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZm9ybUJ1aWxkZXJDb25kaXRpb25hbCcpKTtcblxuLyoqXG4gKiBUaGlzIHdvcmthcm91bmQgaGFuZGxlcyB0aGUgZmFjdCB0aGF0IGlmcmFtZXMgY2FwdHVyZSBtb3VzZSBkcmFnXG4gKiBldmVudHMuIFRoaXMgaW50ZXJmZXJlcyB3aXRoIGRyYWdnaW5nIG92ZXIgY29tcG9uZW50cyBsaWtlIHRoZVxuICogQ29udGVudCBjb21wb25lbnQuIEFzIGEgd29ya2Fyb3VuZCwgd2Uga2VlcCB0cmFjayBvZiB0aGUgaXNEcmFnZ2luZ1xuICogZmxhZyBoZXJlIHRvIG92ZXJsYXkgaWZyYW1lcyB3aXRoIGEgZGl2IHdoaWxlIGRyYWdnaW5nLlxuICovXG5hcHAudmFsdWUoJ2RuZERyYWdJZnJhbWVXb3JrYXJvdW5kJywge1xuICBpc0RyYWdnaW5nOiBmYWxzZVxufSk7XG5cbmFwcC5ydW4oW1xuICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAnJHJvb3RTY29wZScsXG4gICduZ0RpYWxvZycsXG4gIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlLCAkcm9vdFNjb3BlLCBuZ0RpYWxvZykge1xuICAgIC8vIENsb3NlIGFsbCBvcGVuIGRpYWxvZ3Mgb24gc3RhdGUgY2hhbmdlLlxuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgbmdEaWFsb2cuY2xvc2VBbGwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vZm9ybWJ1aWxkZXIvZWRpdGJ1dHRvbnMuaHRtbCcsXG4gICAgICBcIjxkaXYgY2xhc3M9XFxcImNvbXBvbmVudC1idG4tZ3JvdXBcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwiYnRuIGJ0bi14eHMgYnRuLWRhbmdlciBjb21wb25lbnQtc2V0dGluZ3MtYnV0dG9uXFxcIiBzdHlsZT1cXFwiei1pbmRleDogMTAwMFxcXCIgbmctY2xpY2s9XFxcInJlbW92ZUNvbXBvbmVudChjb21wb25lbnQsIGZvcm1Db21wb25lbnQuY29uZmlybVJlbW92ZSlcXFwiPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVxcXCI+PC9zcGFuPjwvZGl2PlxcbiAgPGRpdiBuZy1pZj1cXFwiOjohaGlkZU1vdmVCdXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXh4cyBidG4tZGVmYXVsdCBjb21wb25lbnQtc2V0dGluZ3MtYnV0dG9uXFxcIiBzdHlsZT1cXFwiei1pbmRleDogMTAwMFxcXCI+PHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24gZ2x5cGhpY29uLW1vdmVcXFwiPjwvc3Bhbj48L2Rpdj5cXG4gIDxkaXYgbmctaWY9XFxcIjo6Zm9ybUNvbXBvbmVudC52aWV3c1xcXCIgY2xhc3M9XFxcImJ0biBidG4teHhzIGJ0bi1kZWZhdWx0IGNvbXBvbmVudC1zZXR0aW5ncy1idXR0b25cXFwiIHN0eWxlPVxcXCJ6LWluZGV4OiAxMDAwXFxcIiBuZy1jbGljaz1cXFwiZWRpdENvbXBvbmVudChjb21wb25lbnQpXFxcIj48c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jb2dcXFwiPjwvc3Bhbj48L2Rpdj5cXG48L2Rpdj5cXG5cIlxuICAgICk7XG5cbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9jb21wb25lbnQuaHRtbCcsXG4gICAgICBcIjxkaXYgY2xhc3M9XFxcImNvbXBvbmVudC1mb3JtLWdyb3VwIGNvbXBvbmVudC10eXBlLXt7IGNvbXBvbmVudC50eXBlIH19IGZvcm0tYnVpbGRlci1jb21wb25lbnRcXFwiPlxcbiAgPGRpdiBuZy1pZj1cXFwiOjohaGlkZUJ1dHRvbnNcXFwiIG5nLWluY2x1ZGU9XFxcIidmb3JtaW8vZm9ybWJ1aWxkZXIvZWRpdGJ1dHRvbnMuaHRtbCdcXFwiPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCBoYXMtZmVlZGJhY2sgZm9ybS1maWVsZC10eXBlLXt7IGNvbXBvbmVudC50eXBlIH19IHt7Y29tcG9uZW50LmN1c3RvbUNsYXNzfX1cXFwiIGlkPVxcXCJmb3JtLWdyb3VwLXt7IGNvbXBvbmVudC5rZXkgfX1cXFwiIHN0eWxlPVxcXCJwb3NpdGlvbjppbmhlcml0XFxcIiBuZy1zdHlsZT1cXFwiY29tcG9uZW50LnN0eWxlXFxcIj5cXG4gICAgPGZvcm0tYnVpbGRlci1lbGVtZW50PjwvZm9ybS1idWlsZGVyLWVsZW1lbnQ+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIlxuICAgICk7XG5cbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Zvcm1pby9mb3JtYnVpbGRlci9saXN0Lmh0bWwnLFxuICAgICAgXCI8dWwgY2xhc3M9XFxcImNvbXBvbmVudC1saXN0XFxcIlxcbiAgICBkbmQtbGlzdD1cXFwiY29tcG9uZW50LmNvbXBvbmVudHNcXFwiXFxuICAgIGRuZC1kcm9wPVxcXCJhZGRDb21wb25lbnQoaXRlbSwgaW5kZXgpXFxcIj5cXG4gIDxsaSBuZy1pZj1cXFwiY29tcG9uZW50LmNvbXBvbmVudHMubGVuZ3RoIDwgaGlkZUNvdW50XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtaW5mb1xcXCIgc3R5bGU9XFxcInRleHQtYWxpZ246Y2VudGVyOyBtYXJnaW4tYm90dG9tOiA1cHg7XFxcIiByb2xlPVxcXCJhbGVydFxcXCI+XFxuICAgICAgRHJhZyBhbmQgRHJvcCBhIGZvcm0gY29tcG9uZW50XFxuICAgIDwvZGl2PlxcbiAgPC9saT5cXG4gIDwhLS0gRE8gTk9UIFBVVCBcXFwidHJhY2sgYnkgJGluZGV4XFxcIiBIRVJFIFNJTkNFIERZTkFNSUNBTExZIEFERElORy9SRU1PVklORyBDT01QT05FTlRTIFdJTEwgQlJFQUsgLS0+XFxuICA8bGkgbmctcmVwZWF0PVxcXCJjb21wb25lbnQgaW4gY29tcG9uZW50LmNvbXBvbmVudHNcXFwiXFxuICAgICAgbmctaWY9XFxcIiFyb290TGlzdCB8fCAhZm9ybS5kaXNwbGF5IHx8IChmb3JtLmRpc3BsYXkgPT09ICdmb3JtJykgfHwgKGZvcm0ucGFnZSA9PT0gJGluZGV4KVxcXCJcXG4gICAgICBkbmQtZHJhZ2dhYmxlPVxcXCJjb21wb25lbnRcXFwiXFxuICAgICAgZG5kLWVmZmVjdC1hbGxvd2VkPVxcXCJtb3ZlXFxcIlxcbiAgICAgIGRuZC1kcmFnc3RhcnQ9XFxcImRuZERyYWdJZnJhbWVXb3JrYXJvdW5kLmlzRHJhZ2dpbmcgPSB0cnVlXFxcIlxcbiAgICAgIGRuZC1kcmFnZW5kPVxcXCJkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nID0gZmFsc2VcXFwiXFxuICAgICAgZG5kLW1vdmVkPVxcXCJyZW1vdmVDb21wb25lbnQoY29tcG9uZW50LCBmYWxzZSlcXFwiPlxcbiAgICA8Zm9ybS1idWlsZGVyLWNvbXBvbmVudCBuZy1pZj1cXFwiIWNvbXBvbmVudC5oaWRlQnVpbGRlclxcXCI+PC9mb3JtLWJ1aWxkZXItY29tcG9uZW50PlxcbiAgICA8ZGl2IG5nLWlmPVxcXCJkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nICYmICFmb3JtQ29tcG9uZW50Lm5vRG5kT3ZlcmxheVxcXCIgY2xhc3M9XFxcImRuZE92ZXJsYXlcXFwiPjwvZGl2PlxcbiAgPC9saT5cXG48L3VsPlxcblwiXG4gICAgKTtcblxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL3Jvdy5odG1sJyxcbiAgICAgIFwiPGRpdiBjbGFzcz1cXFwiZm9ybWJ1aWxkZXItcm93XFxcIj5cXG4gIDxsYWJlbCBuZy1pZj1cXFwiY29tcG9uZW50LmxhYmVsXFxcIiBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCI+e3sgY29tcG9uZW50LmxhYmVsIH19PC9sYWJlbD5cXG4gIDx1bCBjbGFzcz1cXFwiY29tcG9uZW50LXJvdyBmb3JtYnVpbGRlci1ncm91cFxcXCJcXG4gICAgICBkbmQtbGlzdD1cXFwiY29tcG9uZW50LmNvbXBvbmVudHNcXFwiXFxuICAgICAgZG5kLWRyb3A9XFxcImFkZENvbXBvbmVudChpdGVtLCBpbmRleClcXFwiXFxuICAgICAgZG5kLWhvcml6b250YWwtbGlzdD1cXFwidHJ1ZVxcXCI+XFxuICAgIDxsaSBuZy1yZXBlYXQ9XFxcImNvbXBvbmVudCBpbiBjb21wb25lbnQuY29tcG9uZW50c1xcXCJcXG4gICAgICAgIGNsYXNzPVxcXCJmb3JtYnVpbGRlci1ncm91cC1yb3cgcHVsbC1sZWZ0XFxcIlxcbiAgICAgICAgZG5kLWRyYWdnYWJsZT1cXFwiY29tcG9uZW50XFxcIlxcbiAgICAgICAgZG5kLWVmZmVjdC1hbGxvd2VkPVxcXCJtb3ZlXFxcIlxcbiAgICAgICAgZG5kLWRyYWdzdGFydD1cXFwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IHRydWVcXFwiXFxuICAgICAgICBkbmQtZHJhZ2VuZD1cXFwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IGZhbHNlXFxcIlxcbiAgICAgICAgZG5kLW1vdmVkPVxcXCJyZW1vdmVDb21wb25lbnQoY29tcG9uZW50LCBmYWxzZSlcXFwiPlxcbiAgICAgIDxmb3JtLWJ1aWxkZXItY29tcG9uZW50PjwvZm9ybS1idWlsZGVyLWNvbXBvbmVudD5cXG4gICAgICA8ZGl2IG5nLWlmPVxcXCJkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nICYmICFmb3JtQ29tcG9uZW50Lm5vRG5kT3ZlcmxheVxcXCIgY2xhc3M9XFxcImRuZE92ZXJsYXlcXFwiPjwvZGl2PlxcbiAgICA8L2xpPlxcbiAgICA8bGkgY2xhc3M9XFxcImZvcm1idWlsZGVyLWdyb3VwLXJvdyBmb3JtLWJ1aWxkZXItZHJvcFxcXCIgbmctaWY9XFxcImNvbXBvbmVudC5jb21wb25lbnRzLmxlbmd0aCA8IGhpZGVDb3VudFxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtaW5mb1xcXCIgcm9sZT1cXFwiYWxlcnRcXFwiPlxcbiAgICAgICAgRHJhZyBhbmQgRHJvcCBhIGZvcm0gY29tcG9uZW50XFxuICAgICAgPC9kaXY+XFxuICAgIDwvbGk+XFxuICA8L3VsPlxcbiAgPGRpdiBzdHlsZT1cXFwiY2xlYXI6Ym90aDtcXFwiPjwvZGl2PlxcbjwvZGl2PlxcblwiXG4gICAgKTtcblxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2J1aWxkZXIuaHRtbCcsXG4gICAgICBcIjxkaXYgY2xhc3M9XFxcInJvdyBmb3JtYnVpbGRlclxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtNCBjb2wtc20tMyBjb2wtbWQtMiBmb3JtY29tcG9uZW50c1xcXCI+XFxuICAgIDx1aWItYWNjb3JkaW9uIGNsb3NlLW90aGVycz1cXFwidHJ1ZVxcXCI+XFxuICAgICAgPGRpdiB1aWItYWNjb3JkaW9uLWdyb3VwIG5nLXJlcGVhdD1cXFwiKGdyb3VwTmFtZSwgZ3JvdXApIGluIGZvcm1Db21wb25lbnRHcm91cHNcXFwiIGhlYWRpbmc9XFxcInt7IGdyb3VwLnRpdGxlIH19XFxcIiBpcy1vcGVuPVxcXCIkZmlyc3RcXFwiIGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0IGZvcm0tYnVpbGRlci1wYW5lbCB7eyBncm91cC5wYW5lbENsYXNzIH19XFxcIj5cXG4gICAgICAgIDx1aWItYWNjb3JkaW9uIGNsb3NlLW90aGVycz1cXFwidHJ1ZVxcXCIgbmctaWY9XFxcImdyb3VwLnN1Ymdyb3Vwc1xcXCI+XFxuICAgICAgICAgIDxkaXYgdWliLWFjY29yZGlvbi1ncm91cCBuZy1yZXBlYXQ9XFxcIihzdWJncm91cE5hbWUsIHN1Ymdyb3VwKSBpbiBncm91cC5zdWJncm91cHNcXFwiIGhlYWRpbmc9XFxcInt7IHN1Ymdyb3VwLnRpdGxlIH19XFxcIiBpcy1vcGVuPVxcXCIkZmlyc3RcXFwiIGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0IGZvcm0tYnVpbGRlci1wYW5lbCBzdWJncm91cC1hY2NvcmRpb25cXFwiPlxcbiAgICAgICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJjb21wb25lbnQgaW4gZm9ybUNvbXBvbmVudHNCeUdyb3VwW2dyb3VwTmFtZV1bc3ViZ3JvdXBOYW1lXVxcXCIgbmctaWY9XFxcImNvbXBvbmVudC50aXRsZVxcXCJcXG4gICAgICAgICAgICAgICAgZG5kLWRyYWdnYWJsZT1cXFwiY29tcG9uZW50LnNldHRpbmdzXFxcIlxcbiAgICAgICAgICAgICAgICBkbmQtZHJhZ3N0YXJ0PVxcXCJkbmREcmFnSWZyYW1lV29ya2Fyb3VuZC5pc0RyYWdnaW5nID0gdHJ1ZVxcXCJcXG4gICAgICAgICAgICAgICAgZG5kLWRyYWdlbmQ9XFxcImRuZERyYWdJZnJhbWVXb3JrYXJvdW5kLmlzRHJhZ2dpbmcgPSBmYWxzZVxcXCJcXG4gICAgICAgICAgICAgICAgZG5kLWVmZmVjdC1hbGxvd2VkPVxcXCJjb3B5XFxcIlxcbiAgICAgICAgICAgICAgICBjbGFzcz1cXFwiZm9ybWNvbXBvbmVudGNvbnRhaW5lclxcXCI+XFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi14cyBidG4tYmxvY2sgZm9ybWNvbXBvbmVudFxcXCIgdGl0bGU9XFxcInt7Y29tcG9uZW50LnRpdGxlfX1cXFwiIHN0eWxlPVxcXCJvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXFwiPlxcbiAgICAgICAgICAgICAgICA8aSBuZy1pZj1cXFwiY29tcG9uZW50Lmljb25cXFwiIGNsYXNzPVxcXCJ7eyBjb21wb25lbnQuaWNvbiB9fVxcXCI+PC9pPiB7eyBjb21wb25lbnQudGl0bGUgfX1cXG4gICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L3VpYi1hY2NvcmRpb24+XFxuICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cXFwiY29tcG9uZW50IGluIGZvcm1Db21wb25lbnRzQnlHcm91cFtncm91cE5hbWVdXFxcIiBuZy1pZj1cXFwiIWdyb3VwLnN1Ymdyb3VwICYmIGNvbXBvbmVudC50aXRsZVxcXCJcXG4gICAgICAgICAgICBkbmQtZHJhZ2dhYmxlPVxcXCJjb21wb25lbnQuc2V0dGluZ3NcXFwiXFxuICAgICAgICAgICAgZG5kLWRyYWdzdGFydD1cXFwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IHRydWVcXFwiXFxuICAgICAgICAgICAgZG5kLWRyYWdlbmQ9XFxcImRuZERyYWdJZnJhbWVXb3JrYXJvdW5kLmlzRHJhZ2dpbmcgPSBmYWxzZVxcXCJcXG4gICAgICAgICAgICBkbmQtZWZmZWN0LWFsbG93ZWQ9XFxcImNvcHlcXFwiXFxuICAgICAgICAgICAgY2xhc3M9XFxcImZvcm1jb21wb25lbnRjb250YWluZXJcXFwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi14cyBidG4tYmxvY2sgZm9ybWNvbXBvbmVudFxcXCIgdGl0bGU9XFxcInt7Y29tcG9uZW50LnRpdGxlfX1cXFwiIHN0eWxlPVxcXCJvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXFwiPlxcbiAgICAgICAgICAgIDxpIG5nLWlmPVxcXCJjb21wb25lbnQuaWNvblxcXCIgY2xhc3M9XFxcInt7IGNvbXBvbmVudC5pY29uIH19XFxcIj48L2k+IHt7IGNvbXBvbmVudC50aXRsZSB9fVxcbiAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC91aWItYWNjb3JkaW9uPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtOCBjb2wtc20tOSBjb2wtbWQtMTAgZm9ybWFyZWFcXFwiPlxcbiAgICA8b2wgY2xhc3M9XFxcImJyZWFkY3J1bWJcXFwiIG5nLWlmPVxcXCJmb3JtLmRpc3BsYXkgPT09ICd3aXphcmQnXFxcIj5cXG4gICAgICA8bGkgbmctcmVwZWF0PVxcXCJ0aXRsZSBpbiBwYWdlcygpIHRyYWNrIGJ5ICRpbmRleFxcXCI+PGEgY2xhc3M9XFxcImxhYmVsXFxcIiBzdHlsZT1cXFwiZm9udC1zaXplOjFlbTtcXFwiIG5nLWNsYXNzPVxcXCJ7J2xhYmVsLWluZm8nOiAoJGluZGV4ID09PSBmb3JtLnBhZ2UpLCAnbGFiZWwtcHJpbWFyeSc6ICgkaW5kZXggIT09IGZvcm0ucGFnZSl9XFxcIiBuZy1jbGljaz1cXFwic2hvd1BhZ2UoJGluZGV4KVxcXCI+e3sgdGl0bGUgfX08L2E+PC9saT5cXG4gICAgICA8bGk+PGEgY2xhc3M9XFxcImxhYmVsIGxhYmVsLXN1Y2Nlc3NcXFwiIHN0eWxlPVxcXCJmb250LXNpemU6MWVtO1xcXCIgbmctY2xpY2s9XFxcIm5ld1BhZ2UoKVxcXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiIHRpdGxlPVxcXCJDcmVhdGUgUGFnZVxcXCI+PHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1xcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvc3Bhbj4gcGFnZTwvYT48L2xpPlxcbiAgICA8L29sPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wem9uZVxcXCI+XFxuICAgICAgPGZvcm0tYnVpbGRlci1saXN0IGNvbXBvbmVudD1cXFwiZm9ybVxcXCIgZm9ybT1cXFwiZm9ybVxcXCIgZm9ybWlvPVxcXCI6OmZvcm1pb1xcXCIgaGlkZS1kbmQtYm94LWNvdW50PVxcXCJoaWRlQ291bnRcXFwiIHJvb3QtbGlzdD1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcInJvb3RsaXN0XFxcIj48L2Zvcm0tYnVpbGRlci1saXN0PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiXG4gICAgKTtcblxuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZm9ybWlvL2Zvcm1idWlsZGVyL2RhdGFncmlkLmh0bWwnLFxuICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJkYXRhZ3JpZC1kbmQgZHJvcHpvbmVcXFwiIG5nLWNvbnRyb2xsZXI9XFxcImZvcm1CdWlsZGVyRG5kXFxcIj5cXG4gIDxsYWJlbCBuZy1pZj1cXFwiY29tcG9uZW50LmxhYmVsXFxcIiBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCI+e3sgY29tcG9uZW50LmxhYmVsIH19PC9sYWJlbD5cXG4gIDx0YWJsZSBjbGFzcz1cXFwidGFibGUgZGF0YWdyaWQtdGFibGVcXFwiIG5nLWNsYXNzPVxcXCJ7J3RhYmxlLXN0cmlwZWQnOiBjb21wb25lbnQuc3RyaXBlZCwgJ3RhYmxlLWJvcmRlcmVkJzogY29tcG9uZW50LmJvcmRlcmVkLCAndGFibGUtaG92ZXInOiBjb21wb25lbnQuaG92ZXIsICd0YWJsZS1jb25kZW5zZWQnOiBjb21wb25lbnQuY29uZGVuc2VkfVxcXCI+XFxuICAgIDx0cj5cXG4gICAgICA8dGggc3R5bGU9XFxcInBhZGRpbmc6MzBweCAwIDEwcHggMFxcXCIgbmctcmVwZWF0PVxcXCJjb21wb25lbnQgaW4gY29tcG9uZW50LmNvbXBvbmVudHNcXFwiIG5nLWNsYXNzPVxcXCJ7J2ZpZWxkLXJlcXVpcmVkJzogY29tcG9uZW50LnZhbGlkYXRlLnJlcXVpcmVkfVxcXCI+XFxuICAgICAgICB7eyAoY29tcG9uZW50LmxhYmVsIHx8ICcnKSB8IGZvcm1pb1RyYW5zbGF0ZTpudWxsOmJ1aWxkZXIgfX1cXG4gICAgICAgIDxkaXYgbmctaWY9XFxcImRuZERyYWdJZnJhbWVXb3JrYXJvdW5kLmlzRHJhZ2dpbmcgJiYgIWZvcm1Db21wb25lbnQubm9EbmRPdmVybGF5XFxcIiBjbGFzcz1cXFwiZG5kT3ZlcmxheVxcXCI+PC9kaXY+XFxuICAgICAgPC90aD5cXG4gICAgPC90cj5cXG4gICAgPHRyXFxuICAgICAgY2xhc3M9XFxcImNvbXBvbmVudC1saXN0XFxcIlxcbiAgICAgIGRuZC1saXN0PVxcXCJjb21wb25lbnQuY29tcG9uZW50c1xcXCJcXG4gICAgICBkbmQtZHJvcD1cXFwiYWRkQ29tcG9uZW50KGl0ZW0sIGluZGV4KVxcXCJcXG4gICAgPlxcbiAgICAgIDx0ZFxcbiAgICAgICAgbmctcmVwZWF0PVxcXCJjb21wb25lbnQgaW4gY29tcG9uZW50LmNvbXBvbmVudHNcXFwiXFxuICAgICAgICBuZy1pbml0PVxcXCJoaWRlTW92ZUJ1dHRvbiA9IHRydWU7IGNvbXBvbmVudC5oaWRlTGFiZWwgPSB0cnVlXFxcIlxcbiAgICAgICAgZG5kLWRyYWdnYWJsZT1cXFwiY29tcG9uZW50XFxcIlxcbiAgICAgICAgZG5kLWVmZmVjdC1hbGxvd2VkPVxcXCJtb3ZlXFxcIlxcbiAgICAgICAgZG5kLWRyYWdzdGFydD1cXFwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IHRydWVcXFwiXFxuICAgICAgICBkbmQtZHJhZ2VuZD1cXFwiZG5kRHJhZ0lmcmFtZVdvcmthcm91bmQuaXNEcmFnZ2luZyA9IGZhbHNlXFxcIlxcbiAgICAgICAgZG5kLW1vdmVkPVxcXCJyZW1vdmVDb21wb25lbnQoY29tcG9uZW50LCBmYWxzZSlcXFwiXFxuICAgICAgPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29tcG9uZW50LWZvcm0tZ3JvdXAgY29tcG9uZW50LXR5cGUte3sgY29tcG9uZW50LnR5cGUgfX0gZm9ybS1idWlsZGVyLWNvbXBvbmVudFxcXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImhhcy1mZWVkYmFjayBmb3JtLWZpZWxkLXR5cGUte3sgY29tcG9uZW50LnR5cGUgfX0ge3tjb21wb25lbnQuY3VzdG9tQ2xhc3N9fVxcXCIgaWQ9XFxcImZvcm0tZ3JvdXAte3sgY29tcG9uZW50LmtleSB9fVxcXCIgc3R5bGU9XFxcInBvc2l0aW9uOmluaGVyaXRcXFwiIG5nLXN0eWxlPVxcXCJjb21wb25lbnQuc3R5bGVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgIDxmb3JtLWJ1aWxkZXItY29tcG9uZW50PjwvZm9ybS1idWlsZGVyLWNvbXBvbmVudD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L3RkPlxcbiAgICAgIDx0ZCBuZy1pZj1cXFwiY29tcG9uZW50LmNvbXBvbmVudHMubGVuZ3RoID09PSAwXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWluZm9cXFwiIHJvbGU9XFxcImFsZXJ0XFxcIj5cXG4gICAgICAgICAgRGF0YWdyaWQgQ29tcG9uZW50c1xcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC90ZD5cXG4gICAgPC90cj5cXG4gIDwvdGFibGU+XFxuICA8ZGl2IHN0eWxlPVxcXCJjbGVhcjpib3RoO1xcXCI+PC9kaXY+XFxuPC9kaXY+XFxuXCJcbiAgICApO1xuXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdmb3JtaW8vY29tcG9uZW50cy9jb25maXJtLXJlbW92ZS5odG1sJyxcbiAgICAgIFwiPGZvcm0gaWQ9XFxcImNvbmZpcm0tcmVtb3ZlLWRpYWxvZ1xcXCI+XFxuICA8cD5SZW1vdmluZyB0aGlzIGNvbXBvbmVudCB3aWxsIGFsc28gPHN0cm9uZz5yZW1vdmUgYWxsIG9mIGl0cyBjaGlsZHJlbjwvc3Ryb25nPiEgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRvIHRoaXM/PC9wPlxcbiAgPGRpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0XFxcIiBuZy1jbGljaz1cXFwiY2xvc2VUaGlzRGlhbG9nKHRydWUpXFxcIj5SZW1vdmU8L2J1dHRvbj4mbmJzcDtcXG4gICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XFxcIiBzdHlsZT1cXFwibWFyZ2luLXJpZ2h0OiA1cHg7XFxcIiBuZy1jbGljaz1cXFwiY2xvc2VUaGlzRGlhbG9nKGZhbHNlKVxcXCI+Q2FuY2VsPC9idXR0b24+Jm5ic3A7XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9mb3JtPlxcblwiXG4gICAgKTtcbiAgfVxuXSk7XG5cbnJlcXVpcmUoJy4vY29tcG9uZW50cycpO1xuIl19
