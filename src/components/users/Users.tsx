import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fingerprint, Wifi, WifiOff } from "lucide-react";
import { registerStudent, getCourses } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";
import { useMqtt } from "@/hooks/useMqtt";

interface Course {
    id: string;
    name: string;
}

export function Users() {
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const { toast } = useToast();
    const { status, lastMessage, sendCommand, isConnected, fingerprintImage } = useMqtt();
    const [studentData, setStudentData] = useState({
        name: '',
        code: '',
        course: '',
        image: '',
        fingerprint: ''
    });

    // Efecto para cargar los cursos
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const coursesData = await getCourses();
                setCourses(coursesData);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "No se pudieron cargar los cursos.",
                    variant: "destructive",
                });
            }
        };

        loadCourses();
    }, [toast]);

    // Efecto para manejar los mensajes del lector de huellas
    useEffect(() => {
        if (lastMessage) {
            if (lastMessage.includes('error')) {
                toast({
                    title: "Error",
                    description: "Hubo un error al registrar la huella.",
                    variant: "destructive",
                });
                setIsScanning(false);
            }
        }
    }, [lastMessage, toast]);

    // Efecto para manejar la recepción de la imagen
    useEffect(() => {
        if (fingerprintImage) {
            setStudentData(prev => ({
                ...prev,
                image: fingerprintImage.image,
                fingerprint: fingerprintImage.id
            }));
            toast({
                title: "Huella registrada",
                description: `La huella se ha registrado exitosamente con ID: ${fingerprintImage.id}`,
                variant: "default",
            });
            setIsScanning(false);
        }
    }, [fingerprintImage, toast]);

    const handleFingerprint = () => {
        if (!isConnected) {
            toast({
                title: "Error de conexión",
                description: "No hay conexión con el lector de huellas.",
                variant: "destructive",
            });
            return;
        }

        setIsScanning(true);
        const success = sendCommand('enroll');

        if (!success) {
            toast({
                title: "Error",
                description: "No se pudo enviar el comando al lector.",
                variant: "destructive",
            });
            setIsScanning(false);
        }
    };

    const handleStudentInputChange = (field: string, value: string) => {
        setStudentData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleStudentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!studentData.fingerprint) {
                throw new Error('Debe registrar la huella del estudiante');
            }

            await registerStudent(studentData);
            toast({
                title: "Estudiante registrado",
                description: "El estudiante ha sido registrado exitosamente.",
                variant: "default",
            });
            // Reset form
            setStudentData({
                name: '',
                code: '',
                course: '',
                image: '',
                fingerprint: ''
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Hubo un error al registrar el estudiante.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-6">
            <CardHeader className="pb-6">
                <CardTitle className="text-2xl">Registro de Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={handleStudentSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input 
                                id="name" 
                                placeholder="Ingrese el nombre completo" 
                                className="h-10"
                                value={studentData.name}
                                onChange={(e) => handleStudentInputChange('name', e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="code">Código</Label>
                            <Input 
                                id="code" 
                                placeholder="Ingrese el código" 
                                className="h-10"
                                value={studentData.code}
                                onChange={(e) => handleStudentInputChange('code', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="course">Curso</Label>
                            <Select 
                                value={studentData.course}
                                onValueChange={(value) => handleStudentInputChange('course', value)}
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Seleccione un curso" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Registro de Huella</Label>
                                <div className="flex items-center gap-2">
                                    {isConnected ? (
                                        <div className="flex items-center text-green-600">
                                            <Wifi className="h-4 w-4 mr-1" />
                                            <span className="text-sm">Conectado</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-600">
                                            <WifiOff className="h-4 w-4 mr-1" />
                                            <span className="text-sm">Desconectado</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="w-full h-10"
                                    onClick={handleFingerprint}
                                    disabled={isScanning || !isConnected}
                                >
                                    <Fingerprint className="h-4 w-4 mr-2" />
                                    {isScanning ? 'Escaneando...' : 'Registrar Huella'}
                                </Button>
                                {!isConnected && (
                                    <p className="text-sm text-red-500">
                                        No hay conexión con el lector de huellas
                                    </p>
                                )}
                                {fingerprintImage && (
                                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                                        <h3 className="text-sm font-medium mb-2">Vista previa de la foto</h3>
                                        <div className="relative aspect-square w-full max-w-[200px] mx-auto">
                                            <img 
                                                src={`data:image/png;base64,${fingerprintImage.image}`}
                                                alt="Huella digital"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 text-center">
                                            ID: {fingerprintImage.id}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full h-10"
                        disabled={isLoading || !studentData.fingerprint}
                    >
                        {isLoading ? 'Registrando...' : 'Registrar Estudiante'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 