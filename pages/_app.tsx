import '../styles/globals.scss';
import SiteLayout from './siteLayout';
import 'react-lazy-load-image-component/src/effects/blur.css';

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
