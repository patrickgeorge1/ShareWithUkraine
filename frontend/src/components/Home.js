import React, { Component } from 'react';
import Faq from 'react-faq-component';
import logo from "../img/logo2.png"
import shelter from "../img/shelter.png"
import food from "../img/food.png"
import transport from "../img/transport.png"
import '../styles/home.css';
import Typography from '@mui/material/Typography';
import FooterComponent from './Footer';
import { Button } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { withHooksKC } from '../utils/withHooksKC';

const Home = () => {
    const { initialized, keycloak } = useKeycloak();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const data = {
        title: <p style={
            {
                color: "white",
                backgroundColor: 'lightblue',
                borderRadius: '8px',
                textAlign: 'center',
                width: 330,
                pading: 10
            }}>
            FAQ (How it works?) </p>,
        rows: [
            {
                title: "How do I create a new account?",
                content: "By accessing the 'Sign in' section. You can sign in either by creating a new account or using your Google Account."
            },
            {
                title: "How do I apply for shelter, food or transport?",
                content: "All you have to do is go to the \'Ask for help\' button above, fill in the required data and just wait, soon someone will help you with everything you need."
            }]
    }

    return (
        <div className="container">
            <div>
                <div className="motto">

                    <Typography
                        style={{ fontWeight: 600 }}
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        We are your <mark class="red"> help</mark>, do NOT hesitate to ask for <mark class="red">what you need</mark>
                    </Typography>

                </div>

                <div className="first-part-content">
                    <img className='logo2' src={logo} alt="Learning Wiki" />
                    <div className="welcome-message">
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                        >

                            Welcome to the Share With Ukraine platform, the place where you just have to ask
                            and people will help you as soon as possible.
                        </Typography>
                    </div>

                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        We care about Ukraine!
                    </Typography>

                    <div className='descopera-button'>
                        <Button
                            size="large"
                            variant="contained"
                            color="error"
                            onClick={() => {
                                if (initialized && keycloak?.authenticated) {
                                    navigate("/askforhelp")
                                } else {
                                    handleClickOpen()
                                }
                            }}
                        >
                            👉 Discover
                        </Button>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"You must be logged in!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You can go to the top right corner to log in.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} autoFocus>
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                </div>

                <div className="avantajele-tale-container">

                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        Your advantages
                    </Typography>


                    <div className="avantajele-tale">


                        <div className="element">
                            <img className='photo' src={shelter} alt="Share with Ukraine" />

                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                Shelter
                            </Typography>

                            <Typography
                                color="textSecondary"
                                variant="body1"
                            >
                                You have the chance to receive shelter
                            </Typography>

                        </div>


                        <div className="element">
                            <img className='photo' src={food} alt="Share with Ukraine" />

                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                Goods
                            </Typography>

                            <Typography
                                color="textSecondary"
                                variant="body1"
                            >
                                We can help you with food, clothes and many other things
                            </Typography>

                        </div>


                        <div className="element">
                            <img className='photo' src={transport} alt="Share with Ukraine" />

                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                Transport
                            </Typography>

                            <Typography
                                color="textSecondary"
                                variant="body1"
                            >
                                We can help you move from point A to point B
                            </Typography>

                        </div>
                    </div>
                </div>

                <div className="faq">
                    <Faq data={data} style={{ pading: '0px 10px' }} />
                </div>

            </div>
            <FooterComponent />
        </div>

    );
}

export default withHooksKC(Home);
