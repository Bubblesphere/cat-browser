import React, { useState } from 'react';
import styles from '../../styles/Breed.module.scss';
import { Breed, getBreedIds, getDetailPageBreedData } from '../api/breeds';
import BreedAvatar from '../../shared/BreedAvatar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function BreedPage({ breed }: { breed: Breed }): JSX.Element {
  const [showCount, setShowCount] = useState(5);
  const urls = breed.imagesId.slice(1, showCount + 1);

  const temperaments = breed.temperament
    .split(',')
    .map((x) => x.toLowerCase().trim());

  const allTemperamentsExceptLast = temperaments
    .slice(0, temperaments.length - 1)
    .join(', ');
  const lastTemperament = temperaments[temperaments.length - 1];
  const removeSpaces = (text) => text.replace(/ /g, '');

  return (
    <div className={styles.grid}>
      <BreedAvatar url={breed.imagesId[0]} className={styles.avatar} />
      <div className={styles.description}>
        <h1>{breed.name}</h1>
        <p>
          Originally from <b>{breed.origin}</b>, the {breed.name.toLowerCase()}{' '}
          usually weighs <b>{removeSpaces(breed.weightMetric)} kg</b> (
          <b>{removeSpaces(breed.weightImperial)} lbs</b>) and lives for{' '}
          <b>{removeSpaces(breed.lifeSpan)} </b>years.
        </p>
        <p>{breed.description}</p>
        <p>
          The breed is often characterized as {allTemperamentsExceptLast} and{' '}
          {lastTemperament}.
        </p>
      </div>
      <div className={styles.galleryContainer}>
        <InfiniteScroll
          dataLength={urls.length}
          next={() => setShowCount(showCount + 5)}
          hasMore={breed.imagesId.length > showCount}
          loader={<h4>Loading...</h4>}
          className={styles.gallery}
        >
          {urls.map((x) => (
            <BreedAvatar url={x} key={x} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const breedIds = await getBreedIds();

  const paths = breedIds.map((breedId) => `/breed/${breedId}`);

  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const breedProps = await getDetailPageBreedData(params.id);
  return { props: { breed: breedProps } };
}
