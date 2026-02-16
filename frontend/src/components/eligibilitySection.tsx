interface SubjectEligibility {
    subjectId: number;
    subjectName: string;
    percentage: number;
    eligiblity: boolean;
}

interface Props {
    minimumRequired: number
    subjects: SubjectEligibility[];

}

export default function EligibilitySection({ minimumRequired, subjects }: Props) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">
                Eligiblity Status (Min:{minimumRequired}%)
            </h2>
            {subjects.map((s) => (
                <div key={s.subjectId} className="flex justify-between border-b py-2">
                    <span>{s.subjectName}</span>
                    <span className={s.eligiblity ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {s.eligiblity ? 'Eligible' : 'Not Eligible'}
                    </span>
                </div>
            ))}
        </div>
    );
}