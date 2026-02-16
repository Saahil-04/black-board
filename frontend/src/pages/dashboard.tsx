import { useAuth } from '../auth/authContext';
import StudentDashboard from './studentDashboard';
// import TeacherDashboard from './TeacherDashboard';

export default function Dashboard() {
  const { auth } = useAuth();

  if (auth.role === 'STUDENT') return <StudentDashboard />;
//   if (auth.role === 'TEACHER') return <TeacherDashboard />;

  return <div>Admin Dashboard</div>;
}
