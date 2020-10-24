import React, { useState } from 'react';
import Link from 'next/link';
import { BreedLandingPage, getLandingPageBreedData } from './api/breeds';
import styles from '../styles/index.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import BreedAvatar from '../shared/BreedAvatar';

export default function Home({ breeds }: { breeds: BreedLandingPage[] }) {
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
            <BreedAvatar name={x.name} url={x.imageId} />
          </a>
        </Link>
      ))}
    </InfiniteScroll>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const breeds = await getLandingPageBreedData();
  return { props: { breeds } };
}
