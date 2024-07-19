import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlayerPage = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const response = await axios.get(`https://server-pleer.onrender.com/audio/${id}`);
        setAudioUrl(response.data.url);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching audio:', err);
        setError('Не удалось загрузить аудио. Пожалуйста, попробуйте еще раз.');
        setLoading(false);
      }
    };

    fetchAudioUrl();
  }, [id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
      }
    };
  }, [audioUrl]);

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (loading) return <div role="status" aria-live="polite">Загрузка аудио...</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div className="player-container">
      <h1>Тифлокомментарий</h1>
      <audio ref={audioRef} src={audioUrl} />
      <div className="controls">
        <button onClick={togglePlay} aria-label={isPlaying ? "Пауза" : "Воспроизвести"}>
          {isPlaying ? "Пауза" : "Воспроизвести"}
        </button>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Перемотка"
          aria-valuemin="0"
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatTime(currentTime)} из ${formatTime(duration)}`}
        />
        <div aria-live="polite" className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <div className="instructions">
        <h2>Инструкции по использованию:</h2>
        <ul>
          <li>Используйте кнопку "Воспроизвести/Пауза" для управления воспроизведением.</li>
          <li>Используйте ползунок для перемотки аудио.</li>
          <li>Текущее время и общая продолжительность аудио отображаются под ползунком.</li>
          <li>Используйте клавиши со стрелками для точной настройки времени воспроизведения.</li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerPage;