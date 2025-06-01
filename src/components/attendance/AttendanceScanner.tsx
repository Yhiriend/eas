import { Fingerprint } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AttendanceScannerProps {
    isScanning: boolean;
    onScan: () => void;
}

export function AttendanceScanner({ isScanning, onScan }: AttendanceScannerProps) {
    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Registro de Asistencia</CardTitle>
                <CardDescription>Sistema de identificación biométrica en tiempo real</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                <div
                    className={cn(
                        "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-1000 shadow-lg",
                        isScanning
                            ? "bg-gradient-to-r from-green-400 to-blue-500 animate-pulse scale-110"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105",
                    )}
                >
                    <Fingerprint className="h-16 w-16 text-white" />
                </div>

                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">{isScanning ? "Identificando..." : "Coloque su dedo"}</h3>
                    <p className="text-gray-600">
                        {isScanning ? "Procesando huella dactilar" : "En el sensor biométrico"}
                    </p>
                </div>

                <Button
                    onClick={onScan}
                    disabled={isScanning}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                    {isScanning ? "Escaneando..." : "Iniciar Identificación"}
                </Button>

                {isScanning && (
                    <div className="w-full space-y-4 animate-fade-in">
                        <Progress value={66} className="w-full" />
                        <div className="flex items-center justify-center space-x-2 text-blue-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm">Comparando con base de datos...</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 