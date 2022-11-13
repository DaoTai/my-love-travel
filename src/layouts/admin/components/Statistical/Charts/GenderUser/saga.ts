import { call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from './constants';
import { getGenderSuccess } from './actions';
import { genderUserChart } from '~/data';
import { ChartGenderData } from './interface';
const genderData = () => genderUserChart;

function* getGenderSaga(): Generator {
    try {
        const res = yield call(genderData);
        yield put(getGenderSuccess(res as ChartGenderData[]));
    } catch (err) {
        console.log(err);
    }
}

function* genderChartSaga(): Generator {
    yield takeLatest(TYPE.GET_GENDER_USER, getGenderSaga);
}

export default genderChartSaga;
