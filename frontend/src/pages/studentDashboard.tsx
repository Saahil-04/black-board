import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function StudentDashboard() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    api.get('/attendance/me/summary')
      .then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div>
      <h2>Overall: {summary.overall.percentage}%</h2>

      {summary.subjects.map((s: any) => (
        <div key={s.subjectId}>
          {s.subjectName} - {s.percentage}%
        </div>
      ))}
    </div>
  );
}
