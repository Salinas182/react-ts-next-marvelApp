import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import marvelLogo from '@/assets/logos/marvel.svg';
import favoritesIcon from '@/assets/icons/Favorites.svg';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.linkContainer}>
        <Link href="/">
          <Image src={marvelLogo} alt="Home link" />
        </Link>
      </div>
      <div className={styles.favoritesContainer}>
        <Image src={favoritesIcon} alt="Favorites icon" priority />
        <span className={styles.favNumber}>3</span>
      </div>
    </nav>
  );
}
