import { Button } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import '../styles/requests.css'

const Requests = () => {
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

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Refugee Id</TableCell>
                            <TableCell align="center">Source</TableCell>
                            <TableCell align="center">Destination</TableCell>
                            <TableCell align="center">Arrival Time</TableCell>
                            <TableCell align="center">Available slots</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Timestamp</TableCell>
                            <TableCell align="center">Details</TableCell>
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
    );
}

export default Requests;