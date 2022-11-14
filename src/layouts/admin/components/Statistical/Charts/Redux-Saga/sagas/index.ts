import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TYPE } from '../../constants';
import { getGenderSuccess, getAmountCustomerSuccess } from '../actions';
import { genderUserChart, amountCustomerChart } from '~/data';
import { ChartGenderData, ChartAmountOfCustomerData } from '../../interface';

// Mock apis
const genderData = () => genderUserChart;
const amountCustomerData = () => amountCustomerChart;

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

function* ChartSaga(): Generator {
    yield all([
        takeLatest(TYPE.GET_GENDER_USER, getGenderSaga),
        takeLatest(TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER, getAmountOfCustomerSaga),
    ]);
}

export default ChartSaga;
