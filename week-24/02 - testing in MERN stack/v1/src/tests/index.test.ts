import { describe, expect, it } from '@jest/globals';
import { sum } from '../index';

describe('Testing sum function', () => {

  it('should sum 1 and 2 correctly', () => {
    const finalAns = sum(1, 2);
    expect(finalAns).toBe(3);
  });

  it('should sum negative numbers correctly', () => {
    expect(sum(-1, -2)).toBe(-3);
  })

});