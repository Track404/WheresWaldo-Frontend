import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useContext } from 'react';
import { CurrentBackgroundContext } from '../../context/createContext';
function Navbar() {
  const { activeIndex } = useContext(CurrentBackgroundContext);
  return (
    <>
      <nav className={styles.navbar}>
        <div className="leftNavbar">
          <h2>Where is Waldo</h2>
        </div>
        <div className={styles.rightNavbar}>
          <Link to="/">Play</Link>
          <Link to={`/leaderboard/${activeIndex + 1}`}>LeaderBoard</Link>
          <Link to="/rules">Rules</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
