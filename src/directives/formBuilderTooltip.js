/**
* Invokes Bootstrap's popover jquery plugin on an element
* Tooltip text can be provided via title attribute or
* as the value for this directive.
*/
module.exports = ['$filter', function($filter) {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, el, attrs) {
      var formioTranslate = $filter('formioTranslate');

      if (attrs.formBuilderTooltip || attrs.title) {
        var tooltip = angular.element('<i class="glyphicon glyphicon-question-sign text-muted"></i>');
        tooltip.popover({
          html: true,
          trigger: 'manual',
          placement: 'right',
          content: formioTranslate(attrs.title || attrs.formBuilderTooltip)
        }).on('mouseenter', function() {
          var $self = angular.element(this);
          $self.popover('show');
          $self.siblings('.popover').on('mouseleave', function() {
            $self.popover('hide');
          });
        }).on('mouseleave', function() {
          var $self = angular.element(this);
          setTimeout(function() {
            if (!angular.element('.popover:hover').length) {
              $self.popover('hide');
            }
          }, 100);
        });
        el.append(' ').append(tooltip);
      }
    }
  };
}];
