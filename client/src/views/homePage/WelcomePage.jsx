import React from 'react';
import { Button, Typography } from 'antd';

import { Link } from 'react-router-dom';

const { Title } = Typography;

const WelcomePage = () => {
    return (
        <div className="min-vh-100 row text-center" style={{ paddingTop: 120 }}>
            <Title level={2}>
                Buy your drinks{' '}
                <Link to="/store" className="links">
                    here
                </Link>
            </Title>
        </div>
    );
};

export default WelcomePage;
