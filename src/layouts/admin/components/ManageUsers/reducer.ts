import { TYPE } from './constants';
import { AccountUser } from '~/layouts/components/Auth/interface';
export interface Action {
    type: TYPE;
    payload: AccountUser[] | number;
}

const manageUsersReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_USERS:
            return [...state];
        case TYPE.GET_USERS_SUCCESS:
            return [...(action.payload as AccountUser[])];
        case TYPE.UPDATE_USER:
            return { ...(action.payload as AccountUser) };
        case TYPE.DELETE_USER:
            return action.payload;
        default:
            return state;
    }
};

export default manageUsersReducer;
