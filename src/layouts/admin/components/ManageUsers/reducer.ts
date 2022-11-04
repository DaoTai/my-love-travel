import { TYPE } from './constants';
interface Action {
    type: TYPE;
    payload: [];
}

const manageUsersReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_USERS:
            return [...state];
        case TYPE.GET_USERS_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
};

export default manageUsersReducer;
