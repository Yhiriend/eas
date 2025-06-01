import { StatsCards } from "./StatsCards";
import { RecentActivity } from "./RecentActivity";
import { GroupStats } from "./GroupStats";

interface DashboardProps {
    stats: {
        totalStudents: number;
        presentToday: number;
        absentToday: number;
        attendanceRate: number;
    };
    recentAttendance: Array<{
        id: number;
        name: string;
        code: string;
        group: string;
        time: string;
        status: string;
    }>;
}

export function Dashboard({ stats, recentAttendance }: DashboardProps) {
    return (
        <div className="space-y-6">
            <StatsCards {...stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity records={recentAttendance} />
                <GroupStats />
            </div>
        </div>
    );
} 