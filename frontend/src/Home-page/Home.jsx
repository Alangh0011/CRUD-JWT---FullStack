import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import User from './User';
import Admin from './Admin';
import jwt_decode from 'jwt-decode';

const Home = () => {
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        // Obtener el token JWT del almacenamiento local
        const token = localStorage.getItem('token');
        // Decodificar el token JWT para obtener información sobre los roles del usuario
        if (token) {
            const decodedToken = jwt_decode(token);
            setUserRoles(decodedToken.authorities.map(auth => auth.authority));
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <Navbar />
            {userRoles.includes('ROLE_ADMIN') ? <Admin /> : <User />}
        </div>
    );
};

export default Home;
