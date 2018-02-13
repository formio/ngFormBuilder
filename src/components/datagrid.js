module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    'FORM_OPTIONS',
    function(
      formioComponentsProvider,
      FORM_OPTIONS
    ) {
      formioComponentsProvider.register('datagrid', {
        fbtemplate: 'formio/formbuilder/datagrid.html',
        icon: 'fa fa-th',
        onEdit: ['$scope', function($scope) {
          $scope.themes = FORM_OPTIONS.themes;
          if (!$scope.component.addAnotherPosition) {
            $scope.component.addAnotherPosition = 'bottom';
          }
          $scope.addAnotherPosition = [
            {
              value: 'top',
              title: 'Top'
            },
            {
              value: 'bottom',
              title: 'Bottom'
            },
            {
              value: 'both',
              title: 'Both'
            }
          ];
        }],
        views: [
          {
            name: 'Display',
            template: 'formio/components/datagrid/display.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/datagrid/validate.html'
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
        documentation: 'http://help.form.io/userguide/#datagrid',
        noDndOverlay: true,
        confirmRemove: true
      });
    }
  ]);

  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/components/datagrid/display.html',
        '<ng-form>' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<form-builder-option property="hideLabel"></form-builder-option>' +
        '<form-builder-option property="tooltip"></form-builder-option>' +
        '<form-builder-option property="errorLabel"></form-builder-option>' +
        '<form-builder-option property="addAnother"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="addAnotherPosition" form-builder-tooltip="Position for Add Another button with respect to Data Grid Array.">{{\'Add Another Position\' | formioTranslate}}</label>' +
          '<select class="form-control" id="addAnotherPosition" name="addAnotherPosition" ng-options="position.value as position.title | formioTranslate for position in addAnotherPosition" ng-model="component.addAnotherPosition"></select>' +
        '</div>' +
        '<form-builder-option property="customClass"></form-builder-option>' +
        '<form-builder-option property="striped"></form-builder-option>' +
        '<form-builder-option property="bordered"></form-builder-option>' +
        '<form-builder-option property="hover"></form-builder-option>' +
        '<form-builder-option property="condensed"></form-builder-option>' +
        '<form-builder-option property="clearOnHide"></form-builder-option>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
        '<form-builder-option property="hidden"></form-builder-option>' +
        '<form-builder-option property="disabled"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/datagrid/validate.html',
        '<ng-form>' +
        '<form-builder-option property="validate.minLength"></form-builder-option>' +
        '<form-builder-option property="validate.maxLength"></form-builder-option>' +
        '<form-builder-option property="validate.customMessage"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};
