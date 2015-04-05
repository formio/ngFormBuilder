app.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('container', {
    fbtemplate: 'formio/formbuilder/container.html'
  });
});
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/container.html',
      '<div class="row">' +
        '<div class="col-xs-6 component-form-group" ng-repeat="components in component.columns">' +
          '<form-builder-list></form-builder-list>' +
        '</div>' +
      '</div>'
    );
  }
]);
