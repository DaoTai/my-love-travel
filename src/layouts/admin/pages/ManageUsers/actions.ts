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

export const addUser = (payload: AccountUser) => {
    return {
        type: TYPE.ADD_USER,
        payload,
    };
};

export const addUserSuccess = (payload: AccountUser) => {
    return {
        type: TYPE.ADD_USER_SUCCESS,
        payload,
    };
};

export const updateUser = (payload: AccountUser) => {
    return {
        type: TYPE.UPDATE_USER,
        payload,
    };
};
export const updateUserSuccess = (payload: AccountUser) => {
    return {
        type: TYPE.UPDATE_USER_SUCCESS,
        payload,
    };
};

export const deleteUser = (payload: number) => {
    return {
        type: TYPE.DELETE_USER,
        payload,
    };
};
export const deleteUserSuccess = (payload: number) => {
    return {
        type: TYPE.DELETE_USER_SUCCESS,
        payload,
    };
};
