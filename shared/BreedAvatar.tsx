import styles from '../styles/BreedAvatar.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type BreedAvatarProps = {
  alt: string;
  name?: string;
  url: string;
  className?: string;
  lg: boolean;
};

export default function BreedAvatar({
  alt,
  name,
  url,
  className,
  lg
}: BreedAvatarProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <LazyLoadImage
        alt={alt}
        src={`https://cat-browser.azureedge.net/${
          lg ? 'lg' : 'sm'
        }hq/${url}.jpg`}
        className={styles.image}
      />
      {name && <span className={styles.name}>{name}</span>}
    </div>
  );
}
