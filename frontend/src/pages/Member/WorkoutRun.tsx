import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Alert, ProgressBar } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';

const WorkoutRun: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workout, setWorkout] = useState<any>(null);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  useEffect(() => {
    api.get(`/workouts/${id}`).then(res => setWorkout(res.data));
  }, [id]);

  const toggleExercise = (exId: number) => {
    if (completedExercises.includes(exId)) {
      setCompletedExercises(completedExercises.filter(id => id !== exId));
    } else {
      setCompletedExercises([...completedExercises, exId]);
    }
  };

  const handleFinish = async () => {
    if (completedExercises.length < (workout?.workoutExercises?.length || 0)) {
        if(!window.confirm("Tüm hareketleri işaretlemedin. Yine de bitiriyor musun?")) return;
    }

    try {
      await api.post('/progress', {
        user: { id: user?.id },
        workout: { id: Number(id) },
        duration: workout.duration, // İdeal süreyi direkt kaydet
        caloriesBurned: workout.calories,
        date: new Date().toISOString(),
        weight: 0 // Kilo sormuyoruz, kilo takibi ayrı sayfada
      });
      alert("🎉 Tebrikler! Bugünkü seans tamamlandı.");
      navigate('/member');
    } catch (err) { alert("Hata!"); }
  };

  if (!workout) return <div className="text-center mt-5">Yükleniyor...</div>;

  const progress = (completedExercises.length / (workout.workoutExercises?.length || 1)) * 100;

  return (
    <div className="App">
      <Navbar />
      <Container className="mt-4" style={{maxWidth: '600px'}}>
        <h3 className="text-center fw-bold mb-3">{workout.name} - Günlük Seans</h3>
        
        <Card className="shadow-lg border-0 mb-4">
            <Card.Body>
                <ProgressBar now={progress} label={`${Math.round(progress)}%`} variant="success" className="mb-4" style={{height: '25px'}}/>
                
                {workout.workoutExercises?.map((we: any) => (
                    <div key={we.id} className="d-flex align-items-center border-bottom p-3">
                        <Form.Check 
                            type="checkbox" 
                            className="me-3" 
                            style={{transform: 'scale(1.5)'}}
                            checked={completedExercises.includes(we.id)}
                            onChange={() => toggleExercise(we.id)}
                        />
                        <div>
                            <h5 className={`mb-0 ${completedExercises.includes(we.id) ? 'text-decoration-line-through text-muted' : ''}`}>
                                {we.exercise.name}
                            </h5>
                            <small className="text-muted">3 Set x 12 Tekrar</small>
                        </div>
                    </div>
                ))}
            </Card.Body>
        </Card>

        <Button variant="success" size="lg" className="w-100 py-3 fw-bold" onClick={handleFinish}>
            <FaCheckCircle className="me-2"/> ANTRENMANI BİTİR
        </Button>
      </Container>
    </div>
  );
};
export default WorkoutRun;
