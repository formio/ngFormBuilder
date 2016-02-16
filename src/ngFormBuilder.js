/*global window: false, console: false */
/*jshint browser: true */
var app = angular.module('ngFormBuilder', [
  'formio',
  'dndLists',
  'ngDialog',
  'ui.bootstrap.accordion',
  'ngCkeditor'
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
      '<div class="component-btn-group">' +
        '<div class="btn btn-xxs btn-danger component-settings-button" style="z-index: 1000" ng-click="removeComponent(component, formComponent.confirmRemove)"><span class="glyphicon glyphicon-remove"></span></div>' +
        '<div class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000"><span class="glyphicon glyphicon glyphicon-move"></span></div>' +
        '<div ng-if="formComponent.views" class="btn btn-xxs btn-default component-settings-button" style="z-index: 1000" ng-click="editComponent(component)"><span class="glyphicon glyphicon-cog"></span></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/component.html',
      '<div class="component-form-group component-type-{{ component.type }} form-builder-component">' +
        '<div ng-include="\'formio/formbuilder/editbuttons.html\'"></div>' +
        '<div class="form-group has-feedback form-field-type-{{ component.type }} {{component.customClass}}" id="form-group-{{ component.key }}" style="position:inherit" ng-style="component.style"><form-builder-element></form-builder-element></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/list.html',
      '<ul class="component-list" ' +
        'dnd-list="component.components"' +
        'dnd-drop="addComponent(item)">' +
        '<li ng-if="component.components.length < hideCount">' +
          '<div class="alert alert-info" style="text-align:center; margin-bottom: 5px;" role="alert">' +
            'Drag and Drop a form component' +
          '</div>' +
        '</li>' +
        '<li ng-repeat="component in component.components" ' +
          'dnd-draggable="component" ' +
          'dnd-effect-allowed="move" ' +
          'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
          'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
          'dnd-moved="removeComponent(component, false)">' +
          '<form-builder-component></form-builder-component>' +
          // Fix for problematic components that are difficult to drag over
          // This is either because of iframes or issue #126 in angular-drag-and-drop-lists
          '<div ng-if="dndDragIframeWorkaround.isDragging && !formComponent.noDndOverlay" class="dndOverlay"></div>' +
        '</li>' +
      '</ul>'
    );

    $templateCache.put('formio/formbuilder/row.html',
      '<div class="formbuilder-row">' +
      '<label ng-if="component.label" class="control-label">{{ component.label }}</label>' +
      '<ul class="component-row formbuilder-group" ' +
        'dnd-list="component.components"' +
        'dnd-drop="addComponent(item)"' +
        'dnd-horizontal-list="true">' +
        '<li ng-repeat="component in component.components" ' +
          'class="formbuilder-group-row pull-left" ' +
          'dnd-draggable="component" ' +
          'dnd-effect-allowed="move" ' +
          'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
          'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
          'dnd-moved="removeComponent(component, false)">' +
          '<form-builder-component></form-builder-component>' +
            // Fix for problematic components that are difficult to drag over
            // This is either because of iframes or issue #126 in angular-drag-and-drop-lists
          '<div ng-if="dndDragIframeWorkaround.isDragging && !formComponent.noDndOverlay" class="dndOverlay"></div>' +
        '</li>' +
        '<li class="formbuilder-group-row form-builder-drop" ng-if="component.components.length < hideCount">' +
          '<div class="alert alert-info" role="alert">' +
            'Drag and Drop a form component' +
          '</div>' +
        '</li>' +
      '</ul>' +
      '<div style="clear:both;"></div>' +
      '</div>'
    );

    $templateCache.put('formio/formbuilder/builder.html',
      '<div class="row">' +
        '<div class="col-sm-2 formcomponents">' +
          '<uib-accordion close-others="true">' +
            '<uib-accordion-group ng-repeat="(groupName, group) in formComponentGroups" heading="{{ group.title }}" is-open="$first">' +
              '<div ng-repeat="component in formComponentsByGroup[groupName]" ng-if="component.title"' +
                'dnd-draggable="component.settings"' +
                'dnd-dragstart="dndDragIframeWorkaround.isDragging = true" ' +
                'dnd-dragend="dndDragIframeWorkaround.isDragging = false" ' +
                'dnd-effect-allowed="copy" ' +
                'class="formcomponentcontainer">' +
                '<span class="btn btn-primary btn-xs btn-block formcomponent" title="{{component.title}}" style="overflow: hidden; text-overflow: ellipsis;">' +
                  '<i ng-if="component.icon" class="{{ component.icon }}"></i> {{ component.title }}' +
                '</span>' +
              '</div>' +
            '</uib-accordion-group>' +
          '</uib-accordion>' +
        '</div>' +
        '<div class="col-sm-10 formbuilder">' +
              '<div class="dropzone">' +
                '<form-builder-list component="form" form="form" formio="formio" hide-dnd-box-count="2"></form-builder-list>' +
              '</div>' +
        '</div>' +
      '</div>'
    );

    // Create the component markup.
    $templateCache.put('formio/components/confirm-remove.html',
      '<form id="confirm-remove-dialog">' +
            '<p>Removing this component will also <strong>remove all of its children</strong>! Are you sure you want to do this?</p>' +
            '<div>' +
            '<div class="form-group">' +
              '<button type="submit" class="btn btn-danger pull-right" ng-click="closeThisDialog(true)">Remove</button>&nbsp;' +
              '<button type="button" class="btn btn-default pull-right" style="margin-right: 5px;" ng-click="closeThisDialog(false)">Cancel</button>&nbsp;' +
            '</div>' +
            '</div>' +
      '</form>'
    );
  }
]);

require('./components');
