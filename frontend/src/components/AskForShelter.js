
import { Button, Alert, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web';
import { userApi } from '../services/userApi';

const AskForShelter = () => {
    const navigate = useNavigate();
    const [transport, setTransport] = useState(true);
    const [noPeople, setNoPeople] = useState(1);
    const [currentLocation, setCurrentLocation] = useState("");
    const [details, setDetails] = useState("");
    const [open, setOpen] = useState(false);
    const { initialized, keycloak } = useKeycloak();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState(null)
    const [error, setError] = useState(false);

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

    const handleChangeNoPeople = (event) => {
        setNoPeople(event.target.value);
    };

    const handleChangeTransport = (event) => {
        setTransport(event.target.value);
    };

    const handleChangeCurrentLocation = (event) => {
        setCurrentLocation(event.target.value);
    };

    const handleChangeDetails = (event) => {
        setDetails(event.target.value);
    };

    const handleClose = (event) => {
        navigate("/askforhelp")
    }

    const handleCloseError = () => {
        setOpen(false);
    };

    const handleSentInformation = async (event) => {
        if (noPeople <= 0 || currentLocation === "" || details === "") {
            setOpen(true)
        } else {
            const response = await userApi.postAShelterRequest(keycloak.token, currentLocation, noPeople, transport, details);
            if (response.status === 200) {
                setState(1)
                setTimeout(() => navigate("/requests"), 3000)
            } else {
                setState(-1)
            }
        }
    }

    return (initialized && keycloak?.authenticated && currentUser && currentUser.UserType !== null &&
        <div>
            <Dialog open={true} PaperProps={{
                sx: {
                    width: "50%"
                }
            }}>
                <DialogTitle>Enter your information here for the shelter request:</DialogTitle>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <DialogContent>
                        <div className='aditionalDetailsContainer'>
                            <FormControl sx={{ m: 2, minWidth: 400 }}>
                                <TextField
                                    error={noPeople <= 0 ? true : false}
                                    label="How many people are you?"
                                    type="number"
                                    required={true}
                                    variant="standard"
                                    value={noPeople}
                                    onChange={handleChangeNoPeople}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 2, minWidth: 400 }} >
                                <FormLabel>Do you need transport?</FormLabel>
                                <RadioGroup
                                    name="Do you need transport?"
                                    value={transport}
                                    onChange={handleChangeTransport}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>

                            <FormControl sx={{ m: 2, minWidth: 400 }}>
                                <TextField
                                    label="Your current location"
                                    error={currentLocation === '' ? true : false}
                                    required={true}
                                    variant="standard"
                                    value={currentLocation}
                                    onChange={handleChangeCurrentLocation}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 2, minWidth: 400 }}>
                                <TextField
                                    label="Details"
                                    required={true}
                                    error={details === '' ? true : false}
                                    variant="standard"
                                    multiline
                                    rows={2}
                                    value={details}
                                    onChange={handleChangeDetails}
                                />
                            </FormControl>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={handleSentInformation}>Send information</Button>
                                <Button variant="contained" onClick={handleClose}>Close</Button>
                            </Stack>
                            <div>
                                {state === 1
                                    ? <Alert severity="success">Your shelter request has been sent. You will be redirected...</Alert>
                                    : <div></div>}
                                {state === -1
                                    ? <Alert severity="error">Something wrong happened, please try again!</Alert>
                                    : <div></div>}
                            </div>
                        </div>
                    </DialogContent>
                </Box>
            </Dialog>

            <Dialog
                open={open}
                onClose={handleCloseError}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Error"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You must complete the data as follows:
                        <br></br>
                        - at least one person;
                        <br></br>
                        - the fields "Your current location" and "Details" must not be left blank.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseError} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default AskForShelter;