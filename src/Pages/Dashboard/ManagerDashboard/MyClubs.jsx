import React from 'react';
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { RiFileEditFill } from "react-icons/ri";
import { MdBrowserUpdated } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';

const MyClubs = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: clubsLoading, data: clubs =[] ,refetch} = useQuery({
        queryKey: ['myClubs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myclubs/${user.email}`);
            
            return res.data;
        }
    })


    // delete the club 

    const handleDelete =(id)=>{

      const confirmDelete = window.confirm(
        "Are you sure You want to delete this club?"
      )

      if(!confirmDelete) return;

      axiosSecure.delete(`/clubs/${id}`)
      .then(res=>{
      console.log(res);
      toast.success("Successfully Deleted")
      })
      .catch(err=>{
        console.log(err)
      })
      
    }
    


    return (
        <div>
           <h2 className="text-3xl font-extrabold mb-6 text-primary">My Clubs</h2>


<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-xl text-secondary'>
       <th>SL.</th>
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

      
      {clubsLoading ? (
  <Loading />
) : clubs.length === 0 ? (
  <p>No clubs created yet</p>
) : (
  clubs.map((club,index) => (
    <tr key={club._id} className='text-[18px]'>
        <td>{index + 1}</td>
      <td>{club.clubName}</td>
      <td>{club.category}</td>
      <td>{club.membershipFee === 0 ? "Free" : club.membershipFee}</td>

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