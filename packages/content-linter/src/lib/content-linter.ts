import { Extension } from '@tiptap/core';
import { Node as ProsemirrorNode } from '@tiptap/pm/model';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { ContentLinterRule, ContentLintIssue } from './content-linter-rule';

interface IconDivElement extends HTMLDivElement {
  issue?: ContentLintIssue;
}

export interface ContentLinterOptions {
  composeRules(document: ProsemirrorNode): Array<ContentLinterRule<unknown>>;
}

function renderIcon(issue: ContentLintIssue) {
  const icon: IconDivElement = document.createElement('div');

  icon.className = `lint-icon ${issue.level}`.trim();
  icon.title = issue.message || '';
  icon.issue = issue;

  return icon;
}

function runLinterPlugins(
  document: ProsemirrorNode,
  plugins: ReturnType<ContentLinterOptions['composeRules']>
) {
  const decorations: Decoration[] = [];

  const results = plugins
    .map((plugin) => {
      return plugin.scan().getResults();
    })
    .flat();

  results.forEach((issue) => {
    const level = issue.level || 'error';
    decorations.push(
      Decoration.inline(issue.from, issue.to, {
        class: `problem ${level}`.trim(),
      })
    );

    if (issue.message) {
      decorations.push(
        Decoration.widget(issue.from, renderIcon({ ...issue, level }))
      );
    }
  });

  return DecorationSet.create(document, decorations);
}

const name = 'contentLinter';

export const ContentLinter = Extension.create<ContentLinterOptions>({
  name,

  addOptions() {
    return {
      composeRules: () => [],
    };
  },

  addProseMirrorPlugins() {
    const { composeRules: composePlugins } = this.options;

    return [
      new Plugin({
        key: new PluginKey(name),
        state: {
          init(_, { doc }) {
            const plugins = composePlugins(doc);
            return runLinterPlugins(doc, plugins);
          },
          apply(transaction, oldState) {
            if (!transaction.docChanged) return oldState;

            const plugins = composePlugins(transaction.doc);
            return runLinterPlugins(transaction.doc, plugins);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
          handleClick(view, _, event) {
            const target = event.target as IconDivElement;

            if (/lint-icon/.test(target.className) && target.issue) {
              const { from, to } = target.issue;

              view.dispatch(
                view.state.tr
                  .setSelection(TextSelection.create(view.state.doc, from, to))
                  .scrollIntoView()
              );

              return true;
            }

            return false;
          },
          handleDoubleClick(view, _, event) {
            const target = event.target as IconDivElement;

            if (
              /lint-icon/.test((event.target as HTMLElement).className) &&
              target.issue
            ) {
              const lintIssue = target.issue;

              if (lintIssue.fix) {
                lintIssue.fix(view, lintIssue);
                view.focus();
                return true;
              }
            }

            return false;
          },
        },
      }),
    ];
  },
});
