
import React from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router';
import Loading from '../../Components/Loading/Loading';
import Container from '../Container/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import useAuth from '../../CustomHooks/useAuth';



const ClubDetails = () => {
  const {user} = useAuth();

    const {clubId} = useParams();
    console.log(clubId);

    
    const axiosSecure = useAxiosSecure();

   
    const { data: club, isLoading: clubLoading } = useQuery({
      queryKey: ['club', clubId],
      enabled: !!clubId,
      queryFn: async () => {
        const res = await axiosSecure.get(`/club/${clubId}`);
        return res.data;
      }
    });

    const { data: clubEvents, isLoading: eventsLoading } = useQuery({
      queryKey: ['clubEvents', clubId],
      enabled: !!clubId,  // Only fetch after main event loads
      queryFn: async () => {
        const res = await axiosSecure.get(`events/club/${clubId}`);
        return res.data;
      }

    });
  

    const navigate = useNavigate();
    const location = useLocation();

    const handleGetStarted = () =>{
      navigate('/login', {
        state: {from: location.pathname}
      });
    }

    if(clubLoading || eventsLoading) return <Loading/>
    if (!club) return <div className="text-center py-20"><h2>Club not found</h2></div>;


    return (
        <div>
          
            <div className="hero mt-10 max-w-300 mx-auto">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={club.bannerImage}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">{club.clubName}</h1>
      <p className="py-6">
       {club.description}
      </p>

<div className='flex justify-between items-center gap-10'>
<div>
<span className='text-amber-400'>Location: {club.location.city},{club.location.area}</span>
</div>

<div>
<span className='text-primary'>Memeber Ship: {club.membershipFee === 0? "Free" : club.membershipFee}</span>
</div>

</div>
      
      <br/>
     {!user &&  <button onClick={handleGetStarted} className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
    text-primary rounded-3xl"><NavLink  to={'/login'}>Get Started</NavLink></button>}
    
    </div>
  </div>


</div>

<div>

<Container className='my-10'>
        <h1 className="text-3xl text-primary font-extrabold pb-5 mt-15 mt-6">
          Avaialable Events of {club.clubName}
        </h1>
      

      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-col-4 gap-6 mt-8"> 
            {
                clubEvents.map((event)=>
                
                    <div key={event._id} className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                      <img className='w-[300px]'
                        src={event.eventImage}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{event.eventName}</h2>
                      <p>{event.description}</p>

                      <div className='flex justify-between items-center mt-3'>
                        <div>
                            <span className='bg-green-500 p-2 rounded-xl'>{event.status}</span>

                        </div>

                        <div>
                            <span className='text-[16px] text-neutral font-bold'>Event Date: {new Date(event.eventDate).toLocaleDateString('en-GB')}</span>
                        </div>
                      </div>
                      <div className="card-actions flex justify-between items-center mt-6">
                        <div><p className='text-[18px] text-secondary'>Membership Cost: <span className='text-[14px] bg-gray-200 p-2 rounded-xl text-primary font-extrabold'>{event.membershipFee === 0 ? "Free" : event.membershipFee}</span></p></div>




                        {/* button  */}
                        <div className="">

                    
                            <button className={`btn bg-primary text-white hover:bg-amber-200  hover:text-primary transition-colors duration-200 font-bold text-[16px]
                              text-primary rounded-3xl  `}><NavLink to={`/events/${event._id}`}>View Event</NavLink>
                              </button>
                          
              
            </div>
                        
                      </div>
                    </div>
                  </div>
                
                )
            }
            </div>


            
            </Container>

            
        </div>
        </div>
    );
};

export default ClubDetails;