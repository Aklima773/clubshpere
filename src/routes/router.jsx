import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Pages/Layouts/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import MyProfile from '../Pages/MyProfile/MyProfile';
import Register from '../Pages/Auth/Register/Register';
import Login from '../Pages/Auth/Login/Login';
import PrivateRoutes from './PrivateRoute/PrivateRoutes';
import AdminRoute from './AdminRoute/AdminRoute';
import Dahsboard from '../Pages/Dashboard/DashboardLayout/Dahsboard';
import AdminDashboard from '../Pages/Dashboard/AdminDashboard/AdminDashboard';
import AllUsers from '../Pages/Users/AllUsers';


const router = createBrowserRouter([

    {
        path: '/',
        Component: MainLayout,
        children:[
            {
                index: true,
                element: <Home></Home>
            },

            {
                path: '/myprofile',
                element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
            },

           
        ]
    },

    {
        path:'/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },

   //dashboard

   {
    path: '/dashboard',
    element:<PrivateRoutes><Dahsboard></Dahsboard></PrivateRoutes>,

children:[

    // only admin routes 
    {
        path: '/dashboard/admindashboard',
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
    },
    {
        path: '/dashboard/users',
        element: <AdminDashboard><AllUsers></AllUsers></AdminDashboard>
    }
]
}
    

]

)

export default router;