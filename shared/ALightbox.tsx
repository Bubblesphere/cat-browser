import Lightbox from 'react-image-lightbox';

const ALightbox = ({
  currentImageIndex,
  setCurrentIndex,
  isOpen,
  setIsOpen,
  images
}: {
  currentImageIndex: number;
  setCurrentIndex: (number) => void;
  isOpen: boolean;
  setIsOpen: (boolean) => void;
  images: Array<{
    src: string;
    placeholderSrc: string;
  }>;
}) => {
  if (!isOpen) return null;

  const prevIndex = (currentImageIndex + images.length - 1) % images.length;
  const nextIndex = (currentImageIndex + 1) % images.length;
  return (
    <Lightbox
      mainSrc={images[currentImageIndex].src}
      nextSrc={images[nextIndex].src}
      prevSrc={images[prevIndex].src}
      mainSrcThumbnail={images[currentImageIndex].placeholderSrc}
      nextSrcThumbnail={images[nextIndex].placeholderSrc}
      prevSrcThumbnail={images[prevIndex].placeholderSrc}
      onCloseRequest={() => setIsOpen(false)}
      onMovePrevRequest={() => setCurrentIndex(prevIndex)}
      onMoveNextRequest={() => setCurrentIndex(nextIndex)}
    />
  );
};

export default ALightbox;
