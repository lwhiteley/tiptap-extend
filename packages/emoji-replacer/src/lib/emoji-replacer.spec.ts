import { EmojiReplacer } from './emoji-replacer';

describe('EmojiReplacer', () => {
  it('should use predefined name', () => {
    expect(EmojiReplacer.name).toEqual('emojiReplacer');
  });
});
