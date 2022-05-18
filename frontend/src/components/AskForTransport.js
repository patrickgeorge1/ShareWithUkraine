
import { Button, Alert, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Stack from "@mui/material/Stack";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useKeycloak } from '@react-keycloak/web';
import { userApi } from '../services/userApi';

const AskForTransport = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [arrivalDate, setArrivalDate] = useState(null);
    const [noPeople, setNoPeople] = useState(1);
    const [details, setDetails] = useState("");
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

    const handleChangeSource = (event) => {
        setSource(event.target.value);
    };

    const handleChangeDestination = (event) => {
        setDestination(event.target.value);
    };

    const handleChangeNoPeople = (event) => {
        setNoPeople(event.target.value);
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
        if (source === "" || destination === "" || arrivalDate === null || arrivalDate === "" || noPeople <= 0 || details === "") {
            setOpen(true)
        } else {
            const response = await userApi.postATransportRequest(keycloak.token, source, destination, arrivalDate, noPeople, details);
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
                <DialogTitle>Enter your information here for the trasport request:</DialogTitle>
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
                                    label="Source"
                                    required={true}
                                    error={source === '' ? true : false}
                                    variant="standard"
                                    multiline
                                    rows={2}
                                    value={source}
                                    onChange={handleChangeSource}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 2, minWidth: 400 }}>
                                <TextField
                                    label="Destination"
                                    required={true}
                                    error={destination === '' ? true : false}
                                    variant="standard"
                                    multiline
                                    rows={2}
                                    value={destination}
                                    onChange={handleChangeDestination}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 2, minWidth: 400 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Arrival Date"
                                        error={(arrivalDate === null || arrivalDate === "") ? true : false}
                                        value={arrivalDate}
                                        showTimeSelect
                                        dateFormat="MM/dd/yyyy  EE hh:mm a"
                                        monthsShown="2"
                                        onChange={(newValue) => {
                                            setArrivalDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>


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
                                    ? <Alert severity="success">Your transport request has been sent. You will be redirected...</Alert>
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
                        - at least 1 people;
                        <br></br>
                        - the fields "Source", "Destination", "Arrival Date" and "Details" must not be left blank.
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

export default AskForTransport;