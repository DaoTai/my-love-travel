import { TYPE } from './constants';
import { Action } from './interface';
const profileReducer = (state = {}, action: Action) => {
    switch (action.type) {
        case TYPE.GET_PROFILE:
            return { ...state };
        case TYPE.GET_PROFILE_SUCCESS:
            return { ...action.payload };
        case TYPE.UPDATE_PROFILE:
            console.log('Aloo: ', action);

            return { ...action.payload };
        default:
            return state;
    }
};

export default profileReducer;
