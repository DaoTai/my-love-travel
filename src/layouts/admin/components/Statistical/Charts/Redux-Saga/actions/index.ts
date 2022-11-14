import { TYPE } from '../../constants';
import { ChartGenderData, ChartAmountOfCustomerData } from '../../interface';

// Gender Chart
export const getGender = () => ({
    type: TYPE.GET_GENDER_USER,
});

export const getGenderSuccess = (payload: ChartGenderData[]) => {
    return { type: TYPE.GET_GENDER_USER_SUCCESS, payload };
};

// Amount of customer Chart
export const getAmountCustomer = () => ({
    type: TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER,
});

export const getAmountCustomerSuccess = (payload: ChartAmountOfCustomerData[]) => {
    return { type: TYPE.GET_GENDER_AMOUNT_OF_CUSTOMER_SUCCESS, payload };
};
