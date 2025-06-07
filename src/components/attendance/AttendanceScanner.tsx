import { Fingerprint } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useMqtt } from "@/hooks/useMqtt";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { registerAttendance } from "@/services/attendanceService";

export function AttendanceScanner() {
    const { isConnected, fingerprintImage, sendCommand } = useMqtt();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (fingerprintImage && isScanning) {
            console.log('Fingerprint data received:', fingerprintImage);
            handleAttendance(fingerprintImage.id);
        }
    }, [fingerprintImage, isScanning]);

    const handleAttendance = async (fingerprintId: string) => {
        try {
            setIsProcessing(true);
            const result = await registerAttendance(fingerprintId);
            
            toast({
                title: result.success ? "Asistencia registrada" : "Error",
                description: result.message,
                variant: result.success ? "default" : "destructive",
            });

        } catch (error) {
            console.error('Error al registrar asistencia:', error);
            toast({
                title: "Error",
                description: "Hubo un error al registrar la asistencia",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
            setIsScanning(false);
        }
    };

    const handleScan = () => {
        if (!isConnected) {
            toast({
                title: "Error de conexión",
                description: "No hay conexión con el lector de huellas",
                variant: "destructive",
            });
            return;
        }

        setIsScanning(true);
        sendCommand('scan');
    };

    const handleCancel = () => {
        setIsScanning(false);
        setIsProcessing(false);
    };

    const isActive = isScanning || isProcessing;

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
                        isActive
                            ? "bg-gradient-to-r from-green-400 to-blue-500 animate-pulse scale-110"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105",
                    )}
                >
                    <Fingerprint className="h-16 w-16 text-white" />
                </div>

                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">
                        {isScanning ? "Identificando..." : isProcessing ? "Procesando..." : "Coloque su dedo"}
                    </h3>
                    <p className="text-gray-600">
                        {isScanning ? "Procesando huella dactilar" : isProcessing ? "Registrando asistencia" : "En el sensor biométrico"}
                    </p>
                </div>

                <div className="w-full space-y-4">
                    <Button
                        onClick={handleScan}
                        disabled={isActive}
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                        {isScanning ? "Escaneando..." : isProcessing ? "Procesando..." : "Iniciar Identificación"}
                    </Button>

                    {isActive && (
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            size="lg"
                            className="w-full"
                        >
                            Cancelar
                        </Button>
                    )}
                </div>

                {isActive && (
                    <div className="w-full space-y-4 animate-fade-in">
                        <Progress value={66} className="w-full" />
                        <div className="flex items-center justify-center space-x-2 text-blue-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm">
                                {isScanning ? "Comparando con base de datos..." : "Registrando asistencia..."}
                            </span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 