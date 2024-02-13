import React from 'react';
import Navbar from './Navbar';
import User from './User';

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Navbar />
            <User />
        </div>
    );
};

export default Home;