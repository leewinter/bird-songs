import GenericPlayer from "./components/birds/GenericPlayer";
import { useEffect, useRef, useState } from "react";

import "./App.css";

import robin from "./assets/robin.jpg";
import blackbird from "./assets/blackbird.png";
import mistleThrush from "./assets/mistle-thrush.png";
import nightingale from "./assets/nightingale.png";
import songThrush from "./assets/song-thrush.png";
import northernWheatear from "./assets/northern-wheatear.png";

const birdies = [
  {
    imageSrc: robin,
    audioUrl: "https://www.british-birdsongs.uk/sounds/644.mp3",
    preview: "Robin",
  },
  {
    imageSrc: blackbird,
    audioUrl: "https://www.british-birdsongs.uk/sounds/653.mp3",
    preview: "Blackbird",
  },
  {
    imageSrc: mistleThrush,
    audioUrl: "https://www.british-birdsongs.uk/sounds/656.mp3",
    preview: "Mistle Thrush",
  },
  {
    imageSrc: nightingale,
    audioUrl: "https://www.british-birdsongs.uk/sounds/1464.mp3",
    preview: "Nightingale",
  },
  {
    imageSrc: songThrush,
    audioUrl: "https://www.british-birdsongs.uk/sounds/654.mp3",
    preview: "Song Thrush",
  },
  {
    imageSrc: northernWheatear,
    audioUrl: "https://www.british-birdsongs.uk/sounds/647.mp3",
    preview: "Northern Wheatear",
  },
];

function App() {
  const indexRef = useRef(0); // Track the current index
  const birdHasBeenClicked = useRef(false);
  const [currentBird, setCurrentBird] = useState(null);
  const [startSpeaking, setStartSpeaking] = useState(false);
  const [triggerRecursion, setTriggerRecursion] = useState(false);

  useEffect(() => {
    if (!birdies.length) {
      return;
    }

    const speakNext = () => {
      if (indexRef.current >= birdies.length && !birdHasBeenClicked.current) {
        setCurrentBird(null);
        setStartSpeaking(!startSpeaking);
        return; // Stop when all birds are spoken
      }

      if (birdHasBeenClicked.current) {
        return;
      }

      const bird = birdies[indexRef.current];

      setCurrentBird(bird); // Set the current bird

      const speech = new SpeechSynthesisUtterance(bird.preview);

      speech.onend = () => {
        indexRef.current++; // Move to the next bird
        setTimeout(() => {
          speakNext();
        }, 2500); // Delay before speaking the next one
      };

      window.speechSynthesis.speak(speech);
    };

    if (startSpeaking) speakNext(); // Start speaking
  }, [birdies, startSpeaking, triggerRecursion]);

  return (
    <div className="bird-list">
      {startSpeaking ? null : (
        <button
          className="start-button"
          onClick={() => {
            setStartSpeaking(!startSpeaking);
            indexRef.current = 0; // Reset the index
          }}
        >
          <span>Show me the birds</span>
        </button>
      )}
      {startSpeaking &&
        birdies.map((bird, index) => (
          <div
            key={index}
            onClick={() => {
              birdHasBeenClicked.current = !birdHasBeenClicked.current;
              setTriggerRecursion(!triggerRecursion);
            }}
          >
            <h1>
              {currentBird && currentBird?.preview === bird.preview
                ? currentBird?.preview
                : null}
            </h1>
            {currentBird && currentBird?.preview === bird.preview ? (
              <GenericPlayer
                imageSrc={bird.imageSrc}
                audioUrl={bird.audioUrl}
              />
            ) : null}
          </div>
        ))}
    </div>
  );
}

export default App;
