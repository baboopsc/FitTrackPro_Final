import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Badge } from 'react-bootstrap';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.get('/exercises').then(res => setExercises(res.data));
  }, []);

  const filtered = exercises.filter((ex: any) => 
    ex.name.toLowerCase().includes(filter.toLowerCase()) || 
    ex.muscleGroup.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Egzersiz Kütüphanesi</h2>
          <Form.Control 
            type="text" 
            placeholder="Egzersiz veya kas grubu ara..." 
            style={{ width: '300px' }}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Row>
          {filtered.map((ex: any) => (
            <Col md={3} key={ex.id} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Badge bg="dark" className="mb-2">{ex.muscleGroup}</Badge>
                  <Card.Title>{ex.name}</Card.Title>
                  <Card.Text className="small text-muted">{ex.description}</Card.Text>
                  {ex.equipment && <div className="small"><strong>Ekipman:</strong> {ex.equipment}</div>}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Exercises;
