var radioController = function($scope) {
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
};
radioController.$inject = ['$scope'];

app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('radio', {
      views: [
        {
          name: 'Display',
          template: 'formio/components/radio/display.html',
          controller: radioController
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
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="">Values</label>' +
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
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.protected" ng-checked="component.protected"> Protected' +
          '</label>' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="persistent" name="persistent" ng-model="component.persistent" ng-checked="component.persistent"> Persistent' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/radio/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-blur="component.lockKey = true;" ng-required>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/radio/validate.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="required" name="required" ng-model="component.validate.required" ng-checked="component.validate.required"> Required' +
          '</label>' +
        '</div>' +
        '<div class="panel panel-default">' +
          '<div class="panel-heading"><a class="panel-title" ng-click="customCollapsed = !customCollapsed">Custom Validation</a></div>' +
          '<div class="panel-body" collapse="customCollapsed" ng-init="customCollapsed = true;">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';">{{ component.validate.custom }}</textarea>' +
            '<small><p>Enter custom validation code.</p>' +
            '<p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
            '<p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p></small>' +
            '<div class="well">' +
              '<div class="checkbox">' +
                '<label>' +
                  '<input type="checkbox" id="private" name="private" ng-model="component.validate.customPrivate" ng-checked="component.validate.customPrivate"> <strong>Secret Validation</strong>' +
                '</label>' +
              '</div>' +
              '<p>Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
