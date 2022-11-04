import { TYPE } from './constants';
import { AccountUser } from '~/layouts/components/Auth/interface';
export const getUsers = () => {
    return {
        type: TYPE.GET_USERS,
    };
};

export const getUsersSuccess = (payload: AccountUser) => {
    return {
        type: TYPE.GET_USERS_SUCCESS,
        payload,
    };
};
