components.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('password', {
    views: formioComponentsProvider.$get().components.textfield.views
  });
});
