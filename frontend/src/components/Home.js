import React from 'react';
import Faq from 'react-faq-component';
import logo from "../img/logo2.png"
import shelter from "../img/shelter.png"
import food from "../img/food.png"
import transport from "../img/transport.png"
import '../styles/home.css';
import Typography from '@mui/material/Typography';
import FooterComponent from './Footer';
import { Button, TextField, Alert } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { withHooksKC } from '../utils/withHooksKC';
import FormControl from '@mui/material/FormControl';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { userApi } from '../services/userApi';

const Home = () => {
    const { initialized, keycloak } = useKeycloak();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [openSelectPhoneAndRole, setOpenSelectPhoneAndRole] = useState(true)
    const [role, setRole] = useState("Refugee")
    const [phone, setPhone] = useState("")
    const [state, setState] = useState(0);
    const [error, setError] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(async () => {
        if (keycloak && initialized) {
            try {
                const response = await userApi.getCurrentUser(keycloak?.token);
                if (response.status === 200) {
                    setCurrentUser(response.data);
                }
            } catch (error) {
                setError(true);
            }
        }
    }, [keycloak, initialized])

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectPhoneAndRole = async () => {
        if (phone.length < 10) {
            setError(true)
        } else {
            try {
                const response = await userApi.updateUser(keycloak.token, role, phone);
                if (response.status === 200) {
                    setState(1);
                } else {
                    setState(-1);
                }
                setOpenSelectPhoneAndRole(false);
            } catch (error) {
                setError(true);
            }
        }
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
                content: "All you have to do is go to the 'Ask for help' button above, fill in the required data and just wait, soon someone will help you with everything you need."
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
                    {initialized && keycloak?.authenticated && currentUser && currentUser.UserType === null &&
                        <Dialog
                            open={openSelectPhoneAndRole}
                            onClose={handleSelectPhoneAndRole}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Please enter your phone number and select your role:"}
                            </DialogTitle>
                            <DialogContent>
                                <FormControl sx={{ m: 2, minWidth: 400 }}>
                                    <TextField
                                        error={phone.length <= 10 || phone === "" ? true : false}
                                        label="Phone number:"
                                        type="number"
                                        required={true}
                                        variant="standard"
                                        value={phone}
                                        onChange={handleChangePhone}
                                    />
                                </FormControl>

                                <FormControl sx={{ m: 2, minWidth: 400 }} >
                                    <FormLabel>What are you?</FormLabel>
                                    <RadioGroup
                                        required={true}
                                        name="What are you?"
                                        value={role}
                                        onChange={handleChangeRole}
                                    >
                                        <FormControlLabel value="Refugee" control={<Radio />} label="Refugee" />
                                        <FormControlLabel value="Helper" control={<Radio />} label="Helper" />
                                    </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleSelectPhoneAndRole} autoFocus>
                                    Ok
                                </Button>
                            </DialogActions>
                            <div>
                                {/* {
                                    error === true
                                        ? <Alert severity="error">Phone number must be at least 10 characters long</Alert>
                                        : <div></div>
                                } */}
                                {state === 1
                                    ? <Alert severity="success">User successfully updated</Alert>
                                    : <div></div>}
                                {state === -1
                                    ? <Alert severity="error">Something wrong happened, please try again</Alert>
                                    : <div></div>}
                            </div>
                        </Dialog>
                    }

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
        </div >

    );
}

export default withHooksKC(Home);
