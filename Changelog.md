# Change Log
All notable changes to this project will be documented in this file

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [UNRELEASED]

## 2.19.3
### Added
 - Add tableView config to layout components.

## 2.19.2
### Fixed
 - Custom component was not updating settings.

## 2.19.1
### Added
 - Added 'disable limiting response' option for select component with url as datasource.
 
## 2.19.0
### Added
 - Form component to the form builder.
 - JSON Logic on all places where custom javascript can be written.

### Fixed
 - Issues with the pages on the Wizard from showing the wrong pages or no pages at all.

### Changed
 - Upgraded ng-formio to 2.19.0
 - Upgraded ng-dialog to 1.3.0
 - Upgraded ng-tags-input to 3.2.0

## 2.18.2
### Added
 - Add headers option to Select Urls.
 
### Changed
 - Upgrade ngFormio to 2.18.5

### Changed
 - Select resource components use Formio provider instead of $http.get to allow offline compatibility.

## 2.18.1
### Added
 - A configuration for the resource references.

### Changed
 - Upgrade ngFormio to 2.18.1

## 2.18.0
### Fixed
 - Custom components still didn't edit properly.
 - Select url field missing due to passing ng-switch-when to field.
 
### Changed
 - Update ngFormio to 2.18.0

## 2.17.0
### Fixed
 - Custom component edits edit the right component.

### Added
 - Added default value settings to the currency component.
 - Allow passing ng-* attributes when using the formBuilderOption directive.

### Removed
 - Removing random validation field on the file component, which was not used.
 
### Changed
 - Update ngFormio to 2.17.0

## 2.16.6
### Added
 - UI for the JSON Logic capabilities.
### Changed
 - Upgraded ng-formio to 2.16.6.

## 2.16.5
## 2.16.4
 - No release.

## 2.16.3
### Changed
 - Upgraded ng-formio to 2.16.3 - Fixes save to not throw error when calling "success" vs. "then".

## 2.16.2
### Fixed
 - Dialog modal was not allowing close on Firefox

### Changed
 - Upgraded ng-formio to 2.16.2.

## 2.16.1
### Changed
 - Upgraded ng-formio to 2.16.1

### Fixed
 - The event that should be fired to iframe builder when a component is updated with modal.

## 2.16.0
### Added 
 - Added the UI for the "Add Resource" functionality.
 - Added support for iframe builders (like the PDF builder)
 - Adding ability to set a Checkbox to be of type Radio.

### Fixed
 - The form to always have a display of form.

### Changed
 - Upgraded ng-formio to 2.16.0


## 2.15.8
### Added
 - Added warning to existing components api key page, to message the side effects of changing a components key.
 - Added the layout components from resources to display in the Existing Resource Fields select list

### Changed
 - Upgrade ng-formio to 2.15.8

### Fixed
 - Fixing yearRange option for angular 1 renderer which was switched to yearRows and yearColumns.
 - Fixed min/max validation issues with the datetime component

### Removed
 - Removed the m/d/y selection modes for the date time component, because they are only supported in the angular 1
   renderer.

## 2.15.7
 - No release

## 2.15.6
### Added
 - An event to fire when a new page is added to the wizard view.
 - Select dropdown to the index.html test page.

### Changed
 - Upgraded ng-formio to 2.15.6
 - Upgraded formiojs to 2.5.0
 - Upgraded angular dependency to 1.6.4
 - Upgraded ng-dialog to 1.0.1

### Fixed
 - Fixed issue with layout components not getting unique keys when added via the builder

## 2.15.1
### Fixed
 - Fix issue with translate injector.

## 2.15.0
### Added
 - babel-preset-es2015 to devDependencies

### Fixed
 - Component keys properly increment even when settings dialog doesn't open
