import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';
import { getToursSuccess } from './actions';
import { Action } from './reducer';
import { tours } from '~/data';

const getToursData = () => tours;

function* getToursSaga(): Generator {
    try {
        const res = yield call(getToursData);
        yield put(getToursSuccess(res as Tour[]));
    } catch (err) {
        console.log(err);
    }
}

function* manageToursSaga(): Generator {
    yield all([takeLatest(TYPE.GET_TOURS, getToursSaga)]);
}

export default manageToursSaga;
