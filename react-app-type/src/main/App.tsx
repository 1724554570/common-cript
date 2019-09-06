import React, { useState } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import About from '../templates/about/about';
import Counter from '../components/Counter';

import * as actionEvents from '../store/action';
import { CountModel } from '../store/types'

import HelloViews from '../containers/Hello';

const Application: React.FunctionComponent<{}> = () => {
    const [count, setCount] = useState<number>(0);
    return (
        <>
            <div className="count-view">{count}</div>
            <button onClick={() => setCount(count - 1)}>onIncrement</button>
            <button onClick={() => setCount(count + 1)}>onDecrement</button>
            <About />
            <div>{}</div>
            <Counter />
            <div></div>
            <HelloViews />
        </>
    );
}


const mapStateToProps = (state: { count: 0 }): CountModel => {
    return {
        count: state.count
    }
};

const mapDispatchToProps = (dispatch: Dispatch<actionEvents.ModifyCounterAction>) => {
    return {
        onIncrement: () => dispatch(actionEvents.increment()),
        onDecrement: () => dispatch(actionEvents.decrement())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);