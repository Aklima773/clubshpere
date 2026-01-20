import React from 'react';
import Container from '../../Components/Container/Container';
import useAuth from '../../CustomHooks/useAuth';
import { Link } from 'react-router';

const MyProfile = () => {

    const {user} =useAuth();
    return (
    <>
    <Container>
    <div className="card card-sm bg-base-200 max-w-100 mt-20 shadow mx-auto mb-6">
  <figure className="hover-gallery h-70">
    <img src={user?.photoURL} />

  </figure>
  <div className="card-body">
    <h2 className="card-title flex justify-between">
        Hello! 
     <p className='text-xl uppercase text-primary'>{user?.displayName}</p>
  
    </h2>

    <div className='flex justify-around items-center'>
    <Link to={'/memberevents/:email'}><button className="btn bg-primary hover:bg-base-200 hover:text-primary text-white text-sm p-6">My Events</button></Link>
    {/* <Link to={'/managefood'}><button className="btn bg-neutral text-white p-6">Donated Foods</button></Link>
    <Link to={'/myfoodrequest'}><button className="btn bg-neutral text-white p-6">Requested Foods</button></Link> */}

    </div>
  </div>
</div>

    </Container>
    </>
    );
};

export default MyProfile;