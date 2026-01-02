import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaFire, FaClock, FaDumbbell, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>({ totalWorkouts: 0, totalCalories: 0, totalDuration: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      api.get(`/progress/statistics/${user.id}`).then(res => {
          setStats(res.data);
          setLoading(false);
      });
    }
  }, [user]);

  if (!user) return null;

  // Minimal İstatistik Kartı
  const StatCard = ({ title, value, unit, icon, link, colorClass }: any) => (
    <Link to={link} style={{ textDecoration: 'none' }}>
        <Card className="h-100 border-0 stat-card" style={{borderRadius: '12px', border: '1px solid #e5e7eb'}}>
            <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                    <div className={`p-2 rounded-3 me-3 bg-${colorClass} bg-opacity-10 text-${colorClass}`}>
                        {icon}
                    </div>
                    <div className="text-muted fw-medium small">{title}</div>
                </div>
                <div className="d-flex align-items-baseline">
                    <h2 className="fw-bold text-dark mb-0 me-2">{value}</h2>
                    <span className="text-muted small">{unit}</span>
                </div>
            </Card.Body>
        </Card>
    </Link>
  );

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h3 className="fw-bold text-dark mb-1">Merhaba, {user.name}</h3>
                <p className="text-muted small mb-0">Bugünkü antrenman özeti</p>
            </div>
            <div className="text-end text-muted small">
                {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
        </div>
        
        {/* SADE ÖZET KARTI */}
        <Card className="mb-4 border-0 bg-primary text-white" style={{borderRadius: '12px'}}>
            <Card.Body className="p-4 d-flex align-items-center justify-content-between">
                <div>
                    <h5 className="fw-bold mb-1">Haftalık Durum</h5>
                    <p className="mb-0 opacity-75">Bu hafta <strong>{stats.totalWorkouts || 0}</strong> antrenman tamamladın.</p>
                </div>
                <FaCheckCircle size={40} className="opacity-50"/>
            </Card.Body>
        </Card>

        {loading && <div className="text-center py-4"><Spinner animation="border" variant="primary" size="sm"/></div>}

        <Row className="g-3">
          <Col md={3} sm={6}>
            <StatCard 
                title="Toplam Antrenman" 
                value={stats.totalWorkouts} 
                unit="Seans"
                icon={<FaDumbbell size={20}/>} 
                colorClass="primary"
                link="/member/workouts"
            />
          </Col>
          <Col md={3} sm={6}>
            <StatCard 
                title="Yakılan Kalori" 
                value={stats.totalCalories} 
                unit="kcal"
                icon={<FaFire size={20}/>} 
                colorClass="danger"
                link="/member/progress"
            />
          </Col>
          <Col md={3} sm={6}>
            <StatCard 
                title="Toplam Süre" 
                value={stats.totalDuration} 
                unit="dk"
                icon={<FaClock size={20}/>} 
                colorClass="warning"
                link="/member/progress"
            />
          </Col>
          <Col md={3} sm={6}>
            <StatCard 
                title="Beslenme Planı" 
                value="Aktif" 
                unit="Plan"
                icon={<FaChartLine size={20}/>} 
                colorClass="success"
                link="/member/nutrition"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
