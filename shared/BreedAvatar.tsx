import styles from '../styles/BreedAvatar.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type BreedAvatarProps = {
  name?: string;
  url: string;
  className?: string;
};

export default function BreedAvatar({
  name,
  url,
  className
}: BreedAvatarProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <LazyLoadImage alt={name} src={url} className={styles.image} />
      {name && <span className={styles.name}>{name}</span>}
    </div>
  );
}
