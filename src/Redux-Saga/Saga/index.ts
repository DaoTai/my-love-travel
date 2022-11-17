import { all, fork } from 'redux-saga/effects';
import listTourSaga from '~/layouts/components/Tour/saga';
import profileSaga from '~/layouts/user/pages/Profile/saga';
import privateToursSaga from '~/layouts/user/pages/PrivateTours/saga';
import historySaga from '~/layouts/user/pages/History/saga';
import manageUsersSaga from '~/layouts/admin/pages/ManageUsers/saga';
import manageToursSaga from '~/layouts/admin/pages/ManageTours/saga';
import ChartSaga from '~/layouts/admin/pages/Statistical/Charts/redux-saga/sagas';
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
