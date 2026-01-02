import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaClock, FaCalendarAlt, FaStar, FaUserCircle } from 'react-icons/fa';

const WorkoutDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workout, setWorkout] = useState<any>(null);
  const [comment, setComment] = useState('');

  useEffect(() => { load(); }, [id]);
  const load = () => api.get(`/workouts/${id}`).then(res => setWorkout(res.data));

  const handlePostComment = async () => {
    if (!comment) return;
    try {
      await api.post('/workouts/review', { workoutId: Number(id), userId: user.id, comment, rating: 5 });
      setComment(''); load();
    } catch(e) { alert("Yorum atılamadı."); }
  };

  if (!workout) return <div className="text-center mt-5">Yükleniyor...</div>;

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>&larr; Geri Dön</Button>
        
        <Row>
          <Col md={8}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                 <h2 className="fw-bold text-primary">{workout.name}</h2>
                 <p className="text-muted">{workout.description}</p>
                 <div className="d-flex gap-4 my-3">
                    <span><FaClock className="text-warning"/> İdeal Süre: <strong>{workout.duration} dk</strong></span>
                    <span><FaCalendarAlt className="text-info"/> Sıklık: <strong>Haftada {workout.frequency} Gün</strong></span>
                    <span><FaStar className="text-warning"/> Zorluk: <strong>{workout.difficulty}</strong></span>
                 </div>

                 <h5 className="mt-4">📋 Egzersiz Listesi</h5>
                 <ListGroup variant="flush">
                    {workout.workoutExercises?.map((we: any, idx: number) => (
                        <ListGroup.Item key={idx}>
                            <Badge bg="secondary" className="me-2">{idx+1}</Badge> {we.exercise.name} 
                            <span className="float-end text-muted small">3 Set x 12 Tekrar</span>
                        </ListGroup.Item>
                    ))}
                 </ListGroup>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white fw-bold">💬 Üye Yorumları</Card.Header>
                <Card.Body>
                    <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                        {workout.reviews?.length > 0 ? workout.reviews.map((r: any) => (
                            <div key={r.id} className="border-bottom pb-2 mb-2">
                                <div className="d-flex align-items-center mb-1">
                                    <FaUserCircle className="text-muted me-2"/>
                                    <strong className="me-2">{r.user.name}</strong>
                                    <small className="text-muted">{new Date(r.date).toLocaleDateString()}</small>
                                </div>
                                <p className="mb-0 ms-4">{r.comment}</p>
                            </div>
                        )) : <p className="text-muted">Henüz yorum yok.</p>}
                    </div>
                    {/* Sadece Üye Yorum Yapabilsin */}
                    {user?.role === 'member' && (
                        <div className="mt-3 d-flex gap-2">
                            <Form.Control placeholder="Düşüncelerin..." value={comment} onChange={e => setComment(e.target.value)}/>
                            <Button onClick={handlePostComment}>Gönder</Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-primary text-white text-center p-4 border-0">
                {user?.role === 'trainer' ? (
                    // ANTRENÖR İÇİN GÖRÜNÜM
                    <>
                        <h4>Önizleme Modu 👁️</h4>
                        <p>Şu an bu programı antrenör olarak inceliyorsun.</p>
                        <Alert variant="warning" className="text-dark">Antrenörler ilerleme kaydedemez.</Alert>
                    </>
                ) : (
                    // ÜYE İÇİN GÖRÜNÜM
                    <>
                        <h4>Hazır mısın?</h4>
                        <p>Bugünkü antrenman seansını başlatmak için butona bas.</p>
                        <Button variant="light" size="lg" className="fw-bold text-primary w-100" onClick={() => navigate(`/member/workouts/${id}/run`)}>
                            BAŞLAT ▶️
                        </Button>
                    </>
                )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default WorkoutDetail;
