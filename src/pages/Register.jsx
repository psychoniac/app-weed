import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(email, password);
            navigate('/');
        } catch(err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Inscription</button>
            </form>
        </div>
    );
};

export default Register;