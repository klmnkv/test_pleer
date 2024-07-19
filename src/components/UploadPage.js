  import React, { useState } from 'react';
  import axios from 'axios';

  const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [shareUrl, setShareUrl] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
      if (!file) {
        setError('Please select a file first');
        return;
      }

      const formData = new FormData();
      formData.append('audio', file);

      try {
        const response = await axios.post('https://server-pleer.onrender.com/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const audioId = response.data.audioId; // Предполагаем, что сервер возвращает ID аудио
        setShareUrl(`${window.location.origin}/play/${audioId}`);
        setError('');
      } catch (error) {
        console.error('Upload error:', error);
        setError('Upload failed. Please try again.');
      }
    };

    return (
      <div className="upload-container">
        <h2>Загрузка тифлокомментария</h2>
        <input type="file" onChange={handleFileChange} accept="audio/*" />
        <button onClick={handleUpload}>Загрузить</button>
        {error && <p className="error">{error}</p>}
        {shareUrl && (
          <div>
            <p>Ссылка для шаринга:</p>
            <input type="text" value={shareUrl} readOnly />
            <button onClick={() => navigator.clipboard.writeText(shareUrl)}>
              Копировать ссылку
            </button>
          </div>
        )}
      </div>
    );
  };

  export default UploadPage;