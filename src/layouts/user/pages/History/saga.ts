import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getPrivateBillsSuccess } from './actions';
import { PrivateBill } from './interface';
import { PrivateTour } from '~/layouts/user/pages/PrivateTours/interface';
import { privateBills, privateTours } from '~/data';
import { TYPE } from './constants';
const getPrivateBillsData = () => {
    const total = privateTours.map((tour: PrivateTour) => ({
        idTour: tour.id,
        total: Number(tour.bookedTours) * tour.price,
        nameTour: tour.name,
        amount: tour.bookedTours,
    }));

    const newBills = privateBills.map((bill) => {
        const contain = total.find((item) => item.idTour === bill.idTour);
        return {
            ...bill,
            ...contain,
        };
    });

    const newPrivateBills = newBills.filter((bill) => bill.idAccount === 1);

    return newPrivateBills;
};

function* getPrivateBillsSaga(): Generator {
    try {
        const res = yield call(getPrivateBillsData);
        yield put(getPrivateBillsSuccess(res as PrivateBill[]));
    } catch (err) {
        console.log(err);
    }
}

function* historySaga(): Generator {
    yield all([takeLatest(TYPE.GET_PRIVATE_BILLS, getPrivateBillsSaga)]);
}
export default historySaga;
