/*import React from 'react';
import Lightbox from 'react-spring-lightbox';
import styles from '../styles/lightbox.module.scss';

const CoolLightbox = ({
  currentImageIndex,
  setCurrentIndex,
  isOpen,
  setIsOpen,
  images
}) => {
  const gotoPrevious = () => {
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  };

  const gotoNext = () => {
    currentImageIndex + 1 < images.length &&
      setCurrentIndex(currentImageIndex + 1);
  };

  return (
    <Lightbox
      isOpen={isOpen}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      currentIndex={currentImageIndex}
      renderHeader={() => (
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          Close
        </button>
      )}
      // renderFooter={() => (<CustomFooter />)}
      renderPrevButton={({ canPrev }) => (
        <button
          className={styles.previousButton}
          onClick={gotoPrevious}
          disabled={!canPrev}
        >
          Previous
        </button>
      )}
      renderNextButton={({ canNext }) => (
        <button
          className={styles.nextButton}
          onClick={gotoNext}
          disabled={!canNext}
        >
          Next
        </button>
      )}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      // className="cool-class"
      // style={{ background: "grey" }}

      onClose={() => setIsOpen(false)}
      // singleClickToZoom

    />
  );
};

export default CoolLightbox;
*/
