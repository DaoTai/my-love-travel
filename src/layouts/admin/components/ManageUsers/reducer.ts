import { TYPE } from './constants';
import { AccountUser } from '~/layouts/components/Auth/interface';
export interface Action {
    type: TYPE;
    payload: AccountUser[] | AccountUser | number;
}

const manageUsersReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_USERS:
            return [...state];
        case TYPE.GET_USERS_SUCCESS:
            return [...(action.payload as AccountUser[])];
        case TYPE.ADD_USER_SUCCESS:
            return [...state, action.payload];
        case TYPE.UPDATE_USER_SUCCESS:
            const updatedUser = action.payload as AccountUser;
            const newState = state.map((user: AccountUser) =>
                user.idUser === updatedUser.idUser ? action.payload : user,
            );
            return newState;
        case TYPE.DELETE_USER_SUCCESS:
            const idUser = action.payload as number;
            const newUsers = state.filter((user: AccountUser) => user.idUser !== idUser);
            return newUsers;
        default:
            return state;
    }
};

export default manageUsersReducer;
