import styles from '../styles/BreedAvatar.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';

type BreedAvatarProps = {
    name: string,
    url: string
}

export default function BreedAvatar({name, url} : BreedAvatarProps) {
    return <div className={styles.container}>
    <LazyLoadImage
        alt={name}
        src={url} 
        className={styles.image}
    />
    <span className={styles.name}>{name}</span>
  </div>
}