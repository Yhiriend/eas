import { firebaseApp } from "@/config/firebase";
import { collection, addDoc, doc, setDoc, getFirestore, getDocs, query, where, getDoc } from "firebase/firestore";
import { ref, onValue, get } from "firebase/database";
import { getDatabase } from "firebase/database";
import type { User } from "@/context/AuthContext";

const dbFirestore = getFirestore(firebaseApp);
const dbRealtime = getDatabase(firebaseApp);

const COURSES_CACHE_KEY = 'courses_cache';
const COURSES_CACHE_TIMESTAMP_KEY = 'courses_cache_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

export type CreateUserData = {
    username: string;
    fullname: string;
    password: string;
};

export async function registerProfessor(userData: CreateUserData): Promise<User> {
    try {
        // Create a new document reference with auto-generated ID
        const userRef = doc(collection(dbFirestore, "users"));
        
        // Create the user object with default values
        const newUser: User = {
            id: userRef.id,
            username: userData.username,
            fullname: userData.fullname,
            role: 'professor',
            active: true
        };

        // Add the document to Firestore
        await setDoc(userRef, {
            ...newUser,
            password: userData.password // Note: In a real application, this should be hashed
        });

        return newUser;
    } catch (error) {
        console.error("Error registering professor:", error);
        throw error;
    }
}

interface StudentData {
    name: string;
    course: string;
    code: string;
    image: string;
    fingerprint: string;
}

export const registerStudent = async (studentData: StudentData) => {
    try {
        const docRef = await addDoc(collection(dbFirestore, 'students'), {
            ...studentData,
            createdAt: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error registering student:', error);
        throw error;
    }
};

interface Course {
    id: string;
    name: string;
}

export const getCourses = async (): Promise<Course[]> => {
    try {
        const coursesSnapshot = await getDocs(collection(dbFirestore, 'courses'));
        const courses = coursesSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }));
        console.log('Cursos obtenidos de Firestore:', courses);
        return courses;
    } catch (error) {
        console.error('Error getting courses:', error);
        throw error;
    }
};

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

export const initializeCoursesCache = async (): Promise<void> => {
    try {
        console.log('Iniciando caché de cursos...');
        const courses = await getCourses();
        
        if (!courses || courses.length === 0) {
            console.warn('No se encontraron cursos para guardar en caché');
            return;
        }

        console.log('Guardando cursos en localStorage:', courses);
        localStorage.setItem(COURSES_CACHE_KEY, JSON.stringify(courses));
        localStorage.setItem(COURSES_CACHE_TIMESTAMP_KEY, Date.now().toString());
        
        // Verificar que se guardaron correctamente
        const savedCourses = localStorage.getItem(COURSES_CACHE_KEY);
        console.log('Cursos guardados en localStorage:', savedCourses);
    } catch (error) {
        console.error('Error initializing courses cache:', error);
        throw error;
    }
};

const getCachedCourses = (): Course[] => {
    console.log('Obteniendo cursos del caché...');
    const cachedCourses = localStorage.getItem(COURSES_CACHE_KEY);
    const timestamp = localStorage.getItem(COURSES_CACHE_TIMESTAMP_KEY);
    
    console.log('Cursos en caché:', cachedCourses);
    console.log('Timestamp del caché:', timestamp);
    
    if (!cachedCourses || !timestamp) {
        console.log('No hay caché de cursos');
        return [];
    }

    const now = Date.now();
    const cacheAge = now - parseInt(timestamp);
    console.log('Edad del caché (horas):', cacheAge / (60 * 60 * 1000));

    if (cacheAge > CACHE_DURATION) {
        console.log('Caché expirado, limpiando...');
        localStorage.removeItem(COURSES_CACHE_KEY);
        localStorage.removeItem(COURSES_CACHE_TIMESTAMP_KEY);
        return [];
    }

    const courses = JSON.parse(cachedCourses);
    console.log('Cursos recuperados del caché:', courses);
    return courses;
};

export const getTodayAttendance = async (): Promise<StudentAttendance[]> => {
    try {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const attendanceRef = ref(dbRealtime, 'attendances');
        const snapshot = await get(attendanceRef);
        
        if (!snapshot.exists()) {
            return [];
        }

        const attendances: Attendance[] = Object.values(snapshot.val());
        const todayAttendance = attendances.find(att => att.date === formattedDate);

        if (!todayAttendance?.students) {
            return [];
        }

        // Obtener cursos del caché
        const courses = getCachedCourses();
        const coursesMap = new Map(courses.map(course => [course.id, course.name]));

        // Mapear los registros de asistencia con los nombres de los cursos
        return todayAttendance.students.map(student => ({
            ...student,
            course: coursesMap.get(student.course) || 'Curso no encontrado'
        }));
    } catch (error) {
        console.error('Error getting today attendance:', error);
        throw error;
    }
}; 