import { INIT_STATE, TYPE } from '../../constants';
import { Action } from '../../interface';
export const genderChartReducer = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case TYPE.GET_GENDER_USER:
            return [...state];
        case TYPE.GET_GENDER_USER_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
};

export const amountOfCustomerCharReducer = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER:
            return [...state];
        case TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
};
