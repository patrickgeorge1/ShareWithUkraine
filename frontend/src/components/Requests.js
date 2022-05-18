import * as React from 'react';
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
import { useState, useEffect } from 'react';
import '../styles/requests.css'
import { useKeycloak } from '@react-keycloak/web';
import { userApi } from '../services/userApi';
import SmallFooter from './SmallFooter';

function Row(props) {
    const { row, type, currentUser, refreshFlag, setRefreshFlag } = props;
    const { keycloak } = useKeycloak();

    const refreshComponent = () => setRefreshFlag(!refreshFlag)

    const handleDeleteGoodsRequest = async (requestId) => {
        try {
            const response = await userApi.deleteGoodsRequest(keycloak?.token, requestId)
            if (response.status === 200) {
                alert("You have successfully deleted the request")
                refreshComponent()
            } else {
                alert("Something wrong happened, please try again!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteShelterRequest = async (requestId) => {
        try {
            const response = await userApi.deleteShelterRequest(keycloak?.token, requestId)
            if (response.status === 200) {
                alert("You have successfully deleted the request!")
                refreshComponent()
            } else {
                alert("Something wrong happened, please try again!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteTransportRequest = async (requestId) => {
        try {
            const response = await userApi.deleteTransportRequest(keycloak?.token, requestId)
            if (response.status === 200) {
                alert("You have successfully deleted the request!")
                refreshComponent()
            } else {
                alert("Something wrong happened, please try again!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptGoodsRequest = async (requestId) => {
        try {
            const response = await userApi.acceptGoodsRequest(keycloak?.token, requestId)
            if (response.status === 200) {
                alert("You have successfully accept the request! The refugee will be notified by email.")
                refreshComponent()
            } else {
                alert("Something wrong happened, please try again!")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleAcceptShelterRequest = async (requestId) => {
        try {
            const response = await userApi.acceptShelterRequest(keycloak?.token, requestId)
            if (response.status === 200) {
                alert("You have successfully accept the request! The refugee will be notified by email.")
                refreshComponent()
            } else {
                alert("Something wrong happened, please try again!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptTransportRequest = async (requestId) => {
        try {
            const response = await userApi.acceptTransportRequest(keycloak?.token, requestId)
            if (response.status === 200) {
                alert("You have successfully accept the request! The refugee will be notified by email.")
                refreshComponent()
            } else {
                alert("Something wrong happened, please try again!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (type === "good") {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset', bgcolor: row?.Accepted === true ? 'success.main' : '' } }} >
                    <TableCell align="right">{row?.Id}</TableCell>
                    <TableCell align="right">{row?.RefugeeId}</TableCell>
                    <TableCell align="right">{row?.GoodName}</TableCell>
                    <TableCell align="right">{row?.Quantity}</TableCell>
                    <TableCell align="right">{row?.DeliveryAddress}</TableCell>
                    <TableCell align="right">{row?.Accepted === true ? "Accepted" : "Not accepted"}</TableCell>
                    <TableCell align="right">{row?.Timestamp}</TableCell>
                    <TableCell align="right">{row?.Details}</TableCell>
                    {currentUser?.UserType === "Refugee"
                        ? (row?.Accepted === true
                            ? <TableCell align="right"><Button disabled>Accepted</Button></TableCell>
                            : <TableCell align="right"><Button variant="contained" color="error" disabled={row?.RefugeeId !== currentUser?.Id} onClick={() => handleDeleteGoodsRequest(row?.Id)}>Delete</Button></TableCell>)
                        : (row?.Accepted === true
                            ? <TableCell align="right"><Button disabled>Accepted</Button></TableCell>
                            : <TableCell align="right"><Button variant="contained" color="success" onClick={() => handleAcceptGoodsRequest(row?.Id)}>Accept</Button></TableCell>)
                    }


                </TableRow>
            </React.Fragment >

        );
    } else if (type === "shelter") {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset', bgcolor: row?.Accepted === true ? 'success.main' : '' } }} >
                    <TableCell align="right">{row?.Id}</TableCell>
                    <TableCell align="right">{row?.RefugeeId}</TableCell>
                    <TableCell align="right">{row?.TransportIncluded === true ? "Yes" : "No"}</TableCell>
                    <TableCell align="right">{row?.AvailableSeats}</TableCell>
                    <TableCell align="right">{row?.Accepted === true ? "Accepted" : "Not accepted"}</TableCell>
                    <TableCell align="right">{row?.Timestamp}</TableCell>
                    <TableCell align="right">{row?.HouseLocation}</TableCell>
                    <TableCell align="right">{row?.Details}</TableCell>
                    {currentUser?.UserType === "Refugee"
                        ? (row?.Accepted === true
                            ? <TableCell align="right"><Button disabled>Accepted</Button></TableCell>
                            : <TableCell align="right"><Button variant="contained" color="error" disabled={row?.RefugeeId !== currentUser?.Id} onClick={() => handleDeleteShelterRequest(row?.Id)}>Delete</Button></TableCell>)
                        : (row?.Accepted === true
                            ? <TableCell align="right"><Button disabled>Accepted</Button></TableCell>
                            : <TableCell align="right"><Button variant="contained" color="success" onClick={() => handleAcceptShelterRequest(row?.Id)}>Accept</Button></TableCell>)
                    }
                </TableRow>
            </React.Fragment>
        );
    } else if (type === "transport") {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset', bgcolor: row?.Accepted === true ? 'success.main' : '' } }} >
                    <TableCell align="right">{row?.Id}</TableCell>
                    <TableCell align="right">{row?.RefugeeId}</TableCell>
                    <TableCell align="right">{row?.FromWhere}</TableCell>
                    <TableCell align="right">{row?.Destination}</TableCell>
                    <TableCell align="right">{row?.ArrivalTime}</TableCell>
                    <TableCell align="right">{row?.AvailableSeats}</TableCell>
                    <TableCell align="right">{row?.Accepted === true ? "Accepted" : "Not accepted"}</TableCell>
                    <TableCell align="right">{row?.Timestamp}</TableCell>
                    <TableCell align="right">{row?.Details}</TableCell>
                    {currentUser?.UserType === "Refugee"
                        ? (row?.Accepted === true
                            ? <TableCell align="right"><Button disabled>Accepted</Button></TableCell>
                            : <TableCell align="right"><Button variant="contained" color="error" disabled={row?.RefugeeId !== currentUser?.Id} onClick={() => handleDeleteTransportRequest(row?.Id)}>Delete</Button></TableCell>)
                        : (row?.Accepted === true
                            ? <TableCell align="right"><Button disabled>Accepted</Button></TableCell>
                            : <TableCell align="right"><Button variant="contained" color="success" onClick={() => handleAcceptTransportRequest(row?.Id)}>Accept</Button></TableCell>)}
                </TableRow>
            </React.Fragment>
        );
    }
}

const Requests = () => {
    const [helpType, setHelpType] = useState("Shelter");
    const [myRequests, setMyRequests] = useState("No");
    const [error, setError] = useState(false);
    const { initialized, keycloak } = useKeycloak();
    const [goodRequests, setGoodRequests] = useState([]);
    const [shelterRequests, setShelterRequests] = useState([]);
    const [transportRequests, setTransportRequests] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const handleChangeHelpType = (event) => {
        event.preventDefault()
        setHelpType(event.target.value);
    };

    const handleChangeMyRequests = (event) => {
        event.preventDefault()
        setMyRequests(event.target.value);
    };

    useEffect(async () => {
        if (keycloak && initialized) {
            try {

                if (myRequests === "No") {
                    const response1 = await userApi.getGoodsRequests(keycloak?.token);
                    if (response1.status === 200) {
                        setGoodRequests(response1.data);
                    }
                } else if (myRequests === "Yes") {
                    const response1 = await userApi.getGoodsRequestsByUserId(keycloak?.token, currentUser?.Id);
                    if (response1.status === 200) {
                        setGoodRequests(response1.data);
                    }
                }

                if (myRequests === "No") {
                    const response2 = await userApi.getShelterRequests(keycloak?.token);
                    if (response2.status === 200) {
                        setShelterRequests(response2.data);
                    }
                } else if (myRequests === "Yes") {
                    const response2 = await userApi.getShelterRequestsByUserId(keycloak?.token, currentUser?.Id);
                    if (response2.status === 200) {
                        setShelterRequests(response2.data);
                    }
                }

                if (myRequests === "No") {
                    const response3 = await userApi.getTransportRequests(keycloak?.token);
                    if (response3.status === 200) {
                        setTransportRequests(response3.data);
                    }
                } else if (myRequests === "Yes") {
                    const response3 = await userApi.getTransportRequestsByUserId(keycloak?.token, currentUser?.Id);
                    if (response3.status === 200) {
                        setTransportRequests(response3.data);
                    }
                }

                const response4 = await userApi.getCurrentUser(keycloak?.token);
                if (response4.status === 200) {
                    setCurrentUser(response4.data);
                }
            } catch (error) {
                setError(true);
            }
        }
    }, [keycloak, initialized, myRequests, refreshFlag])

    return (initialized && keycloak?.authenticated && currentUser && currentUser.UserType !== null &&
        <div className="container">
            <div className="requests">
                <Typography
                    variant='h5'
                    marginTop={'50px'}
                    marginBottom={'10px'}
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

                {
                    currentUser?.UserType === "Refugee" &&
                    <>
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
                    </>
                }
                {
                    helpType === "Shelter" &&
                    <div className="table">
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Id</TableCell>
                                        <TableCell align="right">Refugee Id</TableCell>
                                        <TableCell align="right">Transport included?</TableCell>
                                        <TableCell align="right">Available slots</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Timestamp</TableCell>
                                        <TableCell align="right">House Location</TableCell>
                                        <TableCell align="right">Details</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {shelterRequests?.map((shelterRequest) => (
                                        <Row key={shelterRequest.id} row={shelterRequest} type="shelter" currentUser={currentUser} refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }

                {
                    helpType === "Transport" &&
                    <div className="table">
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Id</TableCell>
                                        <TableCell align="right">Refugee Id</TableCell>
                                        <TableCell align="right">Source</TableCell>
                                        <TableCell align="right">Destination</TableCell>
                                        <TableCell align="right">Arrival Date</TableCell>
                                        <TableCell align="right">Available slots</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Timestamp</TableCell>
                                        <TableCell align="right">Details</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transportRequests?.map((transportRequest) => (
                                        <Row key={transportRequest.id} row={transportRequest} type="transport" currentUser={currentUser} refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }

                {
                    helpType === "Goods" &&
                    <div className="table">
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Id</TableCell>
                                        <TableCell align="right">Refugee Id</TableCell>
                                        <TableCell align="right">Good name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Delivery address</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Timestamp</TableCell>
                                        <TableCell align="right">Details</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {goodRequests?.map((goodsRequest) => (
                                        <Row key={goodsRequest.id} row={goodsRequest} type="good" currentUser={currentUser} refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }
                <SmallFooter></SmallFooter>
            </div>
        </div >
    );
}

export default Requests;