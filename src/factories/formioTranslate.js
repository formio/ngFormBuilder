// Create an AngularJS service called formioTranslate
module.exports = ['$injector', function($injector) {
  var $translate, gettextCatalog;
  if($injector.has('$translate')) {
    $translate = $injector.get('$translate');
  }
  if($injector.has('gettextCatalog')) {
    gettextCatalog = $injector.get('gettextCatalog');
  }
  return function (input) {
    if($translate) {
      return $translate(input).promise;
    } else if (gettextCatalog) {
      return gettextCatalog.getString(input);
    } else {
      return input;
    }
  };
}];
