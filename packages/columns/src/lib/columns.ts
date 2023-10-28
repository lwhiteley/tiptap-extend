import { Extension } from '@tiptap/core';

import { Column } from './column';
import { ColumnBlock } from './column-block';

export interface ColumnsExtensionOptions {
  column?: boolean;
  columnBlock?: boolean;
}

export const ColumnsExtension = Extension.create<ColumnsExtensionOptions>({
  name: 'columnsExtension',

  addExtensions() {
    const extensions = [];

    if (this.options.column !== false) {
      extensions.push(Column);
    }

    if (this.options.columnBlock !== false) {
      extensions.push(ColumnBlock);
    }

    return extensions;
  },
});

export { Column, ColumnBlock };

export default ColumnsExtension;
