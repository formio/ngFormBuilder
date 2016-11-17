module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('password', {
        icon: 'fa fa-asterisk',
        views: [
          {
            name: 'Display',
            template: 'formio/components/password/display.html'
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
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#password',
        template: 'formio/components/password.html'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function(
      $templateCache
    ) {
      // Disable dragging on password inputs because it breaks dndLists
      var textFieldTmpl = $templateCache.get('formio/components/textfield.html');
      var passwordTmpl = textFieldTmpl.replace(
        /<input type="{{ component.inputType }}" /g,
        '<input type="{{ component.inputType }}" dnd-nodrag '
      );
      $templateCache.put('formio/components/password.html', passwordTmpl);

      // Create the settings markup.
      $templateCache.put('formio/components/password/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
