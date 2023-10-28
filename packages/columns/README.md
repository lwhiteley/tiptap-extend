# @tiptap-extend/columns

This is a fork and update of https://github.com/topo-io/tiptap-extensions/tree/main/demos/column-extension

## Usage

```ts
import { Node, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { ColumnsExtension } from '@gocapsule/column-extension';
// don't forget to add styles to see the columns
import '@tiptap-extend/columns/src/lib/index.css';

new Editor({
  element: document.querySelector('.element'),
  extensions: [
    // override Document to allow columns
    StarterKit.configure({ document: false }),
    ColumnsExtension,
  ],
  content: '<p>Hello World!</p>',
});
```

## Development

This library was generated with [Nx](https://nx.dev).

### Building

Run `nx build columns` to build the library.

### Running unit tests

Run `nx test columns` to execute the unit tests via [Jest](https://jestjs.io).