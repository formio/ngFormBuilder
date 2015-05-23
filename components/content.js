app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('content', {
      fbtemplate: 'formio/formbuilder/content.html'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/content.html',
      '<textarea froala ng-model="component.html"><textarea>'
    );

    $templateCache.put('formio/components/content/display.html',
      '<p>The content widget allows you to inject HTML content within your form using a WYSIWYG interface.</p>'
    );
  }
]);
