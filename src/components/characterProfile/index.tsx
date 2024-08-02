'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CharacterProfile.module.css';
import { Character } from '@/entities/character';
import unselectedIcon from '@/assets/icons/unselected.svg';
import selectedIcon from '@/assets/icons/selected.svg';
import { Comic } from '@/entities/comic';
import ComicsList from '../comicsList';
import useFavorites from '@/hooks/useFavorites';

export default function CharacterProfile({
  character,
  comics = [],
}: {
  character: Character;
  comics: Comic[];
}) {
  if (!character) {
    return <></>;
  }

  const { favIds, updateFavIds } = useFavorites();
  const { thumbnail, name, id } = character;
  const isFavorite = favIds.find((favId) => favId === id);

  return (
    <>
      <div className={styles.resumeContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={`${thumbnail?.path}/standard_fantastic.${thumbnail?.extension}`}
            alt={`${name} profile picture`}
            className={styles.image}
            sizes="(max-width: 481px) 393px, (max-width: 1024px) 278px, 320px"
            fill
            priority
          />
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoTopRow}>
            <span className={styles.name}>{character.name.toUpperCase()}</span>

            <button
              className={styles.favButton}
              onClick={() => updateFavIds(id)}
            >
              <Image
                src={isFavorite ? selectedIcon : unselectedIcon}
                alt="Mark or unmark as favorite"
                className={styles.icon}
              />
            </button>
          </div>

          <p className={styles.description}>{character.description}</p>
        </div>
      </div>

      {comics?.length && (
        <div className={styles.comicsContainer}>
          <h4 className={styles.comicsTitle}>COMICS</h4>

          <ComicsList comics={comics} />
        </div>
      )}
    </>
  );
}
