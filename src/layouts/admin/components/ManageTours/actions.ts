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

export const addTour = (payload: Omit<Tour, 'id'>) => {
    return {
        type: TYPE.ADD_TOUR,
        payload,
    };
};

export const addTourSuccess = (payload: Omit<Tour, 'id'>) => {
    return {
        type: TYPE.ADD_TOUR_SUCCESS,
        payload,
    };
};

export const updateTour = (payload: Tour) => {
    return {
        type: TYPE.UPDATE_TOUR,
        payload,
    };
};

export const updateTourSuccess = (payload: Tour) => {
    return {
        type: TYPE.UPDATE_TOUR_SUCCESS,
        payload,
    };
};

export const deleteTour = (payload: number) => {
    return {
        type: TYPE.DELETE_TOUR,
        payload,
    };
};

export const deleteTourSuccess = (payload: number) => {
    return {
        type: TYPE.DELETE_TOUR_SUCCESS,
        payload,
    };
};
