import React from 'react';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './Components/Footer';

const Layouts = () => {
    return (
        <div>
            <nav className='bg-fuchsia-700 '>
                <Navbar/>
            </nav>
            <main>
                <Outlet/>
            </main>

            <footer>
                <Footer/>
            </footer>
            <ToastContainer />
        </div>
    );
};

export default Layouts;