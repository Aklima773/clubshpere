import React from 'react';
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import { useQuery, useQueryClient} from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { RiFileEditFill } from "react-icons/ri";
import { MdBrowserUpdated } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from 'react-router';

import Swal from 'sweetalert2';

const MyClubs = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { isLoading: clubsLoading, data: clubs =[]} = useQuery({
        queryKey: ['myClubs', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            return axiosSecure.get(`/myclubs/${user.email}`)
            .then(res=>res.data)
            
            
        }
    })


    // delete the club 

    const handleDelete =(id)=>{

      console.log(id);


 Swal.fire({
        title: 'Are you sure?',
        text: 'This club will be permanently deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e11d48',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) =>{

        if(!result.isConfirmed) return;


          axiosSecure.delete(`/clubs/${id}`)
          .then(res=>{
            if(res.data.deletedCount === 1){
              queryClient.setQueryData(['myClubs', user.email], oldData => {
                if (!oldData) return [];
                return oldData.filter(club => club._id !== id);
              });

             
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel request has been deleted.",
                icon: "success"
            });
            }
          })
          .catch(err=>{
            console.log(err)
          })
         
        }
      )
    

      
      
    }
    

    if (clubsLoading) return <Loading />;
    return (
        <div>
           <h2 className="text-3xl font-extrabold mb-6 text-primary">My Clubs</h2>


<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-xl text-secondary'>
       <th>SL.</th>
       <th>Club Banner</th>
        <th>Club Name</th>
        <th>Category</th>
        <th>Location</th>
        <th>Membership Fee</th>
        <th>Created At</th>
        <th>status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      
      { clubs.length === 0 ? (
  <tr>
  <td colSpan={8} className="text-center">
    No clubs created yet
  </td>
</tr>
) : (
  clubs.map((club,index) => (
    <tr key={club._id} className='text-[18px]'>
        <td>{index + 1}</td>
        <td className=""><img src={club.bannerImage} alt="" className="max-w-[80px]"/></td>
      <td>{club.clubName}</td>
      <td>{club.category}</td>
      <td>{club.location?.city},{club.location?.area}</td>
      <td>
  {club.membershipFee === 0
    ? "Free"
    : club.membershipFee
    ? `৳ ${club.membershipFee}`
    : "N/A"}
</td>

      <td>{club.createdAt}</td>
      <td><span
    className={`
      ${club.status === "pending" && "text-primary"}
      ${club.status === "approved" && "text-green"}
      ${club.status === "rejected" && "text-red"}
    `}
  >
    {club.status}
  </span>
</td>
<td>
    <div className='flex justify-center items-center -ml-10'>

        {/* edit  */}
        <button title='Edit' className="tooltip tooltip-left [&_.tooltip-content]:text-red-400"
  data-tip="Edit"
><NavLink to={`/dashboard/manager/myclubs/${club._id}`} > <RiFileEditFill className={"text-primary"} size={30}/></NavLink>
</button>


        <button title='Delete' onClick={()=>handleDelete(club._id)} className="tooltip tooltip-left"
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

export default MyClubs;