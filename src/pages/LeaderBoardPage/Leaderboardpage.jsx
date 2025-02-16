import { useContext } from 'react';
import { CurrentBackgroundContext } from '../../context/createContext';
import { getMapUsers } from '../../api/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import UsersTable from '../../components/Table/Table';
import ImageCard from '../../components/imagesContainer/imagesContainer';
import styles from './Leaderboardpage.module.css';

import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function App() {
  const { activeIndex, setActiveIndex, images } = useContext(
    CurrentBackgroundContext
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    navigate(`/leaderboard/${id == 1 ? 3 : Number(id) - 1}`);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    navigate(`/leaderboard/${id == 3 ? 1 : Number(id) + 1}`);
  };

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

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['users', id, activeIndex],
    queryFn: getMapUsers,
    enabled: !!id,
    onSuccess: (fetchedData) => {
      console.log(fetchedData);
      // Update the local state when data is fetched
    }, // Avoid making the request if mapId is not available
  });
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className={changeBackground()}>
        <h1 className={styles.homepageText}>LeaderBoard </h1>

        <div className={styles.card}>
          <UsersTable usersData={data.data.users} />
        </div>

        <div className={styles.carousel}>
          <button onClick={handlePrev} className={styles.carouselBtn}>
            <ArrowBackIcon />
          </button>
          <div className={styles.imageContainer}>
            <ImageCard
              image={images[(activeIndex - 1 + images.length) % images.length]}
              isActive={false}
            />
            <ImageCard image={images[activeIndex]} isActive={true} />
            <ImageCard
              image={images[(activeIndex + 1) % images.length]}
              isActive={false}
            />
          </div>

          <button onClick={handleNext} className={styles.carouselBtn}>
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
