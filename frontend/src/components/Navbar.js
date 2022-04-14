import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import '../App.css';
import logo from "../img/logo.png"
import { useKeycloak } from '@react-keycloak/web';
import LoginPage from './Login';
import User from './User';
import Logout from './Logout';

function Navbar() {

    const { initialized, keycloak } = useKeycloak();
    const settings = ["Profile", "Singout"]

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "Black" }}>
                <Toolbar>
                    <Grid className="leftGrid" container>
                        <Grid item>
                            <Typography type="title" variant="h6" component="div">
                                <img className="logo" src={logo} alt="Learning Wiki" />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h7" component="div">
                                <Button color="inherit">
                                    <Link to="/">Home</Link>
                                </Button>
                                {initialized && keycloak?.authenticated &&
                                    <Button color="inherit">
                                        <Link to="/askforhelp">Ask for help</Link>
                                    </Button>
                                }
                                {initialized && keycloak?.authenticated &&
                                    <Button color="inherit">
                                        <Link to="/requests">Requests</Link>
                                    </Button>
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className="rightGrid">
                        {initialized && keycloak?.authenticated ?
                            <div style={{ display: 'inline-block' }}>
                                {/* <Avatar src={profil} /> */}
                                <User keycloak={keycloak} />
                                <Logout keycloak={keycloak} />
                            </div> : <LoginPage></LoginPage>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar;