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

  return (
    <div className={styles.grid}>
      <BreedAvatar url={breed.url[0]} className={styles.avatar} />
      <div className={styles.description}>
        <h1>{breed.name}</h1>
        <p>
          Originally from {breed.origin}, the{breed.name.toLowerCase()} usually
          weighs {breed.weightMetric.replaceAll(' ', '')} kg (
          {breed.weightImperial.replaceAll(' ', '')} lbs) and lives for{' '}
          {breed.lifeSpan.replaceAll(' ', '')} years.
        </p>
        <p>{breed.description}</p>
        <p>
          The breed is often characterized as{' '}
          {temperaments.slice(0, temperaments.length - 1).join(', ')} and{' '}
          {temperaments[temperaments.length - 1]}.
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
