import React from 'react';
import styles from '../../styles/Breed.module.css'
import { GetBreed, GetBreedIds, Breed } from "../api/breeds"

export default function BreedPage({breed} : { breed: Breed}) {
    return <div>
      <h1 className={styles.breed}>{breed.name}</h1>
      <p>{breed.temperament}</p>
      <p>{breed.life_span}</p>
      <p>{breed.origin}</p>
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
  const breed = await GetBreed(params.id);
  return { props: { breed } }
}