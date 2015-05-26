/*
app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('table', {
      fbtemplate: 'formio/formbuilder/table.html',
      views: [
        {
          name: 'Display',
          template: 'formio/components/table/display.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {
    var tableClasses = "{'table-striped': component.striped, ";
    tableClasses += "'table-bordered': component.bordered, ";
    tableClasses += "'table-hover': component.hover, ";
    tableClasses += "'table-condensed': component.condensed}";
    $templateCache.put('formio/formbuilder/table.html',
      '<div class="table-responsive">' +
        '<table ng-class="' + tableClasses + '" class="table">' +
          '<thead ng-if="component.header.length"><tr>' +
            '<th ng-repeat="header in component.header">{{ header }}</th>' +
          '</tr></thead>' +
          '<tbody>' +
            '<tr ng-repeat="row in component.rows">' +
              '<td ng-repeat="component in row">' +
                '<form-builder-list></form-builder-list>' +
              '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>' +
      '</div>'
    );

    $templateCache.put('formio/components/panel/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Number of Rows</label>' +
          '<input type="number" class="form-control" id="numRows" name="numRows" placeholder="Number of Rows" ng-change="component.rows.push()" value="{{ component.rows.length }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="label">Number of Columns</label>' +
          '<input type="number" class="form-control" id="numCols" name="numCols" placeholder="Number of Columns" ng-change="" value="{{ component.rows[0].length }}">' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
*/
