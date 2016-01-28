module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('email', {
        icon: 'fa fa-at',
        views: formioComponentsProvider.$get().components.textfield.views,
        documentation: 'http://help.form.io/userguide/#email'
      });
    }
  ]);
  
}
