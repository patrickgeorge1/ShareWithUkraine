import { Button } from '@mui/material';
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

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
            <Button color="inherit"><a target="_blank" href="http://localhost:8080/realms/master/account/">{this.state.name}</a></Button>
        );
    }
}
export default User;