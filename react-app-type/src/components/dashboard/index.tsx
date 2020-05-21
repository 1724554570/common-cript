import React, { useState } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";

import AboutViews from '../../containers/about/about';
import HelloViews from '../../containers/hello';

const Dashboard: React.FC<{}> = () => {
    return (
        <>
            {/* <Switch> */}
                <div className="nav-container">
                    <NavLink to="/dashboard" >Home Page</NavLink>
                    <NavLink to="/dashboard/hello">HelloViews Page</NavLink>
                    <NavLink to="/dashboard/about">About Page</NavLink>
                </div>
                <Route exact path="/dashboard/hello" component={HelloViews} />
                <Route exact path="/dashboard/about" component={AboutViews} />
            {/* </Switch> */}
        </>
    );
}


export default Dashboard;