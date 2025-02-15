import GenericPlayer from "./components/birds/GenericPlayer";

import "./App.css";

import robin from "./assets/robin.jpg";
import blackbird from "./assets/blackbird.png";
import mistleThrush from "./assets/mistle-thrush.png";

const birdies = [
  {
    imageSrc: robin,
    audioUrl: "https://www.british-birdsongs.uk/sounds/644.mp3",
  },
  {
    imageSrc: blackbird,
    audioUrl: "https://www.british-birdsongs.uk/sounds/653.mp3",
  },
  {
    imageSrc: mistleThrush,
    audioUrl: "https://www.british-birdsongs.uk/sounds/656.mp3",
  },
];

function App() {
  return (
    <>
      <div>
        {birdies.map((bird, index) => (
          <GenericPlayer
            key={index}
            imageSrc={bird.imageSrc}
            audioUrl={bird.audioUrl}
          />
        ))}
      </div>
    </>
  );
}

export default App;
