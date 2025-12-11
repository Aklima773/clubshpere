import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Pages/Layouts/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import MyProfile from '../Pages/MyProfile/MyProfile';
import Register from '../Pages/Auth/Register/Register';
import Login from '../Pages/Auth/Login/Login';


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
                path: 'myprofile',
                element: <MyProfile></MyProfile>
            }
        ]
    },

    {
        path:'login',
        element: <Login></Login>
    },
    {
        path: 'register',
        element: <Register></Register>
    }
    

]

)

export default router;