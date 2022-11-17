import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';
export const getPrivateTours = () => {
    return {
        type: TYPE.GET_PRIVATE_TOURS,
    };
};

export const getPrivateToursSuccess = (payload: Tour) => {
    return {
        type: TYPE.GET_PRIVATE_TOURS_SUCCESS,
        payload,
    };
};

export const deletePrivateTour = (payload: number) => {
    return {
        type: TYPE.DELETE_PRIVATE_TOUR,
        payload,
    };
};

export const deletePrivateTourSuccess = (payload: number) => {
    return {
        type: TYPE.DELETE_PRIVATE_TOUR_SUCCESS,
        payload,
    };
};
