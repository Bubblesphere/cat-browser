import styles from '../styles/BreedAvatar.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type BreedImageProps = {
  imageId: string;
  name: string;
  size: 'squared' | 'large';
  className?: string;
  afterLoad?: () => void;
};

export default function BreedImage({
  imageId,
  name,
  size,
  className,
  afterLoad
}: BreedImageProps) {
  return (
    <LazyLoadImage
      useIntersectionObserver={true}
      threshold={100}
      alt={name}
      width={300}
      height={300}
      placeholderSrc={`https://cat-browser.azureedge.net/${
        size === 'squared' ? 'sm' : 'lg'
      }lq/${imageId}.jpg`}
      src={`https://cat-browser.azureedge.net/${
        size === 'squared' ? 'sm' : 'lg'
      }hq/${imageId}.jpg`}
      className={`${styles.image} ${className ?? ''}`}
      effect="blur"
      afterLoad={afterLoad}
    />
  );
}
