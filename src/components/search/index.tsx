'use client';

import React, { useState } from 'react';
import styles from './SearchAndDisplay.module.css';
import useCharacters from '@/hooks/useCharacters';
import CharactersList from '../charactersList';
import { Character } from '@/entities/character';
import searchIcon from '@/assets/icons/search.svg';
import Image from 'next/image';
import useDebounce from '@/hooks/useDebounce';

interface Props {
  initialData: {
    characters: Character[];
    count: number;
  };
}

export default function SearchAndDisplay({ initialData }: Props) {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 1000);
  const { characters, count, loading, error } = useCharacters({
    nameInput: debouncedInput,
    initialData,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <Image
            src={searchIcon}
            alt="Search Icon"
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="SEARCH A CHARACTER"
            className={styles.searchInput}
            value={input}
            onChange={(event) => handleSearch(event)}
          />
        </div>

        <span className={styles.resultsCount}>{count} RESULTS</span>

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}
      </div>

      <CharactersList characters={characters} />
    </>
  );
}
