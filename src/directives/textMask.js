/**
* A directive for an input mask for default value.
*/
var maskInput = require('vanilla-text-mask').default;
var formioUtils = require('formiojs/utils');
module.exports = function() {
  return {
    restrict: 'A',
    replace: true,
    link: function(scope, element) {
      var input = null;

      if (element[0].tagName === 'INPUT') {
        // `textMask` directive is used directly on an input element
        input = element[0];
      }
      else {
        // `textMask` directive is used on an abstracted input element
        input = element[0].getElementsByTagName('INPUT')[0];
      }

      var maskedElement = null;

      scope.$watch('component.inputMask', function(mask) {
        if (!mask) {
          return;
        }

        var inputMask = formioUtils.getInputMask(mask);
        // var defaultValue = scope.component.defaultValue;

        if (maskedElement) {
          maskedElement.destroy();
        }

        maskedElement = maskInput({
          inputElement: input,
          mask: inputMask,
          showMask: true,
          keepCharPositions: false,
          guide: true,
          placeholderChar: '_'
        });
      });
    }
  };
};
