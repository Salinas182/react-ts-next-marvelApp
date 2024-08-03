'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import httpAdapter from '@/adapters/httpAdapter';
import { Character } from '@/entities/character';
import { MarvelGenericResponse } from '@/entities/marvel-db';

interface Props {
  initialData: {
    characters: Character[];
    count: number;
  };
  nameInput?: string;
}

export default function useCharacters({
  nameInput = '',
  initialData = { characters: [], count: 0 },
}: Props) {
  const [characters, setCharacters] = useState<Character[]>(
    initialData.characters
  );
  const [count, setCount] = useState(initialData.count);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCharacters(query: string) {
      setLoading(true);
      setError(null);

      try {
        const params = {
          nameStartsWith: query.trim(),
        };

        const { data } = await httpAdapter.get<MarvelGenericResponse>(
          '/v1/public/characters',
          params
        );

        const { results, count } = data.data;
        setCharacters(results);
        setCount(count);
      } catch (error) {
        setError(
          error instanceof AxiosError
            ? error.response?.data
            : 'Error fetching characters'
        );
      } finally {
        setLoading(false);
      }
    }

    if (nameInput.trim() === '') {
      setCharacters(initialData.characters);
      setCount(initialData.count);
      setLoading(false);
      return;
    }

    getCharacters(nameInput);
  }, [nameInput]);

  return {
    characters,
    count,
    loading,
    error,
  };
}
