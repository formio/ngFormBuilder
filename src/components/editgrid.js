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
            name: 'Templates',
            template: 'formio/components/editgrid/templates.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/editgrid/validate.html'
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
        '<form-builder-option property="hideLabel"></form-builder-option>' +
        '<form-builder-option property="tooltip"></form-builder-option>' +
        '<form-builder-option property="clearOnHide"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
        '<form-builder-option property="hidden"></form-builder-option>' +
        '<form-builder-option property="disabled"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/editgrid/templates.html',
        '<ng-form>' +
        '<div class="form-group">' +
        '  <label for="headerTemplate">{{\'Header Template\' | formioTranslate}}</label>' +
        '  <textarea class="form-control" rows="3" name="headerTemplate" ng-model="component.templates.header" placeholder="/*** Lodash Template Code ***/"></textarea>' +
        '  <p class="text-muted">Two available variables. "value" is the array of row data and "components" is the array of components in the grid.</p>' +
        '</div>' +
        '<div class="form-group">' +
        '  <label for="rowTemplate">{{\'Row Template\' | formioTranslate}}</label>' +
        '  <textarea class="form-control" rows="6" name="rowTemplate" ng-model="component.templates.row" placeholder="/*** Lodash Template Code ***/"></textarea>' +
        '  <p class="text-muted">Two available variables. "row" is an object of one row\'s data and "components" is the array of components in the grid. To add click events, add the classes "editRow" and "removeRow" to elements.</p>' +
        '</div>' +
        '<div class="form-group">' +
        '  <label for="footerTemplate">{{\'Footer Template\' | formioTranslate}}</label>' +
        '  <textarea class="form-control" rows="3" name="footerTemplate" ng-model="component.templates.footer" placeholder="/*** Lodash Template Code ***/"></textarea>' +
        '  <p class="text-muted">Two available variables. "value" is the array of row data and "components" is the array of components in the grid.</p>' +
        '</div>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="rowClass"></form-builder-option>' +
        '<form-builder-option property="addAnother"></form-builder-option>' +
        '<form-builder-option property="saveRow"></form-builder-option>' +
        '<form-builder-option property="removeRow"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/editgrid/validate.html',
        '<ng-form>' +
        '    <label>{{\'Row View Validation\' | formioTranslate}}</label>' +
        '    <textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.row" placeholder="/*** Example Code ***/\nvalid = (row.myfield === \'some value\') ? true : \'Must be some value\';">{{ component.validate.row }}</textarea>' +
        '    <small>' +
        '      <p>Normal validation does not run when a row is in "View" mode. This validation allows running custom view validation and returning an error per row.</p>' +
        '      <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
        '      <p>The variables <strong>row</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p>' +
        '    </small>' +
        '    <form-builder-option property="validate.customMessage"></form-builder-option>' +
        '    <form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );

      $templateCache.put('formio/formbuilder/editgrid.html',
        '<fieldset>' +
        '<label ng-if="labelVisible()" class="control-label">' +
          '{{ component.label }} ' +
          '<formio-component-tooltip></formio-component-tooltip>' +
        '</label>' +
        '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
        '</fieldset>'
      );

    }
  ]);
};
