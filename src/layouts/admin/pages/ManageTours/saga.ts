import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from './constants';
import { Tour } from '~/layouts/components/Tour/interface';
import { getToursSuccess, addTourSuccess, updateTourSuccess, deleteTourSuccess } from './actions';
import { Action } from './reducer';
import { tours } from '~/data';
const getToursData = () => tours;
const addTourData = (tour: Omit<Tour, 'id'>) => {
    console.log('Tour mới: ', tour);
    return tour;
};

const updateTourData = (tour: Tour) => {
    console.log('Cập nhật tour thành công: ', tour);
    return tour;
};
const deleteTourData = (idTour: number) => {
    console.log('ID tour xoá: ', idTour);
    return idTour;
};

function* getToursSaga(): Generator {
    try {
        const res = yield call(getToursData);
        yield put(getToursSuccess(res as Tour[]));
    } catch (err) {
        console.log(err);
    }
}

function* addTourSaga(action: Action): Generator {
    try {
        const res = yield call(addTourData, action.payload as Omit<Tour, 'id'>);
        yield put(addTourSuccess(res as Omit<Tour, 'id'>));
    } catch (err) {
        console.log(err);
    }
}

function* updateToursSaga(action: Action): Generator {
    try {
        const res = yield call(updateTourData, action.payload as Tour);
        yield put(updateTourSuccess(res as Tour));
    } catch (err) {
        console.log(err);
    }
}

function* deleteTourSaga(action: Action): Generator {
    try {
        const res = yield call(deleteTourData, action.payload as number);
        yield put(deleteTourSuccess(res as number));
    } catch (err) {
        console.log(err);
    }
}

function* manageToursSaga(): Generator {
    yield all([
        takeLatest(TYPE.GET_TOURS, getToursSaga),
        takeLatest(TYPE.UPDATE_TOUR, updateToursSaga),
        takeLatest(TYPE.DELETE_TOUR, deleteTourSaga),
        takeLatest(TYPE.ADD_TOUR, addTourSaga),
    ]);
}

export default manageToursSaga;
