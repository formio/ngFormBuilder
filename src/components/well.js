module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('well', {
        fbtemplate: 'formio/formbuilder/well.html',
        icon: 'fa fa-square-o',
        documentation: 'http://help.form.io/userguide/#well',
        noDndOverlay: true,
        confirmRemove: true,
        views: [
          {
            name: 'Display',
            template: 'formio/components/common/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ]
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/well.html',
        '<div class="well">' +
          '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
        '</div>'
      );
      $templateCache.put('formio/components/common/display.html',
        '<ng-form>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
        '<ng-form>'
      );
    }
  ]);
};
