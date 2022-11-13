import { TYPE as TYPE_OF_GENDER } from './constants';

export interface Action {
    type: TYPE_OF_GENDER;
    payload: [];
}

export interface ChartGenderData {
    name: string;
    amount: number;
}
