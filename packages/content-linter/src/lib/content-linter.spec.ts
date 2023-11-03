import { ContentLinter } from './content-linter';

describe('contentLinter', () => {
  it('should use predefined name', () => {
    expect(ContentLinter.name).toEqual('contentLinter');
  });
});
