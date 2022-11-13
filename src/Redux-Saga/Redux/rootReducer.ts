import { combineReducers, Reducer, AnyAction } from 'redux';
import listTourReducer from '~/layouts/components/Tour/reducer';
import profileReducer from '~/layouts/user/components/Profile/reducer';
import privateToursReducer from '~/layouts/user/components/PrivateTours/reducer';
import historyReducer from '~/layouts/user/components/History/reducer';
import manageUsersReducer from '~/layouts/admin/components/ManageUsers/reducer';
import manageToursReducer from '~/layouts/admin/components/ManageTours/reducer';
import genderChartReducer from '~/layouts/admin/components/Statistical/Charts/GenderUser/reducer';
const state = combineReducers({
    listTour: listTourReducer,
    profile: profileReducer,
    privateTours: privateToursReducer,
    history: historyReducer,
    manageUsers: manageUsersReducer,
    manageTours: manageToursReducer,
    genderUser: genderChartReducer,
});

export type RootState = ReturnType<typeof state>;

const rootReducer: Reducer = (currentState: RootState, action: AnyAction) => {
    return state(currentState, action as unknown as never);
};

export default rootReducer;
