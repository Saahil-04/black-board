interface Props {
    percentage: number,
    total: number;
    present: number;
}

export default function AttendanceCard({ percentage, total, present }: Props) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">
                Overall Attendance
            </h2>

            <div className="text-4xl font-bold text-blue-600">
                {percentage}%
            </div>

            <div className="text-4xl font-bold text-blue-600">
                {present}/{total} classes attended
            </div>
        </div>
    );
}