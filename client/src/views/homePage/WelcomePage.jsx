import React from 'react';
import { Button, Typography } from 'antd';

import { Link } from 'react-router-dom';

const { Title } = Typography;

const WelcomePage = () => {
    return (
        <div className="min-vh-100 welcomePage">
            <div className="welcomeBox">
                <div>
                    <h3>Buy your drinks online</h3>
                </div>
                <div style={{ marginLeft: '5px' }}>
                    <Link to="/store" className="links">
                        <Button type="primary">HERE</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
