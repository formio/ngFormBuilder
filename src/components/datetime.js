module.exports = function(app) {
  app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
      formioComponentsProvider.register('datetime', {
        onEdit: ['$scope', function($scope) {
          // FOR-34 - Update 12hr time display in the field, not only time picker.
          $scope.$watch('component.timePicker.showMeridian', function(value) {
            var _old = value ? 'HH' : 'hh';
            var _new = !value ? 'HH' : 'hh';

            if ($scope.component.enableTime) {
              $scope.component.format = $scope.component.format.toString().replace(_old, _new);
            }
          });

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
        }],
        icon: 'fa fa-clock-o',
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
            template: 'formio/components/common/api.html'
          },
          {
            name: 'Layout',
            template: 'formio/components/common/layout.html'
          },
          {
            name: 'Conditional',
            template: 'formio/components/common/conditional.html'
          }
        ],
        documentation: 'http://help.form.io/userguide/#datetime'
      });
    }
  ]);
  app.run([
    '$templateCache',
    function($templateCache) {
      // Create the settings markup.
      $templateCache.put('formio/components/datetime/display.html',
        '<ng-form>' +
          '<form-builder-option property="label"></form-builder-option>' +
          '<form-builder-option property="defaultDate"></form-builder-option>' +
          '<form-builder-option property="placeholder"></form-builder-option>' +
          '<form-builder-option property="description"></form-builder-option>' +
          '<form-builder-option property="format" label="Date Format" placeholder="Enter the Date format" title="The format for displaying this field\'s date. The format must be specified like the <a href=\'https://docs.angularjs.org/api/ng/filter/date\' target=\'_blank\'>AngularJS date filter</a>."></form-builder-option>' +
          '<form-builder-option property="customClass"></form-builder-option>' +
          '<form-builder-option property="tabindex"></form-builder-option>' +
          '<form-builder-option property="clearOnHide"></form-builder-option>' +
          '<form-builder-option property="protected"></form-builder-option>' +
          '<form-builder-option property="persistent"></form-builder-option>' +
          '<form-builder-option property="disabled"></form-builder-option>' +
          '<form-builder-option property="tableView"></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/datetime/date.html',
        '<ng-form>' +
          '<div class="checkbox">' +
            '<label form-builder-tooltip="Enables date input for this field.">' +
              '<input type="checkbox" id="enableDate" name="enableDate" ng-model="component.enableDate" ng-checked="component.enableDate" ng-change="setFormat()"> Enable Date Input' +
            '</label>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="datepickerMode" form-builder-tooltip="The initial view to display when clicking on this field.">Initial Mode</label>' +
            '<select class="form-control" id="datepickerMode" name="datepickerMode" ng-model="component.datepickerMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="placeholder" form-builder-tooltip="The minimum date that can be picked.">Minimum Date</label>' +
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
            '<label for="placeholder"  form-builder-tooltip="The maximum date that can be picked.">Maximum Date</label>' +
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
            '<label for="startingDay" form-builder-tooltip="The first day of the week.">Starting Day</label>' +
            '<select class="form-control" id="startingDay" name="startingDay" ng-model="component.datePicker.startingDay" ng-options="idx as day for (idx, day) in startingDays"></select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="minMode" form-builder-tooltip="The smallest unit of time view to display in the date picker.">Minimum Mode</label>' +
            '<select class="form-control" id="minMode" name="minMode" ng-model="component.datePicker.minMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="maxMode" form-builder-tooltip="The largest unit of time view to display in the date picker.">Maximum Mode</label>' +
            '<select class="form-control" id="maxMode" name="maxMode" ng-model="component.datePicker.maxMode" ng-options="mode.name as mode.label for mode in modes"></select>' +
          '</div>' +
          '<form-builder-option property="datePicker.yearRange" label="Number of Years Displayed" placeholder="Year Range" title="The number of years to display in the years view."></form-builder-option>' +

          '<form-builder-option property="datePicker.showWeeks" type="checkbox" label="Show Week Numbers" title="Displays the week numbers on the date picker."></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/datetime/time.html',
        '<ng-form>' +
          '<div class="checkbox">' +
            '<label form-builder-tooltip="Enables time input for this field.">' +
              '<input type="checkbox" id="enableTime" name="enableTime" ng-model="component.enableTime" ng-checked="component.enableTime" ng-change="setFormat()"> Enable Time Input' +
            '</label>' +
          '</div>' +
          '<form-builder-option property="timePicker.hourStep" type="number" label="Hour Step Size" title="The number of hours to increment/decrement in the time picker."></form-builder-option>' +
          '<form-builder-option property="timePicker.minuteStep" type="number" label="Minute Step Size" title="The number of minutes to increment/decrement in the time picker."></form-builder-option>' +
          '<form-builder-option property="timePicker.showMeridian" type="checkbox" label="12 Hour Time (AM/PM)" title="Display time in 12 hour time with AM/PM."></form-builder-option>' +
          '<form-builder-option property="timePicker.readonlyInput" type="checkbox" label="Read-Only Input" title="Makes the time picker input boxes read-only. The time can only be changed by the increment/decrement buttons."></form-builder-option>' +
        '</ng-form>'
      );

      $templateCache.put('formio/components/datetime/validate.html',
        '<ng-form>' +
          '<form-builder-option property="validate.required"></form-builder-option>' +
          '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
        '</ng-form>'
      );
    }
  ]);
};
