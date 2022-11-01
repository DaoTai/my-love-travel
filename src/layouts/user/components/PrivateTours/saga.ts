import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getPrivateToursSuccess, deletePrivateTourSuccess } from './actions';
import { TYPE } from './constants';
import { privateTours } from '~/data';
import { Tour } from '~/layouts/components/Tour/interface';

const getPrivateToursData = () => privateTours;

const deletePrivateTourData = (id: number) => {
    return privateTours.filter((tour) => tour.id !== id);
};

function* getPrivateToursSaga(): Generator {
    try {
        const res = yield call(getPrivateToursData);
        yield put(getPrivateToursSuccess(res as Tour));
    } catch (err) {
        console.log(err);
    }
}

function* deletePrivateTourSaga(action: { type: TYPE; payload: number }): Generator {
    try {
        const res = yield call(deletePrivateTourData, action.payload);
        yield put(getPrivateToursSuccess(res as Tour));
    } catch (err) {
        console.log(err);
    }
}

function* privateToursSaga(): Generator {
    yield all([
        takeLatest(TYPE.GET_PRIVATE_TOURS, getPrivateToursSaga),
        takeLatest(TYPE.DELETE_PRIVATE_TOUR, deletePrivateTourSaga),
    ]);
}
export default privateToursSaga;
