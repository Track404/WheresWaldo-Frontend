import { useState, useContext, useRef, useEffect } from 'react';
import { useMeasure, useMouse } from 'react-use';
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
  const [isRunning, setIsRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(0);
  const [username, setUsername] = useState('');
  const [characterData, setCharacterData] = useState(null);
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

  // ✅ Get mouse position relative to the container
  const { docX, docY } = useMouse(containerRef);

  const [normalizedClick, setNormalizedClick] = useState({ x: 0, y: 0 });
  const normalizeMousePosition = () => {
    if (
      !imageWidth ||
      !imageHeight ||
      !containerRef.current ||
      imageLeft === undefined
    ) {
      console.error('Missing required values:', {
        imageWidth,
        imageHeight,
        imageLeft,
      });
      return;
    }

    // Get the container's bounding rectangle to account for scroll position
    const containerRect = containerRef.current.getBoundingClientRect();

    // Manually get the scroll position of the container
    const containerScrollX = containerRef.current.scrollLeft;
    let offsetX = 0;
    if (window.innerWidth > 1350) {
      offsetX = (containerRect.width - imageWidth) / 2; // This is the offset on the X-axis
    }
    // Compute the relative mouse position within the container, adjusting for scroll
    const relativeX = docX - containerRect.left + containerScrollX - offsetX; // Adjust for horizontal scroll
    const relativeY = docY - containerRect.top; // Adjust for vertical scroll

    // Log intermediate values for debugging

    // Normalize the coordinates based on the current image size
    const normalizedX = relativeX / imageWidth;
    const normalizedY = relativeY / imageHeight;

    // Check if normalized values are valid before updating state
    console.log('normalizedX:', normalizedX, 'normalizedY:', normalizedY);

    if (isNaN(normalizedX) || isNaN(normalizedY)) {
      console.error('Invalid normalized values:', { normalizedX, normalizedY });
      return;
    }

    setNormalizedClick({ x: normalizedX, y: normalizedY });

    characterData.forEach((character) => {
      if (
        character.position.Xmin <= normalizedX &&
        normalizedX <= character.position.Xmax &&
        character.position.Ymin <= normalizedY &&
        normalizedY <= character.position.Ymax
      ) {
        setCharacterData((prevData) =>
          prevData.filter((c) => c.id !== character.id)
        );
      }
    });
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['map', id, activeIndex],
    queryFn: getMap,
    enabled: !!id,
    onSuccess: (fetchedData) => {
      if (fetchedData?.map) {
        setCharacterData(fetchedData.map);
      } else {
        console.error('Unexpected data structure:', fetchedData);
      } // Update the local state when data is fetched
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
    navigate('/');
    setOpenModal(false);
    console.log({ username: username, time: Number(finalTime) });
  };
  useEffect(() => {
    if (data) {
      console.log('Fetched Data:', data.map.Characters);
      setCharacterData(data.map.Characters); // Update state
    }
  }, [data]);
  useEffect(() => {
    if (characterData && characterData.length === 0) {
      setIsRunning(!isRunning);
      setOpenModal(!openModal);
    }
  }, [characterData]);

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
        {characterData?.map((character) => {
          return (
            <ObjectFind
              key={character.id}
              image={Waldo}
              isFind={false}
              name={character.name}
            />
          );
        })}

        <Timer setFinalTime={setFinalTime} isRunning={isRunning} />
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
