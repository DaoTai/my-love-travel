import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';

// Get list tour
export const getListTour = () => {
    return {
        type: TYPE.GET_LIST_TOUR,
    };
};

// Get list tour success
export const getListTourSuccess = (payload: Tour) => {
    return {
        type: TYPE.GET_LIST_TOUR_SUCCESS,
        payload,
    };
};
