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
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <Link className='navbar-brand' to='/'>WEED</Link>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>HOME</Link>
                    </li>
                    {user ? (
                        <>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/products">Produits</Link>
                            </li>
                            {role === 'admin' && (
                                <li className='nav-item'>
                                    <Link className='nav-link' to="/admin">Admin</Link>
                                </li>
                            )}
                            <li className='nav-item'>
                                <Link className='nav-link' to="/profile">Mon profil</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-item' to='/cart'>Mon panier</Link>
                            </li>
                            <li className='nav-item'>
                                <button className='btn btn-link nav-link' onClick={logout}>Déconnexion</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Inscription</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Connexion</Link>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">A propos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;