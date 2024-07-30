import React from 'react';
import { createHash } from 'crypto';
import { AxiosError } from 'axios';
import CharactersList from '@/components/charactersList';
import styles from './page.module.css';
import httpAdapter from '@/adapters/httpAdapter';
import { MarvelGenericResponse } from '@/entities/marvel-db';

function md5Hash(text: string) {
  return createHash('md5').update(text).digest('hex');
}

async function getInitialCharacters() {
  try {
    const currentTimeString = new Date().getTime().toString();
    const { data } = await httpAdapter.get<MarvelGenericResponse>(
      '/v1/public/characters',
      {
        limit: 10,
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
      error: null,
    };
  } catch (error) {
    let errorMessage = 'Error fetching characters';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data ?? errorMessage;
    }

    return {
      characters: [],
      count: 0,
      error: errorMessage,
    };
  }
}

export default async function Home() {
  const { characters, count, error } = await getInitialCharacters();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={styles.main}>
      <CharactersList characters={characters} />
    </main>
  );
}
