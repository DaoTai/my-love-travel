import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getListTourSuccess } from './actions';
import { tours } from '~/data';
import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';

const getListTourData = () => tours;

function* getListTourSaga(): Generator {
    try {
        const res = yield call(getListTourData);
        yield put(getListTourSuccess(res as Tour));
    } catch (err) {
        console.log(err);
    }
}

function* listTourSaga() {
    yield takeLatest(TYPE.GET_LIST_TOUR, getListTourSaga);
}

export default listTourSaga;
