import { escapeForRegEx, Extension, textInputRule } from '@tiptap/core';

type InputRuleOptions = { find: string; replace: string };
export type EmojiReplacerOptions = {
  ruleConfigs: InputRuleOptions[];
  shouldUseExtraLookupSpace: boolean;
  shouldUseExtraReplacementSpace: boolean;
};

export const EmojiReplacer = Extension.create<EmojiReplacerOptions>({
  name: 'emojiReplacer',

  addOptions() {
    return {
      ruleConfigs: [],
      shouldUseExtraLookupSpace: false,
      shouldUseExtraReplacementSpace: true,
    };
  },

  addInputRules() {
    const lookupSpace = this.options.shouldUseExtraLookupSpace ? ' ' : '';
    const replacementSpace = this.options.shouldUseExtraReplacementSpace
      ? ' '
      : '';

    const createRule = (inputRule: InputRuleOptions) => {
      const basePattern = escapeForRegEx(
        `${inputRule.find.trim()}${lookupSpace}`
      );
      return textInputRule({
        find: new RegExp(`${basePattern}$`),
        replace: `${inputRule.replace.trim()}${replacementSpace}`,
      });
    };

    const rules = [
      /**
       * Place custom rules first to give higher priority.
       * Duplicate find patterns resolve with the first one found.
       * No need to filter duplicates as of now
       */
      ...this.options.ruleConfigs,

      // default rule options
      { find: `-___-`, replace: '😑' },
      { find: `:'-)`, replace: '😂' },
      { find: `':-)`, replace: '😅' },
      { find: `':-D`, replace: '😅' },
      { find: `>:-)`, replace: '😆' },
      { find: `-__-`, replace: '😑' },
      { find: `':-(`, replace: '😓' },
      { find: `:'-(`, replace: '😢' },
      { find: `>:-(`, replace: '😠' },
      { find: `O:-)`, replace: '😇' },
      { find: `0:-3`, replace: '😇' },
      { find: `0:-)`, replace: '😇' },
      { find: `0;^)`, replace: '😇' },
      { find: `O;-)`, replace: '😇' },
      { find: `0;-)`, replace: '😇' },
      { find: `O:-3`, replace: '😇' },
      { find: `:')`, replace: '😂' },
      { find: `:-D`, replace: '😃' },
      { find: `':)`, replace: '😅' },
      { find: `'=)`, replace: '😅' },
      { find: `':D`, replace: '😅' },
      { find: `'=D`, replace: '😅' },
      { find: `>:)`, replace: '😆' },
      { find: `>;)`, replace: '😆' },
      { find: `>=)`, replace: '😆' },
      { find: `;-)`, replace: '😉' },
      { find: `*-)`, replace: '😉' },
      { find: `;-]`, replace: '😉' },
      { find: `;^)`, replace: '😉' },
      { find: `B-)`, replace: '😎' },
      { find: `8-)`, replace: '😎' },
      { find: `B-D`, replace: '😎' },
      { find: `8-D`, replace: '😎' },
      { find: `:-*`, replace: '😘' },
      { find: `:^*`, replace: '😘' },
      { find: `:-)`, replace: '🙂' },
      { find: `-_-`, replace: '😑' },
      { find: `:-X`, replace: '😶' },
      { find: `:-#`, replace: '😶' },
      { find: `:-x`, replace: '😶' },
      { find: `>.<`, replace: '😣' },
      { find: `:-O`, replace: '😮' },
      { find: `:-o`, replace: '😮' },
      { find: `O_O`, replace: '😮' },
      { find: `>:O`, replace: '😮' },
      { find: `:-P`, replace: '😛' },
      { find: `:-p`, replace: '😛' },
      { find: `:-Þ`, replace: '😛' },
      { find: `:-þ`, replace: '😛' },
      { find: `:-b`, replace: '😛' },
      { find: `>:P`, replace: '😜' },
      { find: `X-P`, replace: '😜' },
      { find: `x-p`, replace: '😜' },
      { find: `':(`, replace: '😓' },
      { find: `'=(`, replace: '😓' },
      { find: `>:\\`, replace: '😕' },
      { find: `>:/`, replace: '😕' },
      { find: `:-/`, replace: '😕' },
      { find: `:-.`, replace: '😕' },
      { find: `>:[`, replace: '😞' },
      { find: `:-(`, replace: '😞' },
      { find: `:-[`, replace: '😞' },
      { find: `:'(`, replace: '😢' },
      { find: `;-(`, replace: '😢' },
      { find: `#-)`, replace: '😵' },
      { find: `%-)`, replace: '😵' },
      { find: `X-)`, replace: '😵' },
      { find: `>:(`, replace: '😠' },
      { find: `0:3`, replace: '😇' },
      { find: `0:)`, replace: '😇' },
      { find: `O:)`, replace: '😇' },
      { find: `O=)`, replace: '😇' },
      { find: `O:3`, replace: '😇' },
      { find: `</3`, replace: '💔' },
      { find: `:D`, replace: '😃' },
      { find: `=D`, replace: '😃' },
      { find: `;)`, replace: '😉' },
      { find: `*)`, replace: '😉' },
      { find: `;]`, replace: '😉' },
      { find: `;D`, replace: '😉' },
      { find: `B)`, replace: '😎' },
      { find: `8)`, replace: '😎' },
      { find: `:*`, replace: '😘' },
      { find: `=*`, replace: '😘' },
      { find: `:)`, replace: '🙂' },
      { find: `=]`, replace: '🙂' },
      { find: `=)`, replace: '🙂' },
      { find: `:]`, replace: '🙂' },
      { find: `:X`, replace: '😶' },
      { find: `:#`, replace: '😶' },
      { find: `=X`, replace: '😶' },
      { find: `=x`, replace: '😶' },
      { find: `:x`, replace: '😶' },
      { find: `=#`, replace: '😶' },
      { find: `:O`, replace: '😮' },
      { find: `:o`, replace: '😮' },
      { find: `:P`, replace: '😛' },
      { find: `=P`, replace: '😛' },
      { find: `:p`, replace: '😛' },
      { find: `=p`, replace: '😛' },
      { find: `:Þ`, replace: '😛' },
      { find: `:þ`, replace: '😛' },
      { find: `:b`, replace: '😛' },
      { find: `d:`, replace: '😛' },
      { find: `:/`, replace: '😕' },
      { find: `:\\`, replace: '😕' },
      { find: `=/`, replace: '😕' },
      { find: `=\\`, replace: '😕' },
      { find: `:L`, replace: '😕' },
      { find: `=L`, replace: '😕' },
      { find: `:(`, replace: '😞' },
      { find: `:[`, replace: '😞' },
      { find: `=(`, replace: '😞' },
      { find: `;(`, replace: '😢' },
      { find: `D:`, replace: '😨' },
      { find: `:$`, replace: '😳' },
      { find: `=$`, replace: '😳' },
      { find: `#)`, replace: '😵' },
      { find: `%)`, replace: '😵' },
      { find: `X)`, replace: '😵' },
      { find: `:@`, replace: '😠' },
      { find: `<3`, replace: '❤️' },
      { find: `/shrug`, replace: '¯\\_(ツ)_/¯' },
    ].map(createRule);

    return rules;
  },
});
