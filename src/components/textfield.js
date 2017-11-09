module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('textfield', {
        onEdit: ['$scope', function($scope) {
          $scope.positions = [
            {
              value: 'top',
              title: 'Top'
            },
            {
              value: 'left-left',
              title: 'Left (Left-aligned)'
            },
            {
              value: 'left-right',
              title: 'Left (Right-aligned)'
            },
            {
              value: 'right-left',
              title: 'Right (Left-aligned)'
            },
            {
              value: 'right-right',
              title: 'Right (Right-aligned)'
            },
            {
              value: 'bottom',
              title: 'Bottom'
            }
          ];
        }],
        views: [
          {
            name: 'Display',
            template: 'formio/components/textfield/display.html'
          },
          {
            name: 'Data',
            template: 'formio/components/common/data.html'
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
        documentation: 'http://help.form.io/userguide/#textfield'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/textfield/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<div class="form-group">' +
            '<label for="labelPosition" form-builder-tooltip="Possition for the label for this field.">{{\'Label Position\' | formioTranslate}}</label>' +
            '<select class="form-control" id="labelPosition" name="labelPosition" ng-options="position.value as position.title | formioTranslate for position in positions" ng-model="component.labelPosition"></select>' +
          '</div>' +
          '<div class="form-group" ng-if="[\'top\', \'bottom\'].indexOf(component.labelPosition) === -1">' +
          '  <label for="labelWidth" form-builder-tooltip="The width of label on line in percentages.">{{\'Label Width\' | formioTranslate}}</label>' +
          '  <input type="number" class="form-control" id="labelWidth" name="labelWidth" ng-model="component.labelWidth" placeholder="30" min="0" max="100" />' +
          '</div>' +
          '<div class="form-group" ng-if="[\'top\', \'bottom\'].indexOf(component.labelPosition) === -1">' +
          '  <label for="labelMargin" form-builder-tooltip="The width of label margin on line in percentages.">{{\'Label Margin\' | formioTranslate}}</label>' +
          '  <input type="number" class="form-control" id="labelMargin" name="labelMargin" ng-model="component.labelMargin" placeholder="3" min="0" max="100" />' +
          '</div>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="errorLabel"></form-builder-option>' +
          '<form-builder-option property="inputMask"></form-builder-option>' +
          '<form-builder-option property="prefix"></form-builder-option>' +
          '<form-builder-option property="suffix"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="hidden"></form-builder-option>' +
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option property="mask"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/textfield/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="unique"></form-builder-option>' +
          '<form-builder-option property="validate.minLength"></form-builder-option>' +
          '<form-builder-option property="validate.maxLength"></form-builder-option>' +
          '<form-builder-option property="validate.pattern"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};
