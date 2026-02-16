interface Props {
    subjectName: string;
    percentage: number;
    total: number;
    present: number;
}

export default function SubjectCard({ subjectName, percentage, total, present }: Props) {

    const color = percentage >= 75 ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white shadow-md rounded-xl p-5">
            <h3 className="text-lg font-medium mb-2">
                {subjectName}
            </h3>

            <div className={`text-2xl font-bold ${color}`}>
                {percentage}%
            </div>
            <div className="text-gray-500 text-sm mt-1">
                {present}/{total} classes attended
            </div>
        </div >
    );
}