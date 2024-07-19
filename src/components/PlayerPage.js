import React from 'react';
import { useLocation } from 'react-router-dom';

const PlayerPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const audioUrl = params.get('url');

  return (
    <div className="container">
      <h2>Audio Player</h2>
      {audioUrl ? (
        <audio controls src={audioUrl} aria-label="Audio player for the selected file" />
      ) : (
        <p>No audio file selected</p>
      )}
    </div>
  );
};

export default PlayerPage;
