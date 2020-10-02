import React, { useState } from 'react';
import useCatService from '../hooks/useCatService';
import styles from '../styles/Cats.module.css'
import { CatGallery } from './shared/catGallery';

export default function Cats() {
  const catService = useCatService();
  const [page, setPage] = useState(1);
  
  const { data, error } = catService.allBreeds(1, page);
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  const breed = data[0];
  return <div>
    <div>
      <h1 className={styles.breed}>{breed.name}</h1>
      <p>{breed.temperament}</p>
      <p>{breed.life_span}</p>
      <p>{breed.origin}</p>
    </div>
    <div>
      <CatGallery breedId={breed.id}/>
    </div>
    <button onClick={() => setPage(page + 1)}>Next</button>
  </div>
}

