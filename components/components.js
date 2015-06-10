app.run([
  '$templateCache',
  function($templateCache) {

    // Create the component markup.
    $templateCache.put('formio/components/settings.html',
      '<form id="component-settings" novalidate>' +
        '<div class="row">' +
          '<div class="col-xs-6">' +
            '<tabset>' +
              '<tab ng-repeat="view in formComponents[component.type].views" heading="{{ view.name }}"><ng-include src="view.template"></ng-include></tab>' +
            '</tabset>' +
          '</div>' +
          '<div class="col-xs-6">' +
            '<div class="panel panel-default">' +
              '<div class="panel-heading">Preview</div>' +
              '<div class="panel-body">' +
                '<formio-component component="component" data="data" formio="formio"></formio-component>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<button type="submit" class="btn btn-success" ng-click="saveSettings()">Save</button>&nbsp;' +
              '<button type="button" class="btn btn-default" ng-click="cancelSettings()">Cancel</button>&nbsp;' +
              '<button type="button" class="btn btn-danger" ng-click="removeComponent(component)">Remove</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</form>'
    );
  }
]);

app.constant('FORM_OPTIONS', {
  actions: [
    {
      name: 'submit',
      title: 'Submit'
    },
    {
      name: 'prevPage',
      title: 'Previous Page'
    },
    {
      name: 'nextPage',
      title: 'Next Page'
    },
    {
      name: 'reset',
      title: 'Reset'
    }
  ],
  themes: [
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
  ],
  sizes: [
    {
      name: 'xs',
      title: 'Extra Small'
    },
    {
      name: 'sm',
      title: 'Small'
    },
    {
      name: 'md',
      title: 'Medium'
    },
    {
      name: 'lg',
      title: 'Large'
    }
  ]
});


/**
* These are component options that can be reused
* with the builder-option directive
* Valid properties: label, placeholder, tooltip, type
*/
app.constant('COMMON_OPTIONS', {
  label: {
    label: 'Label',
    placeholder: 'Field Label',
    tooltip: 'The label for this field that will appear next to it.'
  },
  placeholder: {
    label: 'Placeholder',
    placeholder: 'Placeholder',
    tooltip: 'The placeholder text that will appear when this field is empty.'
  },
  inputMask: {
    label: 'Input Mask',
    placeholder: 'Input Mask',
    tooltip: 'An input mask helps the user with input by ensuring a predefined format.<br><br>9: numeric<br>a: alphabetical<br>*: alphanumeric<br><br>Example telephone number mask: (999) 999-9999'
  },
  tableView: {
    label: 'Table View',
    type: 'checkbox',
    tooltip: 'Shows this value within the table view of the submissions.'
  },
  prefix: {
    label: 'Prefix',
    placeholder: 'example \'$\', \'@\'',
    tooltip: 'The text to show before a field.'
  },
  suffix: {
    label: 'Suffix',
    placeholder: 'example \'$\', \'@\'',
    tooltip: 'The text to show after a field.'
  },
  multiple: {
    label: 'Multiple Values',
    type: 'checkbox',
    tooltip: 'Allows multiple values to be entered for this field.'
  },
  unique: {
    label: 'Unique',
    type: 'checkbox',
    tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.'
  },
  protected: {
    label: 'Protected',
    type: 'checkbox',
    tooltip: 'A protected field will not be returned when queried via API.'
  },
  persistent: {
    label: 'Persistent',
    type: 'checkbox',
    tooltip: 'A persistent field will be stored in database when the form is submitted.'
  },
  block: {
    label: 'Block',
    type: 'checkbox',
    tooltip: 'This control should span the full width of the bounding container.'
  },
  leftIcon: {
    label: 'Left Icon',
    placeholder: 'Enter icon classes',
    tooltip: 'This is the full icon class string to show the icon. Example: "glyphicon glyphicon-search" or "fa fa-plus"'
  },
  rightIcon: {
    label: 'Right Icon',
    placeholder: 'Enter icon classes',
    tooltip: 'This is the full icon class string to show the icon. Example: "glyphicon glyphicon-search" or "fa fa-plus"'
  },
  disableOnInvalid: {
    label: 'Disable on Form Invalid',
    type: 'checkbox',
    tooltip: 'This will disable this field if the form is invalid.'
  },
  'validate.required': {
    label: 'Required',
    type: 'checkbox',
    tooltip: 'A required field must be filled in before the form can be submitted.'
  },
  'validate.minLength': {
    label: 'Minimum Length',
    placeholder: 'Minimum Length',
    type: 'number',
    tooltip: 'The minimum length requirement this field must meet.'
  },
  'validate.maxLength': {
    label: 'Maximum Length',
    placeholder: 'Maximum Length',
    type: 'number',
    tooltip: 'The maximum length requirement this field must meet'
  },
  'validate.pattern': {
    label: 'Regular Expression Pattern',
    placeholder: 'Regular Expression Pattern',
    tooltip: 'The regular expression pattern test that the field value must pass before the form can be submitted.'
  }
});

// Common directives for editing component

/**
* This directive creates a field for tweaking component options.
* This needs at least a property attribute specifying what property
* of the component to bind to.
*
* If the property is defined in COMMON_OPTIONS above, it will automatically
* populate its label, placeholder, input type, and tooltip. If not, you may specify
* those via attributes (except for tooltip, which you can specify with the title attribute).
* The generated input will also carry over any other properties you specify on this directive.
*/
app.directive('formBuilderOption', ['COMMON_OPTIONS', function(COMMON_OPTIONS){
  return {
    restrict: 'E',
    require: 'property',
    priority: 2,
    replace: true,
    template: function(el, attrs) {
      var property = attrs.property;
      var label = attrs.label || (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].label) || '';
      var placeholder = (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].placeholder) || null;
      var type = (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].type) || 'text';
      var tooltip = (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].tooltip) || '';

      var input = angular.element('<input></input>');
      var inputAttrs = {
        id: property,
        name: property,
        type: type,
        'ng-model': 'component.' + property,
        placeholder: placeholder
      };
      // Pass through attributes from the directive to the input element
      angular.forEach(attrs.$attr, function(key) {
        inputAttrs[key] = attrs[key];
        // Allow specifying tooltip via title attr
        if(key.toLowerCase() === 'title') {
          tooltip = attrs[key];
        }
      });
      input.attr(inputAttrs);

      // Checkboxes have a slightly different layout
      if(inputAttrs.type.toLowerCase() === 'checkbox') {
        return '<div class="checkbox">' +
                '<label for="' + property + '" form-builder-tooltip="' + tooltip + '">' +
                input.prop('outerHTML') +
                ' ' + label + '</label>' +
              '</div>';
      }

      input.addClass('form-control');
      return '<div class="form-group">' +
                '<label for="' + property + '" form-builder-tooltip="' + tooltip + '">' + label + '</label>' +
                input.prop('outerHTML') +
              '</div>';
    }
  };
}]);

/**
* A directive for a field to edit a component's key.
* If you want the field to be disabled on when component.lockKey is true,
* specify a `disable-on-lock` attribute.
*/
app.directive('formBuilderOptionKey', function(){
  return {
    restrict: 'E',
    replace: true,
    template: function(el, attrs) {
      var disableOnLock = attrs.disableOnLock || attrs.disableOnLock === '';
      return '<div class="form-group">' +
                '<label for="key" form-builder-tooltip="The name of this field in the API endpoint.">Property Name</label>' +
                '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ' +
                  (disableOnLock ? 'ng-disabled="component.lockKey" ' : 'ng-blur="component.lockKey = true;" ') +
                  'ng-required>' +
              '</div>';
    }
  };
});

/**
* A directive for editing a component's custom validation.
*/
app.directive('formBuilderOptionCustomValidation', function(){
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="panel panel-default">' +
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
              '</div>'
  };
});

/**
* A directive that provides a UI to add {value, label} objects to an array.
*/
app.directive('valueBuilder', function(){
  return {
    scope: {
      data: '=',
      label: '@',
      tooltipText: '@'
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<div class="form-group">' +
                '<label form-builder-tooltip="{{ tooltipText }}">{{ label }}</label>' +
                '<table class="table table-condensed">' +
                  '<thead>' +
                    '<tr>' +
                      '<th class="col-xs-4">Value</th>' +
                      '<th class="col-xs-6">Label</th>' +
                      '<th class="col-xs-2"></th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody>' +
                    '<tr ng-repeat="v in data track by $index">' +
                      '<td class="col-xs-4"><input type="text" class="form-control" ng-model="v.value"/></td>' +
                      '<td class="col-xs-6"><input type="text" class="form-control" ng-model="v.label"/></td>' +
                      '<td class="col-xs-2"><button class="btn btn-danger btn-xs" ng-click="removeValue($index)"><span class="glyphicon glyphicon-remove-circle"></span></button></td>' +
                    '</tr>' +
                  '</tbody>' +
                '</table>' +
                '<button class="btn" ng-click="addValue()">Add Value</button>' +
                '</div>',
    replace: true,
    link: function($scope) {
      $scope.addValue = function() {
        var value = $scope.data.length + 1;
        $scope.data.push({
          value: 'value' + value,
          label: 'Value ' + value
        });
      };
      $scope.removeValue = function(index) {
        $scope.data.splice(index, 1);
      };
    }
  };
});
