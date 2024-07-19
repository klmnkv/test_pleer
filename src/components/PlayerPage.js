import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlayerPage = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Тифлокомментарий</h1>
      <audio controls src={audioUrl}>
        Ваш браузер не поддерживает аудио элемент.
      </audio>
    </div>
  );
};

export default PlayerPage;