[![Build Status](https://circleci.com/gh/almanac-news/almanac-web.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/almanac-news/almanac-web)

[![Coverage Status](https://coveralls.io/repos/almanac-news/almanac-web/badge.svg?branch=dev&service=github)](https://coveralls.io/github/almanac-news/almanac-web?branch=dev)

Almanac News
=======================

Table of Contents
-----------------
1. [Requirements](#requirements)
1. [Features](#features)
1. [Getting Started](#getting-started)
1. [Usage](#usage)
1. [Structure](#structure)
1. [Webpack](#webpack)
1. [Styles](#styles)
1. [Testing](#testing)
1. [Utilities](#utilities)
1. [Troubleshooting](#troubleshooting)

Requirements
------------

Node `^4.0.0` or `^5.0.0` ([npm3](https://www.npmjs.com/package/npm3) recommended).

Features
--------

* [React](https://github.com/facebook/react) (`^0.14.0`)
  * Includes react-addons-test-utils (`^0.14.0`)
* [Redux](https://github.com/gaearon/redux) (`^3.0.0`)
  * react-redux (`^4.0.0`)
  * redux-devtools
    * use `npm run dev:nw` to display in a separate window.
  * redux-thunk middleware
* [react-router](https://github.com/rackt/react-router) (`^1.0.0`)
* [redux-simple-router](https://github.com/jlongster/redux-simple-router) (`^0.0.10`)
* [Karma](https://github.com/karma-runner/karma)
  * Mocha w/ Chai, Sinon-Chai, and Chai-as-Promised
  * PhantomJS
  * Code coverage reports
* [Babel](https://github.com/babel/babel)
  * `react-transform-hmr` for hot reloading
  * `react-transform-catch-errors` with `redbox-react` for more visible error reporting
  * Uses babel runtime rather than inline transformations
* [Webpack](https://github.com/webpack/webpack)
  * Separates application code from vendor dependencies
  * dev middleware and HMR via Express middleware
  * sass-loader with CSS extraction
  * postcss-loader with cssnano for style autoprefixing and minification
  * Pre-configured folder aliases and globals
* [ESLint](http://eslint.org)
  * Uses [Airbnb's ESLint config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) (with some softened rules)
  * Includes separate test-specific `.eslintrc` to work with Mocha and Chai

Usage
-----

Before delving into the descriptions for each available npm script, here's a brief summary of the three which will most likely be your bread and butter:

* Doing live development? Use `npm start` to spin up the dev server.
* Compiling the application to disk? Use `npm run compile`.
* Deploying to an environment? `npm run deploy` can help with that.

**NOTE**: Deploying to a specific environment? Make sure to specify your target NODE_ENV so webpack will use the correct configuration. For example: `NODE_ENV=production npm run compile` will compile your application with `~/build/webpack/production.js`.

Great, now that introductions have been made here's everything in full detail:

#### `npm start` (alias for `npm run dev`)
Runs the webpack build system with HMR enabled (by default found at `localhost:3000`).

#### `npm run dev:nw`
Same as `npm start` but opens the redux dev tools in a new window.

**Note:** you'll need to allow popups in Chrome for this to work. Refer to [Troubleshooting](#troubleshooting) for more on this.

#### `npm run dev:no-debug`
Same as `npm start` but disables redux dev tools.

#### `npm run compile`
Runs the webpack build system **with your current NODE_ENV** and compiles the application to disk (`~/dist` by default).

#### `npm run test`
Runs unit tests with Karma and generates coverage reports.

#### `npm run test:dev`
Similar to `npm run test`, but will watch for changes and re-run tests; does not generate coverage reports.

#### `npm run lint`
Runs ESLint against all `.js` files in `~/src`. This used to be a webpack preloader, but the browser console output could get fairly ugly. If you want development-time linting, consider using an ESLint plugin for your text editor.

#### `npm run lint:tests`
Lints all `.spec.js` files in of `~/tests`.

#### `npm run deploy`
Helper script to run linter, tests, and then, on success, compile your application to disk.

### Configuration

Basic project configuration can be found in `~/config/index.js`. Here you'll be able to redefine your `src` and `dist` directories, add/remove aliases, tweak your vendor dependencies, and more. For the most part, you should be able to make your changes in here without ever having to touch the webpack build configuration.

Common configuration options:

* `dir_src` - application source code base path
* `dir_dist` - path to build compiled application to
* `server_host` - hostname for the express server
* `server_port` - port for the express server
* `production_enable_source_maps` - create source maps in production?
* `vendor_dependencies` - packages to separate into to the vendor bundle.

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Express application (uses webpack middleware)
│   └── app.js               # Server application entry point
├── src                      # Application source code
│   ├── actions              # Redux action creators
│   ├── components           # Generic React Components (generally Dumb components)
│   ├── containers           # Components that provide context (e.g. Redux Provider)
│   ├── layouts              # Components that dictate major page structure
│   ├── reducers             # Redux reducers
│   ├── routes               # Application route definitions
│   ├── store                # Redux store configuration
│   ├── utils                # Generic utilities
│   ├── views                # Components that live at a route
│   └── app.js               # Application bootstrap and rendering
└── tests                    # Unit tests
```

### Components vs. Views vs. Layouts

**TL;DR:** They're all components.

This distinction may not be important for you, but as an explanation: A **Layout** is something that describes an entire page structure, such as a fixed navigation, viewport, sidebar, and footer. Most applications will probably only have one layout, but keeping these components separate makes their intent clear. **Views** are components that live at routes, and are generally rendered within a **Layout**. What this ends up meaning is that, with this structure, nearly everything inside of **Components** ends up being a dumb component.

Webpack
-------

### Configuration
The webpack compiler configuration is located in `~/build/webpack`. Here you'll find configurations for each environment; `development`, `production`, and `development_hot` exist out of the box. These configurations are selected based on your current `NODE_ENV`, with the exception of `development_hot` which will _always_ be used during live development.

**Note**: There has been a conscious decision to keep development-specific configuration (such as hot-reloading) out of `.babelrc`. By doing this, it's possible to create cleaner development builds (such as for teams that have a `dev` -> `stage` -> `production` workflow) that don't, for example, constantly poll for HMR updates.

So why not just disable HMR? Well, as a further explanation, enabling `react-transform-hmr` in `.babelrc` but building the project without HMR enabled (think of running tests with `NODE_ENV=development` but without a dev server) causes errors to be thrown, so this decision also alleviates that issue.

### Vendor Bundle
You can redefine which packages to treat as vendor dependencies by editing `vendor_dependencies` in `~/config/index.js`. These default to:

```js
[
  'history',
  'react',
  'react-redux',
  'react-router',
  'redux-simple-router',
  'redux'
]
```

### Aliases
As mentioned in features, the default webpack configuration provides some globals and aliases to make your life easier. These can be used as such:

```js
// current file: ~/src/views/some/nested/View.js
import SomeComponent from '../../../components/SomeComponent'; // without alias
import SomeComponent from 'components/SomeComponent'; // with alias
```

Available aliases:
```js
actions     => '~/src/actions'
components  => '~/src/components'
constants   => '~/src/constants'
containers  => '~/src/containers'
layouts     => '~/src/layouts'
reducers    => '~/src/reducers'
routes      => '~/src/routes'
services    => '~/src/services'
store       => `~/src/store`
styles      => '~/src/styles'
utils       => '~/src/utils'
views       => '~/src/views'
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/index.js`.

#### `__DEV__`
True when `process.env.NODE_ENV` is `development`

#### `__PROD__`
True when `process.env.NODE_ENV` is `production`

#### `__DEBUG__`
True when the compiler is run with `--debug` (any environment).

Styles
------

All `.scss` imports will be run through the sass-loader and extracted during production builds. If you're importing styles from a base styles directory (useful for generic, app-wide styles), you can make use of the `styles` alias, e.g.:

```js
// current file: ~/src/components/some/nested/component/index.jsx
import 'styles/core.scss'; // this imports ~/src/styles/core.scss
```

Furthermore, this `styles` directory is aliased for sass imports, which further eliminates manual directory traversing; this is especially useful for importing variables/mixins.

Here's an example:

```scss
// current file: ~/src/styles/some/nested/style.scss
// what used to be this (where base is ~/src/styles/_base.scss):
@import '../../base';

// can now be this:
@import 'base';
```

Testing
-------

To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them.

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/index.js`.

Utilities
---------

This boilerplate comes with two simple utilities (thanks to [StevenLangbroek](https://github.com/StevenLangbroek)) to help speed up your Redux development process. In `~/client/utils` you'll find exports for `createConstants` and `createReducer`. The former is pretty much an even lazier `keyMirror`, so if you _really_ hate typing out those constants you may want to give it a shot. Check it out:

```js
import { createConstants } from 'utils';

export default createConstants(
  'TODO_CREATE',
  'TODO_DESTROY',
  'TODO_TOGGLE_COMPLETE'
);
```

The other utility, `create-reducer`, is designed to expedite creating reducers when they're defined via an object map rather than switch statements. As an example, what once looked like this:

```js
import { TODO_CREATE } from 'constants/todo';

const initialState = [];
const handlers = {
  [TODO_CREATE] : (state, payload) => { ... }
};

export default function todo (state = initialState, action) {
  const handler = handlers[action.type];

  return handler ? handler(state, action.payload) : state;
}
```

Can now look like this:

```js
import { TODO_CREATE }   from 'constants/todo';
import { createReducer } from 'utils';

const initialState = [];

export default createReducer(initialState, {
  [TODO_CREATE] : (state, payload) => { ... }
});
```

Troubleshooting
---------------

### `npm run dev:nw` produces `cannot read location of undefined.`

This is most likely because the new window has been blocked by your popup blocker, so make sure it's disabled before trying again.
