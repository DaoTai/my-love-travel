import { all, fork } from 'redux-saga/effects';
import listTourSaga from '~/layouts/components/Tour/saga';
import profileSaga from '~/layouts/user/components/Profile/saga';

export default function* rootSaga() {
    yield all([fork(listTourSaga), fork(profileSaga)]);
}
