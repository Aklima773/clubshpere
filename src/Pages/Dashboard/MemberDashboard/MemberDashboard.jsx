import React from 'react';
import { Outlet } from 'react-router';

const MemberDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default MemberDashboard;