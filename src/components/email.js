var _cloneDeep = require('lodash/cloneDeep');
var _each = require('lodash/each');
module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      var views = _cloneDeep(formioComponentsProvider.$get().components.textfield.views);
      _each(views, function(view) {
        if (view.name === 'Validation') {
          view.template = 'formio/components/email/validate.html';
        }
      });
      formioComponentsProvider.register('email', {
        icon: 'fa fa-at',
        views: views,
        documentation: 'http://help.form.io/userguide/#email'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/components/email/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="unique"></form-builder-option>' +
          '<div class="panel panel-default">' +
            '<div class="panel-heading"><h3 class="panel-title">{{\'Kickbox\' | formioTranslate}}</h3></div>' +
            '<div class="panel-body">' +
              '<p>{{\'Validate this email using the Kickbox email validation service.\' | formioTranslate}}</p>' +
              '<div class="checkbox">' +
                '<label for="kickbox-enable" form-builder-tooltip="Enable Kickbox validation for this email field.">' +
                  '<input type="checkbox" id="kickbox-enable" name="kickbox-enable" ng-model="component.kickbox.enabled"> {{\'Enable\' | formioTranslate}}' +
                '</label>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<form-builder-option property="validate.minLength"></form-builder-option>' +
          '<form-builder-option property="validate.maxLength"></form-builder-option>' +
          '<form-builder-option property="validate.pattern"></form-builder-option>' +
          '<form-builder-option property="validate.customMessage"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};
