import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const AuthProvider = ({ children }) => {
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    // console.log(auth.isAuth);
   
    if (!auth.isAuth) {
        // navigate('/auth')
    //     return <Navigate to='/auth' />
    }
    return children
}

export default AuthProvider;
