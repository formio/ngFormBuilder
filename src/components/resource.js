module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('resource', {
        onEdit: ['$scope', function($scope) {
          $scope.resources = [];
          $scope.component.project = $scope.formio.projectId;
          $scope.formio.loadForms({params: {
            type: 'resource',
            limit: 4294967295,
            select: '_id,title'
          }}).then(function(resources) {
            $scope.resources = resources;
            if (!$scope.component.resource) {
              $scope.component.resource = resources[0]._id;
            }
          });
        }],
        icon: 'fa fa-files-o',
        views: [
          {
            name: 'Display',
            template: 'formio/components/resource/display.html'
          },
          {
            name: 'Validation',
            template: 'formio/components/resource/validate.html'
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
        documentation: 'http://help.form.io/userguide/#resource'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/resource/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option-label-position></form-builder-option-label-position>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<div class="form-group">' +
            '<label for="resource" form-builder-tooltip="The resource to be used with this field.">{{\'Resource\' | formioTranslate}}</label>' +
            '<select class="form-control" id="resource" name="resource" ng-options="value._id as value.title for value in resources" ng-model="component.resource"></select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="selectFields" form-builder-tooltip="The properties on the resource to return as part of the options. Separate property names by commas. If left blank, all properties will be returned.">{{\'Select Fields\' | formioTranslate}}</label>' +
            '<input type="text" class="form-control" id="selectFields" name="selectFields" ng-model="component.selectFields" placeholder="Comma separated list of fields to select." value="{{ component.selectFields }}">' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="searchFields" form-builder-tooltip="A list of search filters based on the fields of the resource. See the <a target=\'_blank\' href=\'https://github.com/travist/resourcejs#filtering-the-results\'>Resource.js documentation</a> for the format of these filters.">{{\'Search Fields\' | formioTranslate}}</label>' +
            '<input type="text" class="form-control" id="searchFields" name="searchFields" ng-model="component.searchFields" ng-list placeholder="The fields to query on the server" value="{{ component.searchFields }}">' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="template" form-builder-tooltip="The HTML template for the result data items.">{{\'Item Template\' | formioTranslate}}</label>' +
            '<textarea class="form-control" id="template" name="template" ng-model="component.template" rows="3">{{ component.template }}</textarea>' +
          '</div>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<form-builder-option property="errorLabel"></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="multiple" label="Allow Multiple Resources"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="reference"></form-builder-option>' +
          '<form-builder-option property="addResource"></form-builder-option>' +
          '<form-builder-option property="addResourceLabel" ng-if="component.addResource"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="hidden"></form-builder-option>' +
          '<form-builder-option property="autofocus" type="checkbox" label="Initial Focus" tooltip="Make this field the initially focused element on this form."></form-builder-option>' +
          '<form-builder-option property="dataGridLabel"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      // Create the API markup.
      $templateCache.put('formio/components/resource/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option property="validate.customMessage"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
