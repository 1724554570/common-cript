import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../templates/home/home';
import About from '../templates/about/about';

const MainRouter: React.FC = () => {

    return (<Switch>
        11111
        <Route path="/" components={Home} />
        <Route path="/about" exact components={About} />
    </Switch>)
}

export default MainRouter;