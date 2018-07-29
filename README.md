# BAS Style Kit Pug Templates

A set of Pug templates for implementing the [BAS Style Kit](https://style-kit.web.bas.ac.uk).

## Installation

### NPM package

The recommended method to use these templates is through a NPM package.

```
$ npm install -s @antarctica/bas-style-kit-pug-templates
```

## Usage

These templates are designed to be as modular as practical, to allow specific elements to be changed or replaced. 

The templates consist of Pug:

* layouts
* includes
* mixins
* variables (defined in either layouts or includes)
* blocks (defined in either layouts or includes)

In a typical implementation, only one of the layouts needs to be specified, with other components brought in by 
reference through Pug's inheritance system. These references and/or includes can be overridden to allow customisation.

### Quickstart

To use a standard page layout, create a application layout (e.g. `layouts/app.pug`) with the following:

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/bsk--standard.pug

block append variables
  - attributes.site_title = 'Example service';
  - attributes.site_description = 'Service to act as an example';
  - bsk_attributes.site_nav_brand_text = 'Example service';
  - bsk_attributes.site_development_phase = 'beta';
  - bsk_attributes.site_feedback_href = '/feedback';
  - bsk_attributes.site_footer_policies_cookies_href = '/legal/cookies';
  - bsk_attributes.site_footer_policies_copyright_href = '/legal/copyright';
  - bsk_attributes.site_footer_policies_privacy_href = '/legal/privacy';
  //- Optional
  - attributes.site_favicon_url = 'data:;base64,iVBORw0KGgo='
    //- Optional - add a custom CSS file with a relative URL
  - attributes.site_styles.push({href: '/css/app.css'});
  //- Optional - add a custom JS file with a SRI value
  - attributes.site_styles.push({href: 'https://example.com/js/example.js', integrity: 'abc123'});
  //- Optional - choose between the `bsk-container` and `bsk-container-fluid` layout containers
  - bsk_attributes.container_class = 'bsk-container';
  //- Optional - add navigation menu items
  - bsk_attributes.site_nav_primary.push({title: 'Item', href: '#'});
  - bsk_attributes.site_nav_primary.push({title: 'Dropdown', items: [{title: 'Sub-item 1', href: '#'}]})
  - bsk_attributes.site_nav_secondary.push({title: 'Item', href: '#'});
  - bsk_attributes.site_nav_launcher_extras.push({title: 'Related service', href: 'https://example.com'})
```

Then create a specific page/view (e.g. `view.pug`) and place the page content in the `main_content` block:

```pug
extends layouts/app.pug

block main_content
  header: h1 Example Service
  div ...
```

The components and options used above are described in more detail in the [components](#components) section.

### Using custom CSS/JS

A mechanism is provided for loading one or more additional CSS an/or JavaScript resources, such as application or 
website specific styling or interactivity.

This mechanism is available in all layouts which inherit from the [html.pug](#/layouts/bas-style-kit/layouts/html.pug)
layout.

* custom resources will always be referenced after the Style Kit's own, to ensure custom resources take priority
* style resources are outputted in the [styles](#styles-block) block, at the end of the `<head>` element
* script references are outputted in the [scripts](#scripts-block) block, at the end of the `<body>` element
* resources are specified as objects, which are added to an array and iterated over to generate appropriate HTML
* style resource objects should be added to the `attributes.site_styles` variable
* script resource objects should be added to the `attributes.site_scripts` variable

Resource objects have the following properties:

| Property    | Data Type | Required | Allowed Values | Example Value                                          |
| ----------- | --------- | -------- | -------------- | ------------------------------------------------------ |
| `href`      | String    | Yes      | Any URL        | `/css/app.css` / `https://example.com/js/app.js`       |
| `integrity` | String    | No       | Any SRI value  | `sha256-ClILH8AIH4CkAybtlKhzqqQUYR4eSDiNTK5LIWfF4qQ=`  |

For example:

```js
{
  href: '/css/app.css',
  integrity: 'sha256-ClILH8AIH4CkAybtlKhzqqQUYR4eSDiNTK5LIWfF4qQ='
}
```

The `integrity` property is used to specify a 
[Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) value for 
each resource. If specified an `integrity` attribute and will be added to the generated markup. A `crossorigin` 
attribute for [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) will also 
be added with a hard-coded `anonymous` value. 

For example, to specify a custom CSS resource, `/css/app.css` using a relative URL and a SRI value, in an application 
layout (e.g. `layouts/app.pug`):

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block append variables
  - attributes.site_styles.push({href: '/css/app.css', integrity: 'abc123'});
```

If needed, you can also add references to resources directly to the `styles` or `scripts` blocks by using the 
`block append` syntax. This is sometimes needed for inline scripts or styles for example.

**Note:** Make sure to use `block append` and not `block`, as the latter will remove the mechanism described previously.

### Navigation menu items

If using the [bsk--standard.pug](#/layouts/bas-style-kit/layouts/bsk--standard.pug) layout, these templates include
support for generating a [navbar](https://style-kit.web.bas.ac.uk/components/navbar/) as part of the 'standard header', 
consisting of a cookie banner, navbar and site development phase banner.

These templates support:

* a primary navigation menu - aligned left, after brand elements
* a secondary navigation menu - aligned right, before the launcher
* a launcher menu (for links to other websites/applications) - aligned right, after the secondary navigation menu

The primary and secondary navigation menu's support:

* [navbar items](https://style-kit.web.bas.ac.uk/components/navbar/#item)
* [navbar drop-down menu items](https://style-kit.web.bas.ac.uk/components/navbar/#drop-down-menus)

The launcher is a restricted menu, limited to a single drop-down menu. By default this will contain links to the BAS 
public website and BAS data catalogue, other applications can be added between these items as relevant.

Menu items are specified as objects, which are added to an array and iterated over to generate appropriate HTML.

* primary navigation item objects should be added to the `bsk_attributes.site_nav_primary` variable
* secondary navigation item objects should be added to the `bsk_attributes.site_nav_secondary` variable
* launcher item objects should be added to the `bsk_attributes.site_nav_launcher_extras` variable

Menu item objects have the following properties:

| Property | Data Type | Required | Allowed Values             | Example Value  |
| -------- | --------- | -------- | -------------------------- | -------------- |
| `title`  | String    | Yes      | Any string                 | `About`        |
| `href`   | String    | Yes      | Any URL                    | `/about`       |
| `items`  | Array     | No       | Array of menu item objects | N/A            |

**Note:** The `items` property cannot be set for launcher menu items, if specified it will be ignored.

**Note:** The `items` property is only recursed once, deeper objects will be ignored.

For example:

```js
{
  title: 'About',
  href: '/about`,
  items: [
    {
      title: 'History',
      href: '/about/history'
    },
    {
      title: 'Roadmap',
      href: '/about/roadmap'
    }
  ]
}
```

**Note:** These templates do not support highlighting active navigation items. You will need to add the `.bsk-active`
class to the currently active menu item, and if relevant sub-item, manually.

### Navigation menu branding

[Navbars](https://style-kit.web.bas.ac.uk/components/navbar/) are also used to display the name/identity of a website 
or application, to remind users where they are. These identity elements are referred to as 'brand' elements within the
Style Kit.

In the 'standard header', navbar brand elements are shown on the far left and are visible when the navbar collapses on
small screens. Brand elements include:

* [brand text](https://style-kit.web.bas.ac.uk/components/navbar/#brand-text) - set using the 
`bsk_attributes.site_nav_brand_text` variable
* [brand image](https://style-kit.web.bas.ac.uk/components/navbar/#brand-image) - set using the 
`bsk_attributes.site_nav_brand_img_href` variable

Both brand elements can be used together or on their own, appropriate markup will be generated to apply fix classes as
needed. If used together, the brand text will be shown before the brand image.

Brand elements are linked to a location specified by the `bsk_attributes.site_nav_brand_href` variable, which should be
the index of each website or application (i.e. `/`).

### Site development phase

The site development phase reflects the stage of development for a website or application, e.g. alpha or live. They are
described in the Style Kit [here](https://style-kit.web.bas.ac.uk/core/colours/#development-phase-colours).

For websites or applications that are not in the 'live' phase, a banner should be shown to inform users and request
feedback. This forms part of the 'standard header' of cookie banner, navbar and site development phase banner.

In these templates, the `bsk_attributes.site_development_phase` variable is used to specify the current phase for each
website or application. If using the [bsk--standard.pug](#/layouts/bas-style-kit/layouts/bsk--standard.pug) layout, a
suitable banner will be shown automatically using this variable.

**Note:** To disable this banner for a website or application in the 'live' phase, the 
`bsk_attributes.site_development_phase` variable can be set to `live-stable`. This isn't a real phase (separate to 
'live') but separates a newly released website or application from something more mature.

Alternatively, the `bsk_attributes.site_development_phase` variable can be set to `experimental` to indicate where an
website or application is used for staging or other development/testing activities.

## Components

The components in these templates are namespaced within a `bas-style-kit` directory to prevent clashes with other
components (e.g. `include bas-style-kit/foo.pug`).

These templates are divided into *generic* and *non-generic* components:

* *generic* - a minimal, neutral, base on which more opinionated components can be based
* *non-generic* - components which implement the Style Kit by including resources and setting up basic structures

**Note:** Non-generic components are prefixed with `bsk--` (e.g. `bsk--foo.pug`).

Generic components make no reference to the Style Kit itself and so could, in theory, be used as for other purposes, 
however this isn't an aim of these templates.

### Layouts

It is strongly recommended to use an application specific layout, which inherits from one of these layouts, rather than
using them directly (i.e. add a level of abstraction). This will allow variables to be changed more easily and includes
overridden if needed.

It is recommended to use the [bsk--standard.pug](#/layouts/bas-style-kit/bsk--standard.pug) layout unless there is a 
reason to use a non-standard page structure (such as for a landing page). In these cases the 
[bsk--base.pug](#/layouts/bas-style-kit/bsk--base.pug) layout should be used instead.

The generic layouts offered are only intended to act as a foundation for the BAS Style Kit specific layouts, rather 
than as templates for custom or third party style frameworks.

#### `/layouts/bas-style-kit/blank.pug`

Type: *generic*

Inherits from: *None*

Example implementation: [tests/.../blank.pug](/tests/layouts/bas-style-kit/html.pug).

Defines lowest-level blocks and variables to be used and extended by other layouts/components.

This layout is intentionally as minimal as possible and not intended for direct use, unless non-HTML output is needed.

Page content should be placed in the `content` block.

#### `/layouts/bas-style-kit/html.pug`

Type: *generic*

Inherits from: [blank.pug](#/layouts/bas-style-kit/blank.pug)

Example implementation: [tests/.../html.pug](/tests/layouts/bas-style-kit/html.pug).

Extends the *blank* generic layout with blocks, variables and includes specific to HTML based content.

Defines a minimal, accessible, HTML5 structure with some recommended best practices for cross-platform compatibility.

Mechanisms are included for using CSS and JS files, see [Using custom CSS/JS](#using-custom-css-js) for details.

Page content should be placed in the `main-content` block.

#### `/layouts/bas-style-kit/bsk--base.pug`

Type: *non-generic*

Inherits from: [html.pug](#/layouts/bas-style-kit/html.pug)

Example implementation: [tests/.../bsk--base.pug](/tests/layouts/bas-style-kit/bsk--base.pug).

Extends the *html* generic layout with includes and variables specific to the Style Kit.

References the Style Kit's CSS and JS files before any [custom CSS/JS](#using-custom-css-js) files.

Page content is placed in a [layout container](https://style-kit.web.bas.ac.uk/core/layout/#containers) with an ID 
`#site-main-content`. The class of the container can be set using the `bsk_attributes.container_class` variable.

This layout is only recommended where the [bsk--standard.pug](#/layouts/bas-style-kit/bsk--standard.pug) layout is
unsuitable.

Page content should be placed in the `main-content` block.

#### `/layouts/bas-style-kit/bsk--standard.pug`

Type: *non-generic*

Inherits from: [bsk--base.pug](#/layouts/bas-style-kit/bsk--base.pug)

Example implementation: [tests/.../bsk--standard.pug](/tests/layouts/bas-style-kit/bsk--standard.pug).

Extends the *bsk--base* layout with includes and variables to create a more opinionated, but typical, structure for 
content by placing elements such as headers, footers and site navigation before or after content.

See the [navigation menu items](#navigation-menu-items) section for more information on setting up site navigation.

This layout is recommended to base application layouts on, unless a non-typical structure is needed.

Page content should be placed in the `main-content` block.

### Includes

The bulk of these templates consist of includes, to allow specific functionality to be changed by overriding the 
relevant include.

These includes are can be generally split into two kinds:

* *feature includes* - includes which implement a single feature, such as displaying the site title in a header
* *aggregate includes* - includes which call other includes, such as all includes that make up a page footer

Complex features, such as navigation menus, may be implemented using a hierarchy of aggregate and feature includes, 
again to allow specific aspects to be overridden, without needing to duplicate aspects that don't need to be changed.

For example, the structure of of a standard page header uses both kinds of include:

```
- includes/bas-style-kit/bsk--body--standard-header.pug (aggregate)
    - includes/bas-style-kit/bsk--header--cookie-notice.pug (feature)
    - includes/bas-style-kit/bsk--header--site-navigation.pug (aggregate)
        - includes/bas-style-kit/bsk--nav--header.pug
            - ...
        - includes/bas-style-kit/bsk--nav--collapse.pug
            - ...
    - includes/bas-style-kit/bsk--header--development-phase.pug (feature)
```

Includes are intended to be small and easily to understand, therefore they are not all detailed in this documentation.
Where an include is more complicated or requires additional context, appropriate guidance can be found below.

#### `/includes/bas-style-kit/body.pug`

Type: *non-generic*

Kind: *aggregate*

Replaces the `content` block defined in the [blank.pug](#/layouts/bas-style-kit/blank.pug) layout with a `<body>` 
element.

This creates a more complex structure, supplementary content shown before/after some main content that is wrapped in one 
or more elements. Also defines a block for JS files references or inline scripts.

#### `/includes/bas-style-kit/head.pug`

Type: *non-generic*

Kind: *aggregate*

Defines a `<head>` HTML element with a block for CSS file references or inline styles.

### Mixins

Mixins define common functionality in the form of functions which can optionally accept arguments and other attributes.
They help reduce duplication and improves the maintainability of these templates.

#### `/mixins/bas-style-kit/bsk--nav.pug`

Type: *non-generic*

Renders a navigation menu consisting of [navbar items](https://style-kit.web.bas.ac.uk/components/navbar/#item) 
and/or [navbar dropdown menu items](https://style-kit.web.bas.ac.uk/components/navbar/#drop-down-menus).

See the [Navigation menu items](#navigation-menu-items) section for more information on defining navigation menu items.

### Variables

These templates use variables extensively to allow greater customisation and modularity. As with other components, 
variables relating specifically to the Style Kit are prefixed, in this case with `bsk_`.

Typically variables are placed into objects rather than being set in the global scope, for example a generic variable 
`foo` will be set as `variables.foo` and a non-generic variable as `bsk_variables.foo`.

Some variables are objects or arrays themselves, their usage will be explained in more detail where needed.

#### Changing variables

Variables can be overridden by redefining them and specifying a different value in another pug template, such as an 
application specific layout. Some variables should be changed to make sense, others should not be changed as they report
information about these templates themselves for example.

**Note:** In Pug, variables are simply JavaScript variables so all methods and concepts that can be applied to a regular
JS variable can be used with these variables too (such as array shifting for example).

These variables should be changed for each website or application:

* `attributes.site_title`
* `attributes.site_description`
* `bsk_attributes.site_nav_brand_text`
* `bsk_attributes.site_nav_primary`
* `bsk_attributes.site_development_phase`
* `bsk_attributes.site_feedback_href`
* `bsk_attributes.site_footer_policies_cookies_href`
* `bsk_attributes.site_footer_policies_copyright_href`
* `bsk_attributes.site_footer_policies_privacy_href`

These variables may, but don't need to be, changed for each website or application:

* `attributes.site_favicon_url`
* `attributes.site_styles`
* `attributes.site_scripts`
* `bsk_attributes.site_nav_secondary`
`bsk_attributes.site_nav_brand_img_href`
`bsk_attributes.site_nav_brand_href`
`bsk_attributes.site_nav_launcher_extras`

These variables do not normally, and should not, need to be changed:

* `attributes.site_back_to_top_target_id`
* `attributes.site_main_content_target_id`
* `bsk_attributes.container_class`
* `bsk_attributes.site_footer_ogl_symbol_a_href`
* `bsk_attributes.site_footer_ogl_text_href`
* `bsk_attributes.site_footer_ogl_text_version`

These variables must not be changed and should be treated as read only:

* `bsk_variables.templates_version`
* `bsk_variables.bsk_version`

#### Variable reference

| Variable                                             | Value Type | Allowed Values                                                                       | Default Value       | Notes                                                     |
| ---------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ | ------------------- | --------------------------------------------------------- |
| `attributes.site_title`                              | String     | Any string                                                                           | `site title`        | Typically 1-3 words                                       |
| `attributes.site_description`                        | String     | Any string                                                                           | `site description`  | Typically 1-2 sentences                                   |
| `attributes.site_favicon_url`                        | String     | URL to favicon                                                                       | *As implemented*    | Default value is an empty favicon                         |
| `attributes.site_back_to_top_target_id`              | String     | CSS ID selector                                                                      | `site-top`          | Set without the ID indicator (`#`)                        |
| `attributes.site_main_content_target_id`             | String     | CSS ID selector                                                                      | `site-main-content` | Set without the ID indicator (`#`)                        |
| `attributes.site_styles`                             | Array      | Site style object                                                                    | *Empty array*       | See [Using custom CSS/JS](#using-custom-css-js)           |
| `attributes.site_scripts`                            | Array      | Site script object                                                                   | *Empty array*       | See [Using custom CSS/JS](#using-custom-css-js)           |
| `bsk_variables.templates_version`                    | String     | Any [SemVer](https://semver.org/) value                                              | *As implemented*    | -                                                         |
| `bsk_variables.bsk_version`                          | String     | Any BAS Style Kit version                                                            | *As implemented*    | -                                                         |
| `bsk_attributes.container_class`                     | String     | `bsk-container` / `bsk-container-fluid`                                              | `bsk-container`     | -                                                         |
| `bsk_attributes.site_nav_primary`                    | Array      | Site navigation object                                                               | *Empty array*       | See [Navigation menu items](#navigation-menu-items)       |
| `bsk_attributes.site_nav_secondary`                  | Array      | Site navigation object                                                               | *Empty array*       | See [Navigation menu items](#navigation-menu-items)       |
| `bsk_attributes.site_nav_brand_text`                 | String     | Any string                                                                           | `site name`         | -                                                         |
| `bsk_attributes.site_nav_brand_img_href`             | String     | URL to image                                                                         | *Empty string*      | See [Navigation menu branding](#navigation-menu-branding) |
| `bsk_attributes.site_nav_brand_href`                 | String     | URL to content                                                                       | `/`                 | See [Navigation menu branding](#navigation-menu-branding) |
| `bsk_attributes.site_nav_launcher_extras`            | Array      | Site navigation launcher object                                                      | *Empty array*       | See [Navigation menu items](#navigation-menu-items)       |
| `bsk_attributes.site_development_phase`              | String     | `discovery` / `alpha` / `beta` / `live` / `live-stable` / `retired` / `experimental` | `alpha`             | See [Site development phase](#site-development-phase)     |
| `bsk_attributes.site_feedback_href`                  | String     | URL to feedback page or other content (e.g. model overlay)                           | `#`                 | -                                                         |
| `bsk_attributes.site_footer_ogl_symbol_a_href`       | String     | URL to OGL information page                                                          | *As implemented*    | -                                                         |
| `bsk_attributes.site_footer_ogl_text_href`           | String     | URL to OGL information page                                                          | *As implemented*    | -                                                         |
| `bsk_attributes.site_footer_ogl_text_version`        | String     | Any OGL version                                                                      | *As implemented*    | -                                                         |
| `bsk_attributes.site_footer_policies_cookies_href`   | String     | URL to cookies legal policy                                                          | `#`                 | -                                                         |
| `bsk_attributes.site_footer_policies_copyright_href` | String     | URL to copyright legal policy                                                        | `#`                 | -                                                         |
| `bsk_attributes.site_footer_policies_privacy_href`   | String     | URL to privacy legal policy                                                          | `#`                 | -                                                         |

Where a value is listed as, *As implemented*, the value is set within these templates and isn't necessary to repeat in
this documentation. I.e. for a version number, the exact value doesn't matter and is not listed in the above table.

### Blocks

In Pug, Blocks act as placeholders for content. Content can include actual content such as text, lists, images, etc. or
other Pug components such as includes, variables and other blocks (i.e. blocks can be nested).

The contents of a block can be set in a layout, such as an application layout, where it is effectively global, or on a
per page/view basis. Blocks can be overridden (i.e. global content could be replaced in specific pages) or appended to. 

Blocks are not considered to be *generic* or *non-generic* components.

In these templates blocks are defined in layouts:

* [layouts/bas-style-kit/blank.pug](#layouts/bas-style-kit/blank.pug)
  * [variables](#variables-block)
  * [content](#content-block)
* [layouts/bas-style-kit/html.pug](#layouts/bas-style-kit/html.pug)
  * [pre_main_content](#pre_main_content-block)
  * [main_content_container](#main_content_container_container)
  * [main_content](#main_content_container)
  * [post_main_content](#post_main_content_container)
  * [styles](#styles-block)
  * [scripts](#scripts-block)

### `variables` (block)

Primitive block defining a location to hold (Pug) variables apart from content. All variables related to these templates 
should be defined within this block. See the [Variables](#variables) section for more information.

### `content` (block)

Primitive block defining a location to hold content.

### `pre_main_content` (block)

Defines a location for content that should be shown before any main content (such as headers or navigation).

### `post_main_content` (block)

Defines a location for content that should be shown after any main content (such as footers).

### `main_content_container` (block)

Defines a location for any elements which should wrap around main page/view content (such as layout containers).

**Note:** If overridden, this include **MUST** implement the `main_content` block.

E.g.

```pug
block main_content_container
  main#site-main-content  //- or other wrapper content
    block main_content
```

### `main_content` (block)

Defines a location for content forming a specific page/view. This is typically the only block that needs to be 
used/implemented.

### `styles` (block)

Defines a location in the HTML `<head>` element for CSS files. Calls the 
[head--core-styles.pug](#/includes/bas-style-kit/head--core-styles.pug) include to load CSS files using variables, see
[Using custom CSS/JS](#using-custom-css-js) for more information.

If this loading mechanism cannot be used (e.g. inline styles), additional styles, or other components, can be loaded by 
appending to this block.

E.g.

```pug
block append styles
  //- ... styles/components ...
```

If the loading mechanism needs to be disabled, override this block.

E.g.

```pug
block styles
//- ... optional replacement styles/components ...
```

**Note:** The Style Kit's CSS is referenced using the loading mechanism and will need to be manually referenced if the 
mechanism is disabled.

### `scripts` (block)

Defines a location at the end of the HTML `<body>` element for JavaScript files. Calls the 
[body--core-scripts.pug](#/includes/bas-style-kit/body--core-scripts.pug) include to load JS files using variables, see
[Using custom CSS/JS](#using-custom-css-js) for more information.

If this loading mechanism cannot be used (e.g. inline scripts), additional JS, or other components, can be loaded by 
appending to this block.

E.g.

```pug
block append scripts
  //- ... JS/components ...
```

If the loading mechanism needs to be disabled, override this block.

E.g.

```pug
block scripts
//- ... optional replacement JS/components ...
```

**Note:** The Style Kit's JS and dependencies are referenced using the loading mechanism and will need to be manually 
referenced if the mechanism is disabled.

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
