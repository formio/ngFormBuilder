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
            template: 'formio/components/common/conditional.html'
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
          '<div ng-if="component.title" class="panel-heading"><h3 class="panel-title">{{ component.title }}</h3></div>' +
          '<div class="panel-body">' +
            '<form-builder-list component="component" form="form" formio="::formio"></form-builder-list>' +
          '</div>' +
        '</div>'
      );

      // Create the settings markup.
      $templateCache.put('formio/components/panel/display.html',
        '<ng-form>' +
          '<form-builder-option property="title" label="Title" placeholder="Panel Title" title="The title text that appears in the header of this panel."></form-builder-option>' +
          '<div class="form-group">' +
            '<label for="theme" form-builder-tooltip="The color theme of this panel.">Theme</label>' +
            '<select class="form-control" id="theme" name="theme" ng-options="theme.name as theme.title for theme in themes" ng-model="component.theme"></select>' +
          '</div>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
