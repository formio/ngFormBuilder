app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('password', {
      views: formioComponentsProvider.$get().components.textfield.views,
      documentation: 'http://help.form.io/userguide/#password',
      template: 'formio/components/password.html'
    });
  }
]);
app.run([
  '$templateCache',
  function(
    $templateCache
  ) {
    // Disable dragging on password inputs because it breaks dndLists
    var textFieldTmpl = $templateCache.get('formio/components/textfield.html');
    var passwordTmpl = textFieldTmpl.replace(
      /<input type="{{ component.inputType }}" /g,
      '<input type="{{ component.inputType }}" dnd-nodrag '
    );
    $templateCache.put('formio/components/password.html', passwordTmpl);
  }
]);
