import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fingerprint, RefreshCw } from "lucide-react";
import { registerProfessor } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";

type UserType = 'student' | 'professor';

export function Users() {
    const [userType, setUserType] = useState<UserType>('student');
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [professorData, setProfessorData] = useState({
        fullname: '',
        username: '',
        password: ''
    });

    const handleFingerprint = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
        }, 3000);
    };

    const generateUsername = () => {
        if (!professorData.fullname) return;
        
        const firstName = professorData.fullname.split(' ')[0].toLowerCase();
        const randomNum = Math.floor(Math.random() * 1000);
        const generatedUsername = `${firstName}${randomNum}`;
        
        setProfessorData(prev => ({
            ...prev,
            username: generatedUsername
        }));
    };

    const handleProfessorInputChange = (field: string, value: string) => {
        setProfessorData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleProfessorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await registerProfessor(professorData);
            toast({
                title: "Profesor registrado",
                description: "El profesor ha sido registrado exitosamente.",
                variant: "default",
            });
            // Reset form
            setProfessorData({
                fullname: '',
                username: '',
                password: ''
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un error al registrar el profesor.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registro de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="student">Estudiante</TabsTrigger>
                        <TabsTrigger value="professor">Profesor</TabsTrigger>
                    </TabsList>
                    <TabsContent value="student">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input id="name" placeholder="Ingrese el nombre completo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="code">Código</Label>
                                    <Input id="code" placeholder="Ingrese el código" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="group">Grupo</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un grupo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10A">10A</SelectItem>
                                            <SelectItem value="10B">10B</SelectItem>
                                            <SelectItem value="10C">10C</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Registro de Huella</Label>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        className="w-full"
                                        onClick={handleFingerprint}
                                        disabled={isScanning}
                                    >
                                        <Fingerprint className="h-4 w-4 mr-2" />
                                        {isScanning ? 'Escaneando...' : 'Registrar Huella'}
                                    </Button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full">Registrar Estudiante</Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="professor">
                        <form className="space-y-4" onSubmit={handleProfessorSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="professorName">Nombre Completo</Label>
                                <Input 
                                    id="professorName" 
                                    placeholder="Ingrese el nombre completo"
                                    value={professorData.fullname}
                                    onChange={(e) => handleProfessorInputChange('fullname', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Nombre de Usuario</Label>
                                <div className="flex gap-2">
                                    <Input 
                                        id="username" 
                                        placeholder="Ingrese el nombre de usuario"
                                        value={professorData.username}
                                        onChange={(e) => handleProfessorInputChange('username', e.target.value)}
                                        required
                                    />
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={generateUsername}
                                        disabled={!professorData.fullname}
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input 
                                    id="password" 
                                    type="password"
                                    placeholder="Ingrese la contraseña"
                                    value={professorData.password}
                                    onChange={(e) => handleProfessorInputChange('password', e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Registrando...' : 'Registrar Profesor'}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
} 