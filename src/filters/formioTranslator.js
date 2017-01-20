module.exports = ['$injector', 'formioTranslator', function($injector, formioTranslator) {
  return function (input) {
    return formioTranslator(input);
  };
}];
