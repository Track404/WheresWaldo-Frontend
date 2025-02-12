import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Timer = ({ setFinalTime }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

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
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Timer: {seconds}s</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Restart</button>
      <button>
        <Link
          to="/"
          onClick={() => {
            return confirm('Are you sure you want to quit the game ?');
          }}
        >
          Quit
        </Link>
      </button>
    </div>
  );
};

export default Timer;
