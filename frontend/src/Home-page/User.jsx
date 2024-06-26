import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserView = () => {
    // Estados para almacenar la lista de productos, el nombre y el ID del producto a buscar
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        // Llama a la función para cargar la lista de productos cuando el componente se monta
        fetchProductos();
    }, []);

    // Función para obtener la lista de productos desde el backend
    const fetchProductos = async () => {
        try {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        const response = await axios.get('http://localhost:8080/producto/lista', {
            headers: {
            Authorization: `Bearer ${token}`, // Agregar el token a la cabecera Authorization
            },
        });
        setProductos(response.data); // Actualizar el estado con la lista de productos obtenida
        } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        }
    };
    
    // Función para buscar un producto por nombre
    const buscarProductoPorNombre = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/producto/detailname/${nombre}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProductos([response.data]);// Actualizar el estado con el producto encontrado
        } catch (error) {
            console.error('Error al obtener el producto por nombre:', error);
        }
    };
    // Función para buscar un producto por ID
    const buscarProductoPorId = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/producto/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProductos([response.data]);// Actualizar el estado con el producto encontrado
        } catch (error) {
            console.error('Error al obtener el producto por nombre:', error);
        }
    };
    
    

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
        
        {/* Formulario para buscar productos por nombre */}
        <div className="mt-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                <label className="text-lg font-medium mr-3">Buscar por nombre</label>
                <div className="flex">
                    <input
                        className="w-full border-2 border-gray-100 rounded-md px-4 py-2 mt-2 bg-transparent mr-2"
                        placeholder="ingresa el nombre"
                        name="nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                    />
                    <button 
                        onClick={() => buscarProductoPorNombre()}
                        className="active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
        
         {/* Formulario para buscar productos por ID */}
        <div className="mt-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                <label className="text-lg font-medium mr-3">Buscar por id</label>
                <div className="flex">
                    <input
                        className="w-full border-2 border-gray-100 rounded-md px-4 py-2 mt-2 bg-transparent mr-2"
                        placeholder="ingresa el id"
                        name="nombre"
                        onChange={(e) => setId(e.target.value)}
                        type="text"
                    />
                    <button 
                        onClick={() => buscarProductoPorId()}
                        className="active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
            {/* Tabla para mostrar la lista de productos */}
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td className="border px-4 py-2">{producto.id}</td>
                            <td className="border px-4 py-2">{producto.nombre}</td>
                            <td className="border px-4 py-2">${producto.precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    };

export default UserView;

