import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import beerCelebration from '../assets/icons/svg/beerCelebration.svg';
import wineTasting from '../assets/icons/svg/wineTasting.svg';
import delivery from '../assets/icons/svg/delivery.svg';

import { Link } from 'react-router-dom';

import '../assets/styles/hovers.css';

const HomePage = () => {
    return (
        <div className="homePage min-vh-100" style={{ paddingTop: '150px' }}>
            <div className="row w-75">
                <div className="col-4">
                    <Link to="/store" className="links">
                        <Paper elevation={5} className="hvr-grow">
                            <img src={wineTasting} alt="wineTasting" />
                        </Paper>
                        <Typography
                            variant="h3"
                            className="mt-2"
                            component="h2"
                        >
                            Wine
                        </Typography>
                    </Link>
                </div>

                <div className="col-4">
                    <Link to="/store" className="links">
                        <Paper elevation={5} className="hvr-grow">
                            <img src={beerCelebration} alt="beerCelebration" />
                        </Paper>
                        <Typography
                            variant="h3"
                            className="mt-2"
                            component="h2"
                        >
                            Drinks
                        </Typography>
                    </Link>
                </div>

                <div className="col-4">
                    <Paper elevation={5} className="hvr-grow">
                        <img src={delivery} alt="delivery" />
                    </Paper>
                    <Typography variant="h3" className="mt-2" component="h2">
                        delivery
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
