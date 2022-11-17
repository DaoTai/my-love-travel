import { TYPE } from './constants';

export interface Action {
    type: TYPE;
    payload: [] | {};
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

export interface ChartBookedCategoriesData {
    discoveryEcology: number;
    leisure: number;
    historicalSite: number;
    year: number;
}
