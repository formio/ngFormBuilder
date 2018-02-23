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
module.exports = ['COMMON_OPTIONS', '$filter', function(COMMON_OPTIONS, $filter) {
  return {
    restrict: 'E',
    require: 'property',
    priority: 2,
    replace: true,
    template: function(el, attrs) {
      var formioTranslate = $filter('formioTranslate');

      var property = attrs.property;
      var label = attrs.label || (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].label);
      var placeholder = attrs.placeholder || (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].placeholder) || null;
      var type = attrs.type || (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].type) || 'text';
      var tooltip = attrs.tooltip || (COMMON_OPTIONS[property] && COMMON_OPTIONS[property].tooltip) || '';

      var input = type === 'textarea' ? angular.element('<textarea></textarea>') : angular.element('<input>');

      var inputAttrs = {
        id: property,
        name: property,
        type: type,
        'ng-model': 'component.' + property,
        placeholder: formioTranslate(placeholder)
      };
      // Pass through attributes from the directive to the input element
      angular.forEach(attrs.$attr, function(key) {
        inputAttrs[key] = attrs[attrs.$normalize(key)];
        // Allow specifying tooltip via title attr
        if (key.toLowerCase() === 'title') {
          tooltip = attrs[key];
        }
      });

      if(property === 'label') {
        inputAttrs['label-validator'] = "";
        inputAttrs.required = "";
      }
      // Add min/max value floor values for validation.
      if (property === 'validate.minLength' || property === 'validate.maxLength') {
        inputAttrs.min = 0;
      }

      input.attr(inputAttrs);

      // Checkboxes have a slightly different layout
      if (inputAttrs.type && inputAttrs.type.toLowerCase() === 'checkbox') {
        return '<div class="checkbox">' +
                '<label for="' + property + '" form-builder-tooltip="' + formioTranslate(tooltip) + '">' +
                input.prop('outerHTML') +
                ' ' + formioTranslate(label) + '</label>' +
              '</div>';
      }

      var helpMessage = '';
      switch (property) {
        case 'label':
          helpMessage = '<span class="help-block" ng-if="!component.label">You must provide a label for this component.</span>';
          break;
        default:
          break;
      }

      input.addClass('form-control');
      return '<div class="form-group">' +
                '<label class="control-label" for="' + property + '" form-builder-tooltip="' + formioTranslate(tooltip) + '">' + formioTranslate(label) + '</label><div class="input-group">' +
                input.prop('outerHTML') +
                helpMessage +
              '</div></div>';
    }
  };
}];
