import { all, fork } from 'redux-saga/effects';
import listTourSaga from '~/layouts/components/Tour/saga';
import profileSaga from '~/layouts/user/components/Profile/saga';
import privateToursSaga from '~/layouts/user/components/PrivateTours/saga';
import historySaga from '~/layouts/user/components/History/saga';
import manageUsersSaga from '~/layouts/admin/components/ManageUsers/saga';
import manageToursSaga from '~/layouts/admin/components/ManageTours/saga';
import ChartSaga from '~/layouts/admin/components/Statistical/Charts/redux-saga/sagas';
export default function* rootSaga() {
    yield all([
        fork(listTourSaga),
        fork(profileSaga),
        fork(privateToursSaga),
        fork(historySaga),
        fork(manageUsersSaga),
        fork(manageToursSaga),
        fork(ChartSaga),
    ]);
}
