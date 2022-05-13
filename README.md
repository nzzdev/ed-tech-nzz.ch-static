Static version of nzz.ch to enable you to locally simulate an end result when developing visualisations/tools.

### Usage

The expectation is that your build system creates a dynamic index.html from a given template string while developing.

- Install package

`npm i -D nzzdev/nzz.ch-static`

- Import functions from package.

```
import {
    getHtml,
    createContentWidthQElement,
    createFullwidthQElement,
    createSubtitle,
    createParagraph  } from 'nzz.ch-static';
```

- Call __getHtml__ and pass it to the templating function of your build system.

```
return getHtml({
    // These first 3 options are the most important. Without them the static website will not function.

    // standard | longform-standard | longform-visual
    layout: 'standard',

    // Will be appended at the end of <head>.
    // File extension not needed.
    builtCssFilename: 'bundle',

    // Will appended to the end of <body>.
    // File extension not needed.
    builtJsFilename: 'bundle',

    // Create mock elements to simulate your article.
    content: `
        ${createSubtitle('Test Subtitle')}
        ${createParagraph('Test paragraph')}
        ${createFullwidthQElement('test-id')}
        ${createContentWidthQElement('test-id-2')}
    `,

    // Other options.
    author: 'Max Musterman',
    lead: 'Test lead.',
    title: 'Test title',

    // Links to other css files that need to be loaded.
    // Will be appended to <head> but before the bundled css file of your app.
    customCssLinks: [
        'https://service.sophie.nzz.ch/bundle/sophie-q@^1,sophie-input@^1,sophie-font@^1,sophie-color@^1,sophie-viz-color@^1,sophie-legend@^1.css',
    ],

    // Links to other js filed that need to be loaded.
    // Will be appended at the end of the body, but before the built js file for the app.
    customJsLinks: [
        'https://cdn.polyfill.io/v2/polyfill.min.js?features=Map,URL,Promise,fetch,URLSearchParams,Array.prototype.find,Array.prototype.findIndex,Object.entries,Array.prototype.includes,CustomEvent,Array.from,String.prototype.startsWith&flags=gated&unknown=polyfill'
    ],
});
```

### Testing

first `npm install`

#### start commands

Regular layout
```
npm start
```

Longform standard
```
npm run start-ls
```

Longform Visual
```
npm run start-lv
```
