components.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('email', {
    views: formioComponentsProvider.$get().components.textfield.views
  });
});
