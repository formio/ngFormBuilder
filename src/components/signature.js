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
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="width" label="Width" placeholder="Width" title="The width of the signature area."></form-builder-option>' +
          '<form-builder-option property="height" label="Height" placeholder="Height" title="The height of the signature area."></form-builder-option>' +
          '<form-builder-option property="backgroundColor" label="Background Color" placeholder="Background Color" title="The background color of the signature area."></form-builder-option>' +
          '<form-builder-option property="penColor" label="Pen Color" placeholder="Pen Color" title="The ink color for the signature area."></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="hidden"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      // Create the Validation markup.
      $templateCache.put('formio/components/signature/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="validate.customMessage"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
