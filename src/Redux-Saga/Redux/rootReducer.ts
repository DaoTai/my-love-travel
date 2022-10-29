import { combineReducers } from 'redux';
import listTourReducer from '~/layouts/components/SearchTours/reducer';
const rootReducer = combineReducers({
    listTour: listTourReducer,
});

export default rootReducer;
