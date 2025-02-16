import styles from './LoadingScreen.module.css';
import { useContext } from 'react';
import { CurrentBackgroundContext } from '../../context/createContext';

function LoadingScreen() {
  const { activeIndex } = useContext(CurrentBackgroundContext);
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
      <div className={changeBackground()}>
        <h1>LOADING</h1>

        <div className={styles.wrapper}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.shadow}></div>
          <div className={styles.shadow}></div>
          <div className={styles.shadow}></div>
        </div>
      </div>
    </>
  );
}

export default LoadingScreen;
