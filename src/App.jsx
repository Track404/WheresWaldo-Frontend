import './App.css';
import { useState } from 'react';
import HomePage from './pages/Homepage';
import waldoSea from './assets/waldo-first.jpg';
import waldoBakery from './assets/waldo-second.jpg';
import waldoCycling from './assets/waldo-3.jpg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CurrentBackgroundContext } from './context/createContext';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
function App() {
  //set the active image
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [waldoSea, waldoBakery, waldoCycling];

  return (
    <>
      <CurrentBackgroundContext value={{ activeIndex, setActiveIndex, images }}>
        <RouterProvider router={router} />
      </CurrentBackgroundContext>
    </>
  );
}

export default App;
