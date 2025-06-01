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
    isScanning: boolean;
    onScan: () => void;
    records: AttendanceRecord[];
}

export function Attendance({ isScanning, onScan, records }: AttendanceProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceScanner isScanning={isScanning} onScan={onScan} />
            <TodayRecords records={records} />
        </div>
    );
} 