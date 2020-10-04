import React from 'react';
import styles from '../../styles/Breed.module.scss'
import {  GetBreedIds, GetBreedWithImages } from "../api/breeds"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BreedAvatar from '../../shared/BreedAvatar';

type BreedProps = {
  id: string,
  name: string,
  temperament: string,
  lifeSpan: string,
  origin: string,
  url: string[]
};

export default function BreedPage({breed} : { breed: BreedProps}) {
    return <div className={styles.grid}>
      
      <BreedAvatar name={breed.name} url={breed.url[0]} />
      <div>
        <h1 className={styles.breed}>{breed.name}</h1>
        <p>{breed.temperament}</p>
        <p>{breed.lifeSpan}</p>
        <p>{breed.origin}</p>
      </div>
      <div>
      <LazyLoadImage
        alt={breed.name}
        src={breed.url[0]} // use normal <img> attributes as props
        className={styles.image}
        width={100}
        height={100}
      />
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