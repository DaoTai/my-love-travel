import { TYPE } from './constants';
import { ChartGenderData } from './interface';
export const getGender = () => ({
    type: TYPE.GET_GENDER_USER,
});

export const getGenderSuccess = (payload: ChartGenderData[]) => {
    return { type: TYPE.GET_GENDER_USER_SUCCESS, payload };
};
