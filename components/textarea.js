app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('textarea', {
      icon: 'fa fa-font',
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
        },
        {
          name: 'Layout',
          template: 'formio/components/common/layout.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#textarea'
    });
  }
]);
