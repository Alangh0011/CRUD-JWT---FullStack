import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import User from './User';
import Admin from './Admin';
import { jwtDecode } from "jwt-decode";

const Home = () => {
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        // Obtener el token del almacenamiento local
        const token = localStorage.getItem('token');
        console.log(token); // Agrega esta línea
    
        if (token) {
          try {
            // Decodificar el token JWT
            const decodedToken = jwtDecode(token);
            
            // Verificar si el token decodificado tiene la propiedad 'authorities'
            if (decodedToken && decodedToken.authorities) {
              // Obtener los roles del usuario desde la carga útil (payload) del token
              const roles = decodedToken.authorities.map(authority => authority.authority);
      
              // Actualizar el estado con los roles del usuario
              setUserRoles(roles);
            }
          } catch (error) {
            console.error('Error al decodificar el token', error);
            console.log('Token:', token); // Agrega esta línea para ver el token en caso de error
        }
        
        }
      }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <Navbar />
            {userRoles.includes('ROLE_ADMIN') && !userRoles.includes('ROLE_USER') ? <Admin /> : <User />}
        </div>
    );
};

export default Home;
