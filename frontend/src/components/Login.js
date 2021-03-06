import * as React from 'react'
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { Button } from '@mui/material'

import { useKeycloak } from '@react-keycloak/web'

const LoginPage = () => {
    const location = useLocation()
    const currentLocationState = location.state || {
        from: { pathname: '/' },
    }

    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
        keycloak?.login()
    }, [keycloak])

    if (keycloak?.authenticated)
        return <Navigate to={currentLocationState?.from} />

    return (<Button color="inherit" onClick={login}>Sign In</Button>)
}

export default LoginPage