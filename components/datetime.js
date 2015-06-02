app.config([
  'formioComponentsProvider',
  function(formioComponentsProvider) {
    formioComponentsProvider.register('datetime', {
      onEdit: function($scope) {
        $scope.setFormat = function() {
          if ($scope.component.enableDate && $scope.component.enableTime) {
            $scope.component.format = 'yyyy-MM-dd HH:mm';
          }
          else if ($scope.component.enableDate && !$scope.component.enableTime) {
            $scope.component.format = 'yyyy-MM-dd';
          }
          else if (!$scope.component.enableDate && $scope.component.enableTime) {
            $scope.component.format = 'HH:mm';
          }
        };
        $scope.startingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.modes = [
          {
            name: 'day',
            label: 'Day'
          },
          {
            name: 'month',
            label: 'Month'
          },
          {
            name: 'year',
            label: 'Year'
          }
        ];
      },
      views: [
        {
          name: 'Display',
          template: 'formio/components/datetime/display.html'
        },
        {
          name: 'Date',
          template: 'formio/components/datetime/date.html'
        },
        {
          name: 'Time',
          template: 'formio/components/datetime/time.html'
        },
        {
          name: 'Validation',
          template: 'formio/components/datetime/validate.html'
        },
        {
          name: 'API',
          template: 'formio/components/datetime/api.html'
        }
      ]
    });
  }
]);
app.run([
  '$templateCache',
  function($templateCache) {

    // Create the settings markup.
    $templateCache.put('formio/components/datetime/display.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="label">Label</label>' +
          '<input type="text" class="form-control" id="label" name="label" ng-model="component.label" placeholder="Field Label" value="{{ component.label }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Place Holder</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.placeholder" placeholder="Placeholder" value="{{ component.placeholder }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="format">Date Format</label>' +
          '<input type="text" class="form-control" id="format" name="format" ng-model="component.format" placeholder="Enter the Date format" value="{{ component.format }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.protected" ng-checked="component.protected"> Protected' +
          '</label>' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="persistent" name="persistent" ng-model="component.persistent" ng-checked="component.persistent"> Persistent' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/datetime/date.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.enableDate" ng-checked="component.enableDate" ng-change="setFormat()"> Enable Date Input' +
          '</label>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="datepickerMode">Initial Mode</label>' +
          '<select class="form-control" id="datepickerMode" name="datepickerMode" ng-model="component.datepickerMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Minimum Date</label>' +
          '<div class="input-group">' +
            '<input type="text" class="form-control" ' +
              'ng-focus="minDateOpen = true" ' +
              'ng-init="minDateOpen = false" ' +
              'is-open="minDateOpen" ' +
              'datetime-picker="yyyy-MM-dd" ' +
              'enable-time="false" ' +
              'ng-model="component.minDate" />' +
            '<span class="input-group-btn">' +
              '<button type="button" class="btn btn-default" ng-click="minDateOpen = true"><i class="fa fa-calendar"></i></button>' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="placeholder">Maximum Date</label>' +
          '<div class="input-group">' +
            '<input type="text" class="form-control" ' +
              'ng-focus="maxDateOpen = true" ' +
              'ng-init="maxDateOpen = false" ' +
              'is-open="maxDateOpen" ' +
              'datetime-picker="yyyy-MM-dd" ' +
              'enable-time="false" ' +
              'ng-model="component.maxDate" />' +
            '<span class="input-group-btn">' +
              '<button type="button" class="btn btn-default" ng-click="maxDateOpen = true"><i class="fa fa-calendar"></i></button>' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="startingDay">Starting Day</label>' +
          '<select class="form-control" id="startingDay" name="startingDay" ng-model="component.datePicker.startingDay" ng-options="idx as day for (idx, day) in startingDays"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="minMode">Minimum Mode</label>' +
          '<select class="form-control" id="minMode" name="minMode" ng-model="component.datePicker.minMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="maxMode">Maximum Mode</label>' +
          '<select class="form-control" id="maxMode" name="maxMode" ng-model="component.datePicker.maxMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="yearRange">Number of Years Displayed</label>' +
          '<input type="text" class="form-control" id="placeholder" name="placeholder" ng-model="component.datePicker.yearRange" placeholder="Year Range" value="{{ component.datePicker.yearRange }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.datePicker.showWeeks" ng-checked="component.datePicker.showWeeks"> Show Week Numbers' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    $templateCache.put('formio/components/datetime/time.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.enableTime" ng-checked="component.enableTime" ng-change="setFormat()"> Enable Time Input' +
          '</label>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="hourStep">Hour Step Size</label>' +
          '<input type="number" class="form-control" id="hourStep" name="hourStep" ng-model="component.timePicker.hourStep" value="{{ component.timePicker.hourStep }}">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="minuteStep">Minute Step Size</label>' +
          '<input type="number" class="form-control" id="minuteStep" name="minuteStep" ng-model="component.timePicker.minuteStep" value="{{ component.timePicker.minuteStep }}">' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.timePicker.showMeridian" ng-checked="component.timePicker.showMeridian"> 12 hour time (AM/PM)' +
          '</label>' +
        '</div>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="protected" name="protected" ng-model="component.timePicker.readonlyInput" ng-checked="component.timePicker.readonlyInput"> Read-Only Input' +
          '</label>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/datetime/api.html',
      '<ng-form>' +
        '<div class="form-group">' +
          '<label for="key">Property Name</label>' +
          '<input type="text" class="form-control" id="key" name="key" ng-model="component.key" value="{{ component.key }}" ng-blur="component.lockKey = true;" ng-required>' +
        '</div>' +
      '</ng-form>'
    );

    // Create the API markup.
    $templateCache.put('formio/components/datetime/validate.html',
      '<ng-form>' +
        '<div class="checkbox">' +
          '<label>' +
            '<input type="checkbox" id="required" name="required" ng-model="component.validate.required" ng-checked="component.validate.required"> Required' +
          '</label>' +
        '</div>' +
        '<div class="panel panel-default">' +
          '<div class="panel-heading"><a class="panel-title" ng-click="customCollapsed = !customCollapsed">Custom Validation</a></div>' +
          '<div class="panel-body" collapse="customCollapsed" ng-init="customCollapsed = true;">' +
            '<textarea class="form-control" rows="5" id="custom" name="custom" ng-model="component.validate.custom" placeholder="/*** Example Code ***/\nvalid = (input === 3) ? true : \'Must be 3\';">{{ component.validate.custom }}</textarea>' +
            '<small><p>Enter custom validation code.</p>' +
            '<p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>' +
            '<p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p></small>' +
            '<div class="well">' +
              '<div class="checkbox">' +
                '<label>' +
                  '<input type="checkbox" id="private" name="private" ng-model="component.validate.customPrivate" ng-checked="component.validate.customPrivate"> <strong>Secret Validation</strong>' +
                '</label>' +
              '</div>' +
              '<p>Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</ng-form>'
    );
  }
]);
