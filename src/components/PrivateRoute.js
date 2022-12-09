import React from 'react'
import useToken from '../components/useToken';
import {Outlet } from 'react-router-dom';
import Login from "../Pages/Login";




 function PrivateRoute() {

  const { token, setToken } = useToken();

  //  if(!token) {
  //     return <Login setToken={setToken} />
  //  }

  return (
    token ? <Outlet/> : <Login setToken={setToken} />
  )


}


export default PrivateRoute;
