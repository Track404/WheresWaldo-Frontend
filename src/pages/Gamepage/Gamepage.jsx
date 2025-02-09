import { useState, useContext, useRef } from 'react';
import { useMeasure, useScroll, useMouse } from 'react-use';
import styles from './Gamepage.module.css';
import { CurrentBackgroundContext } from '../../context/createContext';

const GamePage = () => {
  const { activeIndex, images } = useContext(CurrentBackgroundContext);
  const containerRef = useRef(null); // Reference for scrolling container
  const imageRef = useRef(null); // Reference for measuring image

  // ✅ Measure the actual displayed size of the image
  const [imageBounds, { width: imageWidth, height: imageHeight }] =
    useMeasure();

  // ✅ Get scroll position
  const { x: scrollX, y: scrollY } = useScroll(containerRef);

  // ✅ Get mouse position relative to the container
  const { docX, docY } = useMouse(containerRef);

  const [normalizedClick, setNormalizedClick] = useState({ x: 0, y: 0 });

  // ✅ Normalize mouse position dynamically
  const normalizeMousePosition = () => {
    if (imageWidth === 0 || imageHeight === 0) return;

    const relativeX = docX + scrollX;
    const relativeY = docY + scrollY;

    // Normalize coordinates based on actual image size
    const normalizedX = relativeX / imageWidth;
    const normalizedY = relativeY / imageHeight;

    setNormalizedClick({ x: normalizedX, y: normalizedY });

    console.log('Normalized Coordinates:', { x: normalizedX, y: normalizedY });
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onClick={normalizeMousePosition}
    >
      <img
        ref={(node) => {
          imageRef.current = node;
          imageBounds(node);
        }}
        src={images[activeIndex]}
        alt="Find Waldo"
        className={styles.image}
      />
      <div className={styles.coordinates}>
        <p>Normalized X: {normalizedClick.x.toFixed(3)}</p>
        <p>Normalized Y: {normalizedClick.y.toFixed(3)}</p>
      </div>
    </div>
  );
};

export default GamePage;
