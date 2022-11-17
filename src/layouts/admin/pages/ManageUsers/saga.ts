import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from './constants';
import { AccountUser } from '~/layouts/components/Auth/interface';
import { getUsersSuccess, addUserSuccess, updateUserSuccess, deleteUserSuccess } from './actions';
import { Action } from './reducer';
import { users } from '~/data';

const getUsersData = () => users;

const addUserData = (user: AccountUser) => {
    return user;
};

const updateUserData = (user: AccountUser) => {
    return user;
};

const deleteUserData = (id: number) => {
    return id;
};

function* getUsersSaga(): Generator {
    try {
        const res = yield call(getUsersData);
        yield put(getUsersSuccess(res as AccountUser));
    } catch (err) {
        console.log(err);
    }
}

function* addUserSaga(action: Action): Generator {
    try {
        const res = yield call(addUserData, action.payload as AccountUser);
        yield put(addUserSuccess(res as AccountUser));
    } catch (err) {
        console.log(err);
    }
}

function* updateUserSaga(action: Action): Generator {
    try {
        const res = yield call(updateUserData, action.payload as AccountUser);
        yield put(updateUserSuccess(res as AccountUser));
    } catch (err) {
        console.log(err);
    }
}

function* deleteUserSaga(action: Action): Generator {
    try {
        const res = yield call(deleteUserData, action.payload as number);
        yield put(deleteUserSuccess(res as number));
    } catch (err) {
        console.log(err);
    }
}

function* ManageUsersSaga(): Generator {
    yield all([
        takeLatest(TYPE.GET_USERS, getUsersSaga),
        takeLatest(TYPE.UPDATE_USER, updateUserSaga),
        takeLatest(TYPE.DELETE_USER, deleteUserSaga),
        takeLatest(TYPE.ADD_USER, addUserSaga),
    ]);
}

export default ManageUsersSaga;
