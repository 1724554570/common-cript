import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as action from '../store/action';

const Counter = ({ dispatch }: { dispatch: Dispatch }) => {

    const handleSubmit = (event: number) => {
        switch (event) {
            case 2:
                dispatch(action.decrement())
                break
            default:
                dispatch(action.increment())
                break
        }
    }


    return (
        <div>
            <button onClick={(e: React.MouseEvent) => { handleSubmit(1) }}> Add Todo </button>
            <button onClick={(e: React.MouseEvent) => { handleSubmit(2) }}> e Todo </button>
        </div>
    )
}

export default connect()(Counter);