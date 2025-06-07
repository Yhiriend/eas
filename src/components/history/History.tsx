import { SearchFilters } from "./SearchFilters";
import { AttendanceHistory } from "./AttendanceHistory";
import { useAttendanceStore } from "@/store/attendanceStore";
import { useEffect } from "react";

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
}

export function History({ selectedDate, onDateSelect }: HistoryProps) {
    const { todayRecords, setTodayRecords } = useAttendanceStore();

    useEffect(() => {
        // Here you would typically set up your realtime listener for today's records
        // and update the store using setTodayRecords
        // Example:
        // const unsubscribe = onSnapshot(query(collection(db, 'attendance'), 
        //     where('date', '==', format(new Date(), 'yyyy-MM-dd'))), 
        //     (snapshot) => {
        //         const records = snapshot.docs.map(doc => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }));
        //         setTodayRecords(records);
        //     });
        // return () => unsubscribe();
    }, []);

    return (
        <div className="space-y-6">
            <SearchFilters selectedDate={selectedDate} onDateSelect={onDateSelect} />
            <AttendanceHistory records={selectedDate ? [] : todayRecords} />
        </div>
    );
} 