import React from 'react';
import { Route, NavLink, Redirect } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
// Styles
import './App.css';
// PageViews
// import About from '../containers/about/about';
// import Counter from '../components/Counter';
// import HelloViews from '../containers/Hello';
import DashboardViews from '../containers/Dashboard';
import LoginViews from '../containers/login';

// Components
const Application: React.FunctionComponent<{}> = () => {

    return (
        <Router>
            {/* <div className="nav-container">
                <NavLink to="/" >Home Page</NavLink>
                <NavLink to="/test">HelloViews Page</NavLink>
                <NavLink to="/about">About Page</NavLink>
            </div>
            <Route exact path="/" component={Counter} />
            <Route path="/test" component={HelloViews} />
            <Route path="/about" component={About} /> */}
            <Route path="/dashboard" component={DashboardViews} />
            <Route path="/login" component={LoginViews} />
            {/* <Redirect to="/login"/> */}
        </Router>
    );
}

export default Application;