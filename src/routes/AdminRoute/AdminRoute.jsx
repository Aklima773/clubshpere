import React from 'react';
import Container from '../../Components/Container/Container';
import useAuth from '../../CustomHooks/useAuth';
import useRole from '../../CustomHooks/useRole';
import Loading from '../../Components/Loading/Loading';
import Forbidden from '../../Components/Forbiden/Forbidden';

const AdminRoute = ({children}) => {

  const {loading} = useAuth();
  const {role, roleLoading} = useRole();

  if (loading || roleLoading){
    return <Loading></Loading>
  }

  if(role !== 'admin'){
    return <Forbidden></Forbidden>
  }
    return children;
};

export default AdminRoute;