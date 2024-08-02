'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import marvelLogo from '@/assets/logos/marvel.svg';
import favoritesIcon from '@/assets/icons/Favorites.svg';
import useFavorites from '@/hooks/useFavorites';

export default function NavBar() {
  const { favorites, setShowFavorites } = useFavorites();

  return (
    <nav className={styles.nav}>
      <div className={styles.linkContainer}>
        <Link href="/" onClick={() => setShowFavorites(false)}>
          <Image src={marvelLogo} alt="Home link" />
        </Link>
      </div>

      <Link
        className={styles.favoritesContainer}
        href="/"
        onClick={() => setShowFavorites(true)}
      >
        <Image src={favoritesIcon} alt="Favorites icon" priority />
        <span className={styles.favNumber}>{favorites.length}</span>
      </Link>
    </nav>
  );
}
