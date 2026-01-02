import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaDumbbell, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const AppNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbar-custom sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <div style={{background: 'linear-gradient(45deg, #4361ee, #3f37c9)', padding: '8px', borderRadius: '8px', color: 'white'}}>
            <FaDumbbell />
          </div>
          <span style={{fontWeight: '800', color: '#2b2d42'}}>FitTrack</span>
          <span style={{color: '#4361ee', fontWeight: '800'}}>PRO</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            {user ? (
              <>
                <span className="fw-bold text-secondary d-flex align-items-center gap-2" style={{fontSize: '0.9rem'}}>
                    <FaUserCircle size={20} color="#4361ee"/> {user.name} 
                    <span className="badge bg-light text-dark border">{user.role.toUpperCase()}</span>
                </span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout} style={{borderRadius: '20px', padding: '6px 18px'}}>
                  <FaSignOutAlt className="me-1"/> Çıkış
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="fw-bold">Giriş Yap</Nav.Link>
                <Link to="/register">
                    <Button variant="primary" style={{borderRadius: '20px', padding: '8px 25px'}}>Ücretsiz Başla</Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default AppNavbar;
