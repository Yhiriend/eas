import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { ref, set, get, getDatabase, push } from "firebase/database";
import { firebaseApp } from "@/config/firebase";

const dbFirestore = getFirestore(firebaseApp);
const dbRealtime = getDatabase(firebaseApp);

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

export const registerAttendance = async (fingerprintId: string): Promise<{ success: boolean; message: string; student?: StudentAttendance }> => {
    try {
        // Buscar estudiante por fingerprint
        const studentsRef = collection(dbFirestore, 'students');
        const q = query(studentsRef, where("fingerprint", "==", fingerprintId));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return {
                success: false,
                message: "No se encontró ningún estudiante con esta huella dactilar"
            };
        }

        const student = querySnapshot.docs[0].data();
        const now = new Date();
        
        // Formato para la fecha del registro (solo fecha)
        const formattedDate = now.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Formato para attendanceDate (fecha y hora)
        const formattedDateTime = now.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        // Obtener la referencia a la colección de asistencias
        const attendancesRef = ref(dbRealtime, 'attendances');
        
        // Obtener todas las asistencias para verificar duplicados
        const attendancesSnapshot = await get(attendancesRef);
        let attendances = attendancesSnapshot.exists() ? attendancesSnapshot.val() : {};
        
        // Verificar si el estudiante ya tiene registro de asistencia hoy
        const todayAttendance = Object.values(attendances).find((att: any) => att.date === formattedDate);
        
        if (todayAttendance) {
            const existingAttendance = (todayAttendance as Attendance).students.find(
                (s: StudentAttendance) => s.code === student.code
            );

            if (existingAttendance) {
                return {
                    success: false,
                    message: "El estudiante ya tiene registro de asistencia hoy"
                };
            }
        }

        // Crear el registro de asistencia
        const studentAttendance: StudentAttendance = {
            name: student.name,
            course: student.course,
            code: student.code,
            attendanceDate: formattedDateTime
        };

        // Si ya existe una asistencia para hoy, agregar el estudiante
        if (todayAttendance) {
            const attendanceKey = Object.keys(attendances).find(key => 
                (attendances[key] as Attendance).date === formattedDate
            );
            
            if (attendanceKey) {
                attendances[attendanceKey].students.push(studentAttendance);
                await set(ref(dbRealtime, `attendances/${attendanceKey}`), attendances[attendanceKey]);
            }
        } else {
            // Si no existe asistencia para hoy, crear una nueva
            const newAttendance: Attendance = {
                date: formattedDate,
                students: [studentAttendance]
            };
            
            // Usar push para generar una nueva clave numérica
            const newAttendanceRef = push(attendancesRef);
            await set(newAttendanceRef, newAttendance);
        }

        return {
            success: true,
            message: `Se ha registrado la asistencia de ${student.name}`,
            student: studentAttendance
        };

    } catch (error) {
        console.error('Error al registrar asistencia:', error);
        return {
            success: false,
            message: "Hubo un error al registrar la asistencia"
        };
    }
}; 