app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('content', {
      fbtemplate: 'formio/formbuilder/content.html',
      documentation: 'http://help.form.io/userguide/#content-component'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/content.html',
      '<div class="form-group">' +
        '<textarea ckeditor ng-model="component.html"><textarea>' +
      '</div>'
    );
  }
]);
