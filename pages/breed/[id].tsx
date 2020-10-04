import React, { useState } from 'react';
import styles from '../../styles/Breed.module.scss'
import {  GetBreedIds, GetBreedWithImages } from "../api/breeds"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BreedAvatar from '../../shared/BreedAvatar';
import InfiniteScroll from 'react-infinite-scroll-component';

type BreedProps = {
  id: string,
  name: string,
  temperament: string,
  lifeSpan: string,
  origin: string,
  url: string[]
};

export default function BreedPage({breed} : { breed: BreedProps}) {
  const [showCount, setShowCount] = useState(10);
  const urls = breed.url.slice(1, showCount + 1);

    return <div className={styles.grid}>
      <BreedAvatar name={breed.name} url={breed.url[0]} />
      <div className={styles.description}>
        <p>{breed.temperament}</p>
        <p>{breed.lifeSpan}</p>
        <p>{breed.origin}</p>
      </div>
      <InfiniteScroll
        dataLength={urls.length}
        next={() => setShowCount(showCount + 5)}
        hasMore={urls.length > showCount}
        loader={<h4>Loading...</h4>}
        className={styles.gallery}
      >
        {urls.map(x => <BreedAvatar name="" url={x} />)}
      </InfiniteScroll>
  </div>
}

// This function gets called at build time
export async function getStaticPaths() {
  const breedIds = await GetBreedIds();
  
  const paths = breedIds.map((breedId) => `/breed/${breedId}`);

  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const breedWithImage = await GetBreedWithImages(params.id, "thumb", 20, 0);
  const breedProps: BreedProps = {
    id: breedWithImage.id,
    name: breedWithImage.name,
    temperament: breedWithImage.temperament,
    lifeSpan: breedWithImage.life_span,
    origin: breedWithImage.origin,
    url: breedWithImage.images.map(x => x.url)
  }
  return { props: { breed: breedProps } }
}