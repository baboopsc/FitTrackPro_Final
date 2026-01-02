import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Progress: React.FC = () => {
  const { user } = useAuth();
  const [weightData, setWeightData] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (user?.id) {
      // Backend'den ilerleme verisini çek
      const res = await api.get(`/progress/statistics/${user.id}`);
      // Sadece kilo girilmiş verileri filtrele ve grafiğe uygun hale getir
      // NOT: Backend'de UserProgress tablosunda weight alanı var, onu kullanıyoruz.
      // Eğer backend henüz weight döndürmüyorsa boş gelebilir, ama mantığı kurduk.
      if (res.data.weeklyCompletion) {
         setWeightData(res.data.weeklyCompletion); 
      }
    }
  };

  const handleWeightUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sadece kilo güncellemesi için progress endpointine POST atıyoruz
      // Not: WorkoutId olmadan da kayıt atabilmek lazım
      await api.post('/progress', {
        user: { id: user.id },
        weight: parseFloat(currentWeight),
        date: new Date().toISOString(),
        notes: 'Kilo Güncellemesi'
      });
      setMsg('✅ Yeni kilon kaydedildi!');
      setCurrentWeight('');
      loadData(); // Grafiği yenile
    } catch (err) {
      alert('Kayıt başarısız.');
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <h2 className="mb-4">📈 Kişisel Gelişim Takibi</h2>

        <Row>
          {/* Bölüm 1: Veri Girişi */}
          <Col md={4}>
            <Card className="shadow-sm p-3 mb-4">
              <h5 className="fw-bold">Vücut Ölçülerini Güncelle</h5>
              <Form onSubmit={handleWeightUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Güncel Kilo (kg)</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Örn: 75.5" 
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    required 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Kaydet</Button>
              </Form>
              {msg && <Alert variant="success" className="mt-2">{msg}</Alert>}
            </Card>
          </Col>

          {/* Bölüm 2: Grafik */}
          <Col md={8}>
            <Card className="shadow-sm p-3">
              <h5 className="fw-bold">Kilo Değişim Grafiği</h5>
              <div style={{ width: '100%', height: 300 }}>
                {weightData.length > 0 ? (
                  <ResponsiveContainer>
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(str) => new Date(str).toLocaleDateString()} />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} name="Kilo (kg)" />
                      {/* Kalori grafiğini de buraya entegre edebiliriz */}
                      <Line type="monotone" dataKey="calories" stroke="#82ca9d" name="Kalori" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Alert variant="warning" className="text-center mt-5">
                    Henüz veri yok. Soldan güncel kilonu gir, grafiğin oluşsun!
                  </Alert>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Progress;
