import { all, fork } from 'redux-saga/effects';
import listTourSaga from '~/layouts/components/Tour/saga';
import profileSaga from '~/layouts/user/components/Profile/saga';
import privateToursSaga from '~/layouts/user/components/PrivateTours/saga';
import historySaga from '~/layouts/user/components/History/saga';

export default function* rootSaga() {
    yield all([fork(listTourSaga), fork(profileSaga), fork(privateToursSaga), fork(historySaga)]);
}
