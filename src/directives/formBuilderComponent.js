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
