import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Timer.module.css';
// eslint-disable-next-line react/prop-types
const Timer = ({ setFinalTime, isRunning }) => {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setFinalTime(seconds);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, setFinalTime]); // Runs when `isRunning` changes

  return (
    <>
      <div className={styles.timer}>
        <div className={styles.containerTimer}>
          <h1>Time:</h1>
          <h1>{seconds}s</h1>
        </div>

        <div className={styles.containerBtn}>
          <button onClick={() => setSeconds(0)} className={styles.restartBtn}>
            Restart
          </button>

          <button
            onClick={() => {
              navigate('/');
            }}
            className={styles.restartBtn}
          >
            Quit
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
