module.exports = ['$injector', 'formioTranslate', function($injector, formioTranslate) {
  return function (input) {
    return formioTranslate(input);
  };
}];
