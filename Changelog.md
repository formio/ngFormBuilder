# Change Log
All notable changes to this project will be documented in this file

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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
