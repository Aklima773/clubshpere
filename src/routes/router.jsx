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
import CreateClubs from '../Pages/CreateClub/CreateClubs';
import MyClubs from '../Pages/Dashboard/ManagerDashboard/MyClubs';
import ManagerDashboard from '../Pages/Dashboard/ManagerDashboard/ManagerDashboard';
import ManagerRoute from './ManagerRoute/ManagerRoute';
import MyClubsUpdate from '../Pages/Dashboard/ManagerDashboard/MyClubsUpdate';
import RegesteredClubs from '../Pages/Dashboard/AdminDashboard/RegesteredClubs';

import CategoryClubs from '../Pages/CategoryClubs/CategoryClubs';
import CreateCategory from '../Pages/Category/CreateCategory';
import Categories from '../Pages/Categories/Categories';

import ClubDetails from '../Components/ClubCard/ClubDetails';
import CreateEvents from '../Pages/CreateEvents/CreateEvents';
import MyEvents from '../Pages/Dashboard/ManagerDashboard/MyEvents';


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
            {
                path:'/categories/:id',
                element: <CategoryClubs/>
            },
            {
                path: '/club/:id',
                element: <ClubDetails></ClubDetails>
            }

           
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
        path: 'admin',
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
        children: [
            {
                path: "users",
                element: <AllUsers></AllUsers>
            },
            {
                path: "registeredclubs",
                element: <RegesteredClubs></RegesteredClubs>
            },
            {
                path:'createcategory',
                element:<CreateCategory></CreateCategory>
            },
            {
                path: 'categories',
                element:<Categories></Categories>
            },
            
       
         
            
           
        ]
    },

    {
        path:'manager',
        element: <ManagerRoute><ManagerDashboard></ManagerDashboard></ManagerRoute>,
        children: [
            {
                path: "createclubs",
                element: <CreateClubs></CreateClubs>
                
            },
            {
                path: "myclubs",
                element: <MyClubs></MyClubs>
            },
            {
                path:"myclubs/:id",
                element: <MyClubsUpdate></MyClubsUpdate>
            },
            {
                path: "createevents",
                element: <CreateEvents></CreateEvents>
            },
            {
                path: "myevents",
                element: <MyEvents></MyEvents>
            }
           
        ]
    }
  
]
}
    

]

)

export default router;