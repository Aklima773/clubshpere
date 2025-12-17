import React from 'react';
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { NavLink } from 'react-router';
import { ImCross } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import Swal from 'sweetalert2';

const RegesteredClubs = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    

    const { isLoading: clubsLoading, data: pendingClubs =[],refetch} = useQuery({
        queryKey: ['pendingClubs'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/pendingclubs/${user?.email}`);
            return res.data;
        
            
            
        }
    })

    if(clubsLoading) return <Loading/>

    const handleAccept = (id,status)=>{
        if (!id) {
            console.error("Club ID is undefined!");
            return;
          }
        
        const updateInfo = { status: status}
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Approved this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approved it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/pendingclubs/${id}`, updateInfo)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.success) {
                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                title: "Approved!",
                                text: "Requested Club  Approved Successfully.",
                                icon: "success"
                            });
                        }

                    })


            }
        });
    }


    const handleReject = (id)=>{
        console.log(id)
        if(!id) return;
        // const updateInfo = { status: status}
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/pendingclubs/${id}`,{ status: 'rejected' })
                    .then(res => {
                        console.log(res.data);

                        if (res.data.success) {
                            // refresh the data in the ui
                            refetch();

                            Swal.fire({
                                title: "Rejected!",
                                text: "Requested Club  Reject Successfully.",
                                icon: "success"
                            });
                        }

                    })


            }
        });


    }
    return (
        <div>
        <h2 className="text-3xl font-extrabold mb-6 text-primary">Clubs Requests</h2>


<div className="overflow-x-auto">
<table className="table border-separate border-spacing-y-3">
 {/* head */}
 <thead>
   <tr className='text-xl text-secondary'>
    <th>SL.</th>
     <th>Club Name</th>
     <th>Category</th>
     <th>Location</th>
     <th>Membership Fee</th>
     <th>Created At</th>
     <th>Updated At</th>
     <th>Manager Email</th>
     <th>status</th>
     <th>Action</th>
   </tr>
 </thead>
 <tbody className='text-[16px]'>
   {/* row 1 */}

   
   { pendingClubs.length === 0 ? (
<tr>
<td colSpan={8} className="text-center">
 No clubs created yet
</td>
</tr>
) : (
    pendingClubs.map((club,index) => (
 <tr key={club._id} className='text-[16px]'>
     <td>{index + 1}</td>
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

   <td> {new Date(club.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}</td>
   <td> {new Date(club.updatedAt)?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}</td>

  <td>{club.managerEmail}</td>
   <td className=' text-center '><span
 className={`
   ${club.status === "pending" && "text-primary"}
   ${club.status === "approved" && "text-green-500"}
   ${club.status === "rejected" && "text-red-500"}
 `}
>
 {club.status}
</span>
</td>
<td>
 <div className='flex justify-center items-center gap-2'>

     {/* edit  */}
     <button title='Edit' onClick={()=>handleAccept(club._id.toString(), 'approved')} className={`tooltip tooltip-left [&_.tooltip-content]:text-red-400 -ml-2 `} disabled={club.status === 'approved'}
data-tip="Approved"
><ImCheckboxChecked className={`${club.status === "approved" ?("text-gray-400"): ("text-primary ")}`} size={28}/>
</button>


     <button title='Delete' onClick={()=>handleReject(club._id)} className="tooltip tooltip-left"
data-tip="Reject"><ImCross className={"text-red-500"} size={28}/></button>
     
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

export default RegesteredClubs;