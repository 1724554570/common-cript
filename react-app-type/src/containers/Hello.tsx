import Hello from '../components/Hello';
import * as actions from '../store/action';
import { ICountState } from '../store/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


const mapStateToProps = (state: ICountState) => {
    console.log(`state.count=${JSON.stringify(state)}`);
    return {
        count: state.count
    }
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ModifyCounterAction>) => {
    return {
        onIncrement: () => dispatch(actions.increment()),
        onDecrement: () => dispatch(actions.decrement()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);