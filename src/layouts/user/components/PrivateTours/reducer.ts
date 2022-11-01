import { TYPE } from './constants';
import { Action } from '~/layouts/components/Tour/interface';

const privateToursReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_PRIVATE_TOURS:
            return [...state];
        case TYPE.GET_PRIVATE_TOURS_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
};

export default privateToursReducer;
