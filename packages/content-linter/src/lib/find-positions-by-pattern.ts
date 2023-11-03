export function findPositionsByPattern(text: string, pattern: RegExp) {
  // Use RegExp.exec() to find all matches
  let match;
  const positionsAndOffsets = [];

  while ((match = pattern.exec(text)) !== null) {
    const startPosition = match.index;
    const endPosition = match.index + match[0].length;
    const content = match[0];

    positionsAndOffsets.push({
      startPosition,
      endPosition,
      content,
    });
  }

  return positionsAndOffsets;
}
