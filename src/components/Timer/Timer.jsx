import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(0);
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
  }, [isRunning, seconds]); // Runs when `isRunning` changes

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div>{finalTime}</div>
      <h1>Timer: {seconds}s</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Restart</button>
      <button>
        <Link to="/">Quit</Link>
      </button>
    </div>
  );
};

export default Timer;
