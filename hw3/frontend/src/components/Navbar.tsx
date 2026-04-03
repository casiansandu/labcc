import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">MicRoman</div>
        <Link to="/" className="nav-item">Home</Link>
      </div>
      <div className="navbar-right">
        <span className="user-status">Logged in as Guest</span>
      </div>
    </nav>
  );
};

export default Navbar;