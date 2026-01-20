import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../../../shared/Navbar/Navbar';
import Footer from '../../../shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
    <>
<div className='flex flex-col min-h-screen'>
    <ToastContainer></ToastContainer>
<Navbar/>
<div className="flex-1">
    <Outlet></Outlet>

    </div>
    <Footer></Footer>

</div>
 

    
    </>
    );
};

export default MainLayout;