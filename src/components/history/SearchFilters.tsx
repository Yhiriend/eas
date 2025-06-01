import { Filter, CalendarIcon, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface SearchFiltersProps {
    selectedDate: Date | undefined;
    onDateSelect: (date: Date | undefined) => void;
}

export function SearchFilters({ selectedDate, onDateSelect }: SearchFiltersProps) {
    return (
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-blue-600" />
                    <span>Filtros de Búsqueda</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : "Seleccionar fecha"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={selectedDate} onSelect={onDateSelect} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label>Estudiante</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Buscar estudiante..." className="pl-10" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Grupo</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos los grupos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los grupos</SelectItem>
                                <SelectItem value="10a">10A</SelectItem>
                                <SelectItem value="10b">10B</SelectItem>
                                <SelectItem value="10c">10C</SelectItem>
                                <SelectItem value="11a">11A</SelectItem>
                                <SelectItem value="11b">11B</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="present">Presente</SelectItem>
                                <SelectItem value="absent">Ausente</SelectItem>
                                <SelectItem value="late">Tardanza</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 