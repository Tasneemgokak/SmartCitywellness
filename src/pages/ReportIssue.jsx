import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaImage, FaMapMarkerAlt, FaTimes, FaMicrophone, FaStop, FaPlay, FaPause, FaTrash } from 'react-icons/fa';
import '../styles/ReportIssue.css';

const ReportIssue = () => {
  const { currentUser } = useAuth();
  const [issue, setIssue] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        stopRecording();
      }
    };
  }, []);

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
      setError('Microphone access denied');
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
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
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
        (err) => setError('Location access denied')
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issue && !audioURL) {
      setError('Please describe the issue or record a voice message');
      return;
    }

    console.log({
      user: currentUser.displayName || currentUser.email,
      issue,
      image,
      location,
      audioURL
    });
    alert('Issue reported successfully!');
    resetForm();
  };

  const resetForm = () => {
    setIssue('');
    setImage(null);
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
        {/* Description Section */}
        <div className="form-section">
          <h3 className="section-title">Issue Details</h3>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe your issue here..."
            className="description-textarea"
          />
        </div>

        {/* Media Section */}
        <div className="form-section">
          <h3 className="section-title">Attachments</h3>
          
          {/* Image Upload */}
          <div className="media-option">
            <button
              type="button"
              className="media-btn image-btn"
              onClick={() => fileInputRef.current.click()}
            >
              <FaImage className="media-icon" />
              <span>Upload Image</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              hidden
            />
          </div>

          {/* Image Preview */}
          {image && (
            <div className="attachment-preview">
              <div className="image-preview">
                <img src={image} alt="Uploaded content" className="uploaded-image" />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => setImage(null)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}

          {/* Voice Recording */}
          <div className="media-option">
            <button
              type="button"
              className={`media-btn voice-btn ${isRecording ? 'recording' : ''}`}
              onClick={toggleRecording}
            >
              {isRecording ? (
                <FaStop className="media-icon" />
              ) : (
                <FaMicrophone className="media-icon" />
              )}
              <span>{isRecording ? 'Stop Recording' : 'Record Voice'}</span>
            </button>
          </div>

          {/* Voice Message Preview */}
          {audioURL && (
            <div className="attachment-preview voice-preview">
              <div className="voice-message">
                <div className="voice-controls">
                  <button
                    type="button"
                    className={`play-btn ${isPlaying ? 'playing' : ''}`}
                    onClick={togglePlayback}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <div className="voice-wave">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="wave-bar"
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={deleteVoiceMessage}
                  >
                    <FaTrash />
                  </button>
                </div>
                <audio
                  ref={audioRef}
                  src={audioURL}
                  onEnded={() => setIsPlaying(false)}
                  hidden
                />
              </div>
            </div>
          )}

          {/* Location */}
          <div className="media-option">
            <button
              type="button"
              className="media-btn location-btn"
              onClick={getLocation}
            >
              <FaMapMarkerAlt className="media-icon" />
              <span>Add Location</span>
            </button>
          </div>

          {/* Location Preview */}
          {location && (
            <div className="attachment-preview location-preview">
              <div className="location-info">
                <FaMapMarkerAlt className="location-icon" />
                <div className="coordinates">
                  <span className="lat">Lat: {location.lat.toFixed(4)}</span>
                  <span className="lng">Lng: {location.lng.toFixed(4)}</span>
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => setLocation(null)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Clear All
          </button>
          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;