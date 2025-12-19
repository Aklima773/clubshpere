import React from 'react';
import useEvents from '../../../CustomHooks/useEvents';
import useAuth from '../../../CustomHooks/useAuth';
import Loading from '../../../Components/Loading/Loading';

const MyEvents = () => {

    // const {user} = useAuth();

    const {events, eventsLoading} = useEvents();

    if(eventsLoading) return <Loading></Loading>

    return (
        <div>
            {events.length}
        </div>
    );
};

export default MyEvents;