import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function GroupStats() {
    const groups = ["10A", "10B", "10C", "11A", "11B"];

    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>Estadísticas por Grupo</span>
                </CardTitle>
                <CardDescription>Asistencia por grupo académico</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {groups.map((group) => {
                        const percentage = 85 + Math.random() * 15;
                        return (
                            <div key={group} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Grupo {group}</span>
                                    <span>{percentage.toFixed(1)}%</span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
} 