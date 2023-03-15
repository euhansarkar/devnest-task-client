import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../Contexts/AuthProvider/AuthProvider';

const PrivateRoutes = ({children}) => {
    const navigate = useNavigate();
    const currentUser = useUser();
    const location = useLocation();
    if(!currentUser){
       return  navigate(`/login`);
    }else{
        return children;
    }
};

export default PrivateRoutes;