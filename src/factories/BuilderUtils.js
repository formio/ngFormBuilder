'use strict';

var _range = require('lodash/range');
var _difference = require('lodash/difference');

module.exports = ['FormioUtils', function(FormioUtils) {
  var suffixRegex = /(\d+)$/;

  /**
   * Memoize the given form components in a map, using the component keys.
   *
   * @param {Array} components
   *   An array of the form components.
   * @param {Object} input
   *   The input component we're trying to uniquify.
   *
   * @returns {Object}
   *   The memoized form components.
   */
  var findExistingComponents = function(components, input) {
    // Prebuild a list of existing components.
    var existingComponents = {};
    FormioUtils.eachComponent(components, function(component) {
      // If theres no key, we cant compare components.
      if (!component.key) return;

      // A component is pre-existing if the key is unique, or the key is a duplicate and its not flagged as the new component.
      if (
        (component.key !== input.key) ||
        ((component.key === input.key) && (!!component.isNew !== !!input.isNew))
      ) {
        existingComponents[component.key] = component;
      }
    }, true);

    return existingComponents;
  };

  /**
   * Determine if the given component key already exists in the memoization.
   *
   * @param {Object} memoization
   *   The form components map.
   * @param component
   *   The component to uniquify.
   *
   * @returns {boolean}
   *   Whether or not the key exists.
   */
  var keyExists = function(memoization, key) {
    if (memoization.hasOwnProperty(key)) {
      return true;
    }
    return false;
  };

  /**
   * Iterate the given key to make it unique.
   *
   * @param {String} key
   *   Modify the component key to be unique.
   *
   * @returns {String}
   *   The new component key.
   */
  var iterateKey = function(key) {
    if (!key.match(suffixRegex)) {
      return key + '2';
    }

    return key.replace(suffixRegex, function(suffix) {
      return Number(suffix) + 1;
    });
  };

  /**
   * Appends a number to a component.key to keep it unique
   *
   * @param {Object} form
   *   The components parent form.
   * @param {Object} component
   *   The component to uniquify
   */
  var uniquify = function(form, component) {
    var isNew = component.isNew || false;

    // Recurse into all child components.
    FormioUtils.eachComponent([component], function(component) {
      // Force the component isNew to be the same as the parent.
      component.isNew = isNew;

      // Skip key uniquification if this component doesn't have a key.
      if (!component.key) {
        return;
      }

      var memoization = findExistingComponents(form.components, component);
      while (keyExists(memoization, component.key)) {
        component.key = iterateKey(component.key);
      }
    }, true);

    return component;
  };

  function getAlphaShortcuts() {
    return _range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map(function(charCode) {
      return String.fromCharCode(charCode);
    });
  }

  var additionalShortcuts = {
    button: [
      'Enter',
      'Esc'
    ]
  }

  function getAdditionalShortcuts(type) {
    return additionalShortcuts[type] || [];
  }

  function getBindedShortcuts(components, input) {
    var result = [];

    FormioUtils.eachComponent(components, function(component) {
      if (component === input) {
        return;
      }

      if (component.shortcut) {
        result.push(component.shortcut);
      }
      if (component.values) {
        component.values.forEach(function(value) {
          if (value.shortcut) {
            result.push(value.shortcut);
          }
        });
      }
    }, true);

    return result;
  }

  function getAvailableShortcuts(form, component) {
    return _difference(
      getAlphaShortcuts().concat(getAdditionalShortcuts(component.type)),
      getBindedShortcuts(form.components, component));
  }

  return {
    getAvailableShortcuts: getAvailableShortcuts,
    uniquify: uniquify
  };
}];
