import { useState, useContext, useRef } from 'react';
import { useMeasure, useScroll, useMouse } from 'react-use';
import styles from './Gamepage.module.css';
import Timer from '../../components/Timer/Timer';
import { Dialog } from '@mui/material';
import { CurrentBackgroundContext } from '../../context/createContext';

const GamePage = () => {
  const { activeIndex, images } = useContext(CurrentBackgroundContext);
  const [openModal, setOpenModal] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // ✅ Measure the image size
  const [
    imageBounds,
    { width: imageWidth, height: imageHeight, left: imageLeft },
  ] = useMeasure();

  // ✅ Get scroll position
  const { x: scrollX, y: scrollY } = useScroll(containerRef);

  // ✅ Get mouse position relative to the container
  const { docX, docY } = useMouse(containerRef);

  const [normalizedClick, setNormalizedClick] = useState({ x: 0, y: 0 });

  const normalizeMousePosition = () => {
    if (!imageWidth || !imageHeight || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;

    // ✅ Adjust for centering if needed
    const offsetX = (containerWidth - imageWidth) / 2;

    // ✅ Compute relative click position
    const relativeX = docX + scrollX - imageLeft - offsetX;
    const relativeY = docY + scrollY;

    // ✅ Normalize the coordinates
    const normalizedX = relativeX / imageWidth;
    const normalizedY = relativeY / imageHeight;

    setNormalizedClick({ x: normalizedX, y: normalizedY });

    console.log('Normalized Click:', { x: normalizedX, y: normalizedY });
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
        <button
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          Open
        </button>
        <Timer />
        <Dialog open={openModal}>
          <h1>Congrats !</h1>
          <div>Enter your name </div>
          <form
            action="/users"
            method="post"
            onSubmit={() => {
              setOpenModal(false);
            }}
          >
            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" required />
            <button type="submit">Submit</button>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default GamePage;
