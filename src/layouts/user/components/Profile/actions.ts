import { TYPE } from './constants';
import { Profile } from './interface';
export const getProfile = () => {
    return {
        type: TYPE.GET_PROFILE,
    };
};

export const getProfileSuccess = (payload: Profile) => {
    return {
        type: TYPE.GET_PROFILE_SUCCESS,
        payload,
    };
};

export const updateProfile = (payload: Profile) => {
    return {
        type: TYPE.UPDATE_PROFILE,
        payload,
    };
};
