app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('datagrid', {
      fbtemplate: 'formio/formbuilder/datagrid.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/datagrid/display.html'
        },
        {
          name: 'API',
          template: 'formio/components/common/api.html'
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
      '<form-builder-option property="customClass"></form-builder-option>' +
      '<form-builder-option property="protected"></form-builder-option>' +
      '<form-builder-option property="persistent"></form-builder-option>' +
      '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    $templateCache.put('formio/formbuilder/datagrid.html',
      '<form-builder-row class="formio-row" component="component" form="form" formio="formio"></form-builder-row>'
    );
  }
]);
