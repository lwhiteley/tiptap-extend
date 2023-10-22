# @tiptap-extend/emoji-replacer

[![npm version](https://badge.fury.io/js/@tiptap-extend%2Femoji-replacer.svg)](https://badge.fury.io/js/@tiptap-extend%2Femoji-replacer)

## Description

This is a plugin to customize emoji replacements in the tiptap editor.
The extensions includes many default replacements which can be overriden if the `find`
option is duplicated.

see source code for the list of default configs

A usecase for this is to add replacements for emoji short codes.

See example below

## Usage

```ts
import { Editor } from '@tiptap/core';
// ... extensions
import { EmojiReplacer } from '@tiptap-extend/emoji-replacer';

new Editor({
  element: document.body,
  extensions: [
    // ... extensions
    EmojiReplacer.configure({
      // list of rule configs that will be replaced in the editor
      ruleConfigs: [
        {
          find: ':100:',
          replace: '💯',
        },
      ],
      // adds an extra space at the end of the `find` option
      shouldUseExtraLookupSpace: false,

      // adds an extra space at the end of the `replace` option
      shouldUseExtraReplacementSpace: true,
    }),
  ],
});
```

## Development

This library was generated with [Nx](https://nx.dev).

### Building

Run `nx build emoji-replacer` to build the library.

### Running unit tests

Run `nx test emoji-replacer` to execute the unit tests via [Jest](https://jestjs.io).
