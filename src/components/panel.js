module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    'FORM_OPTIONS',
    function(
      formioComponentsProvider,
      FORM_OPTIONS
    ) {
      formioComponentsProvider.register('panel', {
        fbtemplate: 'formio/formbuilder/panel.html',
        icon: 'fa fa-list-alt',
        onEdit: ['$scope', function($scope) {
          $scope.themes = FORM_OPTIONS.themes;
          if (!$scope.component.breadcrumb) {
            $scope.component.breadcrumb = 'default';
          }
          $scope.breadcrumbs = [
            {
              name: 'default',
              title: 'Yes'
            },
            {
              name: 'none',
              title: 'No'
            }
          ];
        }],
        views: [
          {
            name: 'Display',
            template: 'formio/components/panel/display.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
          },
          {
            name: 'API',
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/panel/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#panels',
        noDndOverlay: true,
        confirmRemove: true
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/panel.html',
        '<div class="panel panel-{{ component.theme }}">' +
          '<div ng-if="component.title" class="panel-heading"><h3 class="panel-title">' +
            '{{ component.title }} ' +
            '<formio-component-tooltip></formio-component-tooltip>' +
          '</h3></div>' +
          '<div class="panel-body">' +
            '<form-builder-list component="component" form="form" options="options" formio="::formio"></form-builder-list>' +
          '</div>' +
        '</div>'
      );

      // Create the settings markup.
      $templateCache.put('formio/components/panel/display.html',
        '<ng-form>' +
          '<form-builder-option property="title" label="Title" placeholder="Panel Title" title="The title text that appears in the header of this panel."></form-builder-option>' +
          '<form-builder-option property="tooltip"></form-builder-option>' +
          '<div class="form-group">' +
            '<label for="theme" form-builder-tooltip="The color theme of this panel.">{{\'Theme\' | formioTranslate}}</label>' +
            '<select class="form-control" id="theme" name="theme" ng-options="theme.name as theme.title | formioTranslate for theme in themes" ng-model="component.theme"></select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="breadcrumb" form-builder-tooltip="The breadcrumb to show with this page.">Show Breadcrumb</label>' +
            '<select class="form-control" id="breadcrumb" name="breadcrumb" ng-options="breadcrumb.name as breadcrumb.title for breadcrumb in breadcrumbs" ng-model="component.breadcrumb"></select>' +
          '</div>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/panel/conditional.html',
        '<form-builder-conditional></form-builder-conditional>' +
        '<uib-accordion>' +
          '<div uib-accordion-group heading="Advanced Next Page" class="panel panel-default">' +
            '<formio-script-editor rows="5" id="custom" name="custom" ng-model="component.nextPage" placeholder="/*** Example Code ***/\nnext = (data[\'mykey\'] > 1) ? \'pageA\' : \'pageB\';"></formio-script-editor>' +
            '<small>' +
              '<p>Enter custom conditional code.</p>' +
              '<p>You must assign the <strong>next</strong> variable with the API key of the next page.</p>' +
              '<p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
            '</small>' +
          '</div>' +
          '<div uib-accordion-group heading="JSON Next Page" class="panel panel-default">' +
            '<small>' +
              '<p>Execute custom next page with JSON and <a href="http://jsonlogic.com/">JsonLogic</a>.</p>' +
              '<p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
              '<p><a href="http://formio.github.io/formio.js/app/examples/multiform.html" target="_blank">Click here for an example</a></p>' +
            '</small>' +
            '<textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.nextPage" placeholder="{ ... }"></textarea>' +
          '</div>' +
        '</uib-accordion>'
      );
    }
  ]);
};
