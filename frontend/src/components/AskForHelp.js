import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web';
import { userApi } from '../services/userApi';
import shelter_card from '../img/shelter_card.png'
import goods_card from '../img/goods_card.png'
import transport_card from '../img/transport_card.png'
import '../styles/askforhelp.css'

const useStyles = makeStyles({
    card: {
        maxWidth: 450,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
        transition: "transform 0.5s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    media: {
        height: 500,
    },
});

const AskForHelp = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [error, setError] = useState(false);
    const { initialized, keycloak } = useKeycloak();

    useEffect(async () => {
        if (keycloak && initialized) {
            try {
                // const response = await userApi.getCourses(keycloak?.token);
                // console.log("RESPONSE: " + response.data)
                // setCourses(response.data);
            } catch (error) {
                setError(true);
            }
        }
    }, [keycloak, initialized])

    return (initialized && keycloak?.authenticated &&
        <div>
            <div>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h2"
                    align="center"
                    padding="20px"
                    marginBottom="80px"
                >
                    What do you need?
                </Typography>

                {
                    <div className="askforhelp">
                        {
                            < Card
                                className={classes.card}
                                sx={{ marginLeft: "0%", marginBottom: "5%" }}
                            >
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    alt="shelter"
                                    image={shelter_card}
                                    onClick={() => navigate('/askforhelp/shelter')}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Shelter
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        infos
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate('/askforhelp/shelter')}>Ask for</Button>
                                </CardActions>
                            </Card>
                        }

                        {
                            < Card
                                className={classes.card}
                                sx={{ marginLeft: "2%", marginBottom: "5%" }}
                            >
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    alt="food"
                                    image={goods_card}
                                    onClick={() => navigate('/askforhelp/goods')}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Goods
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        infos
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate('/askforhelp/goods')}>Ask for</Button>
                                </CardActions>
                            </Card>
                        }

                        {
                            < Card
                                className={classes.card}
                                sx={{ marginLeft: "2%", marginBottom: "5%" }}
                            >
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    alt="transport"
                                    image={transport_card}
                                    onClick={() => navigate('/askforhelp/transport')}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Transport
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        infos
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate('/askforhelp/transport')}>Ask for</Button>
                                </CardActions>
                            </Card>
                        }
                    </div>
                }

            </div>
        </div >
    );
}

export default AskForHelp;