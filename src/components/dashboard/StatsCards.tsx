import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsProps {
    totalStudents: number;
    presentToday: number;
    absentToday: number;
    attendanceRate: number;
}

export function StatsCards({ totalStudents, presentToday, absentToday, attendanceRate }: StatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Total Estudiantes</CardTitle>
                    <Users className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
                    <p className="text-xs opacity-90 mt-1">Registrados en el sistema</p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Presentes Hoy</CardTitle>
                    <UserCheck className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{presentToday.toLocaleString()}</div>
                    <p className="text-xs opacity-90 mt-1">+12% vs ayer</p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Ausentes Hoy</CardTitle>
                    <UserX className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{absentToday}</div>
                    <p className="text-xs opacity-90 mt-1">-5% vs ayer</p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Tasa de Asistencia</CardTitle>
                    <TrendingUp className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{attendanceRate}%</div>
                    <Progress value={attendanceRate} className="mt-2 bg-white/20" />
                </CardContent>
            </Card>
        </div>
    );
} 