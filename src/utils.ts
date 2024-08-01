import { createHash } from 'crypto';

export function md5Hash(text: string): string {
  return createHash('md5').update(text).digest('hex');
}

export function getYearFromDate(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}
