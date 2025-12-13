import React from 'react';
import { NavLink, Outlet } from 'react-router';
import useAuth from '../../../CustomHooks/useAuth';
import { toast } from 'react-toastify';
import { FaUsersGear } from "react-icons/fa6";
import Container from '../../../Components/Container/Container';



const Dahsboard = () => {
    const {user,logOut} = useAuth();
     

    // const {role} =useRole();
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
    
    return (
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-base-200 ">
              {/* Sidebar toggle icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 "><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
            </label>

            <div className="flex justify-between items-center px-4 w-full">
 {/* //left  */}
  <div className="welcom">
    Welcome to <span className="text-[18px] text-[#f111db] ml-1">
       Club<span className="text-[#487ce0]">Sphere, </span>
    </span>
    {user && user.displayName}
  </div>

  {/* right  */}
  <div className="signout">
    {user && (
      <div className="flex items-center gap-4">
        
        <button
          className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 
          font-bold text-[16px] text-primary"
          onClick={handleSignout}
        >
          SignOut
        </button>

        <NavLink to="/myprofile" className="flex items-center gap-2 text-primary text-sm">

          {/* User photo */}
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover bg-primary border-2 border-neutral"
            />
          )}

          {/* Name + role */}
          {user.displayName || "User"}
        </NavLink>

      </div>
    )}
  </div>
</div>

          </nav>
          {/* Page content here */}

          <div>
            <Container className='mt-10'>
            <Outlet></Outlet>
            </Container>
          
          </div>
       
        </div>
      
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-50">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <button className="group bg-primary is-drawer-close:tooltip is-drawer-close:tooltip-right text-white" data-tip="Home">
                  {/* Home icon */}
                  <NavLink to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 group-hover:bg-primary"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                  <span className="is-drawer-close:hidden">Home</span>
                  </NavLink>
                </button>
              </li>
      
              {/* List item */}
              <li>
                <button className="bg-primary mt-4 text-white is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                  {/* Settings icon */}
                  <NavLink to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 bg-primary"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                  </NavLink>
                </button>
              </li>

              {/* //all users  */}
              <li>
                <button className="bg-primary mt-4 text-white is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users" >
                <NavLink to='/dashboard/users'>
                  {/* Settings icon */}
                  <FaUsersGear className="bg-primary" />

                  <span className="is-drawer-close:hidden">Users</span>
                  </NavLink>
                </button>
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
};

export default Dahsboard;