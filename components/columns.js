app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('columns', {
      fbtemplate: 'formio/formbuilder/columns.html',
      documentation: 'http://help.form.io/userguide/#columns'
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/columns.html',
      '<div class="row">' +
        '<div class="col-xs-6 component-form-group" ng-repeat="component in component.columns">' +
          '<form-builder-list></form-builder-list>' +
        '</div>' +
      '</div>'
    );
  }
]);
