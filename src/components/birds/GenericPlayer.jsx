import { useRef, useState } from "react";

import PropTypes from "prop-types";

function GenericPlayer({ audioUrl, imageSrc }) {
  const audioRef = useRef(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <img
      src={imageSrc}
      className={`bird react vite ${isPlaying ? "playing" : ""}`}
      alt="audio bird"
      onClick={handleClick}
    />
  );
}
GenericPlayer.propTypes = {
  audioUrl: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
};

export default GenericPlayer;
