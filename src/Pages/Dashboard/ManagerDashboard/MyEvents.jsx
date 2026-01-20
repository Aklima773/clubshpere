import React from 'react';

import useAuth from '../../../CustomHooks/useAuth';
import Loading from '../../../Components/Loading/Loading';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';
import { RiFileEditFill } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';

const MyEvents = () => {

    const {user} = useAuth();

   

    const axiosSecure = useAxiosSecure();
    

    const { isLoading: eventsLoading, data: events =[],refetch} = useQuery({
        queryKey: ['myEvents', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            return axiosSecure.get(`/myevents/${user.email}`)
            .then(res=>res.data)
            
            
        }
    })

    




    if(eventsLoading) return <Loading></Loading>

    const handleDelete =(id)=>{

        console.log(id);
  
  
   Swal.fire({
          title: 'Are you sure?',
          text: 'This event will be permanently deleted!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e11d48',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) =>{
  
          if(!result.isConfirmed) return;
  
          axiosSecure.delete(`/myevent/${id}`)
          .then(res => {
              console.log(res.data);
  
              if (res.data.deletedCount) {
                  // refresh the data in the ui
                  refetch();
  
                  Swal.fire({
                      title: "Deleted!",
                      text: "Your parcel request has been deleted.",
                      icon: "success"
                  });
              }
  
          })
  
  
           
          }
        )
      
  
        
        
      }

    return (
        <div>
           <h2 className="text-3xl font-extrabold mb-6 text-primary">My Clubs</h2>


<div className="overflow-x-auto">
  <table className="table border-separate border-spacing-y-3">
    {/* head */}
    <thead>
      <tr className='text-xl text-secondary'>
       <th>SL.</th>
       <th>Event Banner</th>
        <th>Event Name</th>
        <th>Club name</th>
        <th>Location</th>
        <th>Membership Fee</th>
        <th>Created At</th>
        <th>Event Date</th>
        <th>status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      
      { events.length === 0 ? (
  <tr>
  <td colSpan={8} className="text-center">
    No clubs created yet
  </td>
</tr>
) : (
  events.map((event,index) => (
    <tr key={event._id} className='text-[18px]'>
        <td>{index + 1}</td>
        <td className=""><img src={event.eventImage} alt="" className="max-w-[80px]"/></td>
      <td>{event.eventname}</td>
      <td>{event.clubName}</td>
      <td>{event.location?.city},{event.location?.area}</td>
      <td>
  {event.membershipFee === 0
    ? "Free"
    : event.membershipFee
    ? `৳ ${event.membershipFee}`
    : "N/A"}
</td>

      
   <td> {new Date(event.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}</td>
   <td> {new Date(event.eventDate)?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}</td>
      <td><span
    className={`
      ${event.status === "Active" && "text-green-500"}
     
    `}
  >
    {(event.eventDate< new Date())? "Expired" : (event.status)}
  </span>
</td>
<td>
    <div className='flex justify-center items-center'>

        {/* edit  */}
        <button title='Edit' className="tooltip tooltip-left [&_.tooltip-content]:text-red-400"
 
>{event.status === 'rejected' ? (
  <span
    className="tooltip tooltip-left cursor-not-allowed opacity-40"
    data-tip="Editing disabled (Rejected)"
  >
    <RiFileEditFill size={30} className="text-gray-400" />
  </span>
) : (
  <NavLink
    to={`/dashboard/manager/myevents/${event._id}`}
    className="tooltip tooltip-left"
    data-tip="Edit"
  >
    <RiFileEditFill size={30} className="text-primary" />
  </NavLink>
)}

</button>


        <button title='Delete' onClick={()=>handleDelete(event._id)} className="tooltip tooltip-left"
  data-tip="Delete"><MdDeleteForever className={"text-red-500"} size={30}/></button>
        
    </div>
</td>
    </tr>
  ))
)}

     
    </tbody>
    {/* foot */}
    <tfoot >
      <tr className='text-neutral'>
      <th>SL.</th>
      <th>Club Banner</th>
        <th>Club Name</th>
        <th>Category</th>
        <th>Location</th>
        <th>Created At</th>
        <th>status</th>
        <th>Action</th> 
      </tr>
    </tfoot>
  </table>
</div>
        </div>
    );
};

export default MyEvents;