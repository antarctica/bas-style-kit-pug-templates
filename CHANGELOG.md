# BAS Style Kit Pug Templates - Change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][unreleased]

### Changed [BREAKING!]

* Refactoring navigation menu includes, `bsk--nav-collapse--primary-nav.pug` is now 
  `bsk--nav-collapse--nav-primary.pug`, `bsk--nav-collapse--secondary-nav.pug` is now 
  `bsk--nav-collapse--nav-secondary.pug`

### Added

* Navigation launcher support
* Gulp watch support for local tests

### Fixed

* Fixing README example typo

### Changed

* Improving Dockerfile
* Improving README
* Updating NPM dependencies
* Refactoring local tests to add index and improved directory structure

## [0.1.2] - 2018-07-31

### Fixed

* Docker Compose volume mounting clobbering 'node_modules' directory

## [0.1.1] - 2018-07-31 - Skipped

This release was skipped to test NPM version testing.

## [0.1.0] - 2018-07-31

### Added 

* Initial project - based on BAS Style Kit version 0.4.0
