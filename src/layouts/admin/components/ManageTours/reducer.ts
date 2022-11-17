import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';
export interface Action {
    type: TYPE;
    payload: Tour[] | number | Tour;
}

const manageTourReducer = (state = [], action: Action) => {
    switch (action.type) {
        case TYPE.GET_TOURS:
            return [...state];
        case TYPE.GET_TOURS_SUCCESS:
            return [...(action.payload as Tour[])];
        case TYPE.ADD_TOUR_SUCCESS:
            return [...state, [action.payload]];
        case TYPE.UPDATE_TOUR_SUCCESS:
            const updatedTour = action.payload as Tour;
            const newState = state.map((item: []) =>
                item.map((tour: Tour) => (tour.id === updatedTour.id ? updatedTour : tour)),
            );
            return newState;
        case TYPE.DELETE_TOUR_SUCCESS:
            const idDeletedTour = action.payload as number;
            const newTours = state.map((item: []) => item.filter((tour: Tour) => tour.id !== idDeletedTour));
            return newTours;
        default:
            return state;
    }
};

export default manageTourReducer;
