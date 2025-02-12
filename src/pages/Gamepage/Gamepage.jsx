import { useState, useContext, useRef } from 'react';
import { useMeasure, useScroll, useMouse } from 'react-use';
import styles from './Gamepage.module.css';
import ObjectFind from '../../components/ObjectFind/ObjectFind';
import Waldo from '../../assets/Character.Waldo.webp';
import Odlaw from '../../assets/Character.Odlaw.webp';
import Timer from '../../components/Timer/Timer';
import { Dialog } from '@mui/material';
import { CurrentBackgroundContext } from '../../context/createContext';

const GamePage = () => {
  const { activeIndex, images } = useContext(CurrentBackgroundContext);
  const [openModal, setOpenModal] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
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
        <h2>Find these character:</h2>
        <ObjectFind image={Waldo} isFind={false} name="Waldo" />
        <ObjectFind image={Odlaw} isFind={false} name="Odlaw" />

        <p>Normalized X: {normalizedClick.x.toFixed(3)}</p>
        <p>Normalized Y: {normalizedClick.y.toFixed(3)}</p>
        <button
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          Open
        </button>
        <Timer setFinalTime={setFinalTime} />
        <Dialog
          open={openModal}
          classes={{ paper: styles.dialogPaper }}
          BackdropProps={{ classes: { root: styles.customBackdrop } }}
        >
          <div className={styles.dialogContainer}>
            <h1>Congrats ! &#127881;</h1>
            <h2>Your time is {finalTime}s</h2>
            <form
              action="/users"
              method="post"
              onSubmit={() => {
                setOpenModal(false);
              }}
            >
              <label className={styles.label} htmlFor="username">
                Enter your name
              </label>
              <input
                className={styles.input}
                type="text"
                id="username"
                name="username"
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default GamePage;
