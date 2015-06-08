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
      '<form-builder-list></form-builder-list>'
    );
  }
]);
