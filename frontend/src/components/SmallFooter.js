import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    footer: {
        backgroundColor: "#F8F8F8",
        boderTop: "1px solid #E7E7E7",
        height: '30px',
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center'
    }
})

const SmallFooter = () => {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Typography
                variant="span"
            >
                Created by @TigersTeam
            </Typography>
        </footer>
    );
}

export default SmallFooter;