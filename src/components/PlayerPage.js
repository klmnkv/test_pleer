import React from 'react';
import { useLocation } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

const PlayerPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const audioUrl = decodeURIComponent(params.get('url'));

  return (
    <div className="container">
      {audioUrl ? (
        <AudioPlayer audioUrl={audioUrl} />
      ) : (
        <p>No audio file selected</p>
      )}
    </div>
  );
};

export default PlayerPage;
