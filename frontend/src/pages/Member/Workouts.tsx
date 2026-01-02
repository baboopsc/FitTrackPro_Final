import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { FaClock, FaDumbbell, FaFire } from 'react-icons/fa';

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.get('/workouts').then(res => {
        setWorkouts(res.data);
        setLoading(false);
    }).catch(err => setLoading(false));
  }, []);

  const filteredWorkouts = workouts.filter((w: any) => 
    w.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">🏋️ Antrenman Listesi</h2>
          <Form.Control type="text" placeholder="Antrenman Ara..." className="w-25" onChange={(e) => setFilter(e.target.value)} />
        </div>

        {loading && <Spinner animation="border" />}
        {!loading && filteredWorkouts.length === 0 && <Alert variant="info">Antrenman bulunamadı.</Alert>}

        <Row>
          {filteredWorkouts.map((w: any) => (
            <Col md={4} key={w.id} className="mb-4">
              <Card className="shadow border-0 h-100">
                <Card.Body>
                  <Card.Title className="fw-bold">{w.name}</Card.Title>
                  <Card.Text className="text-muted small">{w.description}</Card.Text>
                  <div className="d-flex justify-content-between mb-3 mt-3">
                    <span className="small"><FaClock className="text-warning"/> {w.duration} dk</span>
                    <span className="small"><FaDumbbell className="text-primary"/> {w.difficulty}</span>
                    <span className="small"><FaFire className="text-danger"/> {w.calories} kcal</span>
                  </div>
                  <div className="d-grid gap-2">
                    <Link to={`/member/workouts/${w.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="outline-dark" className="w-100">DETAYLARI GÖR</Button>
                    </Link>
                    {/* BAŞLAT BUTONU ARTIK ÇALIŞIYOR: Detay sayfasına atar ve süreci başlatır */}
                    <Link to={`/member/workouts/${w.id}`} style={{ textDecoration: 'none' }}>
                         <Button variant="primary" className="w-100">BAŞLAT ⏱️</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Workouts;
