'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SearchAndDisplay.module.css';
import useCharacters from '@/hooks/useCharacters';
import CharactersList from '../charactersList';
import { Character } from '@/entities/character';
import searchIcon from '@/assets/icons/search.svg';
import useDebounce from '@/hooks/useDebounce';
import useFavorites from '@/hooks/useFavorites';

interface Props {
  initialData: {
    characters: Character[];
    count: number;
  };
}

export default function SearchAndDisplay({ initialData }: Props) {
  const [input, setInput] = useState('');
  const [charactersToDisplay, setCharactersToDisplay] = useState<Character[]>(
    initialData.characters
  );
  const debouncedInput = useDebounce(input, 1000);
  const { favorites, showFavorites } = useFavorites();
  const { characters, count, loading, error } = useCharacters({
    nameInput: debouncedInput,
    initialData,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    setCharactersToDisplay(showFavorites ? favorites : initialData.characters);
    setInput('');
  }, [showFavorites]);

  return (
    <>
      {showFavorites && <h4 className={styles.favoritesTitle}>FAVORITES</h4>}

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
            value={input?.toUpperCase()}
            onChange={(event) => handleSearch(event)}
          />
        </div>

        <span className={styles.resultsCount}>
          {showFavorites ? favorites.length : count} RESULTS
        </span>

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}
      </div>

      <CharactersList
        characters={showFavorites ? charactersToDisplay : characters}
      />
    </>
  );
}
