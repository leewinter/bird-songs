import GenericPlayer from "./components/birds/GenericPlayer";
import { useEffect, useRef, useState } from "react";

import "./App.css";

import robin from "./assets/robin.jpg";
import blackbird from "./assets/blackbird.jpg";
import chaffinch from "./assets/chaffinch.jpg";
import woodpigeon from "./assets/Wood-Pigeon.jpg";
import songThrush from "./assets/song-thrush.jpg";
import wren from "./assets/wren.jpg";
import robinsong from "./assets/Robin.mp3";
import blackbirdsong from "./assets/Blackbird.mp3";
import chaffinchsong from "./assets/Chaffinch.mp3";
import woodpigeonsong from "./assets/Wood_pigeon.mp3";
import songthrushsong from "./assets/Song_thrush.mp3";
import wrensong from "./assets/Wren.mp3";

const birdies = [
  {
    imageSrc: robin,
    audioUrl: robinsong,
    preview: "Robin",
  },
  {
    imageSrc: blackbird,
    audioUrl: blackbirdsong,
    preview: "Blackbird",
  },
  {
    imageSrc: chaffinch,
    audioUrl: chaffinchsong,
    preview: "Chaffinch",
  },
  {
    imageSrc: woodpigeon,
    audioUrl: woodpigeonsong,
    preview: "Wood Pigeon",
  },
  {
    imageSrc: songThrush,
    audioUrl: songthrushsong,
    preview: "Song Thrush",
  },
  {
    imageSrc: wren,
    audioUrl: wrensong,
    preview: "Wren",
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
          <span>British bird songs<br />
            Click to start</span>
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
