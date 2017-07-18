module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('page', {
        fbtemplate: 'formio/formbuilder/page.html'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/page.html',
        '<form-builder-list component="component" form="form" options="options" formio="::formio"></form-builder-list>'
      );
    }
  ]);
};
