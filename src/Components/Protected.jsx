import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({children}) => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children ;
};

export default Protected;