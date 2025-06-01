import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentFormProps {
    isScanning: boolean;
    onScan: () => void;
}

export function StudentForm({ isScanning, onScan }: StudentFormProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" placeholder="Ingrese el nombre del estudiante" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="code">Código Estudiantil</Label>
                        <Input id="code" placeholder="EST001" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="group">Grupo</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar grupo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10a">10A</SelectItem>
                                <SelectItem value="10b">10B</SelectItem>
                                <SelectItem value="10c">10C</SelectItem>
                                <SelectItem value="11a">11A</SelectItem>
                                <SelectItem value="11b">11B</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="estudiante@colegio.edu" />
                    </div>
                </div>
            </div>
            <div className="md:w-80">
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader className="text-center">
                        <CardTitle className="text-lg">Registro Biométrico</CardTitle>
                        <CardDescription>Coloque el dedo en el sensor</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <div
                            className={cn(
                                "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
                                isScanning
                                    ? "bg-gradient-to-r from-green-400 to-blue-500 animate-pulse"
                                    : "bg-gradient-to-r from-blue-400 to-purple-500",
                            )}
                        >
                            <Fingerprint className="h-12 w-12 text-white" />
                        </div>
                        <Button onClick={onScan} disabled={isScanning} className="w-full">
                            {isScanning ? "Escaneando..." : "Iniciar Escaneo"}
                        </Button>
                        {isScanning && (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-sm text-gray-600 mt-2">Procesando huella dactilar...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 