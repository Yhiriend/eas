import { Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
    id: number;
    name: string;
    code: string;
    group: string;
    time: string;
    status: string;
}

interface TodayRecordsProps {
    records: AttendanceRecord[];
}

export function TodayRecords({ records }: TodayRecordsProps) {
    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>Registros de Hoy</span>
                </CardTitle>
                <CardDescription>Asistencias registradas en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {records.map((record, index) => (
                        <div
                            key={record.id}
                            className={cn(
                                "flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 transform",
                                "bg-gradient-to-r from-green-50 to-blue-50 border border-green-200",
                                "animate-slide-in",
                            )}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">{record.name}</p>
                                <p className="text-sm text-gray-600">
                                    {record.code} - Grupo {record.group}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-green-700">{record.time}</p>
                                <Badge className="bg-green-100 text-green-800 border-green-300">Confirmado</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 