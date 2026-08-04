import { AssertionError } from 'node:assert';
import { describe, expect, it } from 'vitest';
import { assertIsNever } from '../assert';

describe(`Test fn \`${assertIsNever.name}\``, () => {
  it('should throw an error', () => {
    expect(() => assertIsNever('hello world' as never)).toThrow(
      new AssertionError({ message: '"hello world" should be `never` type', actual: 'hello world' }),
    );
  });
});
