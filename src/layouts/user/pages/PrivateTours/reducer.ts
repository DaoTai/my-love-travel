import { TYPE } from './constants';
import { Action } from './interface';
import { Tour } from '~/layouts/components/Tour/interface';
const privateToursReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_PRIVATE_TOURS:
            return [...state];
        case TYPE.GET_PRIVATE_TOURS_SUCCESS:
            return action.payload as [];
        case TYPE.DELETE_PRIVATE_TOUR_SUCCESS:
            const newState = state.filter((item: Tour) => item.id !== action.payload);
            return newState;
        default:
            return state;
    }
};

export default privateToursReducer;
