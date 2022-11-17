import { takeLatest, put, call, all } from 'redux-saga/effects';
import { getProfileSuccess, updateProfileSuccess } from './actions';
import { profile } from '~/data';
import { TYPE } from './constants';
import { Profile, Action } from './interface';

const getProfileData = () => profile;

const updateProfileData = (data: Profile) => data;

function* getProfileSaga(): Generator {
    try {
        const res = yield call(getProfileData);
        yield put(getProfileSuccess(res as Profile));
    } catch (err) {
        console.log(err);
    }
}

function* updateProfileSaga(action: Action): Generator {
    try {
        const res = yield call(updateProfileData, action.payload);
        yield put(updateProfileSuccess(res as Profile));
    } catch (err) {
        console.log(err);
    }
}

function* profileSaga(): Generator {
    yield all([takeLatest(TYPE.GET_PROFILE, getProfileSaga), takeLatest(TYPE.UPDATE_PROFILE, updateProfileSaga)]);
}

export default profileSaga;
