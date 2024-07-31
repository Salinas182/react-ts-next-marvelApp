import React from 'react';
import styles from './page.module.css';
import SearchAndDisplay from '@/components/search';
import getInitialCharacters from '../api/getInitialCharacters';

export default async function Home() {
  const initialData = await getInitialCharacters();

  return (
    <main className={styles.main}>
      <SearchAndDisplay initialData={initialData} />
    </main>
  );
}
