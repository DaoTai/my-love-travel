import { TYPE } from './constants';

export interface Action {
    type: TYPE;
    payload: [];
    year?: number;
}

export interface ChartGenderData {
    name: string;
    amount: number;
}

export interface ChartAmountOfCustomerData {
    month: number;
    amount: number;
}

export interface ChartGMVData {
    month: number;
    year: number;
    money: number;
}

export interface CategoryData {
    month: number;
    data: [];
}
