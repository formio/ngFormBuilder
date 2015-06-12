app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('radio', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/radio/display.html',
          controller: [
            '$scope',
            function($scope) {
              $scope.addValue = function() {
                var value = $scope.component.values.length + 1;
                $scope.component.values.push({
                  value: 'value' + value,
                  label: 'Value ' + value
                });
              };
              $scope.removeValue = function(index) {
                $scope.component.values.splice(index, 1);
              };
            }
          ]
        },
        {
          name: 'Validation',
          template: 'formio/components/radio/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/radio/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/radio/display.html',
      '<ng-form ng-controller="view.controller">' +
        '<form-builder-option property="label"></form-builder-option>' +
        '<div class="form-group">' +
          '<label for="" form-builder-tooltip="The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form.">Values</label>' +
          '<table class="table table-condensed">' +
            '<thead>' +
              '<tr>' +
                '<th class="col-xs-4">Value</th>' +
                '<th class="col-xs-6">Label</th>' +
                '<th class="col-xs-2"></th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>' +
              '<tr ng-repeat="v in component.values track by $index">' +
                '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v.value"/></td>' +
                '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v.label"/></td>' +
                '<td class="col-xs-2"><button class="btn btn-danger btn-xs" ng-click="removeValue($index)"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
          '<button class="btn" ng-click="addValue()">Add Value</button>' +
        '</div>' +
        '<form-builder-option property="protected"></form-builder-option>' +
        '<form-builder-option property="persistent"></form-builder-option>' +
        '<form-builder-option property="tableView"></form-builder-option>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/radio/api.html',
      '<ng-form>' +
        '<form-builder-option-key></form-builder-option-key>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/radio/validate.html',
      '<ng-form>' +
        '<form-builder-option property="validate.required"></form-builder-option>' +
        '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
      '</ng-form>'
    );
  }
]);
