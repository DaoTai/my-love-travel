import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';
export interface Action {
    type: TYPE;
    payload: Tour[] | number | Tour;
}

const manageTourReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_TOURS:
            return [...state];
        case TYPE.GET_TOURS_SUCCESS:
            return [...(action.payload as Tour[])];
        case TYPE.UPDATE_TOUR:
            return { ...(action.payload as Tour) };
        case TYPE.DELETE_TOUR:
            return action.payload as number;
        default:
            return state;
    }
};

export default manageTourReducer;
