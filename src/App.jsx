import GenericPlayer from "./components/birds/GenericPlayer";

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
  },
  {
    imageSrc: blackbird,
    audioUrl: "https://www.british-birdsongs.uk/sounds/653.mp3",
  },
  {
    imageSrc: mistleThrush,
    audioUrl: "https://www.british-birdsongs.uk/sounds/656.mp3",
  },
  {
    imageSrc: nightingale,
    audioUrl: "https://www.british-birdsongs.uk/sounds/1464.mp3",
  },
  {
    imageSrc: songThrush,
    audioUrl: "https://www.british-birdsongs.uk/sounds/654.mp3",
  },
  {
    imageSrc: northernWheatear,
    audioUrl: "https://www.british-birdsongs.uk/sounds/647.mp3",
  },
];

function App() {
  return (
    <div className="bird-list">
      {birdies.map((bird, index) => (
        <GenericPlayer
          key={index}
          imageSrc={bird.imageSrc}
          audioUrl={bird.audioUrl}
        />
      ))}
    </div>
  );
}

export default App;
