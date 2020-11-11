import React from 'react';
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
      /* Add your own UI */
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

      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}

      /* Handle closing */
      onClose={() => setIsOpen(false)}
      /* Use single or double click to zoom */
      // singleClickToZoom

      /* react-spring config for open/close animation */
      /*pageTransitionConfig={{
        from: { transform: 'scale(0.75)', opacity: 0 },
        enter: { transform: 'scale(1)', opacity: 1 },
        leave: { transform: 'scale(0.75)', opacity: 0 },
        config: { mass: 1, tension: 320, friction: 32 }
      }}*/
    />
  );
};

export default CoolLightbox;
