import { Activity, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AttendanceRecord {
    id: number;
    name: string;
    code: string;
    group: string;
    time: string;
    status: string;
}

interface RecentActivityProps {
    records: AttendanceRecord[];
}

export function RecentActivity({ records }: RecentActivityProps) {
    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Actividad Reciente</span>
                </CardTitle>
                <CardDescription>Últimos registros de asistencia</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {records.map((record) => (
                        <div key={record.id} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback>
                                    {record.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-medium">{record.name}</p>
                                <p className="text-sm text-gray-600">
                                    {record.code} - {record.group}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{record.time}</p>
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Presente
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 