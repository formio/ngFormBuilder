'use strict';

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
        ((component.key === input.key) && (component.isNew !== input.isNew))
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
  var keyExists = function(memoization, component) {
    if (memoization.hasOwnProperty(component.key)) {
      return true;
    }
    return false;
  };

  /**
   * Iterate the given key to make it unique.
   *
   * @param {String} componentKey
   *   Modify the component key to be unique.
   *
   * @returns {String}
   *   The new component key.
   */
  var iterateKey = function(componentKey) {
    if (!componentKey.match(suffixRegex)) {
      return componentKey + '1';
    }

    return componentKey.replace(suffixRegex, function(suffix) {
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
    var memoization = findExistingComponents(form.components, component);
    if (!component.key) {
      return;
    }
    while (keyExists(memoization, component)) {
      component.key = iterateKey(component.key);
    }
  };

  return {
    uniquify: uniquify
  };
}];
