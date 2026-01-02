import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { FaUser, FaUtensils, FaEnvelope } from 'react-icons/fa';

const MemberStats: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [memberInfo, setMemberInfo] = useState<any>(null);

  useEffect(() => {
    // 1. Üye Detayını Çek (Plan bilgisi burada)
    api.get('/users').then(res => {
        const foundUser = res.data.find((u: any) => u.id === Number(userId));
        setMemberInfo(foundUser);
    });

    // 2. İlerleme Verilerini Çek
    api.get('/progress').then(res => {
      const userStats = res.data.filter((p: any) => p.user?.id === Number(userId));
      setStats(userStats);
    });
  }, [userId]);

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <Button variant="secondary" className="mb-3" onClick={() => navigate('/trainer')}>&larr; Panele Dön</Button>
        
        {/* ÜYE PROFİL KARTI */}
        {memberInfo && (
            <Card className="shadow-sm border-0 mb-4 bg-light">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={1} className="text-center">
                            <FaUser size={50} className="text-primary"/>
                        </Col>
                        <Col md={7}>
                            <h4 className="fw-bold mb-1">{memberInfo.name}</h4>
                            <div className="text-muted"><FaEnvelope className="me-2"/>{memberInfo.email}</div>
                        </Col>
                        <Col md={4} className="text-end">
                            <h6 className="text-uppercase text-muted small">Aktif Beslenme Planı</h6>
                            {memberInfo.activeNutritionPlan ? (
                                <div>
                                    <Badge bg="success" className="fs-6 p-2 mb-1">
                                        <FaUtensils className="me-2"/>
                                        {memberInfo.activeNutritionPlan.name}
                                    </Badge>
                                    <div className="small text-success fw-bold">{memberInfo.activeNutritionPlan.calories} kcal</div>
                                </div>
                            ) : (
                                <Badge bg="secondary" className="p-2">Plan Seçilmemiş</Badge>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )}

        {/* İLERLEME TABLOSU */}
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-primary text-white fw-bold">📊 Üye İlerleme Raporu</Card.Header>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Antrenman Adı</th>
                  <th>Durum</th>
                  <th>Not</th>
                </tr>
              </thead>
              <tbody>
                {stats.length > 0 ? stats.map((s: any) => (
                  <tr key={s.id}>
                    <td>{new Date(s.date).toLocaleDateString()}</td>
                    <td className="fw-bold text-primary">{s.workout?.name || 'Harici Aktivite'}</td>
                    <td>
                        {s.duration > 0 ? (
                             <Badge bg="success">Tamamlandı ({s.duration} dk)</Badge>
                        ) : <Badge bg="warning">Kilo Girişi</Badge>}
                    </td>
                    <td>{s.weight > 0 ? `Kilo: ${s.weight}kg` : 'Antrenman tamamlandı.'}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="text-center text-muted">Bu üyenin henüz verisi yok.</td></tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default MemberStats;
