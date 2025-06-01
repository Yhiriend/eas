import { SearchFilters } from "./SearchFilters";
import { AttendanceHistory } from "./AttendanceHistory";

interface AttendanceRecord {
    id: number;
    name: string;
    code: string;
    group: string;
    time: string;
    status: string;
}

interface HistoryProps {
    selectedDate: Date | undefined;
    onDateSelect: (date: Date | undefined) => void;
    records: AttendanceRecord[];
}

export function History({ selectedDate, onDateSelect, records }: HistoryProps) {
    return (
        <div className="space-y-6">
            <SearchFilters selectedDate={selectedDate} onDateSelect={onDateSelect} />
            <AttendanceHistory records={records} />
        </div>
    );
} 