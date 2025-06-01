import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth, firebaseApp } from "@/config/firebase";

const db = getFirestore(firebaseApp);

export async function login(username: string, password: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username), where("password", "==", password));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { user: { id: doc.id, ...doc.data() } };
  } else {
    throw new Error("Usuario o contraseña incorrectos");
  }
} 