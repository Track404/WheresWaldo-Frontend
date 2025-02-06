import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className="leftNavbar">
          <h2>Where is Waldo</h2>
        </div>
        <div className={styles.rightNavbar}>
          <Link>Play</Link>
          <Link>ScoreBoard</Link>
          <Link>Rules</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
