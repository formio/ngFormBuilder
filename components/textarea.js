var app = angular.module('formio.components');
app.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('textarea', {
    views: [
      {
        name: 'Display',
        template: 'formio/components/textfield/display.html'
      },
      {
        name: 'Validation',
        template: 'formio/components/textfield/validate.html'
      },
      {
        name: 'API',
        template: 'formio/components/textfield/api.html'
      }
    ]
  });
});
