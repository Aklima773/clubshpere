import React from 'react';


import { Link, NavLink } from 'react-router';

import useAuth from '../../CustomHooks/useAuth';
import { toast } from 'react-toastify';
import Container from '../../Components/Container/Container';
import Logo from '../../Components/logo/Logo';

const Navbar = () => {

  const {user, logOut} = useAuth();

  //handle signout
   //signout function handle
   const handleSignout =()=>{
    logOut()
    .then(res=>{
      console.log(res)
      toast.success('Sign out successfully! 🎉', {
              position: 'top-right',
              autoClose: 3000,})

    })
    .catch(err=>{
      console.log(err)
      toast.error(err.message || 'Sign out failed 😞', {
              position: 'top-right',
            } )
    })
  }

  const link = <>
  <li><a className='text-[18px]'><NavLink to ="/" className={({isActive})=> isActive ? "text-neutral underline underline-offset-6 decoration-3 decoration-secondary" : ""
  }>Home</NavLink></a></li>

  {
    user &&  <><li><a className='text-[18px]'><NavLink to ="myprofile" className={({isActive})=> isActive ? "text-neutral underline underline-offset-6 decoration-3 decoration-secondary" : ""
  }>My Profile</NavLink></a></li></>
  }
 
  
  </>
    return (
     <>
     <div className="navbar bg-base-100 shadow-sm">
      <Container>
        <div className='flex justify-center items-center'>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-amber-200 transition-colors duration-200 lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 colo text-blue-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {link}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl w-[100px] p-8 hover:bg-amber-200 transition-colors duration-200"><Logo></Logo></a>
  </div>
  
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {link}
    </ul>
  </div>
  <div className="navbar-end">

    {
      user? <div className='flex justify-center items-center gap-4'>
        <a className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
    text-primary" onClick={handleSignout}>SignOut</a> 

      <a className='text-center text-sm text-primary'><NavLink to={"/myprofile"}> {user?.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className={"w-15 h-15 rounded-full object-cover bg-primary border-2 border-neutral "}
                title={user?.displayName || "User"}
              />
            )}</NavLink>{user?.displayName || "User"}</a>
      </div>
    :
    <a className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
    text-primary"><NavLink to={'/login'}>Login</NavLink></a>
    }
    
  </div>
  </div>
  </Container>
  
</div>
     </>
    );
};

export default Navbar;