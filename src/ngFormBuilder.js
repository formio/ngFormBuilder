/*! ng-formio-builder v<%=version%> | https://unpkg.com/ng-formio-builder@<%=version%>/LICENSE.txt */
/*global window: false, console: false, jQuery: false */
/*jshint browser: true */
var fs = require('fs');
var utils = require('formiojs/utils').default;

var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ui.bootstrap.tooltip',
  'ckeditor'
]);

app.constant('FORM_OPTIONS', require('./constants/formOptions'));

app.constant('COMMON_OPTIONS', require('./constants/commonOptions'));

app.factory('debounce', require('./factories/debounce'));

app.directive('formBuilderDraggable', function() {
  return {
    restrict: 'A',
    scope: {
      'formBuilderDraggable': '='
    },
    link: function(scope, element) {
      var el = element[0];
      el.draggable = true;
      var formBuilder = null;
      var dropZone = null;

      // Drag over event handler.
      var dragOver = function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        return false;
      };

      // Drag end event handler.
      var dragEnd = function() {
        jQuery(dropZone).removeClass('enabled');
        dropZone.removeEventListener('dragover', dragOver, false);
        dropZone.removeEventListener('drop', dragDrop, false);
      };

      // Drag drop event handler.
      var dragDrop = function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        var dropOffset = jQuery(dropZone).offset();
        var dragData = angular.copy(scope.formBuilderDraggable);
        dragData.fbDropX = event.pageX - dropOffset.left;
        dragData.fbDropY = event.pageY - dropOffset.top;
        angular.element(dropZone).scope().$emit('fbDragDrop', dragData);
        dragEnd();
        return false;
      };

      el.addEventListener('dragstart', function(event) {
        event.stopPropagation();
        event.dataTransfer.setData('text', 'true');
        if (!dropZone) {
          dropZone = document.getElementById('fb-drop-zone');
        }
        if (!dropZone) {
          return console.warn('Cannot find fb-drop-zone');
        }
        if (!formBuilder) {
          formBuilder = document.getElementById('fb-pdf-builder');
        }
        if (!formBuilder) {
          return console.warn('Cannot find fb-pdf-builder');
        }

        var builderRect = utils.getElementRect(formBuilder);
        dropZone.style.width = builderRect && builderRect.width ? builderRect.width + 'px' : '100%';
        dropZone.style.height = builderRect && builderRect.height ? builderRect.height + 'px' : '1000px';
        jQuery(dropZone).addClass('enabled');
        dropZone.addEventListener('dragover', dragOver, false);
        dropZone.addEventListener('drop', dragDrop, false);
        return false;
      }, false);
      el.addEventListener('dragend', function(event) {
        dragEnd();
        return false;
      }, false);
    }
  };
});

app.factory('BuilderUtils', require('./factories/BuilderUtils'));

app.directive('formBuilder', require('./directives/formBuilder'));

app.directive('formBuilderComponent', require('./directives/formBuilderComponent'));

app.directive('formBuilderElement', require('./directives/formBuilderElement'));

app.controller('formBuilderDnd', require('./directives/formBuilderDnd'));

app.directive('formBuilderList', require('./directives/formBuilderList'));

app.directive('formBuilderRow', require('./directives/formBuilderRow'));

app.directive('jsonInput', require('./directives/jsonInput'));

app.directive('formBuilderOption', require('./directives/formBuilderOption'));

app.directive('labelValidator', require('./directives/labelValidator'));

app.directive('formBuilderTable', require('./directives/formBuilderTable'));

app.directive('formBuilderOptionInputFormat', require('./directives/formBuilderOptionInputFormat'));

app.directive('formBuilderOptionInputsLabelPosition', require('./directives/formBuilderOptionInputsLabelPosition'));

app.directive('formBuilderOptionKey', require('./directives/formBuilderOptionKey'));

app.directive('formBuilderOptionLabelPosition', require('./directives/formBuilderOptionLabelPosition'));

app.directive('formBuilderOptionOptionsLabelPosition', require('./directives/formBuilderOptionOptionsLabelPosition'));

app.directive('formBuilderOptionShortcut', require('./directives/formBuilderOptionShortcut'));

app.directive('formBuilderOptionTags', require('./directives/formBuilderOptionTags'));

app.directive('textMask', require('./directives/textMask'));

app.directive('validApiKey', require('./directives/validApiKey'));

app.directive('formBuilderOptionCustomValidation', require('./directives/formBuilderOptionCustomValidation'));

app.directive('formBuilderTooltip', require('./directives/formBuilderTooltip'));

app.directive('valueBuilder', require('./directives/valueBuilder'));

app.directive('headersBuilder', require('./directives/headersBuilder'));

app.directive('valueBuilderWithShortcuts', require('./directives/valueBuilderWithShortcuts'));

app.directive('objectBuilder', require('./directives/objectBuilder'));

app.directive('formBuilderConditional', require('./directives/formBuilderConditional'));

app.directive('multiMaskInput', require('./directives/multiMaskInput'));

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
  function(
    $templateCache,
    $rootScope,
    ngDialog
  ) {
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
