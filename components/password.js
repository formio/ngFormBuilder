app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('password', {
      views: formioComponentsProvider.$get().components.textfield.views,
      documentation: 'http://help.form.io/userguide/#password'
    });
  }
]);
