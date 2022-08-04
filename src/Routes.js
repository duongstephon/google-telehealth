import React from 'react';
import App from './App';
import LoginPage from './pages/LoginPage/LoginPage.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const NewApp = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={LoginPage} />
                <Route path='/video' component={App} />
            </Switch>
        </Router>
    );
};

export default NewApp;
