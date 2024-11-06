import React, { useEffect, useRef, useState } from 'react'
import usePersist from '../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { useRefreshMutation } from './authApiSlice'
import { Outlet, useNavigate } from 'react-router-dom'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)
    const navigate = useNavigate()
    const[refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if(effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async() => {
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (error) {
                    console.error(error)
                    
                }
            }
            if(!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true
        // eslint-disable-next-line
    },[])
    let content
    if(!persist){
        content = <Outlet />
    } else if(isLoading) {
        content = <p>Loading...</p>
    } else if(isError) {
        console.log(error)
        content = navigate('/')
    } else if(isSuccess && trueSuccess){
        console.log('success')
        content = <Outlet />
    } else if(token && isUninitialized){
        console.log('token and uninitialized')
        console.log(isUninitialized)
        content = <Outlet />
    }
  return content
}

export default PersistLogin