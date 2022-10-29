import { all, fork } from 'redux-saga/effects';
import listTourSaga from '~/layouts/components/SearchTours/saga';

export default function* rootSaga() {
    yield all([fork(listTourSaga)]);
}
