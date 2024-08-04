import httpAdapter from '@/adapters/httpAdapter';
import { MarvelGenericResponse } from '@/entities/marvel-db';
import { md5Hash } from '@/utils';

export default async function getInitialCharacters() {
  try {
    const currentTimeString = new Date().getTime().toString();
    const { data } = await httpAdapter.get<MarvelGenericResponse>(
      '/v1/public/characters',
      {
        limit: 50,
        ts: currentTimeString,
        hash: md5Hash(
          `${currentTimeString}${process.env.MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`
        ),
      }
    );
    const { results, count } = data.data;

    return {
      characters: results,
      count,
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return {
      characters: [],
      count: 0,
    };
  }
}
