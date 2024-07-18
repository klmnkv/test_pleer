import React from 'react';
import { useLocation } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

const PlayerPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const audioUrl = urlParams.get('url');

  return (
    <div>
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
};

export default PlayerPage;
