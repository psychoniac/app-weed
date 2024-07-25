import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const productCollection = collection(db, 'products');

export const addProdcut = async (product) => {
    await addDoc(productCollection, product);
};

export const getProducts = async () => {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};