import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FaTrash, FaEye, FaUsers, FaDumbbell, FaEdit, FaUtensils } from 'react-icons/fa';

const TrainerDashboard: React.FC = () => {
  const [members, setMembers] = useState([]);
  const [workouts, setWorkouts] = useState([]); 
  
  // Modal State'leri
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState<any>({});
  
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [editWorkout, setEditWorkout] = useState<any>({});

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    api.get('/users').then(res => setMembers(res.data.filter((u: any) => u.role === 'member')));
    api.get('/workouts').then(res => setWorkouts(res.data));
  };

  // --- ÜYE İŞLEMLERİ ---
  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Üye silinecek?")) { await api.delete(`/users/${id}`); loadData(); }
  };
  const openEditUser = (user: any) => { setEditUser(user); setShowUserModal(true); };
  const handleSaveUser = async () => {
    await api.put(`/users/${editUser.id}`, { name: editUser.name, email: editUser.email });
    setShowUserModal(false); loadData();
  };

  // --- PROGRAM İŞLEMLERİ ---
  const handleDeleteWorkout = async (id: number) => {
    if (window.confirm("Program silinecek?")) { await api.delete(`/workouts/${id}`); loadData(); }
  };
  const openEditWorkout = (w: any) => { setEditWorkout(w); setShowWorkoutModal(true); };
  const handleSaveWorkout = async () => {
    await api.put(`/workouts/${editWorkout.id}`, { 
        name: editWorkout.name, 
        duration: editWorkout.duration, 
        frequency: editWorkout.frequency, 
        difficulty: editWorkout.difficulty 
    });
    setShowWorkoutModal(false); loadData();
  };

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <h2 className="text-primary fw-bold mb-4">🏋️ Antrenör Yönetim Paneli</h2>

        {/* İSTATİSTİKLER */}
        <Row className="mb-4">
            <Col md={4}><Card className="p-3 shadow-sm text-center"><FaUsers size={30} className="text-primary mx-auto"/><h3>{members.length}</h3><span>Üye</span></Card></Col>
            <Col md={4}><Card className="p-3 shadow-sm text-center"><FaDumbbell size={30} className="text-success mx-auto"/><h3>{workouts.length}</h3><span>Program</span></Card></Col>
        </Row>

        {/* HIZLI BUTONLAR */}
        <div className="d-flex justify-content-end gap-2 mb-3">
            <Link to="/member/nutrition"><Button variant="warning" className="text-white"><FaUtensils/> Beslenme Planlarını Yönet</Button></Link>
            <Link to="/trainer/manage-exercises"><Button variant="outline-success">🛠️ Egzersiz Yönetimi</Button></Link>
            <Link to="/trainer/create-workout"><Button variant="success">➕ Yeni Program Ekle</Button></Link>
        </div>

        <Row>
            {/* ÜYE LİSTESİ */}
            <Col md={12} className="mb-4">
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white fw-bold">👥 Üye Listesi</Card.Header>
                  <Card.Body>
                    <Table hover responsive>
                      <thead><tr><th>Ad Soyad</th><th>Email</th><th>Durum</th><th>İşlemler</th></tr></thead>
                      <tbody>
                        {members.length > 0 ? members.map((m: any) => (
                          <tr key={m.id}>
                            <td>{m.name}</td><td>{m.email}</td><td><Badge bg="success">Aktif</Badge></td>
                            <td>
                                <Link to={`/trainer/member-stats/${m.id}`}><Button size="sm" variant="outline-primary" className="me-1"><FaEye/></Button></Link>
                                <Button size="sm" variant="warning" className="me-1" onClick={() => openEditUser(m)}><FaEdit/></Button>
                                <Button size="sm" variant="danger" onClick={() => handleDeleteUser(m.id)}><FaTrash/></Button>
                            </td>
                          </tr>
                        )) : <tr><td colSpan={4} className="text-center">Üye yok.</td></tr>}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
            </Col>

            {/* PROGRAM LİSTESİ */}
            <Col md={12}>
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white fw-bold">📋 Antrenman Programları</Card.Header>
                  <Card.Body>
                    <Table hover responsive striped>
                      <thead><tr><th>Program Adı</th><th>Zorluk</th><th>Sıklık</th><th>Süre</th><th>İşlemler</th></tr></thead>
                      <tbody>
                        {workouts.length > 0 ? workouts.map((w: any) => (
                          <tr key={w.id}>
                            <td className="fw-bold">{w.name}</td>
                            <td><Badge bg="info">{w.difficulty}</Badge></td>
                            <td>Haftada {w.frequency}</td>
                            <td>{w.duration} dk</td>
                            <td>
                                <Link to={`/member/workouts/${w.id}`}><Button size="sm" variant="info" className="text-white me-1"><FaEye/></Button></Link>
                                <Button size="sm" variant="warning" className="me-1" onClick={() => openEditWorkout(w)}><FaEdit/></Button>
                                <Button size="sm" variant="danger" onClick={() => handleDeleteWorkout(w.id)}><FaTrash/></Button>
                            </td>
                          </tr>
                        )) : <tr><td colSpan={5} className="text-center">Program yok.</td></tr>}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
            </Col>
        </Row>

        {/* ÜYE DÜZENLEME MODALI */}
        <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
            <Modal.Header closeButton><Modal.Title>Üye Düzenle</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-2"><Form.Label>Ad Soyad</Form.Label><Form.Control value={editUser.name} onChange={e => setEditUser({...editUser, name: e.target.value})}/></Form.Group>
                <Form.Group className="mb-2"><Form.Label>Email</Form.Label><Form.Control value={editUser.email} onChange={e => setEditUser({...editUser, email: e.target.value})}/></Form.Group>
            </Modal.Body>
            <Modal.Footer><Button onClick={handleSaveUser}>Kaydet</Button></Modal.Footer>
        </Modal>

        {/* PROGRAM DÜZENLEME MODALI */}
        <Modal show={showWorkoutModal} onHide={() => setShowWorkoutModal(false)}>
            <Modal.Header closeButton><Modal.Title>Programı Düzenle</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-2"><Form.Label>Adı</Form.Label><Form.Control value={editWorkout.name} onChange={e => setEditWorkout({...editWorkout, name: e.target.value})}/></Form.Group>
                <Row>
                    <Col><Form.Group className="mb-2"><Form.Label>Süre (dk)</Form.Label><Form.Control type="number" value={editWorkout.duration} onChange={e => setEditWorkout({...editWorkout, duration: +e.target.value})}/></Form.Group></Col>
                    <Col><Form.Group className="mb-2"><Form.Label>Sıklık (Gün)</Form.Label><Form.Control type="number" value={editWorkout.frequency} onChange={e => setEditWorkout({...editWorkout, frequency: +e.target.value})}/></Form.Group></Col>
                </Row>
                <Form.Group className="mb-2"><Form.Label>Zorluk</Form.Label>
                     <Form.Select value={editWorkout.difficulty} onChange={e => setEditWorkout({...editWorkout, difficulty: e.target.value})}>
                        <option>Beginner</option><option>Medium</option><option>Advanced</option>
                     </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer><Button onClick={handleSaveWorkout}>Kaydet</Button></Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
};
export default TrainerDashboard;
