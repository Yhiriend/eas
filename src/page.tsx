"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  CalendarIcon,
  Fingerprint,
  TrendingUp,
  Download,
  Filter,
  Search,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function BiometricAttendancePlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isScanning, setIsScanning] = useState(false)

  // Mock data
  const stats = {
    totalStudents: 1247,
    presentToday: 1089,
    absentToday: 158,
    attendanceRate: 87.3,
  }

  const recentAttendance = [
    { id: 1, name: "Ana García", code: "EST001", group: "10A", time: "08:15", status: "present" },
    { id: 2, name: "Carlos López", code: "EST002", group: "10B", time: "08:16", status: "present" },
    { id: 3, name: "María Rodríguez", code: "EST003", group: "10A", time: "08:17", status: "present" },
    { id: 4, name: "Juan Pérez", code: "EST004", group: "10C", time: "08:18", status: "present" },
  ]

  const handleFingerprint = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Fingerprint className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduAttend Pro
                </h1>
                <p className="text-sm text-gray-600">Sistema Biométrico de Asistencia</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Estudiantes</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center space-x-2">
              <Fingerprint className="h-4 w-4" />
              <span>Registro</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Historial</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Reportes</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Estudiantes</CardTitle>
                  <Users className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                  <p className="text-xs opacity-90 mt-1">Registrados en el sistema</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Presentes Hoy</CardTitle>
                  <UserCheck className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.presentToday.toLocaleString()}</div>
                  <p className="text-xs opacity-90 mt-1">+12% vs ayer</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Ausentes Hoy</CardTitle>
                  <UserX className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.absentToday}</div>
                  <p className="text-xs opacity-90 mt-1">-5% vs ayer</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Tasa de Asistencia</CardTitle>
                  <TrendingUp className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
                  <Progress value={stats.attendanceRate} className="mt-2 bg-white/20" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Actividad Reciente</span>
                  </CardTitle>
                  <CardDescription>Últimos registros de asistencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAttendance.map((record) => (
                      <div key={record.id} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {record.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{record.name}</p>
                          <p className="text-sm text-gray-600">
                            {record.code} - {record.group}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{record.time}</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Presente
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>Estadísticas por Grupo</span>
                  </CardTitle>
                  <CardDescription>Asistencia por grupo académico</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["10A", "10B", "10C", "11A", "11B"].map((group, index) => {
                      const percentage = 85 + Math.random() * 15
                      return (
                        <div key={group} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Grupo {group}</span>
                            <span>{percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Management */}
          <TabsContent value="students" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Gestión de Estudiantes</span>
                </CardTitle>
                <CardDescription>Registrar y administrar estudiantes del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                        <Button onClick={handleFingerprint} disabled={isScanning} className="w-full">
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
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Registrar Estudiante</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Registration */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    onClick={handleFingerprint}
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

              <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>Registros de Hoy</span>
                  </CardTitle>
                  <CardDescription>Asistencias registradas en tiempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {recentAttendance.map((record, index) => (
                      <div
                        key={record.id}
                        className={cn(
                          "flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 transform",
                          "bg-gradient-to-r from-green-50 to-blue-50 border border-green-200",
                          "animate-slide-in",
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{record.name}</p>
                          <p className="text-sm text-gray-600">
                            {record.code} - Grupo {record.group}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-700">{record.time}</p>
                          <Badge className="bg-green-100 text-green-800 border-green-300">Confirmado</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-6">
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
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
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
                    {recentAttendance.map((record) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Reporte Diario</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">Asistencia del día actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Reporte Semanal</span>
                  </CardTitle>
                  <CardDescription className="text-green-100">Resumen de la semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Reporte Mensual</span>
                  </CardTitle>
                  <CardDescription className="text-orange-100">Análisis completo del mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </CardContent>
              </Card>
            </div>

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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
