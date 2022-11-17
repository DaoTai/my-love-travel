import { combineReducers, Reducer, AnyAction } from 'redux';
import listTourReducer from '~/layouts/components/Tour/reducer';
import profileReducer from '~/layouts/user/pages/Profile/reducer';
import privateToursReducer from '~/layouts/user/pages/PrivateTours/reducer';
import historyReducer from '~/layouts/user/pages/History/reducer';
import manageUsersReducer from '~/layouts/admin/pages/ManageUsers/reducer';
import manageToursReducer from '~/layouts/admin/pages/ManageTours/reducer';
import {
    genderChartReducer,
    amountOfCustomerCharReducer,
    gmvCharReducer,
    bookedCategoriesCharReducer,
} from '~/layouts/admin/pages/Statistical/Charts/redux-saga/reducers';
const state = combineReducers({
    listTour: listTourReducer,
    profile: profileReducer,
    privateTours: privateToursReducer,
    history: historyReducer,
    manageUsers: manageUsersReducer,
    manageTours: manageToursReducer,
    genderUser: genderChartReducer,
    amountOfCustomer: amountOfCustomerCharReducer,
    gmv: gmvCharReducer,
    bookedCategories: bookedCategoriesCharReducer,
});

export type RootState = ReturnType<typeof state>;

const rootReducer: Reducer = (currentState: RootState, action: AnyAction) => {
    return state(currentState, action as unknown as never);
};

export default rootReducer;
