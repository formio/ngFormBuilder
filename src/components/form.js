module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('form', {
        fbtemplate: 'formio/formbuilder/form.html',
        icon: 'fa fa-wpforms',
        views: [
          {
            name: 'Display',
            template: 'formio/components/form/display.html'
          },
          {
            name: 'Data',
            template: 'formio/components/common/data.html'
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
        documentation: 'http://help.form.io/userguide/#form',
        onEdit: ['$scope', function($scope) {
          $scope.forms = [];
          $scope.component.project = $scope.formio.projectId;
          $scope.formio.loadForms({params: {
            limit: 4294967295,
            select: '_id,title,type'
          }}).then(function(forms) {
            var data = [];
            if ($scope.form._id) {
              angular.forEach(forms, function(form) {
                if (form._id !== $scope.form._id) {
                  data.push(form);
                }
              });
              $scope.forms = data;
            }
            else {
              $scope.forms = forms;
            }

            if (!$scope.component.form) {
              $scope.component.form = forms[0]._id;
            }
          });
        }]
      });

      // Override the controller for form building.
      var formComponent = formioComponentsProvider.$get().components.form;
      var formController = formComponent.controller;
      formComponent.controller = [
        '$scope',
        '$controller',
        function(
          $scope,
          $controller
        ) {
          if (!$scope.builder) {
            return $controller(formController, {$scope: $scope});
          }

          var forms = {};
          $scope.form = {title: 'Unknown form'};
          $scope.formio.loadForms({params: {
            limit: 4294967295,
            select: '_id,title,type'
          }}).then(function(formioForms) {
            angular.forEach(formioForms, function(form) {
              forms[form._id] = form;
            });

            if (
              $scope.component.form &&
              ($scope.form._id !== $scope.component.form) &&
              forms.hasOwnProperty($scope.component.form)
            ) {
              $scope.form = forms[$scope.component.form];
            }
          });

          $scope.$watch('component.form', function(formId) {
            if (!formId || !forms.hasOwnProperty(formId)) {
              return;
            }
            $scope.form = forms[formId];
          });
        }
      ];
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      $templateCache.put('formio/formbuilder/form.html', '<span class="hidden-element-text">{{ form.title }} {{ form.type }}</span>');

      // Create the settings markup.
      $templateCache.put('formio/components/form/display.html',
        '<ng-form>' +
          '<form-builder-option property="label" label="Name" placeholder="Enter the name for this form field" title="The name for this field. It is only used for administrative purposes such as generating the automatic property name in the API tab (which may be changed manually)."></form-builder-option>' +
          '<form-builder-option property="hideLabel"></form-builder-option>' +
          '<form-builder-option-label-position></form-builder-option-label-position>' +
          '<div class="form-group">' +
            '<label for="form" form-builder-tooltip="The form to load within this form component..">{{\'Form\' | formioTranslate}}</label>' +
            '<select class="form-control" id="form" name="form" ng-options="value._id as value.title for value in forms" ng-model="component.form"></select>' +
          '</div>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="reference"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="encrypted" class="form-builder-premium"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );
    }
  ]);
};
