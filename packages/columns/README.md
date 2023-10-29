# @tiptap-extend/columns

[![npm version](https://badge.fury.io/js/@tiptap-extend%2Fcolumns.svg)](https://badge.fury.io/js/@tiptap-extend%2Fcolumns)

This is a fork and update of https://github.com/topo-io/tiptap-extensions/tree/main/demos/column-extension

## Usage

```ts
import { Node, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { ColumnsExtension } from '@tiptap-extend/columns';

new Editor({
  element: document.querySelector('.element'),
  extensions: [
    StarterKit,

    // don't forget to add styles to see the columns
    ColumnsExtension,
  ],
  content: '<p>Hello World!</p>',
});
```

### Sample styling

```css
.ProseMirror .column-block {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 24px;
  padding: 8px 0;
}

.ProseMirror .column {
  overflow: hidden;
  padding: 8px;
  margin: -8px;
}

.ProseMirror-focused .column {
  border: 1px gray dashed;
  border-radius: 8px;
}
```

## Development

This library was generated with [Nx](https://nx.dev).

### Building

Run `nx build columns` to build the library.

### Running unit tests

Run `nx test columns` to execute the unit tests via [Jest](https://jestjs.io).
