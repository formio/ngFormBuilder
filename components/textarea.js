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
          template: 'formio/components/common/api.html'
        },
        {
          name: 'Display',
          template: 'formio/components/common/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#textarea'
    });
  }
]);
