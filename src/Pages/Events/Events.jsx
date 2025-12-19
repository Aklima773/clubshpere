import React from 'react';
import useEvents from '../../CustomHooks/useEvents';
import Loading from '../../Components/Loading/Loading';
import Container from '../../Components/Container/Container';
import { NavLink } from 'react-router';

const Events = () => {

    const {events, eventsLoading} = useEvents();

    

    if(eventsLoading) return <Loading></Loading>
    return (
        <div>

<Container className='my-10'>
        <h1 className="text-3xl text-primary font-extrabold pb-5 mt-15">
          UpComing Events
        </h1>
      

      <div className="flex grid grid-cols-1 md:grid-cols-3 lg:grid-col-4 gap-4 mt-8"> 
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

                      <div className='flex justify-between items-center mt-3'>
                        <div>
                            <span className='bg-green-500 p-2 rounded-xl'>{event.status}</span>

                        </div>

                        <div>
                            <span className='text-[16px] text-neutral font-bold'>Event Date: {event.eventDate}</span>
                        </div>
                      </div>
                      <div className="card-actions flex justify-between items-center mt-6">
                        <div><p className='text-[18px] text-secondary'>Membership Cost: <span className='text-[14px] bg-gray-200 p-2 rounded-xl text-primary font-extrabold'>{event.membershipFee === 0 ? "Free" : event.membershipFee}</span></p></div>
                        <div className="">
            <button className="btn bg-primary text-white hover:bg-amber-200  hover:text-primary transition-colors duration-200 font-bold text-[16px]
            text-primary rounded-3xl"><NavLink to={'/login'}>Join Event</NavLink></button>
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

export default Events;