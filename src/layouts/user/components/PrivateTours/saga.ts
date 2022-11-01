import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getPrivateToursSuccess } from './actions';
import { TYPE } from './constants';
import { privateTours } from '~/data';
import { Tour } from '~/layouts/components/Tour/interface';

const getPrivateToursData = () => privateTours;

function* getPrivateToursSaga(): Generator {
    try {
        const res = yield call(getPrivateToursData);
        yield put(getPrivateToursSuccess(res as Tour));
    } catch (err) {
        console.log(err);
    }
}

function* privateToursSaga(): Generator {
    yield all([takeLatest(TYPE.GET_PRIVATE_TOURS, getPrivateToursSaga)]);
}
export default privateToursSaga;
