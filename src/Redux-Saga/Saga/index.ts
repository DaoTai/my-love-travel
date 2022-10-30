import { all, fork } from 'redux-saga/effects';
import listTourSaga from '~/layouts/components/Tour/saga';

export default function* rootSaga() {
    yield all([fork(listTourSaga)]);
}
