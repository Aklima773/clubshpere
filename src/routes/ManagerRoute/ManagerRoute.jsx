import React from 'react';
import Loading from '../../Components/Loading/Loading';
import useAuth from '../../CustomHooks/useAuth';
import useRole from '../../CustomHooks/useRole';
import Forbidden from '../../Components/Forbiden/Forbidden';

const ManagerRoute = ({children}) => {
    
        
  const {loading} = useAuth();
  const {role, roleLoading} = useRole();

  if (loading || roleLoading){
    return <Loading></Loading>
  }

  if(role === 'club-manager'  ){
    return children;
  }
    return <Forbidden/>;
};


export default ManagerRoute;