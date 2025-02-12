/* eslint-disable react/prop-types */
import styles from './ObjectFind.module.css';

function ObjectFind({ image, isFind, name }) {
  return (
    <>
      {isFind ? (
        <div className={styles.find}>
          <img src={image} alt="imageCard" />
          <h3>{name}</h3>
        </div>
      ) : (
        <div className={styles.notFind}>
          <img src={image} alt="imageCard" className={styles.img} />
          <h3>{name}</h3>
        </div>
      )}
    </>
  );
}

export default ObjectFind;
