module.exports = function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {

      scope.$watch('component.label', function () {
        if(ctrl.$invalid) {
          element[0].parentNode.classList.add('has-error');
          ctrl.$validate();
        }
        else {
          element[0].parentNode.classList.remove('has-error');
          ctrl.$validate();
        }
      }, true);

    }
  };
}
