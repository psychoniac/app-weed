import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../services/authService';

const Navbar = () => {
    const [user] = useAuthState(auth);

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