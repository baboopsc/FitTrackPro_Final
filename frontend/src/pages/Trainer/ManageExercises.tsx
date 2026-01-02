import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageExercises: React.FC = () => {
  const [exercises, setExercises] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', muscleGroup: '', description: '' });

  useEffect(() => { load(); }, []);
  const load = () => api.get('/exercises').then(res => setExercises(res.data));

  const handleSave = async () => {
    try {
      if (editId) {
        // DÜZENLEME
        await api.put(`/exercises/${editId}`, formData);
      } else {
        // EKLEME
        await api.post('/exercises', formData);
      }
      setShow(false);
      setEditId(null);
      setFormData({ name: '', muscleGroup: '', description: '' });
      load();
    } catch (err) { alert("İşlem başarısız!"); }
  };

  const handleDelete = async (id: number) => {
    if(window.confirm("Bu egzersizi silmek istiyor musun?")) {
        await api.delete(`/exercises/${id}`);
        load();
    }
  };

  const openEdit = (ex: any) => {
      setEditId(ex.id);
      setFormData({ name: ex.name, muscleGroup: ex.muscleGroup, description: ex.description });
      setShow(true);
  };

  const openNew = () => {
      setEditId(null);
      setFormData({ name: '', muscleGroup: '', description: '' });
      setShow(true);
  };

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h3 className="fw-bold">🛠️ Egzersiz Kütüphanesi</h3>
          <Button variant="success" onClick={openNew}>+ Yeni Egzersiz</Button>
        </div>
        
        <Table striped bordered hover className="bg-white">
          <thead className="bg-dark text-white"><tr><th>Egzersiz</th><th>Bölge</th><th>İşlemler</th></tr></thead>
          <tbody>
            {exercises.map((ex: any) => (
              <tr key={ex.id}>
                <td>{ex.name}</td>
                <td>{ex.muscleGroup}</td>
                <td>
                    <Button size="sm" variant="warning" className="me-2" onClick={() => openEdit(ex)}><FaEdit/></Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(ex.id)}><FaTrash/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton><Modal.Title>{editId ? "Egzersizi Düzenle" : "Yeni Egzersiz"}</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2"><Form.Label>Adı</Form.Label><Form.Control value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Bölge</Form.Label><Form.Control value={formData.muscleGroup} onChange={e => setFormData({...formData, muscleGroup: e.target.value})}/></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Açıklama</Form.Label><Form.Control value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}/></Form.Group>
          </Modal.Body>
          <Modal.Footer><Button onClick={handleSave}>Kaydet</Button></Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};
export default ManageExercises;
