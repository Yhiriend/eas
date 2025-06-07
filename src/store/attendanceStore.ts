import { create } from 'zustand';
import { format } from 'date-fns';

export interface AttendanceRecord {
    id: number;
    name: string;
    code: string;
    group: string;
    time: string;
    status: string;
}

interface AttendanceStore {
    records: AttendanceRecord[];
    todayRecords: AttendanceRecord[];
    isLoading: boolean;
    hasMore: boolean;
    page: number;
    setRecords: (records: AttendanceRecord[]) => void;
    setTodayRecords: (records: AttendanceRecord[]) => void;
    addRecords: (records: AttendanceRecord[]) => void;
    setLoading: (loading: boolean) => void;
    setHasMore: (hasMore: boolean) => void;
    incrementPage: () => void;
    resetPage: () => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
    records: [],
    todayRecords: [],
    isLoading: false,
    hasMore: true,
    page: 1,
    setRecords: (records) => set({ records }),
    setTodayRecords: (records) => set({ todayRecords: records }),
    addRecords: (records) => set((state) => ({ 
        records: [...state.records, ...records],
        hasMore: records.length > 0
    })),
    setLoading: (loading) => set({ isLoading: loading }),
    setHasMore: (hasMore) => set({ hasMore }),
    incrementPage: () => set((state) => ({ page: state.page + 1 })),
    resetPage: () => set({ page: 1, records: [], hasMore: true }),
})); 