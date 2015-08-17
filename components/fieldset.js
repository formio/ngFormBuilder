app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('fieldset', {
      fbtemplate: 'formio/formbuilder/fieldset.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/fieldset/display.html'
        }
      ],
      documentation: 'http://help.form.io/userguide/#fieldset',
      keepChildrenOnRemove: true
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put('formio/formbuilder/fieldset.html',
      '<fieldset>' +
        '<legend ng-if="component.legend">{{ component.legend }}</legend>' +
        '<form-builder-list></form-builder-list>' +
      '</fieldset>'
    );

    // Create the settings markup.
    $templateCache.put('formio/components/fieldset/display.html',
      '<ng-form>' +
        '<form-builder-option property="legend" label="Legend" placeholder="FieldSet Legend" title="The legend text to appear above this fieldset."></form-builder-option>' +
      '</ng-form>'
    );
  }
]);
