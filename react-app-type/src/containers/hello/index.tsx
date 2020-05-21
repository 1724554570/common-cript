import HelloViews from '../../components/hello';
import * as actions from '../../store/action';
// import { ICountState } from '../store/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IStoreState } from '../../global/types';


const mapStateToProps = (state: IStoreState) => {
    console.log(`state.count=${JSON.stringify(state)}`);
    let { countPage } = state;
    console.log(`state.count=${JSON.stringify(countPage)}`);
    return {
        count: countPage.count
    }
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ModifyCounterAction>) => {
    return {
        onIncrement: () => dispatch(actions.increment()),
        onDecrement: () => dispatch(actions.decrement()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HelloViews);