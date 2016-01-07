app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('textarea', {
      views: [
        {
          name: 'Settings',
          template: 'formio/components/textfield/settings.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/textfield/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/textfield/api.html'
        },
        {
          name: 'Display',
          template: 'formio/components/textfield/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#textarea'
    });
  }
]);
