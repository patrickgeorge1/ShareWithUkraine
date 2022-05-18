import { Button } from '@mui/material';
import React, { Component, useState } from 'react';
import { config } from '../utils/Constants';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            id: ""
        };
        this.props.keycloak.loadUserInfo().then(userInfo => {
            this.setState({ name: userInfo.name })
        });
    }

    render() {
        return (
            <Button color="inherit" onClick={() => {
                window.location.href = config.KEYCLOAK_URL + "/realms/master/account/"
            }}>{this.state.name}</Button>
        );
    }
}
export default User;