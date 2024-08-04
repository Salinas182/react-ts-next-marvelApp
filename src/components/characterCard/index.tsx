'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CharacterCard.module.css';
import selectedIcon from '@/assets/icons/selected.svg';
import unselectedIcon from '@/assets/icons/unselected.svg';
import { Character } from '@/entities/character';
import useFavorites from '@/hooks/useFavorites';

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  if (!character) {
    return <></>;
  }

  const { thumbnail, name, id } = character;
  const { favorites, updateFavorites } = useFavorites();
  const isFavorite = favorites.find((favorite) => favorite.name === name);

  return (
    <div className={styles.card}>
      <Link href={`/character/${id}`}>
        <div className={styles.imageContainer}>
          <Image
            src={`${thumbnail?.path}/standard_large.${thumbnail?.extension}`}
            alt={`${name} thumbnail`}
            className={styles.image}
            sizes="(max-width: 768px) 172.5px, 188.57px"
            fill
            priority
          />
        </div>
      </Link>

      <hr className={styles.separator} />

      <div className={styles.infoContainer}>
        <span className={styles.characterName}>
          <Link href={`/character/${id}`} className={styles.link}>
            {name.toUpperCase()}
          </Link>
        </span>

        <button
          className={styles.favButton}
          onClick={() => updateFavorites(character)}
        >
          <Image
            src={isFavorite ? selectedIcon : unselectedIcon}
            alt="Mark or unmark as favorite"
            className={styles.icon}
          />
        </button>
      </div>
    </div>
  );
}
