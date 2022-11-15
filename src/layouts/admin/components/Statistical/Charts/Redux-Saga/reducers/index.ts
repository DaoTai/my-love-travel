import { INIT_STATE, TYPE } from '../../constants';
import { Action } from '../../interface';
export const genderChartReducer = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case TYPE.GET_GENDER_USER:
            return [...state];
        case TYPE.GET_GENDER_USER_SUCCESS:
            return [...(action.payload as [])];
        default:
            return state;
    }
};

export const amountOfCustomerCharReducer = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER:
            return [...state];
        case TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER_SUCCESS:
            return [...(action.payload as [])];
        default:
            return state;
    }
};

export const gmvCharReducer = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case TYPE.GET_GMV:
            return [...state];
        case TYPE.GET_GMV_SUCCESS:
            return [...(action.payload as [])];
        default:
            return state;
    }
};

export const bookedCategoriesCharReducer = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case TYPE.GET_BOOKED_CATEGORIES:
            return state;
        case TYPE.GET_BOOKED_CATEGORIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
