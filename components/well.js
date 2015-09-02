app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('well', {
      fbtemplate: 'formio/formbuilder/well.html',
      documentation: 'http://help.form.io/userguide/#well',
      noDndOverlay: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/well.html',
      '<div class="well">' +
        '<form-builder-list></form-builder-list>' +
      '</div>'
    );
  }
]);
