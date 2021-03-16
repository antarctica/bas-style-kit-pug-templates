# BAS Style Kit Pug Templates

A set of Pug templates implementing the [BAS Style Kit](https://style-kit.web.bas.ac.uk).

## Installation

### NPM package

The recommended method to get these templates is through its NPM package,
[`@antarctica/bas-style-kit-pug-templates`](https://www.npmjs.com/package/@antarctica/bas-style-kit).

## Usage

### Quickstart

#### Standard page

To create a page in an application or website based on the standard BAS page structure, create an application layout
(e.g. `layouts/app.pug`) with the following:

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
  //- Optional - add a custom CSS file with a relative URL
  - attributes.site_styles.push({href: '/css/app.css'});
  //- Optional - add a custom JS file with a SRI value
  - attributes.site_scripts.push({href: 'https://example.com/js/example.js', integrity: 'abc123'});
  //- Optional - enable Google Analaytics
  - attributes.site_analytics.id = '1234';
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

#### Use a page pattern

To create a page in an application or website based on a [page design pattern](#page-patterns), create a view
(e.g. `views/error.pug`) with the following:

```pug
extends ../node_modules/@antarctica/bas-style-kit-pug-templates/views/bas-style-kit/[page-pattern].pug

block append variables
  - attributes.site_title = 'Example service';
  - attributes.site_description = 'Service to act as an example';
  - bsk_attributes.site_nav_brand_text = 'Example service';
  - bsk_attributes.site_development_phase = 'experimental';
  - bsk_attributes.site_footer_policies_cookies_href = '/legal/cookies';
  - bsk_attributes.site_footer_policies_copyright_href = '/legal/copyright';
  - bsk_attributes.site_footer_policies_privacy_href = '/legal/privacy';
```

Where `[page-pattern]` in the extends value is the name of a page pattern, for example:

```pug
extends ../node_modules/@antarctica/bas-style-kit-pug-templates/views/bas-style-kit/bsk--page-not-found.pug

block append variables
  - attributes.site_title = 'Example service';
  - attributes.site_description = 'Service to act as an example';
  - bsk_attributes.site_nav_brand_text = 'Example service';
  - bsk_attributes.site_development_phase = 'experimental';
  - bsk_attributes.site_footer_policies_cookies_href = '/legal/cookies';
  - bsk_attributes.site_footer_policies_copyright_href = '/legal/copyright';
  - bsk_attributes.site_footer_policies_privacy_href = '/legal/privacy';
```

#### Use a component pattern

To include a [component pattern](#component-patterns) in a view or layout include the relevant mixin and call it with
any required parameters. For example:

```pug
extends ../node_modules/@antarctica/bas-style-kit-pug-templates/layouts/bas-style-kit/bsk--standard.pug

block append variables
  - attributes.site_title = 'Example service';
  - attributes.site_description = 'Service to act as an example';
  - bsk_attributes.site_nav_brand_text = 'Example service';
  - bsk_attributes.site_development_phase = 'experimental';
  - bsk_attributes.site_footer_policies_cookies_href = '/legal/cookies';
  - bsk_attributes.site_footer_policies_copyright_href = '/legal/copyright';
  - bsk_attributes.site_footer_policies_privacy_href = '/legal/privacy';

include ../../../../mixins/bas-style-kit/bsk--pattern--item-type-header.pug

block main_content
    +pattern_item_type_header('Item type', 'Item title')
    | test content
```

### Patterns

Patterns are used to define preferred ways to pass information to users, and ask information from users, in a consistent
way. See the [Style Kit documentation](https://style-kit.web.bas.ac.uk/patterns) for more information.

There are two types of pattern used in the Style Kit and these templates:

* [pages](#page-patterns) - standalone pages designed to be used with or without customisation using [Views](#views)
* [components](#component-patterns) - inline elements designed to be used without customisation using [Mixins](#mixins)

#### Page patterns

These templates include views for all page patterns. In most cases all variants of a pattern use the same view, but with
different options. Variables and blocks are used as relevant for setting page content.

See the [Style Kit documentation](https://style-kit.web.bas.ac.uk) for general information on using these patterns.

##### 'page not found' pattern

No configuration options.

##### 'service unavailable' pattern

An required `pattern_content` block is available for:

* contact information
* details of alternative services

An optional `pattern_attributes.availability` variable is available for setting the availability line:

* a value of `closed` will show conventional text
* a value of `replaced` will show conventional text
* no value will show conventional text

##### 'problem with this service' pattern

An required `pattern_content` block is available for:

* contact information
* details of alternative services

##### 'start' pattern

A required `pattern_content_uses` block is available for

* the list of needs the service caters for, shown in the 'Use this service to:' section
  * pass an unordered list of uses [1]

A required `pattern_attributes.call_to_action_href` variable is available for setting the link of the 'Start Now' call
to action button [2].

If the call to action should be a 'Sign in to Start' button, the `pattern_attributes.call_to_action_variant` variable
can be set to `sign-in-microsoft` [3].

An optional `pattern_content` block is available for [4]:

* the 'before you start' section (using a `.bsk-before-you-start` element)
* the 'more information' section (using a `.bsk-more-information` element), including contact information

[1]

```pug
block pattern_content_type
  ul
    li use
    li another use
```

[2]

```pug
block append variables
  - pattern_attributes.call_to_action_href = '#'
```

[3]

```pug
block append variables
  - pattern_attributes.call_to_action_variant = 'sign-in-microsoft'
```

[4]

```pug
block pattern_content
  section.bsk-before-you-start
    h2.bsk-h3 Before you start
    p You need some information to use this service.

  section.bsk-more-information
    h2.bsk-h3 More information
    p Some additional information
    p You can also #[a(href='#') contact the Sample Team] for additional support.
```

##### 'sign in' pattern

A `pattern_attributes.call_to_action_href` variable is available for setting the link of the 'Start Now' call to action
button [1].

An required `pattern_content` block is available for any additional information, including contact information [2].

[1]

```pug
block append variables
  - pattern_attributes.call_to_action_href = '#'
```

[2]

```pug
block pattern_content
  section.bsk-more-information
    h2.bsk-h3 More information
    p Contact the #[a(href='#') Sample Team] for more information.
    p Contact the #[a(href='#') IT Service Desk] if you are unable to sign in.
```

#### Component patterns

These templates include mixins for all component patterns. Mixin parameters are used for customising each instance of
the component.

**Note:** Mixin parameters are positional, meaning you need to ensure values are provided in the right order to work.

See the [Style Kit documentation](https://style-kit.web.bas.ac.uk) for general information on using these patterns.

##### Item type header pattern

Parameters:

1. `item_type` the type or kind of thing the item is, e.g. if the item is a person, it's type is 'person'
2. `item_title` a label specific to the item, e.g. if the item is a person their name

```pug
+pattern_item_type_header('item_type', 'item_title')
```

For example:

```pug
+pattern_item_type_header('Person', 'Connie Watson')
```

##### ORCID iD pattern

Parameters:

1. `orcid_id` the ORCID iD of an individual as a URL

```pug
+pattern_orcid_id('ocird_id')
```

For example:

```pug
+pattern_orcid_id('https://sandbox.orcid.org/0000-0001-8373-6934')
```

### Using custom CSS/JS

Support is provided for loading additional CSS an/or JavaScript resources, such as application or website specific
styling or interactivity, either as references to files, or as inline content.

This support is available in all layouts which inherit from the `html.pug` layout.

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
  - attributes.site_scripts.push({href: 'https://cdn.web.bas.ac.uk/libs/jquery/3.3.1/jquery-3.3.1.min.js', integrity: 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8='})

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

When using the [bsk--standard](#layoutsbas-style-kitbsk-standardpug) layout, a
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

### Site analytics

To include the Google Analytics universal tracking library (gtag), set the `attributes.site_analytics.id` property to
relevant Google Analytics property ID.

**Note:** When used the anonymise IP option in Google Analytics is enabled by default.

For example:

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block append variables
  - attributes.site_analytics.id = '1234';
```

## Components

Components in these templates are grouped by their kind (e.g. `layouts/foo.pug`). They are also namespaced in a
`bas-style-kit` directory (e.g. `layouts/bas-style-kit/foo.pug`).

Components that are specific to the Style Kit are prefixed with `bsk--`.

### Views

Views are used for implementing [page patterns](#page-patterns). They are essentially layouts but with predefined page
content relevant to each pattern.

### Layouts

Layouts are 'base' templates from which views or other layouts inherit. Layouts in these templates are hierarchical,
with each layout extending the last in this order:

* `blank.pug`: lowest level layout, intentionally as minimal as possible and not intended for direct use, unless
  non-HTML output is needed
* `html.pug`: defines a minimal, accessible, HTML5 structure with some recommended best practices for cross-platform
  compatibility
* `bsk--base.pug`: intentionally implements the BAS Style Kit as minimally as possible and not intended for direct use,
  unless the bsk_standard.j2 layout is unsuitable
* `bsk--standard.pug`: defines an opinionated, conventional, page layout with a 'standard' header/footer, recommended
  as a base for application/website layouts

Layouts can be used using the extend keyword and defining content in the relevant [block](#blocks):

| Layout              | Content Block  |
| ------------------- | -------------- |
| `blank.pug`         | `content`      |
| `html.pug`          | `main_content` |
| `bsk_base.html`     | `main_content` |
| `bsk_standard.html` | `main_content` |

```pug
extends node_modules/@antarctica/bas-style-kit-pug-templates/layouts/html.pug

block main_content
  p Layout content
```

### Blocks

[Blocks](https://pugjs.org/language/inheritance.html) are used for template inheritance and provide a logical
structure/hierarchy.

Blocks are defined in [Layouts](#layouts), typically with default content using [Includes](#includes). Some blocks are
empty, designed for user content or extensibility.

To implement or override a block, redefine it in a template or view:

```pug
block example_block
  p content ...
```

To append to a block, without overriding its existing content, use `append block`:

```pug
append block example_block
  p appended content ...
```

### Includes

[Includes](https://pugjs.org/language/includes.html) are used for organising content, to make management easier, and to
allow common elements to be used in multiple places, typically in [Blocks](#blocks).

For example the content needed for [using Google Analytics](#google-analytics) is encapsulated in the
`body--analytics-script.pug` include.

### Mixins

[Mixins](https://pugjs.org/language/mixins.html) are used to provide configurable, reusable, functionality.

They are used within other components, such as the [navigation menus](#navigation-menu-items) mixin for processing
primary and secondary navigation menus the same way, and to implement [component patterns](#component-patterns).

### Variables

Various elements in these templates are configurable, such as the name of the application or website, or the CSS/JS
resources to include. A JavaScript object is used to configure these elements and should be passed to the Pug
environment.

**Note:** In Pug, variables are simply JavaScript variables so all methods and concepts that can be applied to a regular
JS variable can be used with these variables too (such as array shifting for example).

These variables should be changed or set for each website or application:

* `attributes.site_title`
* `attributes.site_description`
* `attributes.site_analytics.id`
* `bsk_attributes.site_nav_brand_text`
* `bsk_attributes.site_nav_primary`
* `bsk_attributes.site_development_phase`
* `bsk_attributes.site_feedback_href`
* `bsk_attributes.site_footer_policies_cookies_href`
* `bsk_attributes.site_footer_policies_copyright_href`
* `bsk_attributes.site_footer_policies_privacy_href`

These variables may, but don't need to be, changed or set for each website or application:

* `attributes.main_content_classes`
* `attributes.site_styles`
* `attributes.site_scripts`
* `bsk_attributes.site_favicon`
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
| `attributes.site_back_to_top_target_id`                      | String     | CSS ID selector                                                                                 | 'site-top'                         | Set without the ID indicator (`#`)                                              |
| `attributes.site_main_content_target_id`                     | String     | CSS ID selector                                                                                 | 'site-main-content'                | Set without the ID indicator (`#`)                                              |
| `attributes.main_content_classes`                            | Array      | List of CSS classes                                                                             | *Empty array*                      | See the [main_content_container](#main_content_container_container-block) block |
| `attributes.site_styles`                                     | Array      | Site style object                                                                               | *Empty array*                      | See [Using custom CSS/JS](#using-custom-cssjs)                                  |
| `attributes.site_scripts`                                    | Array      | Site script object                                                                              | *Empty array*                      | See [Using custom CSS/JS](#using-custom-cssjs)                                  |
| `attributes.site_analytics`                                  | Object     | Site analytics object                                                                           | *Empty object*                     | See [Site analytics](#site-analytics)                                           |
| `attributes.site_analytics.id`                               | String     | Google Analytics property ID                                                                    | *Not set*                          | See [Site analytics](#site-analytics)                                           |
| `bsk_attributes.site_favicon`                                | String     | `default`                                                                                       | 'default'                          | The favicon to use, use 'default' the standard BAS favicon                      |
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

## Development

Source code for this project is available from two repositories:

* [BAS GitLab](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-pug-templates) (canonical, private)
* [BAS GitHub](https://github.com/antarctica/bas-style-kit-pug-templates) (read-only mirror, public)

To create a local development environment using the *GitLab* repository [1]:

```
$ git clone https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-pug-templates.git
$ cd bas-style-kit-pug-templates/
$ docker-compose pull
$ docker-compose up
```

To create a local development environment using the *GitHub* repository:

```
$ git clone https://github.com/antarctica/bas-style-kit-pug-templates.git
$ cd bas-style-kit-pug-templates/
$ docker-compose build
$ docker-compose up
```

This will create a local website designed for testing the layouts, views and some other features of these templates
using the [Gulp](https://gulpjs.com/) task manager. The pug templates are used

Visit [localhost:9000](http://localhost:9000) to access the local website.

### Updating dependencies

If `package.json` is changed the project image will need to be rebuilt and pushed to the private BAS Docker
Repository [1].

```shell
$ cd bas-style-kit-pug-templates/
$ docker-compose build app
$ docker-compose push app
```

Periodically, dependencies should be updated to their latest versions and conflicts resolved.

The project Docker image should use the latest Node LTS release (as we don't rely on cutting edge Node features), JavaScript dependencies should be updated to their latest versions [2].

Dependencies listed in `package.json` can be checked using tools such as
[Daivd-DM](https://david-dm.org/antarctica/bas-style-kit-pug-templates?type=dev) to identify outdated versions.

[1] The first time you use this registry, you will need to authenticate using:
`docker login docker-registry.data.bas.ac.uk`

[2] To update dependencies:

```shell
# add or update package to 'package.json'
$ rm yarn.lock
$ docker-compose build app
$ docker-compose run --entrypoint="" app ash
$ mv yarn.lock ./layouts/
$ exit
$ docker-compose down
$ mv layouts/yarn.lock ./
```

**Note:** Commit the Yarn lock file, `yarn.lock`, to the repository.

#### Dependency vulnerability scanning

To ensure the security of this project, and users of the Style Kit, all dependencies are checked against
[Snyk](https://app.snyk.io/org/antarctica/project/75fd391e-fbf1-4016-b8f1-f333b5c8ab04) for vulnerabilities.

Through [Continuous Integration](#continuous-integration), on each commit current dependencies are tested and a snapshot
uploaded to Snyk. This snapshot is then monitored for vulnerabilities.

## Testing

### Continuous Integration

The BAS GitLab instance is used for
[Continuous Integration](https://gitlab.data.bas.ac.uk/web-apps/bsk/bas-style-kit-pug-templates/pipelines) using
 settings defined in `.gitlab-ci.yml`.

## GitHub mirror

A read-only mirror of this project's repository is maintained on GitHub to allow use by those outside of BAS.

Merge requests **WILL NOT** be accepted on this mirror.

## Release procedures

### Before release

1. create a release branch
3. build and push the app docker image
4. close release in changelog
5. commit changes, merge with master and tag with new version
6. push the merged release to NPM [2]

**Note:** If the BAS Style Kit version changes, make sure to bump that version in `layouts/bas-style-kit/blank.pug` too.

### Publishing NPM package

**Note:** This project includes a `.npmignore` file to exclude additional files from NPM packages.

To preview the contents of the NPM package:

```shell
$ docker-compose run --entrypoint='' app ash
$ npm pack --dry-run
```

To publish the package to NPM:

```shell
$ docker-compose run --entrypoint='' app ash
$ npm login
$ npm publish
```

### After release

1. bump the version in:
  * `package.json`
  * `layouts/bas-style-kit/blank.pug`:
    * `bsk_variables.templates_version`
2. push the app docker image [1]
3. commit changes, merge with master and close post-release branch

## Issue tracking

This project uses [issue tracking](https://trello.com/b/0Mhzizpk/bas-style-kit) to manage development of new
features/improvements and reporting bugs.

## Feedback

The maintainer of this project is the BAS Web & Applications Team, they can be contacted through the
[BAS Service Desk](mailto:servicedesk@bas.ac.uk).

## License

© UK Research and Innovation (UKRI), 2018 - 2021, British Antarctic Survey.

You may use and re-use this software and associated documentation files free of charge in any format or medium, under
the terms of the Open Government Licence v3.0.

You may obtain a copy of the Open Government Licence at http://www.nationalarchives.gov.uk/doc/open-government-licence/
