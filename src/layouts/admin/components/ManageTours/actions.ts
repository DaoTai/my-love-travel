import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';
export const getTours = () => {
    return {
        type: TYPE.GET_TOURS,
    };
};

export const getToursSuccess = (payload: Tour[]) => {
    return {
        type: TYPE.GET_TOURS_SUCCESS,
        payload,
    };
};

export const updateTour = (payload: Tour) => {
    return {
        type: TYPE.UPDATE_TOUR,
        payload,
    };
};

export const deleteTour = (payload: number) => {
    return {
        type: TYPE.DELETE_TOUR,
        payload,
    };
};
