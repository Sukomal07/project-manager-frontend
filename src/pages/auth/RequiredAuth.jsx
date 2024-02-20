import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import axiosInstance from '../../helper/AxiosInstance.js'

function RequiredAuth() {
    const location = useLocation()
    const [token, setToken] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await axiosInstance.get('/check');
            if (response.data) {
                setToken(true)
            }
        } catch (error) {
            setToken(false)
        }
    };

    useEffect(() => {
        checkAuth();
    }, [location])

    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default RequiredAuth
