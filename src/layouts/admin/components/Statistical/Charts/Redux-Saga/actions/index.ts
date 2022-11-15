import { TYPE } from '../../constants';
import { ChartGenderData, ChartAmountOfCustomerData, ChartGMVData, ChartBookedCategoriesData } from '../../interface';

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

// GMV chart
export const getGmv = (year: number) => ({
    type: TYPE.GET_GMV,
    year,
});

export const getGmvSuccess = (payload: ChartGMVData[]) => {
    return { type: TYPE.GET_GMV_SUCCESS, payload };
};

// Booked Categories chart
export const getBookedCategories = (year: number) => ({
    type: TYPE.GET_BOOKED_CATEGORIES,
    year,
});

export const getBookedCategoriesSuccess = (payload: ChartBookedCategoriesData) => {
    return { type: TYPE.GET_BOOKED_CATEGORIES_SUCCESS, payload };
};
