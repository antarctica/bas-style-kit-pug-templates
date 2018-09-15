# BAS Style Kit Pug Templates

A set of Pug templates implementing the [BAS Style Kit](https://style-kit.web.bas.ac.uk).

## Installation

### NPM package

The recommended method to use these templates is through its NPM package.

```
$ npm i @antarctica/bas-style-kit-pug-templates
```

## Usage

These templates are designed to be as modular as practical, to allow specific components to be changed or replaced. 

Components consist of:

* [layouts](#layouts)
* [includes](#includes)
* [mixins](#mixins)
* [variables](#variables) (defined in either layouts or includes)
* [blocks](#blocks) (defined in either layouts or includes)

In a typical implementation, only a layout needs to be specified. Other required components will be brought in by 
Pug's inheritance system.

### Quickstart

To use a standard page layout, create an application layout (e.g. `layouts/app.pug`) with the following:

```pug
extends ../node_modules/@antarctica/bas-style-kit-pug-templates/layouts/bas-style-kit/bsk--standard.pug

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
  - attributes.site_favicon_url = 'data:;base64,iVBORw0KGgo=';
  //- Optional - add a custom CSS file with a relative URL
  - attributes.site_styles.push({href: '/css/app.css'});
  //- Optional - add a custom JS file with a SRI value
  - attributes.site_scripts.push({href: 'https://example.com/js/example.js', integrity: 'abc123'});
  //- Optional - choose between the `bsk-container` and `bsk-container-fluid` layout container
  - bsk_attributes.container_class = 'bsk-container';
  //- Optional - add navigation menu items
  - bsk_attributes.site_nav_primary.push({title: 'Item', href: '#'});
  - bsk_attributes.site_nav_secondary.push({title: 'Dropdown', items: [{title: 'Sub-item 1', href: '#'}]});
  - bsk_attributes.site_nav_launcher.push({title: 'Related service', href: 'https://example.com'});
```

Then create a specific page/view (e.g. `view.pug`) and place some content in the `main_content` block:

```pug
extends layouts/app.pug

block main_content
  header: h1 Example content
  div ...
```

### Using custom CSS/JS

Support is provided for loading additional CSS an/or JavaScript resources, such as application or website specific 
styling or interactivity, either as references to files, or as inline content.

This support is available in all layouts which inherit from the [html](#layoutsbas-style-kithtmlpug) layout.

For file resources, variables are provided for adding URLs and optional SRI values. Files will be included in the 
relevant block automatically, after the Style Kit's own resources if a Style Kit layout is used. Inline content can be 
added manually to these same blocks for loading after files.

* CSS resources are outputted in the [styles](#styles-block) block, at the end of the `<head>` element
* JS resources are outputted in the [scripts](#scripts-block) block, at the end of the `<body>` element

For files:

* CSS files are added as a resource object to the `attributes.site_styles` variable
* JS files are added as a resource object to the `attributes.site_scripts` variable

For inline content:

* CSS content should be appended to the `styles` block
* JS content should be appended to the `scripts` block

For example:

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block append variables
  - attributes.site_scripts.push({href: 'https://cdn.web.bas.ac.uk/js-libs/jquery-3.3.1.min.js', integrity: 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8='})

//- ... Other content ...

block append scripts
  //- Files in site_scripts will be referenced before this content
  script.
    console.log('jQuery version: ' + jQuery.fn.jquery);
```

#### Resource objects

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
a resource. If specified an `integrity` attribute and will be added to the generated markup. A `crossorigin` 
attribute will also be added for 
[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) support with a 
hard-coded, `anonymous`, value. 

For example, to specify a custom CSS resource, `/css/app.css`, using a relative URL and a SRI value:

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block append variables
  - attributes.site_styles.push({href: '/css/app.css', integrity: 'abc123'});
```

If needed, you can bypass this mechanism by adding references directly to the `styles` or `scripts` blocks using the 
`block append` syntax. This might be needed for inline scripts and styles for example.

**Note:** Make sure to use `block append` and not `block`, as the latter will disable this mechanism and won't include
the Style Kit's own resources.

### Navigation menu items

Whwn using the [bsk--standard](#layoutsbas-style-kitbsk-standardpug) layout, a 
[navbar](https://style-kit.web.bas.ac.uk/components/navbar/) is included as part of the 'standard header', which 
consists of a cookie banner, navbar and site development phase banner.

This navbar consists of three menus (and other elements, documented elsewhere):

1. a primary navigation menu - aligned left, after [brand elements](#navigation-menu-branding)
2. a secondary navigation menu - aligned right, before the launcher menu
3. a navigation launcher menu - aligned right, after the secondary navigation menu

The navigation launcher is a restricted menu, used to link to other BAS websites and applications. By default it 
contains links to the [BAS public website](https://www.bas.ac.uk) and the [BAS data catalogue](https://data.bas.ac.uk). 
Other websites and applications can be added as well where relevant.

The primary and secondary navigation menu's support:

* [navbar items](https://style-kit.web.bas.ac.uk/components/navbar/#item)
* [navbar drop-down menus](https://style-kit.web.bas.ac.uk/components/navbar/#drop-down-menus)
* [navbar drop-down menu items](https://style-kit.web.bas.ac.uk/components/navbar/#drop-down-menus)

The navigation launcher menu, which is implemented as a drop-down menu, supports:

* [navbar drop-down menu items](https://style-kit.web.bas.ac.uk/components/navbar/#drop-down-menus)

* primary navigation menu items should be added to the `bsk_attributes.site_nav_primary` variable
* secondary navigation menu items should be added to the `bsk_attributes.site_nav_secondary` variable
* navigation launcher menu items should be added to the `bsk_attributes.site_nav_launcher` variable

Menu item objects have the following properties:

| Property | Data Type | Required | Allowed Values             | Example Value  | Notes                                 |
| -------- | --------- | -------- | -------------------------- | -------------- | ------------------------------------- |
| `title`  | String    | Yes      | Any string                 | `About`        | N/A                                   |
| `href`   | String    | Yes      | Any URL                    | `/about`       | Ignored if `items` property is used   |
| `items`  | Array     | No       | Array of menu item objects | N/A            | Ignored for navigation launcher items |

**Note:** The `items` property is only recursed once, deeper objects will be ignored.

For example:

```js
{
  title: 'About',
  href: '/about'
}
```

```js
{
  title: 'About',
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

```pug
- bsk_attributes.site_nav_primary.push({title: 'About', href: '/about'});
```

**Note:** These templates do not support highlighting active navigation items. You will need to add the `.bsk-active`
class to the currently active menu item, and if relevant, sub-item, manually.

### Navigation menu branding

[Navbars](https://style-kit.web.bas.ac.uk/components/navbar/) are also used to display the name/identity of a website 
or application, to remind users where they are. These elements are referred to as 'brand' elements within the Style Kit.

In the 'standard header', navbar brand elements are shown on the far left. 

Supported brand elements:

* [brand text](https://style-kit.web.bas.ac.uk/components/navbar/#brand-text) - set using the 
`bsk_attributes.site_nav_brand_text` variable
* [brand image](https://style-kit.web.bas.ac.uk/components/navbar/#brand-image) - set using the 
`bsk_attributes.site_nav_brand_img_href` variable

Brand elements can be used together or individually, with fix classes applied automatically as needed. 

Brand elements are linked to a location specified by the `bsk_attributes.site_nav_brand_href` variable, which should be
the index of each website or application (i.e. `/`).

### Site development phase

The site development phase reflects the stage of development for a website or application, e.g. alpha or live. They are
described in the Style Kit [here](https://style-kit.web.bas.ac.uk/core/colours/#development-phase-colours).

For websites or applications that are not firmly in the 'live' phase, a banner should be shown to inform users and 
request feedback. This forms part of the 'standard header' of cookie banner, navbar and site development phase banner.

In these templates, the `bsk_attributes.site_development_phase` variable is used to specify the current phase for a
website or application. When using the [bsk--standard](#layoutsbas-style-kitbsk-standardpug) layout, a banner will be 
shown automatically based on this variable.

To disable this banner, set the `bsk_attributes.site_development_phase` variable to `live-stable`. This isn't a real 
phase but separates a newly released website or application from something more mature.

#### Experimental development phase

Alternatively, the `bsk_attributes.site_development_phase` variable can be set to `experimental` to indicate where an
website or application is used for staging or other development/testing activities.

#### Custom development phase

Less commonly, the `bsk_attributes.site_development_phase` variable can be set to `custom` to display non-standard
information. This is actively discouraged, except for the following cases:

* identifying design patterns

To use a custom phase, these variables will need to be set:

* `bsk_attributes.site_development_phase` to `custom`
* `bsk_attributes.site_development_phase_custom.label_classes` to an array of classes for the label
* `bsk_attributes.site_development_phase_custom.label_text` to the text shown in a label
* `bsk_attributes.site_development_phase_custom.message_text` to the text shown alongside the label

For example:

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/bsk--standard.pug

block append variables
  - bsk_attributes.site_development_phase = 'custom';
  - bsk_attributes.site_development_phase_custom.label_classes.push('bsk-label')
  - bsk_attributes.site_development_phase_custom.label_classes.push('bsk-label-info')
  - bsk_attributes.site_development_phase_custom.label_text = 'Pattern';
  - bsk_attributes.site_development_phase_custom.message_text = 'This is an example of a design pattern, which are best practice design solutions for specific user-focused tasks and page types.';
```

## Components

Components in these templates are grouped by their kind (e.g. `layouts/foo.pug`). They are then namespaced in a 
`bas-style-kit` directory (e.g. `layouts/bas-style-kit/foo.pug`).

Components can be further divided into:

* *generic* components - minimal and neutral on which more opinionated components can be based
* *non-generic* components - which implement the Style Kit and some opinionated structures/layouts

Non-generic components are prefixed with `bsk--` (e.g. `layouts/bas-style-kit/bsk--foo.pug`).

**Note:** Generic components make no reference to the Style Kit itself and so could, in theory, be used as with other 
or no framework, however this is not officially supported and must not be relied upon.

### Layouts

Use the [bsk--standard](#layoutsbas-style-kitbsk-standardpug) layout, or if more flexibility is needed 
[bsk--base](#/layouts/bas-style-kit/bsk--base.pug), unless you have a good reason.

The generic layouts offered are only intended to act as a foundation for BAS Style Kit specific layouts. They are not
indented to be used directly.

**Note:** It is strongly recommended to use an application specific layout as an abstraction. This would inherit one of
these layouts, but prevents large numbers of views being directly dependent and gives a logical place for website or
application wide variables to be set.

#### `/layouts/bas-style-kit/blank.pug`

* type: *generic*
* inherits from: *None*
* implementation example: [tests/.../blank.pug](/tests/layouts/bas-style-kit/html.pug).

Defines lowest-level blocks and variables to be used and extended by other layouts/components.

This layout is intentionally as minimal as possible and not intended for direct use, unless non-HTML output is needed.

Page/view content should be placed in the `content` block.

#### `/layouts/bas-style-kit/html.pug`

* type: *generic*
* inherits from: [blank](#layoutsbas-style-kitblankpug)
* implementation example: [tests/.../html.pug](/tests/layouts/bas-style-kit/html.pug).

Extends the *blank* generic layout with blocks, variables and includes specific to HTML based content.

Defines a minimal, accessible, HTML5 structure with some recommended best practices for cross-platform compatibility.

Includes the mechanism for [using custom CSS and JS resources](#using-custom-cssjs).

Page/view content should be placed in the `main-content` block.

#### `/layouts/bas-style-kit/bsk--base.pug`

* type: *non-generic*
* inherits from: [html](#layoutsbas-style-kithtmlpug)
* implementation example: [tests/.../bsk--base.pug](/tests/layouts/bas-style-kit/bsk--base.pug).

Extends the *html* generic layout with includes and variables specific to the Style Kit.

References the Style Kit's CSS and JS files before any [custom CSS/JS](#using-custom-cssjs) files.

Page content is placed in a [layout container](https://style-kit.web.bas.ac.uk/core/layout/#containers) with an ID 
`#site-main-content`. The class of the container can be set using the `bsk_attributes.container_class` variable.

This layout is only recommended where the [bsk--standard.pug](#layoutsbas-style-kitbsk-standardpug) layout is
unsuitable.

Page/view content should be placed in the `main-content` block.

#### `/layouts/bas-style-kit/bsk--standard.pug`

* type: *non-generic*
* inherits from: [bsk--base.pug](#/layouts/bas-style-kit/bsk--base.pug)
* implementation example: [tests/.../bsk--standard.pug](/tests/layouts/bas-style-kit/bsk--standard.pug).

Extends the *bsk--base* layout with includes and variables to create a more opinionated, but typical, structure for 
content including the standard header (cookie notice, navbar, site development phase) and standard footer before and 
after main content.

See the [navigation menu items](#navigation-menu-items), [navigation menu branding](#navigation-menu-branding) and
[site development phase](#site-development-phase) sections for more information.

This layout is recommended to base application layouts on, unless a non-typical structure is needed.

Page/view content should be placed in the `main-content` block.

### Includes

These templates use includes extensively to allow greater customisation and modularity. Specific elements or 
functionality can be changed by overriding an include.

Includes can be split into two forms:

* *feature includes* - which implement a single feature, such as displaying the site title
* *aggregate includes* - which include other includes, such as the elements in a footer

Complex features, such as navigation menus, may be implemented using a hierarchy of aggregate and feature includes, 
again to allow specific aspects to be overridden, without needing to duplicate aspects that don't need to be changed.

Includes are intended to be small and easily understand. They are only documented here where they are more complex or
require additional context.

#### `/includes/bas-style-kit/body.pug`

* type: *non-generic*
* kind: *aggregate*

Replaces the `content` block defined in the [blank](#layoutsbas-style-kitblankpug) layout with a `<body>` element.

This creates a more complex structure with main content wrapped in one or more elements with additional content shown
before and afterwards. Also defines a block for JS files references or inline scripts.

#### `/includes/bas-style-kit/head.pug`

* type: *non-generic*
* kind: *aggregate*

Defines a `<head>` HTML element with a block for CSS file references or inline styles.

### Mixins

Mixins define common functionality in the form of functions which can optionally accept arguments and other attributes.
They help reduce duplication improving maintainability.

#### `/mixins/bas-style-kit/bsk--nav.pug`

* type: *non-generic*

Renders a navigation menu consisting of [navbar items](https://style-kit.web.bas.ac.uk/components/navbar/#item) 
and/or [navbar dropdown menu items](https://style-kit.web.bas.ac.uk/components/navbar/#drop-down-menus).

See the [Navigation menu items](#navigation-menu-items) section for more information on defining navigation menu items.

### Variables

These templates use variables extensively to allow greater customisation and modularity. As with other components, 
variables relating specifically to implementing the Style Kit are prefixed, in this case with `bsk_`.

Typically variables are placed into objects rather than being set in the global scope, for example a generic variable 
`foo` will be set as `variables.foo` and a non-generic variable as `bsk_variables.foo`.

Some variables are objects or arrays themselves, their usage will be explained in more detail where needed.

#### Changing variables

Variables can be overridden by redefining them and specifying a different value in another pug template, such as an 
application specific layout. 

Some variables should be changed to make sense, others should not be changed as they're internal to these templates.

**Note:** In Pug, variables are simply JavaScript variables so all methods and concepts that can be applied to a regular
JS variable can be used with these variables too (such as array shifting for example).

These variables should be changed or set for each website or application:

* `attributes.site_title`
* `attributes.site_description`
* `bsk_attributes.site_nav_brand_text`
* `bsk_attributes.site_nav_primary`
* `bsk_attributes.site_development_phase`
* `bsk_attributes.site_feedback_href`
* `bsk_attributes.site_footer_policies_cookies_href`
* `bsk_attributes.site_footer_policies_copyright_href`
* `bsk_attributes.site_footer_policies_privacy_href`

These variables may, but don't need to be, changed or set for each website or application:

* `attributes.site_favicon_url`
* `attributes.main_content_classes`
* `attributes.site_styles`
* `attributes.site_scripts`
* `bsk_attributes.site_nav_secondary`
* `bsk_attributes.site_nav_brand_img_href`
* `bsk_attributes.site_nav_brand_href`
* `bsk_attributes.site_nav_launcher`

These variables do not normally, and should not, need to be changed or set:

* `attributes.site_back_to_top_target_id`
* `attributes.site_main_content_target_id`
* `bsk_attributes.container_class`
* `bsk_attributes.site_nav_launcher_title`
* `bsk_attributes.site_development_phase_custom.label_classes`
* `bsk_attributes.site_development_phase_custom.label_text`
* `bsk_attributes.site_development_phase_custom.message_text`
* `bsk_attributes.site_footer_ogl_symbol_a_href`
* `bsk_attributes.site_footer_ogl_text_href`
* `bsk_attributes.site_footer_ogl_text_version`

These variables must not be changed and should be treated as read only:

* `bsk_variables.templates_version`
* `bsk_variables.bsk_version`

#### Variable reference

| Variable                                                     | Value Type | Allowed Values                                                                                  | Default Value                      | Notes                                                                           |
| ------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| `bsk_variables.templates_version`                            | String     | Any [SemVer](https://semver.org/) value                                                         | *As implemented*                   | -                                                                               |
| `bsk_variables.bsk_version`                                  | String     | Any BAS Style Kit version                                                                       | *As implemented*                   | -                                                                               |
| `attributes.site_title`                                      | String     | Any string                                                                                      | 'site title'                       | Typically 1-3 words                                                             |
| `attributes.site_description`                                | String     | Any string                                                                                      | 'site description'                 | Typically 1-2 sentences                                                         |
| `attributes.site_favicon_url`                                | String     | URL to favicon                                                                                  | *As implemented*                   | Default value is an empty favicon                                               |
| `attributes.site_back_to_top_target_id`                      | String     | CSS ID selector                                                                                 | 'site-top'                         | Set without the ID indicator (`#`)                                              |
| `attributes.site_main_content_target_id`                     | String     | CSS ID selector                                                                                 | 'site-main-content'                | Set without the ID indicator (`#`)                                              |
| ``attributes.main_content_classes`                           | Array      | List of CSS classes                                                                             | *Empty array*                      | See the [main_content_container](#main_content_container_container-block) block |
| `attributes.site_styles`                                     | Array      | Site style object                                                                               | *Empty array*                      | See [Using custom CSS/JS](#using-custom-cssjs)                                  |
| `attributes.site_scripts`                                    | Array      | Site script object                                                                              | *Empty array*                      | See [Using custom CSS/JS](#using-custom-cssjs)                                  |
| `bsk_attributes.container_class`                             | String     | `bsk-container` / `bsk-container-fluid`                                                         | 'bsk-container'                    | -                                                                               |
| `bsk_attributes.site_nav_primary`                            | Array      | Site navigation object                                                                          | *Empty array*                      | See [Navigation menu items](#navigation-menu-items)                             |
| `bsk_attributes.site_nav_secondary`                          | Array      | Site navigation object                                                                          | *Empty array*                      | See [Navigation menu items](#navigation-menu-items)                             |
| `bsk_attributes.site_nav_launcher`                           | Array      | Site navigation object (with restrictions)                                                      | *Empty array*                      | See [Navigation menu items](#navigation-menu-items)                             |
| `bsk_attributes.site_nav_launcher_title`                     | String     | Any string                                                                                      | 'Part of British Antarctic Survey' | Title of the navigation launcher drop-down menu                                 |
| `bsk_attributes.site_nav_brand_text`                         | String     | Any string                                                                                      | 'site name'                        | -                                                                               |
| `bsk_attributes.site_nav_brand_img_href`                     | String     | URL to image                                                                                    | *Empty string*                     | See [Navigation menu branding](#navigation-menu-branding)                       |
| `bsk_attributes.site_nav_brand_href`                         | String     | URL to content                                                                                  | '/'                                | See [Navigation menu branding](#navigation-menu-branding)                       |
| `bsk_attributes.site_development_phase`                      | String     | `discovery` / `alpha` / `beta` / `live` / `live-stable` / `retired` / `experimental` / `custom` | 'alpha'                            | See [Site development phase](#site-development-phase)                           |
| `bsk_attributes.site_development_phase_custom.label_classes` | Array      | List of CSS classes                                                                             | *Empty array*                      | See [Custom development phase](#custom-development-phase)                       |
| `bsk_attributes.site_development_phase_custom.label_text`    | String     | Any string                                                                                      | *Empty string*                     | See [Custom development phase](#custom-development-phase)                       |
| `bsk_attributes.site_development_phase_custom.message_text`  | String     | Any string                                                                                      | *Empty string*                     | See [Custom development phase](#custom-development-phase)                       |
| `bsk_attributes.site_feedback_href`                          | String     | URL to feedback page or other content (e.g. model overlay)                                      | '#'                                | -                                                                               |
| `bsk_attributes.site_footer_ogl_symbol_a_href`               | String     | URL to OGL information page                                                                     | *As implemented*                   | -                                                                               |
| `bsk_attributes.site_footer_ogl_text_href`                   | String     | URL to OGL information page                                                                     | *As implemented*                   | -                                                                               |
| `bsk_attributes.site_footer_ogl_text_version`                | String     | Any OGL version                                                                                 | *As implemented*                   | -                                                                               |
| `bsk_attributes.site_footer_policies_cookies_href`           | String     | URL to cookies legal policy                                                                     | `#`                                | -                                                                               |
| `bsk_attributes.site_footer_policies_copyright_href`         | String     | URL to copyright legal policy                                                                   | `#`                                | -                                                                               |
| `bsk_attributes.site_footer_policies_privacy_href`           | String     | URL to privacy legal policy                                                                     | `#`                                | -                                                                               |

Where a value is listed as '*As implemented*' the value set within these templates isn't repeated in this documentation. 
I.e. the value of the`bsk_variables.templates_version` variable doesn't change how it's used or what it represents.

**Note:** The reference above omits variables used to implement empty objects or arrays, such as `attributes` itself.

### Blocks

In Pug, Blocks act as placeholders for content, which can include actual content such as text, lists, images, etc. and
other Pug components such as includes, variables and other blocks (i.e. blocks can be nested).

The contents of a block can be set in a layout, where it is effectively global, or on a page/view basis. Blocks can also
be overridden or appended to (i.e. global content replaced/appended in specific views/pages).

Blocks are not considered *generic* or *non-generic* components.

In these templates blocks are defined in layouts:

* [layouts/bas-style-kit/blank.pug](#layoutsbas-style-kitblankpug)
  * [variables](#variables-block)
  * [content](#content-block)
* [layouts/bas-style-kit/html.pug](#layoutsbas-style-kithtmlpug)
  * [pre_main_content](#pre_main_content-block)
  * [main_content_container](#main_content_container_container-block)
  * [main_content](#main_content_container-block)
  * [post_main_content](#post_main_content_container-block)
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

If overridden, this block **MUST**:

* include the `main_content` block

If overridden, this block **SHOULD**:

* apply the `#site-main-content` selector ID
* apply the classes set by the `attributes.main_content_classes` variable

E.g.

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block main_content_container
  main#site-main-content(class=attributes.main_content_classes)
    block main_content
```

### `main_content` (block)

Defines a location for content forming a specific page/view. This is typically the only block that needs to be 
used/implemented.

### `styles` (block)

Defines a location in the HTML `<head>` element for CSS files and inline content. Includes the 
[head--core-styles](#/includes/bas-style-kit/head--core-styles.pug) include to load CSS files using variables, see
[Using custom CSS/JS](#using-custom-cssjs) for more information.

If this loading mechanism cannot be used (e.g. inline styles) additional styles, or other components, can be added by 
appending to this block.

E.g.

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block append styles
  //- ... styles/components ...
```

If the loading mechanism needs to be disabled, override this block rather than appending to it.

E.g.

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block styles
//- ... optional replacement styles/components ...
```

**Note:** The Style Kit's CSS is referenced using the loading mechanism and will need to be manually referenced if it 
is disabled.

### `scripts` (block)

Defines a location at the end of the HTML `<body>` element for JavaScript files and inline content. Includes the 
[body--core-scripts.pug](#/includes/bas-style-kit/body--core-scripts.pug) include to load JS files using variables, see
[Using custom CSS/JS](#using-custom-css-js) for more information.

If this loading mechanism cannot be used (e.g. inline scripts) additional JS, or other components, can be added by 
appending to this block.

E.g.

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block append scripts
  //- ... JS/components ...
```

If the loading mechanism needs to be disabled, override this block rather than appending to it.

E.g.

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block scripts
//- ... optional replacement JS/components ...
```

**Note:** The Style Kit's JS and dependencies are referenced using the loading mechanism and will need to be manually 
referenced if it is disabled.

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
4. close release in changelog
5. commit changes, merge with master and tag with new version
6. push the merged release to NPM [2]

**Note:** If the BAS Style Kit version changes, make sure to bump that version in `layouts/bas-style-kit/blank.pug` too.

### Publishing NPM package

To preview the contents of the NPM package:

```shell
$ docker-compose run --entrypoint='' app ash
$ docker-compose run app
$ npm pack
```

**Note:** This project includes a `.npmignore` file to exclude additional files from NPM packages.

```shell
$ docker-compose run --entrypoint='' app ash
$ npm login
$ npm publish
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

© UK Research and Innovation (UKRI), 2018, British Antarctic Survey.

You may use and re-use this software and associated documentation files free of charge in any format or medium, under 
the terms of the Open Government Licence v3.0.

You may obtain a copy of the Open Government Licence at http://www.nationalarchives.gov.uk/doc/open-government-licence/
