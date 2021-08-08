import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/header/Navbar';

//Views
import HomePage from '../views/HomePage';
import WelcomePage from '../views/WelcomePage';
import Store from '../views/store/Index';
import Cart from '../views/cart/Index';

const Routes = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route exact path="/home-page" component={HomePage} />
                <Route exact path="/store" component={Store} />
                <Route exact path="/cart" component={Cart} />
            </Switch>
        </Router>
    );
};

export default Routes;
