import React, { useState } from 'react';
import styles from '../../styles/Breed.module.scss'
import {  GetBreedIds, GetBreedWithImages } from "../api/breeds"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BreedAvatar from '../../shared/BreedAvatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CatGallery } from '../../components/catGallery';

type BreedProps = {
  id: string,
  name: string,
  temperament: string,
  lifeSpan: string,
  origin: string,
  url: string[]
};

export default function BreedPage({breed} : { breed: BreedProps}) {
  const [showCount, setShowCount] = useState(5);
  const urls = breed.url.slice(1, showCount + 1);

    return <div className={styles.grid}>
      <BreedAvatar name={breed.name} url={breed.url[0]} className={styles.avatar} />
      <div className={styles.description}>
        <h1>{breed.name}</h1>
        <p>{breed.temperament}</p>
        <p>{breed.lifeSpan}</p>
        <p>{breed.origin}</p>
      </div>
      <div className={styles.galleryContainer}>
       <InfiniteScroll
          dataLength={urls.length}
          next={() => setShowCount(showCount + 5)}
          hasMore={breed.url.length > showCount}
          loader={<h4>Loading...</h4>}
          className={styles.gallery}
        >
          {urls.map(x => 
              <BreedAvatar 
                url={x} 
                name="" 
              />
            
          )}
        </InfiniteScroll>
      </div>

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
  const breedWithImage = await GetBreedWithImages(params.id, "thumb", 15, 0);
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