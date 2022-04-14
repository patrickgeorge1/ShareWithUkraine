
import { Button, MenuItem, TextField } from '@mui/material';
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

const AskForGoods = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [goodName, setGoodName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [details, setDetails] = useState("");

    const handleChangeGoodName = (event) => {
        setGoodName(event.target.value);
    };

    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const handleChangeDeliveryAddress = (event) => {
        setDeliveryAddress(event.target.value);
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

    const handleSentInformation = (event) => {
        if (goodName === "" || quantity <= 0 || deliveryAddress === "" || details === "") {
            setOpen(true)
        } else {
            console.log("goodName = |" + goodName + "| quantity = |" + quantity + "| deliveryAddress = |" + deliveryAddress + "| details = |" + details + "|");
            navigate("/requests")
        }
    }

    return (
        <div>
            <Dialog open={true} PaperProps={{
                sx: {
                    width: "50%"
                }
            }}>
                <DialogTitle>Enter your information here for the good request:</DialogTitle>
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
                                    label="Good name"
                                    required={true}
                                    error={goodName === '' ? true : false}
                                    variant="standard"
                                    multiline
                                    rows={2}
                                    value={goodName}
                                    onChange={handleChangeGoodName}
                                />
                            </FormControl>


                            <FormControl sx={{ m: 2, minWidth: 400 }}>
                                <TextField
                                    error={quantity <= 0 ? true : false}
                                    label="Quantity(for food/drink it's in kg/l)"
                                    type="number"
                                    required={true}
                                    variant="standard"
                                    value={quantity}
                                    onChange={handleChangeQuantity}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 2, minWidth: 400 }}>
                                <TextField
                                    label="Delivery address"
                                    error={deliveryAddress === '' ? true : false}
                                    required={true}
                                    variant="standard"
                                    value={deliveryAddress}
                                    onChange={handleChangeDeliveryAddress}
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
                        - at least 1 quantity;
                        <br></br>
                        - the fields "Good name", "Delivery address" and "Details" must not be left blank.
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

export default AskForGoods;