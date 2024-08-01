'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ComicsList.module.css';
import { Comic } from '@/entities/comic';
import { getYearFromDate } from '@/utils';

export default function ComicsList({ comics }: { comics: Comic[] }) {
  if (!comics.length) {
    return <></>;
  }

  return (
    <div className={styles.comicsList}>
      {comics.map((comic, index) => {
        const onSaleDate = comic.dates.find(
          (date) => date.type === 'onsaleDate'
        );
        const onSaleYear = onSaleDate
          ? getYearFromDate(onSaleDate.date)
          : 'Unknown';

        return (
          <div className={styles.comicCard} key={`comic-${comic.id}-${index}`}>
            <div className={styles.imageContainer}>
              <Image
                src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                alt={`${comic.title} thumbnail`}
                className={styles.image}
                sizes="(max-width: 480px) 164px, (max-width: 1024px) 168.53px, 179.2px"
                fill
                priority
              />
            </div>

            <div className={styles.comicInfo}>
              <span className={styles.comicTitle}>{comic.title}</span>

              <span className={styles.comicYear}>{onSaleYear}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
