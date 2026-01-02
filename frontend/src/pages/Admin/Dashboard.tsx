import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { api.get('/users/statistics').then(res => setStats(res.data)); }, []);

  return (
    <div className="App">
      <Navbar />
      <Container>
        <h2 className="mb-4 text-danger">Sistem Yönetimi (Admin)</h2>
        <Row>
          <Col md={4}><Card className="p-4 text-center shadow"><h4>Toplam Kullanıcı</h4><div className="display-4">{stats?.totalUsers || 0}</div></Card></Col>
          <Col md={4}><Card className="p-4 text-center shadow"><h4>Aktif Antrenörler</h4><div className="display-4 text-warning">{stats?.totalTrainers || 0}</div></Card></Col>
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
