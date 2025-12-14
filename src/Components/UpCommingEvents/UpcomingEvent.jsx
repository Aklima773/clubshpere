import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';

const UpcomingEvent = () => {
    return (
        <div className="max-w-sm bg-base-100 shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-primary text-2xl mb-4" />

        {/* Review Text */}
        <p className="mb-4">
            testimonial
        </p>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 my-4"></div>

        {/* Profile */}
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary">
                <img src="photo"alt="" />
            </div>
            <div>
                <h3 className="font-semibold text-lg">Name</h3>
                <p className="text-sm text-gray-500">Senior Product Designer</p>
            </div>
        </div>
        
    </div>
    
    
    );
};

export default UpcomingEvent;