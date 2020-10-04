import React from 'react'
import Link from 'next/link'
import { Breed, GetBreed, GetBreedIds, GetBreedWithImages } from './api/breeds';

type HomeProps = Array<{
    id: string,
    name: string,
    url: string
  }>;

export default function Home({breeds} : {breeds: HomeProps}) {
  return (
    <div>      
      {
        breeds.map(x => 
          <div>
            <img src={x.url} width="200" height="200"/>
            <Link href={`breed/${encodeURIComponent(x.id)}`}>
            {x.name}
            </Link>
          </div>)
      }
    </div>
  ) 
}

// This also gets called at build time
export async function getStaticProps() {
  const breedIds = await GetBreedIds();

  const breeds = await Promise.all(breedIds.map(async (x) => {
    const breedWithImage = await GetBreedWithImages(x, "thumb", 1, 0);
    return {
      id: breedWithImage.id,
      name: breedWithImage.name,
      url: breedWithImage.images[0].url
    }
  }));
  
  return { props: { breeds } }
}



