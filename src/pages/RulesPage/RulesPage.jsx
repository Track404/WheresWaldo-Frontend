import { useContext } from 'react';
import { CurrentBackgroundContext } from '../../context/createContext';

import Navbar from '../../components/navbar/navbar';

import styles from './Rulespage.module.css';

function RulesPage() {
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
      <Navbar />
      <div className={changeBackground()}>
        <h1 className={styles.homepageText}>Rules Page</h1>

        <div className={styles.card}></div>
      </div>
    </>
  );
}

export default RulesPage;
