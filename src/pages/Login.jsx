import { useState } from "react";
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch(err){
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email :</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                 <div className="form-group">
                    <label>Mot de passe :</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>
        </div>
    );
};

export default Login;