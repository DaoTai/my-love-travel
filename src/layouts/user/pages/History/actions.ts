import { TYPE } from './constants';
import { PrivateBill } from './interface';
export const getPrivateBills = () => {
    return {
        type: TYPE.GET_PRIVATE_BILLS,
    };
};

export const getPrivateBillsSuccess = (payload: PrivateBill[]) => {
    return {
        type: TYPE.GET_PRIVATE_BILLS_SUCCESS,
        payload,
    };
};
