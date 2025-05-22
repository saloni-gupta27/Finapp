import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const {user} = useAuth();
  return user ? <Outlet/> : <Navigate to="/" replace/>
}

export default RequireAuth
