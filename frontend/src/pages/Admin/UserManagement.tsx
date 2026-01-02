import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Form, Card } from 'react-bootstrap';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { FaTrash, FaUserEdit, FaUserPlus } from 'react-icons/fa';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { loadUsers(); }, []);
  const loadUsers = () => api.get('/users').then(res => setUsers(res.data));

  const deleteUser = (id: number) => {
    if(window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
      api.delete(`/users/${id}`).then(() => loadUsers());
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Container>
        <div className="d-flex justify-content-between mb-4">
          <h2 className="text-danger font-weight-bold">Sistem Kullanıcı Yönetimi</h2>
          <Button variant="danger" onClick={() => setShowModal(true)}><FaUserPlus /> Yeni Kullanıcı</Button>
        </div>
        <Card className="shadow border-0">
          <Table hover responsive className="mb-0">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th><th>İsim</th><th>Email</th><th>Rol</th><th>Durum</th><th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><Badge bg={u.role === 'admin' ? 'danger' : u.role === 'trainer' ? 'warning' : 'primary'}>{u.role.toUpperCase()}</Badge></td>
                  <td>{u.isActive ? <Badge bg="success">Aktif</Badge> : <Badge bg="secondary">Pasif</Badge>}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2"><FaUserEdit /></Button>
                    <Button variant="outline-danger" size="sm" onClick={() => deleteUser(u.id)}><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};
export default UserManagement;
