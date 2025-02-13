import { useState, useContext, useRef, use } from 'react';
import { useMeasure, useScroll, useMouse } from 'react-use';
import { useParams } from 'react-router-dom';
import styles from './Gamepage.module.css';
import ObjectFind from '../../components/ObjectFind/ObjectFind';
import Waldo from '../../assets/Character.Waldo.webp';
//import Odlaw from '../../assets/Character.Odlaw.webp';
import Timer from '../../components/Timer/Timer';
import { Dialog } from '@mui/material';
import { CurrentBackgroundContext } from '../../context/createContext';
import { getMap } from '../../api/map';
import { postUser } from '../../api/user';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const GamePage = () => {
  const { activeIndex, images } = useContext(CurrentBackgroundContext);
  const [openModal, setOpenModal] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [username, setUsername] = useState('');
  const [mapData, setMapData] = useState(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // ✅ Measure the image size
  const [
    imageBounds,
    { width: imageWidth, height: imageHeight, left: imageLeft },
  ] = useMeasure();

  // ✅ Get scroll position
  const { x: scrollX, y: scrollY } = useScroll(containerRef);

  // ✅ Get mouse position relative to the container
  const { docX, docY } = useMouse(containerRef);

  const [normalizedClick, setNormalizedClick] = useState({ x: 0, y: 0 });

  const normalizeMousePosition = () => {
    if (!imageWidth || !imageHeight || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;

    // ✅ Adjust for centering if needed
    const offsetX = (containerWidth - imageWidth) / 2;

    // ✅ Compute relative click position
    const relativeX = docX + scrollX - imageLeft - offsetX;
    const relativeY = docY + scrollY;

    // ✅ Normalize the coordinates
    const normalizedX = relativeX / imageWidth;
    const normalizedY = relativeY / imageHeight;

    setNormalizedClick({ x: normalizedX, y: normalizedY });

    console.log('Normalized Click:', { x: normalizedX, y: normalizedY });
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['map', id, activeIndex],
    queryFn: getMap,
    enabled: !!id,
    onSuccess: (fetchedData) => {
      console.log(fetchedData);
      setMapData(fetchedData); // Update the local state when data is fetched
    }, // Avoid making the request if mapId is not available
  });

  const { mutate: addUserMutation } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['map']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    addUserMutation({
      id: id,
      data: { username: username, time: Number(finalTime) },
    }); // Trigger the mutation
    setUsername(''); // Clear the input
    setOpenModal(false);
    console.log({ username: username, time: Number(finalTime) });
  };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onClick={normalizeMousePosition}
    >
      <img
        ref={(node) => {
          imageRef.current = node;
          imageBounds(node);
        }}
        src={images[activeIndex]}
        alt="Find Waldo"
        className={styles.image}
      />
      <div className={styles.coordinates}>
        <h2>Find these character:</h2>
        {data.map.Characters.map((character) => {
          return (
            <ObjectFind
              key={character.id}
              image={Waldo}
              isFind={false}
              name={character.name}
            />
          );
        })}

        <p>Normalized X: {normalizedClick.x.toFixed(3)}</p>
        <p>Normalized Y: {normalizedClick.y.toFixed(3)}</p>
        <button
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          Open
        </button>
        <Timer setFinalTime={setFinalTime} />
        <Dialog
          open={openModal}
          classes={{ paper: styles.dialogPaper }}
          BackdropProps={{ classes: { root: styles.customBackdrop } }}
        >
          <div className={styles.dialogContainer}>
            <h1>Congrats ! &#127881;</h1>
            <h2>Your time is {finalTime}s</h2>
            <form onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="username">
                Enter your name
              </label>
              <input
                className={styles.input}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="text"
                id="username"
                name="username"
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default GamePage;
