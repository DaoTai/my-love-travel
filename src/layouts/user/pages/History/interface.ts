import { TYPE } from './constants';
export type Action = {
    type: TYPE;
    payload: PrivateBill[] | [];
};

export interface PrivateBill {
    readonly id: number;
    readonly idTour: number;
    readonly idAccount: number;
    readonly status: string;
    readonly date: Date;
    readonly total?: number;
    readonly nameTour?: string;
    readonly amount?: number;
}
