import React, { useState } from 'react';
import Link from 'next/link';
import { BreedLandingPage, getLandingPageBreedData } from './api/breeds';
import styles from '../styles/index.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import BreedAvatar from '../shared/BreedAvatar';
import Head from 'next/head';
import { Fragment } from 'react';

export default function Home({ breeds }: { breeds: BreedLandingPage[] }) {
  const [showCount, setShowCount] = useState(20);
  const actualBreeds = breeds.slice(0, showCount);

  return (
    <Fragment>
      <Head>
        <meta
          key="meta-description"
          name="Description"
          content={`Browse over ${breeds.length} cat breeds`}
        />
      </Head>
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
              <BreedAvatar
                alt={x.name}
                name={x.name}
                url={x.imageId}
                lg={false}
              />
            </a>
          </Link>
        ))}
      </InfiniteScroll>
    </Fragment>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  const breeds = await getLandingPageBreedData();
  return { props: { breeds } };
}
