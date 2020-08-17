/**
  * These are component options that can be reused
  * with the builder-option directive
  * Valid properties: label, placeholder, tooltip, type
  */
module.exports = {
  label: {
    label: 'Label',
    placeholder: 'Field Label',
    tooltip: 'The label for this field that will appear next to it.'
  },
  defaultValue: {
    label: 'Default Value',
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.'
  },
  placeholder: {
    label: 'Placeholder',
    placeholder: 'Placeholder',
    tooltip: 'The placeholder text that will appear when this field is empty.'
  },
  description: {
    label: 'Description',
    placeholder: 'Description for this field.',
    tooltip: 'The description is text that will appear below the input field.'
  },
  tooltip: {
    label: 'Tooltip',
    placeholder: 'To add a tooltip to this field, enter text here.',
    tooltip: 'Adds a tooltip to the side of this field.',
    type: 'textarea'
  },
  rows: {
    label: 'Rows',
    placeholder: 'Enter the amount of rows',
    tooltip: 'This allows control over how many rows are visible in the text area.',
    type: 'number'
  },
  errorLabel: {
    label: 'Error Label',
    placeholder: 'Error Label',
    tooltip: 'The label for this field when an error occurs.'
  },
  path: {
    label: 'Form Path',
    placeholder: 'Enter the path of the Form to load',
    tooltip: 'This is the path of the form to load.'
  },
  inputMask: {
    label: 'Input Mask',
    placeholder: 'Input Mask',
    tooltip: 'An input mask helps the user with input by ensuring a predefined format.<br><br>9: numeric<br>a: alphabetical<br>*: alphanumeric<br><br>Example telephone mask: (999) 999-9999'
  },
  format: {
    label: 'Format',
    placeholder: 'Format',
    tooltip: 'The moment.js format for saving the value of this field.'
  },
  authenticate: {
    label: 'Formio Authenticate',
    tooltip: 'Check this if you would like to use Formio Authentication with the request.',
    type: 'checkbox'
  },
  spellcheck: {
    label: 'Enable Spell Check',
    tooltip: 'Check this if you wish to enable spell check.',
    type: 'checkbox'
  },
  tableView: {
    label: 'Table View',
    type: 'checkbox',
    tooltip: 'Shows this value within the table view of the submissions.'
  },
  prefix: {
    label: 'Prefix',
    placeholder: 'example \'$\', \'@\'',
    tooltip: 'The text to show before a field.'
  },
  suffix: {
    label: 'Suffix',
    placeholder: 'example \'$\', \'@\'',
    tooltip: 'The text to show after a field.'
  },
  multiple: {
    label: 'Multiple Values',
    type: 'checkbox',
    tooltip: 'Allows multiple values to be entered for this field.'
  },
  disabled: {
    label: 'Disabled',
    type: 'checkbox',
    tooltip: 'Disable the form input.'
  },
  dbIndex: {
    label: 'Database Index',
    type: 'checkbox',
    tooltip: 'Set this field as an index within the database. Increases performance for submission queries.'
  },
  clearOnRefresh: {
    label: 'Clear Value On Refresh',
    type: 'checkbox',
    tooltip: 'When the Refresh On field is changed, clear the selected value.'
  },
  clearOnHide: {
    label: 'Clear Value When Hidden',
    type: 'checkbox',
    tooltip: 'When a field is hidden, clear the value.'
  },
  unique: {
    label: 'Unique',
    type: 'checkbox',
    tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.'
  },
  protected: {
    label: 'Protected',
    type: 'checkbox',
    tooltip: 'A protected field will not be returned when queried via API.'
  },
  hideLabel: {
    label: 'Hide Label',
    type: 'checkbox',
    tooltip: 'Hide the label of this component. This allows you to show the label in the form builder, but not when it is rendered.'
  },
  image: {
    label: 'Display as images',
    type: 'checkbox',
    tooltip: 'Instead of a list of linked files, images will be rendered in the view.'
  },
  imageSize: {
    label: 'Image Size',
    placeholder: '100',
    tooltip: 'The image size for previewing images.'
  },
  persistent: {
    label: 'Persistent',
    type: 'checkbox',
    tooltip: 'A persistent field will be stored in database when the form is submitted.'
  },
  hidden: {
    label: 'Hidden',
    type: 'checkbox',
    tooltip: 'A hidden field is still a part of the form, but is hidden from view.'
  },
  mask: {
    label: 'Hide Input',
    type: 'checkbox',
    tooltip: 'Hide the input in the browser. This does not encrypt on the server. Do not use for passwords.'
  },
  encrypted: {
    label: 'Encrypt',
    type: 'checkbox',
    tooltip: 'Encrypt this field on the server. This is two way encryption which is not be suitable for passwords.'
  },
  reference: {
    label: 'Save as reference',
    type: 'checkbox',
    tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.'
  },
  block: {
    label: 'Block',
    type: 'checkbox',
    tooltip: 'This control should span the full width of the bounding container.'
  },
  leftIcon: {
    label: 'Left Icon',
    placeholder: 'Enter icon classes',
    tooltip: 'This is the full icon class string to show the icon. Example: \'glyphicon glyphicon-search\' or \'fa fa-plus\''
  },
  rightIcon: {
    label: 'Right Icon',
    placeholder: 'Enter icon classes',
    tooltip: 'This is the full icon class string to show the icon. Example: \'glyphicon glyphicon-search\' or \'fa fa-plus\''
  },
  url: {
    label: 'Upload Url',
    placeholder: 'Enter the url to post the files to.',
    tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#server-side\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#server-side</a> for how to set up the server.'
  },
  filePattern: {
    label: 'File Pattern',
    placeholder: '.pdf,.jpg',
    tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file patterns.'
  },
  fileMinSize: {
    label: 'File Minimum Size',
    placeholder: '1MB',
    tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file sizes.'
  },
  fileMaxSize: {
    label: 'File Maximum Size',
    placeholder: '10MB',
    tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file sizes.'
  },
  dir: {
    label: 'Directory',
    placeholder: '(optional) Enter a directory for the files',
    tooltip: 'This will place all the files uploaded in this field in the directory'
  },
  disableOnInvalid: {
    label: 'Disable on Form Invalid',
    type: 'checkbox',
    tooltip: 'This will disable this field if the form is invalid.'
  },
  striped: {
    label: 'Striped',
    type: 'checkbox',
    tooltip: 'This will stripe the table if checked.'
  },
  bordered: {
    label: 'Bordered',
    type: 'checkbox',
    tooltip: 'This will border the table if checked.'
  },
  hover: {
    label: 'Hover',
    type: 'checkbox',
    tooltip: 'Highlight a row on hover.'
  },
  condensed: {
    label: 'Condensed',
    type: 'checkbox',
    tooltip: 'Condense the size of the table.'
  },
  dataGridLabel: {
    label: 'Show Label in DataGrid',
    type: 'checkbox',
    tooltip: 'Show the label when in a datagrid.'
  },
  'validate.required': {
    label: 'Required',
    type: 'checkbox',
    tooltip: 'A required field must be filled in before the form can be submitted.'
  },
  'validate.minLength': {
    label: 'Minimum Length',
    placeholder: 'Minimum Length',
    type: 'number',
    tooltip: 'The minimum length requirement this field must meet.'
  },
  'validate.maxLength': {
    label: 'Maximum Length',
    placeholder: 'Maximum Length',
    type: 'number',
    tooltip: 'The maximum length requirement this field must meet'
  },
  'validate.pattern': {
    label: 'Regular Expression Pattern',
    placeholder: 'Regular Expression Pattern',
    tooltip: 'The regular expression pattern test that the field value must pass before the form can be submitted.'
  },
  'validate.customMessage': {
    label: 'Custom Error Message',
    placeholder: 'Custom Error Message',
    tooltip: 'Error message displayed if any error occured.'
  },
  'validate.select': {
    label: 'Perform server validation',
    type: 'checkbox',
    tooltip: 'Check this if you would like for the server to perform a validation check to ensure the selected value is an available option. This requires a Search query to ensure a record is found.'
  },
  'rowClass': {
    label: 'Row CSS Class',
    placeholder: 'Row CSS Class',
    tooltip: 'CSS class to add to the edit row wrapper.'
  },
  'customClass': {
    label: 'Custom CSS Class',
    placeholder: 'Custom CSS Class',
    tooltip: 'Custom CSS class to add to this component.'
  },
  'tabindex': {
    label: 'Tab Index',
    placeholder: 'Tab Index',
    tooltip: 'Sets the tabindex attribute of this component to override the tab order of the form. See the <a href=\'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex\'>MDN documentation</a> on tabindex for more information.'
  },
  'addAnother': {
    label: 'Add Another Text',
    placeholder: 'Add Another',
    tooltip: 'Set the text of the Add Another button.'
  },
  'saveRow': {
    label: 'Save Row Text',
    placeholder: 'Save',
    tooltip: 'Set the text of the Save Row button.'
  },
  'removeRow': {
    label: 'Remove Row Text',
    placeholder: 'Remove',
    tooltip: 'Set the text of the remove Row button.'
  },
  'defaultDate': {
    label: 'Default Value',
    placeholder: 'Default Value',
    tooltip: 'You can use Moment.js functions to set the default value to a specific date. For example: \n \n moment().subtract(10, \'days\')'
  },
  'datePicker.minDate': {
    label: 'Minimum Date',
    placeholder: 'yyyy-MM-dd',
    tooltip: 'The minimum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().subtract(10, \'days\')'
  },
  'datePicker.maxDate': {
    label: 'Maximum Date',
    placeholder: 'yyyy-MM-dd',
    tooltip: 'The maximum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().add(10, \'days\')'
  },
  // Need to use array notation to have dash in name
  'style[\'margin-top\']': {
    label: 'Margin Top',
    placeholder: '0px',
    tooltip: 'Sets the top margin of this component. Must be a valid CSS measurement like `10px`.'
  },
  'style[\'margin-right\']': {
    label: 'Margin Right',
    placeholder: '0px',
    tooltip: 'Sets the right margin of this component. Must be a valid CSS measurement like `10px`.'
  },
  'style[\'margin-bottom\']': {
    label: 'Margin Bottom',
    placeholder: '0px',
    tooltip: 'Sets the bottom margin of this component. Must be a valid CSS measurement like `10px`.'
  },
  'style[\'margin-left\']': {
    label: 'Margin Left',
    placeholder: '0px',
    tooltip: 'Sets the left margin of this component. Must be a valid CSS measurement like `10px`.'
  },
  'addResource': {
    label: 'Show Add Resource Button',
    type: 'checkbox',
    tooltip: 'Include a button for adding a new resource'
  },
  'addResourceLabel': {
    label: 'Add Resource Text',
    placeholder: 'Add Resource',
    tooltip: 'Set the text of the Add Resource button.'
  },
  'useLocaleSettings': {
    label: 'Use Locale Settings',
    type: 'checkbox',
  },
  'delimiter': {
    label: 'Use Delimiter',
    type: 'checkbox',
    tooltip: 'Separate thousands by local delimiter.'
  },
  'autofocus': {
    label: 'Initial Focus',
    type: 'checkbox',
    tooltip: 'Make this field the initially focused element on this form.'
  },
  'collapsible': {
    label: 'Collapsible',
    type: 'checkbox',
    tooltip: 'It\'s possible to hide body clicking the title.'
  },
  'collapsed': {
    label: 'Collapsed',
    type: 'checkbox',
    tooltip: 'Component\'s body initially hidden.'
  }
};
