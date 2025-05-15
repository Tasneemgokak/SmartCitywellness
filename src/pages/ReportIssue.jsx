import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaImage, FaMapMarkerAlt, FaTimes, FaMicrophone, FaStop, FaPlay, FaPause, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/ReportIssue.css';

const ReportIssue = () => {
  const { currentUser } = useAuth();
  const [issue, setIssue] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        stopRecording();
      }
      if (audioURL) URL.revokeObjectURL(audioURL);
      if (image) URL.revokeObjectURL(image);
    };
  }, [audioURL, image]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError('Please allow microphone access to record voice.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const deleteVoiceMessage = () => {
    setAudioURL('');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => setError('Location access denied')
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issue && !audioURL) {
      setError('Please describe the issue or record a voice message');
      return;
    }

    if (!image || !imageFile) {
      setError('Please upload an image for prediction.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.prediction) {
        throw new Error('Failed to get valid prediction');
      }

      const previewImageURL = URL.createObjectURL(imageFile);

      navigate("/preview", {
        state: {
          issue,
          image: previewImageURL,
          prediction: data.prediction,
          user: currentUser.displayName || currentUser.email
        }
      });

      alert('Issue reported successfully!');
      resetForm();

    } catch (err) {
      console.error(err);
      setError('Something went wrong. Could not submit report.');
    }
  };

  const resetForm = () => {
    setIssue('');
    setImage(null);
    setImageFile(null);
    setLocation(null);
    setAudioURL('');
    setError('');
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Report an Issue</h2>
        <p className="user-info">
          Reporting as: <span className="user-name">{currentUser?.displayName || currentUser?.email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-section">
          <h3 className="section-title">&nbsp;Issue Details</h3>
          <br />
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe your issue here..."
            className="description-textarea"
          />
        </div>

        <div className="form-section">
          <h3 className="section-title">Attachments</h3>

          <div className="media-option">
            <button type="button" className="media-btn image-btn" onClick={() => fileInputRef.current.click()}>
              <FaImage className="media-icon" />
              <span>Upload Image</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" hidden />
          </div>

          {image && (
            <div className="attachment-preview">
              <div className="image-preview">
                <img src={image} alt="Uploaded content" className="uploaded-image" />
                <button type="button" className="remove-btn" onClick={() => setImage(null)}>
                  <FaTimes />
                </button>
              </div>
            </div>
          )}

          <div className="media-option">
            <button type="button" className={`media-btn voice-btn ${isRecording ? 'recording' : ''}`} onClick={toggleRecording}>
              {isRecording ? <FaStop className="media-icon" /> : <FaMicrophone className="media-icon" />}
              <span>{isRecording ? 'Stop Recording' : 'Record Voice'}</span>
            </button>
          </div>

          {audioURL && (
            <div className="attachment-preview voice-preview">
              <div className="voice-message">
                <div className="voice-controls">
                  <button type="button" className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlayback}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <div className="voice-wave">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="wave-bar" style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.05}s` }} />
                    ))}
                  </div>
                  <button type="button" className="delete-btn" onClick={deleteVoiceMessage}>
                    <FaTrash />
                  </button>
                </div>
                <audio ref={audioRef} src={audioURL} onEnded={() => setIsPlaying(false)} hidden />
              </div>
            </div>
          )}

          <div className="media-option">
            <button type="button" className="media-btn location-btn" onClick={getLocation}>
              <FaMapMarkerAlt className="media-icon" />
              <span>Add Location</span>
            </button>
          </div>

          {location && (
            <div className="attachment-preview location-preview">
              <div className="location-info">
                <FaMapMarkerAlt className="location-icon" />
                <div className="coordinates">
                  <span className="lat">Lat: {location.lat.toFixed(4)}</span>
                  <span className="lng">Lng: {location.lng.toFixed(4)}</span>
                </div>
                <button type="button" className="remove-btn" onClick={() => setLocation(null)}>
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={resetForm}>Clear All</button>
          <button type="submit" className="submit-btn">Submit Report</button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;