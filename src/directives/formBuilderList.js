module.exports = [
  function() {
    return {
      scope: {
        component: '=',
        formio: '=',
        form: '=',
        parent: '=?',
        // # of items needed in the list before hiding the
        // drag and drop prompt div
        hideDndBoxCount: '=',
        rootList: '=',
        options: '=',
        data:'=?'
      },
      restrict: 'E',
      replace: true,
      controller: 'formBuilderDnd',
      templateUrl: 'formio/formbuilder/list.html'
    };
  }
];
