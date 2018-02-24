module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('address', {
        icon: 'fa fa-home',
        views: [
          {
            name: 'Display',
            template: 'formio/components/address/display.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/address/validate.html'
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
        documentation: 'http://help.form.io/userguide/#address'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/address/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option-label-position></form-builder-option-label-position>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="errorLabel"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<div class="form-group">' +
            '<label for="mapRegion" form-builder-tooltip="The region bias to use for this search. See <a href=\'https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes\' target=\'_blank\'>Region Biasing</a> for more information.">{{\'Region Bias\' | formioTranslate}}</label>' +
            '<input type="text" class="form-control" id="mapRegion" name="mapRegion" ng-model="component.map.region" placeholder="Dallas" />' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="mapKey" form-builder-tooltip="The API key for Google Maps. See <a href=\'https://developers.google.com/maps/documentation/geocoding/get-api-key\' target=\'_blank\'>Get an API Key</a> for more information.">{{\'Google Maps API Key\' | formioTranslate}}</label>' +
            '<input type="text" class="form-control" id="mapKey" name="mapKey" ng-model="component.map.key" placeholder="xxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxx"/>' +
          '</div>' +
          '<form-builder-option property="multiple" label="Allow Multiple Addresses"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="hidden"></form-builder-option>' +
          '<form-builder-option property="autofocus" type="checkbox" label="Initial Focus" tooltip="Make this field the initially focused element on this form."></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="dataGridLabel"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/address/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="unique"></form-builder-option>' +
          '<form-builder-option property="validate.customMessage"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
