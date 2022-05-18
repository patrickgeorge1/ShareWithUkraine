import React from 'react';
import { Button } from '@mui/material'
import { useKeycloak } from '@react-keycloak/web'

const Logout = () => {

    const { keycloak } = useKeycloak()

    const logout = () => {
        keycloak.logout();
    }

    return (
        <Button color="inherit" onClick={logout}>Logout</Button>
    );
}
export default Logout;