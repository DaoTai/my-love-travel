import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from './constants';
import { AccountUser } from '~/layouts/components/Auth/interface';
import { getUsersSuccess } from './actions';
import { Action } from './reducer';
import { users } from '~/data';

const getUsersData = () => users;

const deleteUserData = (id: number) => {
    console.log('Delete user id: ', id);

    return users.filter((user) => user.idUser !== id);
};

const updateUserData = (user: AccountUser) => {
    console.log('New data: ', user);
    return users;
};

function* getUsersSaga(): Generator {
    try {
        const res = yield call(getUsersData);
        yield put(getUsersSuccess(res as AccountUser));
    } catch (err) {
        console.log(err);
    }
}

function* updateUserSaga(action: Action): Generator {
    try {
        const res = yield call(updateUserData, action.payload as AccountUser);
        yield put(getUsersSuccess(res as AccountUser));
    } catch (err) {
        console.log(err);
    }
}

function* deleteUserSaga(action: Action): Generator {
    try {
        const res = yield call(deleteUserData, action.payload as number);
        yield put(getUsersSuccess(res as AccountUser));
    } catch (err) {
        console.log(err);
    }
}

function* ManageUsersSaga(): Generator {
    yield all([
        takeLatest(TYPE.GET_USERS, getUsersSaga),
        takeLatest(TYPE.UPDATE_USER, updateUserSaga),
        takeLatest(TYPE.DELETE_USER, deleteUserSaga),
    ]);
}

export default ManageUsersSaga;
