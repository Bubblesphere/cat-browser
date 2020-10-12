import React, { useState } from 'react';
import Link from 'next/link';
import { GetBreedIds, GetBreedWithImages } from './api/breeds';
import styles from '../styles/index.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import BreedAvatar from '../shared/BreedAvatar';

type HomeProps = Array<{
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}>;

export default function Home({ breeds }: { breeds: HomeProps }) {
  const [showCount, setShowCount] = useState(20);
  const actualBreeds = breeds.slice(0, showCount);

  return (
    <InfiniteScroll
      dataLength={actualBreeds.length} //This is important field to render the next data
      next={() => setShowCount(showCount + 5)}
      hasMore={breeds.length > showCount}
      loader={<h4>Loading...</h4>}
      className={styles.gallery}
    >
      {actualBreeds.map((x) => (
        <Link key={x.id} href={`breed/${encodeURIComponent(x.id)}`}>
          <a>
            <BreedAvatar name={x.name} url={x.url} />
          </a>
        </Link>
      ))}
    </InfiniteScroll>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const breedIds = await GetBreedIds();

  const breeds = await Promise.all(
    breedIds.map(async (x) => {
      const breedWithImage = await GetBreedWithImages(x, 'thumb', 1, 0);
      return {
        id: breedWithImage.id,
        name: breedWithImage.name,
        url: breedWithImage.images[0].url,
        width: breedWithImage.images[0].width,
        height: breedWithImage.images[0].height
      };
    })
  );

  return { props: { breeds } };
}
