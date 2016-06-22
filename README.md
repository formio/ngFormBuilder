The [Form.io](https://form.io) Form Builder
--------------------------------
This library provides form building capabilities to an Angular.js application. This form builder's purpose is to 
construct a JSON object reporesentation of a form, which could then be handed off to a Form Renderer such as the one
found @ [https://github.com/formio/ngFormio](https://github.com/formio/ngFormio).  The following landing page should
provide a good example of how this form builder works.

[See Working Example](http://codepen.io/travist/full/xVyMjo/)

The form builder can be embedded within your application using the following embed code.

```
<form-builder form="myform"></form-builder>
```

Where ```myform``` would be a form object that is placed on the scope of the controller containing the form builder.

Installation
================
To install this within your application, you will first need to include the following 


Form.io
==============
This project is provided by [Form.io](https://form.io), which is a combined form and API platform for Developers.
