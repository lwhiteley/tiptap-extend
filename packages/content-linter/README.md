# @tiptap-extend/content-linter

[![npm version](https://badge.fury.io/js/@tiptap-extend%2Fcontent-linter.svg)](https://badge.fury.io/js/@tiptap-extend%2Fcontent-linter)

## Description

This is a plugin to lint content within the tiptap text editor.

See example below

## Usage

```ts
import { Editor } from '@tiptap/core';
// ... extensions
import { ContentLinter } from '@tiptap-extend/content-linter';

// ... provide your own lint rules

import { BadWordsLintRule } from './rules/BadWordsLintRule';

new Editor({
  element: document.body,
  extensions: [
    // ... extensions
    ContentLinter.configure({
      composeRules: (doc) => {
        // you can define options to further configure your rule behaviours
        // the options are totally up to you
        return [new BadWordsLintRule(doc, { enabled: true })];
      },
    }),
  ],
});
```

### Writing your own LintRule

#### Simple

```ts
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import {
  findPositionsByPattern,
  ContentLinterRule,
} from '@tiptap-extend/content-linter';

export class BadWordsLintRule extends ContentLinterRule<{
  enabled: boolean;
}> {
  public regex = /\b(obviously|clearly|evidently|simply)\b/gi;

  scan() {
    this.document.descendants((node: ProseMirrorNode, position: number) => {
      if (!node.isText || !node.text) return;

      findPositionsByPattern(node.text, this.regex).forEach((match) => {
        if (this.options && !this.options?.enabled) return;

        /**
         * omitting `message`` will also omit rendering the lint icon
         **/
        this.record({
          from: position + match.startPosition,
          to: position + match.endPosition,
          // level: 'error' | 'warn'
        });
      });
    });

    return this;
  }
}
```

#### Advanced

```ts
import { EditorView } from '@tiptap/pm/view';
import {
  ContentLintIssue,
  ContentLinterRule,
} from '@tiptap-extend/content-linter';

export class HeadingLevelLintRule extends ContentLinterRule {
  fixHeader(level: number) {
    return function ({ state, dispatch }: EditorView, issue: ContentLintIssue) {
      dispatch(state.tr.setNodeMarkup(issue.from - 1, undefined, { level }));
    };
  }

  scan() {
    let lastHeadLevel: number | null = null;

    this.document.descendants((node, position) => {
      if (node.type.name === 'heading') {
        // Check whether heading levels fit under the current level
        const { level } = node.attrs;

        if (lastHeadLevel != null && level > lastHeadLevel + 1) {
          this.record({
            message: `Heading too small (${level} under ${lastHeadLevel})`,
            from: position + 1,
            to: position + 1 + node.content.size,
            fix: this.fixHeader(lastHeadLevel + 1),
            // level: 'error' | 'warn'
          });
        }
        lastHeadLevel = level;
      }
    });

    return this;
  }
}
```

### Sanple styling

```css
.tiptap .problem.error {
  background: #fdd;
  border-bottom: 1px solid #f22;
  margin-bottom: -1px;
}

.tiptap .lint-icon.error {
  display: inline-block;
  position: absolute;
  right: 2px;
  cursor: pointer;
  border-radius: 100px;
  background: #f22;
  color: white;
  font-family: times, georgia, serif;
  font-size: 15px;
  font-weight: bold;
  width: 1.1em;
  height: 1.1em;
  text-align: center;
  padding-left: 0.5px;
  line-height: 1.1em;
}

.tiptap .lint-icon:before {
  content: '!';
}
```

Inspirations:

- https://tiptap.dev/experiments/linter
- https://prosemirror.net/examples/lint

## Development

This library was generated with [Nx](https://nx.dev).

### Building

Run `nx build content-linter` to build the library.

### Running unit tests

Run `nx test content-linter` to execute the unit tests via [Jest](https://jestjs.io).
