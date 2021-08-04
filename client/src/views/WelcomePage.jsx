import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import Flash from 'react-reveal/Flash';

const WelcomePage = () => {
    return (
        <div className="min-vh-100 welcomePage">
            <div className="welcomeBox">
                <div>
                    <Typography
                        className="text-light"
                        variant="h3"
                        component="h2"
                    >
                        <Bounce left cascade>
                            Buy your drinks online
                        </Bounce>
                    </Typography>
                </div>
                <div>
                    <Link to="/home-page" className="links">
                        <Flash>
                            <Button
                                variant="outlined"
                                style={{
                                    backgroundColor: 'white',
                                    marginLeft: '15px',
                                }}
                                size="large"
                                color="primary"
                            >
                                <h3>
                                    <b>HERE!</b>
                                </h3>
                            </Button>
                        </Flash>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
