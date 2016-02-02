module.exports = function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) {
      ctrl.$parsers.push(function(input) {
        try {
          var obj = JSON.parse(input);
          ctrl.$setValidity('jsonInput', true);
          return obj;
        }
        catch (e) {
          ctrl.$setValidity('jsonInput', false);
          return undefined;
        }
      });
      ctrl.$formatters.push(function(data) {
        if (data === null) {
          ctrl.$setValidity('jsonInput', false);
          return '';
        }
        try {
          var str = angular.toJson(data, true);
          ctrl.$setValidity('jsonInput', true);
          return str;
        }
        catch (e) {
          ctrl.$setValidity('jsonInput', false);
          return '';
        }
      });
    }
  };
};
