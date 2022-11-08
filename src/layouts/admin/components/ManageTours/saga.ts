import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';
import { getToursSuccess, updateTour } from './actions';
import { Action } from './reducer';
import { tours } from '~/data';

const getToursData = () => tours;
const updateTourData = (tour: Tour) => {
    console.log('Cập thành công: ', tour);
    return tours;
};
function* getToursSaga(): Generator {
    try {
        const res = yield call(getToursData);
        yield put(getToursSuccess(res as Tour[]));
    } catch (err) {
        console.log(err);
    }
}

function* updateToursSaga(action: Action): Generator {
    try {
        const res = yield call(updateTourData, action.payload as Tour);
        yield put(getToursSuccess(res as Tour[]));
    } catch (err) {
        console.log(err);
    }
}

function* manageToursSaga(): Generator {
    yield all([takeLatest(TYPE.GET_TOURS, getToursSaga), takeLatest(TYPE.UPDATE_TOUR, updateToursSaga)]);
}

export default manageToursSaga;
