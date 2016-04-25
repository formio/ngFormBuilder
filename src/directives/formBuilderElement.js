module.exports = [
  '$compile',
  '$templateCache',
  function(
    $compile,
    $templateCache
  ) {
    return {
      scope: false,
      link: function(scope, element) {
        var template = scope.fbtemplate ? scope.fbtemplate : scope.template;
        element.replaceWith($compile($templateCache.get(template))(scope));
        scope.$emit('formElementRender', element);
      }
    };
  }
];
