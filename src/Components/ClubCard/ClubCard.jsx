import React from 'react';
import { NavLink } from 'react-router';




const ClubCard = ({club}) => {

    if(!club) return null;
    console.log(club)

    
    return (
        <div>
           
            

            <div key={club._id} className="max-w-xl bg-base-100 shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Quote Icon */}
        

        {/* Review Text */}
        <img className="mb-4 max-w-[250px] mx-auto"
          src={club.bannerImage}
        />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-4"></div>

        {/* Profile */}
        <div className="flex  justify-between items-center gap-8">
        
            <div>
                <h3 className="font-semibold text-lg">{club.clubName}</h3>
                <p className="text-sm text-gray-500">Member Ship : {club.membershipFee === 0 ? "Free" : club.membershipFee}
                </p>

                
            </div>
            <div>
                    <NavLink to={`/club/${club._id}`}><button className='bg-primary p-2 rounded-xl text-white'>View</button></NavLink>
                </div>
        </div>
        
    </div>
    
        </div>
    );
};

export default ClubCard;