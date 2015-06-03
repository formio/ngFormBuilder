app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('panel', {
      fbtemplate: 'formio/formbuilder/panel.html',
      onEdit: function($scope) {
        $scope.themes = [
          {
            name: 'default',
            title: 'Default'
          },
          {
            name: 'primary',
            title: 'Primary'
          },
          {
            name: 'info',
            title: 'Info'
          },
          {
            name: 'success',
            title: 'Succeess'
          },
          {
            name: 'danger',
            title: 'Danger'
          },
          {
            name: 'warning',
            title: 'Warning'
          }
        ];
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/panel/display.html'
        }
      ]
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
          '<form-builder-list></form-builder-list>' +
        '</div>' +
      '</div>'
    );

    // Create the settings markup.
    $templateCache.put('formio/components/panel/display.html',
      '<ng-form>' +
        '<form-builder-option property="title" label="Title" placeholder="Panel Title"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="placeholder">Theme</label>' +
          '<select class="form-control" id="theme" name="theme" ng-options="theme.name as theme.title for theme in themes" ng-model="component.theme"></select>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
