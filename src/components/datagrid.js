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
