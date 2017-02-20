/*! ng-formio-builder v<%=version%> | https://unpkg.com/ng-formio-builder@<%=version%>/LICENSE.txt */
/*global window: false, console: false */
/*jshint browser: true */
var fs = require('fs');

var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ckeditor'
]);

app.constant('FORM_OPTIONS', require('./constants/formOptions'));

app.constant('COMMON_OPTIONS', require('./constants/commonOptions'));

app.factory('debounce', require('./factories/debounce'));

app.directive('formBuilder', require('./directives/formBuilder'));

app.directive('formBuilderComponent', require('./directives/formBuilderComponent'));

app.directive('formBuilderElement', require('./directives/formBuilderElement'));

app.controller('formBuilderDnd', require('./directives/formBuilderDnd'));

app.directive('formBuilderList', require('./directives/formBuilderList'));

app.directive('formBuilderRow', require('./directives/formBuilderRow'));

app.directive('jsonInput', require('./directives/jsonInput'));

app.directive('formBuilderOption', require('./directives/formBuilderOption'));

app.directive('formBuilderTable', require('./directives/formBuilderTable'));

app.directive('formBuilderOptionKey', require('./directives/formBuilderOptionKey'));

app.directive('formBuilderOptionTags', require('./directives/formBuilderOptionTags'));

app.directive('validApiKey', require('./directives/validApiKey'));

app.directive('formBuilderOptionCustomValidation', require('./directives/formBuilderOptionCustomValidation'));

app.directive('formBuilderTooltip', require('./directives/formBuilderTooltip'));

app.directive('valueBuilder', require('./directives/valueBuilder'));

app.directive('formBuilderConditional', require('./directives/formBuilderConditional'));

/**
 * This workaround handles the fact that iframes capture mouse drag
 * events. This interferes with dragging over components like the
 * Content component. As a workaround, we keep track of the isDragging
 * flag here to overlay iframes with a div while dragging.
 */
app.value('dndDragIframeWorkaround', {
  isDragging: false
});

app.run([
  '$templateCache',
  '$rootScope',
  'ngDialog',
  function($templateCache, $rootScope, ngDialog) {
    // Close all open dialogs on state change.
    $rootScope.$on('$stateChangeStart', function() {
      ngDialog.closeAll(false);
    });

    $templateCache.put('formio/formbuilder/editbuttons.html',
      fs.readFileSync(__dirname + '/templates/editbuttons.html', 'utf8')
    );

    $templateCache.put('formio/formbuilder/component.html',
      fs.readFileSync(__dirname + '/templates/component.html', 'utf8')
    );

    $templateCache.put('formio/formbuilder/list.html',
      fs.readFileSync(__dirname + '/templates/list.html', 'utf8')
    );

    $templateCache.put('formio/formbuilder/row.html',
      fs.readFileSync(__dirname + '/templates/row.html', 'utf8')
    );

    $templateCache.put('formio/formbuilder/builder.html',
      fs.readFileSync(__dirname + '/templates/builder.html', 'utf8')
    );

    $templateCache.put('formio/formbuilder/datagrid.html',
      fs.readFileSync(__dirname + '/templates/datagrid.html', 'utf8')
    );

    $templateCache.put('formio/components/confirm-remove.html',
      fs.readFileSync(__dirname + '/templates/confirm-remove.html', 'utf8')
    );
  }
]);

require('./components');
