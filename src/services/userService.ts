import { firebaseApp } from "@/config/firebase";
import { collection, addDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import type { User } from "@/context/AuthContext";

const db = getFirestore(firebaseApp);

export type CreateUserData = {
    username: string;
    fullname: string;
    password: string;
};

export async function registerProfessor(userData: CreateUserData): Promise<User> {
    try {
        // Create a new document reference with auto-generated ID
        const userRef = doc(collection(db, "users"));
        
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