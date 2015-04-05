components.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('well', {
    fbtemplate: 'formio/formbuilder/well.html'
  });
});
components.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/well.html',
      '<div class="well">' +
        '<form-builder-component-list></form-builder-component-list>' +
      '</div>'
    );
  }
]);
