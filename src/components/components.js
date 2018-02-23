module.exports = function(app) {
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the component markup.
      $templateCache.put('formio/components/settings.html',
        '<form id="component-settings" novalidate>' +
          '<div class="row">' +
            '<div class="col-md-6">' +
              '<p class="lead" ng-if="::formComponent.title" style="margin-top:10px;">{{::formComponent.title | formioTranslate}} {{\'Component\' | formioTranslate}}</p>' +
            '</div>' +
            '<div class="col-md-6">' +
              '<div class="pull-right" ng-if="::formComponent.documentation" style="margin-top:10px; margin-right:20px;">' +
                '<a ng-href="{{ ::formComponent.documentation }}" target="_blank"><i class="glyphicon glyphicon-new-window"></i> {{\'Help!\' | formioTranslate}}</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col-xs-6">' +
              '<uib-tabset>' +
                '<uib-tab ng-repeat="view in ::formComponent.views" heading="{{ ::view.name | formioTranslate }}"><ng-include src="::view.template"></ng-include></uib-tab>' +
              '</uib-tabset>' +
            '</div>' +
            '<div class="col-xs-6">' +
              '<div class="panel panel-default preview-panel" style="margin-top:44px;">' +
                '<div class="panel-heading">{{\'Preview\' | formioTranslate}}</div>' +
                '<div class="panel-body">' +
                  '<div class="form-group" ng-if="component.wysiwyg && editorVisible">' +
                    '<label for="editor-preview" class="control-label" ng-if="component.label">{{ component.label }}</label>' +
                    '<textarea class="form-control" id="editor-preview" ng-model="fakeNgModel" ng-if="component.wysiwyg && editorVisible" ckeditor="component.wysiwyg"></textarea>' +
                  '</div>' +
                  '<formio-component ng-if="!component.wysiwyg" component="component" data="{}" formio="::formio"></formio-component>' +
                '</div>' +
              '</div>' +
              '<formio-settings-info component="component" data="{}" formio="::formio"></formio-settings-info>' +
              '<div class="form-group">' +
                '<button type="submit" class="btn btn-success" ng-if="component.input" ng-click="closeThisDialog(true)">{{\'Save\' | formioTranslate}}</button>&nbsp;' +
        '<button type="submit" class="btn btn-success" ng-if="!component.input" ng-click="closeThisDialog(true)">{{\'Save\' | formioTranslate}}</button>&nbsp;' +
                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(false)" ng-if="!component.isNew">{{\'Cancel\' | formioTranslate}}</button>&nbsp;' +
                '<button type="button" class="btn btn-danger" ng-click="removeComponent(component, formComponents[component.type].confirmRemove); closeThisDialog(false)">{{\'Remove\' | formioTranslate}}</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</form>'
      );

      // Create the common API tab markup.
      $templateCache.put('formio/components/common/data.html',
        '<form-builder-option property="defaultValue"></form-builder-option>' +
        '<form-builder-option property="dbIndex" class="form-builder-premium form-builder-dbindex"></form-builder-option>' +
        '<uib-accordion>' +
        '  <div uib-accordion-group heading="Custom Default Value" class="panel panel-default">' +
        '    <uib-accordion>' +
        '      <div uib-accordion-group heading="JavaScript Default" class="panel panel-default" is-open="true">' +
        '        <formio-script-editor rows="5" id="customDefaultValue" name="customDefaultValue" ng-model="component.customDefaultValue" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></formio-script-editor>' +
        '        <small>' +
        '          <p>Enter custom default value code.</p>' +
        '          <p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' +
        '          <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
        '          <p>Default Values are only calculated on form load. Use Calculated Value for a value that will update with the form.</p>' +
        '        </small>' +
        '      </div>' +
        '      <div uib-accordion-group heading="JSONLogic Default" class="panel panel-default">' +
        '        <small>' +
        '          <p>Execute custom default value using <a href="http://jsonlogic.com/">JSONLogic</a>.</p>' +
        '          <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
        '          <p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>' +
        '        </small>' +
        '        <textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.customDefaultValue" placeholder=\'{ ... }\'></textarea>' +
        '      </div>' +
        '    </uib-accordion>' +
        '  </div>' +
        '  <div uib-accordion-group heading="Calculated Value" class="panel panel-default">' +
        '    <uib-accordion>' +
        '      <div uib-accordion-group heading="JavaScript Value" class="panel panel-default" is-open="true">' +
        '        <formio-script-editor rows="5" id="calculateValue" name="calculateValue" ng-model="component.calculateValue" placeholder="/*** Example Code ***/\nvalue = data[\'mykey\'] + data[\'anotherKey\'];"></formio-script-editor>' +
        '        <small>' +
        '          <p>Enter code to calculate a value.</p>' +
        '          <p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' +
        '          <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' +
        '        </small>' +
        '      </div>' +
        '      <div uib-accordion-group heading="JSONLogic Value" class="panel panel-default">' +
        '        <small>' +
        '          <p>Execute custom calculation logic with JSON and <a href="http://jsonlogic.com/">JSONLogic</a>.</p>' +
        '          <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' +
        '          <p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>' +
        '        </small>' +
        '        <textarea class="form-control" rows="5" id="json" name="json" json-input ng-model="component.calculateValue" placeholder=\'{ ... }\'></textarea>' +
        '      </div>' +
        '    </uib-accordion>' +
        '  </div>' +
        '</uib-accordion>'
      );

      // Create the common API tab markup.
      $templateCache.put('formio/components/common/api.html',
        '<ng-form>' +
          '<form-builder-option-key></form-builder-option-key>' +
          '<form-builder-option-tags></form-builder-option-tags>' +
          '<uib-accordion>' +
            '<div uib-accordion-group heading="Custom Properties" class="panel panel-default">' +
              '<object-builder data="component.properties" label="Custom Properties" tooltip-text="This allows you to configure any custom properties for this component." />' +
            '</div>' +
          '</uib-accordion>' +
        '</ng-form>'
      );

      // Create the common Layout tab markup.
      $templateCache.put('formio/components/common/layout.html',
        '<ng-form>' +
          // Need to use array notation to have dash in name
          '<form-builder-option property="style[\'margin-top\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-right\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-bottom\']"></form-builder-option>' +
          '<form-builder-option property="style[\'margin-left\']"></form-builder-option>' +
          '<uib-accordion>' +
          '  <div uib-accordion-group heading="Overlay" class="panel panel-default">' +
          '    <div class="form-group">' +
          '      <label for="overlay-style">Style</label>' +
          '      <input class="form-control" id="overlay-style" name="overlay-style" ng-model="component.overlay.style"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-left">Left</label>' +
          '      <input class="form-control" id="overlay-left" name="overlay-left" ng-model="component.overlay.left"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-right">Top</label>' +
          '      <input class="form-control" id="overlay-top" name="overlay-top" ng-model="component.overlay.top"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-width">Width</label>' +
          '      <input class="form-control" id="overlay-width" name="overlay-width" ng-model="component.overlay.width"></input>' +
          '    </div>' +
          '    <div class="form-group">' +
          '      <label for="overlay-height">Height</label>' +
          '      <input class="form-control" id="overlay-height" name="overlay-height" ng-model="component.overlay.height"></input>' +
          '    </div>' +
          '  </div>' +
          '</uib-accordion>' +
        '</ng-form>'
      );

      // Create the common Layout tab markup.
      $templateCache.put('formio/components/common/conditional.html',
        '<form-builder-conditional></form-builder-conditional>'
      );
    }
  ]);
};
