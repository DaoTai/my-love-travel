import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from './constants';
import { AccountUser } from '~/layouts/components/Auth/interface';
import { getUsersSuccess } from './actions';

import { users } from '~/data';

const getUsersData = () => users;

function* getUsersSaga(): Generator {
    try {
        const res = yield call(getUsersData);
        yield put(getUsersSuccess(res as AccountUser));
    } catch (err) {
        console.log(err);
    }
}

function* ManageUsersSaga(): Generator {
    yield all([takeLatest(TYPE.GET_USERS, getUsersSaga)]);
}

export default ManageUsersSaga;
