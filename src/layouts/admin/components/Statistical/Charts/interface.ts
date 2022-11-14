import { TYPE } from './constants';

export interface Action {
    type: TYPE;
    payload: [];
}

export interface ChartGenderData {
    name: string;
    amount: number;
}

export interface ChartAmountOfCustomerData {
    month: number;
    amount: number;
}

export interface CategoryData {
    month: number;
    data: [];
}
