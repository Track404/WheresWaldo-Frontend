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
        <h1 className={styles.homepageText}>Rules </h1>

        <div className={styles.card}>
          <h2>Objective:</h2>
          <p>
            The objective of <strong>Where is Waldo?</strong> is to find Waldo,
            a character wearing a red-and-white striped shirt, blue pants, and
            glasses, hidden somewhere in a detailed, crowded illustration. Each
            page of the book or game contains a scene filled with numerous
            characters and objects, and Waldo is typically tucked somewhere in
            the midst of the chaos. The goal is to spot Waldo as quickly as
            possible.
          </p>

          <h2>Basic Rules:</h2>
          <ul>
            <li>
              <span>Starting the Game:</span> Begin with a page or scene that
              contains Waldo (and possibly other hidden characters, objects, or
              items).
            </li>
            <li>
              <span>Looking for Waldo:</span> Scan the image carefully. The
              images are full of intricate details, and Waldo will always be in
              the image but cleverly hidden.
            </li>

            <li>
              <span>Game Levels:</span> Difficulty increases as the scenes
              become more complex. More people, objects, and distractions make
              it harder to spot Waldo.
            </li>

            <li>
              <span>Winning the Game:</span> The goal is to find all the hidden
              items (including Waldo) within a single round. Once you find them
              all, the time you took to find them will be recorded. The faster
              you complete it, the better your time.
            </li>
          </ul>

          <h2>Tips for Finding Waldo:</h2>
          <ul>
            <li>
              Start by identifying familiar features like Waldo is red-and-white
              striped shirt, glasses, and blue pants.
            </li>
            <li>
              Focus on smaller sections of the scene rather than scanning the
              entire image at once.
            </li>
            <li>
              Look for Waldo’s characteristic pose, as he stands out from the
              rest of the crowd.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default RulesPage;
