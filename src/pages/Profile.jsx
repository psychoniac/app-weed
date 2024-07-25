import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const Profile = () => {
    const [user] = useAuthState(auth);

    if(!user) {
        return <div>Veuillez vous connecter pour voir votre profil.</div>;
    }

    return (
        <div className='container'>
            <h1>Mon profil</h1>
            <p>Email : {user.email}</p>
            {/* D'autres informations de profil peuvent être ajoutés ici */}
        </div>
    );
};

export default Profile;