import '../styles/globals.scss';
import SiteLayout from './siteLayout';
import 'react-image-lightbox/style.css';

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

export default MyApp;
