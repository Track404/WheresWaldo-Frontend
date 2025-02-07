/* eslint-disable react/prop-types */
import styles from './images.module.css';

function ImageCard({ image, isActive, title }) {
  return (
    <>
      {isActive ? (
        <div className={styles.active}>
          <img src={image} alt="imageCard" />
          <h3>{title}</h3>
        </div>
      ) : (
        <div className={styles.inactive}>
          <img src={image} alt="imageCard" />
        </div>
      )}
    </>
  );
}

export default ImageCard;
