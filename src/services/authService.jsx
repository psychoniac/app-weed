import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Définir le rôle basé sur l'email
    const role = email === 'jlnko@hotmail.fr' ? 'admin' : 'client';

    // Stockez des information supplémentaires dans firestore
    await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,  // par défaut, tous les utilisateurs sont des clients
    });

    return user;
};

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);