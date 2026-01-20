import React from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router';

import Container from '../../Components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';
import useAuth from '../../CustomHooks/useAuth';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const {user} = useAuth();

    const {id} =useParams();

    const navigate =useNavigate();
    const location = useLocation();
    
    const axiosSecure = useAxiosSecure();

    const { isLoading: eventsLoading, data: event} = useQuery({
        queryKey: ['event', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/event/${id}`);
            
            return res.data;
        }
    })

   
    
    

if(eventsLoading) return <Loading></Loading>
const isExpired = new Date().getTime() > event.eventDate;



const handleJoinEvent = async () => {
  

  if (isExpired) {
      toast.error('Event has expired!');
      return;
  }

  try {
      const joinRequest = {
          userEmail: user.email,
          userName: user.displayName,
          eventId: event._id,
          eventName: event.eventName,
          eventDate: event.eventDate,
          clubName: event.clubName,
          managerEmail: event.managerEmail,
          status: 'pending', // pending, approved, rejected
          appliedAt: new Date().getTime()
      };

      const res = await axiosSecure.post('/join-event', joinRequest);

     
      
      if (res.data.insertedId || res.data.message === 'Application sent successfully') {
          toast.success(' Joining application sent successfully! Wait for manager approval.', {
              position: 'top-right',
              autoClose: 2000
          });
      }
  } catch (error) {
    console.error('Join error:', error.response?.data || error.message);
      toast.error('Failed to send application! Try again.');
      
  }
};
    
    
    return (
        <Container>
           

            <div className="hero mt-20">
  <div className="hero-content flex-col lg:flex-row-reverse gap-30">
    <img
      src={event?.eventImage}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold"> {event.eventName}</h1>
      <p className="py-6">
       {event.description}
      </p>


      <div className="card-actions flex justify-between items-center mt-6 gap-15">
                        <div><p className='text-[18px] text-primary'>Membership Cost: <span className='text-[14px] bg-gray-200 p-2 rounded-xl text-primary font-extrabold'>{event.membershipFee === 0 ? "Free" : event.membershipFee}</span></p>
                        
                        <p className='mt-2 text-[18px] text-neutral font-bold'>Event Date: {new Date(event.eventDate).toLocaleDateString('en-GB')}</p></div>
                        <div className="">


                          {/* joining condition  */}

                        {isExpired ? (
    <button disabled className="btn btn-disabled bg-red-400 w-full rounded-3xl font-bold text-lg">
        Event Expired
    </button>
) : user ? (
    <button
        onClick={handleJoinEvent}
        className="btn bg-primary hover:bg-amber-200 text-white w-full rounded-3xl font-bold text-lg shadow-xl hover:shadow-2xl"
    >
        Join Event
    </button>
) : (
    <button
        onClick={() => navigate('/login', { state: { from: location.pathname } })}
        className="btn bg-neutral hover:bg-amber-200 text-primary w-full rounded-3xl font-bold text-lg"
    >
        Login to Join
    </button>
)}

                        
                        
                      
            </div>
                        
                      </div>

     
     
    </div>
  </div>
</div>
</Container>
    );
};

export default EventDetails;