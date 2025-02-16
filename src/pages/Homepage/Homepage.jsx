import { useContext } from 'react';
import { CurrentBackgroundContext } from '../../context/createContext';

import Navbar from '../../components/navbar/navbar';
import ImageCard from '../../components/imagesContainer/imagesContainer';
import styles from './Homepage.module.css';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { activeIndex, setActiveIndex, images } = useContext(
    CurrentBackgroundContext
  );

  const navigate = useNavigate();
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const changeBackground = () => {
    switch (activeIndex) {
      case 0:
        return styles.homepage;

      case 1:
        return styles.homepage2;

      case 2:
        return styles.homepage3;

      default:
        return styles.homepage;
    }
  };
  return (
    <>
      <Navbar />
      <div className={changeBackground()}>
        <h1 className={styles.homepageText}>
          Are you sure you can find them all
        </h1>

        <div className="card">
          <button
            className={styles.startButton}
            onClick={() => {
              navigate(`/game/${activeIndex + 1}`);
            }}
          >
            Start Game
          </button>
        </div>
        <div>
          <h2 className={styles.mapName}>Choose your map</h2>
        </div>
        <div className={styles.carousel}>
          <button onClick={handlePrev} className={styles.carouselBtn}>
            <ArrowBackIcon />
          </button>
          <div className={styles.imageContainer}>
            <ImageCard
              image={images[(activeIndex - 1 + images.length) % images.length]}
              isActive={false}
            />
            <ImageCard image={images[activeIndex]} isActive={true} />
            <ImageCard
              image={images[(activeIndex + 1) % images.length]}
              isActive={false}
            />
          </div>

          <button onClick={handleNext} className={styles.carouselBtn}>
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
