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


/**
* These are component options that can be reused
* with the builder-option directive
* Valid properties: label, placeholder, type
*/
app.constant('COMMON_OPTIONS', {
  'label': {
    'label': 'Label',
    'placeholder': 'Field Label'
  },
  'placeholder': {
    'label': 'Placeholder',
    'placeholder': 'Placeholder'
  },
  'inputMask': {
    'label': 'Input Mask',
    'placeholder': 'Input Mask'
  },
  'prefix': {
    'label': 'Prefix',
    'placeholder': 'example \'$\', \'@\''
  },
  'suffix': {
    'label': 'Suffix',
    'placeholder': 'example \'$\', \'@\''
  },
  'multiple': {
    'label': 'Multiple Values',
    'type': 'checkbox'
  },
  'unique': {
    'label': 'Unique',
    'type': 'checkbox'
  },
  'protected': {
    'label': 'Protected',
    'type': 'checkbox'
  },
  'persistent': {
    'label': 'Persistent',
    'type': 'checkbox'
  },
  'key': {
    'label': 'Property Name'
  },
  'validate.required': {
    'label': 'Required',
    'type': 'checkbox'
  },
  'validate.minLength': {
    'label': 'Minimum Length',
    'placeholder': 'Minimum Length',
    'type': 'number'
  },
  'validate.maxLength': {
    'label': 'Maximum Length',
    'placeholder': 'Maximum Length',
    'type': 'number'
  },
  'validate.pattern': {
    'label': 'Regular Expression Pattern',
    'placeholder': 'Regular Expression Pattern',

  }
});

/**
* This directive creates a field for tweaking component options.
* This needs at least a property attribute specifying what property
* of the component to bind to.
*
* If the property is defined in COMMON_OPTIONS above, it will automatically
* populate its label, placeholder, and input type. If not, you may specify
* those via attributes. The generated input will also carry over any other
* properties you specify on this directive.
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
      });
      input.attr(inputAttrs);

      console.log("generating templ");

      // Checkboxes have a slightly different layout
      if(inputAttrs.type.toLowerCase() === 'checkbox') {
        return '<div class="checkbox">' +
                '<label for="label" >' +
                input.prop('outerHTML') +
                ' ' + label + '</label>' +
              '</div>';  
      }

      input.addClass('form-control');
      return '<div class="form-group">' +
                '<label for="label" >' + label + '</label>' +
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
                '<label for="key">Property Name</label>' +
                '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ' +
                  (disableOnLock ? 'ng-disabled="component.lockKey" ' : 'ng-blur="component.lockKey = true;" ') +
                  'ng-required>' +
              '</div>';
    }
  };
});

// TODO: custom validation directive