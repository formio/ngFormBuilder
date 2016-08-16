module.exports = function(app) {
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the component markup.
      $templateCache.put('formio/components/settings.html',
        '<form id="component-settings" novalidate>' +
          '<div class="row">' +
            '<div class="col-md-6">' +
              '<p class="lead" ng-if="formComponent.title" style="margin-top:10px;">{{formComponent.title}} Component</p>' +
            '</div>' +
            '<div class="col-md-6">' +
              '<div class="pull-right" ng-if="formComponent.documentation" style="margin-top:10px; margin-right:20px;">' +
                '<a ng-href="{{ formComponent.documentation }}" target="_blank"><i class="glyphicon glyphicon-new-window"></i> Help!</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col-xs-6">' +
              '<uib-tabset>' +
                '<uib-tab ng-repeat="view in formComponent.views" heading="{{ view.name }}"><ng-include src="view.template"></ng-include></uib-tab>' +
              '</uib-tabset>' +
            '</div>' +
            '<div class="col-xs-6">' +
              '<div class="panel panel-default preview-panel" style="margin-top:44px;">' +
                '<div class="panel-heading">Preview</div>' +
                '<div class="panel-body">' +
                  '<formio-component component="component" data="data" formio="formio"></formio-component>' +
                '</div>' +
              '</div>' +
              '<div class="form-group">' +
                '<button type="submit" class="btn btn-success" ng-click="closeThisDialog(true)">Save</button>&nbsp;' +
                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(false)" ng-if="!component.isNew">Cancel</button>&nbsp;' +
                '<button type="button" class="btn btn-danger" ng-click="removeComponent(component, formComponents[component.type].confirmRemove); closeThisDialog(false)">Remove</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</form>'
      );

      // Create the common API tab markup.
      $templateCache.put('formio/components/common/api.html',
        '<ng-form>' +
          '<form-builder-option-key></form-builder-option-key>' +
          '<form-builder-option-tags></form-builder-option-tags>' +
        '</ng-form>'
      );

      // Create the common Layout tab markup.
      $templateCache.put('formio/components/common/layout.html',
        '<ng-form>' +
          // Need to use array notation to have dash in name
          '<form-builder-option property="style[\'margin-top\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-right\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-bottom\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-left\']"></form-builder-option>' +
        '</ng-form>'
      );

      // Create the common Layout tab markup.
      $templateCache.put('formio/components/common/conditional.html',
        '<form-builder-conditional></form-builder-conditional>'
      );
    }
  ]);
};
