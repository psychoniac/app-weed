import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const ProtectedRoute = ({ children, role }) => {
    const [user, loading] = useAuthState(auth);
    const Navigate = useNavigate();

    if (loading) return <div>Chargement ...</div>;
    if (!user) return <Navigate to="/login" />;

    // Vérifiez le rôle si spécifié
    if (role && user?.role !== role) {
        return <Navigate to='/' />;
    }

    return children;
};

export default ProtectedRoute;