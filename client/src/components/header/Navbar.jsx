import React, { useState } from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import LoginDialog from './auth/LoginDialog';
import logo from '../../assets/images/longLogo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="absolute" style={{ height: '100px' }}>
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        <Link to="/home-page" className="links">
                            <img
                                src={logo}
                                style={{ height: '95px', paddingTop: '5px' }}
                                alt="logo"
                            />
                        </Link>
                    </Typography>
                    <IconButton
                        edge="end"
                        className={classes.menuButton}
                        color="inherit"
                        font="big"
                    >
                        <ShoppingCart />
                    </IconButton>
                    <Button color="inherit" onClick={handleClickOpen}>
                        Login
                    </Button>
                </Toolbar>
                <LoginDialog open={open} handleClose={handleClose} />
            </AppBar>
        </div>
    );
};

export default Navbar;
