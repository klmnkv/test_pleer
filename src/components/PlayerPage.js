import React from 'react';
import { useLocation } from 'react-router-dom';

const PlayerPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const audioUrl = urlParams.get('url');

  if (!audioUrl) {
    return <div>No audio URL provided</div>;
  }

  return (
    <div>
      <h1>Audio Player</h1>
      <audio controls src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PlayerPage;