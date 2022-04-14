import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom'
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