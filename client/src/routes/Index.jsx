import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Navbar from '../components/header/Navbar';

//Views
import WelcomePage from '../views/homePage/WelcomePage';
import Store from '../views/store/Index';
import Cart from '../views/cart/Index';

const Routes = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route exact path="/store" component={Store} />
                <Route exact path="/shopping-cart" component={Cart} />
            </Switch>
        </Router>
    );
};

export default Routes;
