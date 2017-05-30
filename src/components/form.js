module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('form', {
        fbtemplate: 'formio/formbuilder/form.html',
        icon: 'fa fa-wpforms',
        views: [
          {
            name: 'Display',
            template: 'formio/components/form/display.html'
          },
          {
            name: 'Data',
            template: 'formio/components/common/data.html'
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
        documentation: 'http://help.form.io/userguide/#form'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/form.html', '<span class="hidden-element-text">{{ component.src }}</span>');

      // Create the settings markup.
      $templateCache.put('formio/components/form/display.html',
        '<ng-form>' +
          '<form-builder-option property="label" label="Name" placeholder="Enter the name for this form field" title="The name for this field. It is only used for administrative purposes such as generating the automatic property name in the API tab (which may be changed manually)."></form-builder-option>' +
          '<form-builder-option property="path"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="reference"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
