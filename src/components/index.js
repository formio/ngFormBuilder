var app = angular.module('ngFormBuilder');

// Basic
require('./components')(app);
require('./textfield')(app);
require('./number')(app);
require('./password')(app);
require('./textarea')(app);
require('./checkbox')(app);
require('./selectboxes')(app);
require('./select')(app);
require('./radio')(app);
require('./htmlelement')(app);
require('./content')(app);
require('./button')(app);

// Special
require('./email')(app);
require('./phonenumber')(app);
require('./address')(app);
require('./datetime')(app);
require('./day')(app);
require('./currency')(app);
require('./hidden')(app);
require('./resource')(app);
require('./file')(app);
require('./signature')(app);
require('./custom')(app);
require('./datagrid')(app);
require('./survey')(app);

// Layout
require('./columns')(app);
require('./fieldset')(app);
require('./container')(app);
require('./page')(app);
require('./panel')(app);
require('./table')(app);
require('./well')(app);
