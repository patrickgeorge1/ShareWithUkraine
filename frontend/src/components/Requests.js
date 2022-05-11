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
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';
import '../styles/requests.css'
import { useKeycloak } from '@react-keycloak/web';
import { userApi } from '../services/userApi';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row, type } = props;

    if (type === "good") {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    {console.log(row)}
                    <TableCell align="right">{row?.Id}</TableCell>
                    <TableCell align="right">{row?.RefugeeId}</TableCell>
                    <TableCell align="right">{row?.GoodName}</TableCell>
                    <TableCell align="right">{row?.Quantity}</TableCell>
                    <TableCell align="right">{row?.DeliveryAddress}</TableCell>
                    <TableCell align="right">{row?.Accepted}</TableCell>
                    <TableCell align="right">timestamp</TableCell>
                    <TableCell align="right">{row?.Details}</TableCell>
                    <TableCell align="right"><Button variant="contained">Accept</Button></TableCell>
                </TableRow>
            </React.Fragment>
        );
    } else if (type === "shelter") {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    {console.log(row)}
                    <TableCell align="right">{row?.Id}</TableCell>
                    <TableCell align="right">{row?.RefugeeId}</TableCell>
                    <TableCell align="right">{row?.GoodName}</TableCell>
                    <TableCell align="right">{row?.Quantity}</TableCell>
                    <TableCell align="right">{row?.DeliveryAddress}</TableCell>
                    <TableCell align="right">{row?.Accepted}</TableCell>
                    <TableCell align="right">timestamp</TableCell>
                    <TableCell align="right">{row?.Details}</TableCell>
                    <TableCell align="right"><Button variant="contained">Accept</Button></TableCell>
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

    useEffect(async () => {
        if (keycloak && initialized) {
            try {
                const response1 = await userApi.getGoodsRequests(keycloak?.token);
                console.log(response1.data)
                setGoodRequests(response1.data);

                const response2 = await userApi.getShelterRequests(keycloak?.token);
                console.log(response2.data)
                setShelterRequests(response2.data);

                const response3 = await userApi.getTransportRequests(keycloak?.token);
                console.log(response3.data)
                transportRequests(response3.data);
            } catch (error) {
                setError(true);
            }
        }
    }, [keycloak, initialized])

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
                                    <Row key={goodsRequest.id} row={goodsRequest} type="good" />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    );
}

export default Requests;