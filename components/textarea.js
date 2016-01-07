app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
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
          template: 'formio/components/common/api.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#textarea'
    });
  }
]);
