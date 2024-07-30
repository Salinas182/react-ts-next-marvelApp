import React from 'react';
import { CharacterCard } from '../characterCard';
import styles from './CharactersList.module.css';
import { Character } from '@/entities/character';

interface Props {
  characters: Character[];
}

export default function CharactersList({ characters = [] }: Props) {
  if (!characters?.length) {
    return <p>No characters available</p>;
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {characters?.map((character, idx) => (
          <CharacterCard
            character={character}
            key={`${character?.id}-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
