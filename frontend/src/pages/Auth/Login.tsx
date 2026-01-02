import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { FaDumbbell } from 'react-icons/fa';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      login(res.data.user, res.data.access_token);
      
      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'trainer') navigate('/trainer');
      else navigate('/member');
    } catch (err: any) {
      setError('Giriş başarısız! Email veya şifre hatalı.');
    }
  };

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Container className="d-flex justify-content-center">
        <Card className="shadow-lg border-0 p-4 fade-in" style={{ width: '400px', borderRadius: '20px', background: 'rgba(255,255,255,0.95)' }}>
          <Card.Body>
            <div className="text-center mb-4">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', background: '#4361ee', borderRadius: '50%', color: 'white', fontSize: '24px'}}>
                    <FaDumbbell />
                </div>
                <h3 className="fw-bold text-dark">FitTrack Pro</h3>
                <p className="text-muted small">Hesabınıza giriş yapın</p>
            </div>

            {error && <Alert variant="danger" style={{fontSize: '0.9rem'}}>{error}</Alert>}
            
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Email Adresi</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="ornek@mail.com" 
                    required 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    style={{padding: '12px'}}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">Şifre</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="••••••" 
                    required 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    style={{padding: '12px'}}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 py-2 fw-bold" style={{borderRadius: '10px', fontSize: '1rem'}}>
                GİRİŞ YAP
              </Button>
            </Form>
            
            <div className="mt-4 text-center border-top pt-3">
              <span className="text-muted small">Hesabın yok mu? </span>
              <Link to="/register" className="fw-bold text-primary small" style={{ textDecoration: 'none' }}>Hemen Kayıt Ol</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default Login;
