# BAS Style Kit Pug Templates

A set of Pug templates for implementing the [BAS Style Kit](https://style-kit.web.bas.ac.uk).

## Installation

...

## Usage

...

## Development

...

## GitHub mirror

A read-only mirror of this project's repository is maintained on GitHub to allow use by those outside of BAS.

Merge requests **WILL NOT** be accepted on this mirror.

## Release procedures

### Before release

1. create a release branch
2. remove `-develop` from the version in:
  * `package.json`
  * `docker-compose.yml`
  * `layouts/bas-style-kit/blank.pug`:
    * `bsk_variables.templates_version`
3. push the app docker image [1]
4. if new config options have been set, update the usage section
6. close release in changelog
7. commit changes, merge with master and tag with new version
8. push the merged release to NPM [2]

**Note:** If the BAS Style Kit version changes, make sure to bump that version in `layouts/bas-style-kit/blank.pug` too.

### Publishing NPM package

To preview the contents of the NPM package:

```shell
# Add `entrypoint: ash` and comment out the `command` parameter of the 'app' service in docker-compose.yml
$ docker-compose run app
$ ./node_modules/gulp/bin/gulp.js archive
$ npm pack
# Undo changes made to docker-compose.yml
```

**Note:** This project includes a `.npmignore` file to exclude additional files from NPM packages.

```shell
# Add `entrypoint: ash` and comment out the `command` parameter of the 'app' service in docker-compose.yml
$ docker-compose run app
$ ./node_modules/gulp/bin/gulp.js archive
$ npm login
$ npm publish
# Undo changes made to docker-compose.yml
```

### After release

1. bump the version with `-develop` as a prefix in:
  * `package.json`
  * `docker-compose.yml`
  * `layouts/bas-style-kit/blank.pug`:
    * `bsk_variables.templates_version`
2. push the app docker image [1]
3. commit changes, merge with master and close post-release branch

[1]

```shell
$ docker-compose build
$ docker-compose push
```

## Issue tracking

This project uses [issue tracking](https://trello.com/b/0Mhzizpk/bas-style-kit) to manage development of new
features/improvements and reporting bugs.

## Feedback

The maintainer of this project is the BAS Web & Applications Team, they can be contacted through the 
[BAS Service Desk](mailto:servicedesk@bas.ac.uk).

## License

© UK Research and Innovation (UKRI), 2017-2018, British Antarctic Survey.

You may use and re-use this software and associated documentation files free of charge in any format or medium, under 
the terms of the Open Government Licence v3.0.

You may obtain a copy of the Open Government Licence at http://www.nationalarchives.gov.uk/doc/open-government-licence/
