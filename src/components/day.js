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
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option-label-position></form-builder-option-label-position>' +
          '<form-builder-option-inputs-label-position></form-builder-option-inputs-label-position>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="fields.day.placeholder" label="Day Placeholder"></form-builder-option>' +
          '<form-builder-option property="fields.month.placeholder" label="Month Placeholder"></form-builder-option>' +
          '<form-builder-option property="fields.year.placeholder" label="Year Placeholder"></form-builder-option>' +
          '<form-builder-option property="useLocaleSettings" title="Use locale settings to display day."></form-builder-option>' +
          '<form-builder-option property="dayFirst" type="checkbox" label="Day first" title="Display the Day field before the Month field." ng-if="!component.useLocaleSettings"></form-builder-option>' +
          '<form-builder-option property="fields.day.hide" type="checkbox" label="Hide Day" title="Hide the day part of the component."></form-builder-option>' +
          '<form-builder-option property="fields.month.hide" type="checkbox" label="Hide Month" title="Hide the month part of the component."></form-builder-option>' +
          '<form-builder-option property="fields.year.hide" type="checkbox" label="Hide Year" title="Hide the year part of the component."></form-builder-option>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="errorLabel"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="hidden"></form-builder-option>' +
          '<form-builder-option property="autofocus" type="checkbox" label="Initial Focus" tooltip="Make this field the initially focused element on this form."></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="dataGridLabel"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/day/validate.html',
        '<ng-form>' +
          '<form-builder-option property="fields.day.required" label="Require Day" type="checkbox"></form-builder-option>' +
          '<form-builder-option property="fields.month.required" label="Require Month" type="checkbox"></form-builder-option>' +
          '<form-builder-option property="fields.year.required" label="Require Year" type="checkbox"></form-builder-option>' +
          '<form-builder-option property="validate.customMessage"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};
