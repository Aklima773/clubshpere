import React from 'react';

import Container from '../../Components/Container/Container';
import Loading from '../../Components/Loading/Loading';
import { NavLink } from 'react-router';
import useClubs from '../../CustomHooks/useClubs';

const Clubs = () => {

    const {clubs, clubsLoading} =useClubs();

   

    if(clubsLoading) return <Loading></Loading>
    return (
        <div>

<Container className='my-10'>
        <h1 className="text-3xl text-primary font-extrabold pb-5 mt-15">
          Avaialable Clubs
        </h1>
      

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-col-4 gap-6 mt-8"> 
            {
                clubs.map((club)=>
                
                    <div key={club._id} className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                      <img className='w-[300px]'
                        src={club.bannerImage}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{club.ClubName}</h2>
                      <p>{club.description}</p>

                      <div className='flex justify-between items-center mt-3'>
                        {/* <div>
                            <span className={`bg-green-500 p-2 rounded-xl ${club.status === "rejected" && "bg-amber-700"} `}>{club.status}</span>

                        </div> */}

                      
                      </div>
                      <div className="card-actions flex justify-between items-center mt-2">
                        <div><p className='text-[18px] text-secondary'>Membership Cost: <span className='text-[14px] bg-gray-200 p-2 rounded-xl text-primary font-extrabold'>{club.membershipFee === 0 ? "Free" : club.membershipFee}</span></p></div>
                        <div className="">
            <button className={`btn bg-primary text-white hover:bg-amber-200  hover:text-primary transition-colors duration-200 font-bold text-[16px]
            text-primary rounded-3xl `}><NavLink to={`/club/${club._id}`}>View Club</NavLink></button>
            </div>
                        
                      </div>
                    </div>
                  </div>
                
                )
            }
            </div>

          
            </Container>

            
        </div>

    );
};

export default Clubs;