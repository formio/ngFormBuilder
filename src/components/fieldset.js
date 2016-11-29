module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('fieldset', {
        fbtemplate: 'formio/formbuilder/fieldset.html',
        icon: 'fa fa-th-large',
        views: [
          {
            name: 'Display',
            template: 'formio/components/fieldset/display.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
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
        documentation: 'http://help.form.io/userguide/#fieldset',
        keepChildrenOnRemove: true,
        noDndOverlay: true,
        confirmRemove: true
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/fieldset.html',
        '<fieldset>' +
          '<legend ng-if="component.legend">{{ component.legend }}</legend>' +
          '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
        '</fieldset>'
      );

      // Create the settings markup.
      $templateCache.put('formio/components/fieldset/display.html',
        '<ng-form>' +
          '<form-builder-option property="legend" label="Legend" placeholder="FieldSet Legend" title="The legend text to appear above this fieldset."></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
