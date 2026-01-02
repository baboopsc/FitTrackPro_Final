import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';

const CreateWorkout: React.FC = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '', description: '', duration: 60, difficulty: 'Medium', calories: 0, frequency: 4 // Varsayılanı 4 yaptım gör diye
  });

  useEffect(() => {
    api.get('/exercises').then(res => setExercises(res.data));
  }, []);

  const handleCheckboxChange = (id: number) => {
    if (selectedExercises.includes(id)) setSelectedExercises(selectedExercises.filter(i => i !== id));
    else setSelectedExercises([...selectedExercises, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // KANKA FREKANS KESİN GİDİYOR ARTIK
      console.log("Gönderilen Veri:", { ...formData, exerciseIds: selectedExercises });
      await api.post('/workouts', { ...formData, exerciseIds: selectedExercises });
      alert("✅ Program Başarıyla Oluşturuldu!");
      navigate('/trainer');
    } catch (error) { alert("Hata!"); }
  };

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <h2 className="mb-4">🏋️ Yeni Program Oluştur</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Card className="p-3 mb-3 shadow-sm">
                <Form.Group className="mb-3"><Form.Label>Program Adı</Form.Label><Form.Control onChange={e => setFormData({...formData, name: e.target.value})} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Açıklama</Form.Label><Form.Control as="textarea" onChange={e => setFormData({...formData, description: e.target.value})} required /></Form.Group>
                
                <Row>
                  <Col>
                    <Form.Group className="mb-3"><Form.Label>İdeal Süre (dk)</Form.Label>
                      <Form.Control type="number" value={formData.duration} onChange={e => setFormData({...formData, duration: +e.target.value})} />
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* FREKANS GİRİŞİ */}
                    <Form.Group className="mb-3"><Form.Label>Haftalık Sıklık (Gün)</Form.Label>
                      <Form.Control 
                        type="number" 
                        value={formData.frequency} 
                        onChange={e => setFormData({...formData, frequency: parseInt(e.target.value)})} 
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3"><Form.Label>Zorluk</Form.Label>
                  <Form.Select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                    <option value="Beginner">Başlangıç</option>
                    <option value="Medium">Orta</option>
                    <option value="Advanced">İleri</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3"><Form.Label>Tahmini Kalori</Form.Label>
                    <Form.Control type="number" value={formData.calories} onChange={e => setFormData({...formData, calories: +e.target.value})} />
                </Form.Group>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="p-3 mb-3 shadow-sm">
                <h5>Egzersiz Seç</h5>
                <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                  {exercises.map((ex: any) => (
                    <Form.Check key={ex.id} label={ex.name} onChange={() => handleCheckboxChange(ex.id)} />
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
          <Button type="submit" className="w-100" variant="primary">KAYDET VE YAYINLA</Button>
        </Form>
      </Container>
    </div>
  );
};
export default CreateWorkout;
