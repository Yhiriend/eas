import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NotificationsSettings() {
    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span>Alertas y Notificaciones</span>
                </CardTitle>
                <CardDescription>Configurar alertas automáticas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h4 className="font-semibold">Alertas de Ausencia</h4>
                        <div className="space-y-2">
                            <Label>Notificar después de</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar tiempo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 minutos</SelectItem>
                                    <SelectItem value="30">30 minutos</SelectItem>
                                    <SelectItem value="60">1 hora</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Reportes Automáticos</h4>
                        <div className="space-y-2">
                            <Label>Frecuencia de envío</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar frecuencia" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Diario</SelectItem>
                                    <SelectItem value="weekly">Semanal</SelectItem>
                                    <SelectItem value="monthly">Mensual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Guardar Configuración</Button>
            </CardContent>
        </Card>
    );
} 