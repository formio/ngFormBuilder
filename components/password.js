var app = angular.module('formio.components');
app.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('password', {
    views: formioComponentsProvider.$get().components.textfield.views
  });
});