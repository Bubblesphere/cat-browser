import Head from 'next/head';
import React from 'react';
import styles from '../styles/layout.module.scss';

export default function SiteLayout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
