import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectComponent = ({role1}) => {
 const storeUserRole = localStorage.getItem('role');
 if(!storeUserRole || storeUserRole !==role1){
    return <Navigate to= "/" replace/>;
 }
  
 return <Outlet/>
}

export default ProtectComponent;