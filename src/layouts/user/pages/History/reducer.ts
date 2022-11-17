import { TYPE } from './constants';
import { Action } from './interface';

const historyReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_PRIVATE_BILLS:
            return [...state];
        case TYPE.GET_PRIVATE_BILLS_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
};

export default historyReducer;
