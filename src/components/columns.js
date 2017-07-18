module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('columns', {
        onEdit: ['$scope', function($scope) {
          $scope.removeColumn = function(index) {
            $scope.component.columns.splice(index, 1);
          };
          $scope.addColumn = function() {
            $scope.component.columns.push({components: [], width: 1, offset: 0, push: 0, pull: 0});
          };
        }],
        fbtemplate: 'formio/formbuilder/columns.html',
        icon: 'fa fa-columns',
        documentation: 'http://help.form.io/userguide/#columns',
        noDndOverlay: true,
        confirmRemove: true,
        views: [
          {
            name: 'Display',
            template: 'formio/components/columns/display.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ]
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/columns.html',
        '<div class="row">' +
          '<div class="col-xs-{{column.width || 6}} col-xs-offset-{{column.offset}} col-xs-push-{{column.push}} col-xs-pull-{{column.pull}}" component-form-group" ng-repeat="column in component.columns">' +
            '<form-builder-list class="formio-column" parent="component" component="column" form="form" options="options" formio="::formio"></form-builder-list>' +
          '</div>' +
        '</div>'
      );
      $templateCache.put('formio/components/columns/display.html',
        '<ng-form>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<div class="form-group">' +
            '<label form-builder-tooltip="The width, offset, push and pull settings for the columns">{{\'Column Properties\' | formioTranslate}}</label>' +
            '<table class="table table-condensed">' +
              '<thead>' +
                '<tr>' +
                  '<th class="col-xs-2">{{\'Column\' | formioTranslate}}</th>' +
                  '<th class="col-xs-2">{{\'Width\' | formioTranslate}}</th>' +
                  '<th class="col-xs-2">{{\'Offset\' | formioTranslate}}</th>' +
                  '<th class="col-xs-2">{{\'Push\' | formioTranslate}}</th>' +
                  '<th class="col-xs-2">{{\'Pull\' | formioTranslate}}</th>' +
                  '<th class="col-xs-1"></th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                '<tr ng-repeat="column in component.columns track by $index">' +
                  '<td class="col-xs-2"><input type="number" class="form-control" ng-value="$index + 1" disabled/></td>' +
                  '<td class="col-xs-2"><input type="number" class="form-control" min="1" max="12" ng-model="column.width"/></td>' +
                  '<td class="col-xs-2"><input type="number" class="form-control" min="0" max="12" ng-model="column.offset"/></td>' +
                  '<td class="col-xs-2"><input type="number" class="form-control" min="0" max="12" ng-model="column.push"/></td>' +
                  '<td class="col-xs-2"><input type="number" class="form-control" min="0" max="12" ng-model="column.pull"/></td>' +
                  '<td class="col-xs-1"><button type="button" class="btn btn-danger btn-xs" ng-click="removeColumn($index)" tabindex="-1"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                '</tr>' +
              '</tbody>' +
            '</table>' +
            '<button type="button" class="btn" ng-click="addColumn()">{{\'Add Column\' | formioTranslate}}</button>' +
          '</div>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
