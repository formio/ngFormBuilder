module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('container', {
        fbtemplate: 'formio/formbuilder/container.html',
        views: [
          {
            name: 'Display',
            template: 'formio/components/container/display.html'
          }, {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#container',
        noDndOverlay: true,
        confirmRemove: true
      });
    }
  ]);

  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/components/container/display.html',
        '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/formbuilder/container.html',
        '<fieldset>' +
        '<label ng-if="component.label" class="control-label">{{ component.label }}</label>' +
        '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
        '</fieldset>'
      );
    }
  ]);
};
