# BAS Style Kit Pug Templates - Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][unreleased]

## [0.6.0] - 2020-06-26

### Added

* Documenting component patterns
* Updated to Style Kit 0.6.0
* Updated to JS Cookie 2.2.1
* Updated to jQuery 3.5.1

### Changed

* Feedback links changed to open in a new tab
* Updated licence dates

## [0.5.0] - 2019-07-01

### Added

* 'Start' page pattern
* 'Sign in' (Microsoft) page pattern variant
* Updated to Style Kit 0.6.0-alpha

### Changed

* Refactoring and simplifying README
* Docker images are no longer versioned

## [0.4.0] - 2018-11-28

### Added

* Updated to Style Kit 0.5.0

### Fixed

* Added missing GitLab CI file from release procedures

## [0.3.0] - 2018-11-23

### Added

* 'Problem with this service' (basic) page pattern variant
* 'Problem with this service' (contact) page pattern variant
* 'Problem with this service' (alternative) page pattern variant
* 'Service unavailable' (contact) page pattern variant
* 'Service unavailable' (availability) page pattern variant
* 'Service unavailable' (alternative) page pattern variant
* 'Service unavailable' (partly closed) page pattern variant
* 'Service unavailable' (closed) page pattern variant
* 'Service unavailable' (replaced) page pattern variant
* Pug templates compiled as part of CI to check for syntax errors
* Google Analytics support
* Updated to Style Kit 0.5.0-beta
* Improved developer documentation

### Changed

* Adopting SPDX compliant reference for OGL

## [0.2.0] - 2018-09-16

### Changed [BREAKING!]

* Refactoring navigation menu includes, `bsk--nav-collapse--primary-nav.pug` is now
  `bsk--nav-collapse--nav-primary.pug`, `bsk--nav-collapse--secondary-nav.pug` is now
  `bsk--nav-collapse--nav-secondary.pug`
* Variable for navigation launcher items, `bsk_attributes.site_nav_launcher_extras` is now
  `bsk_attributes.site_nav_launcher`
* Favicons include moved out of `html` layout into `bsk--basic` layout as it is now Style Kit specific
* Favicons support is limited to Style Kit favicons only (unless the include is overriden)
* Icon uses replaced with alternatives or removed where not needed due to the removal of Font Awesome

### Added

* Updated to Style Kit 0.5.0-alpha
* Support for design patterns
* Full navigation launcher support
* Support for custom development phases, not recommended for general use
* Block added to `<head>` element include for additional meta tags before CSS files are included
* Style Kit defined favicon included in pages by default
* Continuous Integration using GitLab
* Snyk dependency vulnerability scanning
* Gulp watch support for local tests

### Fixed

* Fixing README example typo
* Including a valid layout in each Pug example

### Changed

* Improving Dockerfile
* Improving README
* Updating NPM dependencies
* Refactoring local tests to add index and improved directory structure
* Improving local tests Nginx logging
* Improving documentation on loading custom, inline, CSS/JS content

## [0.1.2] - 2018-07-31

### Fixed

* Docker Compose volume mounting clobbering 'node_modules' directory

## [0.1.1] - 2018-07-31 - Skipped

This release was skipped to test NPM version testing.

## [0.1.0] - 2018-07-31

### Added

* Initial project - based on BAS Style Kit version 0.4.0
