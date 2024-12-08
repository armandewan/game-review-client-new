import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Provider/AuthProvider';

const GoogleLogin = () => {
    const {handleGoogleSignIn} = useContext(AuthContext);
    return (
        <div className='flex flex-col items-center'>
            <div className="divider">OR</div>
            <button className='btn btn-info mb-2 mx-2' onClick={handleGoogleSignIn}>
            SignIn with Google
        </button>
        </div>
    );
};

export default GoogleLogin;