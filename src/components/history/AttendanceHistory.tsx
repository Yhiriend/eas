import { Clock, Download, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useAttendanceStore } from "@/store/attendanceStore";
import { useEffect } from "react";

interface AttendanceRecord {
    id: number;
    name: string;
    code: string;
    group: string;
    time: string;
    status: string;
}

interface AttendanceHistoryProps {
    records: AttendanceRecord[];
}

export function AttendanceHistory({ records }: AttendanceHistoryProps) {
    const { 
        isLoading, 
        hasMore, 
        page, 
        addRecords, 
        setLoading, 
        incrementPage 
    } = useAttendanceStore();

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            // Here you would typically fetch more records from your database
            // Example:
            // const newRecords = await fetchAttendanceRecords(page + 1);
            // addRecords(newRecords);
            // incrementPage();
        } catch (error) {
            console.error('Error loading more records:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        <span>Historial de Asistencia</span>
                    </span>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Estudiante</TableHead>
                                <TableHead>Código</TableHead>
                                <TableHead>Grupo</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Hora</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id} className="hover:bg-blue-50/50">
                                    <TableCell className="font-medium">{record.name}</TableCell>
                                    <TableCell>{record.code}</TableCell>
                                    <TableCell>{record.group}</TableCell>
                                    <TableCell>{format(new Date(), "dd/MM/yyyy")}</TableCell>
                                    <TableCell>{record.time}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Presente
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                    {hasMore && (
                        <div className="flex justify-center pt-4">
                            <Button 
                                variant="outline" 
                                onClick={handleLoadMore}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Cargando...
                                    </>
                                ) : (
                                    'Cargar más'
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 