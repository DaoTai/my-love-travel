import { TYPE } from './constants';
import { INIT_STATE } from './config';
import { Action } from './interface';
const genderChartReducer = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case TYPE.GET_GENDER_USER:
            return [...state];
        case TYPE.GET_GENDER_USER_SUCCESS:
            return [...action.payload];
        default:
            return [...state];
    }
};

export default genderChartReducer;
