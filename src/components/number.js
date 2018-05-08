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
            template: 'formio/components/number/data.html'
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
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option-label-position></form-builder-option-label-position>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="errorLabel"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="hidden"></form-builder-option>' +
          '<form-builder-option property="autofocus"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="dataGridLabel"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/number/data.html',
        '<form-builder-option property="delimiter"></form-builder-option>' +
        '<form-builder-option property="decimalLimit" type="number" step="1" label="Decimal Places" placeholder="any" title="The maximum number of decimal places."></form-builder-option>' +
        '<form-builder-option property="requireDecimal" type="checkbox" label="Require Decimal" title="Always show decimals, even if trailing zeros."></form-builder-option>' +
        '<form-builder-option property="defaultValue"></form-builder-option>' +
        '<form-builder-option property="dbIndex" class="form-builder-premium form-builder-dbindex"></form-builder-option>' +
        '<uib-accordion>' +
        '  <div uib-accordion-group heading="Custom Default Value" class="panel panel-default">' +
        '    <uib-accordion>' +
        '      <div uib-accordion-group heading="JavaScript Default" class="panel panel-default" is-open="true">' +
        '        <formio-script-editor rows="5" id="customDefaultValue" name="customDefaultValue" ng-model="component.customDefaultValue" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></formio-script-editor>' +
        '        <small>' +
        '          <p>Enter custom default value code.</p>' +
        '          <p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' +
        '          <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
        '          <p>Also <strong>moment</strong> library is available, and allows you to manipulate dates in a convenient way.</p>' +
        '          <p>Default Values are only calculated on form load. Use Calculated Value for a value that will update with the form.</p>' +
        '        </small>' +
        '      </div>' +
        '      <div uib-accordion-group heading="JSONLogic Default" class="panel panel-default">' +
        '        <small>' +
        '          <p>Execute custom default value using <a href="http://jsonlogic.com/">JSONLogic</a>.</p>' +
        '          <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
        '          <p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>' +
        '        </small>' +
        '        <textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.customDefaultValue" placeholder=\'{ ... }\'></textarea>' +
        '      </div>' +
        '    </uib-accordion>' +
        '  </div>' +
        '  <div uib-accordion-group heading="Calculated Value" class="panel panel-default">' +
        '    <uib-accordion>' +
        '      <div uib-accordion-group heading="JavaScript Value" class="panel panel-default" is-open="true">' +
        '        <formio-script-editor rows="5" id="calculateValue" name="calculateValue" ng-model="component.calculateValue" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></formio-script-editor>' +
        '        <small>' +
        '          <p>Enter code to calculate a value.</p>' +
        '          <p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' +
        '          <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
        '          <p>Also <strong>moment</strong> library is available, and allows you to manipulate dates in a convenient way.</p>' +
        '        </small>' +
        '      </div>' +
        '      <div uib-accordion-group heading="JSONLogic Value" class="panel panel-default">' +
        '        <small>' +
        '          <p>Execute custom calculation logic with JSON and <a href="http://jsonlogic.com/">JSONLogic</a>.</p>' +
        '          <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
        '          <p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>' +
        '        </small>' +
        '        <textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.calculateValue" placeholder=\'{ ... }\'></textarea>' +
        '      </div>' +
        '    </uib-accordion>' +
        '    <form-builder-option property="calculateServer" type="checkbox" label="Calculate on server" tooltip="Perform these calculations on the server as well as the frontend."></form-builder-option>' +
        '  </div>' +
        '</uib-accordion>'
      );

      // Create the API markup.
      $templateCache.put('formio/components/number/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="validate.min" type="number" label="Minimum Value" placeholder="Minimum Value" title="The minimum value this field must have before the form can be submitted."></form-builder-option>' +
          '<form-builder-option property="validate.max" type="number" label="Maximum Value" placeholder="Maximum Value" title="The maximum value this field must have before the form can be submitted."></form-builder-option>' +
          '<form-builder-option property="validate.customMessage"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};
