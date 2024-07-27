import ProductForm from '../components/ProductForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const Admin = () => {
    const [user] = useAuthState(auth);

    if (!user) {
        return <div>Veuillez vous connecter pour accéder à cette page.</div>;
    }

    return (
        <div>
            <h1>Page Administrateur</h1>
            <ProductForm />
        </div>
    );
};

export default Admin;