import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../services/authService';
import { useEffect} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useAppState, useAppDispatch } from '../context/AppContext';

const Navbar = () => {
    const { user, role } = useAppState();
    const dispatch = useAppDispatch();
    const [firebaseUser] = useAuthState(auth)

    useEffect(() => {
        // si l'utilisateur est connecté, on récupère ses infos et son role
        if (firebaseUser) {
            const fetchUserRole = async () => {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
               const userRole = userDoc.data()?.role || '';

               // mise a jour de l'état global avec les info de l'utilisateur et son role
               dispatch({ type: 'SET_USER', payload: firebaseUser});
               dispatch({ type: 'SET_ROLE', payload: userRole });
            };
            fetchUserRole();
        } else {
            // si l'utilisateur se déconnecte, on réinitialise l'état global
            dispatch({ type: 'SET_USER', payload: null});
            dispatch({ type: 'SET_ROLE', payload: ''});
        }
    }, [firebaseUser, dispatch ]);

    return (
        <nav>
            <Link to='/'>WEED</Link>
            <div>
                <ul>
                    <li>
                        <Link to='/'>HOME</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/products">Produits</Link>
                            </li>
                            {role === 'admin' && (
                                <li>
                                    <Link to="/admin">Admin</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/profile">Mon profil</Link>
                            </li>
                            <li>
                                <Link  to='/cart'>Mon panier</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Déconnexion</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/register">Inscription</Link>
                            </li>
                            <li>
                                <Link to="/login">Connexion</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/about">A propos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;