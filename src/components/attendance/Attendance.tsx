import { AttendanceScanner } from "./AttendanceScanner";
import { TodayRecords } from "./TodayRecords";

interface AttendanceRecord {
    id: number;
    name: string;
    code: string;
    group: string;
    time: string;
    status: string;
}

interface AttendanceProps {
    records: AttendanceRecord[];
}

export function Attendance({ records }: AttendanceProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <AttendanceScanner />
            </div>
            <div className="lg:col-span-2">
                <TodayRecords />
            </div>
        </div>
    );
} 