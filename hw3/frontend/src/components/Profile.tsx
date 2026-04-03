import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  isMockApiError,
  mockUploadProfilePictureEndpoint,
  mockUsersMeEndpoint,
  type UserProfile,
} from '../mocks/mockApi';
import '../styles/Profile.css';

const Profile = () => {
  const { refreshAuth } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const loadProfile = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await mockUsersMeEndpoint();
      setProfile(data);
    } catch (loadError) {
      if (isMockApiError(loadError)) {
        setError(loadError.message);
      } else {
        setError('Mock endpoint error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setUploadMessage('');

    if (!selectedFile) {
      setUploadMessage('Please choose an image first.');
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setUploadMessage('Only image files are allowed.');
      return;
    }

    try {
      setUploading(true);
      const updatedProfile = await mockUploadProfilePictureEndpoint(selectedFile);
      setProfile(updatedProfile);
      await refreshAuth();
      setSelectedFile(null);
      setUploadMessage('Profile picture updated successfully.');
    } catch (uploadError) {
      if (isMockApiError(uploadError)) {
        setUploadMessage(uploadError.message);
      } else {
        setUploadMessage('Upload failed on mock endpoint.');
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="welcome-container">Loading profile...</div>;
  }

  if (error) {
    return <div className="welcome-container">{error}</div>;
  }

  if (!profile) {
    return <div className="welcome-container">No profile data found.</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="welcome-title">Profile</h1>

      <div className="profile-card profile-header">
        <img
          src={profile.profile_picture_url || 'https://placehold.co/120x120?text=Avatar'}
          alt="Profile"
          className="profile-avatar"
        />
        <div>
          <h2>{profile.full_name}</h2>
          <p className="welcome-text">@{profile.username}</p>
          <p className="welcome-text">{profile.email}</p>
        </div>
      </div>

      <div className="profile-card profile-details-grid">
        <div>
          <h3>Phone</h3>
          <p>{profile.phone_number || 'N/A'}</p>
        </div>
        <div>
          <h3>Birth Date</h3>
          <p>{profile.birth_date || 'N/A'}</p>
        </div>
        <div>
          <h3>Created At</h3>
          <p>{new Date(profile.created_at).toLocaleString()}</p>
        </div>
        <div>
          <h3>Last Updated</h3>
          <p>{new Date(profile.updated_at).toLocaleString()}</p>
        </div>
      </div>

      <form className="profile-card profile-upload" onSubmit={handleUpload}>
        <h3>Update Profile Picture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Picture'}
        </button>
        {uploadMessage ? <p className="upload-message">{uploadMessage}</p> : null}
      </form>
    </div>
  );
};

export default Profile;