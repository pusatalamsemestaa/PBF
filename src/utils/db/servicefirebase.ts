import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
  setDoc
} from "firebase/firestore";
import app from "./firebase"; // Pastikan path ini sesuai dengan file konfigurasi firebase Anda
import bcrypt from "bcryptjs";

const db = getFirestore(app);

// --- Fungsi Reusable untuk Produk ---
export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

// --- Fungsi Autentikasi ---

// 1. Sign In (Credentials)
export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.size > 0) {
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
}

// 2. Sign Up (Manual Registration)
export async function signUp(
  userData: { email: string; fullname: string; password: string; role?: string },
  callback: Function
) {
  const q = query(collection(db, "users"), where("email", "==", userData.email));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      return callback({
        status: "error",
        message: "User already exists",
      });
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user"; // Default role

    await addDoc(collection(db, "users"), userData);
    
    callback({
      status: "success",
      message: "User registered successfully",
    });
    
  } catch (error: any) {
    console.error("Error adding document: ", error);
    callback({
      status: "error",
      message: "Failed to register user",
    });
  }
}

// 3. Sign In with Social (Google, GitHub, dll) - REUSABLE VERSION
export const signInWithSocial = async (userData: any, callback: Function) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      // User sudah ada, ambil data lama (untuk menjaga role) dan update data profil
      const existingUser = querySnapshot.docs[0].data();
      const userId = querySnapshot.docs[0].id;
      
      userData.role = existingUser.role || "user";
      
      // Update data terbaru (misal foto profil atau nama yang mungkin berubah)
      await updateDoc(doc(db, "users", userId), userData);
      
      callback({ 
        status: true, 
        message: `User logged in with ${userData.type}`, 
        data: { ...userData, id: userId } 
      });
    } else {
      // User baru, simpan ke Firestore
      userData.role = "user"; 
      
      // Menggunakan addDoc agar Firestore men-generate ID otomatis
      const docRef = await addDoc(collection(db, "users"), userData);
      
      callback({ 
        status: true, 
        message: `User registered with ${userData.type}`, 
        data: { ...userData, id: docRef.id } 
      });
    }
  } catch (error: any) {
    console.error("Social Login Error: ", error);
    callback({ 
      status: false, 
      message: "Authentication failed" 
    });
  }
};

// Alias untuk menjaga kecocokan dengan kode lama Anda jika diperlukan
export const signInWithGoogle = signInWithSocial;