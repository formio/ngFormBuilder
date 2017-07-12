/**
* A directive for editing a component's custom validation.
*/
module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    template: '' +
      '<div>' +
      '<uib-accordion>' +
      '  <div uib-accordion-group heading="Custom Validation" class="panel panel-default">' +
      '    <formio-script-editor rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';"></formio-script-editor>' +
      '    <small>' +
      '      <p>Enter custom validation code.</p>' +
      '      <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
      '      <p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p>' +
      '    </small>' +
      '    <div class="well">' +
      '      <div class="checkbox">' +
      '        <label>' +
      '          <input type="checkbox" id="private" name="private" ng-model="component.validate.customPrivate" ng-checked="component.validate.customPrivate"> <strong>Secret Validation</strong>' +
      '        </label>' +
      '      </div>' +
      '      <p>Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.</p>' +
      '    </div>' +
      '  </div>' +
      '  <div uib-accordion-group heading="JSON Validation" class="panel panel-default">' +
      '    <small>' +
      '      <p>Execute custom validation logic with JSON and <a href="http://jsonlogic.com/">JsonLogic</a>.</p>' +
      '      <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
      '      <p><a href="http://formio.github.io/formio.js/app/examples/conditions.html" target="_blank">Click here for an example</a></p>' +
      '    </small>' +
      '    <textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.validate.json" placeholder=\'{ ... }\'></textarea>' +
      '  </div>' +
      '</uib-accordion>' +
      '</div>'
  };
};
