import React, { useEffect } from "react";
import './App.css'
import { useState } from "react";
import {
    BarChart3,
    Clock,
    Fingerprint,
    PieChart,
    Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Students } from "@/components/students/Students";
import { Users as UsersComponent } from "@/components/users/Users";
import { Attendance } from "@/components/attendance/Attendance";
import { History } from "@/components/history/History";
import { Reports } from "@/components/reports/Reports";
import { Login } from "@/components/layout/Login";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { initializeCoursesCache } from "./services/userService";

function DashboardApp() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [isScanning, setIsScanning] = useState(false)
    const { user } = useAuth();

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

    useEffect(() => {
        initializeCoursesCache();
    }, []);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Header />
            <div className="container mx-auto px-6 lg:px-36 py-8">
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
                    <TabsContent value="dashboard">
                        <Dashboard stats={stats} recentAttendance={recentAttendance} />
                    </TabsContent>
                    {/* Students/Users */}
                    <TabsContent value="students">
                        {user?.role === 'admin' ? (
                            <UsersComponent />
                        ) : (
                            <Students isScanning={isScanning} onScan={handleFingerprint} />
                        )}
                    </TabsContent>
                    {/* Attendance */}
                    <TabsContent value="attendance">
                        <Attendance isScanning={isScanning} onScan={handleFingerprint} records={recentAttendance} />
                    </TabsContent>
                    {/* History */}
                    <TabsContent value="history">
                        <History selectedDate={selectedDate} onDateSelect={setSelectedDate} records={recentAttendance} />
                    </TabsContent>
                    {/* Reports */}
                    <TabsContent value="reports">
                        <Reports />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const location = useLocation();
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return <>{children}</>;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<RequireAuth><DashboardApp /></RequireAuth>} />
                    {/* Redirect any unknown route to login */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
