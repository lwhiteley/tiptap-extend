import { Node as ProsemirrorNode } from '@tiptap/pm/model';
import { EditorView } from '@tiptap/pm/view';

export type ContentLintIssue = {
  from: number;
  to: number;
  message?: string;
  level?: 'error' | 'warn';
  fix?: (view: EditorView, lintIssue: ContentLintIssue) => void;
};

export class ContentLinterRule<TOptions = void> {
  protected document;
  protected options;

  private results: Array<ContentLintIssue> = [];

  constructor(document: ProsemirrorNode, options?: TOptions) {
    this.document = document;
    this.options = options;
  }

  record(issue: ContentLintIssue) {
    this.results.push(issue);
  }

  scan() {
    return this;
  }

  getResults() {
    return this.results;
  }
}
