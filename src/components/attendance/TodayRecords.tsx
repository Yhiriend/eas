import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, User, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTodayAttendance } from '@/services/userService';
import { useToast } from "@/hooks/use-toast";
import { ref, onValue } from "firebase/database";
import { getDatabase } from "firebase/database";
import { firebaseApp } from "@/config/firebase";

interface StudentAttendance {
    name: string;
    course: string;
    code: string;
    attendanceDate: string;
}

interface Attendance {
    date: string;
    students: StudentAttendance[];
}

export function TodayRecords() {
    const [records, setRecords] = useState<StudentAttendance[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const dbRealtime = getDatabase(firebaseApp);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const attendanceRef = ref(dbRealtime, 'attendances');
        
        const unsubscribe = onValue(attendanceRef, async (snapshot) => {
            try {
                if (!snapshot.exists()) {
                    setRecords([]);
                    return;
                }

                const attendances = Object.values(snapshot.val()) as Attendance[];
                const todayAttendance = attendances.find(att => att.date === formattedDate);

                if (!todayAttendance?.students) {
                    setRecords([]);
                    return;
                }

                const updatedRecords = await getTodayAttendance();
                setRecords(updatedRecords);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "No se pudieron cargar los registros de asistencia.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [toast, dbRealtime]);

    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100 h-full">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>Registros de Hoy</span>
                </CardTitle>
                <CardDescription>Asistencias registradas en tiempo real</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Cargando registros...</span>
                    </div>
                ) : records.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-lg">No hay registros de asistencia para hoy</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {records.map((record, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-blue-50 p-2 rounded-full">
                                            <User className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-left">{record.name}</h3>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                    {record.code}
                                                </Badge>
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <BookOpen className="h-4 w-4 mr-1" />
                                                    {record.course}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500">{record.attendanceDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 