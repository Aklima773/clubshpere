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

  const link = 
  <>
  <li className='text-[18px]'><NavLink to ="/" className={({isActive})=> isActive ? "text-neutral underline underline-offset-6 decoration-3 decoration-secondary" : ""
  }>Home</NavLink></li>
  <li className='text-[18px]'><NavLink to ="/events" className={({isActive})=> isActive ? "text-neutral underline underline-offset-6 decoration-3 decoration-secondary" : ""
  }>Events</NavLink></li>
  <li className='text-[18px]'><NavLink to ="/clubs" className={({isActive})=> isActive ? "text-neutral underline underline-offset-6 decoration-3 decoration-secondary" : ""
  }>Clubs</NavLink></li>
  
  {
  user && (
    <>
    <li className="relative">
      <div className="dropdown dropdown-hover">
        {/* Profile trigger */}
        <label
          tabIndex={0}
          className="cursor-pointer text-[12px] md:text-[18px] font-medium"
        >
          Profile
        </label>

        {/* Dropdown menu */}
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 z-50"
        >
          <li className="text-[16px]">
            <NavLink
              to="/myprofile"
              className={({ isActive }) =>
                isActive
                  ? "text-neutral underline underline-offset-6 decoration-3 decoration-secondary"
                  : ""
              }
            >
              My Profile
            </NavLink>
          </li>

          <li className="text-[16px]">
            <NavLink to={`/memberevents/${user?.email}`}>
              My Events
            </NavLink>
          </li>
        </ul>
      </div>
    </li>

<li className='text-[18px]'><NavLink to ="/dashboard" className={({isActive})=> isActive ? "text-neutral underline underline-offset-6 decoration-3 decoration-secondary" : ""
}>Dashboard</NavLink></li>
</>
  )
}

 

 
  
  </>
    return (
     <>
     <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
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
    <NavLink to="/" className="btn btn-ghost text-xl w-[100px] p-8 hover:bg-amber-200 transition-colors duration-200"><Logo></Logo></NavLink>
  </div>
  
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {link}
    </ul>
  </div>
  <div className="navbar-end">
    {/* <div className='search-box mr-4'>
    <label className="input border border-neutral">
  <svg className="h-[1em] opacity-50 text-primary " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" className='text-primary' required placeholder="Search" />
</label>
    </div> */}


    {
      user? <div className='flex justify-center items-center gap-4'>
        <button className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
    text-primary rounded-3xl" onClick={handleSignout}>SignOut</button> 

      <button className='text-center text-sm text-primary'><NavLink to={"/myprofile"}> {user?.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className={"w-15 h-15 rounded-full object-cover bg-primary border-2 border-neutral "}
                title={user?.displayName || "User"}
              />
            )}</NavLink>{user?.displayName || "User"}</button>
      </div>
    :
    <button className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
    text-primary rounded-3xl"><NavLink to={'/login'}>Login</NavLink></button>
    }
    
  </div>
  </div>
  </Container>
  
</div>
     </>
    );
};

export default Navbar;