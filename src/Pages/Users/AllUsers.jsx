import React, { useState } from 'react';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from '../../Components/Container/Container';
import { FaUserLargeSlash, FaUserShield } from 'react-icons/fa6';
import { GrUserManager } from "react-icons/gr";

import { FaUserAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // searching users name or email 
    const [searchText, setSearchText] = useState(' ');


    // data call from backend 
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

// make admin
const handleMakeAdmin = (user) => {
    const roleInfo = { role: 'admin' };
    updateRole(user, roleInfo, `${user.displayName} is now an Admin`);
};

// make club manager
const handleMakeManager = (user) => {
    const roleInfo = { role: 'club-manager' };
    updateRole(user, roleInfo, `${user.displayName} is now a Club Manager`);
};

// make member
const handleMakeMember = (user) => {
    const roleInfo = { role: 'member' };
    updateRole(user, roleInfo, `${user.displayName} is now a Member`);
};

// the common function
const updateRole = (user, roleInfo, successMessage) => {
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
        .then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: successMessage,
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
};


    return (
       <Container>
            <div>

                <div className='flex justify-between items-center'>

                <h2 className='text-4xl text-primary'>Manage Users:({users.length})</h2>
                <div className='search-box'>
                <p className='text-xl text-primary font-black mt-6'>Search here: {searchText}</p>

<label className="input">
    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </g>
    </svg>
    <input
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        className="grow"
        placeholder="Search users" />

</label>
                </div>
             
                </div>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead className='text-center' >
                        <tr className='text-[18px] text-primary' >
                            <th>
                            No.
                            </th>
                            <th>User</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>

                    <tbody className=' text-center'>
                        {users.map((user, index) => <tr>
                            <td className='no'>
                                {index + 1}
                            </td>
                        
                            <td className='photo'>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                  
                                </div>
                            </td>

                            <td>
                            <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        
                                    </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td className='text-primary font-bold'>
                                {user.role}
                            </td>
                            <td>
                             
    {user.role === "admin" && (
        <>
            <button
                onClick={() => handleMakeMember(user)}
                className="btn bg-secondary mr-2"
                title="Make Member"
            >
                <FaUserAlt />
            </button>

            <button
                onClick={() => handleMakeManager(user)}
                className="btn bg-blue-400 mr-2"
                title="Make Manager"
            >
               <GrUserManager /> 
            </button>
        </>
    )}
    {/* If current role is MANAGER → show Admin + Member */}
    {user.role === "club-manager" && (
        <>
            <button
                onClick={() => handleMakeAdmin(user)}
                className="btn bg-neutral mr-2"
                title="Make Admin"
            >
              <FaUserShield></FaUserShield>
            </button>

            <button
                onClick={() => handleMakeMember(user)}
                className="btn bg-secondary mr-2"
                title="Make Member"
            >
                <FaUserAlt />
            </button>
        </>
    )}
    {/* If current role is MEMBER → show Admin + Manager */}
    {user.role === "member" && (
        <>
            <button
                onClick={() => handleMakeAdmin(user)}
                className="btn bg-neutral mr-2" 
                title="Make Admin"
            >
              <FaUserShield></FaUserShield>
            </button>

            <button
                onClick={() => handleMakeManager(user)}
                className="btn bg-blue-400 mr-2"
                title="Make Manager"
            >
                <GrUserManager />
            </button>
        </>
    )}

                            </td>
                            <th>
                                Actions
                            </th>
                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
       </Container>
    );
};

export default AllUsers;
