import React, { useState } from 'react'
import Link from 'next/link'
import { Breed, GetBreed, GetBreedIds, GetBreedWithImages } from './api/breeds';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type HomeProps = Array<{
    id: string,
    name: string,
    url: string
  }>;

export default function Home({breeds} : {breeds: HomeProps}) {
  const [showCount, setShowCount] = useState(10);
  const actualBreeds = breeds.slice(0, showCount);

  return (
  <InfiniteScroll
    dataLength={actualBreeds.length} //This is important field to render the next data
    next={() => setShowCount(showCount + 5)}
    hasMore={breeds.length > showCount}
    loader={<h4>Loading...</h4>}
  >
    {actualBreeds.map(x => 
          <div>
            <LazyLoadImage
              alt={x.name}
              height={200}
              src={x.url} // use normal <img> attributes as props
              width={200} />
            <Link href={`breed/${encodeURIComponent(x.id)}`}>
            {x.name}
            </Link>
          </div>)}
  </InfiniteScroll>
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



