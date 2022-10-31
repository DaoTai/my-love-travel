import { combineReducers, Reducer, AnyAction } from 'redux';
import listTourReducer from '~/layouts/components/Tour/reducer';
import profileReducer from '~/layouts/user/components/Profile/reducer';
const state = combineReducers({
    listTour: listTourReducer,
    profile: profileReducer,
});

export type RootState = ReturnType<typeof state>;

const rootReducer: Reducer = (currentState: RootState, action: AnyAction) => {
    return state(currentState, action as unknown as never);
};

export default rootReducer;
