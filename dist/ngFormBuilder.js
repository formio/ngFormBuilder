(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.formioBuilder = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="datagridLabel"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/checkbox/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
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
                  '<div class="form-group" ng-if="component.wysiwyg && editorVisible">' +
                    '<label for="editor-preview" class="control-label" ng-if="component.label">{{ component.label }}</label>' +
                    '<textarea class="form-control" id="editor-preview" ng-if="component.wysiwyg && editorVisible" ckeditor="component.wysiwyg"></textarea>' +
                  '</div>' +
                  '<formio-component ng-if="!component.wysiwyg" component="component" data="{}" formio="::formio"></formio-component>' +
                '</div>' +
              '</div>' +
              '<formio-settings-info component="component" data="{}" formio="::formio"></formio-settings-info>' +
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
        '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          $scope.ckeditorOptions = {
            allowedContent: true,
            toolbarGroups:  [
              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
              {name: 'links', groups: ['links']},
              {name: 'insert', groups: ['insert']},
              '/',
              {name: 'styles', groups: ['Styles', 'Format', 'Font', 'FontSize']},
              {name: 'colors', groups: ['colors']},
              {name: 'clipboard', groups: ['clipboard', 'undo']},
              {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
              {name: 'document', groups: ['mode', 'document', 'doctools']},
              {name: 'others', groups: ['others']},
              {name: 'tools', groups: ['tools']}
            ],
            extraPlugins: 'justify,font',
            removeButtons: 'Cut,Copy,Paste,Underline,Subscript,Superscript,Scayt,About',
            uiColor: '#eeeeee',
            height: '400px',
            width: '100%'
          };
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
          '<textarea ckeditor="ckeditorOptions" ng-model="component.html"><textarea>' +
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
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
            name: 'Validation',
            template: 'formio/components/datagrid/validate.html'
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
        '<form-builder-option property="clearOnHide"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="disabled"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/datagrid/validate.html',
        '<ng-form>' +
        '<form-builder-option property="validate.minLength"></form-builder-option>' +
        '<form-builder-option property="validate.maxLength"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
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
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="format" label="Date Format" placeholder="Enter the Date format" title="The format for displaying this field\'s date. The format must be specified like the <a href=\'https://docs.angularjs.org/api/ng/filter/date\' target=\'_blank\'>AngularJS date filter</a>."></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="validate.step" label="Increment (Step)" placeholder="Enter how much to increment per step (or precision)." title="The amount to increment/decrement for each step."></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="inputMask"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
              '<textarea class="form-control" id="data.json" name="data.json" ng-model="component.data.json" placeholder="Raw JSON Array" json-input rows="3">{{ component.data.json }}</textarea>' +
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
          '<form-builder-option ng-show="component.dataSrc == \'url\' || component.dataSrc == \'resource\' || component.dataSrc == \'json\'" property="limit" label="Limit" placeholder="Maximum number of items to view per page of results." title="Use this to limit the number of items to request or view."></form-builder-option>' +
          '<div class="form-group" ng-show="component.dataSrc == \'json\'">' +
          '  <label for="filter" form-builder-tooltip="The filter type for search.">Search Filter</label>' +
          '  <select class="form-control" id="filter" name="filter" ng-model="component.filter" ng-options="value as label for (value, label) in {none: \'No Search\', contains: \'Contains\', startsWith: \'Starts With\'}"></select>' +
          '</div>' +
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
          '<form-builder-option property="defaultValue"></form-builder-option>' +
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
            template: 'formio/components/textarea/display.html'
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
  app.controller('wysiwygSettings', ['$scope', function($scope) {
    $scope.wysiwygEnabled = !!$scope.component.wysiwyg;
    $scope.wysiwygSettings = {
      toolbarGroups:  [
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
        {name: 'links', groups: ['links']},
        {name: 'insert', groups: ['insert']},
        '/',
        {name: 'styles', groups: ['Styles', 'Format', 'Font', 'FontSize']},
        {name: 'colors', groups: ['colors']},
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
        {name: 'document', groups: ['mode', 'document', 'doctools']},
        {name: 'others', groups: ['others']},
        {name: 'tools', groups: ['tools']}
      ],
      extraPlugins: 'justify,font',
      removeButtons: 'Cut,Copy,Paste,Underline,Subscript,Superscript,Scayt,About',
      uiColor: '#eeeeee',
      height: '400px',
      width: '100%'
    };
    $scope.$watch('wysiwygEnabled', function(value) {
      $scope.component.wysiwyg = value ? $scope.wysiwygSettings : false;
    });
    $scope.$watch('wysiwygSettings', function(value) {
      if ($scope.wysiwygEnabled) {
        $scope.component.wysiwyg = value;
      }
    });
  }]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/textarea/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="inputMask"></form-builder-option>' +
          '<div ng-controller="wysiwygSettings">' +
            '<div class="checkbox">' +
              '<label><input type="checkbox" ng-model="wysiwygEnabled"> Enable WYWIWYG</label>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="wysiwyg">WYSIWYG Settings</label>' +
              '<textarea class="form-control" rows="5" id="wysiwyg" ng-model="wysiwygSettings" json-input placeholder="Enter the CKEditor JSON configuration to turn this TextArea into a WYSIWYG."></textarea>' +
            '</div>' +
          '</div>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
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
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="inputMask"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
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
  description: {
    label: 'Description',
    placeholder: 'Description for this field.',
    tooltip: 'The description is text that will appear below the input field.'
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
  clearOnHide: {
    label: 'Clear Value When Hidden',
    type: 'checkbox',
    tooltip: 'When a field is hidden, clear the value.'
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
  datagridLabel: {
    label: 'Datagrid Label',
    type: 'checkbox',
    tooltip: 'Show the label when in a datagrid.'
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
/*! ng-formio-builder v2.10.6 | https://unpkg.com/ng-formio-builder@2.10.6/LICENSE.txt */
/*global window: false, console: false */
/*jshint browser: true */


var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ckeditor'
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
      "<div class=\"component-btn-group\">\n  <div class=\"btn btn-xxs btn-danger component-settings-button\" style=\"z-index: 1000\" ng-click=\"removeComponent(component, formComponent.confirmRemove)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n  <div ng-if=\"::!hideMoveButton\" class=\"btn btn-xxs btn-default component-settings-button\" style=\"z-index: 1000\"><span class=\"glyphicon glyphicon glyphicon-move\"></span></div>\n  <div ng-if=\"::formComponent.views && !component.lockConfiguration\" class=\"btn btn-xxs btn-default component-settings-button\" style=\"z-index: 1000\" ng-click=\"editComponent(component)\"><span class=\"glyphicon glyphicon-cog\"></span></div>\n  <div ng-if=\"::formComponent.views && !component.lockConfiguration\" class=\"btn btn-xxs btn-default component-settings-button\" style=\"z-index: 1000\" ng-click=\"cloneComponent(component)\"><span class=\"glyphicon glyphicon-new-window\"></span></div>\n</div>\n"
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

},{"./components":19,"./constants/commonOptions":35,"./constants/formOptions":36,"./directives/formBuilder":37,"./directives/formBuilderComponent":38,"./directives/formBuilderConditional":39,"./directives/formBuilderDnd":40,"./directives/formBuilderElement":41,"./directives/formBuilderList":42,"./directives/formBuilderOption":43,"./directives/formBuilderOptionCustomValidation":44,"./directives/formBuilderOptionKey":45,"./directives/formBuilderOptionTags":46,"./directives/formBuilderRow":47,"./directives/formBuilderTable":48,"./directives/formBuilderTooltip":49,"./directives/jsonInput":50,"./directives/validApiKey":51,"./directives/valueBuilder":52,"./factories/debounce":53}]},{},[54])(54)
});