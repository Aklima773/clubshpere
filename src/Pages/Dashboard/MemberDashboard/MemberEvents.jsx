import React from 'react';
import { NavLink, useParams } from 'react-router';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import useAuth from '../../../CustomHooks/useAuth';
import Container from '../../../Components/Container/Container';

const MemberEvents = () => {


    const {user} =useAuth();
    // const {email} =useParams();

    const axiosSecure = useAxiosSecure();

   
    const { data: events =[], isLoading: eventsLoading } = useQuery({
      queryKey: ['events', user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(`/memberevents/${user?.email}`);
        return res.data;
      }
    });


    


    if(eventsLoading) return <Loading></Loading>
    return (
        <div>
            
            <Container className='my-10'>
                <div className='flex justify-between items-center'>
                <h1 className="text-3xl text-primary font-extrabold pb-5 mt-15 mt-6">
          All My Events
        </h1>
      
      <p className="text-3xl text-primary font-extrabold pb-5 mt-15 mt-6">Total: ({events.length}
      )</p>
                </div>
        

      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-col-4 gap-6 mt-8"> 
            {
                events.map((event)=>
                
                    <div key={event._id} className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                      <img className='w-[300px]'
                        src={event.eventImage}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{event.eventName}</h2>
                      <p>{event.description}</p>

                      <div className='flex justify-between items-center mt-3 gap-4'>
                        <div>
                            <span className='bg-green-500 p-2 rounded-xl'>{event.status}</span>

                        </div>

                        <div>
                            <span className='text-[16px] text-neutral font-bold'>Event Date: {new Date(event.eventDate).toLocaleDateString('en-GB')}</span>
                        </div>

                        <div>
                            <span className='text-[16px] text-neutral font-bold'>Apply Date: {new Date(event.appliedAt).toLocaleDateString('en-GB')}</span>
                        </div>
                      </div>
                      <div className="card-actions flex justify-between items-center mt-6">
                        <div><p className='text-[18px] text-secondary'>Membership Cost: <span className='text-[14px] p-2 rounded-xl text-primary font-extrabold'>{event.membershipFee === 0 ? "Free" : event.membershipFee}</span></p></div>




                        {/* button  */}
                        {/* <div className="">

                    
                            <button className={`btn bg-primary text-white hover:bg-amber-200  hover:text-primary transition-colors duration-200 font-bold text-[16px]
                              text-primary rounded-3xl  `}><NavLink to={`/events/${event._id}`}>V Event</NavLink>
                              </button>
                          
              
            </div> */}
                        
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

export default MemberEvents;