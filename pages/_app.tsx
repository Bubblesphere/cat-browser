import '../styles/globals.scss';

import 'react-image-lightbox/style.css';
import SiteLayout from './siteLayout';

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
