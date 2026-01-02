import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import MemberDashboard from './pages/Member/Dashboard';
import TrainerDashboard from './pages/Trainer/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/UserManagement';
import Workouts from './pages/Member/Workouts';
import Exercises from './pages/Member/Exercises';
import Progress from './pages/Member/Progress';
import WorkoutDetail from './pages/Member/WorkoutDetail';
import WorkoutRun from './pages/Member/WorkoutRun';
import CreateWorkout from './pages/Trainer/CreateWorkout';
import ManageExercises from './pages/Trainer/ManageExercises';
import MemberStats from './pages/Trainer/MemberStats';
import Nutrition from './pages/Member/Nutrition';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children, roles }: { children: JSX.Element, roles?: string[] }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const RoleBasedRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'trainer') return <Navigate to="/trainer" replace />;
  return <Navigate to="/member" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<RoleBasedRedirect />} />
        
        {/* ÜYE SAYFALARI */}
        <Route path="/member" element={<PrivateRoute roles={['member']}><MemberDashboard /></PrivateRoute>} />
        <Route path="/member/workouts" element={<PrivateRoute roles={['member']}><Workouts /></PrivateRoute>} />
        <Route path="/member/workouts/:id" element={<PrivateRoute roles={['member', 'trainer']}><WorkoutDetail /></PrivateRoute>} />
        <Route path="/member/workouts/:id/run" element={<PrivateRoute roles={['member']}><WorkoutRun /></PrivateRoute>} />
        <Route path="/member/exercises" element={<PrivateRoute roles={['member']}><Exercises /></PrivateRoute>} />
        <Route path="/member/progress" element={<PrivateRoute roles={['member']}><Progress /></PrivateRoute>} />
        
        {/* KANKA İŞTE BURASI: Hem 'member' hem 'trainer' girebilsin dedik */}
        <Route path="/member/nutrition" element={<PrivateRoute roles={['member', 'trainer']}><Nutrition /></PrivateRoute>} />
        
        {/* ANTRENÖR SAYFALARI */}
        <Route path="/trainer" element={<PrivateRoute roles={['trainer']}><TrainerDashboard /></PrivateRoute>} />
        <Route path="/trainer/create-workout" element={<PrivateRoute roles={['trainer']}><CreateWorkout /></PrivateRoute>} />
        <Route path="/trainer/manage-exercises" element={<PrivateRoute roles={['trainer']}><ManageExercises /></PrivateRoute>} />
        <Route path="/trainer/member-stats/:userId" element={<PrivateRoute roles={['trainer']}><MemberStats /></PrivateRoute>} />
        
        {/* ADMİN SAYFALARI */}
        <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><AdminUsers /></PrivateRoute>} />
        
        <Route path="*" element={<RoleBasedRedirect />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
