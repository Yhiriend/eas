import { BarChart3, PieChart, TrendingUp, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ReportCards() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Reporte Diario</span>
                    </CardTitle>
                    <CardDescription className="text-blue-100">Asistencia del día actual</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="secondary" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generar Reporte
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-0">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <PieChart className="h-5 w-5" />
                        <span>Reporte Semanal</span>
                    </CardTitle>
                    <CardDescription className="text-green-100">Resumen de la semana</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="secondary" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generar Reporte
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Reporte Mensual</span>
                    </CardTitle>
                    <CardDescription className="text-orange-100">Análisis completo del mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="secondary" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generar Reporte
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
} 