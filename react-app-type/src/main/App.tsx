import React from 'react';
import { Route, NavLink } from "react-router-dom";
import { BrowserRouter as BRouter } from "react-router-dom";
// import { HashRouter as Router } from "react-router-dom";
// Styles
import './App.css';
// PageViews
import About from '../containers/about/about';
import Counter from '../components/Counter';
import HelloViews from '../containers/Hello';

// Components
const Application: React.FunctionComponent<{}> = () => {

    return (
        <BRouter>
            <div className="nav-container">
                <NavLink to="/" >Home Page</NavLink>
                <NavLink to="/test">HelloViews Page</NavLink>
                <NavLink to="/about">About Page</NavLink>
            </div>
            <Route exact path="/" component={Counter} />
            <Route path="/test" component={HelloViews} />
            <Route path="/about" component={About} />
        </BRouter>
    );
}

export default Application;