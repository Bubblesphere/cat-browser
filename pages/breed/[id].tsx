import React, { useState } from 'react';
import styles from '../../styles/Breed.module.scss';
import { Breed, getBreedIds, getDetailPageBreedData } from '../api/breeds';
import BreedAvatar from '../../shared/BreedAvatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import ALightbox from '../../shared/ALightbox';

export default function BreedPage({ breed }: { breed: Breed }): JSX.Element {
  const [showCount, setShowCount] = useState(5);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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
      <Head>
        <title key="title">Cat Breed Browser - {breed.name}</title>
        <meta
          key="meta-description"
          name="Description"
          content={`Originally from ${
            breed.origin
          }, the ${breed.name.toLowerCase()}
            usually weighs ${removeSpaces(breed.weightMetric)} kg (
            ${removeSpaces(breed.weightImperial)} lbs) and lives for
            ${removeSpaces(breed.lifeSpan)} years.`}
        />
      </Head>
      <ALightbox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentImageIndex={currentImageIndex}
        setCurrentIndex={setCurrentIndex}
        images={urls.map((x) => ({
          src: `https://cat-browser.azureedge.net/lghq/${x}.jpg`,
          placeholderSrc: `https://cat-browser.azureedge.net/lglq/${x}.jpg`
        }))}
      />
      <BreedAvatar
        alt={breed.name}
        url={breed.imagesId[0]}
        className={styles.avatar}
        lg={true}
      />
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
          {urls.map((x, i) => (
            <BreedAvatar
              alt={breed.name}
              url={x}
              key={x}
              lg={false}
              onClick={() => {
                setCurrentIndex(i);
                setIsOpen(true);
              }}
            />
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
