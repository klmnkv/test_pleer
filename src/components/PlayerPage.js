import React from 'react';
import { useLocation } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

const PlayerPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const audioUrl = params.get('url');

  if (!audioUrl) {
    return <p>No audio URL provided</p>;
  }

  return (
    <div className="container">
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
};

export default PlayerPage;