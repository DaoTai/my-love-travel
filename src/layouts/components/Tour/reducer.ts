import { TYPE } from './constants';
import { Action } from '~/Redux-Saga/Redux/interface';

const listTourReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_LIST_TOUR:
            return [...state];
        case TYPE.GET_LIST_TOUR_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
};

export default listTourReducer;
