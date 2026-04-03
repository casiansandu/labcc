import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, loading } = useAuth();

  const displayName = loading ? 'Loading...' : user?.username || 'Guest';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">MicRoman</div>
        <Link to="/home" className="nav-item">Home</Link>
      </div>
      <div className="navbar-right">
        {user?.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="Profile" className="navbar-avatar" />
        ) : (
          <div className="navbar-avatar navbar-avatar-placeholder">{displayName.charAt(0).toUpperCase()}</div>
        )}
        <span className="user-status">Logged in as {displayName}</span>
      </div>
    </nav>
  );
};

export default Navbar;