import './App.css';
import { useState, useEffect } from 'react';
import HomePage from './pages/Homepage/Homepage';
import LeaderboardPage from './pages/LeaderBoardPage/Leaderboardpage';
import RulesPage from './pages/RulesPage/RulesPage';
import GamePage from './pages/Gamepage/Gamepage';
import waldoSea from './assets/waldo-first.jpg';
import waldoBakery from './assets/waldo-5.jpg';
import waldoCycling from './assets/waldo-4.jpg';
import WaldoIcon from './assets/Character.Waldo.webp';
import OdlawIcon from './assets/Character.Odlaw.webp';
import WendaIcon from './assets/Character.Wenda.webp';
import WhitebeardIcon from './assets/Character.Whitebeard.webp';
import WoofIcon from './assets/Character.Woof.webp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CurrentBackgroundContext } from './context/createContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/leaderboard/:id',
    element: <LeaderboardPage />,
  },
  {
    path: '/rules',
    element: <RulesPage />,
  },
  {
    path: '/game/:id',
    element: <GamePage />,
  },
]);
function App() {
  const storedIndex = localStorage.getItem('activeIndex');
  const [activeIndex, setActiveIndex] = useState(
    storedIndex ? parseInt(storedIndex) : 0
  );

  const images = [waldoSea, waldoBakery, waldoCycling];
  const characterImages = [
    WaldoIcon,
    OdlawIcon,
    WendaIcon,
    WhitebeardIcon,
    WoofIcon,
  ];
  useEffect(() => {
    localStorage.setItem('activeIndex', activeIndex);
  }, [activeIndex]);
  return (
    <>
      <CurrentBackgroundContext
        value={{ activeIndex, setActiveIndex, images, characterImages }}
      >
        <RouterProvider router={router} />
      </CurrentBackgroundContext>
    </>
  );
}

export default App;
