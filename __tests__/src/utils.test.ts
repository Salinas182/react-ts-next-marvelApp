import { getYearFromDate, md5Hash } from '@/utils';
import { createHash } from 'crypto';

describe('Utils', () => {
  describe('md5Hash', () => {
    it('receives a string and returns it hashed in MD5 format', () => {
      const stringToHash = 'mockString';
      const expectedResult = createHash('md5')
        .update(stringToHash)
        .digest('hex');

      const result = md5Hash(stringToHash);

      expect(result).toBe(expectedResult);
    });
  });

  describe('getYearFromDate', () => {
    it('receives a date in string format and returns only the full year', () => {
      const dateString = '2014-04-29T14:18:17-0400';
      const expectedResult = '2014';

      const result = getYearFromDate(dateString);

      expect(result).toBe(expectedResult);
    });
  });
});
