import { describe, expect, it } from '@jest/globals';
import { sum, multiply } from '../index';

describe('Testing all the calculator functionality:', () => {

  describe('Testing sum function', () => {
    it('should sum 1 and 2 correctly', () => {
      const finalAns = sum(1, 2);
      expect(finalAns).toBe(3);
    });

    it('should sum negative numbers correctly', () => {
      expect(sum(-1, -2)).toBe(-3);
    })
  });


  describe('testing multiplication function', () => {
    it('should multiply 1 and 2 correctly', () => {
      expect(multiply(1, 3)).toBe(3);
    });

    it('should multiply -1 and -2 correctly', () => {
      expect(multiply(-1, -2)).toBe(2);
    });
  });


});