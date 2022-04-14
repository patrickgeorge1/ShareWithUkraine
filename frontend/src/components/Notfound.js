import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

const NotFound = () => {
    return (
        <div className="container">
            <div className="not-found">
                <Typography
                    variant="h2"
                    color="textPrimary"
                    align="center"
                    marginTop="100px"
                >
                    Sorry
                </Typography>

                <Typography
                    variant="h4"
                    color="textSecondary"
                    align="center"
                    marginBottom="20px"
                >
                    The page cannot be found
                </Typography>
                <Button variant="contained" color="info"><Link to="/">Back to the homepage...</Link></Button>
            </div>
        </div>
    );
}

export default NotFound;