import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from '../../constants';
import { getGenderSuccess, getAmountCustomerSuccess, getGmvSuccess } from '../actions';
import { genderUserChart, amountCustomerChart, gvmChart } from '~/data';
import { Action, ChartGenderData, ChartAmountOfCustomerData, ChartGMVData } from '../../interface';

// Mock apis
const genderData = () => genderUserChart;
const amountCustomerData = () => amountCustomerChart;
const gmvData = (year: number) => {
    return gvmChart.filter((data) => data.year === year);
};

// Saga
function* getGenderSaga(): Generator {
    try {
        const res = yield call(genderData);
        yield put(getGenderSuccess(res as ChartGenderData[]));
    } catch (err) {
        console.log(err);
    }
}

function* getAmountOfCustomerSaga(): Generator {
    try {
        const res = yield call(amountCustomerData);
        yield put(getAmountCustomerSuccess(res as ChartAmountOfCustomerData[]));
    } catch (err) {
        console.log(err);
    }
}

function* getGmvSaga(action: Action): Generator {
    try {
        const res = yield call(gmvData, action.year as number);
        yield put(getGmvSuccess(res as ChartGMVData[]));
    } catch (err) {
        console.log(err);
    }
}

function* ChartSaga(): Generator {
    yield all([
        takeLatest(TYPE.GET_GENDER_USER, getGenderSaga),
        takeLatest(TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER, getAmountOfCustomerSaga),
        takeLatest(TYPE.GET_GMV, getGmvSaga),
    ]);
}

export default ChartSaga;
