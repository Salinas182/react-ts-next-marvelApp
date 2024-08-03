'use client';

import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Character } from '@/entities/character';
import httpAdapter from '@/adapters/httpAdapter';
import { MarvelGenericResponse } from '@/entities/marvel-db';
import CharacterProfile from '@/components/characterProfile';
import { Comic } from '@/entities/comic';
import Spinner from '@/components/spinner';

interface Props {
  params: {
    id: string;
  };
}

const comicsToDisplay = 20;

export default function CharacterDetails({ params: { id } }: Props) {
  const [character, setCharacter] = useState<Character>();
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCharacterInfo(id: number) {
      try {
        setLoading(true);

        const { data: characterData } =
          await httpAdapter.get<MarvelGenericResponse>(
            `/v1/public/characters/${id}`
          );
        const { results: characterResults }: { results: Character[] } =
          characterData.data;
        setCharacter(characterResults[0]);

        const comicsParams = {
          limit: comicsToDisplay,
          orderBy: 'onsaleDate',
        };
        const { data: comicsData } =
          await httpAdapter.get<MarvelGenericResponse>(
            `/v1/public/characters/${id}/comics`,
            comicsParams
          );
        const { results: comicsResults }: { results: Comic[] } =
          comicsData.data;
        setComics(comicsResults);
      } catch (error) {
        setError(
          error instanceof AxiosError
            ? error.response?.data
            : `Error fetching data for character ${id}`
        );
      } finally {
        setLoading(false);
      }
    }

    getCharacterInfo(Number(id));
  }, []);

  if (!character) {
    return <p>No available character</p>;
  }

  return (
    <>
      {loading && <Spinner />}

      <CharacterProfile character={character} comics={comics} />

      {error && <p>{error}</p>}
    </>
  );
}
