import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'member' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err) { setError('Kayıt başarısız! Email alınmış olabilir.'); }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '500px' }} className="shadow p-4">
        <h2 className="text-center mb-4">Yeni Hesap Oluştur</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control type="text" required onChange={e => setFormData({...formData, name: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required onChange={e => setFormData({...formData, email: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Şifre</Form.Label>
            <Form.Control type="password" required onChange={e => setFormData({...formData, password: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rolün Ne?</Form.Label>
            <Form.Select onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="member">Üye</option>
              <option value="trainer">Antrenör</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">Kayıt Ol</Button>
        </Form>
        <div className="text-center mt-3">
          Zaten üye misin? <Link to="/login">Giriş Yap</Link>
        </div>
      </Card>
    </Container>
  );
};
export default Register;
