import React, { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handlePlayPause = () => {
      setIsPlaying(!audioElement.paused);
    };

    audioElement.addEventListener('play', handlePlayPause);
    audioElement.addEventListener('pause', handlePlayPause);

    return () => {
      audioElement.removeEventListener('play', handlePlayPause);
      audioElement.removeEventListener('pause', handlePlayPause);
    };
  }, []);

  const handlePlayPauseClick = () => {
    const audioElement = audioRef.current;
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  const handleVolumeChange = (e) => {
    const audioElement = audioRef.current;
    audioElement.volume = e.target.value;
  };

  return (
    <div className="player-container">
      <h2>Audio Player</h2>
      <audio ref={audioRef} src={audioUrl} aria-label="Audio player for the selected file" />
      <div className="controls">
        <button onClick={handlePlayPauseClick} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <label>
          Volume:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={handleVolumeChange}
            aria-label="Volume control"
          />
        </label>
      </div>
    </div>
  );
};

export default AudioPlayer;