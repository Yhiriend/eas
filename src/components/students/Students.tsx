import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudentForm } from "./StudentForm";

interface StudentsProps {
    isScanning: boolean;
    onScan: () => void;
}

export function Students({ isScanning, onScan }: StudentsProps) {
    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Gestión de Estudiantes</span>
                </CardTitle>
                <CardDescription>Registrar y administrar estudiantes del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <StudentForm isScanning={isScanning} onScan={onScan} />
                <div className="flex justify-end space-x-4">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Registrar Estudiante</Button>
                </div>
            </CardContent>
        </Card>
    );
} 