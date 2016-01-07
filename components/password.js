app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('password', {
      views: [
        {
          name: 'Settings',
          template: 'formio/components/password/settings.html'
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
    $templateCache.put('formio/components/password/settings.html',
      '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="placeholder"></form-builder-option>' +
        '<form-builder-option property="prefix"></form-builder-option>' +
        '<form-builder-option property="suffix"></form-builder-option>' +
        '<form-builder-option property="unique"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );
  }
]);
