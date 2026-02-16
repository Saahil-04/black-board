import { useEffect, useState } from 'react';
import api from '../api/axios';
import AttendanceCard from '../components/attendanceCard';
import SubjectCard from '../components/subjectCard';
import EligibilitySection from '../components/eligibilitySection';

export default function StudentDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [eligibility, setEligibility] = useState<any>(null)

  useEffect(() => {
    api.get('/attendance/me/summary')
      .then((res) => setSummary(res.data));

    api.get('/attendance/me/eligibility')
      .then((res) => setEligibility(res.data))
  }, []);

  if (!summary || !eligibility) return <div className='p-6'>Loading...</div>;

  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>
        Student DashBoard
      </h1>

      <AttendanceCard
        percentage={summary.overall.percentage}
        total={summary.overall.totalClasses}
        present={summary.overall.presentClasses}
      />

      <div className='grid grid-cols-1 md:grid-col-2 gap-6 mt-6'>
        {summary.subjects.map((s: any) => (
          <SubjectCard
            key={s.subjectId}
            subjectName={s.subjectName}
            percentage={s.percentage}
            total={s.totalClasses}
            present={s.presentClasses}
          />
        ))}
      </div>

      <EligibilitySection
        minimumRequired={eligibility.minimumRequired}
        subjects={eligibility.subjects}
      />

    </div>
  );
}
