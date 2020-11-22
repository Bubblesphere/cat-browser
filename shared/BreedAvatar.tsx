import styles from '../styles/BreedAvatar.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type BreedAvatarProps = {
  alt: string;
  name?: string;
  url: string;
  className?: string;
  lg: boolean;
  onClick?: () => void;
};

export default function BreedAvatar({
  alt,
  name,
  url,
  className,
  lg,
  onClick
}: BreedAvatarProps) {
  const StaticWrapper = (props) => (
    <div className={`${styles.container} ${className ?? ''}`}>
      {props.children}
    </div>
  );

  const ClickableWrapper = (props) => (
    <button
      onClick={onClick}
      onKeyDown={onClick}
      className={`${styles.clickableWrapper} ${styles.container} ${
        className ?? ''
      }`}
    >
      {props.children}
    </button>
  );

  const Wrapper = (props) =>
    onClick === undefined ? StaticWrapper(props) : ClickableWrapper(props);

  return (
    <Wrapper>
      <LazyLoadImage
        alt={alt}
        src={`https://cat-browser.azureedge.net/${
          lg ? 'lg' : 'sm'
        }hq/${url}.jpg`}
        className={styles.image}
      />
      {name && <span className={styles.name}>{name}</span>}
    </Wrapper>
  );
}
