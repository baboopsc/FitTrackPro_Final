import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface NutritionPlan {
  id: number;
  name: string;
  description: string;
  content: string;
  calories: number;
  type: string;
}

const Nutrition: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<NutritionPlan[]>([]);
  const [activePlanId, setActivePlanId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', content: '', calories: 2000, type: 'Genel' });

  useEffect(() => {
    loadPlans();
    // KANKA ARTIK DATABASE'DEN GELEN BİLGİYİ KULLANIYORUZ
    if (user?.activeNutritionPlan) {
        setActivePlanId(user.activeNutritionPlan.id);
    } else {
        // Eğer login olduğunda user objesinde gelmediyse (refresh gerekir bazen), manuel çekelim:
        api.get(`/users`).then(res => {
            const me = res.data.find((u: any) => u.id === user?.id);
            if (me?.activeNutritionPlan) setActivePlanId(me.activeNutritionPlan.id);
        });
    }
  }, [user]);

  const loadPlans = async () => {
    try {
      const res = await api.get('/nutrition');
      setPlans(res.data);
    } catch (e) { console.error("Hata"); }
  };

  // PLANI SEÇME İŞLEMİ (DATABASE GÜNCELLEME)
  const handleActivate = async (planId: number) => {
    try {
        // Backend'e "Bu user'ın planını güncelle" diyoruz
        await api.put(`/users/${user.id}`, { activeNutritionPlan: { id: planId } });
        
        setActivePlanId(planId);
        alert("✅ Beslenme planın profilinle eşleşti! Antrenörün de artık bunu görecek.");
    } catch (error) {
        alert("Plan seçilemedi.");
    }
  };

  const handleDelete = async (id: number) => {
    if(window.confirm("Silmek istediğine emin misin?")) {
        await api.delete(`/nutrition/${id}`);
        loadPlans();
    }
  };

  const openEdit = (plan: NutritionPlan) => {
    setEditingId(plan.id);
    setFormData({ name: plan.name, description: plan.description, content: plan.content, calories: plan.calories, type: plan.type });
    setShowModal(true);
  };

  const openNew = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', content: '', calories: 2000, type: 'Genel' });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
        if (editingId) await api.put(`/nutrition/${editingId}`, formData);
        else await api.post('/nutrition', formData);
        setShowModal(false);
        loadPlans();
    } catch(e) { alert("İşlem başarısız"); }
  };

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">🥗 Beslenme Planları</h2>
          {user?.role === 'trainer' && <Button variant="success" onClick={openNew}>+ Yeni Plan Ekle</Button>}
        </div>

        {user?.role === 'member' && activePlanId && (
            <Alert variant="success" className="text-center fw-bold">
                Şu an uyguladığın program: {plans.find(p => p.id === activePlanId)?.name || 'Yükleniyor...'}
            </Alert>
        )}

        <Row>
          {plans.map((p) => {
            const isActive = p.id === activePlanId;
            return (
                <Col md={6} lg={4} key={p.id} className="mb-4">
                  <Card className={`h-100 shadow-sm ${isActive ? 'border-success border-3' : 'border-0'}`}>
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <Card.Title className="fw-bold">{p.name}</Card.Title>
                        <Badge bg={isActive ? "success" : "info"}>{p.type}</Badge>
                      </div>
                      <h4 className="text-success my-2">{p.calories} kcal</h4>
                      <Card.Subtitle className="text-muted mb-2">{p.description}</Card.Subtitle>
                      <div className="bg-light p-2 rounded small" style={{whiteSpace: 'pre-line'}}>
                        <strong>İçerik:</strong><br/>{p.content}
                      </div>
                      
                      <div className="mt-3">
                          {user?.role === 'trainer' ? (
                              <div className="d-flex gap-2">
                                  <Button variant="warning" size="sm" className="w-50" onClick={() => openEdit(p)}><FaEdit/> Düzenle</Button>
                                  <Button variant="danger" size="sm" className="w-50" onClick={() => handleDelete(p.id)}><FaTrash/> Sil</Button>
                              </div>
                          ) : (
                              <Button 
                                variant={isActive ? "success" : "outline-primary"} 
                                size="sm" className="w-100"
                                onClick={() => handleActivate(p.id)}
                                disabled={isActive}
                              >
                                {isActive ? "Uygulanıyor ✅" : "Bu Planı Seç"}
                              </Button>
                          )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
            );
          })}
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
           {/* Modal içeriği aynı... */}
          <Modal.Header closeButton><Modal.Title>{editingId ? "Planı Düzenle" : "Yeni Beslenme Planı"}</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className="mb-2"><Form.Label>Plan Adı</Form.Label><Form.Control value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/></Form.Group>
                <Form.Group className="mb-2"><Form.Label>Amaç</Form.Label><Form.Control value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}/></Form.Group>
                <Form.Group className="mb-2"><Form.Label>Menü / Liste</Form.Label><Form.Control as="textarea" rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}/></Form.Group>
                <Row>
                    <Col><Form.Group className="mb-2"><Form.Label>Kalori</Form.Label><Form.Control type="number" value={formData.calories} onChange={e => setFormData({...formData, calories: +e.target.value})}/></Form.Group></Col>
                    <Col><Form.Group className="mb-2"><Form.Label>Tip</Form.Label><Form.Select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}><option>Genel</option><option>Kilo Verme</option><option>Kas Yapma</option></Form.Select></Form.Group></Col>
                </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer><Button onClick={handleSave}>Kaydet</Button></Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};
export default Nutrition;
