import React from 'react';
import { Outlet } from 'react-router';
import Container from '../../../Components/Container/Container';

const AdminDashboard = () => {
    return (
        <div>

            
           
            <Outlet></Outlet>
        </div>
    );
};

export default AdminDashboard;