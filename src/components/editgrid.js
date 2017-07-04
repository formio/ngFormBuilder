module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('editgrid', {
        fbtemplate: 'formio/formbuilder/editgrid.html',
        icon: 'fa fa-tasks',
        views: [
          {
            name: 'Display',
            template: 'formio/components/editgrid/display.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/common/validate.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#editgrid',
        noDndOverlay: true,
        confirmRemove: true
      });
    }
  ]);

  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/components/editgrid/display.html',
        '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<div class="form-group">' +
        '  <label for="headerTemplate">Header Template</label>' +
        '  <textarea class="form-control" rows="3" name="headerTemplate" ng-model="component.templates.header" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></textarea>' +
        '  <p class="text-muted">Two available variables. "value" is the array of row data and "components" is the array of components in the grid.</p>' +
        '</div>' +
        '<div class="form-group">' +
        '  <label for="rowTemplate">Row Template</label>' +
        '  <textarea class="form-control" rows="6" name="rowTemplate" ng-model="component.templates.row" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></textarea>' +
        '  <p class="text-muted">Two available variables. "row" is an object of one row\'s data and "components" is the array of components in the grid. To add click events, add the classes "editRow" and "removeRow" to elements.</p>' +
        '</div>' +
        '<form-builder-option property="addAnother"></form-builder-option>' +
        '<form-builder-option property="saveRow"></form-builder-option>' +
        '<form-builder-option property="removeRow"></form-builder-option>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="striped"></form-builder-option>' +
        '<form-builder-option property="bordered"></form-builder-option>' +
        '<form-builder-option property="hover"></form-builder-option>' +
        '<form-builder-option property="condensed"></form-builder-option>' +
        '<form-builder-option property="clearOnHide"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="hidden"></form-builder-option>' +
        '<form-builder-option property="disabled"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/formbuilder/editgrid.html',
        '<fieldset>' +
        '<label ng-if="component.label" class="control-label">{{ component.label }}</label>' +
        '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
        '</fieldset>'
      );
    }
  ]);
};
