import { Button, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';
import '../styles/requests.css'

const Requests = () => {
    const [helpType, setHelpType] = useState("Shelter");
    const [myRequests, setMyRequests] = useState("No");

    const handleChangeHelpType = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setHelpType(event.target.value);
    };

    const handleChangeMyRequests = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setMyRequests(event.target.value);
    };

    return (
        <div className="requests">

            {/* <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                  if (userDb?.type === 'Sender') {
                    setPopUpState(true);
                  } else {
                    alert("Sorry, only a sender can add a delivery request!")
                  }
                }}>
                  Add Delivery Request
          </Button> */}

            <Typography
                variant='h5'
            >
                Please select which types of requests you want to see:
            </Typography>

            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="Shelter"
                    value={helpType ?? " "}
                    onChange={handleChangeHelpType}
                >
                    <FormControlLabel value="Shelter" control={<Radio />} label="Shelter" />
                    <FormControlLabel value="Goods" control={<Radio />} label="Goods" />
                    <FormControlLabel value="Transport" control={<Radio />} label="Transport" />
                </RadioGroup>
            </FormControl>

            <Typography
                variant='h6'
            >
                I want to see only my requests:
            </Typography>

            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="No"
                    value={myRequests ?? " "}
                    onChange={handleChangeMyRequests}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>

            {helpType === "Shelter" &&
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Id</TableCell>
                                    <TableCell align="center">Refugee Id</TableCell>
                                    <TableCell align="center">Transport included?</TableCell>
                                    <TableCell align="center">Available slots</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Timestamp</TableCell>
                                    <TableCell align="center">Details</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {deliveryRequests?.map((row) => (
                            <Row key={row.id} row={row} />
                        ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }


            {helpType === "Transport" &&
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Id</TableCell>
                                    <TableCell align="center">Refugee Id</TableCell>
                                    <TableCell align="center">Source</TableCell>
                                    <TableCell align="center">Destination</TableCell>
                                    <TableCell align="center">Arrival Date</TableCell>
                                    <TableCell align="center">Available slots</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Timestamp</TableCell>
                                    <TableCell align="center">Details</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {deliveryRequests?.map((row) => (
                         <Row key={row.id} row={row} />
                     ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }

            {helpType === "Goods" &&
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Id</TableCell>
                                    <TableCell align="center">Refugee Id</TableCell>
                                    <TableCell align="center">Good name</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Delivery address</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Timestamp</TableCell>
                                    <TableCell align="center">Details</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {deliveryRequests?.map((row) => (
                            <Row key={row.id} row={row} />
                        ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    );
}

export default Requests;