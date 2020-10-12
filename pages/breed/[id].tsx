import React, { useState } from 'react';
import styles from '../../styles/Breed.module.scss';
import { GetBreedIds, GetBreedWithImages } from '../api/breeds';
import BreedAvatar from '../../shared/BreedAvatar';
import InfiniteScroll from 'react-infinite-scroll-component';

type BreedProps = {
  id: string;
  name: string;
  description: string;
  temperament: string;
  lifeSpan: string;
  origin: string;
  weightImperial: string;
  weightMetric: string;
  url: string[];
};

export default function BreedPage({
  breed
}: {
  breed: BreedProps;
}): JSX.Element {
  const [showCount, setShowCount] = useState(5);
  const urls = breed.url.slice(1, showCount + 1);

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
      <BreedAvatar url={breed.url[0]} className={styles.avatar} />
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
          hasMore={breed.url.length > showCount}
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
  const breedIds = await GetBreedIds();

  const paths = breedIds.map((breedId) => `/breed/${breedId}`);

  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const breedWithImage = await GetBreedWithImages(params.id, 'thumb', 15, 0);
  const breedProps: BreedProps = {
    id: breedWithImage.id,
    name: breedWithImage.name,
    description: breedWithImage.description,
    temperament: breedWithImage.temperament,
    lifeSpan: breedWithImage.life_span,
    origin: breedWithImage.origin,
    weightImperial: breedWithImage.weight.imperial,
    weightMetric: breedWithImage.weight.metric,
    url: breedWithImage.images.map((x) => x.url)
  };
  return { props: { breed: breedProps } };
}
