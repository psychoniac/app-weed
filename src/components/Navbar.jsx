import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../services/authService';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const [role, setRole] = useState('');

    useEffect(() => {
        if (user) {
            const fetchUserRole = async () => {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                setRole(userDoc.data()?.role || '');
            };
            fetchUserRole();
        }
    }, [user ]);

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