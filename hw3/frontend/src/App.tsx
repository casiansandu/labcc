import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import './styles/global.css'

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <div className="welcome-container">
              <h1 className="welcome-title">Welcome to MyApp</h1>
              <p className="welcome-text">Get started by logging in or creating an account.</p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/login" style={{
                  display: 'inline-block',
                  padding: '0.75rem 2rem',
                  background: '#3498db',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  margin: '0 1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}>Login</Link>
                <Link to="/register" style={{
                  display: 'inline-block',
                  padding: '0.75rem 2rem',
                  background: '#2ecc71',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  margin: '0 1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}>Register</Link>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
