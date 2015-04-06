app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('email', {
      views: formioComponentsProvider.$get().components.textfield.views
    });
  }
]);
