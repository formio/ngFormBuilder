var app = angular.module('formio.components');
app.config(function(formioComponentsProvider) {
  formioComponentsProvider.register('number', {
    views: [
      {
        name: 'Display',
        template: 'formio/components/number/display.html'
      },
      {
        name: 'Validation',
        template: 'formio/components/number/validate.html'
      },
      {
        name: 'API',
        template: 'formio/components/textfield/api.html'
      }
    ]
  });
});

app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/number/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Increment (Step)</label>' +
          '<input type="text" class="form-control" id="step" name="step" ng-model="component.validate.step" placeholder="Enter how much to increment per step (or precision)." value="{{ component.validate.step }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="prefix">Prefix</label>' +
          '<input type="text" class="form-control" id="prefix" name="prefix" ng-model="component.prefix" placeholder="example \'$\', \'@\'" value="{{ component.prefix }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="suffix">Suffix</label>' +
          '<input type="text" class="form-control" id="suffix" name="suffix" ng-model="component.suffix" placeholder="example \'%\', \'#\'" value="{{ component.suffix }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="multiple" name="multiple" ng-model="component.multiple" ng-checked="component.multiple"> Multiple Values' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/number/validate.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="required" name="required" ng-model="component.validate.required" ng-checked="component.validate.required"> Required' +
          '</label>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Minimum Value</label>' +
          '<input type="number" class="form-control" id="min" name="min" ng-model="component.validate.min" placeholder="Minimum Value" value="{{ component.validate.min }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Maximum Value</label>' +
          '<input type="number" class="form-control" id="max" name="max" ng-model="component.validate.max" placeholder="Maximum Value" value="{{ component.validate.max }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Greater Than</label>' +
          '<input type="number" class="form-control" id="greater" name="greater" ng-model="component.validate.greater" placeholder="Greater Than" value="{{ component.validate.greater }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Less Than</label>' +
          '<input type="number" class="form-control" id="less" name="less" ng-model="component.validate.less" placeholder="Less Than" value="{{ component.validate.less }}">' +
        '</div>' +
        '<div class="panel panel-default">' +
          '<div class="panel-heading"><a class="panel-title" ng-click="customCollapsed = !customCollapsed">Custom Validation</a></div>' +
          '<div class="panel-body" collapse="customCollapsed" ng-init="customCollapsed = true;">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';">{{ component.validate.custom }}</textarea>' +
            '<small><p>Enter custom validation code.</p>' +
            '<p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
            '<p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p></small>' +
          '</div>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);

